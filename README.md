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

- **Fly through a 3D universe** — people float as glowing seals in a star-field,
  drawn together into family constellations by a 3-dimensional force simulation.
  Drag to orbit, scroll to zoom, click a seal to explore. A one-click toggle
  drops back to a flat 2D canvas whenever you want it.
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
# Just open the file
open index.html            # macOS    (or: xdg-open index.html on Linux)

# …or serve it (nicer for some browsers)
python3 -m http.server 8000   # then visit http://localhost:8000
```

## ✦ How it is built

A deliberately simple, **zero-dependency static app** so the knowledge — not the
tooling — is the focus, and so it runs anywhere offline.

```
index.html               Page shell and layout
assets/css/styles.css    Parchment-on-night manuscript styling
assets/js/data.js        The dataset (people, relationships, sources, stories)
assets/js/depictions.js  Aniconic visual identity — the geometric seal generator
assets/js/graph3d.js     The 3D universe — orbit camera + perspective projection
assets/js/graph.js       The flat 2D canvas — a force-directed graph engine
assets/js/app.js         UI: search, filters, people index, detail drawer, depiction
```

Both graph engines expose the same small interface (`setData`, `center`,
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

This is a **foundational seed** of the vision. The dataset currently spans the
major narrative families — Adam, Nuh, Ibrahim, Yaqub & Yusuf, Musa & Egypt,
Dawud & Sulayman, Maryam & Isa, the other prophets and sages, and the Meccan
mission — including many unnamed figures.

Natural next steps:

- Deepen each person with more sourced entries and academic references.
- Add **place**, **event**, and **theme** nodes as first-class members of the graph.
- Add timeline and "paths between two people" views.
- Move the dataset to per-person files and add a contribution review flow.

---

*The goal is to create the most comprehensive and interconnected exploration of
the human stories surrounding the Quran ever assembled — a living map of
humanity through the lens of divine revelation.*
