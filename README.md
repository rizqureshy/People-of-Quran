# People of the Quran

> A living, interconnected knowledge universe of every human being mentioned,
> referenced, implied, or connected to the Quran.

This is **not** a Quran encyclopedia, a tafsir database, or a family tree. It is
an exploration of the *human stories* that carry the Quran's lessons — built as
a **living canvas** you can wander through, where every person, relationship,
story, and lesson connects to a larger narrative.

The Quran is fundamentally a book about people: prophets, rulers, believers,
disbelievers, families, tyrants, reformers, mothers, fathers, friends, advisors,
and opponents. Many of its most important figures are **never named** — Pharaoh
is a title, the wife of Pharaoh and the Queen of Sheba are unnamed, the
Companions of the Cave are anonymous. This project therefore focuses on **people
and identities, not only names.**

---

## ✦ What you can do

- **Fly through a 3D universe** — a cinematic fly-through drops you in beside a
  **luminous golden core** (the Qur'an, the light from which every story
  radiates); the families float around it as distinct **clusters** in a
  deep-space field of drifting nebulae and a multi-layer, twinkling star-field.
  Each person is a **floating glass card** carrying their seal and name. Drag to
  orbit, scroll to zoom, click a card to explore. A one-click toggle drops back
  to a flat 2D canvas.
- **Scrub the timeline** — a ribbon of eras (Beginnings → Patriarchs → Exodus →
  Gospel → Mecca…) lets you light up one age of revelation at a time.
- **Share what you find** — the selected person or an active path is encoded in
  the URL; the 🔗 button copies a link that reopens the exact view.
- **See each person depicted** — respectfully and aniconically. Islamic tradition
  does not depict the faces of the prophets (and the Prophet Muhammad is never
  depicted at all), so every person is given a unique, procedurally-generated
  **geometric seal** — a star-rosette in the visual language of Islamic art,
  coloured by archetype — paired with the **calligraphy of their name**. No
  faces, no portraits, no image assets; it scales to unlimited people.
- **Read each seal's story motif** — at the heart of every seal sits a small
  symbolic glyph evoking that person's narrative: an ark for Nuh, a staff for
  Musa, a well for Yusuf, a palm for Maryam, a lamp of light for the final
  Messenger. Symbolic and aniconic — never a figure.
- **Trace a path between any two people** — "Find a path", click two people, and
  the universe dims to reveal the shortest chain of relationships connecting
  them, step by step (e.g. *Queen of Sheba → Sulayman → Dawud → Bani Israel →
  Yaqub → Ibrahim → Nuh → Adam → Habil*). The graph is fully connected, so a
  path always exists.
- **Find your way by constellations** — faint family names ("IBRAHIM'S FAMILY",
  "HOUSE OF YAQUB"…) float over each cluster in 3D so the world stays legible as
  you orbit.
- **Move through the network** — open anyone and jump to their connections:
  `Adam → Hawwa → Habil → Qabil`, `Ibrahim → Hajar → Ismail → Muhammad`,
  `Musa → Pharaoh → Haman → Asiya → Bani Israel`, `Maryam → Isa → Hawariyyun`.
- **See where knowledge comes from** — every statement keeps its origin. Each
  person's panel separates **Quran**, **Hadith**, **Classical Tafsir**,
  **Biblical** and **Jewish traditions**, and **historical/academic** sources
  rather than flattening them into one narrative.
- **Filter by archetype** — surface recurring human patterns across revelation:
  prophets, tyrants, reformers, believing women, skeptics, advisors, hypocrites,
  martyrs, repentant sinners, arrogant elites, oppressed communities, faithful
  companions.
- **Start from a story** — narrative threads (the Flood, the Most Beautiful
  Story, the River and the Sea, the Chosen Mother…) highlight the people whose
  arcs weave them together.
- **Honour the unnamed** — anonymous-but-pivotal individuals are first-class
  citizens, marked with a dashed ring on the canvas and an "unnamed" tag.

## ✦ Running it

No build step, no dependencies, no network required. Either:

```bash
# Serve it locally (recommended — the WebGL view needs http, not file://)
python3 -m http.server 8000   # then visit http://localhost:8000

# Opening index.html directly also works, but only the 2D / canvas fallback
# loads from file:// (browsers block ES modules — and therefore Three.js —
# over file://). For the WebGL + bloom universe, use a server or GitHub Pages.
```

## ✦ View it on your phone

The WebGL universe needs an `https` origin, so the easiest way to open it on a
phone is **GitHub Pages**:

1. In this repo on GitHub, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's the only manual step. The included workflow
(`.github/workflows/pages.yml`) then deploys on every push, and the site is live at:

> **https://rizqureshy.github.io/people-of-quran/**

Open that on your phone, tap **Enter the universe**, and orbit with one finger
(pinch to zoom, tap a card to explore). If a device can't run WebGL it falls
back to the canvas mode automatically.

