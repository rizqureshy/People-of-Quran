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
  // Source TIERS, in the order they should always be read:
  // Quran → Bible → Torah → Tradition → Historical.
  const layers = [
    { id: "quran", label: "Quran", short: "Q", color: "#1f9d76",
      desc: "Stated or directly referenced in the Quranic text." },
    { id: "bible", label: "Bible", short: "B", color: "#3a7ca5",
      desc: "Parallel narratives in the Christian scriptures — the Old Testament and the Gospels." },
    { id: "torah", label: "Torah & Tanakh", short: "T", color: "#c77dff",
      desc: "The Jewish scriptures — the Torah (Pentateuch) and the wider Hebrew Bible." },
    { id: "tradition", label: "Tradition", short: "Tr", color: "#e07a5f",
      desc: "Hadith, classical tafsir, midrash, isrāʼīliyyāt and church tradition." },
    { id: "historical", label: "Historical", short: "Hi", color: "#c69121",
      desc: "Historical, biographical and academic scholarship (sīra, history, comparative study)." }
  ];

  // Legacy source ids map into the five tiers above, so older entries keep
  // working and everything renders in the canonical order.
  const legacyTier = {
    quran: "quran", bible: "bible", biblical: "bible", torah: "torah",
    jewish: "torah", tanakh: "torah", hadith: "tradition", tafsir: "tradition",
    tradition: "tradition", midrash: "tradition", historical: "historical",
    academic: "historical"
  };

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
  // b(layer, text, ref, sub) — a sourced statement. `sub` names the specific
  // source within the tier (e.g. "Sahih al-Bukhari", "Genesis", "Ibn Kathir").
  function b(layer, text, ref, sub) { return { layer: layer, text: text, ref: ref || "", sub: sub || "" }; }
  function r(to, type, note) { return { to: to, type: type, note: note || "" }; }
  // enc(withId, moment, ref) — a key encounter or historic moment.
  function enc(withId, moment, ref) { return { with: withId, moment: moment, ref: ref || "" }; }

  /* ----------------------------------------------------------------
   * People — the core of the universe.
   * ---------------------------------------------------------------- */
  const people = [
    /* ===================== ADAM'S FAMILY ===================== */
    {
      id: "adam", name: "Adam", title: "The First Human",
      named: true, era: "Beginnings", group: "Adam's Family", depth: "major",
      names: { quran: "آدَم (Ādam)", bible: "Adam", hebrew: "אָדָם (ʼĀdām)" },
      archetypes: ["prophet", "repentant"],
      story: [
        "Before there were nations there was a single being, shaped by God's own hand and quickened with His spirit. When God announced that He would place a successor — a khalīfa — upon the earth, the angels wondered that He would entrust it to one who might spill blood; God answered, 'I know what you do not know.'",
        "He was taught the names of all things, a knowledge the angels could not match, and at God's command they bowed before him — all but Iblīs, who refused out of pride. Placed in the Garden with his mate, Adam was warned away from a single tree. Whispered to by the deceiver, he ate, and shame and exile followed. Yet the same lapse became the first act of return: he received words of repentance from his Lord and was forgiven.",
        "From him descends all of humanity, and from his two sons comes the first story of brotherhood broken. Adam is remembered not as a fallen creature but as the first to sin and the first to turn back — the pattern of the human being who errs and repents."
      ],
      lessons: ["The first sin met the first repentance.",
                "Knowledge of the names elevated humanity above the angels.",
                "To err is human; to turn back is the beginning of guidance."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Created by God, taught the names of all things, and honoured by the prostration of the angels. Warned from one tree, he ate at Satan's whisper, then received words of repentance and was forgiven and guided.", "Q 2:30–37; Q 7:11–25; Q 20:115–122", "Surahs al-Baqarah, al-Aʿrāf, Ṭā Hā"),
        b("bible", "Formed from the dust of the ground and given the breath of life; set in Eden to tend it, given dominion, and named the living creatures.", "Genesis 1–3", "Genesis"),
        b("torah", "In Bereshit, ʼĀdām is made in the image of God, male and female; his name echoes adamah, the earth from which he is drawn.", "Bereshit 1–3", "Torah"),
        b("tradition", "Reported created tall (sixty cubits), the father of humankind; his repentance and God's mercy are dwelt upon at length by the commentators.", "Sahih al-Bukhari 3326; al-Tabari", "Hadith · Tafsir")
      ],
      encounters: [
        enc("iblis", "The refusal to prostrate — pride against the honoured creature.", "Q 7:11–13"),
        enc("hawwa", "Dwelling together in the Garden, and the shared lapse and repentance.", "Q 7:19–23"),
        enc("habil", "Father to the first offering accepted by God.", "Q 5:27")
      ],
      relations: [ r("hawwa", "spouse"), r("sheth", "parent"), r("habil", "parent"), r("qabil", "parent"), r("iblis", "opponent") ]
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
      archetypes: ["prophet", "reformer"], depth: "major",
      story: [
        "Ten generations after Adam, the earth had filled with idols and injustice. To it God sent Nūḥ, who called his people night and day, in secret and in the open, for nine hundred and fifty years. They answered him with mockery, stopping their ears and demanding he bring on the punishment he warned of.",
        "At God's command he built a great ship on dry land while the people jeered. When the ovens overflowed and the heavens opened, he carried aboard the believers and a pair of every kind. His own son refused, trusting a mountain to save him from the water, and was among the drowned — a sign that nearness to a prophet saves no one whose heart rejects.",
        "When the waters receded the ark came to rest, and humanity began again from those who believed. Nūḥ is counted among the five mightiest messengers (ūlū al-ʿazm), the second father of mankind."
      ],
      lessons: ["He preached for centuries with few who believed.",
                "Lineage cannot save where faith is absent — even a prophet's son drowned.",
                "Patience in calling to truth is measured in lifetimes, not days."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Called his people for 950 years; built the ark by revelation; was saved with the believers while the rejecters, including his own son, drowned.", "Q 71; Q 11:25–48; Q 29:14", "Surah Nūḥ, Hūd"),
        b("bible", "Noah, a righteous man, builds the ark and survives the flood with his family and the animals; God sets the rainbow as a covenant.", "Genesis 6–9", "Genesis"),
        b("torah", "In Bereshit, Noaḥ walks with God amid a corrupt generation and is preserved through the mabbul (deluge).", "Bereshit 6–9", "Torah"),
        b("tradition", "Named among the ūlū al-ʿazm; on the Day of Judgement he is the first messenger to whom the people turn, in the ḥadīth of intercession.", "Sahih al-Bukhari 4712", "Hadith")
      ],
      encounters: [
        enc("nuh-son", "The plea at the ark — 'Embark with us' — and the son's fatal refusal.", "Q 11:42–43"),
        enc("nuh-wife", "A wife within the household who sided with the rejecters.", "Q 66:10"),
        enc("hud", "A forerunner among the warner-prophets sent after him to Ād.", "Q 7:65")
      ],
      relations: [ r("nuh-wife", "spouse"), r("nuh-son", "parent"), r("idris", "descendant"), r("adam", "descendant") ]
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
      named: true, era: "Patriarchs", group: "Ibrahim's Family", depth: "major",
      names: { quran: "إِبْرَاهِيم (Ibrāhīm)", bible: "Abraham", hebrew: "אַבְרָהָם (ʼAvrāhām)", tradition: "Khalīl Allāh — the Friend of God" },
      archetypes: ["prophet", "truth-seeker", "reformer"],
      story: [
        "As a youth among idol-worshippers, Ibrāhīm watched a star, then the moon, then the sun rise and set, and reasoned past them all: 'I do not love things that set.' He turned to the One who made them. When his people left their idols to a festival, he shattered them and laid the axe on the largest — then asked the furious crowd why they worshipped what could not even defend itself.",
        "Cast into a fire for his defiance, he was unharmed — God commanded, 'Be coolness and peace for Ibrāhīm.' He debated the tyrant-king who claimed to give life and death, silencing him with the rising sun. Called to leave his land, he settled his wife Hājar and infant Ismāʿīl in a barren valley by God's command, and there the well of Zamzam sprang and Mecca grew.",
        "His faith was tried to its limit when he saw in a dream that he must sacrifice his son; both submitted, and at the last moment God ransomed the boy with a great sacrifice. With Ismāʿīl he raised the foundations of the Kaaba, praying that a messenger arise from their descendants — a prayer answered, in Muslim belief, in Muhammad. Through Ismāʿīl and Isḥāq he became the father of nations and is honoured across Judaism, Christianity and Islam."
      ],
      lessons: ["He reasoned his way from the stars to the One who set them.",
                "He was ready to surrender even his son, and was ransomed.",
                "A father of nations through two sons, two peoples.",
                "True submission holds nothing back, not even what is most beloved."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Reasoned from creation to the Creator, broke the idols, survived the fire made cool, confronted the tyrant, was tried with the sacrifice of his son, and raised the Kaaba with Ismāʿīl.", "Q 6:74–79; Q 21:51–70; Q 37:99–111; Q 2:124–129", "Surahs al-Anʿām, al-Anbiyāʼ, al-Ṣāffāt"),
        b("bible", "Abram is called from Ur and Haran with the promise of land and descendants as numberless as the stars; God establishes a covenant and tests him with the binding of Isaac.", "Genesis 12–22", "Genesis"),
        b("torah", "Avraham, first of the patriarchs, receives the brit (covenant) and circumcision; the Akedah (binding of Isaac) is read on Rosh Hashanah.", "Bereshit 12–22", "Torah"),
        b("tradition", "Titled Khalīl Allāh; the midrash preserves his childhood smashing of his father's idols, echoed in the Quranic account.", "Genesis Rabbah 38; al-Tabari", "Midrash · Tafsir")
      ],
      encounters: [
        enc("nimrod", "The debate with the king who claimed to give life and death.", "Q 2:258"),
        enc("azar", "The gentle, grieving appeal to an idol-making father.", "Q 19:41–48"),
        enc("ismail", "The shared submission to the command of sacrifice, and the building of the Kaaba.", "Q 37:102; Q 2:127"),
        enc("hajar", "Leaving mother and child in the valley of Mecca in trust of God.", "Q 14:37")
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
      named: true, era: "Patriarchs", group: "House of Yaqub", depth: "major",
      names: { quran: "يُوسُف (Yūsuf)", bible: "Joseph", hebrew: "יוֹסֵף (Yōsēf)" },
      archetypes: ["prophet", "truth-seeker", "repentant"],
      story: [
        "As a boy Yūsuf dreamed of eleven stars, the sun and the moon bowing to him, and his father Yaʿqūb warned him to keep it from his envious brothers. They threw him into a well and sold him for a few coins to a passing caravan; he was carried to Egypt and bought into the house of a high official.",
        "Grown into a man of striking beauty and integrity, he refused the advances of the official's wife — 'I seek refuge in God' — and chose prison over sin when the women of the city schemed against him. In prison he interpreted dreams, and when the king dreamed of seven fat and seven lean cattle, Yūsuf read it as years of plenty and famine and was raised to govern the granaries of Egypt.",
        "When famine drove his brothers to Egypt to beg for grain, he knew them though they did not know him. He tested them, kept his full brother back, and at last revealed himself with words of pure mercy: 'No blame upon you today; God will forgive you.' He sent his shirt to restore his blind father's sight and gathered the family to Egypt — the eleven and their parents bowing, and the childhood dream fulfilled. The Quran calls his account 'the most beautiful of narratives.'"
      ],
      lessons: ["Betrayed, enslaved, imprisoned — and raised to govern Egypt.",
                "'No blame upon you today' — power used for mercy, not revenge.",
                "Patience and God-consciousness turn every wound into a rung upward."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "An entire surah tells his story: the dream, the well, the sale, the temptation resisted, the prison, the reading of the king's dream, the rise to authority, and the merciful reunion with his brothers and father.", "Q 12 (Surah Yūsuf)", "Surah Yūsuf"),
        b("bible", "Joseph and the coat of many colours, sold into Egypt, rising under Pharaoh to save many nations from famine, and forgiving his brothers.", "Genesis 37–50", "Genesis"),
        b("torah", "Yōsef ha-Tzaddik (the Righteous), whose story closes Bereshit and carries Israel down into Egypt.", "Bereshit 37–50", "Torah"),
        b("tradition", "Granted 'half of all beauty'; the commentators dwell on his chastity and his forbearance toward those who wronged him.", "Sahih Muslim 162; al-Tabari", "Hadith · Tafsir")
      ],
      encounters: [
        enc("yusuf-brothers", "Cast into the well by envious brothers — later forgiven without reproach.", "Q 12:15; Q 12:92"),
        enc("zulaikha", "The temptation in the great house, and his choice of prison over sin.", "Q 12:23–33"),
        enc("aziz", "Raised in, then over, the house of the Egyptian minister.", "Q 12:21"),
        enc("yaqub", "The shirt that restored a grieving father's sight.", "Q 12:93–96")
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
      named: true, era: "Exodus", group: "Bani Israel & Egypt", depth: "major",
      names: { quran: "مُوسَىٰ (Mūsā)", bible: "Moses", hebrew: "מֹשֶׁה (Mōsheh)", tradition: "Kalīm Allāh — the one God spoke to" },
      archetypes: ["prophet", "reformer", "faithful-companion"],
      story: [
        "Born to an enslaved people whose sons Pharaoh was killing, the infant Mūsā was placed by his mother on the Nile in trust of God, and drawn from the water into Pharaoh's own palace — raised by the tyrant who sought his death. As a young man he struck and killed an Egyptian while defending a Hebrew, and fled to Madyan, where he watered the flocks of two women, married, and tended sheep for years.",
        "Returning by night, he saw a fire on Mount Sinai and heard his Lord speak: 'I am God; there is no deity but Me.' Given the staff that became a serpent and the hand that shone white, he was sent — with his brother Hārūn, whom he asked for as a helper — to confront Pharaoh and demand the freedom of the Children of Israel. The court magicians, summoned to outmatch him, instead fell in prostration when his staff swallowed their illusions.",
        "Through plagues and warnings Pharaoh's heart only hardened, until Mūsā led his people out and the sea parted for them and closed over their pursuers. At Sinai he received the Tablets; in his absence the people made a golden calf, and he returned in grief and anger. He even journeyed to learn hidden wisdom from al-Khiḍr, the servant given knowledge. No prophet is named more often in the Quran."
      ],
      lessons: ["From a basket on the Nile to the court of Pharaoh.",
                "He asked for his brother's help — leadership shared is leadership strengthened.",
                "God raises deliverers in the very house of the oppressor.",
                "Even the one who spoke with God was sent to keep learning."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Saved on the Nile and raised by Pharaoh; called at the burning bush; sent with nine signs; the magicians believed; the sea parted; he received the Torah and faced the golden calf.", "Q 20; Q 28; Q 7:103–156; Q 26:10–68", "Surahs Ṭā Hā, al-Qaṣaṣ, al-Aʿrāf"),
        b("bible", "Moses leads the Exodus from Egypt through the parted sea, receives the Ten Commandments at Sinai, and guides Israel forty years in the wilderness.", "Exodus; Numbers; Deuteronomy", "Exodus–Deuteronomy"),
        b("torah", "Mosheh Rabbenu — 'Moses our Teacher' — the greatest of the prophets in Jewish tradition, through whom the Torah was given.", "Shemot 1–40", "Torah"),
        b("tradition", "The prophet most often named in the Quran; met on the Night Journey, he counsels the Prophet Muhammad on the number of daily prayers.", "Sahih al-Bukhari 3887", "Hadith")
      ],
      encounters: [
        enc("pharaoh", "The confrontation at court — staff against sorcery, freedom against tyranny.", "Q 7:104–126"),
        enc("harun", "The brother given as helper and fellow prophet.", "Q 20:29–36"),
        enc("khidr", "The journey to learn the hidden wisdom behind unsettling acts.", "Q 18:65–82"),
        enc("shuayb", "Refuge in Madyan, the marriage, and years tending flocks.", "Q 28:22–28"),
        enc("samiri", "The grief of return to find the people worshipping a golden calf.", "Q 20:83–98")
      ],
      relations: [
        r("harun", "sibling"), r("musa-mother", "child"), r("musa-sister", "sibling"),
        r("pharaoh", "opponent"), r("asiya", "kin", "raised by"), r("khidr", "student"),
        r("shuayb", "kin", "son-in-law"), r("yusha", "teacher"), r("bani-israel", "ruler"), r("qarun", "opponent")
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
      relations: [ r("sulayman", "parent"), r("jalut", "opponent"), r("talut", "ally"),
                   r("bani-israel", "ruler", "king of Bani Israel") ]
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
      relations: [ r("maryam", "parent"), r("imran-wife", "spouse"),
                   r("bani-israel", "descendant", "the house of Imran, of Bani Israel") ]
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
      named: true, era: "Gospel", group: "House of Imran", depth: "major",
      names: { quran: "مَرْيَم (Maryam)", bible: "Mary", hebrew: "מִרְיָם (Miryām)" },
      archetypes: ["believing-woman", "truth-seeker"],
      story: [
        "Vowed to God's service by her mother before her birth, Maryam was placed in the care of the prophet Zakariyyā, who marvelled that she always had provision out of season: 'It is from God, who provides without measure.' She withdrew to a place of worship, devout and chaste.",
        "There the angel came to her in the form of a man and announced a pure son. 'How can I have a child when no man has touched me?' She was told it was easy for God: 'Be,' and it is. She conceived and withdrew to a far place, and in the pains of birth beneath a palm tree cried out in anguish — but was comforted by a stream and ripe dates and a voice bidding her be at peace.",
        "Returning to her people carrying the child, she met their accusation in silence, pointing to the infant — who spoke from the cradle: 'I am a servant of God; He has given me the Scripture and made me a prophet.' The Quran names her more than any other woman, calls her chosen 'above the women of the worlds,' and titles a whole surah with her name."
      ],
      lessons: ["The only woman named in the Quran; a whole surah bears her name.",
                "'Chosen above the women of the worlds.'",
                "Devotion and patient trust meet the impossible with 'Be, and it is.'"],
      sources: ["quran", "bible", "tradition", "historical"],
      entries: [
        b("quran", "Dedicated to God and raised under Zakariyyā; visited by the angel and given a son by God's word while remaining chaste; vindicated by the infant who spoke from the cradle.", "Q 3:35–47; Q 19:16–34; Q 66:12", "Surahs Āl ʿImrān, Maryam"),
        b("bible", "Mary receives the annunciation from Gabriel, conceives by the Holy Spirit, and bears Jesus; her song, the Magnificat, exalts God.", "Luke 1–2; Matthew 1", "Gospels"),
        b("tradition", "Named with Āsiya among the most perfect of women; the commentators recount her provision out of season and her seclusion.", "Sahih al-Bukhari 3411; al-Tabari", "Hadith · Tafsir"),
        b("historical", "Revered across Christianity and Islam alike; the only woman named in the Quran, and the subject of extensive Marian devotion and scholarship.", "Comparative religious study", "Scholarship")
      ],
      encounters: [
        enc("zakariyya", "Raised under his guardianship in the temple, provision appearing out of season.", "Q 3:37"),
        enc("isa", "The miraculous birth and the infant who spoke in her defence.", "Q 19:27–33"),
        enc("imran-wife", "The mother whose vow dedicated her to God before birth.", "Q 3:35–36")
      ],
      relations: [ r("imran", "child"), r("imran-wife", "child"), r("isa", "parent"), r("zakariyya", "student") ]
    },
    {
      id: "isa", name: "Isa", title: "The Messiah, Word of God (Jesus)",
      named: true, era: "Gospel", group: "House of Imran", depth: "major",
      names: { quran: "عِيسَى (ʿĪsā) — al-Masīḥ", bible: "Jesus / Christ", hebrew: "יֵשׁוּעַ (Yēshūaʿ)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Born of Maryam without a father by the command 'Be,' ʿĪsā is called in the Quran the Messiah, a Word from God and a spirit from Him. As an infant he spoke from the cradle to defend his mother and proclaim himself a servant and prophet of God.",
        "Sent to the Children of Israel, he was given the Injīl (Gospel) and supported by the holy spirit. By God's leave he healed the blind and the leper, breathed life into a bird of clay, and raised the dead; he came confirming the Torah before him and easing some of its burdens. His close disciples, the ḥawāriyyūn, declared themselves 'helpers of God,' and at their asking a table was sent from heaven.",
        "The Quran teaches that he was neither killed nor crucified, but that it was made to appear so, and that God raised him to Himself. Muslims await his return. Honoured by Christians as Lord and by Muslims as a mighty messenger, ʿĪsā stands at the meeting point of the world's two largest faiths — and, in the Quran, foretold the coming of Aḥmad."
      ],
      lessons: ["He spoke from the cradle in defence of his mother.",
                "Given the Injil and clear signs, supported by the holy spirit.",
                "Mercy and healing were the signs of his ministry."],
      sources: ["quran", "bible", "tradition", "historical"],
      entries: [
        b("quran", "The Messiah, a Word and spirit from God, born of Maryam; spoke in the cradle, healed and raised the dead by God's leave, was raised up rather than crucified, and foretold Aḥmad.", "Q 3:45–55; Q 5:110–115; Q 4:157–158; Q 61:6", "Surahs Āl ʿImrān, al-Māʼidah, al-Nisāʼ"),
        b("bible", "Jesus of Nazareth: his birth, teaching, parables, miracles, passion, and resurrection, proclaimed as the Christ, the Son of God.", "Matthew · Mark · Luke · John", "Gospels"),
        b("tradition", "Described in the ḥadīth of his second coming, descending to establish justice; the commentators detail his miracles and the table from heaven.", "Sahih al-Bukhari 3448; al-Tabari", "Hadith · Tafsir"),
        b("historical", "The central figure of Christianity and a major prophet of Islam; the differing accounts of his nature and end mark the great divergence — and meeting point — of the two traditions.", "Comparative religious study", "Scholarship")
      ],
      encounters: [
        enc("maryam", "Defending his mother from the cradle: 'I am a servant of God.'", "Q 19:30"),
        enc("hawariyyun", "The disciples who declared, 'We are the helpers of God.'", "Q 3:52"),
        enc("muhammad", "Foretelling a messenger to come after him, named Aḥmad.", "Q 61:6")
      ],
      relations: [ r("maryam", "child"), r("hawariyyun", "teacher"), r("yahya", "kin"),
                   r("ibrahim", "descendant", "among Ibrahim's progeny (Q 6:85)") ]
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
      relations: [ r("ibrahim", "descendant", "among Ibrahim's progeny (Q 6:84)") ]
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
      relations: [ r("ibrahim", "kin", "named among the guided (Q 6:86)") ]
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
      relations: [ r("ad", "kin"), r("nuh", "descendant", "of the generations after Nuh") ]
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
      relations: [ r("thamud", "kin"), r("nuh", "descendant", "of the generations after Nuh") ]
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
      relations: [ r("dawud", "contemporary", "tradition: lived in the time of Dawud") ]
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
      relations: [ r("ibrahim", "contemporary", "tradition associates him with Ibrahim's era") ]
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
      relations: [ r("isa", "successor", "monotheists in the generations after Isa") ]
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
      named: true, era: "Revelation in Mecca", group: "The Meccan Mission", depth: "major",
      names: { quran: "مُحَمَّد (Muḥammad) — also Aḥmad", tradition: "Rasūl Allāh · Khātam al-Nabiyyīn (Seal of the Prophets)" },
      archetypes: ["prophet", "reformer", "faithful-companion"],
      story: [
        "Born in Mecca around 570 CE, orphaned young and raised by his grandfather and uncle, he grew known among his people as al-Amīn, 'the Trustworthy.' Given to retreat and reflection, he was forty when, in the cave of Ḥirāʼ, the angel Jibrīl came with the first word of revelation: 'Read, in the name of your Lord who created.'",
        "For thirteen years in Mecca he called to the worship of the one God and the dignity of the poor, the orphan and the slave, meeting ridicule, boycott and persecution. The Quran descended to him over twenty-three years. After the migration (hijra) to Medina he became the leader of a community, and within his lifetime the message spread across Arabia.",
        "The Quran calls him a mercy to the worlds and the seal of the prophets, descended through Ismāʿīl — the fulfilment of Ibrāhīm's prayer over the valley of Mecca. He is the only person whose biography (sīra) and sayings (ḥadīth) are recorded in vast detail, and the bearer, in Muslim belief, of the final revelation. In keeping with that tradition, he is never depicted in image."
      ],
      lessons: ["The recipient of the Quran, sent as a mercy to the worlds.",
                "Descended from Ismail, completing the arc of Ibrahim's prayer.",
                "The trustworthy character preceded and carried the message."],
      sources: ["quran", "bible", "tradition", "historical"],
      entries: [
        b("quran", "The Messenger to whom the Quran was revealed; named Muḥammad and Aḥmad, called a mercy to the worlds, an excellent example, and the seal of the prophets.", "Q 33:40; Q 48:29; Q 21:107; Q 33:21", "Surahs al-Aḥzāb, al-Fatḥ, al-Anbiyāʼ"),
        b("bible", "Muslims read the Paraclete foretold by Jesus, and the prophet 'like Moses,' as references to him; this reading is not shared by Christian or Jewish tradition.", "John 14–16; Deuteronomy 18:18 (as read in Islam)", "as interpreted in Islam"),
        b("tradition", "His life, character and sayings are preserved in the ḥadīth collections and the sīra; the Night Journey and Ascension (Isrāʼ and Miʿrāj) are among its great events.", "Sahih al-Bukhari; Sahih Muslim", "Hadith"),
        b("historical", "Born in Mecca c. 570 CE; the earliest biography is Ibn Isḥāq's, transmitted by Ibn Hishām; among the most documented figures of late antiquity.", "Ibn Isḥāq / Ibn Hishām, Sīra", "Scholarship")
      ],
      encounters: [
        enc("ibrahim", "The answer, generations later, to Ibrāhīm's prayer for a messenger from his seed.", "Q 2:129"),
        enc("isa", "The one foretold by ʿĪsā under the name Aḥmad.", "Q 61:6"),
        enc("zayd", "The freed slave he raised as his own — the only Companion named in the Quran.", "Q 33:37"),
        enc("abu-lahab", "The uncle whose hostility a whole surah answers.", "Q 111")
      ],
      relations: [ r("ismail", "descendant"), r("ibrahim", "descendant"), r("zayd", "teacher"),
                   r("abu-lahab", "opponent"), r("isa", "successor", "came after Isa, who foretold him (Q 61:6)") ]
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
    },

    /* ===================== EXPANSION — FURTHER PROPHETS & FIGURES ===================== */
    {
      id: "sheth", name: "Sheth", title: "The Son Given After (Seth)",
      named: false, era: "Beginnings", group: "Adam's Family", depth: "minor",
      names: { quran: "(unnamed)", tradition: "شِيث (Shīth)", bible: "Seth", hebrew: "שֵׁת (Shēt)" },
      archetypes: ["faithful-companion"],
      lessons: ["The line of faith continued through the son given after loss."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Seth is born to Adam and Eve after Abel's death, 'another seed' through whom the godly line continues.", "Genesis 4:25; 5:3", "Genesis"),
        b("torah", "Shēt, third son of Adam, ancestor of Noaḥ and so of all who survive the flood.", "Bereshit 4–5", "Torah"),
        b("tradition", "Named Shīth in Islamic tradition and counted by many as a prophet who received scriptures, the heir of Adam's knowledge.", "al-Tabari; Qiṣaṣ al-Anbiyāʼ", "Tafsir")
      ],
      relations: [ r("adam", "child"), r("idris", "ancestor") ]
    },
    {
      id: "idris", name: "Idris", title: "The Lofty Prophet (Enoch)",
      named: true, era: "Early Prophets", group: "Other Prophets & Sages", depth: "supporting",
      names: { quran: "إِدْرِيس (Idrīs)", bible: "Enoch", hebrew: "חֲנוֹךְ (Ḥanōkh)" },
      archetypes: ["prophet", "truth-seeker"],
      story: [
        "Idrīs is named in the Quran as a man of truth, a prophet whom God 'raised to a high station.' Tradition associates him with the beginnings of writing, astronomy and the measuring of time, and identifies him with the Biblical Enoch, who 'walked with God, and was no more, for God took him.'"
      ],
      lessons: ["Knowledge in the service of God lifts a person to a high station."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Mentioned as truthful, a prophet, patient, and raised by God to a high place.", "Q 19:56–57; Q 21:85", "Surahs Maryam, al-Anbiyāʼ"),
        b("bible", "Enoch walks faithfully with God for three hundred years and is taken up without dying.", "Genesis 5:21–24", "Genesis"),
        b("tradition", "Met in the fourth heaven on the Night Journey; associated with the first use of the pen and the study of the stars.", "Sahih al-Bukhari 3342; al-Tabari", "Hadith · Tafsir")
      ],
      relations: [ r("adam", "descendant"), r("nuh", "ancestor") ]
    },
    {
      id: "yusha", name: "Yusha ibn Nun", title: "The Attendant Who Led (Joshua)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "supporting",
      names: { quran: "(unnamed — 'his young attendant')", tradition: "يُوشَع بن نُون (Yūshaʿ b. Nūn)", bible: "Joshua", hebrew: "יְהוֹשֻׁעַ (Yehōshuaʿ)" },
      archetypes: ["faithful-companion", "reformer"],
      story: [
        "The young man who attended Mūsā on the journey to meet al-Khiḍr is identified in tradition as Yūshaʿ ibn Nūn. After Mūsā, he led the Children of Israel across the Jordan into the promised land — the faithful servant who became the leader."
      ],
      lessons: ["The loyal attendant of one generation becomes the leader of the next."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Referred to as Mūsā's young companion on the journey in search of knowledge.", "Q 18:60–62", "Surah al-Kahf"),
        b("bible", "Joshua succeeds Moses, leads Israel across the Jordan, and the walls of Jericho fall.", "Joshua 1–6", "Joshua"),
        b("torah", "Yehoshua, attendant of Moses and one of the two faithful spies, who brings Israel into the Land.", "Shemot 17; Bemidbar 13–14", "Torah"),
        b("tradition", "Named as the prophet for whom the sun was held back so a battle could be completed before the Sabbath.", "Sahih al-Bukhari; al-Tabari", "Hadith · Tafsir")
      ],
      relations: [ r("musa", "student"), r("bani-israel", "ruler") ]
    },
    {
      id: "ilyas", name: "Ilyas", title: "The Prophet Against Baal (Elijah)",
      named: true, era: "Kingdom", group: "Other Prophets & Sages", depth: "supporting",
      names: { quran: "إِلْيَاس (Ilyās)", bible: "Elijah", hebrew: "אֵלִיָּהוּ (Ēliyyāhū)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Ilyās was sent to a people who worshipped Baal, calling them from the idol to the Lord who created them. The Quran honours him among the righteous; the Bible tells of Elijah's contest on Mount Carmel and his being taken up in a whirlwind."
      ],
      lessons: ["One voice can stand against a whole people gone after idols."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Sent to forbid the worship of Baal; counted among the messengers and the righteous, with peace pronounced upon him.", "Q 37:123–132; Q 6:85", "Surah al-Ṣāffāt"),
        b("bible", "Elijah confronts the prophets of Baal on Carmel, is fed by ravens, and is taken to heaven in a chariot of fire.", "1 Kings 17–19; 2 Kings 2", "1–2 Kings"),
        b("tradition", "Listed in the Quranic genealogy of guided prophets; some traditions link or contrast him with al-Khiḍr.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("ibrahim", "kin", "among the guided (Q 6:85)"), r("al-yasa", "teacher") ]
    },
    {
      id: "al-yasa", name: "Al-Yasa", title: "The Successor Prophet (Elisha)",
      named: true, era: "Kingdom", group: "Other Prophets & Sages", depth: "minor",
      names: { quran: "الْيَسَع (al-Yasaʿ)", bible: "Elisha", hebrew: "אֱלִישָׁע (Ĕlīshāʿ)" },
      archetypes: ["prophet"],
      lessons: ["The work of guidance is handed on from prophet to prophet."],
      sources: ["quran", "bible", "tradition"],
      entries: [
        b("quran", "Named among the prophets, each favoured above the worlds, alongside Ismāʿīl, Yūnus and Lūṭ.", "Q 6:86; Q 38:48", "Surahs al-Anʿām, Ṣād"),
        b("bible", "Elisha succeeds Elijah, receiving a double portion of his spirit, and works many signs of mercy.", "2 Kings 2–13", "2 Kings"),
        b("tradition", "Counted among the prophets of the Children of Israel who continued Ilyās's call.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("ilyas", "student"), r("ibrahim", "kin", "among the guided (Q 6:86)") ]
    },
    {
      id: "dhul-kifl", name: "Dhul-Kifl", title: "The Steadfast (Ezekiel, in tradition)",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages", depth: "minor",
      names: { quran: "ذُو الْكِفْل (Dhū al-Kifl)", bible: "(Ezekiel, in tradition)" },
      archetypes: ["prophet", "martyr"],
      lessons: ["He took on a burden and kept his word — patience made into a name."],
      sources: ["quran", "tradition"],
      entries: [
        b("quran", "Named with Ismāʿīl and Idrīs among the patient and the righteous, admitted into God's mercy.", "Q 21:85–86; Q 38:48", "Surahs al-Anbiyāʼ, Ṣād"),
        b("tradition", "His identity is debated — many link him to Ezekiel; his name is read as 'the one of the double portion,' one who guaranteed and fulfilled a trust.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("ibrahim", "kin", "among the patient prophets (Q 21:85)") ]
    },
    {
      id: "uzair", name: "Uzair", title: "The One Revived After a Century (Ezra)",
      named: true, era: "Other Prophets", group: "Other Prophets & Sages", depth: "minor",
      names: { quran: "عُزَيْر (ʿUzayr)", bible: "Ezra (traditionally)", hebrew: "עֶזְרָא (ʿEzrāʼ)" },
      archetypes: ["truth-seeker"],
      story: [
        "The Quran tells of one who passed a town fallen into ruin and wondered how God could restore it to life; God caused him to die for a hundred years and then revived him, his food untouched, as a living sign of the resurrection. Tradition often identifies this figure with ʿUzayr (Ezra)."
      ],
      lessons: ["A hundred years is as a day to the One who gives life to the dead."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Cited in a passage on one revived after a hundred years as a sign of resurrection; elsewhere a warning against calling ʿUzayr the son of God.", "Q 2:259; Q 9:30", "Surahs al-Baqarah, al-Tawbah"),
        b("bible", "Ezra the scribe leads a return from exile and renews the covenant and the Law.", "Ezra 7–10", "Ezra"),
        b("tradition", "Commentators connect the revived man with Ezra, honoured for restoring the Torah to memory after the exile.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("bani-israel", "kin") ]
    },
    {
      id: "sahara", name: "The Magicians of Pharaoh", title: "The Sorcerers Who Believed",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "supporting", isCommunity: true,
      names: { quran: "السَّحَرَة (al-Saḥara)" },
      archetypes: ["truth-seeker", "martyr", "repentant"],
      story: [
        "Summoned by Pharaoh to defeat Mūsā, the magicians cast their ropes and staffs until the ground seemed to writhe with serpents. But when Mūsā's staff swallowed their illusions, they knew at once it was no magic, and fell down in prostration: 'We believe in the Lord of the worlds, the Lord of Mūsā and Hārūn.' Pharaoh threatened them with crucifixion and the cutting off of hands and feet; they answered that they did not care — they were returning to their Lord. In a single hour they passed from serving a tyrant to dying for the truth."
      ],
      lessons: ["Recognition of the truth can turn opponents into martyrs in an instant.",
                "'We will never prefer you over the clear signs that have come to us.'"],
      sources: ["quran", "tradition"],
      entries: [
        b("quran", "Pharaoh's sorcerers, defeated by Mūsā's sign, prostrate in belief and defy Pharaoh's threats of torture and death.", "Q 7:113–126; Q 20:70–73; Q 26:46–51", "Surahs al-Aʿrāf, Ṭā Hā, al-Shuʿarāʼ"),
        b("tradition", "Held up by the commentators as those who entered the day disbelievers and left it as believing martyrs.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("musa", "ally"), r("pharaoh", "opponent") ]
    },
    {
      id: "ashab-ukhdud", name: "Ashab al-Ukhdud", title: "The People of the Ditch",
      named: false, era: "Other Prophets", group: "Other Prophets & Sages", depth: "supporting", isCommunity: true,
      names: { quran: "أَصْحَاب الْأُخْدُود (Aṣḥāb al-Ukhdūd)" },
      archetypes: ["martyr", "oppressed", "truth-seeker"],
      story: [
        "The Quran condemns the makers of a great trench filled with fire, into which they threw believers and sat watching them burn — punishing them for nothing but their faith in the Almighty. Tradition tells the story of a steadfast boy, a magician, a monk and a king, whose people came to believe and were martyred in the flames. The passage stands as a memorial to those killed for their faith and a warning to their killers."
      ],
      lessons: ["Faith can cost everything, and still be the only thing worth keeping.",
                "The watchers of cruelty are judged with its doers."],
      sources: ["quran", "tradition"],
      entries: [
        b("quran", "The makers of the fiery ditch are cursed for burning the believers, whose only 'crime' was faith in the Mighty, the Praiseworthy.", "Q 85:4–9", "Surah al-Burūj"),
        b("tradition", "Expounded in the ḥadīth of the boy and the king, a parable of conviction under torture.", "Sahih Muslim 3005", "Hadith")
      ],
      relations: [ r("isa", "successor", "believers in the generations after Isa") ]
    },
    {
      id: "saba", name: "The People of Saba", title: "The Nation of Sheba",
      named: true, era: "Kingdom", group: "House of David", depth: "supporting", isCommunity: true,
      names: { quran: "سَبَأ (Sabaʼ)", bible: "Sheba" },
      archetypes: ["arrogant-elite", "oppressed"],
      story: [
        "Saba was a people blessed with gardens to their right and left, a land so fertile that travellers passed through it in unbroken shade. Told only to eat of their Lord's provision and give thanks, they turned away — and God sent the flood of the dam (sayl al-ʿarim), which swept their gardens into bitter orchards of thorn. Their queen, in another age, had once submitted with Sulaymān to the Lord of the worlds; their later generations are the Quran's parable of ingratitude for abundance."
      ],
      lessons: ["Abundance ungratefully held becomes the cause of its own ruin.",
                "A whole civilisation can be undone by forgetting to give thanks."],
      sources: ["quran", "bible", "tradition"],
      entries: [
        b("quran", "Given two gardens and ease, Sabaʼ turned from gratitude and was struck by the bursting of the dam; a surah carries their name.", "Q 34:15–19; Q 27:22–24", "Surahs Sabaʼ, al-Naml"),
        b("bible", "The land of Sheba, famed for spices and gold, whose queen visited Solomon.", "1 Kings 10; Psalm 72", "1 Kings"),
        b("tradition", "The bursting of the Maʼrib dam is remembered in Arab historical memory as a turning point that scattered the southern tribes.", "Ibn Isḥāq; historical accounts", "History")
      ],
      relations: [ r("bilqis", "ruler", "their queen"), r("sulayman", "contemporary") ]
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
    legacyTier: legacyTier,
    archetypes: archetypes,
    relationTypes: relationTypes,
    people: people,
    stories: stories
  };
})();
