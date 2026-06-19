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

    this._makeStars(460);
    this._bind();
    this._resize();
    this._running = true;
    this._tick = this._tick.bind(this);
    requestAnimationFrame(this._tick);
  }

  PQGraph3D.prototype._makeStars = function (n) {
    this.stars = [];
    for (var i = 0; i < n; i++) {
      // Random point in a large spherical shell around the scene.
      var u = Math.random() * 2 - 1;
      var t = Math.random() * Math.PI * 2;
      var r = 1700 + Math.random() * 2600;
      var s = Math.sqrt(1 - u * u);
      this.stars.push({
        x: r * s * Math.cos(t), y: r * u, z: r * s * Math.sin(t),
        b: 0.25 + Math.random() * 0.6, sz: Math.random() < 0.12 ? 1.8 : 1
      });
    }
  };

  PQGraph3D.prototype.setData = function (nodes, edges) {
    var self = this;
    var prev = this.nodeById;
    var R = 360;
    this.nodes = nodes.map(function (n, i) {
      var old = prev[n.id];
      // Seed on a sphere (Fibonacci) so the initial cloud is even.
      var t = (i + 0.5) / nodes.length;
      var inc = Math.acos(1 - 2 * t);
      var az = Math.PI * (1 + Math.sqrt(5)) * i;
      return Object.assign({}, n, {
        x: old ? old.x : R * Math.sin(inc) * Math.cos(az),
        y: old ? old.y : R * Math.cos(inc),
        z: old ? old.z : R * Math.sin(inc) * Math.sin(az),
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
      // Gentle pull to origin keeps the cloud cohesive.
      a.vx -= a.x * 0.0009; a.vy -= a.y * 0.0009; a.vz -= a.z * 0.0009;
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
    // Smoothly chase a focus target if one was requested.
    if (this._focus) {
      this.target.x += (this._focus.x - this.target.x) * 0.08;
      this.target.y += (this._focus.y - this.target.y) * 0.08;
      this.target.z += (this._focus.z - this.target.z) * 0.08;
      if (Math.abs(this._focus.x - this.target.x) < 1) this._focus = null;
    }
    if (this.autoRotate && !this._dragging) this.theta += 0.0016;

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
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Deep-space background
    var bg = ctx.createRadialGradient(W * 0.5, H * 0.42, 40, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
    bg.addColorStop(0, "#161a28");
    bg.addColorStop(0.55, "#0f111b");
    bg.addColorStop(1, "#070810");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var cam = this._camera();

    // Stars
    for (var i = 0; i < this.stars.length; i++) {
      var s = this.stars[i];
      var ps = this._project(s, cam);
      if (!ps || ps.sx < 0 || ps.sx > W || ps.sy < 0 || ps.sy > H) continue;
      ctx.globalAlpha = s.b * Math.min(1, 1400 / ps.depth);
      ctx.fillStyle = "#cfd6f0";
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

    // Nodes — far to near (painter's algorithm)
    var drawList = [];
    for (var m = 0; m < this.nodes.length; m++) {
      var nn = this.nodes[m];
      var pp = this._project(nn, cam);
      if (!pp) continue;
      drawList.push({ n: nn, p: pp });
    }
    drawList.sort(function (a, b) { return b.p.depth - a.p.depth; });
    this._screen = {}; // cache for hit-testing

    for (var di = 0; di < drawList.length; di++) {
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
          // Draw the seal live, directly onto the scene.
          this.drawNode(ctx, node.id, proj.sx, proj.sy, rad);
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

      // Labels for near / active nodes
      var showLabel = !dim && (proj.scale > 0.7 || isSel || isHover);
      if (showLabel) {
        var fs = Math.max(10, Math.min(15, 12 * proj.scale));
        ctx.font = (isSel || isHover ? "600 " : "") + fs + "px 'Inter', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.globalAlpha = dim ? 0.2 : 0.95;
        ctx.fillStyle = "#0a0c14";
        ctx.fillText(node.name, proj.sx + 1, proj.sy + rad + 4); // shadow
        ctx.fillStyle = "#ede7d6";
        ctx.fillText(node.name, proj.sx, proj.sy + rad + 3);
        ctx.globalAlpha = 1;
      }
    }
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
      self.radius = Math.max(180, Math.min(2400, self.radius * Math.pow(1.0014, ev.deltaY)));
    }, { passive: false });

    // Touch
    c.addEventListener("touchstart", function (ev) {
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
