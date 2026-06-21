/*
 * People of the Quran — WebGL universe (Three.js + real bloom).
 * ------------------------------------------------------------------
 * A full WebGL rewrite of the living canvas: a luminous emissive core,
 * families as floating clusters of billboarded cards, nebulae, a
 * star-field, exponential fog, OrbitControls, and a true UnrealBloomPass
 * post-processing glow.
 *
 * It mirrors the interface of the canvas engines so app.js can drive it:
 *   setData, center, focusNode, setSelected, setPath, setConstellations,
 *   setAutoRotate, startIntro, skipIntro, stop  (+ onSelect / onHover).
 *
 * Loaded as an ES module; on success it publishes window.PQGraphGL.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const GOLD = 0xf0c94e;

// Records the current setup step so a failure can report exactly where it
// happened (read by app.js when WebGL falls back). Invaluable for diagnosing
// on a phone where there's no console.
function step(s) { if (typeof window !== 'undefined') window.__pqStep = s; }

/* ---------- small texture factories ---------- */
function starTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function glowTexture(rgb) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, `rgba(${rgb},0.9)`);
  g.addColorStop(0.4, `rgba(${rgb},0.35)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/* ---------- person card texture (seal + floating name) ---------- */
function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function cardTexture(person, depict) {
  const S = 2;                       // supersample for crispness
  const W = 360, H = 172;            // taller card → room for name, cross-name, title
  const c = document.createElement('canvas'); c.width = W * S; c.height = H * S;
  const x = c.getContext('2d'); x.scale(S, S);

  const prophet = (person.archetypes || []).indexOf('prophet') >= 0;
  // Refusers, tyrants, the arrogant and the defiant carry no light; everyone
  // else (the prophets, the believing, the oppressed, the repentant, the
  // nations who kept faith) glows — the bloom pass turns the gold rim and
  // seal aura into an outward glow.
  const NEG = { tyrant: 1, 'arrogant-elite': 1, hypocrite: 1, skeptic: 1 };
  const ALWAYS = { prophet: 1, 'faithful-companion': 1, martyr: 1, 'believing-woman': 1 };
  const arch = person.archetypes || [];
  // Dark only if defiance is the DEFINING trait (primary archetype) and the
  // figure is not a prophet/companion/martyr/believing woman.
  const positive = arch.some(function (a) { return ALWAYS[a]; }) || !NEG[arch[0]];
  const pad = 16, emR = 44;
  // glass body
  roundRect(x, 4, 4, W - 8, H - 8, 22);
  x.fillStyle = positive ? 'rgba(10,12,24,0.82)' : 'rgba(16,13,18,0.88)'; x.fill();
  if (positive) {
    x.lineWidth = 7; x.strokeStyle = 'rgba(240,201,78,0.16)'; x.stroke();   // soft halo for bloom
    x.lineWidth = 2.6; x.strokeStyle = prophet ? 'rgba(245,210,110,0.95)' : 'rgba(224,180,90,0.7)'; x.stroke();
  } else {
    x.lineWidth = 2.2; x.strokeStyle = 'rgba(120,130,156,0.5)'; x.stroke(); // cold, unlit
  }
  // seal
  const ex = pad + emR, ey = H / 2;
  if (depict) depict.drawSeal(x, ex, ey, emR, person, { glow: positive });
  // name + cross-tradition alt-name + title
  const tx = ex + emR + 14;
  const maxW = W - tx - pad;
  x.textAlign = 'left';
  x.textBaseline = 'alphabetic';

  // The Bible/Greek (Latin-script) name, shown unless it is already the
  // displayed name or already sits in the title — so every shared figure
  // carries its cross-tradition identity on the card, not just the Quranic one.
  const nm = person.names || {};
  let alt = nm.bible || nm.biblical || nm.greek || '';
  const title = person.title || '';
  const altPrimary = alt.split(/[/(]/)[0].trim();   // "Jesus / Christ" -> "Jesus"
  if (alt && (altPrimary.toLowerCase() === (person.name || '').toLowerCase() ||
              (altPrimary && title.indexOf(altPrimary) >= 0))) alt = '';

  // Lay the lines out as a vertically-centred stack against the seal,
  // so the card breathes whether a figure has 2, 3 or 4 lines.
  const lines = [{ t: person.name, f: "600 28px 'Inter', system-ui, sans-serif", c: '#eaf2ff', h: 33 }];
  if (alt) lines.push({ t: alt, f: "600 17px 'Inter', system-ui, sans-serif", c: 'rgba(240,201,78,0.92)', h: 24 });
  if (title) lines.push({ t: title, f: "19px 'Inter', system-ui, sans-serif", c: '#9fb0d0', h: 25 });
  if (!person.named) lines.push({ t: '✦ referenced', f: "italic 15px 'Inter', sans-serif", c: 'rgba(240,201,78,0.8)', h: 20 });

  const totalH = lines.reduce(function (a, l) { return a + l.h; }, 0);
  let cy = ey - totalH / 2;
  x.textBaseline = 'top';
  for (let i = 0; i < lines.length; i++) {
    x.font = lines[i].f; x.fillStyle = lines[i].c;
    fillClipped(x, lines[i].t, tx, cy, maxW);
    cy += lines[i].h;
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.needsUpdate = true;
  return { texture: t, aspect: W / H };
}
function fillClipped(ctx, text, x, y, maxW) {
  if (!text) return;
  let t = text;
  if (ctx.measureText(t).width > maxW) {
    while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
    t += '…';
  }
  ctx.fillText(t, x, y);
}

/* ================================================================= */
class PQGraphGL {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.onSelect = opts.onSelect || (() => {});
    this.onHover = opts.onHover || (() => {});
    this.onExitFocus = opts.onExitFocus || (() => {});
    this.personById = opts.personById || {};
    this.depict = opts.depict || window.PQDepict;
    this._tmpTar = new THREE.Vector3();

    this.nodeObjs = {};            // id -> { sprite, base, aspect, dim }
    this.nodeList = [];
    this.edges = [];
    this.clusterAnchors = {};
    this.selectedId = null;
    this.pathSet = null;
    this._built = false;
    this._running = true;
    this._time = 0;

    const W = canvas.clientWidth || 800, H = canvas.clientHeight || 600;
    step('mobile-check');
    this._mobile = (typeof matchMedia !== 'undefined' && matchMedia('(max-width: 820px)').matches) || ('ontouchstart' in window && Math.min(W, H) < 820);
    step('create-renderer');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !this._mobile, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._mobile ? 1.5 : 2));
    renderer.setSize(W, H, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x04050d, 1);
    this.renderer = renderer;

    step('scene-camera');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04050d, 0.00072);
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(58, W / H, 1, 16000);
    camera.position.set(0, 240, 940);
    this.camera = camera;

    step('controls');
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.enablePan = false; controls.rotateSpeed = 0.7;
    controls.minDistance = 120; controls.maxDistance = 3200;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.45;
    this.controls = controls;

    step('lights');
    scene.add(new THREE.AmbientLight(0xb0c4ff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.85); dir.position.set(40, 60, 30); scene.add(dir);
    const rim = new THREE.PointLight(GOLD, 2.4, 2600); rim.position.set(0, 0, 0); scene.add(rim);
    const fill = new THREE.PointLight(0x6ff7ff, 0.9, 2600); fill.position.set(-260, 160, -220); scene.add(fill);

    step('background'); this._buildBackground();
    step('core'); this._buildCore();

    // Post-processing: render -> bloom -> output
    step('composer'); const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    step('bloom'); const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), this._mobile ? 0.72 : 0.95, this._mobile ? 0.5 : 0.6, 0.55);
    composer.addPass(bloom);
    step('output-pass'); composer.addPass(new OutputPass());
    this.composer = composer; this.bloom = bloom;

    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();
    step('bind-events'); this._bindEvents();

    this._clock = new THREE.Clock();
    this._loop = this._loop.bind(this);

    // Probe render: surfaces any WebGL/driver failure synchronously so the
    // caller can fall back to the canvas engine instead of showing black.
    step('probe-render'); this.composer.render();
    step('done');

    requestAnimationFrame(this._loop);
  }

  /* ---------- background: stars + nebulae ---------- */
  _buildBackground() {
    const starTex = starTexture();
    const q = this._mobile ? 0.45 : 1;            // fewer particles on phones
    const layers = [
      { n: Math.round(1400 * q), rMin: 1200, rMax: 4200, size: 7, op: 0.55 },
      { n: Math.round(700 * q), rMin: 600, rMax: 1400, size: 11, op: 0.8 }
    ];
    this._starPoints = [];
    for (const ly of layers) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(ly.n * 3);
      for (let i = 0; i < ly.n; i++) {
        const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2;
        const r = ly.rMin + Math.random() * (ly.rMax - ly.rMin), s = Math.sqrt(1 - u * u);
        pos[i * 3] = r * s * Math.cos(t); pos[i * 3 + 1] = r * u; pos[i * 3 + 2] = r * s * Math.sin(t);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: ly.size, map: starTex, transparent: true, opacity: ly.op,
        color: 0xcfe0ff, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
      });
      const pts = new THREE.Points(geo, mat);
      this.scene.add(pts); this._starPoints.push(pts);
    }

    // Nebula clouds (large additive sprites)
    const defs = [
      { rgb: '120,70,190', op: 0.5 }, { rgb: '40,90,200', op: 0.42 },
      { rgb: '70,160,150', op: 0.32 }, { rgb: '216,168,56', op: 0.28 }
    ];
    this._nebulae = [];
    for (const d of defs) {
      const mat = new THREE.SpriteMaterial({ map: glowTexture(d.rgb), transparent: true, opacity: d.op, blending: THREE.AdditiveBlending, depthWrite: false });
      const sp = new THREE.Sprite(mat);
      const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, r = 700 + Math.random() * 700, s = Math.sqrt(1 - u * u);
      sp.position.set(r * s * Math.cos(t), r * u * 0.6, r * s * Math.sin(t));
      const sz = 1300 + Math.random() * 900; sp.scale.set(sz, sz, 1);
      this.scene.add(sp); this._nebulae.push(sp);
    }
  }

  /* ---------- the luminous core ---------- */
  _buildCore() {
    const group = new THREE.Group();
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(30, 2),
      new THREE.MeshStandardMaterial({ color: 0x3a2c08, emissive: GOLD, emissiveIntensity: 2.6, roughness: 0.4, metalness: 0.3 })
    );
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(46, 1),
      new THREE.MeshBasicMaterial({ color: 0xffe9a8, wireframe: true, transparent: true, opacity: 0.5 })
    );
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('255,228,150'), transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(360, 360, 1);
    group.add(inner); group.add(shell); group.add(halo);
    this.scene.add(group);
    this.core = group; this._coreShell = shell; this._coreInner = inner;
  }

  /* ---------- data / layout ---------- */
  setData(nodes, edges) {
    // Subsequent calls (filter changes) only update dim states — keep layout.
    if (this._built) { this._applyDims(nodes); return; }

    step('layout');
    const pos = this._computeLayout(nodes, edges);
    this.nodeList = nodes.slice();
    step('cards');
    for (const n of nodes) {
      const p = this.personById[n.id];
      // One malformed card must never take down the whole universe.
      let card;
      try { card = cardTexture(p, this.depict); }
      catch (e) { if (window.console) console.warn('card texture failed for', n.id, e); card = { texture: null, aspect: 2.1 }; }
      const mat = new THREE.SpriteMaterial({ map: card.texture, color: card.texture ? 0xffffff : (n.color || 0x9aa6c0), transparent: true, depthWrite: false, depthTest: true });
      const sprite = new THREE.Sprite(mat);
      const P = pos[n.id];
      sprite.position.set(P.x, P.y, P.z);
      const h = 44, w = h * card.aspect;
      sprite.scale.set(w, h, 1);
      sprite.userData.id = n.id;
      sprite.renderOrder = 2;
      this.scene.add(sprite);
      this.nodeObjs[n.id] = {
        sprite, base: new THREE.Vector3(P.x, P.y, P.z), bw: w, bh: h, dim: !!n.dim,
        targetPos: new THREE.Vector3(P.x, P.y, P.z), targetK: 1, curK: 1, targetOpacity: 1, curOpacity: 1
      };
    }

    // Edges
    this.edges = edges.filter(e => this.nodeObjs[e.source] && this.nodeObjs[e.target]);
    step('edges'); this._buildEdges();
    step('constellations'); this._buildConstellations();
    this._built = true;
    this._applyDims(nodes);
    step('data-done');
  }

  _computeLayout(nodes, edges) {
    // Family anchors on a flattened Fibonacci sphere around the core.
    const groups = [];
    nodes.forEach(n => { const g = n.group || 'Other'; if (groups.indexOf(g) < 0) groups.push(g); });
    const CR = 360; this.clusterAnchors = {};
    groups.forEach((g, i) => {
      const t = (i + 0.5) / groups.length, inc = Math.acos(1 - 2 * t), az = Math.PI * (1 + Math.sqrt(5)) * i;
      this.clusterAnchors[g] = { x: CR * Math.sin(inc) * Math.cos(az), y: CR * Math.cos(inc) * 0.7, z: CR * Math.sin(inc) * Math.sin(az) };
    });
    // Seed near anchors
    const P = {};
    nodes.forEach(n => {
      const a = this.clusterAnchors[n.group || 'Other'];
      P[n.id] = { x: a.x + (Math.random() - 0.5) * 130, y: a.y + (Math.random() - 0.5) * 130, z: a.z + (Math.random() - 0.5) * 130, vx: 0, vy: 0, vz: 0, g: n.group || 'Other' };
    });
    const byId = P, ids = nodes.map(n => n.id);
    const eds = edges.filter(e => byId[e.source] && byId[e.target]);
    let alpha = 1;
    for (let it = 0; it < 260; it++) {
      for (let i = 0; i < ids.length; i++) {
        const a = byId[ids[i]];
        for (let j = i + 1; j < ids.length; j++) {
          const b = byId[ids[j]];
          let dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          let d2 = dx * dx + dy * dy + dz * dz || 0.01, d = Math.sqrt(d2), f = 17000 / d2;
          dx /= d; dy /= d; dz /= d;
          a.vx += dx * f; a.vy += dy * f; a.vz += dz * f;
          b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f;
        }
        const an = this.clusterAnchors[a.g];
        a.vx += (an.x - a.x) * 0.012; a.vy += (an.y - a.y) * 0.012; a.vz += (an.z - a.z) * 0.012;
        const dc = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z) || 1;
        if (dc < 150) { const push = (150 - dc) * 0.04; a.vx += (a.x / dc) * push; a.vy += (a.y / dc) * push; a.vz += (a.z / dc) * push; }
      }
      for (const e of eds) {
        const s = byId[e.source], t = byId[e.target];
        let dx = t.x - s.x, dy = t.y - s.y, dz = t.z - s.z, dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
        const disp = (dist - 150) * 0.012; dx /= dist; dy /= dist; dz /= dist;
        s.vx += dx * disp; s.vy += dy * disp; s.vz += dz * disp;
        t.vx -= dx * disp; t.vy -= dy * disp; t.vz -= dz * disp;
      }
      for (const id of ids) { const p = byId[id]; p.vx *= 0.8; p.vy *= 0.8; p.vz *= 0.8; p.x += p.vx * alpha; p.y += p.vy * alpha; p.z += p.vz * alpha; }
      alpha *= 0.992;
    }
    return P;
  }

  _buildEdges() {
    if (this._edgeLines) { this.scene.remove(this._edgeLines); this._edgeLines.geometry.dispose(); }
    const seg = [];
    for (const e of this.edges) {
      const a = this.nodeObjs[e.source].base, b = this.nodeObjs[e.target].base;
      seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3));
    const mat = new THREE.LineBasicMaterial({ color: 0x96a5d2, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false });
    this._edgeLines = new THREE.LineSegments(geo, mat);
    this._edgeLines.renderOrder = 1;
    this.scene.add(this._edgeLines);

    // Radiance from core to each cluster anchor
    if (this._radiance) this.scene.remove(this._radiance);
    const rseg = [];
    for (const g in this.clusterAnchors) { const a = this.clusterAnchors[g]; rseg.push(0, 0, 0, a.x, a.y, a.z); }
    const rgeo = new THREE.BufferGeometry();
    rgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(rseg), 3));
    this._radiance = new THREE.LineSegments(rgeo, new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.scene.add(this._radiance);
  }

  _buildConstellations() {
    this._labelGroup = new THREE.Group();
    const byGroup = {};
    this.nodeList.forEach(n => { (byGroup[n.group] = byGroup[n.group] || []).push(this.nodeObjs[n.id].base); });
    for (const g in byGroup) {
      const arr = byGroup[g]; if (arr.length < 2) continue;
      const c = arr.reduce((s, p) => ({ x: s.x + p.x, y: s.y + p.y, z: s.z + p.z }), { x: 0, y: 0, z: 0 });
      c.x /= arr.length; c.y /= arr.length; c.z /= arr.length;
      const tex = this._labelTexture(g.toUpperCase());
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex.texture, transparent: true, opacity: 0.42, depthWrite: false, depthTest: false }));
      sp.position.set(c.x, c.y + 70, c.z);
      const h = 26, w = h * tex.aspect; sp.scale.set(w, h, 1);
      sp.renderOrder = 3;
      this._labelGroup.add(sp);
    }
    this.scene.add(this._labelGroup);
  }
  _labelTexture(text) {
    const S = 2, fs = 30, pad = 16;
    const m = document.createElement('canvas').getContext('2d');
    m.font = `600 ${fs}px 'Iowan Old Style', Georgia, serif`;
    const spaced = text.split('').join(' ');
    const w = Math.ceil(m.measureText(spaced).width) + pad * 2, h = fs + pad;
    const c = document.createElement('canvas'); c.width = w * S; c.height = h * S;
    const x = c.getContext('2d'); x.scale(S, S);
    x.font = `600 ${fs}px 'Iowan Old Style', Georgia, serif`;
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = 'rgba(240,210,120,0.95)'; x.fillText(spaced, w / 2, h / 2);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return { texture: t, aspect: w / h };
  }

  /* ---------- dim / selection / path ---------- */
  _applyDims(nodes) {
    const dimById = {}; nodes.forEach(n => { dimById[n.id] = !!n.dim; });
    for (const id in this.nodeObjs) {
      const o = this.nodeObjs[id]; o.dim = dimById[id];
    }
    this._refreshNodeStates();
  }
  _refreshNodeStates() {
    if (this._cascade) return;                 // cascade owns the targets while active
    const pathOn = !!this.pathSet;
    for (const id in this.nodeObjs) {
      const o = this.nodeObjs[id];
      const faded = o.dim || (pathOn && !this.pathSet[id]);
      const sel = id === this.selectedId || (pathOn && this.pathSet[id]);
      o.targetPos.copy(o.base);
      o.targetOpacity = faded ? 0.12 : 1;
      o.targetK = sel ? 1.32 : 1;
      o.sprite.renderOrder = sel ? 5 : 2;
    }
    if (this._edgeLines) this._edgeLines.material.opacity = pathOn ? 0.04 : 0.16;
  }

  // Fluidly drive every sprite toward its current target (position/scale/opacity).
  _animateNodes() {
    for (const id in this.nodeObjs) {
      const o = this.nodeObjs[id], s = o.sprite;
      s.position.lerp(o.targetPos, 0.16);
      o.curK += (o.targetK - o.curK) * 0.16;
      o.curOpacity += (o.targetOpacity - o.curOpacity) * 0.16;
      s.scale.set(o.bw * o.curK, o.bh * o.curK, 1);
      s.material.opacity = o.curOpacity;
    }
    if (this._cascade && this._connLine) this._updateConnectors();
  }
  setSelected(id) { this.selectedId = id; this._refreshNodeStates(); }

  setPath(ids) {
    if (this._pathLine) { this.scene.remove(this._pathLine); this._pathLine.geometry.dispose(); this._pathLine = null; }
    if (!ids || ids.length < 2) { this.pathSet = null; this._refreshNodeStates(); return; }
    this.pathSet = {}; ids.forEach(i => this.pathSet[i] = true);
    const seg = [];
    for (let i = 1; i < ids.length; i++) {
      const a = this.nodeObjs[ids[i - 1]], b = this.nodeObjs[ids[i]];
      if (a && b) seg.push(a.base.x, a.base.y, a.base.z, b.base.x, b.base.y, b.base.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3));
    this._pathLine = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
    this._pathLine.renderOrder = 4;
    this.scene.add(this._pathLine);
    this.controls.autoRotate = false;
    this._refreshNodeStates();
  }

  setConstellations(on) { if (this._labelGroup) this._labelGroup.visible = on; }
  setAutoRotate(on) { this.controls.autoRotate = on; }

  /* ---------- camera framing ---------- */
  center() {
    let maxd = 1;
    for (const id in this.nodeObjs) { const b = this.nodeObjs[id].base; maxd = Math.max(maxd, b.length()); }
    const dist = Math.min(2600, Math.max(620, maxd * 2.25));
    this.controls.target.set(0, 0, 0);
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    if (dir.lengthSq() < 0.001) dir.set(0, 0.25, 1).normalize();
    this.camera.position.copy(dir.multiplyScalar(dist));
    this.controls.update();
  }
  focusNode(id) {
    const o = this.nodeObjs[id]; if (!o) return;
    this._focus = { target: o.base.clone(), t: 0 };
    this.controls.autoRotate = false;
  }

  /* ---------- magnetic cascade: relationship navigator ----------
   * Pulls the focus and its 1st/2nd/3rd-tier relations forward into a
   * horizontal, column-by-tier layout facing the camera; everyone else
   * recedes and fades. All motion is target-driven, so it is fluid, and
   * clearCascade() animates everyone home again. */
  focusCascade(focusId, tiers, opts) {
    opts = opts || {};
    if (!this.nodeObjs[focusId]) return;
    const firstEntry = !this._cascade;
    if (firstEntry) {
      this._orbitPose = { pos: this.camera.position.clone(), target: this.controls.target.clone() };
    }
    this._cascade = true; this._focus = null;
    // Keep controls live but lock rotation: let the wheel/pinch dolly the
    // camera *into the cascade* and let click-drag / one-finger-drag PAN it
    // left/right/up, instead of the browser page-zooming or doing nothing.
    this.controls.enabled = true;
    this.controls.enableRotate = false;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.screenSpacePanning = true;
    this.controls.autoRotate = false;
    this.controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    this.controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
    if (this._edgeLines) this._edgeLines.visible = false;
    if (this._labelGroup) this._labelGroup.visible = false;
    if (this._radiance) this._radiance.visible = false;
    if (this.core) this.core.visible = false;          // the core would cover the centred focus
    if (this._pathLine) this._pathLine.visible = false;

    const colGap = 250, rowMax = 760;
    const sides = opts.sides || {};
    const active = {};
    const place = (id, x, y, k, order) => {
      const o = this.nodeObjs[id]; if (!o) return;
      o.targetPos.set(x, y, 0); o.targetK = k; o.targetOpacity = 1;
      o.sprite.renderOrder = order; active[id] = true;
    };
    // Focus sits in the centre; each tier splits left (before) / right (after).
    place(focusId, 0, 0, 1.5, 8);
    const placeColumn = (list, x, t) => {
      const N = list.length; if (!N) return;
      const gap = N > 1 ? Math.max(62, Math.min(132, rowMax / N)) : 120;
      const k = t === 1 ? 1.12 : t === 2 ? 0.96 : 0.84;
      list.forEach((id, i) => place(id, x, (i - (N - 1) / 2) * gap, k, 7 - t));
    };
    (tiers || []).forEach((list, ti) => {
      const t = ti + 1;
      const left = list.filter(id => sides[id] < 0);
      const right = list.filter(id => !(sides[id] < 0));
      placeColumn(left, -t * colGap, t);
      placeColumn(right, t * colGap, t);
    });

    // Connector threads: focus → tier1 → tier2 → tier3 (BFS parent pairs).
    this._buildConnectors((opts.pairs || []).filter(pr => active[pr[0]] && active[pr[1]]));

    // Everyone else recedes and fades (kept at home so they return fluidly).
    for (const id in this.nodeObjs) {
      if (active[id]) continue;
      const o = this.nodeObjs[id];
      o.targetPos.copy(o.base); o.targetOpacity = 0.03; o.targetK = 0.4; o.sprite.renderOrder = 1;
    }

    // Frame the layout front-on with a CONSTANT distance, computed from the
    // widest/tallest the layout can ever be — not the current content. That
    // way re-selecting a different person only rearranges the cards; the
    // camera never dollies in and out between clicks. Only the very first
    // entry tweens in from the orbit pose.
    const W = this.canvas.clientWidth || 1, H = this.canvas.clientHeight || 1;
    const aspect = Math.max(0.5, W / H);
    const tanH = Math.tan(this.camera.fov * Math.PI / 360);
    const needH = rowMax * 0.62;            // tallest a column can ever be
    const needW = 3 * colGap + 200;         // half-width: three tiers each side of centre
    const D = Math.max(needH / tanH, needW / (aspect * tanH)) * 1.06;
    const halfW = D * tanH * aspect;
    // A gentle left bias so the right-side cards aren't fully hidden behind
    // the floating detail panel (pan/zoom can reveal the rest).
    const shiftX = opts.drawerPx ? (opts.drawerPx * 0.32 * halfW / W) : 0;
    const toPos = new THREE.Vector3(shiftX, 0, D);
    const toTar = new THREE.Vector3(shiftX, 0, 0);
    if (firstEntry) {
      this._camTween = {
        fromPos: this.camera.position.clone(), toPos: toPos,
        fromTar: this.controls.target.clone(), toTar: toTar,
        t: 0, dur: 0.95
      };
    } else {
      // Already framed — hold the camera perfectly still; only cards move.
      this._camTween = null;
      this.camera.position.copy(toPos);
      this.controls.target.copy(toTar);
      this.camera.lookAt(toTar);
    }
  }

  clearCascade() {
    if (!this._cascade) return;
    this._cascade = false;
    if (this._edgeLines) this._edgeLines.visible = true;
    if (this._labelGroup) this._labelGroup.visible = this.showConstellations !== false;
    if (this._radiance) this._radiance.visible = true;
    if (this.core) this.core.visible = true;
    if (this._pathLine) this._pathLine.visible = true;
    if (this._connLine) this._connLine.visible = false;
    this._refreshNodeStates();              // targets back to home
    const pose = this._orbitPose || { pos: new THREE.Vector3(0, 240, 940), target: new THREE.Vector3(0, 0, 0) };
    this._camTween = {
      fromPos: this.camera.position.clone(), toPos: pose.pos.clone(),
      fromTar: this.controls.target.clone(), toTar: pose.target.clone(),
      t: 0, dur: 0.85, onDone: () => {
        this.controls.enabled = true; this.controls.enableRotate = true; this.controls.autoRotate = true;
        // Restore the galaxy's default orbit input mapping.
        this.controls.enablePan = false;
        this.controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
        this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
      }
    };
  }

  _buildConnectors(pairs) {
    this._connPairs = pairs;
    if (this._connLine) { this.scene.remove(this._connLine); this._connLine.geometry.dispose(); this._connLine = null; }
    if (!pairs.length) return;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pairs.length * 6), 3));
    this._connLine = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
      color: GOLD, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    this._connLine.renderOrder = 0;
    this._connLine.frustumCulled = false;   // positions update every frame; never cull the threads
    this.scene.add(this._connLine);
    this._updateConnectors();
  }
  _updateConnectors() {
    if (!this._connLine || !this._connPairs) return;
    const arr = this._connLine.geometry.attributes.position.array;
    for (let i = 0; i < this._connPairs.length; i++) {
      const a = this.nodeObjs[this._connPairs[i][0]], b = this.nodeObjs[this._connPairs[i][1]];
      if (!a || !b) continue;
      arr[i * 6] = a.sprite.position.x; arr[i * 6 + 1] = a.sprite.position.y; arr[i * 6 + 2] = a.sprite.position.z;
      arr[i * 6 + 3] = b.sprite.position.x; arr[i * 6 + 4] = b.sprite.position.y; arr[i * 6 + 5] = b.sprite.position.z;
    }
    this._connLine.geometry.attributes.position.needsUpdate = true;
  }
  _applyCamTween(dt) {
    const T = this._camTween; T.t = Math.min(1, T.t + dt / T.dur);
    const e = 1 - Math.pow(1 - T.t, 3);
    this.camera.position.lerpVectors(T.fromPos, T.toPos, e);
    this._tmpTar.lerpVectors(T.fromTar, T.toTar, e);
    this.controls.target.copy(this._tmpTar);
    this.camera.lookAt(this._tmpTar);
    if (T.t >= 1) { this._camTween = null; if (T.onDone) T.onDone(); }
  }

  /* ---------- cinematic intro ---------- */
  startIntro() {
    let maxd = 1; for (const id in this.nodeObjs) maxd = Math.max(maxd, this.nodeObjs[id].base.length());
    const home = Math.min(2600, Math.max(620, maxd * 2.25));
    this._intro = { t: 0, dur: 6.5, home, keys: [
      { at: 0.0, dist: home * 2.7, theta: -1.7, phi: 0.42 },
      { at: 0.42, dist: home * 1.5, theta: -0.5, phi: 1.0 },
      { at: 0.74, dist: home * 1.12, theta: 0.25, phi: 1.16 },
      { at: 1.0, dist: home, theta: 0.6, phi: 1.16 }
    ] };
    this.controls.autoRotate = false; this.controls.enabled = false;
  }
  skipIntro() {
    if (!this._intro) return;
    this._intro = null; this.controls.enabled = true; this.controls.autoRotate = true;
    if (this.onIntroEnd) this.onIntroEnd();
  }
  _applyIntro(dt) {
    const I = this._intro; I.t += dt;
    const k = Math.min(1, I.t / I.dur), keys = I.keys;
    let seg = keys.length - 2;
    for (let i = 0; i < keys.length - 1; i++) { if (k >= keys[i].at && k <= keys[i + 1].at) { seg = i; break; } }
    const a = keys[seg], b = keys[seg + 1];
    const local = (k - a.at) / ((b.at - a.at) || 1), e = 1 - Math.pow(1 - local, 3);
    const dist = a.dist + (b.dist - a.dist) * e, theta = a.theta + (b.theta - a.theta) * e, phi = a.phi + (b.phi - a.phi) * e;
    const st = Math.sin(phi);
    this.camera.position.set(dist * st * Math.cos(theta), dist * Math.cos(phi), dist * st * Math.sin(theta));
    this.camera.lookAt(0, 0, 0);
    if (k >= 1) { this._intro = null; this.controls.enabled = true; this.controls.autoRotate = true; if (this.onIntroEnd) this.onIntroEnd(); }
  }

  /* ---------- interaction ---------- */
  _bindEvents() {
    const dom = this.renderer.domElement;
    let downX = 0, downY = 0, moved = 0;
    const setPointer = (ev) => {
      const r = dom.getBoundingClientRect();
      this._pointer.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
      this._pointer.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
      this._lastClient = { x: ev.clientX - r.left, y: ev.clientY - r.top };
    };
    dom.addEventListener('pointerdown', (ev) => { this.skipIntro(); downX = ev.clientX; downY = ev.clientY; moved = 0; });
    dom.addEventListener('pointermove', (ev) => {
      moved += Math.abs(ev.clientX - downX) + Math.abs(ev.clientY - downY);
      setPointer(ev);
      const id = this._pick();
      if (id !== this._hoverId) {
        this._hoverId = id; dom.style.cursor = id ? 'pointer' : 'grab';
        this.onHover(id, id ? this.personById[id] : null, this._lastClient || { x: 0, y: 0 });
      }
    });
    dom.addEventListener('pointerup', (ev) => {
      if (Math.abs(ev.clientX - downX) + Math.abs(ev.clientY - downY) < 6) {
        setPointer(ev); const id = this._pick();
        if (id) { this.selectedId = id; this._refreshNodeStates(); this.onSelect(id); }
        else if (this._cascade) { this.onExitFocus(); }   // tap empty space to return to the galaxy
      }
    });
    window.addEventListener('resize', () => this._resize());
    // Track the stage's own size too: collapsing the index rail or floating the
    // detail panel changes the canvas width without firing a window resize.
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this.canvas);
    }
  }
  _pick() {
    this._raycaster.setFromCamera(this._pointer, this.camera);
    const sprites = this.nodeList.map(n => this.nodeObjs[n.id].sprite).filter(s => s.material.opacity > 0.3);
    const hit = this._raycaster.intersectObjects(sprites, false);
    return hit.length ? hit[0].object.userData.id : null;
  }
  _resize() {
    const W = this.canvas.clientWidth, H = this.canvas.clientHeight;
    if (!W || !H) return;
    this.camera.aspect = W / H; this.camera.updateProjectionMatrix();
    this.renderer.setSize(W, H, false); this.composer.setSize(W, H);
  }

  /* ---------- main loop ---------- */
  _loop() {
    if (!this._running) return;
    const dt = Math.min(0.05, this._clock.getDelta());
    this._time += dt;
    try {
      if (this._intro) this._applyIntro(dt);
      else if (this._camTween) this._applyCamTween(dt);
      else if (this._cascade) { this.controls.update(); }   // hold view; allow zoom-only dolly
      else {
        this.controls.update();
        if (this._focus) {
          this.controls.target.lerp(this._focus.target, 0.08);
          this._focus.t += dt; if (this._focus.t > 1.2) this._focus = null;
        }
      }
      this._animateNodes();
      // Core shimmer
      const pulse = 1 + 0.05 * Math.sin(this._time * 1.4);
      if (this.core) { this.core.scale.setScalar(pulse); this._coreShell.rotation.y += dt * 0.25; this._coreShell.rotation.x += dt * 0.12; }
      if (this._coreInner) this._coreInner.material.emissiveIntensity = 2.4 + 0.4 * Math.sin(this._time * 1.4);
      for (const n of this._nebulae || []) n.material.rotation += dt * 0.02;

      this.composer.render();
    } catch (err) {
      if (!this._logged) { this._logged = true; console.error('PQGraphGL error:', err); }
    }
    requestAnimationFrame(this._loop);
  }

  stop() { this._running = false; }
  pause() { this._running = false; }
  resume() {
    if (this._running) return;
    this._running = true; this._resize();
    if (this._clock) this._clock.getDelta();   // drop the idle gap
    requestAnimationFrame(this._loop);
  }
}

if (typeof window !== 'undefined') window.PQGraphGL = PQGraphGL;
export { PQGraphGL };
