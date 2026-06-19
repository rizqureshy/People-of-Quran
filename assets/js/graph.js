/*
 * Living Canvas — a small, dependency-free force-directed graph.
 * ------------------------------------------------------------------
 * Renders people as nodes and relationships as edges on an HTML
 * canvas, with a basic force simulation (repulsion + spring + gravity),
 * pan, zoom, hover, drag, and selection.
 *
 * It exposes a single constructor: new PQGraph(canvas, options).
 */

(function () {
  "use strict";

  function PQGraph(canvas, options) {
    options = options || {};
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.nodes = [];
    this.edges = [];
    this.nodeById = {};
    this.onSelect = options.onSelect || function () {};
    this.onHover = options.onHover || function () {};

    // View transform
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;

    // Interaction state
    this.hoverId = null;
    this.selectedId = null;
    this.dragNode = null;
    this.dragMoved = false;
    this.panning = false;
    this.lastX = 0;
    this.lastY = 0;
    this.dpr = window.devicePixelRatio || 1;

    this._bindEvents();
    this._resize();
    this._running = true;
    this._tick = this._tick.bind(this);
    requestAnimationFrame(this._tick);
  }

  /* Build/replace the graph from a node + edge spec. Positions are
   * seeded near the centre so the simulation can spread them out. */
  PQGraph.prototype.setData = function (nodes, edges) {
    var self = this;
    var prev = this.nodeById;
    var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    this.nodes = nodes.map(function (n, i) {
      var old = prev[n.id];
      var angle = (i / Math.max(1, nodes.length)) * Math.PI * 2;
      var radius = 120 + (i % 7) * 26;
      return Object.assign({}, n, {
        x: old ? old.x : w / 2 + Math.cos(angle) * radius,
        y: old ? old.y : h / 2 + Math.sin(angle) * radius,
        vx: 0, vy: 0,
        r: n.r || 9
      });
    });
    this.nodeById = {};
    this.nodes.forEach(function (n) { self.nodeById[n.id] = n; });
    this.edges = edges.filter(function (e) {
      return self.nodeById[e.source] && self.nodeById[e.target];
    });
    this.alpha = 1; // reheat the simulation
  };

  PQGraph.prototype.center = function () {
    if (!this.nodes.length) return;
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    this.nodes.forEach(function (n) {
      minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x);
      minY = Math.min(minY, n.y); maxY = Math.max(maxY, n.y);
    });
    var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    var gw = (maxX - minX) || 1, gh = (maxY - minY) || 1;
    var pad = 90;
    this.scale = Math.min((w - pad) / gw, (h - pad) / gh, 1.6);
    this.scale = Math.max(0.2, this.scale);
    this.offsetX = w / 2 - ((minX + maxX) / 2) * this.scale;
    this.offsetY = h / 2 - ((minY + maxY) / 2) * this.scale;
  };

  PQGraph.prototype.focusNode = function (id) {
    var n = this.nodeById[id];
    if (!n) return;
    var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    this.scale = Math.max(this.scale, 1.1);
    this.offsetX = w / 2 - n.x * this.scale;
    this.offsetY = h / 2 - n.y * this.scale;
  };

  PQGraph.prototype.setSelected = function (id) { this.selectedId = id; };

  /* ---- Force simulation (runs only while "warm") ---- */
  PQGraph.prototype._simulate = function () {
    if (this.alpha === undefined) this.alpha = 0;
    if (this.alpha < 0.005) return; // settled — save cycles
    var nodes = this.nodes, edges = this.edges;
    var n = nodes.length;
    var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    var cx = w / 2, cy = h / 2;

    // Repulsion (naive O(n^2) — fine for this dataset size)
    for (var i = 0; i < n; i++) {
      var a = nodes[i];
      for (var j = i + 1; j < n; j++) {
        var b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d2 = dx * dx + dy * dy || 0.01;
        var d = Math.sqrt(d2);
        var force = 2600 / d2;
        var fx = (dx / d) * force, fy = (dy / d) * force;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      }
      // Gravity toward centre
      a.vx += (cx - a.x) * 0.0016;
      a.vy += (cy - a.y) * 0.0016;
    }

    // Springs along edges
    var target = 78;
    for (var k = 0; k < edges.length; k++) {
      var e = edges[k];
      var s = this.nodeById[e.source], t = this.nodeById[e.target];
      var dx2 = t.x - s.x, dy2 = t.y - s.y;
      var dist = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 0.01;
      var disp = (dist - target) * 0.02;
      var ux = dx2 / dist, uy = dy2 / dist;
      s.vx += ux * disp; s.vy += uy * disp;
      t.vx -= ux * disp; t.vy -= uy * disp;
    }

    // Integrate
    for (var m = 0; m < n; m++) {
      var p = nodes[m];
      if (p === this.dragNode) { p.vx = 0; p.vy = 0; continue; }
      p.vx *= 0.85; p.vy *= 0.85;
      p.x += p.vx * this.alpha;
      p.y += p.vy * this.alpha;
    }
    this.alpha *= 0.985;
  };

  PQGraph.prototype._tick = function () {
    if (!this._running) return;
    this._simulate();
    this._draw();
    requestAnimationFrame(this._tick);
  };

  PQGraph.prototype._draw = function () {
    var ctx = this.ctx;
    var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    var self = this;
    var active = this.hoverId || this.selectedId;
    var neighbors = {};
    if (active) {
      neighbors[active] = true;
      this.edges.forEach(function (e) {
        if (e.source === active) neighbors[e.target] = true;
        if (e.target === active) neighbors[e.source] = true;
      });
    }

    // Edges
    this.edges.forEach(function (e) {
      var s = self.nodeById[e.source], t = self.nodeById[e.target];
      var lit = active && (e.source === active || e.target === active);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      ctx.strokeStyle = lit ? "rgba(201,145,33,0.75)" : (active ? "rgba(120,120,140,0.06)" : "rgba(140,140,160,0.16)");
      ctx.lineWidth = (lit ? 1.6 : 0.7) / self.scale;
      ctx.stroke();
    });

    // Nodes
    this.nodes.forEach(function (nn) {
      var dim = active && !neighbors[nn.id];
      var isSel = nn.id === self.selectedId;
      var isHover = nn.id === self.hoverId;
      var r = nn.r * (isSel ? 1.5 : isHover ? 1.3 : 1);

      // Halo for selected
      if (isSel) {
        ctx.beginPath();
        ctx.arc(nn.x, nn.y, r + 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,145,33,0.18)";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(nn.x, nn.y, r, 0, Math.PI * 2);
      ctx.fillStyle = nn.color || "#888";
      ctx.globalAlpha = dim ? 0.18 : 1;
      ctx.fill();

      // Ring: solid for named, dashed for unnamed
      ctx.lineWidth = 1.6 / self.scale;
      ctx.strokeStyle = nn.named ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.85)";
      if (!nn.named) ctx.setLineDash([3 / self.scale, 2.5 / self.scale]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Labels for big/active nodes
      var showLabel = !dim && (self.scale > 0.55 || isSel || isHover || nn.r > 11);
      if (showLabel) {
        var fontSize = Math.max(9, 11 / self.scale);
        ctx.font = (isSel || isHover ? "600 " : "") + fontSize + "px 'Inter', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.globalAlpha = dim ? 0.2 : 0.92;
        ctx.fillStyle = "#e9e4d6";
        ctx.fillText(nn.name, nn.x, nn.y + r + 3 / self.scale);
        ctx.globalAlpha = 1;
      }
    });

    ctx.restore();
  };

  /* ---- Coordinate helpers ---- */
  PQGraph.prototype._toWorld = function (px, py) {
    return { x: (px - this.offsetX) / this.scale, y: (py - this.offsetY) / this.scale };
  };
  PQGraph.prototype._hitTest = function (px, py) {
    var p = this._toWorld(px, py);
    var best = null, bestD = Infinity;
    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i];
      var dx = n.x - p.x, dy = n.y - p.y;
      var d = dx * dx + dy * dy;
      var rr = (n.r + 7) * (n.r + 7);
      if (d < rr && d < bestD) { bestD = d; best = n; }
    }
    return best;
  };

  PQGraph.prototype._bindEvents = function () {
    var self = this;
    var c = this.canvas;

    function pos(ev) {
      var rect = c.getBoundingClientRect();
      var t = ev.touches ? ev.touches[0] : ev;
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }

    c.addEventListener("mousedown", function (ev) {
      var p = pos(ev);
      var hit = self._hitTest(p.x, p.y);
      self.dragMoved = false;
      if (hit) {
        self.dragNode = hit;
        self.alpha = Math.max(self.alpha || 0, 0.3);
      } else {
        self.panning = true;
      }
      self.lastX = p.x; self.lastY = p.y;
    });

    window.addEventListener("mousemove", function (ev) {
      var p = pos(ev);
      if (self.dragNode) {
        var w = self._toWorld(p.x, p.y);
        self.dragNode.x = w.x; self.dragNode.y = w.y;
        self.dragMoved = true;
        self.alpha = Math.max(self.alpha || 0, 0.2);
      } else if (self.panning) {
        self.offsetX += p.x - self.lastX;
        self.offsetY += p.y - self.lastY;
        self.lastX = p.x; self.lastY = p.y;
      } else {
        var hit = self._hitTest(p.x, p.y);
        var id = hit ? hit.id : null;
        if (id !== self.hoverId) {
          self.hoverId = id;
          c.style.cursor = id ? "pointer" : "grab";
          self.onHover(id, hit, p);
        }
      }
    });

    window.addEventListener("mouseup", function () {
      if (self.dragNode && !self.dragMoved) {
        self.selectedId = self.dragNode.id;
        self.onSelect(self.dragNode.id);
      }
      self.dragNode = null;
      self.panning = false;
    });

    c.addEventListener("wheel", function (ev) {
      ev.preventDefault();
      var p = pos(ev);
      var before = self._toWorld(p.x, p.y);
      var factor = Math.pow(1.0015, -ev.deltaY);
      self.scale = Math.max(0.15, Math.min(4, self.scale * factor));
      var after = self._toWorld(p.x, p.y);
      self.offsetX += (after.x - before.x) * self.scale;
      self.offsetY += (after.y - before.y) * self.scale;
    }, { passive: false });

    // Touch (basic single-finger drag/select)
    c.addEventListener("touchstart", function (ev) {
      var p = pos(ev);
      var hit = self._hitTest(p.x, p.y);
      self.dragMoved = false;
      if (hit) { self.dragNode = hit; } else { self.panning = true; }
      self.lastX = p.x; self.lastY = p.y;
    }, { passive: true });
    c.addEventListener("touchmove", function (ev) {
      var p = pos(ev);
      if (self.dragNode) {
        var w = self._toWorld(p.x, p.y);
        self.dragNode.x = w.x; self.dragNode.y = w.y;
        self.dragMoved = true;
        self.alpha = Math.max(self.alpha || 0, 0.2);
      } else if (self.panning) {
        self.offsetX += p.x - self.lastX;
        self.offsetY += p.y - self.lastY;
        self.lastX = p.x; self.lastY = p.y;
      }
    }, { passive: true });
    c.addEventListener("touchend", function () {
      if (self.dragNode && !self.dragMoved) {
        self.selectedId = self.dragNode.id;
        self.onSelect(self.dragNode.id);
      }
      self.dragNode = null; self.panning = false;
    });

    window.addEventListener("resize", function () { self._resize(); });
  };

  PQGraph.prototype._resize = function () {
    var c = this.canvas;
    this.dpr = window.devicePixelRatio || 1;
    c.width = c.clientWidth * this.dpr;
    c.height = c.clientHeight * this.dpr;
  };

  window.PQGraph = PQGraph;
})();
