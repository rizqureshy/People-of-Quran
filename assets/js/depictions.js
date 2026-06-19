/*
 * Visual Depictions — aniconic, respectful identity for every person.
 * ------------------------------------------------------------------
 * Islamic tradition does not depict the faces of the prophets, and the
 * Prophet Muhammad is never depicted at all. So instead of portraits,
 * each person is given a unique, procedurally-generated *seal* drawn in
 * the authentic visual language of Islamic art: geometric star-rosettes
 * and arabesque, coloured by archetype, paired with calligraphy of the
 * person's name.
 *
 * The design is fully deterministic from the person's id, so the same
 * person always renders the same seal, and the system scales to an
 * unlimited number of people with no image assets and no network.
 *
 * Exposes window.PQDepict with:
 *   colorFor(person)            -> archetype colour
 *   drawSeal(ctx,cx,cy,R,person)-> render a seal at a position
 *   sprite(person, size)        -> cached offscreen canvas (for the 3D scene)
 *   arabicOf(person)            -> the Arabic-script form of the name
 */

(function () {
  "use strict";

  /* Archetype palette — tuned to read well as glowing orbs on black. */
  var ARCH_COLOR = {
    prophet: "#3ad0b0", "truth-seeker": "#5cc8ff", tyrant: "#e0565b",
    reformer: "#f2c14e", "believing-woman": "#ef84ad", skeptic: "#b0a0b8",
    advisor: "#9aa0c0", hypocrite: "#8893a8", martyr: "#d65bb5",
    repentant: "#a3d65b", "arrogant-elite": "#c08552", oppressed: "#6a9bc3",
    "faithful-companion": "#f4a261"
  };
  var GOLD = "#d8a838";

  function colorFor(person) {
    var a = person && person.archetypes && person.archetypes[0];
    return (a && ARCH_COLOR[a]) || "#9aa6c0";
  }

  /* Deterministic hash + tiny PRNG so every seal is stable per id. */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h >>> 0;
  }
  function prng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function hexToRgb(hex) {
    var h = hex.replace("#", "");
    return { r: parseInt(h.substr(0, 2), 16), g: parseInt(h.substr(2, 2), 16), b: parseInt(h.substr(4, 2), 16) };
  }
  function rgba(hex, a) {
    var c = hexToRgb(hex);
    return "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")";
  }
  function mix(hex, hex2, t) {
    var a = hexToRgb(hex), b = hexToRgb(hex2);
    var r = Math.round(a.r + (b.r - a.r) * t);
    var g = Math.round(a.g + (b.g - a.g) * t);
    var bl = Math.round(a.b + (b.b - a.b) * t);
    return "rgb(" + r + "," + g + "," + bl + ")";
  }

  /* Build the vertices of an {n}-point star ring. */
  function starPath(ctx, cx, cy, n, outer, inner, rot) {
    ctx.beginPath();
    for (var i = 0; i < n * 2; i++) {
      var ang = rot + (Math.PI * i) / n;
      var rad = (i % 2 === 0) ? outer : inner;
      var x = cx + Math.cos(ang) * rad;
      var y = cy + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function polygonPath(ctx, cx, cy, n, rad, rot) {
    ctx.beginPath();
    for (var i = 0; i < n; i++) {
      var ang = rot + (Math.PI * 2 * i) / n;
      var x = cx + Math.cos(ang) * rad;
      var y = cy + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  /*
   * Draw a complete seal centred at (cx,cy) with outer radius R.
   * `opts.glow` adds an outer aura (used for the 3D scene nodes).
   */
  function drawSeal(ctx, cx, cy, R, person, opts) {
    opts = opts || {};
    var base = colorFor(person);
    var rand = prng(hash(person.id));
    var pointsChoices = [6, 8, 8, 10, 12, 16];
    var n = pointsChoices[Math.floor(rand() * pointsChoices.length)];
    var rot = rand() * Math.PI;
    var petals = [6, 8, 8, 12][Math.floor(rand() * 4)];
    var isProphet = (person.archetypes || []).indexOf("prophet") >= 0;
    var light = mix(base, "#ffffff", 0.45);

    ctx.save();

    // Outer aura / glow
    if (opts.glow) {
      var g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.45);
      g.addColorStop(0, rgba(base, 0.55));
      g.addColorStop(0.5, rgba(base, 0.16));
      g.addColorStop(1, rgba(base, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.45, 0, Math.PI * 2);
      ctx.fill();
    }

    // Filled disc with soft radial shading
    var disc = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.1, cx, cy, R);
    disc.addColorStop(0, rgba(light, 0.95));
    disc.addColorStop(0.6, rgba(base, 0.9));
    disc.addColorStop(1, rgba(mix(base, "#000000", 0.4), 0.95));
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Outer rim — gold for prophets, lighter otherwise
    ctx.lineWidth = Math.max(1, R * 0.05);
    ctx.strokeStyle = isProphet ? GOLD : rgba("#ffffff", 0.5);
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.96, 0, Math.PI * 2);
    ctx.stroke();

    // Interlaced star (two rotated rings) — the heart of the rosette
    ctx.lineWidth = Math.max(0.8, R * 0.035);
    ctx.strokeStyle = rgba("#0c0e16", 0.55);
    starPath(ctx, cx, cy, n, R * 0.84, R * 0.4, rot);
    ctx.fillStyle = rgba(light, 0.22);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = rgba("#ffffff", 0.65);
    starPath(ctx, cx, cy, n, R * 0.66, R * 0.3, rot + Math.PI / n);
    ctx.stroke();

    // Arabesque petal ring
    ctx.strokeStyle = rgba("#ffffff", 0.4);
    ctx.lineWidth = Math.max(0.6, R * 0.02);
    for (var p = 0; p < petals; p++) {
      var a = rot + (Math.PI * 2 * p) / petals;
      var px = cx + Math.cos(a) * R * 0.55;
      var py = cy + Math.sin(a) * R * 0.55;
      ctx.beginPath();
      ctx.ellipse(px, py, R * 0.14, R * 0.06, a, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Inner medallion
    polygonPath(ctx, cx, cy, n > 8 ? 8 : n, R * 0.26, rot);
    ctx.fillStyle = rgba(mix(base, "#000000", 0.25), 0.9);
    ctx.fill();
    ctx.strokeStyle = rgba(GOLD, 0.7);
    ctx.lineWidth = Math.max(0.8, R * 0.03);
    ctx.stroke();

    // Centre — solid gold pip if named, hollow if unnamed (echoes the canvas legend)
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.1, 0, Math.PI * 2);
    if (person.named) {
      ctx.fillStyle = GOLD;
      ctx.fill();
    } else {
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = Math.max(1, R * 0.04);
      ctx.setLineDash([R * 0.08, R * 0.06]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }

  /* Cache of offscreen seal sprites for the 3D scene. */
  var spriteCache = {};
  function sprite(person, size) {
    size = size || 96;
    var key = person.id + "@" + size;
    if (spriteCache[key]) return spriteCache[key];
    var cv = document.createElement("canvas");
    cv.width = size; cv.height = size;
    var ctx = cv.getContext("2d");
    drawSeal(ctx, size / 2, size / 2, size * 0.32, person, { glow: true });
    spriteCache[key] = cv;
    return cv;
  }

  /* Pull the Arabic-script portion out of a person's names. */
  function arabicOf(person) {
    var names = person.names || {};
    var candidates = [names.quran, names.tradition, names.arabic];
    for (var i = 0; i < candidates.length; i++) {
      var s = candidates[i];
      if (!s) continue;
      var m = s.match(/[؀-ۿݐ-ݿ][؀-ۿݐ-ݿ\sـ]*/);
      if (m && m[0].trim().length > 1) return m[0].trim();
    }
    return "";
  }

  window.PQDepict = {
    colorFor: colorFor,
    drawSeal: drawSeal,
    sprite: sprite,
    arabicOf: arabicOf
  };
})();
