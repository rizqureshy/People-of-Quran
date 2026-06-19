/*
 * People of the Quran — application shell.
 * ------------------------------------------------------------------
 * Wires the dataset to the living-canvas graph and the surrounding UI:
 * search, archetype & knowledge-layer filters, the people index, the
 * story threads, and the detail drawer that preserves every source.
 */

(function () {
  "use strict";

  var DATA = window.PQ_DATA;
  var layerById = index(DATA.layers);
  var archById = index(DATA.archetypes);
  var personById = index(DATA.people);

  function index(arr) {
    var o = {};
    arr.forEach(function (x) { o[x.id] = x; });
    return o;
  }

  /* Colour a person node by its primary archetype, falling back to a
   * neutral tone. This makes the canvas legible at a glance. */
  var archetypeColor = {
    prophet: "#2a9d8f", "truth-seeker": "#48bfe3", tyrant: "#bc4749",
    reformer: "#e9c46a", "believing-woman": "#e07a9c", skeptic: "#9d8189",
    advisor: "#6d6875", hypocrite: "#7d8597", martyr: "#b5179e",
    repentant: "#80b918", "arrogant-elite": "#9c6644", oppressed: "#577590",
    "faithful-companion": "#f4a261"
  };
  function colorFor(p) {
    // Prefer the depiction palette so list dots match the 3D seals.
    if (window.PQDepict) return window.PQDepict.colorFor(p);
    var a = (p.archetypes && p.archetypes[0]) || null;
    return (a && archetypeColor[a]) || "#8d99ae";
  }

  /* ---- State ---- */
  var state = {
    activeArchetypes: {},     // id -> true (empty = all)
    activeLayers: {},         // id -> true (empty = all)
    search: "",
    selected: null,
    pathMode: false,          // awaiting path endpoint clicks
    pathStart: null,
    activePath: null,         // the currently highlighted path (for engine swaps)
    constellations: true
  };

  /* ---- Build graph node/edge spec from people ---- */
  function buildGraphSpec() {
    var nodes = DATA.people.map(function (p) {
      var degree = (p.relations || []).length;
      return {
        id: p.id, name: p.name, named: p.named, group: p.group,
        color: colorFor(p),
        r: 8 + Math.min(7, degree * 0.8) + (p.isCommunity ? 1 : 0)
      };
    });
    var seen = {};
    var edges = [];
    DATA.people.forEach(function (p) {
      (p.relations || []).forEach(function (rel) {
        if (!personById[rel.to]) return;
        var key = [p.id, rel.to].sort().join("|");
        if (seen[key]) return;
        seen[key] = true;
        edges.push({ source: p.id, target: rel.to });
      });
    });
    return { nodes: nodes, edges: edges };
  }

  /* A person passes the current filters if it matches every active
   * facet group (archetype AND layer AND search). */
  function passesFilters(p) {
    var aKeys = Object.keys(state.activeArchetypes);
    if (aKeys.length) {
      var hit = aKeys.some(function (a) { return (p.archetypes || []).indexOf(a) >= 0; });
      if (!hit) return false;
    }
    var lKeys = Object.keys(state.activeLayers);
    if (lKeys.length) {
      var lhit = lKeys.some(function (l) { return (p.sources || []).indexOf(l) >= 0; });
      if (!lhit) return false;
    }
    if (state.search) {
      var q = state.search.toLowerCase();
      var hay = (p.name + " " + (p.title || "") + " " +
                 Object.values(p.names || {}).join(" ") + " " +
                 (p.group || "")).toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  }

  var graph;

  /* ================= Rendering ================= */

  function renderArchetypes() {
    var el = document.getElementById("archetype-list");
    el.innerHTML = "";
    DATA.archetypes.forEach(function (a) {
      var count = DATA.people.filter(function (p) {
        return (p.archetypes || []).indexOf(a.id) >= 0;
      }).length;
      var chip = document.createElement("button");
      chip.className = "chip" + (state.activeArchetypes[a.id] ? " active" : "");
      chip.innerHTML = '<span class="chip-icon">' + a.icon + '</span>' +
        '<span>' + a.label + '</span><span class="chip-count">' + count + '</span>';
      chip.title = a.desc;
      chip.onclick = function () {
        if (state.activeArchetypes[a.id]) delete state.activeArchetypes[a.id];
        else state.activeArchetypes[a.id] = true;
        applyFilters();
      };
      el.appendChild(chip);
    });
  }

  function renderLayers() {
    var el = document.getElementById("layer-list");
    el.innerHTML = "";
    DATA.layers.forEach(function (l) {
      var chip = document.createElement("button");
      chip.className = "layer-chip" + (state.activeLayers[l.id] ? " active" : "");
      chip.innerHTML = '<span class="dot" style="background:' + l.color + '"></span>' + l.label;
      chip.title = l.desc;
      chip.onclick = function () {
        if (state.activeLayers[l.id]) delete state.activeLayers[l.id];
        else state.activeLayers[l.id] = true;
        applyFilters();
      };
      el.appendChild(chip);
    });
  }

  function renderPeopleList() {
    var el = document.getElementById("people-list");
    el.innerHTML = "";
    var groups = {};
    DATA.people.forEach(function (p) {
      if (!passesFilters(p)) return;
      (groups[p.group] = groups[p.group] || []).push(p);
    });
    var order = [];
    DATA.people.forEach(function (p) { if (order.indexOf(p.group) < 0) order.push(p.group); });

    var total = 0;
    order.forEach(function (g) {
      if (!groups[g]) return;
      var head = document.createElement("div");
      head.className = "group-head";
      head.textContent = g;
      el.appendChild(head);
      groups[g].forEach(function (p) {
        total++;
        var item = document.createElement("button");
        item.className = "person-item" + (state.selected === p.id ? " selected" : "");
        item.innerHTML =
          '<span class="pi-dot" style="background:' + colorFor(p) + '"></span>' +
          '<span class="pi-body"><span class="pi-name">' + p.name +
          (p.named ? '' : ' <span class="tag-unnamed">unnamed</span>') +
          '</span><span class="pi-title">' + (p.title || "") + '</span></span>';
        item.onclick = function () { select(p.id, true); };
        el.appendChild(item);
      });
    });
    document.getElementById("people-count").textContent = total;
    if (!total) {
      var none = document.createElement("div");
      none.className = "empty-note";
      none.textContent = "No people match these filters.";
      el.appendChild(none);
    }
  }

  function renderStories() {
    var el = document.getElementById("story-list");
    el.innerHTML = "";
    DATA.stories.forEach(function (s) {
      var card = document.createElement("button");
      card.className = "story-card";
      card.innerHTML =
        '<span class="story-era">' + s.era + '</span>' +
        '<span class="story-title">' + s.title + '</span>' +
        '<span class="story-summary">' + s.summary + '</span>' +
        '<span class="story-people">' + s.people.length + ' people</span>';
      card.onclick = function () { openStory(s); };
      el.appendChild(card);
    });
  }

  /* Highlight a story by filtering the canvas to its people and opening
   * the first protagonist in the drawer. */
  function openStory(s) {
    state.activeArchetypes = {};
    state.activeLayers = {};
    state.search = "";
    document.getElementById("search").value = "";
    renderArchetypes(); renderLayers();
    // Temporarily emphasise these people on the canvas
    applyFilters({ restrictTo: s.people });
    select(s.people[0], true);
    flashBanner("Story: " + s.title);
  }

  function renderDetail(p) {
    var d = document.getElementById("detail");
    if (!p) {
      d.classList.remove("open");
      return;
    }
    d.classList.add("open");

    var namesRows = Object.keys(p.names || {}).map(function (k) {
      return '<div class="name-row"><span class="name-key">' + k + '</span><span class="name-val">' +
        p.names[k] + '</span></div>';
    }).join("");

    var archChips = (p.archetypes || []).map(function (a) {
      var arch = archById[a];
      return arch ? '<span class="mini-arch" title="' + arch.desc + '">' + arch.icon + ' ' + arch.label + '</span>' : "";
    }).join("");

    var entries = (p.entries || []).map(function (e) {
      var l = layerById[e.layer] || { label: e.layer, color: "#888" };
      return '<div class="entry">' +
        '<div class="entry-head"><span class="entry-layer" style="background:' + l.color + '">' +
        l.label + '</span>' + (e.ref ? '<span class="entry-ref">' + e.ref + '</span>' : '') + '</div>' +
        '<div class="entry-text">' + e.text + '</div></div>';
    }).join("");

    var lessons = (p.lessons || []).map(function (x) {
      return '<li>' + x + '</li>';
    }).join("");

    var rels = (p.relations || []).filter(function (r) { return personById[r.to]; })
      .map(function (r) {
        var other = personById[r.to];
        var label = (DATA.relationTypes[r.type] || r.type);
        return '<button class="rel-link" data-id="' + r.to + '">' +
          '<span class="rel-type">' + label + (r.note ? ' (' + r.note + ')' : '') + '</span>' +
          '<span class="rel-name">' + other.name + '</span></button>';
      }).join("");

    var arabic = window.PQDepict ? window.PQDepict.arabicOf(p) : "";

    d.innerHTML =
      '<button class="detail-close" aria-label="Close">×</button>' +
      '<div class="detail-scroll">' +
        '<div class="detail-depiction">' +
          '<canvas class="seal-canvas" width="320" height="320"></canvas>' +
          (arabic ? '<div class="arabic-name" dir="rtl">' + arabic + '</div>' : '') +
          '<div class="depiction-note">aniconic seal · geometric depiction</div>' +
        '</div>' +
        '<div class="detail-head">' +
          '<div class="detail-kicker">' + (p.era || "") +
            (p.named ? '' : ' · <span class="tag-unnamed">unnamed in the Quran</span>') + '</div>' +
          '<h2 class="detail-name">' + p.name + '</h2>' +
          '<div class="detail-title">' + (p.title || "") + '</div>' +
          (archChips ? '<div class="detail-arch">' + archChips + '</div>' : '') +
        '</div>' +
        (namesRows ? '<div class="detail-section"><h3>Names</h3><div class="names">' + namesRows + '</div></div>' : '') +
        (entries ? '<div class="detail-section"><h3>Knowledge Layers</h3><p class="section-note">Every statement keeps its origin.</p>' + entries + '</div>' : '') +
        (lessons ? '<div class="detail-section"><h3>Lessons</h3><ul class="lessons">' + lessons + '</ul></div>' : '') +
        (rels ? '<div class="detail-section"><h3>Connections</h3><div class="rels">' + rels + '</div></div>' : '') +
      '</div>';

    d.querySelector(".detail-close").onclick = function () {
      state.selected = null;
      graph.setSelected(null);
      renderDetail(null);
      renderPeopleList();
    };
    Array.prototype.forEach.call(d.querySelectorAll(".rel-link"), function (btn) {
      btn.onclick = function () { select(btn.getAttribute("data-id"), true); };
    });

    // Render the person's geometric seal at high resolution.
    var seal = d.querySelector(".seal-canvas");
    if (seal && window.PQDepict) {
      var sctx = seal.getContext("2d");
      window.PQDepict.drawSeal(sctx, seal.width / 2, seal.height / 2, seal.width * 0.4, p, { glow: true });
    }
  }

  /* ================= Behaviour ================= */

  function select(id, focus) {
    var p = personById[id];
    if (!p) return;
    if (state.pathMode) { pathPick(id); }
    state.selected = id;
    graph.setSelected(id);
    if (focus) graph.focusNode(id);
    renderDetail(p);
    renderPeopleList();
  }

  /* ---- Path finding between two people ---- */
  var _adj = null;
  function adjacency() {
    if (_adj) return _adj;
    _adj = {};
    function link(a, b) { (_adj[a] = _adj[a] || []).push(b); }
    DATA.people.forEach(function (p) {
      (p.relations || []).forEach(function (r) {
        if (!personById[r.to]) return;
        link(p.id, r.to); link(r.to, p.id);
      });
    });
    return _adj;
  }

  function shortestPath(a, b) {
    if (a === b) return [a];
    var adj = adjacency();
    var prev = {}, seen = {}; prev[a] = null; seen[a] = true;
    var queue = [a];
    while (queue.length) {
      var cur = queue.shift();
      var nbrs = adj[cur] || [];
      for (var i = 0; i < nbrs.length; i++) {
        var nx = nbrs[i];
        if (seen[nx]) continue;
        seen[nx] = true; prev[nx] = cur;
        if (nx === b) {
          var chain = [b];
          while (prev[chain[0]] != null) chain.unshift(prev[chain[0]]);
          return chain;
        }
        queue.push(nx);
      }
    }
    return null;
  }

  // How a step a -> b reads, honouring direction where possible.
  var INVERSE = {
    parent: "child", child: "parent", ancestor: "descendant", descendant: "ancestor",
    teacher: "student", student: "teacher", ruler: "servant", servant: "ruler",
    successor: "predecessor"
  };
  function relLabel(a, b) {
    var pa = personById[a], pb = personById[b];
    var rel = (pa.relations || []).filter(function (r) { return r.to === b; })[0];
    if (rel) return DATA.relationTypes[rel.type] || rel.type;
    rel = (pb.relations || []).filter(function (r) { return r.to === a; })[0];
    if (rel) {
      var inv = INVERSE[rel.type] || rel.type;
      return DATA.relationTypes[inv] || inv;
    }
    return "connected to";
  }

  function enterPathMode() {
    clearPath(true);                 // clear any existing path first…
    state.pathMode = true;           // …then arm path-picking
    state.pathStart = null;
    var btn = document.getElementById("path-btn");
    if (btn) btn.classList.add("active");
    flashBanner("Path-finder: click the first person");
  }

  function pathPick(id) {
    if (!state.pathStart) {
      state.pathStart = id;
      flashBanner("From " + personById[id].name + " — now click a second person");
      return;
    }
    var path = shortestPath(state.pathStart, id);
    state.pathMode = false;
    var btn = document.getElementById("path-btn");
    if (btn) btn.classList.remove("active");
    if (!path) { flashBanner("No connection found"); state.pathStart = null; return; }
    showPath(path);
    state.pathStart = null;
  }

  function showPath(path) {
    state.activePath = path;
    graph.setPath(path);
    if (graph.setAutoRotate) graph.setAutoRotate(false);
    var panel = document.getElementById("path-panel");
    var html = '<button class="path-close" aria-label="Close">×</button>' +
      '<div class="path-title">A path through the universe · ' + (path.length - 1) + ' step' + (path.length - 1 === 1 ? '' : 's') + '</div>' +
      '<div class="path-chain">';
    path.forEach(function (id, i) {
      if (i > 0) {
        html += '<span class="path-rel">' + relLabel(path[i - 1], id) + '</span>';
      }
      html += '<button class="path-node" data-id="' + id + '">' + personById[id].name + '</button>';
    });
    html += '</div>';
    panel.innerHTML = html;
    panel.classList.add("show");
    panel.querySelector(".path-close").onclick = function () { clearPath(); };
    Array.prototype.forEach.call(panel.querySelectorAll(".path-node"), function (b) {
      b.onclick = function () { select(b.getAttribute("data-id"), true); };
    });
  }

  function clearPath(silent) {
    state.pathMode = false; state.pathStart = null; state.activePath = null;
    if (graph && graph.setPath) graph.setPath(null);
    var panel = document.getElementById("path-panel");
    if (panel) { panel.classList.remove("show"); panel.innerHTML = ""; }
    var btn = document.getElementById("path-btn");
    if (btn) btn.classList.remove("active");
    if (!silent) flashBanner("Path cleared");
  }

  function applyFilters(opts) {
    opts = opts || {};
    // Dim non-matching nodes by recolouring; we rebuild node visuals.
    var spec = buildGraphSpec();
    var restrict = opts.restrictTo ? index(opts.restrictTo.map(function (id) { return { id: id }; })) : null;
    spec.nodes.forEach(function (n) {
      var p = personById[n.id];
      var ok = passesFilters(p) && (!restrict || restrict[n.id]);
      n.dim = !ok;                                // 3D engine reads this
      if (!ok) { n.color = "#2a2d3a"; }           // 2D engine reads colour
    });
    graph.setData(spec.nodes, spec.edges);
    if (state.selected) graph.setSelected(state.selected);
    renderArchetypes();
    renderLayers();
    renderPeopleList();
  }

  var bannerTimer;
  function flashBanner(text) {
    var b = document.getElementById("banner");
    b.textContent = text;
    b.classList.add("show");
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(function () { b.classList.remove("show"); }, 2600);
  }

  /* ================= Tooltip ================= */
  function onHover(id, node, screenPos) {
    var tip = document.getElementById("tooltip");
    if (!id) { tip.classList.remove("show"); return; }
    var p = personById[id];
    if (!p) { tip.classList.remove("show"); return; }
    var ar = window.PQDepict ? window.PQDepict.arabicOf(p) : "";
    tip.innerHTML = '<strong>' + p.name + '</strong>' +
      (ar ? '<span class="tip-ar">' + ar + '</span>' : '') +
      '<span>' + (p.title || "") + '</span>';
    tip.style.left = (screenPos.x + 14) + "px";
    tip.style.top = (screenPos.y + 14) + "px";
    tip.classList.add("show");
  }

  /* ================= Engine (2D / 3D) ================= */
  var mode = "3d";

  function buildEngine() {
    var canvas = document.getElementById("canvas");
    var opts = {
      onSelect: function (id) { select(id, false); },
      onHover: onHover
    };
    if (mode === "3d") {
      opts.personById = personById;
      opts.getSprite = function (id) {
        var p = personById[id];
        return p && window.PQDepict ? window.PQDepict.sprite(p, 128) : null;
      };
      graph = new PQGraph3D(canvas, opts);
    } else {
      graph = new PQGraph(canvas, opts);
    }
    applyFilters();                       // pushes current node/edge state
    if (state.selected) graph.setSelected(state.selected);
    if (state.activePath && graph.setPath) graph.setPath(state.activePath);
    if (graph.setConstellations) graph.setConstellations(state.constellations);
    setTimeout(function () { graph.center(); }, 60);
  }

  function switchMode(next) {
    if (next === mode) return;
    if (graph && graph.stop) graph.stop();
    mode = next;
    buildEngine();
    var btn = document.getElementById("mode-btn");
    if (btn) btn.textContent = mode === "3d" ? "◳ 2D view" : "✦ 3D view";
    var rot = document.getElementById("rotate-btn");
    if (rot) rot.style.display = mode === "3d" ? "" : "none";
    var lbl = document.getElementById("labels-btn");
    if (lbl) lbl.style.display = mode === "3d" ? "" : "none";
    flashBanner(mode === "3d" ? "3D universe" : "2D canvas");
  }

  /* ================= Init ================= */
  function init() {
    buildEngine();

    renderArchetypes();
    renderLayers();
    renderPeopleList();
    renderStories();

    document.getElementById("search").addEventListener("input", function (e) {
      state.search = e.target.value.trim();
      applyFilters();
    });
    document.getElementById("reset-btn").onclick = function () {
      state.activeArchetypes = {}; state.activeLayers = {}; state.search = "";
      state.selected = null;
      clearPath(true);
      document.getElementById("search").value = "";
      graph.setSelected(null);
      renderDetail(null);
      applyFilters();
      setTimeout(function () { graph.center(); }, 40);
    };
    document.getElementById("recenter-btn").onclick = function () {
      if (graph.setAutoRotate) graph.setAutoRotate(true);
      graph.center();
    };

    var modeBtn = document.getElementById("mode-btn");
    if (modeBtn) modeBtn.onclick = function () { switchMode(mode === "3d" ? "2d" : "3d"); };

    var rotateBtn = document.getElementById("rotate-btn");
    if (rotateBtn) rotateBtn.onclick = function () {
      if (!graph.setAutoRotate) return;
      rotateBtn._on = !rotateBtn._on;
      graph.setAutoRotate(rotateBtn._on);
      rotateBtn.classList.toggle("active", rotateBtn._on);
      rotateBtn.textContent = rotateBtn._on ? "⟳ Rotating" : "⏸ Paused";
    };
    if (rotateBtn) { rotateBtn._on = true; rotateBtn.classList.add("active"); }

    var pathBtn = document.getElementById("path-btn");
    if (pathBtn) pathBtn.onclick = function () {
      if (state.pathMode) { clearPath(); }
      else if (state.activePath) { clearPath(); }
      else { enterPathMode(); }
    };

    var labelsBtn = document.getElementById("labels-btn");
    if (labelsBtn) {
      labelsBtn.classList.add("active");
      labelsBtn.onclick = function () {
        state.constellations = !state.constellations;
        if (graph.setConstellations) graph.setConstellations(state.constellations);
        labelsBtn.classList.toggle("active", state.constellations);
        labelsBtn.textContent = state.constellations ? "✶ Families" : "✶ Hidden";
      };
    }

    // Tabs (Index / Stories)
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (tab) {
      tab.onclick = function () {
        Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) { t.classList.remove("active"); });
        Array.prototype.forEach.call(document.querySelectorAll(".tab-panel"), function (pnl) { pnl.classList.remove("active"); });
        tab.classList.add("active");
        document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
      };
    });

    // Sidebar toggle (mobile)
    var sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) {
      sidebarToggle.onclick = function () {
        document.getElementById("sidebar").classList.toggle("open");
      };
    }

    // Stat counts in the header
    document.getElementById("stat-people").textContent = DATA.people.length;
    document.getElementById("stat-unnamed").textContent =
      DATA.people.filter(function (p) { return !p.named; }).length;
    document.getElementById("stat-stories").textContent = DATA.stories.length;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