## ✦ How it is built

The 3D universe runs on **Three.js / WebGL** with a real **UnrealBloomPass** glow.
Three.js is **vendored into the repo** (`assets/vendor/three/`) and resolved via a
native **import map**, so there is still **no build step and no network needed** —
it runs offline. A dependency-free 2D canvas mode (and a canvas-3D fallback for
browsers without WebGL/import-map support) ships alongside it.

```
index.html                Page shell, import map, and layout
assets/css/styles.css     Cosmic glass-morphism styling
assets/js/data.js         The dataset (people, relationships, sources, stories)
assets/js/depictions.js   Aniconic visual identity — the geometric seal generator
assets/js/graph-webgl.js  The WebGL universe — Three.js scene + UnrealBloom
assets/js/graph3d.js      Canvas-3D fallback — orbit camera + perspective projection
assets/js/graph.js        The flat 2D canvas — a force-directed graph engine
assets/js/app.js          UI: search, filters, index, drawer, timeline, deep-links
assets/vendor/three/      Vendored Three.js build + addons (bloom, OrbitControls)
```

All graph engines expose the same small interface (`setData`, `center`,
`focusNode`, `setSelected`, `onSelect`, `onHover`) so the app swaps between the
3D universe and the 2D canvas at runtime. Everything renders on a plain 2D
canvas via hand-rolled perspective projection — **no WebGL, no Three.js, no
network** — so it runs anywhere offline.

### The data model

Everything lives in [`assets/js/data.js`](assets/js/data.js) as plain,
human-editable data. The core record is a **person**:

```js
{
  id: "musa",
  name: "Musa",
  title: "The One Who Spoke with God (Moses)",
  named: true,                 // named in the Quran? (false => "unnamed")
  era: "Exodus",
  group: "Bani Israel & Egypt",
  names: { quran: "...", biblical: "Moses" },   // identity across traditions
  archetypes: ["prophet", "reformer"],
  sources: ["quran", "hadith", "tafsir", "biblical", "jewish"],
  lessons: ["..."],
  entries: [                    // every statement keeps its origin
    { layer: "quran", text: "...", ref: "Q 20, Q 28" }
  ],
  relations: [                  // relationships are primary
    { to: "harun", type: "sibling" },
    { to: "pharaoh", type: "opponent" }
  ]
}
```

Alongside people, the dataset defines **knowledge layers** (the sources),
**archetypes**, **relation types**, and **stories** (threads that name the people
they connect).

## ✦ Contributing to the universe

The system intentionally has **no fixed limit** on the number of people. To grow
the canvas:

1. **Add or extend a person** in `assets/js/data.js`. Keep every claim inside an
   `entries` item tagged with its knowledge `layer` and a `ref`.
2. **Connect them.** Add `relations` — a relationship only needs to be declared
   on one side; the graph de-duplicates the edge.
3. **Honour origins.** Don't merge a tafsir detail into a Quranic statement.
   Different traditions stay in different layers.
4. **Respect the unnamed.** If the Quran does not name someone, set
   `named: false` and record traditional names under `names.tradition`.
5. **Weave a story** (optional) by adding to the `stories` array.

A small integrity check runs over the data:

```bash
node -e "global.window={};require('./assets/js/data.js');
  const D=window.PQ_DATA, ids=new Set(D.people.map(p=>p.id)); let n=0;
  D.people.forEach(p=>(p.relations||[]).forEach(r=>{if(!ids.has(r.to)){console.log('missing',p.id,'->',r.to);n++;}}));
  console.log(D.people.length+' people, '+n+' broken links');"
```

## ✦ Status & roadmap

The dataset currently holds **110 people** — prophets, kings, believers,
tyrants, families, nations and tribes — across the major narrative families
(Adam, Nuh, Ibrahim, Yaqub & Yusuf, Musa & Egypt, Dawud & Sulayman, Maryam &
Isa, the other prophets and sages), the nations and tribes, the Prophet's
household and Companions, and many unnamed-but-pivotal figures. Each statement
is sourced in a fixed order — **Quran → Bible → Torah → Tradition → Historical**
— and the prominent figures carry a narrative story and their key encounters.

Data lives in `assets/js/data.js` plus modular files under `assets/js/data/`
(prophets & kings, nations & tribes, companions, and a deepening patch), so the
universe can keep growing in authenticated waves.

Natural next steps:

- Deepen each person with more sourced entries and academic references.
- Add **place**, **event**, and **theme** nodes as first-class members of the graph.
- Add timeline and "paths between two people" views.
- Move the dataset to per-person files and add a contribution review flow.

---

*The goal is to create the most comprehensive and interconnected exploration of
the human stories surrounding the Quran ever assembled — a living map of
humanity through the lens of divine revelation.*
