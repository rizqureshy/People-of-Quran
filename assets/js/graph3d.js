/*
 * Living Canvas in 3D — a dependency-free universe of people.
 * ------------------------------------------------------------------
 * People float as glowing geometric seals in a 3D star-field. A
 * force simulation in three dimensions lets families settle into
 * constellations; an orbit camera lets you fly around the universe.
 *
 * Rendered with perspective projection onto a 2D canvas (no WebGL),
 * so it runs anywhere, offline. It mirrors the public interface of the
 * 2D PQGraph so the app can use either engine interchangeably:
 *   setData, center, focusNode, setSelected, onSelect, onHover
 */

(function () {
  "use strict";

  function v(x, y, z) { return { x: x, y: y, z: z }; }
  function sub(a, b) { return v(a.x - b.x, a.y - b.y, a.z - b.z); }
  function cross(a, b) {
    return v(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  }
  function dot(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z; }
  function norm(a) {
    var l = Math.sqrt(dot(a, a)) || 1e-6;
    return v(a.x / l, a.y / l, a.z / l);
  }

  function PQGraph3D(canvas, options) {
    options = options || {};
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.onSelect = options.onSelect || function () {};
    this.onHover = options.onHover || function () {};
    this.getSprite = options.getSprite || null;
    this.drawNode = options.drawNode || null;
    this.personById = options.personById || {};

    this.nodes = [];
    this.edges = [];
    this.nodeById = {};
    this.stars = [];

    // Orbit camera (spherical around a target)
    this.target = v(0, 0, 0);
    this.radius = 760;
    this.theta = 0.6;      // azimuth
    this.phi = 1.15;       // polar angle (0..PI)
    this.fov = 62 * Math.PI / 180;
    this.autoRotate = true;

    this.hoverId = null;
    this.selectedId = null;
    this.pathNodes = null;       // {id:true} when a path is highlighted
    this.pathEdges = null;       // {"a|b":true}
    this.showConstellations = true;
    this.alpha = 1;
    this.dpr = window.devicePixelRatio || 1;

    this._dragging = false;
    this._lastX = 0; this._lastY = 0; this._moved = 0;
    this._downAt = 0;

    this._time = 0;
    this.coreColor = options.coreColor || "#f0c94e";   // luminous gold — the divine light at the centre
    this.clusterAnchors = {};
    this._makeStars();
    this._nebulae = this._makeNebulae();
    this._bind();
    this._resize();
    this._running = true;
    this._tick = this._tick.bind(this);
    requestAnimationFrame(this._tick);
  }

  // Multi-layer star-field (near/mid/far) with per-star twinkle phase.
  PQGraph3D.prototype._makeStars = function () {
    this.stars = [];
    var layers = [
      { n: 520, rMin: 2400, rMax: 5200, b: 0.22, sz: 0.9, tw: 0.0 },   // far
      { n: 900, rMin: 1100, rMax: 2300, b: 0.5, sz: 1.0, tw: 0.0 },    // mid
      { n: 420, rMin: 560, rMax: 1100, b: 0.7, sz: 1.5, tw: 0.9 }      // near, twinkling
    ];
    for (var L = 0; L < layers.length; L++) {
      var ly = layers[L];
      for (var i = 0; i < ly.n; i++) {
        var u = Math.random() * 2 - 1;
        var t = Math.random() * Math.PI * 2;
        var r = ly.rMin + Math.random() * (ly.rMax - ly.rMin);
        var s = Math.sqrt(1 - u * u);
        var hue = 0.55 + Math.random() * 0.12;            // bluish-white
        this.stars.push({
          x: r * s * Math.cos(t), y: r * u, z: r * s * Math.sin(t),
          b: ly.b * (0.6 + Math.random() * 0.6),
          sz: ly.sz * (Math.random() < 0.1 ? 1.8 : 1),
          tw: ly.tw, ph: Math.random() * Math.PI * 2,
          col: "hsl(" + Math.round(hue * 360) + ",60%," + Math.round(78 + Math.random() * 17) + "%)"
        });
      }
    }
  };

  // A few large, slowly-drifting additive nebula clouds for atmosphere.
  PQGraph3D.prototype._makeNebulae = function () {
    var defs = [
      { col: [120, 70, 190], a: 0.40 },   // violet
      { col: [40, 90, 200], a: 0.34 },     // blue
      { col: [70, 160, 150], a: 0.26 },    // teal
      { col: [216, 168, 56], a: 0.22 }     // warm gold (echoes the core)
    ];
    var out = [];
    for (var i = 0; i < defs.length; i++) {
      var u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2;
      var r = 700 + Math.random() * 700, s = Math.sqrt(1 - u * u);
      out.push({
        x: r * s * Math.cos(t), y: r * u * 0.6, z: r * s * Math.sin(t),
        col: defs[i].col, a: defs[i].a, size: 520 + Math.random() * 420,
        ph: Math.random() * Math.PI * 2
      });
    }
    return out;
  };

  PQGraph3D.prototype.setData = function (nodes, edges) {
    var self = this;
    var prev = this.nodeById;

    // Give each family its own anchor floating around the core — a
    // Fibonacci sphere of cluster centres at a fixed orbit radius.
    var groups = [];
    nodes.forEach(function (n) { var g = n.group || "Other"; if (groups.indexOf(g) < 0) groups.push(g); });
    var CLUSTER_R = 330;
    this.clusterAnchors = {};
    groups.forEach(function (g, i) {
      var t = (i + 0.5) / groups.length;
      var inc = Math.acos(1 - 2 * t);
      var az = Math.PI * (1 + Math.sqrt(5)) * i;
      self.clusterAnchors[g] = v(
        CLUSTER_R * Math.sin(inc) * Math.cos(az),
        CLUSTER_R * Math.cos(inc) * 0.72,        // flatten a little, galaxy-like
        CLUSTER_R * Math.sin(inc) * Math.sin(az)
      );
    });

    this.nodes = nodes.map(function (n) {
      var old = prev[n.id];
      var a = self.clusterAnchors[n.group || "Other"];
      var jitter = function () { return (Math.random() - 0.5) * 120; };
      return Object.assign({}, n, {
        anchor: a,
        x: old ? old.x : a.x + jitter(),
        y: old ? old.y : a.y + jitter(),
        z: old ? old.z : a.z + jitter(),
        vx: 0, vy: 0, vz: 0,
        r: n.r || 10
      });
    });
    this.nodeById = {};
    this.nodes.forEach(function (nn) { self.nodeById[nn.id] = nn; });
    this.edges = edges.filter(function (e) {
      return self.nodeById[e.source] && self.nodeById[e.target];
    });
    this.alpha = 1;
  };

  PQGraph3D.prototype.setSelected = function (id) { this.selectedId = id; };

  function edgeKey(a, b) { return a < b ? a + "|" + b : b + "|" + a; }

  /* Highlight a path: an ordered list of node ids. Pass null to clear. */
  PQGraph3D.prototype.setPath = function (nodeIds) {
    if (!nodeIds || !nodeIds.length) { this.pathNodes = null; this.pathEdges = null; return; }
    this.pathNodes = {}; this.pathEdges = {};
    for (var i = 0; i < nodeIds.length; i++) {
      this.pathNodes[nodeIds[i]] = true;
      if (i > 0) this.pathEdges[edgeKey(nodeIds[i - 1], nodeIds[i])] = true;
    }
    this.autoRotate = false;
  };

  PQGraph3D.prototype.setConstellations = function (on) { this.showConstellations = on; };

  /* Kick off the cinematic intro fly-through from the current (home) view. */
  PQGraph3D.prototype.startIntro = function () {
    var home = { radius: this.radius, theta: this.theta, phi: this.phi };
    this._intro = {
      t: 0, dur: 6.5,
      keys: [
        { at: 0.00, radius: home.radius * 2.7, theta: home.theta - 1.6, phi: 0.40 },
        { at: 0.42, radius: home.radius * 1.55, theta: home.theta - 0.55, phi: 0.98 },
        { at: 0.74, radius: home.radius * 1.12, theta: home.theta + 0.25, phi: home.phi + 0.06 },
        { at: 1.00, radius: home.radius, theta: home.theta, phi: home.phi }
      ]
    };
    this.autoRotate = false;
  };
  PQGraph3D.prototype.skipIntro = function () {
    if (!this._intro) return;
    var last = this._intro.keys[this._intro.keys.length - 1];
    this.radius = last.radius; this.theta = last.theta; this.phi = last.phi;
    this._intro = null; this.autoRotate = true;
    if (this.onIntroEnd) this.onIntroEnd();
  };

  PQGraph3D.prototype.center = function () {
    // Frame the whole cloud and stop auto-rotate briefly.
    var c = this._centroid();
    this.target = c;
    var maxd = 1;
    for (var i = 0; i < this.nodes.length; i++) {
      var d = Math.sqrt(dot(sub(this.nodes[i], c), sub(this.nodes[i], c)));
      if (d > maxd) maxd = d;
    }
    this.radius = Math.min(1600, Math.max(420, maxd * 2.4));
  };

  PQGraph3D.prototype.focusNode = function (id) {
    var n = this.nodeById[id];
    if (!n) return;
    this._focus = { x: n.x, y: n.y, z: n.z };
    this.radius = Math.min(this.radius, 520);
    this.autoRotate = false;
  };

  PQGraph3D.prototype._centroid = function () {
    if (!this.nodes.length) return v(0, 0, 0);
    var s = v(0, 0, 0);
    this.nodes.forEach(function (n) { s.x += n.x; s.y += n.y; s.z += n.z; });
    return v(s.x / this.nodes.length, s.y / this.nodes.length, s.z / this.nodes.length);
  };

  /* ---- 3D force simulation ---- */
  PQGraph3D.prototype._simulate = function () {
    if (this.alpha < 0.004) return;
    var nodes = this.nodes, n = nodes.length;
    for (var i = 0; i < n; i++) {
      var a = nodes[i];
      for (var j = i + 1; j < n; j++) {
        var b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        var d2 = dx * dx + dy * dy + dz * dz || 0.01;
        var d = Math.sqrt(d2);
        var f = 16000 / d2;
        var fx = (dx / d) * f, fy = (dy / d) * f, fz = (dz / d) * f;
        a.vx += fx; a.vy += fy; a.vz += fz;
        b.vx -= fx; b.vy -= fy; b.vz -= fz;
      }
      // Pull each node toward its family's anchor so clusters stay
      // coherent and float as distinct islands around the core.
      if (a.anchor) {
        a.vx += (a.anchor.x - a.x) * 0.012;
        a.vy += (a.anchor.y - a.y) * 0.012;
        a.vz += (a.anchor.z - a.z) * 0.012;
      }
      // Keep nodes from drifting into the luminous core at the centre.
      var dc2 = a.x * a.x + a.y * a.y + a.z * a.z || 1;
      if (dc2 < 19600) {                       // within ~140 of centre
        var dc = Math.sqrt(dc2), push = (140 - dc) * 0.03;
        a.vx += (a.x / dc) * push; a.vy += (a.y / dc) * push; a.vz += (a.z / dc) * push;
      }
    }
    var target = 150;
    for (var k = 0; k < this.edges.length; k++) {
      var e = this.edges[k];
      var s = this.nodeById[e.source], t = this.nodeById[e.target];
      var ex = t.x - s.x, ey = t.y - s.y, ez = t.z - s.z;
      var dist = Math.sqrt(ex * ex + ey * ey + ez * ez) || 0.01;
      var disp = (dist - target) * 0.012;
      var ux = ex / dist, uy = ey / dist, uz = ez / dist;
      s.vx += ux * disp; s.vy += uy * disp; s.vz += uz * disp;
      t.vx -= ux * disp; t.vy -= uy * disp; t.vz -= uz * disp;
    }
    for (var m = 0; m < n; m++) {
      var p = nodes[m];
      p.vx *= 0.82; p.vy *= 0.82; p.vz *= 0.82;
      p.x += p.vx * this.alpha; p.y += p.vy * this.alpha; p.z += p.vz * this.alpha;
    }
    this.alpha *= 0.99;
  };

  /* ---- Camera basis & projection ---- */
  PQGraph3D.prototype._camera = function () {
    // Cinematic intro: sweep through waypoints to the home view.
    if (this._intro) {
      var I = this._intro;
      I.t += 0.016;
      var k = Math.min(1, I.t / I.dur);
      var keys = I.keys, seg = keys.length - 2;
      for (var ki = 0; ki < keys.length - 1; ki++) {
        if (k >= keys[ki].at && k <= keys[ki + 1].at) { seg = ki; break; }
      }
      var a = keys[seg], b = keys[seg + 1];
      var local = (k - a.at) / ((b.at - a.at) || 1);
      var e = 1 - Math.pow(1 - local, 3);           // easeOutCubic
      this.radius = a.radius + (b.radius - a.radius) * e;
      this.theta = a.theta + (b.theta - a.theta) * e;
      this.phi = a.phi + (b.phi - a.phi) * e;
      if (k >= 1) { this._intro = null; this.autoRotate = true; if (this.onIntroEnd) this.onIntroEnd(); }
    }

    // Smoothly chase a focus target if one was requested.
    if (this._focus) {
      this.target.x += (this._focus.x - this.target.x) * 0.08;
      this.target.y += (this._focus.y - this.target.y) * 0.08;
      this.target.z += (this._focus.z - this.target.z) * 0.08;
      if (Math.abs(this._focus.x - this.target.x) < 1) this._focus = null;
    }
    if (this.autoRotate && !this._dragging && !this._intro) this.theta += 0.0016;

    var st = Math.sin(this.phi), ct = Math.cos(this.phi);
    var pos = v(
      this.target.x + this.radius * st * Math.cos(this.theta),
      this.target.y + this.radius * ct,
      this.target.z + this.radius * st * Math.sin(this.theta)
    );
    var fwd = norm(sub(this.target, pos));
    var right = norm(cross(fwd, v(0, 1, 0)));
    var up = cross(right, fwd);
    var W = this.canvas.clientWidth, H = this.canvas.clientHeight;
    var focal = (H / 2) / Math.tan(this.fov / 2);
    return { pos: pos, fwd: fwd, right: right, up: up, focal: focal, W: W, H: H };
  };

  PQGraph3D.prototype._project = function (p, cam) {
    var rel = sub(p, cam.pos);
    var cz = dot(rel, cam.fwd);
    if (cz <= 1) return null;
    var cx = dot(rel, cam.right);
    var cy = dot(rel, cam.up);
    return {
      sx: cam.W / 2 + (cx / cz) * cam.focal,
      sy: cam.H / 2 - (cy / cz) * cam.focal,
      depth: cz,
      scale: cam.focal / cz
    };
  };

  PQGraph3D.prototype._tick = function () {
    if (!this._running) return;
    try {
      this._simulate();
      this._draw();
    } catch (err) {
      if (!this._loggedErr) { this._loggedErr = true; if (window.console) console.error("PQGraph3D draw error:", err); }
    }
    requestAnimationFrame(this._tick);   // never stop the loop
  };

  PQGraph3D.prototype._draw = function () {
    var ctx = this.ctx;
    var W = this.canvas.clientWidth, H = this.canvas.clientHeight;
    this._time += 0.016;
    var time = this._time;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Deep-space background (near-black navy, like the reference canvas)
    var bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 40, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
    bg.addColorStop(0, "#0a0a1c");
    bg.addColorStop(0.6, "#04050d");
    bg.addColorStop(1, "#000000");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var cam = this._camera();

    // Nebula clouds — large additive radial glows that parallax with the camera.
    ctx.globalCompositeOperation = "lighter";
    for (var nb = 0; nb < this._nebulae.length; nb++) {
      var ne = this._nebulae[nb];
      var pn = this._project(ne, cam);
      if (!pn) continue;
      var rad = ne.size * pn.scale;
      if (rad < 8) continue;
      var puls = 0.85 + 0.15 * Math.sin(time * 0.25 + ne.ph);
      var gN = ctx.createRadialGradient(pn.sx, pn.sy, 0, pn.sx, pn.sy, rad);
      gN.addColorStop(0, "rgba(" + ne.col[0] + "," + ne.col[1] + "," + ne.col[2] + "," + (ne.a * puls) + ")");
      gN.addColorStop(1, "rgba(" + ne.col[0] + "," + ne.col[1] + "," + ne.col[2] + ",0)");
      ctx.fillStyle = gN;
      ctx.beginPath(); ctx.arc(pn.sx, pn.sy, rad, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    // Stars (multi-layer, near layer twinkles)
    for (var i = 0; i < this.stars.length; i++) {
      var s = this.stars[i];
      var ps = this._project(s, cam);
      if (!ps || ps.sx < 0 || ps.sx > W || ps.sy < 0 || ps.sy > H) continue;
      var tw = s.tw ? (0.6 + 0.4 * Math.sin(time * 2.2 + s.ph)) : 1;
      ctx.globalAlpha = Math.min(1, s.b * tw * Math.min(1, 1800 / ps.depth));
      ctx.fillStyle = s.col || "#cfd6f0";
      ctx.fillRect(ps.sx, ps.sy, s.sz, s.sz);
    }
    ctx.globalAlpha = 1;

    var self = this;
    var pathOn = !!this.pathNodes;
    var active = this.hoverId || this.selectedId;
    var neighbors = {};
    if (active) {
      neighbors[active] = true;
      this.edges.forEach(function (e) {
        if (e.source === active) neighbors[e.target] = true;
        if (e.target === active) neighbors[e.source] = true;
      });
    }

    // Radiance — faint gold lines from the core out to each family cluster,
    // so everything visibly emanates from the centre.
    var corePix = this._project(v(0, 0, 0), cam);
    if (corePix && !pathOn) {
      for (var gA in this.clusterAnchors) {
        var pa = this._project(this.clusterAnchors[gA], cam);
        if (!pa) continue;
        var rf = Math.min(1, 900 / pa.depth);
        ctx.beginPath();
        ctx.moveTo(corePix.sx, corePix.sy);
        ctx.lineTo(pa.sx, pa.sy);
        ctx.strokeStyle = "rgba(240,201,78," + (0.10 * rf) + ")";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Constellation labels — faint family names floating over each cluster.
    if (this.showConstellations && !pathOn) this._drawConstellations(cam);

    // Edges (projected, depth-faded)
    for (var k = 0; k < this.edges.length; k++) {
      var e = this.edges[k];
      var s1 = this.nodeById[e.source], s2 = this.nodeById[e.target];
      var p1 = this._project(s1, cam), p2 = this._project(s2, cam);
      if (!p1 || !p2) continue;
      var depthFade = Math.min(1, 900 / ((p1.depth + p2.depth) / 2));
      var onPath = pathOn && this.pathEdges[edgeKey(e.source, e.target)];
      var lit = active && (e.source === active || e.target === active);
      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p2.sx, p2.sy);
      if (onPath) { ctx.strokeStyle = "rgba(232,180,72," + (0.95 * depthFade) + ")"; ctx.lineWidth = 2.4; }
      else if (pathOn) { ctx.strokeStyle = "rgba(150,160,200," + (0.04 * depthFade) + ")"; ctx.lineWidth = 0.5; }
      else if (lit) { ctx.strokeStyle = "rgba(216,168,56," + (0.85 * depthFade) + ")"; ctx.lineWidth = 1.6; }
      else if (active) { ctx.strokeStyle = "rgba(150,160,200," + (0.05 * depthFade) + ")"; ctx.lineWidth = 0.6; }
      else { ctx.strokeStyle = "rgba(150,165,210," + (0.14 * depthFade) + ")"; ctx.lineWidth = 0.7; }
      ctx.stroke();
    }

    // Nodes — far to near (painter's algorithm). The luminous core is
    // depth-sorted in with the people so it occludes correctly.
    var drawList = [];
    for (var m = 0; m < this.nodes.length; m++) {
      var nn = this.nodes[m];
      var pp = this._project(nn, cam);
      if (!pp) continue;
      drawList.push({ n: nn, p: pp });
    }
    if (corePix) drawList.push({ core: true, p: corePix });
    drawList.sort(function (a, b) { return b.p.depth - a.p.depth; });
    this._screen = {}; // cache for hit-testing

    for (var di = 0; di < drawList.length; di++) {
      if (drawList[di].core) { this._drawCore(ctx, drawList[di].p, time); continue; }
      var node = drawList[di].n, proj = drawList[di].p;
      var onPath = pathOn && this.pathNodes[node.id];
      var dim = pathOn ? !onPath : ((active && !neighbors[node.id]) || node.dim);
      var isSel = node.id === this.selectedId || onPath;
      var isHover = node.id === this.hoverId;
      var rad = node.r * proj.scale * (isSel ? 1.5 : isHover ? 1.28 : 1);
      rad = Math.max(3, Math.min(rad, 80));
      this._screen[node.id] = { sx: proj.sx, sy: proj.sy, r: rad, depth: proj.depth };

      ctx.globalAlpha = dim ? 0.2 : Math.min(1, Math.max(0.55, 1500 / proj.depth));

      if (isSel) { ctx.save(); ctx.shadowColor = "rgba(216,168,56,0.9)"; ctx.shadowBlur = 26; }
      try {
        if (this.drawNode) {
          // The app draws a billboarded card (seal + floating name) here.
          this.drawNode(ctx, node.id, proj.sx, proj.sy, rad, { selected: isSel, hover: isHover, dim: dim });
        } else if (this.getSprite && this.getSprite(node.id)) {
          var sprite = this.getSprite(node.id);
          var size = rad * 2.4;
          ctx.drawImage(sprite, proj.sx - size / 2, proj.sy - size / 2, size, size);
        } else {
          // Last-resort glowing orb so a node is always visible.
          var gg = ctx.createRadialGradient(proj.sx, proj.sy, 1, proj.sx, proj.sy, rad * 1.6);
          gg.addColorStop(0, node.color || "#9aa6c0");
          gg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gg;
          ctx.beginPath(); ctx.arc(proj.sx, proj.sy, rad * 1.6, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(proj.sx, proj.sy, rad, 0, Math.PI * 2);
          ctx.fillStyle = node.color || "#9aa6c0"; ctx.fill();
        }
      } catch (err) {
        ctx.beginPath(); ctx.arc(proj.sx, proj.sy, rad, 0, Math.PI * 2);
        ctx.fillStyle = node.color || "#9aa6c0"; ctx.fill();
      }
      if (isSel) ctx.restore();
      ctx.globalAlpha = 1;

      // When the app supplies drawNode, the card already carries the name.
      // Otherwise fall back to a floating label for near/active nodes.
      if (!this.drawNode) {
        var showLabel = !dim && (proj.scale > 0.7 || isSel || isHover);
        if (showLabel) {
          var fs = Math.max(10, Math.min(15, 12 * proj.scale));
          ctx.font = (isSel || isHover ? "600 " : "") + fs + "px 'Inter', system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.globalAlpha = dim ? 0.2 : 0.95;
          ctx.fillStyle = "#0a0c14";
          ctx.fillText(node.name, proj.sx + 1, proj.sy + rad + 4);
          ctx.fillStyle = "#ede7d6";
          ctx.fillText(node.name, proj.sx, proj.sy + rad + 3);
          ctx.globalAlpha = 1;
        }
      }
    }
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  };

  /* The luminous core at the centre of the universe — the divine light
   * from which every story radiates. Pulsing additive halo + bright orb. */
  PQGraph3D.prototype._drawCore = function (ctx, p, time) {
    var base = 46 * p.scale;
    var pulse = 1 + 0.05 * Math.sin(time * 1.4);
    var R = Math.max(10, base * pulse);
    var col = this.coreColor;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Wide soft aura
    var aura = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, R * 3.4);
    aura.addColorStop(0, "rgba(255,236,170,0.55)");
    aura.addColorStop(0.25, "rgba(240,201,78,0.30)");
    aura.addColorStop(1, "rgba(240,201,78,0)");
    ctx.fillStyle = aura;
    ctx.beginPath(); ctx.arc(p.sx, p.sy, R * 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    // Bright core orb with a hot centre
    var core = ctx.createRadialGradient(p.sx - R * 0.25, p.sy - R * 0.25, R * 0.1, p.sx, p.sy, R);
    core.addColorStop(0, "#fffdf5");
    core.addColorStop(0.45, "#ffe9a8");
    core.addColorStop(1, col);
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(p.sx, p.sy, R, 0, Math.PI * 2); ctx.fill();

    // Faceted ring (a nod to the reference's wireframe icosahedron)
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgba(255,240,190,0.5)";
    ctx.lineWidth = 1.2;
    var pts = 12;
    ctx.beginPath();
    for (var k = 0; k <= pts; k++) {
      var a = (Math.PI * 2 * k) / pts + time * 0.2;
      var rr = R * (1.5 + 0.12 * Math.sin(k * 2 + time));
      var x = p.sx + Math.cos(a) * rr, y = p.sy + Math.sin(a) * rr * 0.6;
      if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  };

  /* Faint family-cluster labels, drawn behind the nodes. */
  PQGraph3D.prototype._drawConstellations = function (cam) {
    var groups = {};
    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i];
      if (!n.group || n.dim) continue;
      var g = groups[n.group] || (groups[n.group] = { sx: 0, sy: 0, sz: 0, c: 0 });
      g.sx += n.x; g.sy += n.y; g.sz += n.z; g.c++;
    }
    var ctx = this.ctx;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var name in groups) {
      var gr = groups[name];
      if (gr.c < 2) continue;
      var c = v(gr.sx / gr.c, gr.sy / gr.c, gr.sz / gr.c);
      var pr = this._project(c, cam);
      if (!pr) continue;
      var alpha = Math.min(0.5, Math.max(0.08, 700 / pr.depth * 0.5));
      var fs = Math.max(11, Math.min(22, 17 * pr.scale));
      ctx.font = "600 " + fs + "px 'Iowan Old Style', 'Palatino Linotype', Georgia, serif";
      ctx.fillStyle = "rgba(216,178,90," + alpha + ")";
      // letter-spaced, uppercased family name
      var label = name.toUpperCase();
      var spaced = label.split("").join(" ");
      ctx.fillText(spaced, pr.sx, pr.sy);
    }
    ctx.restore();
  };

  /* ---- Hit testing against the last rendered frame ---- */
  PQGraph3D.prototype._hit = function (px, py) {
    var best = null, bestDepth = Infinity;
    var sc = this._screen || {};
    for (var id in sc) {
      var s = sc[id];
      var dx = s.sx - px, dy = s.sy - py;
      var rr = (s.r + 6) * (s.r + 6);
      if (dx * dx + dy * dy <= rr && s.depth < bestDepth) {
        bestDepth = s.depth; best = id;
      }
    }
    return best;
  };

  PQGraph3D.prototype._bind = function () {
    var self = this;
    var c = this.canvas;
    function pos(ev) {
      var rect = c.getBoundingClientRect();
      var t = ev.touches ? ev.touches[0] : ev;
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }

    c.addEventListener("mousedown", function (ev) {
      self.skipIntro();
      var p = pos(ev);
      self._dragging = true; self._moved = 0;
      self._lastX = p.x; self._lastY = p.y; self._downAt = Date.now();
      self.autoRotate = false;
    });
    window.addEventListener("mousemove", function (ev) {
      var p = pos(ev);
      if (self._dragging) {
        var dx = p.x - self._lastX, dy = p.y - self._lastY;
        self._moved += Math.abs(dx) + Math.abs(dy);
        self.theta -= dx * 0.006;
        self.phi = Math.max(0.18, Math.min(Math.PI - 0.18, self.phi - dy * 0.006));
        self._lastX = p.x; self._lastY = p.y;
      } else {
        var id = self._hit(p.x, p.y);
        if (id !== self.hoverId) {
          self.hoverId = id;
          c.style.cursor = id ? "pointer" : "grab";
          self.onHover(id, id ? self.nodeById[id] : null, p);
        }
      }
    });
    window.addEventListener("mouseup", function (ev) {
      if (self._dragging && self._moved < 5) {
        var p = pos(ev);
        var id = self._hit(p.x, p.y);
        if (id) { self.selectedId = id; self.onSelect(id); }
      }
      self._dragging = false;
    });
    c.addEventListener("wheel", function (ev) {
      ev.preventDefault();
      self.skipIntro();
      self.radius = Math.max(180, Math.min(2400, self.radius * Math.pow(1.0014, ev.deltaY)));
    }, { passive: false });

    // Touch
    c.addEventListener("touchstart", function (ev) {
      self.skipIntro();
      var p = pos(ev);
      self._dragging = true; self._moved = 0; self.autoRotate = false;
      self._lastX = p.x; self._lastY = p.y;
      self._pinch = ev.touches.length === 2 ? self._touchDist(ev) : null;
    }, { passive: true });
    c.addEventListener("touchmove", function (ev) {
      if (ev.touches.length === 2 && self._pinch) {
        var d = self._touchDist(ev);
        self.radius = Math.max(180, Math.min(2400, self.radius * (self._pinch / d)));
        self._pinch = d;
        return;
      }
      var p = pos(ev);
      var dx = p.x - self._lastX, dy = p.y - self._lastY;
      self._moved += Math.abs(dx) + Math.abs(dy);
      self.theta -= dx * 0.006;
      self.phi = Math.max(0.18, Math.min(Math.PI - 0.18, self.phi - dy * 0.006));
      self._lastX = p.x; self._lastY = p.y;
    }, { passive: true });
    c.addEventListener("touchend", function () {
      if (self._dragging && self._moved < 6 && self._lastX != null) {
        var id = self._hit(self._lastX, self._lastY);
        if (id) { self.selectedId = id; self.onSelect(id); }
      }
      self._dragging = false; self._pinch = null;
    });

    window.addEventListener("resize", function () { self._resize(); });
  };

  PQGraph3D.prototype._touchDist = function (ev) {
    var a = ev.touches[0], b = ev.touches[1];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  PQGraph3D.prototype.setAutoRotate = function (on) { this.autoRotate = on; };
  PQGraph3D.prototype.stop = function () { this._running = false; };

  PQGraph3D.prototype._resize = function () {
    var c = this.canvas;
    this.dpr = window.devicePixelRatio || 1;
    c.width = c.clientWidth * this.dpr;
    c.height = c.clientHeight * this.dpr;
  };

  window.PQGraph3D = PQGraph3D;
})();
