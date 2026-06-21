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
  var LEGACY = DATA.legacyTier || {};

  // Map any source id (legacy or new) to one of the five canonical tiers.
  function tierOf(id) { return LEGACY[id] || id; }
  // The set of source tiers a person draws on (from entries + sources field).
  function tiersOf(p) {
    var set = {};
    (p.entries || []).forEach(function (e) { set[tierOf(e.layer)] = true; });
    (p.sources || []).forEach(function (s) { set[tierOf(s)] = true; });
    return set;
  }

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
    activeEra: null,          // selected era on the timeline ribbon (null = all)
    search: "",
    selected: null,
    pathMode: false,          // awaiting path endpoint clicks
    pathStart: null,
    activePath: null,         // the currently highlighted path (for engine swaps)
    constellations: true
  };

  // Eras in rough chronological order, for the timeline ribbon.
  var ERA_ORDER = [
    "Beginnings", "Early Prophets", "Patriarchs", "Exodus",
    "The Conquest & Judges", "Kingdom", "Divided Kingdom", "Exile & Return",
    "Other Prophets", "Gospel", "The Apostolic Age",
    "Revelation in Mecca", "Revelation in Medina"
  ];

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
    if (state.activeEra && p.era !== state.activeEra) return false;
    var aKeys = Object.keys(state.activeArchetypes);
    if (aKeys.length) {
      var hit = aKeys.some(function (a) { return (p.archetypes || []).indexOf(a) >= 0; });
      if (!hit) return false;
    }
    var lKeys = Object.keys(state.activeLayers);
    if (lKeys.length) {
      var pt = tiersOf(p);
      var lhit = lKeys.some(function (l) { return pt[l]; });
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
          (p.named ? '' : ' <span class="tag-unnamed">referenced</span>') +
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

  /* Timeline ribbon — one pill per era; click to scrub the universe to it. */
  function renderEraRibbon() {
    var el = document.getElementById("era-ribbon");
    if (!el) return;
    el.innerHTML = "";
    var counts = {};
    DATA.people.forEach(function (p) { counts[p.era] = (counts[p.era] || 0) + 1; });
    var eras = ERA_ORDER.filter(function (e) { return counts[e]; });
    var makePill = function (label, era) {
      var b = document.createElement("button");
      b.className = "era-pill" + (state.activeEra === era ? " active" : "");
      b.textContent = label + (era ? "" : "");
      b.onclick = function () {
        state.activeEra = (state.activeEra === era) ? null : era;
        applyFilters();
        if (state.activeEra) flashBanner("Era · " + era);
      };
      return b;
    };
    var all = makePill("All", null);
    all.className = "era-pill" + (state.activeEra ? "" : " active");
    el.appendChild(all);
    eras.forEach(function (e) { el.appendChild(makePill(e, e)); });
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

  // A small kicker tag: named in the Quran, named in the Bible/Torah, or
  // referenced-but-unnamed — accurate now that the scope spans all scriptures.
  function scripturalTag(p) {
    if (p.named) return '';
    var t = tiersOf(p);
    if (!t.quran && (t.bible || t.torah))
      return ' · <span class="tag-scripture">in the Bible / Torah</span>';
    return ' · <span class="tag-unnamed">referenced</span>';
  }

  function renderDetail(p) {
    var d = document.getElementById("detail");
    if (!p) {
      d.classList.remove("open");
      return;
    }
    d.classList.add("open");

    // Cross-tradition identity, shown evenly and in a stable order
    // (Quran · Bible · Torah/Hebrew · Greek · Arabic · Tradition · Historical),
    // with duplicate values (e.g. legacy "biblical" + "bible") collapsed.
    var NAME_LABELS = {
      quran: "Quran", bible: "Bible", biblical: "Bible", torah: "Torah",
      hebrew: "Hebrew", greek: "Greek", arabic: "Arabic",
      tradition: "Tradition", historical: "Historical"
    };
    var NAME_ORDER = ["quran", "bible", "biblical", "torah", "hebrew", "greek", "arabic", "tradition", "historical"];
    var _nm = p.names || {};
    var _seenName = {};
    function nameRow(k) {
      if (!_nm[k]) return "";
      var label = NAME_LABELS[k] || (k.charAt(0).toUpperCase() + k.slice(1));
      var val = _nm[k];
      var sig = label + "::" + val;
      if (_seenName[sig]) return "";           // collapse identical label+value
      _seenName[sig] = true;
      return '<div class="name-row"><span class="name-key">' + label + '</span><span class="name-val">' + val + '</span></div>';
    }
    var namesRows = NAME_ORDER.map(nameRow).join("");
    namesRows += Object.keys(_nm).filter(function (k) { return NAME_ORDER.indexOf(k) < 0; }).map(nameRow).join("");

    var archChips = (p.archetypes || []).map(function (a) {
      var arch = archById[a];
      return arch ? '<span class="mini-arch" title="' + arch.desc + '">' + arch.icon + ' ' + arch.label + '</span>' : "";
    }).join("");

    // Sourced statements grouped by tier, in the canonical reading order:
    // Quran → Bible → Torah → Tradition → Historical.
    var byTier = {};
    (p.entries || []).forEach(function (e) {
      var t = tierOf(e.layer);
      (byTier[t] = byTier[t] || []).push(e);
    });
    var sources = DATA.layers.map(function (l) {
      var group = byTier[l.id];
      if (!group || !group.length) return "";
      var rows = group.map(function (e) {
        return '<div class="entry">' +
          '<div class="entry-head"><span class="entry-layer" style="background:' + l.color + '">' +
          l.label + '</span>' +
          (e.sub ? '<span class="entry-sub">' + e.sub + '</span>' : '') +
          (e.ref ? '<span class="entry-ref">' + e.ref + '</span>' : '') + '</div>' +
          '<div class="entry-text">' + e.text + '</div></div>';
      }).join("");
      return rows;
    }).join("");

    // Engaging narrative prose (depth dimension).
    var storyParas = (p.story || []).map(function (x) { return '<p>' + x + '</p>'; }).join("");

    // Key encounters & historic moments.
    var encounters = (p.encounters || []).map(function (e) {
      var other = personById[e.with];
      var who = other ? '<button class="enc-link" data-id="' + e.with + '">' + other.name + '</button>' :
        (e.with ? '<span class="enc-who">' + e.with + '</span>' : '');
      return '<div class="encounter">' +
        (who ? '<div class="enc-with">' + who + '</div>' : '') +
        '<div class="enc-moment">' + e.moment + (e.ref ? ' <span class="enc-ref">' + e.ref + '</span>' : '') + '</div></div>';
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
      '<button class="detail-share" title="Copy a shareable link to this person">🔗</button>' +
      '<div class="detail-scroll">' +
        '<div class="detail-depiction">' +
          '<canvas class="seal-canvas" width="320" height="320"></canvas>' +
          (arabic ? '<div class="arabic-name" dir="rtl">' + arabic + '</div>' : '') +
          '<div class="depiction-note">aniconic seal · geometric depiction</div>' +
        '</div>' +
        '<div class="detail-head">' +
          '<div class="detail-kicker">' + (p.era || "") + scripturalTag(p) + '</div>' +
          '<h2 class="detail-name">' + p.name + '</h2>' +
          '<div class="detail-title">' + (p.title || "") + '</div>' +
          (archChips ? '<div class="detail-arch">' + archChips + '</div>' : '') +
        '</div>' +
        (storyParas ? '<div class="detail-section"><h3>The Story</h3><div class="story-prose">' + storyParas + '</div></div>' : '') +
        (namesRows ? '<div class="detail-section"><h3>Names</h3><div class="names">' + namesRows + '</div></div>' : '') +
        (sources ? '<div class="detail-section"><h3>Across the Sources</h3><p class="section-note">Quran · Bible · Torah · Tradition · Historical — each statement keeps its origin.</p>' + sources + '</div>' : '') +
        (encounters ? '<div class="detail-section"><h3>Encounters &amp; Moments</h3><div class="encounters">' + encounters + '</div></div>' : '') +
        (lessons ? '<div class="detail-section"><h3>Lessons</h3><ul class="lessons">' + lessons + '</ul></div>' : '') +
        (rels ? '<div class="detail-section"><h3>Connections</h3><div class="rels">' + rels + '</div></div>' : '') +
      '</div>';

    d.querySelector(".detail-close").onclick = function () {
      state.selected = null;
      if (graph.clearCascade) graph.clearCascade();
      exitFocusUI();
      graph.setSelected(null);
      renderDetail(null);
      renderPeopleList();
      if (!state.activePath) updateHash();
    };
    var share = d.querySelector(".detail-share");
    if (share) share.onclick = function () {
      updateHash();
      var url = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { flashBanner("Link copied"); },
          function () { flashBanner("Copy failed"); });
      } else { flashBanner("Copy not supported"); }
    };
    Array.prototype.forEach.call(d.querySelectorAll(".rel-link, .enc-link"), function (btn) {
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

  // Enter/leave the immersive relationship view: on desktop the index rail
  // retracts so the cascade and the floating detail own the canvas.
  var _desktop = function () { return typeof window !== "undefined" && window.innerWidth > 900; };
  function enterFocusUI() {
    var lay = document.querySelector(".layout");
    if (lay && _desktop()) lay.classList.add("nav-collapsed");
  }
  function exitFocusUI() {
    var lay = document.querySelector(".layout");
    if (lay) lay.classList.remove("nav-collapsed");
    var sb = document.getElementById("sidebar");
    if (sb) sb.classList.remove("open");
  }

  function select(id, focus) {
    var p = personById[id];
    if (!p) return;
    if (state.pathMode) { pathPick(id); }
    state.selected = id;
    graph.setSelected(id);
    // Magnetic cascade: pull this person's 1st/2nd/3rd-tier relations forward.
    if (graph.focusCascade && !state.pathMode && !state.activePath) {
      var cd = cascadeData(id);
      var drawerPx = _desktop() ? 380 : 0;
      graph.focusCascade(id, cd.tiers, { pairs: cd.pairs, sides: cd.sides, drawerPx: drawerPx });
      enterFocusUI();
      if (!state._cascadeHinted) { state._cascadeHinted = true; flashBanner("Relationship view — tap a card to follow · tap empty space to return"); }
    } else if (focus && graph.focusNode) {
      graph.focusNode(id);
    }
    renderDetail(p);
    renderPeopleList();
    if (!state.activePath) updateHash();
  }

  // Leave cascade mode and return to the galaxy.
  function exitFocus() {
    state.selected = null;
    if (graph.clearCascade) graph.clearCascade();
    if (graph.setSelected) graph.setSelected(null);
    exitFocusUI();
    renderDetail(null);
    renderPeopleList();
    if (!state.activePath) updateHash();
  }

  // Breadth-first tiers (1,2,3) of relations around a focus, with the
  // parent→child pairs for the connector threads and a left/right side for
  // each node: those who came BEFORE the focus (ancestors, predecessors,
  // teachers) go left; those who came after or alongside (descendants,
  // students, family, contemporaries) go right.
  function cascadeData(focusId) {
    var adj = adjacency();
    var seen = {}; seen[focusId] = 0;
    var timeDir = {}; timeDir[focusId] = 0;
    var tiers = [[], [], []], pairs = [];
    var frontier = [focusId];
    for (var depth = 1; depth <= 3; depth++) {
      var next = [];
      frontier.forEach(function (pid) {
        (adj[pid] || []).forEach(function (nid) {
          if (seen[nid] !== undefined) return;
          seen[nid] = depth;
          timeDir[nid] = timeDir[pid] + timeDirBetween(pid, nid);
          tiers[depth - 1].push(nid); pairs.push([pid, nid]); next.push(nid);
        });
      });
      frontier = next;
    }
    var CAP = 14;
    tiers = tiers.map(function (t) { return t.slice(0, CAP); });
    var keep = {}; keep[focusId] = true;
    tiers.forEach(function (t) { t.forEach(function (id) { keep[id] = true; }); });
    pairs = pairs.filter(function (pr) { return keep[pr[0]] && keep[pr[1]]; });
    // Resolve each kept node to a side: -1 = before (left), +1 = after/with
    // (right). Era is the reliable global signal — earlier era to the left;
    // within the same era, the declared relationship direction breaks the tie.
    var fEra = eraIndexOf(focusId);
    var sides = {};
    Object.keys(keep).forEach(function (id) {
      if (id === focusId) return;
      var e = eraIndexOf(id);
      if (e >= 0 && fEra >= 0 && e !== fEra) { sides[id] = e < fEra ? -1 : 1; return; }
      var td = timeDir[id];                         // same/unknown era → lineage direction
      sides[id] = td < 0 ? -1 : 1;                  // contemporaries default to the right
    });
    return { tiers: tiers, pairs: pairs, sides: sides };
  }

  // Whether `b` comes after (+1), before (-1) or alongside (0) `a`, read from
  // the declared relationship type between them (in either direction).
  var _relDir = null;
  function relDirMap() {
    if (_relDir) return _relDir;
    _relDir = {};
    DATA.people.forEach(function (p) {
      (p.relations || []).forEach(function (r) {
        if (!personById[r.to]) return;
        (_relDir[p.id] = _relDir[p.id] || {})[r.to] = r.type;
      });
    });
    return _relDir;
  }
  function typeSign(t) {
    if (t === "ancestor" || t === "parent" || t === "teacher") return 1;   // the `to` comes after
    if (t === "descendant" || t === "child" || t === "student" || t === "successor") return -1; // before
    return 0;                                                              // spouse, sibling, ally, opponent, kin…
  }
  function timeDirBetween(a, b) {
    var m = relDirMap();
    if (m[a] && m[a][b] !== undefined) return typeSign(m[a][b]);
    if (m[b] && m[b][a] !== undefined) return -typeSign(m[b][a]);
    return 0;
  }
  function eraIndexOf(id) { var p = personById[id]; return p ? ERA_ORDER.indexOf(p.era) : -1; }

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
    updateHash();
  }

  function clearPath(silent) {
    state.pathMode = false; state.pathStart = null; state.activePath = null;
    if (graph && graph.setPath) graph.setPath(null);
    var panel = document.getElementById("path-panel");
    if (panel) { panel.classList.remove("show"); panel.innerHTML = ""; }
    var btn = document.getElementById("path-btn");
    if (btn) btn.classList.remove("active");
    updateHash();
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
    renderEraRibbon();
    renderPeopleList();
  }

  /* ---- Shareable deep-links (URL hash) ---- */
  function updateHash() {
    var h = "";
    if (state.activePath && state.activePath.length > 1) h = "path=" + state.activePath.join(",");
    else if (state.selected) h = "p=" + state.selected;
    try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); }
    catch (e) { location.hash = h; }
  }
  function applyHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h) return false;
    var m;
    if ((m = h.match(/^path=(.+)$/))) {
      var ids = m[1].split(",").filter(function (id) { return personById[id]; });
      if (ids.length > 1) { showPath(ids); if (graph.skipIntro) graph.skipIntro(); return true; }
    } else if ((m = h.match(/^p=(.+)$/))) {
      if (personById[m[1]]) { select(m[1], true); if (graph.skipIntro) graph.skipIntro(); return true; }
    }
    return false;
  }

  /* ---- Hero overlay ---- */
  var heroHidden = false;
  function hideHero() {
    if (heroHidden) return;
    heroHidden = true;
    var hero = document.getElementById("hero");
    if (hero) {
      hero.classList.add("hide");
      // Fully remove it from the hit-testing path once faded.
      setTimeout(function () { hero.style.display = "none"; }, 1200);
    }
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

  /* ================= Node card renderer ================= */
  function roundRectPath(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Draws a person as a floating glass card (seal emblem + name + title).
  function drawPersonCard(ctx, id, sx, sy, radius, flags) {
    var p = personById[id];
    if (!p || !window.PQDepict) return;
    flags = flags || {};
    var col = window.PQDepict.colorFor(p);

    // Far / filtered-out → a simple glowing dot keeps the universe legible.
    if (flags.dim || (radius < 5 && !flags.selected && !flags.hover)) {
      var gg = ctx.createRadialGradient(sx, sy, 0.5, sx, sy, Math.max(3, radius) * 1.6);
      gg.addColorStop(0, col); gg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gg;
      ctx.beginPath(); ctx.arc(sx, sy, Math.max(3, radius) * 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(sx, sy, Math.max(1.6, radius * 0.55), 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      return;
    }

    var sel = flags.selected, hov = flags.hover;
    var fs = Math.max(11, Math.min(17, radius * 1.25));
    var emR = fs * 0.95;                 // seal radius inside the card
    var pad = fs * 0.6;
    var showTitle = radius > 12 || sel;

    ctx.font = "600 " + fs + "px 'Inter', system-ui, sans-serif";
    var name = p.name;
    var nameW = ctx.measureText(name).width;
    var titleFs = Math.max(9, fs * 0.72);
    var title = p.title || "";
    var titleW = 0;
    if (showTitle && title) { ctx.font = titleFs + "px 'Inter', system-ui, sans-serif"; titleW = ctx.measureText(title).width; }

    var textW = Math.min(Math.max(nameW, titleW), 230);
    var emD = emR * 2;
    var cardW = pad + emD + pad * 0.7 + textW + pad;
    var cardH = showTitle && title ? Math.max(emD + pad, fs + titleFs + pad * 1.5) : emD + pad;
    var x = sx - cardW / 2, y = sy - cardH / 2;
    var prophet = (p.archetypes || []).indexOf("prophet") >= 0;

    // Card body (glass)
    roundRectPath(ctx, x, y, cardW, cardH, Math.min(13, cardH * 0.32));
    ctx.fillStyle = sel ? "rgba(22,20,34,0.94)" : "rgba(10,12,24,0.8)";
    ctx.fill();
    ctx.lineWidth = sel ? 2 : hov ? 1.6 : 1.1;
    ctx.strokeStyle = sel ? "#f0c94e" : prophet ? "rgba(216,168,56,0.7)" : "rgba(150,170,230,0.3)";
    ctx.stroke();

    // Seal emblem
    var ex = x + pad + emR, ey = y + cardH / 2;
    window.PQDepict.drawSeal(ctx, ex, ey, emR, p, { glow: false });

    // Floating name (+ title)
    var tx = ex + emR + pad * 0.7;
    ctx.textAlign = "left";
    ctx.fillStyle = "#eaf2ff";
    if (showTitle && title) {
      ctx.textBaseline = "alphabetic";
      ctx.font = "600 " + fs + "px 'Inter', system-ui, sans-serif";
      ctx.fillText(clip(ctx, name, textW), tx, ey - 2);
      ctx.font = titleFs + "px 'Inter', system-ui, sans-serif";
      ctx.fillStyle = "#9fb0d0";
      ctx.fillText(clip(ctx, title, textW), tx, ey + titleFs + 1);
    } else {
      ctx.textBaseline = "middle";
      ctx.fillText(clip(ctx, name, textW), tx, ey);
    }
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  }

  // Truncate text to a pixel width with an ellipsis (uses current ctx.font).
  function clip(ctx, text, maxW) {
    if (ctx.measureText(text).width <= maxW) return text;
    var t = text;
    while (t.length > 1 && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1);
    return t + "…";
  }

  /* ================= Engine (2D / 3D) ================= */
  var mode = "3d";

  // Show the canvas the active engine renders into (WebGL vs 2D).
  function showCanvas(which) {
    var c2d = document.getElementById("canvas");
    var cgl = document.getElementById("canvas-gl");
    if (cgl) cgl.style.display = which === "gl" ? "block" : "none";
    if (c2d) c2d.style.display = which === "2d" ? "block" : "none";
  }

  var glEngine = null;   // the WebGL engine persists (one GL context)
  var glFailed = false;  // WebGL/Three.js unavailable or errored -> use canvas

  function baseOpts() {
    return { onSelect: function (id) { select(id, false); }, onHover: onHover, onExitFocus: exitFocus };
  }

  // Push current data/state into whichever engine `graph` points to.
  function pushEngineState() {
    applyFilters();                       // builds nodes/edges (heavy for WebGL)
    if (state.selected) graph.setSelected(state.selected);
    if (state.activePath && graph.setPath) graph.setPath(state.activePath);
    if (graph.setConstellations) graph.setConstellations(state.constellations);
    setTimeout(function () { if (graph) graph.center(); }, 60);
  }

  // Corner badge showing which renderer is live. Tap it to reveal the full
  // error text (useful for diagnosing on a phone with no console).
  var _badgeFull = "", _badgeOpen = false;
  function setRendererBadge(shortText, ok, full) {
    _badgeFull = full || shortText;
    var el = document.getElementById("render-badge");
    if (!el) {
      el = document.createElement("div"); el.id = "render-badge";
      document.body.appendChild(el);
      el.addEventListener("click", function () {
        _badgeOpen = !_badgeOpen;
        el.textContent = _badgeOpen ? _badgeFull : el.getAttribute("data-short");
        el.style.whiteSpace = _badgeOpen ? "normal" : "nowrap";
        el.style.maxWidth = _badgeOpen ? "92vw" : "80vw";
        el.style.fontSize = _badgeOpen ? "12px" : "11px";
      });
    }
    el.setAttribute("data-short", shortText + (ok ? "" : "  (tap for details)"));
    el.textContent = el.getAttribute("data-short");
    _badgeOpen = false;
    el.style.cssText = "position:fixed;bottom:6px;right:8px;z-index:50;font:11px Inter,system-ui,sans-serif;" +
      "color:" + (ok ? "#9fb0d0" : "#ffb4b4") + ";background:rgba(8,10,20,.78);padding:4px 10px;border-radius:8px;" +
      "cursor:pointer;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);max-width:80vw;white-space:nowrap;" +
      "overflow:hidden;text-overflow:ellipsis;border:1px solid rgba(150,170,230,.2);";
  }

  function buildEngine() {
    // Try the WebGL universe first; ANY failure (construction OR the first
    // data push that builds 60 card textures) cleanly falls back to canvas.
    if (mode === "3d" && window.PQGraphGL && !glFailed) {
      try {
        showCanvas("gl");
        var opts = baseOpts(); opts.personById = personById; opts.depict = window.PQDepict;
        if (!glEngine) glEngine = new window.PQGraphGL(document.getElementById("canvas-gl"), opts);
        else glEngine.resume();
        graph = glEngine;
        pushEngineState();
        setRendererBadge("renderer: WebGL ✦", true);
        return;
      } catch (err) {
        if (window.console) console.error("WebGL failed — falling back to canvas:", err);
        glFailed = true;
        try { if (glEngine && glEngine.stop) glEngine.stop(); } catch (e) {}
        glEngine = null;
        var where = window.__pqStep ? " [step: " + window.__pqStep + "]" : "";
        var msg = (err && err.message) || String(err) || "WebGL error";
        var full = "WebGL error" + where + ":\n" + msg + "\n\n" + ((err && err.stack) ? String(err.stack).split("\n").slice(0, 6).join("\n") : "");
        setRendererBadge("renderer: Canvas" + where + " — " + msg, false, full);
        flashBanner("WebGL unavailable — using canvas mode");
        // fall through to the canvas engine below
      }
    } else if (mode === "3d" && !window.PQGraphGL) {
      setRendererBadge("renderer: Canvas — Three.js module not loaded (open over http?)", false);
    }
    if (mode === "3d") {
      showCanvas("2d");
      var o3 = baseOpts(); o3.personById = personById; o3.drawNode = drawPersonCard;
      graph = new PQGraph3D(document.getElementById("canvas"), o3);
    } else {
      showCanvas("2d");
      graph = new PQGraph(document.getElementById("canvas"), baseOpts());
    }
    pushEngineState();
  }

  function switchMode(next) {
    if (next === mode) return;
    if (graph === glEngine && glEngine) glEngine.pause();
    else if (graph && graph.stop) graph.stop();
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
  // Wire the hero overlay FIRST, so "Enter the universe" always works even
  // if engine/UI setup later fails. enterUniverse only needs to hide the hero.
  function wireHero() {
    function enterUniverse() { hideHero(); if (graph && graph.skipIntro) graph.skipIntro(); }
    window.__pqEnter = enterUniverse;
    var heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.addEventListener("click", enterUniverse);
      heroEl.addEventListener("touchend", function (e) { if (e && e.cancelable) e.preventDefault(); enterUniverse(); }, { passive: false });
    }
    var heroEnter = document.getElementById("hero-enter");
    if (heroEnter) {
      heroEnter.onclick = function (e) { if (e && e.stopPropagation) e.stopPropagation(); enterUniverse(); };
      heroEnter.addEventListener("touchend", function (e) { if (e && e.cancelable) e.preventDefault(); if (e && e.stopPropagation) e.stopPropagation(); enterUniverse(); }, { passive: false });
    }
  }

  function init() {
    wireHero();                 // guarantee the Enter button responds
    try {
      setupApp();
    } catch (err) {
      if (window.console) console.error("Init error:", err);
      var b = document.getElementById("banner");
      if (b) { b.textContent = "Setup error — open anyway"; b.classList.add("show"); }
    }
  }

  function setupApp() {
    buildEngine();

    renderArchetypes();
    renderLayers();
    renderEraRibbon();
    renderPeopleList();
    renderStories();

    document.getElementById("search").addEventListener("input", function (e) {
      state.search = e.target.value.trim();
      applyFilters();
    });
    document.getElementById("reset-btn").onclick = function () {
      state.activeArchetypes = {}; state.activeLayers = {}; state.search = "";
      state.activeEra = null;
      state.selected = null;
      if (graph.clearCascade) graph.clearCascade();
      exitFocusUI();
      clearPath(true);
      document.getElementById("search").value = "";
      graph.setSelected(null);
      renderDetail(null);
      applyFilters();
      updateHash();
      setTimeout(function () { graph.center(); }, 40);
    };
    document.getElementById("recenter-btn").onclick = function () {
      if (graph.clearCascade) graph.clearCascade();
      exitFocusUI();
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

    // Index-panel toggle: collapses the rail on desktop, slides it over on mobile.
    var sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) {
      sidebarToggle.onclick = function () {
        if (window.innerWidth > 900) {
          var lay = document.querySelector(".layout");
          if (lay) lay.classList.toggle("nav-collapsed");
        } else {
          document.getElementById("sidebar").classList.toggle("open");
        }
      };
    }

    // Stat counts in the header
    document.getElementById("stat-people").textContent = DATA.people.length;
    document.getElementById("stat-unnamed").textContent =
      DATA.people.filter(function (p) { return !p.named; }).length;
    document.getElementById("stat-stories").textContent = DATA.stories.length;

    // Hero is already wired in wireHero(). Restore a shared view from the URL,
    // otherwise play the cinematic intro.
    var restored = applyHash();
    if (restored) { hideHero(); }
    else if (graph.startIntro) {
      setTimeout(function () { if (mode === "3d") graph.startIntro(); }, 140);
      setTimeout(hideHero, 5200);                 // hero lifts as the fly-through settles
    } else { setTimeout(hideHero, 2500); }

    // Keep the view in sync with back/forward navigation.
    window.addEventListener("hashchange", function () {
      if (!location.hash) return;
      applyHash();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
