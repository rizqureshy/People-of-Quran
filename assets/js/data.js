/*
 * People of the Quran — Knowledge Graph Dataset
 * ------------------------------------------------------------------
 * This file is the living seed of the project. It is intentionally
 * human-editable: every person, relationship, and statement is plain
 * data so contributors can extend the universe without touching code.
 *
 * Design principles (from the project vision):
 *   - Focus on PEOPLE and IDENTITIES, not only names. Unnamed but
 *     pivotal individuals are first-class citizens here.
 *   - Every statement RETAINS ITS ORIGIN via a knowledge layer.
 *   - Relationships are primary. People connect into story networks.
 *
 * The data is attached to `window.PQ_DATA` so the app works from a
 * plain file:// open with no build step and no network access.
 */

(function () {
  "use strict";

  /* ----------------------------------------------------------------
   * Knowledge layers — where a piece of information originates.
   * Order roughly reflects proximity to the Quranic text.
   * ---------------------------------------------------------------- */
  const layers = [
    { id: "quran", label: "Quran", short: "Q", color: "#1f9d76",
      desc: "Stated or directly referenced in the Quranic text." },
    { id: "hadith", label: "Hadith", short: "H", color: "#3a7ca5",
      desc: "Reported in the recorded traditions of the Prophet Muhammad." },
    { id: "tafsir", label: "Classical Tafsir", short: "T", color: "#9b5de5",
      desc: "Drawn from classical Quranic exegesis (e.g. al-Tabari, Ibn Kathir)." },
    { id: "biblical", label: "Biblical Tradition", short: "B", color: "#c77dff",
      desc: "Parallel narratives in the Hebrew Bible and the Gospels." },
    { id: "jewish", label: "Jewish Tradition", short: "J", color: "#e07a5f",
      desc: "Midrashic and rabbinic traditions connected to shared narratives." },
    { id: "historical", label: "Historical Scholarship", short: "Hi", color: "#c69121",
      desc: "Historical and biographical scholarship (sira, history)." },
    { id: "academic", label: "Academic Research", short: "A", color: "#6c757d",
      desc: "Modern academic and comparative-religion research." }
  ];

  /* ----------------------------------------------------------------
   * Archetypes — recurring human patterns across revelation.
   * ---------------------------------------------------------------- */
  const archetypes = [
    { id: "prophet", label: "Prophets", icon: "✦",
      desc: "Those sent to call their people back to God." },
    { id: "truth-seeker", label: "Truth Seekers", icon: "❂",
      desc: "Those who question, search, and arrive at conviction." },
    { id: "tyrant", label: "Tyrants", icon: "⚔",
      desc: "Rulers who oppress and set themselves against the divine." },
    { id: "reformer", label: "Reformers", icon: "↻",
      desc: "Those who confront corruption and call for renewal." },
    { id: "believing-woman", label: "Believing Women", icon: "✿",
      desc: "Women whose faith and resolve anchor the narratives." },
    { id: "skeptic", label: "Skeptics", icon: "?",
      desc: "Those who doubt, test, or demand proof." },
    { id: "advisor", label: "Advisors", icon: "☋",
      desc: "Counsellors whose words steer events." },
    { id: "hypocrite", label: "Hypocrites", icon: "❍",
      desc: "Those who profess belief while concealing rejection." },
    { id: "martyr", label: "Martyrs", icon: "✜",
      desc: "Those who suffer or die for their faith." },
    { id: "repentant", label: "Repentant Sinners", icon: "⟲",
      desc: "Those who turn back after error." },
    { id: "arrogant-elite", label: "Arrogant Elites", icon: "♛",
      desc: "The privileged who reject guidance out of pride." },
    { id: "oppressed", label: "Oppressed Communities", icon: "⛓",
      desc: "Peoples held under bondage or persecution." },
    { id: "faithful-companion", label: "Faithful Companions", icon: "❤",
      desc: "Loyal supporters who stand beside the called." }
  ];

  /* Relationship types and how they read in the UI. */
  const relationTypes = {
    parent: "parent of", child: "child of", spouse: "spouse of",
    sibling: "sibling of", ancestor: "ancestor of", descendant: "descendant of",
    teacher: "teacher of", student: "student of", advisor: "advisor to",
    opponent: "opponent of", ally: "ally of", companion: "companion of",
    ruler: "ruler over", servant: "servant of", kin: "kin of",
    contemporary: "contemporary of", successor: "successor of"
  };

  /*
   * Helper to keep person records compact and readable.
   * b(layer, text, ref) -> a sourced statement ("knowledge entry").
   */
  function b(layer, text, ref) { return { layer: layer, text: text, ref: ref || "" }; }
  function r(to, type, note) { return { to: to, type: type, note: note || "" }; }

  /* ----------------------------------------------------------------
   * People — the core of the universe.
   * ---------------------------------------------------------------- */
  const people = [
    /* ===================== ADAM'S FAMILY ===================== */
    {
      id: "adam", name: "Adam", title: "The First Human",
      named: true, era: "Beginnings", group: "Adam's Family",
      names: { quran: "آدَم (Ādam)", biblical: "Adam" },
      archetypes: ["prophet", "repentant"],
      lessons: ["The first sin met the first repentance.",
                "Knowledge of the names elevated humanity above the angels."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Created by God, taught the names of all things, and honoured by the prostration of the angels. After eating from the tree he repented and was forgiven.", "Q 2:30–37"),
        b("biblical", "Formed from the dust of the ground; given dominion over the garden.", "Genesis 2"),
        b("hadith", "Described as created tall, and as the father from whom all humanity descends.", "Sahih al-Bukhari")
      ],
      relations: [ r("hawwa", "spouse"), r("habil", "parent"), r("qabil", "parent"), r("iblis", "opponent") ]
    },
    {
      id: "hawwa", name: "Hawwa", title: "The First Woman (Eve)",
      named: false, era: "Beginnings", group: "Adam's Family",
      names: { quran: "(unnamed — 'his mate')", tradition: "حواء (Ḥawwāʾ)", biblical: "Eve" },
      archetypes: ["believing-woman", "repentant"],
      lessons: ["Named only in tradition, yet inseparable from the first human story."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Referred to as Adam's mate, created so he might dwell with her in tranquillity. The Quran does not name her.", "Q 4:1, Q 7:189"),
        b("tafsir", "Classical exegetes record the name Hawwa and discuss her creation.", "al-Tabari"),
        b("biblical", "Named Eve, 'the mother of all living'.", "Genesis 3:20")
      ],
      relations: [ r("adam", "spouse"), r("habil", "parent"), r("qabil", "parent") ]
    },
    {
      id: "habil", name: "Habil", title: "The Accepted Offering (Abel)",
      named: false, era: "Beginnings", group: "Adam's Family",
      names: { quran: "(unnamed — 'one of the two sons of Adam')", tradition: "هابيل (Hābīl)", biblical: "Abel" },
      archetypes: ["martyr", "truth-seeker"],
      lessons: ["He chose restraint over violence even when threatened.",
                "The first death was a murder born of envy."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "One of two sons of Adam whose offering was accepted. He refused to raise his hand against his brother, saying he feared God.", "Q 5:27–31"),
        b("biblical", "Abel, a keeper of sheep, whose offering God favoured.", "Genesis 4")
      ],
      relations: [ r("adam", "child"), r("hawwa", "child"), r("qabil", "sibling") ]
    },
    {
      id: "qabil", name: "Qabil", title: "The First Murderer (Cain)",
      named: false, era: "Beginnings", group: "Adam's Family",
      names: { quran: "(unnamed — 'one of the two sons of Adam')", tradition: "قابيل (Qābīl)", biblical: "Cain" },
      archetypes: ["tyrant", "repentant"],
      lessons: ["Envy unchecked becomes the first murder.",
                "He learned to bury his brother from a crow."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "His offering was not accepted; in envy he killed his brother and became one of the regretful.", "Q 5:27–31"),
        b("biblical", "Cain, a tiller of the ground, marked and exiled after the murder.", "Genesis 4")
      ],
      relations: [ r("adam", "child"), r("hawwa", "child"), r("habil", "sibling") ]
    },
    {
      id: "iblis", name: "Iblis", title: "The Refuser (Satan)",
      named: true, era: "Beginnings", group: "Adam's Family",
      names: { quran: "إِبْلِيس (Iblīs) / الشَّيْطَان (al-Shayṭān)", biblical: "Satan" },
      archetypes: ["arrogant-elite"],
      lessons: ["Pride — 'I am better than him' — was the first rebellion.",
                "Knowledge without humility leads to ruin."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "A jinn who refused to prostrate to Adam out of pride, was cast out, and vowed to mislead humanity.", "Q 7:11–18, Q 18:50"),
        b("tafsir", "Exegetes debate his origin among the angels versus the jinn.", "Ibn Kathir")
      ],
      relations: [ r("adam", "opponent") ]
    },

    /* ===================== NUH ===================== */
    {
      id: "nuh", name: "Nuh", title: "The Prophet of the Flood (Noah)",
      named: true, era: "Early Prophets", group: "Nuh's People",
      names: { quran: "نُوح (Nūḥ)", biblical: "Noah" },
      archetypes: ["prophet", "reformer"],
      lessons: ["He preached for centuries with few who believed.",
                "Lineage cannot save where faith is absent — even a prophet's son drowned."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Called his people for 950 years; built the ark by revelation; saved the believers from the flood.", "Q 71, Q 11:25–48"),
        b("biblical", "Builds the ark and survives the flood with his family and the animals.", "Genesis 6–9")
      ],
      relations: [ r("nuh-wife", "spouse"), r("nuh-son", "parent"), r("adam", "descendant") ]
    },
    {
      id: "nuh-wife", name: "Wife of Nuh", title: "The Betraying Spouse",
      named: false, era: "Early Prophets", group: "Nuh's People",
      names: { quran: "(unnamed)" },
      archetypes: ["hypocrite"],
      lessons: ["Marriage to a prophet did not shield her from her own choices.",
                "Set in the Quran as a parable for those who disbelieve."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Cited, with the wife of Lut, as an example of a believer's spouse who betrayed him and so gained nothing.", "Q 66:10")
      ],
      relations: [ r("nuh", "spouse") ]
    },
    {
      id: "nuh-son", name: "Son of Nuh", title: "The One Who Drowned",
      named: false, era: "Early Prophets", group: "Nuh's People",
      names: { quran: "(unnamed)", tradition: "كنعان (Canaan) / يام (Yam)" },
      archetypes: ["skeptic"],
      lessons: ["'I will take refuge on a mountain' — refuge from God is no refuge."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Refused to board the ark, trusting a mountain to save him from the flood, and was among the drowned.", "Q 11:42–47"),
        b("tafsir", "Named Canaan or Yam in exegetical tradition.", "al-Tabari")
      ],
      relations: [ r("nuh", "child") ]
    },

    /* ===================== IBRAHIM'S FAMILY ===================== */
    {
      id: "ibrahim", name: "Ibrahim", title: "The Friend of God (Abraham)",
      named: true, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "إِبْرَاهِيم (Ibrāhīm)", biblical: "Abraham", title: "Khalīl Allāh" },
      archetypes: ["prophet", "truth-seeker", "reformer"],
      lessons: ["He reasoned his way from the stars to the One who set them.",
                "He was ready to surrender even his son, and was ransomed.",
                "A father of nations through two sons, two peoples."],
      sources: ["quran", "hadith", "tafsir", "biblical", "jewish"],
      entries: [
        b("quran", "Broke his people's idols, debated the tyrant-king, was cast into a fire made cool, and built the Kaaba with Ismail.", "Q 21:51–70, Q 2:124–129"),
        b("biblical", "Called from Ur; promised descendants as numerous as the stars.", "Genesis 12–22"),
        b("jewish", "Midrash elaborates his childhood smashing of his father's idols.", "Genesis Rabbah")
      ],
      relations: [
        r("azar", "child"), r("hajar", "spouse"), r("sarah", "spouse"),
        r("ismail", "parent"), r("ishaq", "parent"), r("lut", "kin", "nephew"),
        r("nimrod", "opponent"), r("muhammad", "ancestor"), r("nuh", "descendant")
      ]
    },
    {
      id: "azar", name: "Azar", title: "The Idol-Maker Father",
      named: true, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "آزَر (Āzar)", biblical: "Terah" },
      archetypes: ["arrogant-elite"],
      lessons: ["Even a prophet could not guide his own father to faith."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Ibrahim's father, an idolater whom Ibrahim gently invited to abandon idols, promising to pray for him.", "Q 6:74, Q 19:41–48"),
        b("biblical", "Named Terah, father of Abram.", "Genesis 11")
      ],
      relations: [ r("ibrahim", "parent") ]
    },
    {
      id: "nimrod", name: "The King Who Argued", title: "Nimrod (tradition)",
      named: false, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "(unnamed — 'the one who argued')", tradition: "نمرود (Namrūd)" },
      archetypes: ["tyrant", "arrogant-elite"],
      lessons: ["'I give life and cause death' — tyranny silenced by the rising sun."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "The king who disputed with Ibrahim about his Lord, claiming power over life and death, and was confounded.", "Q 2:258"),
        b("tafsir", "Identified as Nimrod by classical commentators.", "Ibn Kathir")
      ],
      relations: [ r("ibrahim", "opponent") ]
    },
    {
      id: "hajar", name: "Hajar", title: "Mother of Ismail (Hagar)",
      named: false, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "(unnamed)", tradition: "هاجر (Hājar)", biblical: "Hagar" },
      archetypes: ["believing-woman", "faithful-companion"],
      lessons: ["Her run between Safa and Marwa is retraced by pilgrims forever.",
                "Trust in God in a barren valley became a wellspring — Zamzam."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Not named, but central to the rite of Sa'i and the settling of Mecca, alluded to in Ibrahim's prayer over the valley.", "Q 14:37"),
        b("hadith", "Her search for water for the infant Ismail is the origin of the Sa'i and the well of Zamzam.", "Sahih al-Bukhari"),
        b("biblical", "Hagar, the Egyptian servant, mother of Ishmael.", "Genesis 16, 21")
      ],
      relations: [ r("ibrahim", "spouse"), r("ismail", "parent"), r("sarah", "contemporary") ]
    },
    {
      id: "sarah", name: "Sarah", title: "Mother of Ishaq",
      named: false, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "(unnamed — 'his wife')", tradition: "سارة (Sārah)", biblical: "Sarah" },
      archetypes: ["believing-woman"],
      lessons: ["She laughed in disbelief, then bore a prophet in old age."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Present when angels announce the birth of Ishaq; she laughs and wonders at bearing a child in old age.", "Q 11:71–73"),
        b("biblical", "Sarah, wife of Abraham, mother of Isaac.", "Genesis 17–21")
      ],
      relations: [ r("ibrahim", "spouse"), r("ishaq", "parent"), r("hajar", "contemporary") ]
    },
    {
      id: "ismail", name: "Ismail", title: "The Patient Son (Ishmael)",
      named: true, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "إِسْمَاعِيل (Ismāʿīl)", biblical: "Ishmael" },
      archetypes: ["prophet", "faithful-companion"],
      lessons: ["'Do as you are commanded; you will find me patient.'",
                "Forefather, through his line, of the Prophet Muhammad."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Submitted to the trial of sacrifice; helped Ibrahim raise the foundations of the Kaaba; described as truthful and a prophet.", "Q 37:101–107, Q 2:127, Q 19:54"),
        b("biblical", "Ishmael, firstborn of Abraham, father of twelve princes.", "Genesis 17, 25")
      ],
      relations: [ r("ibrahim", "child"), r("hajar", "child"), r("ishaq", "sibling"), r("muhammad", "ancestor") ]
    },
    {
      id: "ishaq", name: "Ishaq", title: "The Promised Son (Isaac)",
      named: true, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "إِسْحَاق (Isḥāq)", biblical: "Isaac" },
      archetypes: ["prophet"],
      lessons: ["Glad tidings of him came with the promise of Yaqub beyond him."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Announced to Ibrahim and Sarah as a gift, a prophet among the righteous, grandfather of the tribes of Israel.", "Q 11:71, Q 37:112–113"),
        b("biblical", "Isaac, son of the promise, father of Jacob and Esau.", "Genesis 21–28")
      ],
      relations: [ r("ibrahim", "child"), r("sarah", "child"), r("ismail", "sibling"), r("yaqub", "parent") ]
    },
    {
      id: "lut", name: "Lut", title: "The Prophet of the Cities (Lot)",
      named: true, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "لُوط (Lūṭ)", biblical: "Lot" },
      archetypes: ["prophet", "reformer"],
      lessons: ["He stood almost alone against his city's corruption."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Sent to a people who committed open indecency; saved with the believers while the cities were overturned.", "Q 7:80–84, Q 11:77–83"),
        b("biblical", "Lot, nephew of Abraham, rescued from Sodom.", "Genesis 19")
      ],
      relations: [ r("ibrahim", "kin", "uncle"), r("lut-wife", "spouse") ]
    },
    {
      id: "lut-wife", name: "Wife of Lut", title: "The One Who Looked Back",
      named: false, era: "Patriarchs", group: "Ibrahim's Family",
      names: { quran: "(unnamed)" },
      archetypes: ["hypocrite"],
      lessons: ["She belonged to the city more than to the prophet she lived beside."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Counted among those who stayed behind and perished; a parable of a betraying spouse.", "Q 66:10, Q 7:83"),
        b("biblical", "Turns into a pillar of salt for looking back.", "Genesis 19:26")
      ],
      relations: [ r("lut", "spouse") ]
    },

    /* ===================== YAQUB & YUSUF ===================== */
    {
      id: "yaqub", name: "Yaqub", title: "Israel, the Patient Father (Jacob)",
      named: true, era: "Patriarchs", group: "House of Yaqub",
      names: { quran: "يَعْقُوب (Yaʿqūb)", biblical: "Jacob / Israel" },
      archetypes: ["prophet", "faithful-companion"],
      lessons: ["'Beautiful patience' through the loss of a beloved son.",
                "His twelve sons became the tribes of Israel."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Father of Yusuf; wept until blind from grief, then regained sight; reunited with his son in Egypt.", "Q 12:18, 12:84–96"),
        b("biblical", "Jacob, renamed Israel, father of the twelve tribes.", "Genesis 25–49")
      ],
      relations: [ r("ishaq", "child"), r("yusuf", "parent"), r("binyamin", "parent"), r("yusuf-brothers", "parent"), r("ibrahim", "descendant") ]
    },
    {
      id: "yusuf", name: "Yusuf", title: "The Trusted Interpreter (Joseph)",
      named: true, era: "Patriarchs", group: "House of Yaqub",
      names: { quran: "يُوسُف (Yūsuf)", biblical: "Joseph" },
      archetypes: ["prophet", "truth-seeker", "repentant"],
      lessons: ["Betrayed, enslaved, imprisoned — and raised to govern Egypt.",
                "'No blame upon you today' — power used for mercy, not revenge."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "His story is 'the most beautiful of narratives' — the dream, the well, the temptation, the prison, and the rise to authority.", "Q 12 (entire surah)"),
        b("biblical", "Joseph and his coat, sold into Egypt, rising to vizier under Pharaoh.", "Genesis 37–50")
      ],
      relations: [ r("yaqub", "child"), r("binyamin", "sibling"), r("yusuf-brothers", "sibling"), r("aziz", "servant"), r("zulaikha", "opponent") ]
    },
    {
      id: "binyamin", name: "Binyamin", title: "The Youngest Brother (Benjamin)",
      named: false, era: "Patriarchs", group: "House of Yaqub",
      names: { quran: "(unnamed — 'his brother')", tradition: "بنيامين (Binyāmīn)", biblical: "Benjamin" },
      archetypes: ["faithful-companion"],
      lessons: ["The full brother kept close while the cup was hidden in his pack."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Yusuf's younger brother, kept in Egypt through the device of the king's cup.", "Q 12:69–79"),
        b("biblical", "Benjamin, Jacob's youngest son.", "Genesis 42–45")
      ],
      relations: [ r("yaqub", "child"), r("yusuf", "sibling") ]
    },
    {
      id: "yusuf-brothers", name: "Brothers of Yusuf", title: "The Ten Who Envied",
      named: false, era: "Patriarchs", group: "House of Yaqub",
      names: { quran: "(unnamed)" },
      archetypes: ["repentant"],
      lessons: ["Envy cast a brother into a well; remorse brought them back to ask forgiveness."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Plotted against Yusuf out of jealousy, then later confessed their wrong and were forgiven.", "Q 12:8–18, 12:91–92")
      ],
      relations: [ r("yaqub", "child"), r("yusuf", "sibling") ]
    },
    {
      id: "aziz", name: "Al-Aziz", title: "The Minister of Egypt (Potiphar)",
      named: false, era: "Patriarchs", group: "House of Yaqub",
      names: { quran: "الْعَزِيز (al-ʿAzīz)", biblical: "Potiphar" },
      archetypes: ["advisor"],
      lessons: ["'Make his stay honourable' — he sensed Yusuf's worth from the first."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "The Egyptian who bought Yusuf and raised him in his house; titled al-Aziz (the minister).", "Q 12:21, 12:30")
      ],
      relations: [ r("yusuf", "ruler"), r("zulaikha", "spouse") ]
    },
    {
      id: "zulaikha", name: "Wife of al-Aziz", title: "Zulaikha (tradition)",
      named: false, era: "Patriarchs", group: "House of Yaqub",
      names: { quran: "(unnamed)", tradition: "زليخا (Zulaykhā)" },
      archetypes: ["repentant"],
      lessons: ["'Now the truth is evident' — a public confession after a private wrong."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Attempted to seduce Yusuf, then admitted her fault before the women of the city.", "Q 12:23–32, 12:51"),
        b("tafsir", "Named Zulaikha in later tradition and poetry.", "Qisas al-Anbiya")
      ],
      relations: [ r("aziz", "spouse"), r("yusuf", "opponent") ]
    },

    /* ===================== MUSA NARRATIVE ===================== */
    {
      id: "musa", name: "Musa", title: "The One Who Spoke with God (Moses)",
      named: true, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "مُوسَىٰ (Mūsā)", biblical: "Moses", title: "Kalīm Allāh" },
      archetypes: ["prophet", "reformer", "faithful-companion"],
      lessons: ["From a basket on the Nile to the court of Pharaoh.",
                "He asked for his brother's help — leadership shared is leadership strengthened."],
      sources: ["quran", "hadith", "tafsir", "biblical", "jewish"],
      entries: [
        b("quran", "Raised in Pharaoh's house, called at the burning bush, sent with signs to free Bani Israel, and given the Torah.", "Q 20, Q 28, Q 7:103–137"),
        b("biblical", "Moses leads the Exodus and receives the Law at Sinai.", "Exodus"),
        b("jewish", "Extensive midrash on his birth, naming, and prophethood.", "Midrash")
      ],
      relations: [
        r("harun", "sibling"), r("musa-mother", "child"), r("musa-sister", "sibling"),
        r("pharaoh", "opponent"), r("asiya", "kin", "raised by"), r("khidr", "student"),
        r("shuayb", "kin", "son-in-law"), r("bani-israel", "ruler"), r("qarun", "opponent")
      ]
    },
    {
      id: "harun", name: "Harun", title: "The Eloquent Brother (Aaron)",
      named: true, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "هَارُون (Hārūn)", biblical: "Aaron" },
      archetypes: ["prophet", "faithful-companion", "advisor"],
      lessons: ["Given as a helper because his speech was clearer.",
                "He held the people as gently as he could while Musa was away."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Appointed as Musa's minister and fellow prophet; left in charge of Bani Israel during the affair of the golden calf.", "Q 20:29–36, Q 7:142, Q 20:90–94"),
        b("biblical", "Aaron, the first high priest, brother and spokesman of Moses.", "Exodus 4, 28")
      ],
      relations: [ r("musa", "sibling"), r("samiri", "opponent"), r("bani-israel", "ruler") ]
    },
    {
      id: "musa-mother", name: "Mother of Musa", title: "The Trusting Mother",
      named: false, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "(unnamed)", tradition: "يوكابد (Yukabid)" },
      archetypes: ["believing-woman"],
      lessons: ["Inspired to place her child on the river — and he was returned to her."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Inspired to nurse her infant and cast him into the river when she feared for him; God returned him to her so 'her eye might be comforted.'", "Q 28:7–13, Q 20:38–40")
      ],
      relations: [ r("musa", "parent"), r("harun", "parent"), r("musa-sister", "parent") ]
    },
    {
      id: "musa-sister", name: "Sister of Musa", title: "The Watchful Sister",
      named: false, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "(unnamed)", tradition: "مريم (Maryam, sister of Aaron)", biblical: "Miriam" },
      archetypes: ["believing-woman", "faithful-companion"],
      lessons: ["She followed the basket from the bank and reunited mother and child."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Followed Musa along the river and cleverly arranged for his own mother to nurse him.", "Q 28:11–12"),
        b("biblical", "Miriam, sister of Moses, a prophetess.", "Exodus 2, 15")
      ],
      relations: [ r("musa", "sibling"), r("musa-mother", "child") ]
    },
    {
      id: "pharaoh", name: "Pharaoh", title: "The Tyrant of Egypt (Firaun)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "فِرْعَوْن (Firʿawn) — a title, not a name", biblical: "Pharaoh" },
      archetypes: ["tyrant", "arrogant-elite"],
      lessons: ["'I am your lord, most high' — the height of human arrogance.",
                "Faith offered at the moment of drowning came too late."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Claimed divinity, enslaved Bani Israel, ordered the killing of their sons, and drowned in the sea pursuing them.", "Q 79:24, Q 28:4, Q 10:90–92"),
        b("biblical", "The unnamed Pharaoh of the Exodus who hardened his heart.", "Exodus 5–14")
      ],
      relations: [ r("musa", "opponent"), r("haman", "advisor"), r("asiya", "spouse"), r("qarun", "ally"), r("bani-israel", "opponent") ]
    },
    {
      id: "haman", name: "Haman", title: "The Tyrant's Minister",
      named: true, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "هَامَان (Hāmān)" },
      archetypes: ["advisor", "arrogant-elite"],
      lessons: ["Power put at the service of a tyrant magnifies oppression."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Pharaoh's chief minister, ordered to build a lofty tower to 'reach the God of Musa' in mockery.", "Q 28:38, Q 40:36–37")
      ],
      relations: [ r("pharaoh", "advisor"), r("musa", "opponent") ]
    },
    {
      id: "asiya", name: "Asiya", title: "The Believing Queen",
      named: false, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "(unnamed — 'the wife of Pharaoh')", tradition: "آسية (Āsiya)" },
      archetypes: ["believing-woman", "martyr"],
      lessons: ["She believed in the house of the tyrant himself.",
                "Her prayer: 'My Lord, build for me a house with You in the Garden.'"],
      sources: ["quran", "hadith", "tafsir"],
      entries: [
        b("quran", "Set forth as an example for the believers; she prayed for a home with God while in Pharaoh's palace.", "Q 66:11"),
        b("hadith", "Named among the greatest women of all time alongside Maryam.", "Sahih al-Bukhari")
      ],
      relations: [ r("pharaoh", "spouse"), r("musa", "kin", "raised him") ]
    },
    {
      id: "qarun", name: "Qarun", title: "The Hoarder of Treasure (Korah)",
      named: true, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "قَارُون (Qārūn)", biblical: "Korah" },
      archetypes: ["arrogant-elite"],
      lessons: ["'I was given it because of knowledge I have' — and the earth swallowed him and his wealth."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "A man of Musa's people given immense treasure, who grew arrogant and was swallowed by the earth.", "Q 28:76–82"),
        b("biblical", "Korah, who rebelled against Moses and was swallowed by the ground.", "Numbers 16")
      ],
      relations: [ r("musa", "opponent"), r("bani-israel", "kin") ]
    },
    {
      id: "samiri", name: "Al-Samiri", title: "The Maker of the Calf",
      named: true, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "السَّامِرِيّ (al-Sāmirī)" },
      archetypes: ["hypocrite"],
      lessons: ["He fashioned a golden calf and led a freed people back to idols."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Cast ornaments into the shape of a calf that lowed, leading Bani Israel astray in Musa's absence; condemned to isolation.", "Q 20:85–97")
      ],
      relations: [ r("harun", "opponent"), r("bani-israel", "opponent") ]
    },
    {
      id: "khidr", name: "Al-Khidr", title: "The Servant Given Knowledge",
      named: false, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "(unnamed — 'a servant from among Our servants')", tradition: "الخضر (al-Khiḍr)" },
      archetypes: ["truth-seeker", "advisor"],
      lessons: ["Hidden wisdom behind unsettling acts — appearances deceive.",
                "Even Musa was sent to learn what he did not know."],
      sources: ["quran", "hadith", "tafsir"],
      entries: [
        b("quran", "A servant of God granted special knowledge, who taught Musa through three perplexing acts.", "Q 18:65–82"),
        b("hadith", "Named al-Khidr in the prophetic tradition recounting the meeting.", "Sahih al-Bukhari")
      ],
      relations: [ r("musa", "teacher") ]
    },
    {
      id: "shuayb", name: "Shu'ayb", title: "The Prophet of Madyan (Jethro)",
      named: true, era: "Exodus", group: "Bani Israel & Egypt",
      names: { quran: "شُعَيْب (Shuʿayb)", biblical: "Jethro (traditionally)" },
      archetypes: ["prophet", "reformer"],
      lessons: ["He called his people to honest scales and fair trade."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Sent to the people of Madyan to forbid cheating in weights and measures; traditionally the man who sheltered Musa and gave a daughter in marriage.", "Q 7:85–93, Q 28:23–28")
      ],
      relations: [ r("musa", "kin", "father-in-law") ]
    },
    {
      id: "bani-israel", name: "Bani Israel", title: "The Children of Israel",
      named: true, era: "Exodus", group: "Bani Israel & Egypt", isCommunity: true,
      names: { quran: "بَنُو إِسْرَائِيل (Banū Isrāʾīl)" },
      archetypes: ["oppressed", "skeptic"],
      lessons: ["Freed from bondage, yet quick to forget the sea that parted for them.",
                "A community carried through both deliverance and trial."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "The descendants of Yaqub: enslaved in Egypt, delivered through the sea, given the Torah, and repeatedly tested in faith.", "Q 2:40–103, Q 5:20–26")
      ],
      relations: [ r("musa", "servant"), r("yaqub", "descendant"), r("pharaoh", "opponent") ]
    },

    /* ===================== DAWUD & SULAYMAN ===================== */
    {
      id: "dawud", name: "Dawud", title: "The Singing King (David)",
      named: true, era: "Kingdom", group: "House of David",
      names: { quran: "دَاوُد (Dāwūd)", biblical: "David" },
      archetypes: ["prophet", "reformer"],
      lessons: ["The mountains and birds joined his praise.",
                "A shepherd who felled a giant and judged with wisdom."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Given the Zabur (Psalms), taught the working of iron, made a just ruler; slew Jalut as a youth.", "Q 21:78–80, Q 34:10–11, Q 2:251"),
        b("biblical", "David, shepherd-king, psalmist, who defeated Goliath.", "1 Samuel 16–17")
      ],
      relations: [ r("sulayman", "parent"), r("jalut", "opponent"), r("talut", "ally") ]
    },
    {
      id: "sulayman", name: "Sulayman", title: "The King Who Spoke to Birds (Solomon)",
      named: true, era: "Kingdom", group: "House of David",
      names: { quran: "سُلَيْمَان (Sulaymān)", biblical: "Solomon" },
      archetypes: ["prophet", "reformer"],
      lessons: ["Given a kingdom like no other, he prized gratitude over grandeur.",
                "He understood the speech of the ant and the hoopoe."],
      sources: ["quran", "tafsir", "biblical"],
      entries: [
        b("quran", "Granted command over wind, jinn, and the language of birds and beasts; corresponded with the Queen of Sheba.", "Q 27:15–44, Q 38:30–40"),
        b("biblical", "Solomon, the wise king, builder of the Temple.", "1 Kings 3–11")
      ],
      relations: [ r("dawud", "child"), r("bilqis", "contemporary") ]
    },
    {
      id: "bilqis", name: "Queen of Sheba", title: "Bilqis (tradition)",
      named: false, era: "Kingdom", group: "House of David",
      names: { quran: "(unnamed — 'a woman ruling over them')", tradition: "بلقيس (Bilqīs)" },
      archetypes: ["truth-seeker", "believing-woman", "advisor"],
      lessons: ["A wise ruler who tested with gifts before she trusted.",
                "She submitted 'with Sulayman to the Lord of the worlds.'"],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Queen of a sun-worshipping people; consulted her counsel, tested Sulayman, then embraced his faith.", "Q 27:22–44"),
        b("tafsir", "Named Bilqis in classical commentary and legend.", "Qisas al-Anbiya")
      ],
      relations: [ r("sulayman", "contemporary") ]
    },
    {
      id: "jalut", name: "Jalut", title: "The Giant (Goliath)",
      named: true, era: "Kingdom", group: "House of David",
      names: { quran: "جَالُوت (Jālūt)", biblical: "Goliath" },
      archetypes: ["tyrant"],
      lessons: ["The mighty fell to a shepherd's stone and God's leave."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "The formidable warrior slain by the young Dawud, turning the battle for Talut's army.", "Q 2:249–251"),
        b("biblical", "Goliath of Gath, the Philistine champion.", "1 Samuel 17")
      ],
      relations: [ r("dawud", "opponent"), r("talut", "opponent") ]
    },
    {
      id: "talut", name: "Talut", title: "The Appointed King (Saul)",
      named: true, era: "Kingdom", group: "House of David",
      names: { quran: "طَالُوت (Ṭālūt)", biblical: "Saul" },
      archetypes: ["reformer"],
      lessons: ["Chosen for knowledge and strength, not wealth.",
                "The river was a test — most drank, few held back."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "Appointed king over Bani Israel; tested his army at the river before the battle with Jalut.", "Q 2:246–251"),
        b("biblical", "Saul, the first king of Israel.", "1 Samuel 9–10")
      ],
      relations: [ r("dawud", "ally"), r("jalut", "opponent") ]
    },

    /* ===================== MARYAM & ISA ===================== */
    {
      id: "imran", name: "Imran", title: "Father of Maryam",
      named: true, era: "Gospel", group: "House of Imran",
      names: { quran: "عِمْرَان (ʿImrān)", biblical: "(Joachim, tradition)" },
      archetypes: ["faithful-companion"],
      lessons: ["His house was chosen above the worlds."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "The family of Imran is named and honoured; a whole surah bears their name (Aal Imran).", "Q 3:33–37")
      ],
      relations: [ r("maryam", "parent"), r("imran-wife", "spouse") ]
    },
    {
      id: "imran-wife", name: "Wife of Imran", title: "The Mother Who Vowed",
      named: false, era: "Gospel", group: "House of Imran",
      names: { quran: "(unnamed)", tradition: "حنّة (Hannah)", biblical: "Anne (tradition)" },
      archetypes: ["believing-woman"],
      lessons: ["She dedicated her unborn child to God's service before knowing it was a daughter."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Vowed the child in her womb to the service of God and named her Maryam, seeking refuge for her from Satan.", "Q 3:35–36")
      ],
      relations: [ r("maryam", "parent"), r("imran", "spouse") ]
    },
    {
      id: "maryam", name: "Maryam", title: "The Chosen Mother (Mary)",
      named: true, era: "Gospel", group: "House of Imran",
      names: { quran: "مَرْيَم (Maryam)", biblical: "Mary" },
      archetypes: ["believing-woman", "truth-seeker"],
      lessons: ["The only woman named in the Quran; a whole surah bears her name.",
                "'Chosen above the women of the worlds.'"],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Raised in devotion under Zakariyya's care; conceived Isa by God's word while remaining chaste; defended by the infant who spoke from the cradle.", "Q 3:42–47, Q 19:16–34"),
        b("biblical", "Mary, mother of Jesus, who received the annunciation.", "Luke 1")
      ],
      relations: [ r("imran", "child"), r("imran-wife", "child"), r("isa", "parent"), r("zakariyya", "student") ]
    },
    {
      id: "isa", name: "Isa", title: "The Messiah, Word of God (Jesus)",
      named: true, era: "Gospel", group: "House of Imran",
      names: { quran: "عِيسَى (ʿĪsā) — al-Masīḥ", biblical: "Jesus / Christ" },
      archetypes: ["prophet", "reformer"],
      lessons: ["He spoke from the cradle in defence of his mother.",
                "Given the Injil and clear signs, supported by the holy spirit."],
      sources: ["quran", "hadith", "tafsir", "biblical"],
      entries: [
        b("quran", "Born of Maryam by God's command; healed the blind and the leper and revived the dead by God's leave; raised by God rather than crucified.", "Q 3:45–55, Q 5:110, Q 4:157–158"),
        b("biblical", "Jesus of Nazareth, his ministry, miracles, and passion.", "The Gospels")
      ],
      relations: [ r("maryam", "child"), r("hawariyyun", "teacher"), r("yahya", "kin") ]
    },
    {
      id: "hawariyyun", name: "Al-Hawariyyun", title: "The Disciples",
      named: false, era: "Gospel", group: "House of Imran", isCommunity: true,
      names: { quran: "الْحَوَارِيُّون (al-Ḥawāriyyūn)", biblical: "The Apostles" },
      archetypes: ["faithful-companion"],
      lessons: ["'We are the helpers of God' — faith that volunteered to support a prophet."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "The faithful supporters of Isa who declared themselves helpers of God and asked for the table from heaven.", "Q 3:52–53, Q 5:111–115")
      ],
      relations: [ r("isa", "student") ]
    },
    {
      id: "zakariyya", name: "Zakariyya", title: "The Praying Guardian (Zechariah)",
      named: true, era: "Gospel", group: "House of Imran",
      names: { quran: "زَكَرِيَّا (Zakariyyā)", biblical: "Zechariah" },
      archetypes: ["prophet", "faithful-companion"],
      lessons: ["He prayed for a child in old age and was answered with Yahya."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "Guardian of Maryam; prayed secretly for an heir and was granted Yahya despite age and a barren wife.", "Q 3:37–41, Q 19:2–11"),
        b("biblical", "Zechariah, father of John the Baptist.", "Luke 1")
      ],
      relations: [ r("maryam", "teacher"), r("yahya", "parent") ]
    },
    {
      id: "yahya", name: "Yahya", title: "The Pure Prophet (John)",
      named: true, era: "Gospel", group: "House of Imran",
      names: { quran: "يَحْيَىٰ (Yaḥyā)", biblical: "John the Baptist" },
      archetypes: ["prophet", "truth-seeker"],
      lessons: ["Given wisdom while still a child; tender-hearted and pure."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "Granted to Zakariyya; described as honouring his parents, neither arrogant nor disobedient; given wisdom as a child.", "Q 19:12–15, Q 3:39"),
        b("biblical", "John the Baptist, forerunner of Jesus.", "Matthew 3, Luke 1")
      ],
      relations: [ r("zakariyya", "child"), r("isa", "kin") ]
    },

    /* ===================== OTHER PROPHETS & FIGURES ===================== */
    {
      id: "ayyub", name: "Ayyub", title: "The Patient One (Job)",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages",
      names: { quran: "أَيُّوب (Ayyūb)", biblical: "Job" },
      archetypes: ["prophet", "martyr"],
      lessons: ["He lost everything yet never lost his patience or his Lord."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "Afflicted by loss and illness, he called upon God and was restored, a model of patient endurance.", "Q 21:83–84, Q 38:41–44"),
        b("biblical", "Job, tested in all things, who held to his integrity.", "Book of Job")
      ],
      relations: []
    },
    {
      id: "yunus", name: "Yunus", title: "The Man of the Fish (Jonah)",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages",
      names: { quran: "يُونُس (Yūnus) — Dhū al-Nūn", biblical: "Jonah" },
      archetypes: ["prophet", "repentant"],
      lessons: ["From the belly of the fish: 'There is no god but You; I was among the wrongdoers.'",
                "His people believed — the one nation whose faith averted the punishment."],
      sources: ["quran", "biblical"],
      entries: [
        b("quran", "Left his people in anger, was swallowed by the great fish, prayed in the darkness, and was delivered; his city believed and was spared.", "Q 21:87–88, Q 37:139–148, Q 10:98"),
        b("biblical", "Jonah and the great fish; the repentance of Nineveh.", "Book of Jonah")
      ],
      relations: []
    },
    {
      id: "hud", name: "Hud", title: "The Prophet of Ad",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages",
      names: { quran: "هُود (Hūd)" },
      archetypes: ["prophet", "reformer"],
      lessons: ["He warned a mighty people against pride in their strength."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Sent to the people of Ad, who built lofty monuments and grew arrogant; they rejected him and were destroyed by a furious wind.", "Q 7:65–72, Q 11:50–60")
      ],
      relations: [ r("ad", "kin") ]
    },
    {
      id: "salih", name: "Salih", title: "The Prophet of the She-Camel",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages",
      names: { quran: "صَالِح (Ṣāliḥ)" },
      archetypes: ["prophet", "reformer"],
      lessons: ["A she-camel was the sign; its hamstringing sealed a people's doom."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Sent to Thamud, who carved homes in the mountains; they killed the divinely sent she-camel and were seized by a mighty blast.", "Q 7:73–79, Q 11:61–68")
      ],
      relations: [ r("thamud", "kin") ]
    },
    {
      id: "luqman", name: "Luqman", title: "The Wise",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages",
      names: { quran: "لُقْمَان (Luqmān)" },
      archetypes: ["advisor", "truth-seeker"],
      lessons: ["'Do not associate others with God — that is a great wrong.'",
                "His counsel to his son is a manual of gentle wisdom."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Granted wisdom; his tender, sustained advice to his son is preserved in the surah bearing his name.", "Q 31:12–19")
      ],
      relations: []
    },
    {
      id: "dhul-qarnayn", name: "Dhul-Qarnayn", title: "The Two-Horned Traveller",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages",
      names: { quran: "ذُو الْقَرْنَيْن (Dhū al-Qarnayn)" },
      archetypes: ["reformer", "truth-seeker"],
      lessons: ["Given power across the earth, he ruled with justice and humility.",
                "He built a barrier against Gog and Magog, crediting God alone."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "A righteous ruler who travelled to the rising and setting of the sun and built a great barrier of iron and copper.", "Q 18:83–98")
      ],
      relations: []
    },
    {
      id: "ashab-kahf", name: "Ashab al-Kahf", title: "The Companions of the Cave",
      named: false, era: "Other Prophets", group: "Other Prophets & Sages", isCommunity: true,
      names: { quran: "أَصْحَاب الْكَهْف (Aṣḥāb al-Kahf)" },
      archetypes: ["truth-seeker", "faithful-companion", "oppressed"],
      lessons: ["Young men who fled a tyrant to keep their faith.",
                "God 'sealed their ears' and they slept for centuries."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "Youths who took refuge in a cave from persecution; God caused them to sleep for many years as a sign of resurrection.", "Q 18:9–26")
      ],
      relations: []
    },
    {
      id: "ad", name: "The People of Ad", title: "The Pillared Nation",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages", isCommunity: true,
      names: { quran: "عَاد (ʿĀd)" },
      archetypes: ["arrogant-elite", "oppressed"],
      lessons: ["Strength and monuments could not shield arrogance from the wind."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "A powerful people of lofty buildings (Iram of the pillars) who rejected Hud and were destroyed.", "Q 89:6–8, Q 41:15–16")
      ],
      relations: [ r("hud", "kin") ]
    },
    {
      id: "thamud", name: "The People of Thamud", title: "The Carvers of Stone",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages", isCommunity: true,
      names: { quran: "ثَمُود (Thamūd)" },
      archetypes: ["arrogant-elite", "oppressed"],
      lessons: ["They felt secure carving palaces in mountains — until the blast came."],
      sources: ["quran", "tafsir"],
      entries: [
        b("quran", "A people who hewed homes from the mountains, rejected Salih, killed the she-camel, and were seized in a single cry.", "Q 7:73–79, Q 15:80–84")
      ],
      relations: [ r("salih", "kin") ]
    },

    /* ===================== THE FINAL MESSENGER ===================== */
    {
      id: "muhammad", name: "Muhammad", title: "The Final Messenger",
      named: true, era: "Revelation in Mecca", group: "The Meccan Mission",
      names: { quran: "مُحَمَّد (Muḥammad) — also Aḥmad" },
      archetypes: ["prophet", "reformer", "faithful-companion"],
      lessons: ["The recipient of the Quran, sent as a mercy to the worlds.",
                "Descended from Ismail, completing the arc of Ibrahim's prayer."],
      sources: ["quran", "hadith", "historical"],
      entries: [
        b("quran", "The Messenger to whom the Quran was revealed; named four times, called a mercy to the worlds and the seal of the prophets.", "Q 33:40, Q 48:29, Q 21:107"),
        b("historical", "Born in Mecca c. 570 CE; the sira records his life, mission, and the early Muslim community.", "Ibn Ishaq, Sira")
      ],
      relations: [ r("ismail", "descendant"), r("ibrahim", "descendant"), r("zayd", "teacher"), r("abu-lahab", "opponent") ]
    },
    {
      id: "zayd", name: "Zayd ibn Harithah", title: "The Beloved Companion",
      named: true, era: "Revelation in Mecca", group: "The Meccan Mission",
      names: { quran: "زَيْد (Zayd)" },
      archetypes: ["faithful-companion"],
      lessons: ["The only companion of the Prophet named in the Quran."],
      sources: ["quran", "hadith", "historical"],
      entries: [
        b("quran", "Named in connection with the dissolution of his marriage, establishing a ruling on adoption.", "Q 33:37"),
        b("historical", "A freed slave raised by the Prophet, among the earliest believers.", "Sira")
      ],
      relations: [ r("muhammad", "companion") ]
    },
    {
      id: "abu-lahab", name: "Abu Lahab", title: "The Opposing Uncle",
      named: true, era: "Revelation in Mecca", group: "The Meccan Mission",
      names: { quran: "أَبُو لَهَب (Abū Lahab) — 'father of flame'" },
      archetypes: ["arrogant-elite", "tyrant"],
      lessons: ["Kinship to the Prophet did not soften his hostility.",
                "A whole surah condemns his wealth and his works."],
      sources: ["quran", "tafsir", "historical"],
      entries: [
        b("quran", "An uncle of the Prophet whose enmity is condemned in a surah named after him; his wealth will not avail him.", "Q 111"),
        b("historical", "ʿAbd al-ʿUzza, a leader of early Meccan opposition.", "Sira")
      ],
      relations: [ r("muhammad", "opponent"), r("umm-jamil", "spouse") ]
    },
    {
      id: "umm-jamil", name: "Wife of Abu Lahab", title: "The Carrier of Firewood (Umm Jamil)",
      named: false, era: "Revelation in Mecca", group: "The Meccan Mission",
      names: { quran: "(unnamed — 'carrier of firewood')", tradition: "أم جميل (Umm Jamīl)" },
      archetypes: ["arrogant-elite"],
      lessons: ["She spread thorns in the Prophet's path; the Quran answers her in kind."],
      sources: ["quran", "tafsir", "historical"],
      entries: [
        b("quran", "Described as the 'carrier of firewood' with a rope of palm-fibre around her neck, sharing her husband's fate.", "Q 111:4–5"),
        b("historical", "Named Umm Jamil, sister of Abu Sufyan, in the biographical tradition.", "Sira")
      ],
      relations: [ r("abu-lahab", "spouse"), r("muhammad", "opponent") ]
    }
  ];

  /* ----------------------------------------------------------------
   * Stories — narrative threads that emerge from the network.
   * Each lists the people whose arcs it weaves together.
   * ---------------------------------------------------------------- */
  const stories = [
    { id: "the-first-family", title: "The First Family", era: "Beginnings",
      summary: "Creation, the honouring of humanity, the first sin and the first repentance, and the first murder among Adam's sons.",
      people: ["adam", "hawwa", "iblis", "habil", "qabil"] },
    { id: "the-flood", title: "The Ark and the Flood", era: "Early Prophets",
      summary: "Nuh's centuries of patient preaching, the ark, and the truth that faith — not lineage — is what saves.",
      people: ["nuh", "nuh-wife", "nuh-son"] },
    { id: "the-friend-of-god", title: "The Friend of God", era: "Patriarchs",
      summary: "Ibrahim's search for the One, the shattered idols, the fire made cool, and the two sons who began two peoples.",
      people: ["ibrahim", "azar", "nimrod", "hajar", "sarah", "ismail", "ishaq"] },
    { id: "cities-overturned", title: "The Cities Overturned", era: "Patriarchs",
      summary: "Lut's lonely stand against his people's corruption, and the spouse who belonged to the city.",
      people: ["lut", "lut-wife", "ibrahim"] },
    { id: "the-most-beautiful-story", title: "The Most Beautiful Story", era: "Patriarchs",
      summary: "Yusuf — the dream, the well, the temptation, the prison, and a brother's mercy turned to power.",
      people: ["yusuf", "yaqub", "binyamin", "yusuf-brothers", "aziz", "zulaikha"] },
    { id: "the-exodus", title: "The River and the Sea", era: "Exodus",
      summary: "Musa from basket to burning bush to the parting sea, against the arrogance of Pharaoh and his court.",
      people: ["musa", "harun", "musa-mother", "musa-sister", "pharaoh", "haman", "asiya", "qarun", "samiri", "bani-israel"] },
    { id: "hidden-wisdom", title: "The Servant and Hidden Wisdom", era: "Exodus",
      summary: "Even Musa was sent to learn — three baffling acts of al-Khidr that conceal a deeper justice.",
      people: ["musa", "khidr"] },
    { id: "throne-and-ant", title: "The Throne, the Ant, and the Hoopoe", era: "Kingdom",
      summary: "Sulayman's wondrous kingdom and his correspondence with the wise Queen of Sheba.",
      people: ["sulayman", "dawud", "bilqis"] },
    { id: "the-stone-and-the-giant", title: "The Stone and the Giant", era: "Kingdom",
      summary: "Talut's tested army, the youth Dawud, and the fall of Jalut.",
      people: ["talut", "dawud", "jalut"] },
    { id: "the-chosen-mother", title: "The Chosen Mother", era: "Gospel",
      summary: "Maryam's devotion, the annunciation, and the infant Isa who spoke from the cradle in her defence.",
      people: ["imran", "imran-wife", "maryam", "isa", "zakariyya", "yahya", "hawariyyun"] },
    { id: "the-meccan-mission", title: "The Meccan Mission", era: "Revelation in Mecca",
      summary: "The final Messenger, the companion named in revelation, and the kin who opposed him.",
      people: ["muhammad", "zayd", "abu-lahab", "umm-jamil"] }
  ];

  window.PQ_DATA = {
    layers: layers,
    archetypes: archetypes,
    relationTypes: relationTypes,
    people: people,
    stories: stories
  };
})();
