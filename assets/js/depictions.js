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

  // Parse a colour into {r,g,b}. Accepts "#rrggbb", "#rgb", or "rgb(r,g,b)".
  // Always returns finite channel values so we never emit "rgba(NaN,…)",
  // which Safari rejects with "The string did not match the expected pattern".
  function hexToRgb(hex) {
    if (typeof hex !== "string") return { r: 0, g: 0, b: 0 };
    var m = hex.match(/rgba?\(([^)]+)\)/i);
    if (m) {
      var p = m[1].split(",");
      return { r: clamp255(p[0]), g: clamp255(p[1]), b: clamp255(p[2]) };
    }
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return { r: clamp255(parseInt(h.substr(0, 2), 16)),
             g: clamp255(parseInt(h.substr(2, 2), 16)),
             b: clamp255(parseInt(h.substr(4, 2), 16)) };
  }
  function clamp255(v) { v = parseInt(v, 10) >= 0 || +v >= 0 ? +v : 0; v = v | 0; return v < 0 ? 0 : v > 255 ? 255 : (v || 0); }
  function toHex2(v) { v = clamp255(v); return (v < 16 ? "0" : "") + v.toString(16); }
  function rgba(hex, a) {
    var c = hexToRgb(hex);
    return "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")";
  }
  // Returns a hex string so results compose cleanly with rgba()/mix().
  function mix(hex, hex2, t) {
    var a = hexToRgb(hex), b = hexToRgb(hex2);
    var r = Math.round(a.r + (b.r - a.r) * t);
    var g = Math.round(a.g + (b.g - a.g) * t);
    var bl = Math.round(a.b + (b.b - a.b) * t);
    return "#" + toHex2(r) + toHex2(g) + toHex2(bl);
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

  /* ----------------------------------------------------------------
   * Story motifs — a small line-glyph for each person, evoking the
   * heart of their narrative (an ark, a staff, a well, a lamp of
   * light…). Purely symbolic and aniconic — never a face or figure.
   * Motifs may repeat across distant figures; the seal's colour,
   * geometry, and calligraphy keep each person distinct.
   * ---------------------------------------------------------------- */
  var MOTIF = {
    adam: "tree", hawwa: "leaf", habil: "flame", qabil: "blade", iblis: "flame",
    nuh: "ark", "nuh-wife": "drop", "nuh-son": "wave",
    ibrahim: "star", azar: "idol", nimrod: "crown", hajar: "water", sarah: "sparkle",
    ismail: "cube", ishaq: "star", lut: "city", "lut-wife": "pillar",
    yaqub: "eye", yusuf: "well", binyamin: "cup", "yusuf-brothers": "group",
    aziz: "ring", zulaikha: "rose",
    musa: "staff", harun: "tablet", "musa-mother": "basket", "musa-sister": "eye",
    pharaoh: "pyramid", haman: "tower", asiya: "house", qarun: "coins",
    samiri: "calf", khidr: "leaf", shuayb: "scale", "bani-israel": "group",
    dawud: "note", sulayman: "ring", bilqis: "sun", jalut: "sword", talut: "crown",
    imran: "arch", "imran-wife": "house", maryam: "palm", isa: "dove",
    hawariyyun: "table", zakariyya: "arch", yahya: "drop",
    ayyub: "water", yunus: "fish", hud: "wind", salih: "camel", luqman: "scroll",
    "dhul-qarnayn": "wall", "ashab-kahf": "cave", ad: "pillars", thamud: "mountain",
    muhammad: "lamp", zayd: "crescent", "abu-lahab": "flame", "umm-jamil": "rope"
  };

  /* More bespoke motifs across the prophets, kings, judges, tribes and
   * apostles — reusing the shape vocabulary above (plus "sheaf"). */
  Object.assign(MOTIF, {
    idris: "scroll", yusha: "wall", ilyas: "flame", "al-yasa": "drop", hizqil: "scroll",
    shaya: "scroll", armiya: "city", daniyal: "crown", uzair: "scroll", "dhul-kifl": "tablet",
    saba: "sun", "ashab-ukhdud": "flame", "ashab-al-jannah": "tree", "ashab-al-rass": "well",
    "qawm-tubba": "crown", "al-rum": "crescent",
    shem: "star", nahor: "star", yahudha: "crown", lawi: "tablet", dinah: "rose",
    rahil: "drop", leah: "eye", keturah: "house", amram: "house", hur: "arch",
    bezalel: "cube", eleazar: "tablet", ithamar: "tablet", "nadab-abihu": "flame",
    "dathan-abiram": "blade", "pharaohs-daughter": "basket", balaam: "wind",
    jesse: "tree", boaz: "sheaf", ruth: "sheaf", naomi: "house", obed: "star",
    hezekiah: "sun", josiah: "scroll", jeroboam: "calf", rehoboam: "crown", manasseh: "idol",
    absalom: "blade", joab: "sword", abner: "sword", uriah: "sword", bathsheba: "rose",
    michal: "house", delilah: "blade", deborah: "palm", barak: "sword", ehud: "blade",
    othniel: "sword", jephthah: "sword", elizabeth: "drop", martha: "house",
    "paul-tarsus": "scroll", "james-zebedee": "fish", "herod-agrippa": "crown",
    "yusuf-najjar": "house"
  });

  /* Fallback glyph by archetype, so every seal carries a meaningful motif
   * even when the person has no bespoke one. The first matching archetype
   * (archetypes are listed most-significant first) wins. */
  var ARCH_MOTIF = {
    prophet: "scroll", reformer: "scale", "faithful-companion": "crescent",
    "truth-seeker": "sparkle", "believing-woman": "rose", "arrogant-elite": "crown",
    repentant: "drop", advisor: "tablet", tyrant: "sword", oppressed: "group",
    martyr: "flame", hypocrite: "blade", skeptic: "wind"
  };
  function motifFor(person) {
    if (MOTIF[person.id]) return MOTIF[person.id];
    var a = person.archetypes || [];
    for (var i = 0; i < a.length; i++) { if (ARCH_MOTIF[a[i]]) return ARCH_MOTIF[a[i]]; }
    return null;
  }

  /* Render a motif glyph centred at (cx,cy), fitting within radius s. */
  function drawMotif(ctx, cx, cy, s, key, ink) {
    ink = ink || "#f4ead2";
    ctx.save();
    ctx.strokeStyle = ink; ctx.fillStyle = ink;
    ctx.lineWidth = Math.max(0.8, s * 0.17);
    ctx.lineJoin = "round"; ctx.lineCap = "round";
    function P() { ctx.beginPath(); }
    function M(x, y) { ctx.moveTo(cx + x * s, cy + y * s); }
    function L(x, y) { ctx.lineTo(cx + x * s, cy + y * s); }
    function arc(x, y, r, a0, a1) { ctx.arc(cx + x * s, cy + y * s, r * s, a0, a1); }
    function dot(x, y, r) { P(); arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }

    switch (key) {
      case "tree":
        P(); arc(0, -0.3, 0.55, 0, Math.PI * 2); ctx.stroke();
        P(); M(0, 0.15); L(0, 0.85); ctx.stroke(); break;
      case "leaf":
        P(); ctx.ellipse(cx, cy, s * 0.45, s * 0.8, 0, 0, Math.PI * 2); ctx.stroke();
        P(); M(0, -0.75); L(0, 0.75); ctx.stroke(); break;
      case "flame":
        P(); M(0, 0.8); ctx.quadraticCurveTo(cx + 0.7 * s, cy + 0.1 * s, cx, cy - 0.85 * s);
        ctx.quadraticCurveTo(cx - 0.7 * s, cy + 0.1 * s, cx, cy + 0.8 * s); ctx.stroke(); break;
      case "blade":
        P(); M(0, -0.85); L(0.18, 0.2); L(-0.18, 0.2); ctx.closePath(); ctx.stroke();
        P(); M(-0.4, 0.35); L(0.4, 0.35); ctx.stroke();
        P(); M(0, 0.35); L(0, 0.8); ctx.stroke(); break;
      case "ark":
        P(); M(-0.85, -0.1); ctx.quadraticCurveTo(cx, cy + 0.95 * s, cx + 0.85 * s, cy - 0.1 * s);
        ctx.closePath(); ctx.stroke();
        P(); M(0, -0.1); L(0, -0.85); ctx.stroke();
        P(); M(0, -0.85); L(0.5, -0.5); L(0, -0.45); ctx.stroke(); break;
      case "drop":
        P(); M(0, -0.85); ctx.bezierCurveTo(cx + 0.75 * s, cy - 0.1 * s, cx + 0.55 * s, cy + 0.8 * s, cx, cy + 0.8 * s);
        ctx.bezierCurveTo(cx - 0.55 * s, cy + 0.8 * s, cx - 0.75 * s, cy - 0.1 * s, cx, cy - 0.85 * s); ctx.stroke(); break;
      case "wave":
        P(); M(-0.85, 0.2);
        ctx.bezierCurveTo(cx - 0.4 * s, cy - 0.6 * s, cx - 0.05 * s, cy - 0.6 * s, cx, cy + 0.2 * s);
        ctx.bezierCurveTo(cx + 0.05 * s, cy - 0.6 * s, cx + 0.4 * s, cy - 0.6 * s, cx + 0.85 * s, cy + 0.2 * s);
        ctx.stroke();
        P(); M(-0.85, 0.6); L(0.85, 0.6); ctx.stroke(); break;
      case "star": {
        P();
        for (var i = 0; i < 10; i++) {
          var a = -Math.PI / 2 + i * Math.PI / 5;
          var rr = (i % 2 === 0) ? 0.85 : 0.36;
          var x = Math.cos(a) * rr, y = Math.sin(a) * rr;
          if (i === 0) M(x, y); else L(x, y);
        }
        ctx.closePath(); ctx.stroke(); break;
      }
      case "idol":
        P(); arc(0, -0.5, 0.28, 0, Math.PI * 2); ctx.stroke();
        P(); M(-0.3, 0.8); L(-0.2, -0.15); L(0.2, -0.15); L(0.3, 0.8); ctx.stroke();
        P(); M(-0.45, 0.8); L(0.45, 0.8); ctx.stroke(); break;
      case "crown":
        P(); M(-0.8, 0.5); L(-0.8, -0.4); L(-0.35, 0.1); L(0, -0.6); L(0.35, 0.1); L(0.8, -0.4); L(0.8, 0.5);
        ctx.closePath(); ctx.stroke();
        P(); M(-0.8, 0.5); L(0.8, 0.5); ctx.stroke(); break;
      case "water":
        P(); M(0, -0.8); ctx.bezierCurveTo(cx + 0.6 * s, cy, cx + 0.4 * s, cy + 0.6 * s, cx, cy + 0.6 * s);
        ctx.bezierCurveTo(cx - 0.4 * s, cy + 0.6 * s, cx - 0.6 * s, cy, cx, cy - 0.8 * s); ctx.stroke();
        ctx.lineWidth *= 0.7;
        P(); M(-0.7, 0.85); L(0.7, 0.85); ctx.stroke(); break;
      case "sparkle":
        ctx.lineWidth *= 0.9;
        P(); M(0, -0.9); L(0, 0.9); ctx.stroke();
        P(); M(-0.9, 0); L(0.9, 0); ctx.stroke();
        P(); M(-0.5, -0.5); L(0.5, 0.5); ctx.stroke();
        P(); M(-0.5, 0.5); L(0.5, -0.5); ctx.stroke(); break;
      case "cube":
        P(); M(-0.6, -0.3); L(0.6, -0.3); L(0.6, 0.7); L(-0.6, 0.7); ctx.closePath(); ctx.stroke();
        P(); M(-0.6, -0.3); L(-0.3, -0.7); L(0.9, -0.7); L(0.6, -0.3); ctx.stroke();
        P(); M(0.6, -0.3); L(0.9, -0.7); ctx.stroke(); break;
      case "city":
        P(); M(-0.85, 0.8); L(-0.85, -0.1); L(-0.3, -0.1); L(-0.3, -0.6); L(0.25, -0.6); L(0.25, 0.1); L(0.85, 0.1); L(0.85, 0.8);
        ctx.closePath(); ctx.stroke(); break;
      case "pillar":
        P(); M(-0.45, -0.7); L(0.45, -0.7); ctx.stroke();
        P(); M(-0.45, 0.7); L(0.45, 0.7); ctx.stroke();
        P(); M(-0.28, -0.7); L(-0.28, 0.7); ctx.stroke();
        P(); M(0.28, -0.7); L(0.28, 0.7); ctx.stroke(); break;
      case "pillars":
        for (var pc = -1; pc <= 1; pc++) {
          P(); M(pc * 0.55, -0.6); L(pc * 0.55, 0.6); ctx.stroke();
        }
        P(); M(-0.85, -0.6); L(0.85, -0.6); ctx.stroke();
        P(); M(-0.85, 0.7); L(0.85, 0.7); ctx.stroke(); break;
      case "eye":
        P(); M(-0.85, 0); ctx.quadraticCurveTo(cx, cy - 0.65 * s, cx + 0.85 * s, cy);
        ctx.quadraticCurveTo(cx, cy + 0.65 * s, cx - 0.85 * s, cy); ctx.stroke();
        dot(0, 0, 0.24); break;
      case "well":
        P(); M(-0.6, -0.25); L(0.6, -0.25); L(0.5, 0.8); L(-0.5, 0.8); ctx.closePath(); ctx.stroke();
        P(); arc(0, -0.25, 0.6, Math.PI, 0); ctx.stroke();
        P(); M(0, -0.85); L(0, -0.25); ctx.stroke(); break;
      case "cup":
        P(); M(-0.5, -0.6); ctx.quadraticCurveTo(cx, cy + 0.4 * s, cx + 0.5 * s, cy - 0.6 * s); ctx.stroke();
        P(); M(0, 0.25); L(0, 0.7); ctx.stroke();
        P(); M(-0.35, 0.8); L(0.35, 0.8); ctx.stroke(); break;
      case "group":
        dot(-0.45, -0.2, 0.26); dot(0.45, -0.2, 0.26); dot(0, 0.5, 0.26); break;
      case "ring":
        P(); arc(0, 0, 0.6, 0, Math.PI * 2); ctx.stroke();
        dot(0, -0.6, 0.2); break;
      case "rose":
        P(); arc(0, 0, 0.7, 0, Math.PI * 2); ctx.stroke();
        P(); arc(0, 0, 0.42, 0, Math.PI * 2); ctx.stroke();
        dot(0, 0, 0.16); break;
      case "staff":
        P(); M(0, 0.9); L(0, -0.5); ctx.stroke();
        P(); M(0, -0.5); ctx.quadraticCurveTo(cx + 0.6 * s, cy - 0.7 * s, cx + 0.45 * s, cy - 0.1 * s); ctx.stroke(); break;
      case "tablet":
        P(); ctx.rect(cx - 0.55 * s, cy - 0.8 * s, 1.1 * s, 1.6 * s); ctx.stroke();
        ctx.lineWidth *= 0.6;
        P(); M(-0.3, -0.35); L(0.3, -0.35); ctx.stroke();
        P(); M(-0.3, 0); L(0.3, 0); ctx.stroke();
        P(); M(-0.3, 0.35); L(0.3, 0.35); ctx.stroke(); break;
      case "basket":
        P(); M(-0.7, -0.2); L(0.7, -0.2); L(0.5, 0.7); L(-0.5, 0.7); ctx.closePath(); ctx.stroke();
        P(); arc(0, -0.2, 0.5, Math.PI, 0); ctx.stroke(); break;
      case "pyramid":
        P(); M(0, -0.8); L(0.8, 0.65); L(-0.8, 0.65); ctx.closePath(); ctx.stroke();
        P(); M(0, -0.8); L(0, 0.65); ctx.stroke(); break;
      case "tower":
        P(); M(-0.45, 0.85); L(-0.45, -0.5); L(-0.25, -0.5); L(-0.25, -0.75); L(-0.05, -0.75); L(-0.05, -0.5);
        L(0.45, -0.5); L(0.45, 0.85); ctx.closePath(); ctx.stroke(); break;
      case "house":
        P(); M(-0.7, 0.8); L(-0.7, -0.1); L(0, -0.8); L(0.7, -0.1); L(0.7, 0.8); ctx.closePath(); ctx.stroke(); break;
      case "coins":
        P(); ctx.ellipse(cx, cy + 0.45 * s, s * 0.6, s * 0.2, 0, 0, Math.PI * 2); ctx.stroke();
        P(); ctx.ellipse(cx, cy + 0.05 * s, s * 0.6, s * 0.2, 0, 0, Math.PI * 2); ctx.stroke();
        P(); ctx.ellipse(cx, cy - 0.35 * s, s * 0.6, s * 0.2, 0, 0, Math.PI * 2); ctx.stroke(); break;
      case "calf":
        P(); arc(0, 0.1, 0.5, 0, Math.PI * 2); ctx.stroke();
        P(); M(-0.5, -0.25); L(-0.85, -0.75); ctx.stroke();
        P(); M(0.5, -0.25); L(0.85, -0.75); ctx.stroke(); break;
      case "scale":
        P(); M(0, -0.8); L(0, 0.7); ctx.stroke();
        P(); M(-0.75, -0.45); L(0.75, -0.45); ctx.stroke();
        P(); arc(-0.55, -0.05, 0.32, 0, Math.PI); ctx.stroke();
        P(); arc(0.55, -0.05, 0.32, 0, Math.PI); ctx.stroke();
        P(); M(-0.4, 0.75); L(0.4, 0.75); ctx.stroke(); break;
      case "note":
        dot(-0.2, 0.55, 0.26);
        P(); M(0.05, 0.55); L(0.05, -0.7); L(0.6, -0.5); ctx.stroke(); break;
      case "sun":
        P(); arc(0, 0, 0.4, 0, Math.PI * 2); ctx.stroke();
        for (var r = 0; r < 8; r++) {
          var ra = r * Math.PI / 4;
          P(); M(Math.cos(ra) * 0.6, Math.sin(ra) * 0.6); L(Math.cos(ra) * 0.9, Math.sin(ra) * 0.9); ctx.stroke();
        } break;
      case "sword":
        P(); M(0, -0.9); L(0, 0.55); ctx.stroke();
        P(); M(-0.4, 0.4); L(0.4, 0.4); ctx.stroke();
        P(); M(0, 0.55); L(0, 0.85); ctx.stroke(); break;
      case "arch":
        P(); M(-0.55, 0.8); L(-0.55, -0.1);
        ctx.quadraticCurveTo(cx - 0.55 * s, cy - 0.85 * s, cx, cy - 0.85 * s);
        ctx.quadraticCurveTo(cx + 0.55 * s, cy - 0.85 * s, cx + 0.55 * s, cy - 0.1 * s);
        L(0.55, 0.8); ctx.stroke(); break;
      case "palm":
        P(); M(0, 0.85); ctx.quadraticCurveTo(cx - 0.1 * s, cy - 0.1 * s, cx, cy - 0.4 * s); ctx.stroke();
        for (var fr = -2; fr <= 2; fr++) {
          P(); M(0, -0.4); ctx.quadraticCurveTo(cx + fr * 0.25 * s, cy - 0.8 * s, cx + fr * 0.45 * s, cy - 0.45 * s); ctx.stroke();
        } break;
      case "dove":
        P(); M(-0.85, -0.2); ctx.quadraticCurveTo(cx - 0.1 * s, cy - 0.5 * s, cx + 0.2 * s, cy + 0.1 * s); ctx.stroke();
        P(); M(0.2, 0.1); ctx.quadraticCurveTo(cx + 0.7 * s, cy - 0.3 * s, cx + 0.85 * s, cy + 0.2 * s); ctx.stroke();
        P(); M(-0.1, 0.1); L(0.1, 0.7); ctx.stroke(); break;
      case "table":
        P(); arc(0, 0, 0.75, Math.PI, 0); ctx.stroke();
        P(); M(-0.8, 0.05); L(0.8, 0.05); ctx.stroke();
        P(); M(-0.55, 0.05); L(-0.55, 0.65); ctx.stroke();
        P(); M(0.55, 0.05); L(0.55, 0.65); ctx.stroke(); break;
      case "fish":
        P(); M(-0.5, 0); ctx.quadraticCurveTo(cx, cy - 0.55 * s, cx + 0.55 * s, cy);
        ctx.quadraticCurveTo(cx, cy + 0.55 * s, cx - 0.5 * s, cy); ctx.stroke();
        P(); M(-0.5, 0); L(-0.9, -0.35); L(-0.9, 0.35); ctx.closePath(); ctx.stroke(); break;
      case "wind":
        P(); M(-0.8, -0.4); ctx.quadraticCurveTo(cx + 0.3 * s, cy - 0.7 * s, cx + 0.2 * s, cy - 0.15 * s);
        ctx.quadraticCurveTo(cx + 0.1 * s, cy + 0.2 * s, cx - 0.3 * s, cy - 0.05 * s); ctx.stroke();
        P(); M(-0.8, 0.35); ctx.quadraticCurveTo(cx + 0.5 * s, cy + 0.05 * s, cx + 0.55 * s, cy + 0.6 * s); ctx.stroke(); break;
      case "camel":
        P(); M(-0.8, 0.6); L(-0.7, 0.0);
        ctx.quadraticCurveTo(cx - 0.45 * s, cy - 0.6 * s, cx - 0.2 * s, cy - 0.05 * s);
        ctx.quadraticCurveTo(cx + 0.1 * s, cy - 0.6 * s, cx + 0.35 * s, cy - 0.05 * s);
        L(0.55, -0.05); L(0.7, -0.55); ctx.stroke(); break;
      case "scroll":
        P(); M(-0.5, -0.6); L(0.5, -0.6); ctx.stroke();
        P(); M(-0.5, 0.6); L(0.5, 0.6); ctx.stroke();
        P(); arc(-0.5, -0.45, 0.18, 0, Math.PI * 2); ctx.stroke();
        P(); arc(0.5, 0.45, 0.18, 0, Math.PI * 2); ctx.stroke();
        P(); M(-0.5, -0.6); L(-0.5, 0.6); ctx.stroke();
        P(); M(0.5, -0.6); L(0.5, 0.6); ctx.stroke(); break;
      case "wall":
        P(); ctx.rect(cx - 0.8 * s, cy - 0.55 * s, 1.6 * s, 1.1 * s); ctx.stroke();
        ctx.lineWidth *= 0.6;
        P(); M(-0.8, -0.18); L(0.8, -0.18); ctx.stroke();
        P(); M(-0.8, 0.18); L(0.8, 0.18); ctx.stroke();
        P(); M(0, -0.55); L(0, -0.18); ctx.stroke();
        P(); M(-0.4, -0.18); L(-0.4, 0.18); ctx.stroke();
        P(); M(0.4, -0.18); L(0.4, 0.18); ctx.stroke(); break;
      case "cave":
        P(); M(-0.8, 0.8); L(-0.8, 0.0);
        ctx.quadraticCurveTo(cx - 0.8 * s, cy - 0.8 * s, cx, cy - 0.8 * s);
        ctx.quadraticCurveTo(cx + 0.8 * s, cy - 0.8 * s, cx + 0.8 * s, cy);
        L(0.8, 0.8); ctx.stroke();
        dot(-0.25, 0.45, 0.12); dot(0.05, 0.5, 0.12); dot(0.32, 0.45, 0.12); break;
      case "mountain":
        P(); M(-0.85, 0.65); L(-0.3, -0.35); L(0.05, 0.15); L(0.45, -0.7); L(0.85, 0.65);
        ctx.closePath(); ctx.stroke(); break;
      case "lamp":
        P(); M(-0.5, 0.8); L(-0.5, -0.1);
        ctx.quadraticCurveTo(cx - 0.5 * s, cy - 0.7 * s, cx, cy - 0.7 * s);
        ctx.quadraticCurveTo(cx + 0.5 * s, cy - 0.7 * s, cx + 0.5 * s, cy - 0.1 * s);
        L(0.5, 0.8); ctx.stroke();
        P(); M(0, -0.5); ctx.quadraticCurveTo(cx + 0.22 * s, cy - 0.1 * s, cx, cy + 0.25 * s);
        ctx.quadraticCurveTo(cx - 0.22 * s, cy - 0.1 * s, cx, cy - 0.5 * s); ctx.fill(); break;
      case "crescent":
        P(); arc(0, 0, 0.8, 0.6, Math.PI * 2 - 0.6); ctx.stroke(); break;
      case "sheaf":
        P(); M(0, 0.85); L(0, -0.85); ctx.stroke();
        P(); M(0, 0.85); L(-0.42, -0.7); ctx.stroke();
        P(); M(0, 0.85); L(0.42, -0.7); ctx.stroke();
        ctx.lineWidth *= 0.8;
        P(); M(-0.45, 0.28); L(0.45, 0.28); ctx.stroke(); break;
      case "rope":
        P(); arc(-0.3, 0, 0.4, 0, Math.PI * 2); ctx.stroke();
        P(); arc(0.3, 0, 0.4, 0, Math.PI * 2); ctx.stroke(); break;
      default:
        dot(0, 0, 0.3);
    }
    ctx.restore();
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

    // Inner medallion — holds the story motif. A solid gold border
    // marks a named figure; a dashed border marks an unnamed one
    // (echoing the canvas legend).
    polygonPath(ctx, cx, cy, n > 8 ? 8 : n, R * 0.34, rot);
    ctx.fillStyle = rgba(mix(base, "#000000", 0.5), 0.96);
    ctx.fill();
    ctx.strokeStyle = rgba(GOLD, person.named ? 0.9 : 0.7);
    ctx.lineWidth = Math.max(0.9, R * 0.035);
    if (!person.named) ctx.setLineDash([R * 0.09, R * 0.06]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Story motif at the heart of the seal (bespoke, else by archetype)
    var motif = motifFor(person);
    if (motif) drawMotif(ctx, cx, cy, R * 0.21, motif, "#f4ead2");
    else { ctx.beginPath(); ctx.arc(cx, cy, R * 0.08, 0, Math.PI * 2); ctx.fillStyle = GOLD; ctx.fill(); }

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
