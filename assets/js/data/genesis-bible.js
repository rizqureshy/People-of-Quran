/* People of the Quran — Genesis (Bible & Torah) */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(

    /* ===================== NOAH'S THREE SONS ===================== */
    {
      id: "shem", name: "Shem", title: "The Eldest Son of Noah (Sām)",
      named: false, era: "Beginnings", group: "Genesis", depth: "supporting",
      names: { bible: "Shem", hebrew: "שֵׁם (Shēm)", tradition: "سام (Sām)" },
      archetypes: ["faithful-companion"],
      story: [
        "In the Bible, Shem is the eldest of Noah's three sons who entered the ark and were saved from the flood. With his brother Japheth he covered their father in reverence rather than shame him. From his line the Genesis genealogies trace the Semitic peoples — and through them Ibrāhīm himself. Islamic tradition names him Sām and counts the believing sons of Nūḥ among the righteous remnant who repopulated the earth."
      ],
      lessons: ["The honour you show your parents echoes through your descendants."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Shem, eldest son of Noah, saved in the ark, ancestor of the Semitic peoples and of Abraham.", "Genesis 7; Genesis 9–11", "Genesis"),
        b("torah", "Shēm, who with Yefet covered Noaḥ honourably, his line reaching to Avraham.", "Bereshit 9–11", "Torah"),
        b("tradition", "Remembered as Sām, a believing son of Nūḥ, from whom the Arabs and Israelites descend.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("nuh", "child"), r("ibrahim", "ancestor") ]
    },
    {
      id: "ham", name: "Ham", title: "A Son of Noah (Ḥām)",
      named: false, era: "Beginnings", group: "Genesis", depth: "minor",
      names: { bible: "Ham", hebrew: "חָם (Ḥām)", tradition: "حام (Ḥām)" },
      archetypes: ["faithful-companion"],
      lessons: ["Carried in the ark, his line spread across many nations."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Ham, a son of Noah saved in the ark, ancestor of Cush, Egypt and Canaan among the nations.", "Genesis 9–10", "Genesis"),
        b("torah", "Ḥām, whose descendants are listed in the table of nations after the flood.", "Bereshit 9–10", "Torah"),
        b("tradition", "Named Ḥām among the three sons of Nūḥ who survived the deluge.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("nuh", "child"), r("shem", "sibling") ]
    },
    {
      id: "japheth", name: "Japheth", title: "A Son of Noah (Yāfith)",
      named: false, era: "Beginnings", group: "Genesis", depth: "minor",
      names: { bible: "Japheth", hebrew: "יֶפֶת (Yefet)", tradition: "يافث (Yāfith)" },
      archetypes: ["faithful-companion"],
      lessons: ["With his brother he chose to cover, not expose."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Japheth, a son of Noah saved in the ark, who with Shem covered their father; ancestor of many northern peoples.", "Genesis 9–10", "Genesis"),
        b("torah", "Yefet, whose line spreads to the coastlands and isles in the table of nations.", "Bereshit 9–10", "Torah"),
        b("tradition", "Named Yāfith, the third believing son of Nūḥ.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("nuh", "child"), r("shem", "sibling"), r("ham", "sibling") ]
    },

    /* ===================== IBRAHIM'S WIDER FAMILY ===================== */
    {
      id: "nahor", name: "Nahor", title: "The Brother of Abraham (Nāḥūr)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Nahor", hebrew: "נָחוֹר (Nāḥōr)", tradition: "ناحور (Nāḥūr)" },
      archetypes: ["faithful-companion"],
      lessons: ["From his house came the wives of the patriarchs."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Nahor, brother of Abraham, grandfather of Rebekah and ancestor of Laban's house in Aram.", "Genesis 11; Genesis 22; Genesis 24", "Genesis"),
        b("torah", "Nāḥōr, whose grandchildren Rivqah and Lavan marry into the line of Yitzḥaq and Yaʿaqov.", "Bereshit 11; 22; 24", "Torah")
      ],
      relations: [ r("ibrahim", "sibling"), r("bethuel", "parent") ]
    },
    {
      id: "bethuel", name: "Bethuel", title: "The Father of Rebekah (Batuʼīl)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Bethuel", hebrew: "בְּתוּאֵל (Bᵉthūʼēl)", tradition: "بتوئيل (Batūʼīl)" },
      archetypes: ["faithful-companion"],
      lessons: ["He gave his daughter to the covenant family."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Bethuel, son of Nahor and father of Rebekah and Laban, of Aram-Naharaim.", "Genesis 22; Genesis 24–25", "Genesis"),
        b("torah", "Bᵉthūʼēl, who with his son Lavan consents to send Rivqah to wed Yitzḥaq.", "Bereshit 24", "Torah")
      ],
      relations: [ r("nahor", "child"), r("rebecca", "parent"), r("laban", "parent") ]
    },
    {
      id: "rebecca", name: "Rebecca", title: "The Wife of Isaac (Rifqah)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "major",
      names: { bible: "Rebekah", hebrew: "רִבְקָה (Rivqāh)", tradition: "رفقة (Rifqah)" },
      archetypes: ["believing-woman"],
      story: [
        "Rebekah was drawn from the well by her kindness when Abraham's servant came seeking a wife for Isaac; she watered his camels unbidden and agreed to leave her home for a husband she had never met. Barren for twenty years, she conceived the twins Esau and Jacob, and the LORD told her that the elder would serve the younger. When the time came, she guided Jacob to receive the patriarchal blessing, securing the covenant line through her younger son. She is remembered in tradition as Rifqah, the mother of Yaʿqūb."
      ],
      lessons: ["A small act of kindness at a well can change the course of nations.",
                "She acted to keep the promise alive in the chosen son."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Rebekah, daughter of Bethuel, who watered the servant's camels and became Isaac's wife and mother of Esau and Jacob.", "Genesis 24–27", "Genesis"),
        b("torah", "Rivqāh, to whom God foretold that two nations were in her womb and the elder would serve the younger.", "Bereshit 24–27", "Torah"),
        b("tradition", "Named Rifqah, the wife of Isḥāq and mother of Yaʿqūb in the commentaries.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("ishaq", "Chosen at the well and brought home as his wife.", "Genesis 24"),
                    enc("yaqub", "Guided her younger son to receive the blessing.", "Genesis 27") ],
      relations: [ r("ishaq", "spouse"), r("bethuel", "child"), r("yaqub", "parent"), r("esau", "parent"), r("laban", "sibling") ]
    },
    {
      id: "keturah", name: "Keturah", title: "Abraham's Later Wife (Qaṭūrā)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Keturah", hebrew: "קְטוּרָה (Qᵉṭūrāh)", tradition: "قطورة (Qaṭūrā)" },
      archetypes: ["believing-woman"],
      lessons: ["From her sons came the peoples of the Arabian east, including Midian."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Keturah, whom Abraham took after Sarah's death; she bore him sons including Midian, ancestors of eastern tribes.", "Genesis 25", "Genesis"),
        b("torah", "Qᵉṭūrāh, mother of Avraham's later sons whom he sent eastward with gifts.", "Bereshit 25", "Torah"),
        b("tradition", "Remembered as a wife of Ibrāhīm and an ancestress of Midian (Madyan).", "al-Tabari", "Tafsir")
      ],
      relations: [ r("ibrahim", "spouse"), r("madyan", "ancestor") ]
    },
    {
      id: "melchizedek", name: "Melchizedek", title: "King and Priest of Salem (Malik Ṣādiq)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "supporting",
      names: { bible: "Melchizedek", hebrew: "מַלְכִּי־צֶדֶק (Malkī-Tzedeq)", tradition: "ملكي صادق" },
      archetypes: ["truth-seeker"],
      story: [
        "Melchizedek, king of Salem and 'priest of God Most High,' came out to bless Abraham after his victory over the kings, bringing bread and wine. Abraham gave him a tithe of all. With no recorded genealogy, he stands in scripture as a mysterious figure of righteousness and worship of the one God, honoured later as an enduring sign of true priesthood."
      ],
      lessons: ["Even outside the covenant line, God preserved worshippers of the truth."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Melchizedek, king of Salem and priest of God Most High, blessed Abram and received his tithe.", "Genesis 14", "Genesis"),
        b("torah", "Malkī-Tzedeq, who brought out bread and wine and blessed Avram in the name of El Elyon.", "Bereshit 14", "Torah")
      ],
      encounters: [ enc("ibrahim", "Blessed him and received a tithe of all he had won.", "Genesis 14") ],
      relations: [ r("ibrahim", "contemporary") ]
    },

    /* ===================== ISAAC'S HOUSE — ESAU ===================== */
    {
      id: "esau", name: "Esau", title: "The Elder Twin of Jacob (ʿĪṣū)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "major",
      names: { bible: "Esau", hebrew: "עֵשָׂו (ʿĒsāw)", tradition: "عيصو (ʿĪṣū)" },
      archetypes: ["repentant"],
      story: [
        "Esau, the firstborn twin of Isaac and Rebekah, was a hunter and a man of the field. In hunger he sold his birthright to his brother Jacob for a bowl of lentils, and later Jacob received the blessing meant for the elder. Esau's bitter anger drove Jacob to flee, yet years later, when the brothers met again, Esau ran to embrace him, wept on his neck, and forgave. He became the father of Edom, a great nation in its own right."
      ],
      lessons: ["What is sold in a moment of hunger may be mourned for a lifetime.",
                "He chose, in the end, to embrace rather than avenge."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Esau, firstborn of Isaac, who sold his birthright and later reconciled with Jacob; father of the Edomites.", "Genesis 25–27; Genesis 33", "Genesis"),
        b("torah", "ʿĒsāw, the hairy elder twin, founder of Edom, who ran to meet and embrace Yaʿaqov.", "Bereshit 25–33", "Torah"),
        b("tradition", "Named ʿĪṣū, the brother of Yaʿqūb, in the histories and commentaries.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("yaqub", "Sold his birthright, then later forgave and embraced him.", "Genesis 25; 33") ],
      relations: [ r("ishaq", "child"), r("rebecca", "child"), r("yaqub", "sibling") ]
    },

    /* ===================== LABAN — HOUSE OF ARAM ===================== */
    {
      id: "laban", name: "Laban", title: "Father of Leah and Rachel (Lābān)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "supporting",
      names: { bible: "Laban", hebrew: "לָבָן (Lāvān)", tradition: "لابان (Lābān)" },
      archetypes: ["skeptic"],
      story: [
        "Laban, son of Bethuel and uncle of Jacob, took the fleeing patriarch into his household in Aram. He gave his daughters Leah and Rachel in marriage but repeatedly deceived Jacob — substituting Leah for Rachel and changing his wages many times over twenty years of labour. When Jacob at last departed with his family and flocks, Laban pursued him, yet the two finally made a covenant of peace and parted at the heap of witness."
      ],
      lessons: ["The deceiver of Jacob was himself outmatched by patience and providence."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Laban, brother of Rebekah, who gave Leah and Rachel to Jacob and changed his wages ten times.", "Genesis 24; Genesis 29–31", "Genesis"),
        b("torah", "Lāvān the Aramean, with whom Yaʿaqov made a covenant of peace at Galʿed.", "Bereshit 29–31", "Torah")
      ],
      encounters: [ enc("yaqub", "Gave his daughters in marriage, then made a covenant of peace.", "Genesis 31") ],
      relations: [ r("bethuel", "child"), r("rebecca", "sibling"), r("yaqub", "kin"), r("leah", "parent"), r("rahil", "parent") ]
    },

    /* ===================== HANDMAIDS — MOTHERS OF TRIBES ===================== */
    {
      id: "bilhah", name: "Bilhah", title: "Handmaid of Rachel, Mother of Tribes (Bilhah)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Bilhah", hebrew: "בִּלְהָה (Bilhāh)", tradition: "بلهة (Bilhah)" },
      archetypes: ["believing-woman"],
      lessons: ["Mother of Dan and Naphtali among the twelve tribes."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Bilhah, Rachel's handmaid, who bore Jacob the tribal fathers Dan and Naphtali.", "Genesis 30; Genesis 35", "Genesis"),
        b("torah", "Bilhāh, mother of Dan and Naftali among the sons of Yaʿaqov.", "Bereshit 30–35", "Torah")
      ],
      relations: [ r("rahil", "servant"), r("yaqub", "spouse"), r("dan", "parent"), r("naphtali", "parent") ]
    },
    {
      id: "zilpah", name: "Zilpah", title: "Handmaid of Leah, Mother of Tribes (Zilpah)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Zilpah", hebrew: "זִלְפָּה (Zilpāh)", tradition: "زلفة (Zilfah)" },
      archetypes: ["believing-woman"],
      lessons: ["Mother of Gad and Asher among the twelve tribes."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Zilpah, Leah's handmaid, who bore Jacob the tribal fathers Gad and Asher.", "Genesis 30; Genesis 35", "Genesis"),
        b("torah", "Zilpāh, mother of Gad and Asher among the sons of Yaʿaqov.", "Bereshit 30–35", "Torah")
      ],
      relations: [ r("leah", "servant"), r("yaqub", "spouse"), r("gad", "parent"), r("asher", "parent") ]
    },

    /* ===================== THE REMAINING SONS OF JACOB ===================== */
    {
      id: "shimon", name: "Shimon", title: "The Second Son of Jacob (Simeon)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "supporting",
      names: { bible: "Simeon", hebrew: "שִׁמְעוֹן (Shimʿōn)", tradition: "شمعون (Shamʿūn)" },
      archetypes: ["repentant"],
      story: [
        "Simeon, the second son of Jacob by Leah, was among the brothers who turned against Yūsuf. With Levi he avenged their sister Dinah at Shechem with fierce violence, drawing their father's rebuke. In Egypt, the unrecognised Yūsuf kept Simeon bound as a pledge until the brothers returned with Binyāmīn — a turning point in the family's long road to reconciliation."
      ],
      lessons: ["Zeal without mercy brings reproach, even when the cause seems just."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Simeon, second son of Jacob, who avenged Dinah and was held bound in Egypt by Joseph.", "Genesis 29; Genesis 34; Genesis 42", "Genesis"),
        b("torah", "Shimʿōn, who with Levi struck Shechem and was kept as surety in Mitzrayim.", "Bereshit 34; 42", "Torah")
      ],
      encounters: [ enc("yusuf", "Held bound in Egypt as a pledge for Benjamin's coming.", "Genesis 42") ],
      relations: [ r("yaqub", "child"), r("leah", "child"), r("yusuf", "sibling"), r("yusuf-brothers", "kin"), r("dinah", "sibling") ]
    },
    {
      id: "dan", name: "Dan", title: "A Son of Jacob (Dān)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Dan", hebrew: "דָּן (Dān)", tradition: "دان (Dān)" },
      archetypes: ["faithful-companion"],
      lessons: ["Father of one of the twelve tribes of Israel."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Dan, son of Jacob by Bilhah, founder of the tribe of Dan.", "Genesis 30; Genesis 49", "Genesis"),
        b("torah", "Dān, blessed by Yaʿaqov as one who would judge his people.", "Bereshit 30; 49", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("bilhah", "child"), r("naphtali", "sibling"), r("yusuf-brothers", "kin"), r("asbat-bani-israil", "ancestor") ]
    },
    {
      id: "naphtali", name: "Naphtali", title: "A Son of Jacob (Naftālī)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Naphtali", hebrew: "נַפְתָּלִי (Naftālī)", tradition: "نفتالي (Naftālī)" },
      archetypes: ["faithful-companion"],
      lessons: ["Father of one of the twelve tribes of Israel."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Naphtali, son of Jacob by Bilhah, founder of the tribe of Naphtali.", "Genesis 30; Genesis 49", "Genesis"),
        b("torah", "Naftālī, likened by Yaʿaqov to a doe let loose, bearing goodly words.", "Bereshit 30; 49", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("bilhah", "child"), r("dan", "sibling"), r("yusuf-brothers", "kin"), r("asbat-bani-israil", "ancestor") ]
    },
    {
      id: "gad", name: "Gad", title: "A Son of Jacob (Jād)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Gad", hebrew: "גָּד (Gād)", tradition: "جاد (Jād)" },
      archetypes: ["faithful-companion"],
      lessons: ["Father of one of the twelve tribes of Israel."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Gad, son of Jacob by Zilpah, founder of the tribe of Gad.", "Genesis 30; Genesis 49", "Genesis"),
        b("torah", "Gād, of whom Yaʿaqov said a troop would press him, yet he would overcome at the last.", "Bereshit 30; 49", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("zilpah", "child"), r("asher", "sibling"), r("yusuf-brothers", "kin"), r("asbat-bani-israil", "ancestor") ]
    },
    {
      id: "asher", name: "Asher", title: "A Son of Jacob (Āshīr)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Asher", hebrew: "אָשֵׁר (Āshēr)", tradition: "آشير (Āshīr)" },
      archetypes: ["faithful-companion"],
      lessons: ["Father of one of the twelve tribes of Israel."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Asher, son of Jacob by Zilpah, founder of the tribe of Asher.", "Genesis 30; Genesis 49", "Genesis"),
        b("torah", "Āshēr, of whom it was said his bread would be rich, yielding royal dainties.", "Bereshit 30; 49", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("zilpah", "child"), r("gad", "sibling"), r("yusuf-brothers", "kin"), r("asbat-bani-israil", "ancestor") ]
    },
    {
      id: "issachar", name: "Issachar", title: "A Son of Jacob (Yassākhir)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Issachar", hebrew: "יִשָּׂשכָר (Yissāskhār)", tradition: "يساكر" },
      archetypes: ["faithful-companion"],
      lessons: ["Father of one of the twelve tribes of Israel."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Issachar, son of Jacob by Leah, founder of the tribe of Issachar.", "Genesis 30; Genesis 49", "Genesis"),
        b("torah", "Yissāskhār, likened by Yaʿaqov to a strong ass bowing to bear his burden.", "Bereshit 30; 49", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("leah", "child"), r("zebulun", "sibling"), r("yusuf-brothers", "kin"), r("asbat-bani-israil", "ancestor") ]
    },
    {
      id: "zebulun", name: "Zebulun", title: "A Son of Jacob (Zābulūn)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "Zebulun", hebrew: "זְבוּלֻן (Zᵉvūlun)", tradition: "زبولون" },
      archetypes: ["faithful-companion"],
      lessons: ["Father of one of the twelve tribes of Israel."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Zebulun, son of Jacob by Leah, founder of the tribe of Zebulun, dwelling by the sea.", "Genesis 30; Genesis 49", "Genesis"),
        b("torah", "Zᵉvūlun, of whom Yaʿaqov said he would dwell at the haven of the sea.", "Bereshit 30; 49", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("leah", "child"), r("issachar", "sibling"), r("yusuf-brothers", "kin"), r("asbat-bani-israil", "ancestor") ]
    },
    {
      id: "dinah", name: "Dinah", title: "The Daughter of Jacob (Dīnah)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "supporting",
      names: { bible: "Dinah", hebrew: "דִּינָה (Dīnāh)", tradition: "دينة (Dīnah)" },
      archetypes: ["oppressed"],
      story: [
        "Dinah, the daughter of Jacob and Leah, went out to see the women of the land and was violated by Shechem, a prince of the region. The wrong done to her set off her brothers Simeon and Levi, who took terrible vengeance on the city. Her story stands in Genesis as a sober account of an injured daughter and the spiral of violence that followed."
      ],
      lessons: ["Scripture does not hide the suffering of the wronged."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Dinah, daughter of Jacob and Leah, wronged at Shechem, whose brothers avenged her.", "Genesis 30; Genesis 34", "Genesis"),
        b("torah", "Dīnāh, the only named daughter of Yaʿaqov, over whom Shimʿōn and Levi rose up.", "Bereshit 34", "Torah")
      ],
      relations: [ r("yaqub", "child"), r("leah", "child"), r("shimon", "sibling"), r("lawi", "sibling") ]
    },

    /* ===================== JUDAH'S HOUSE — TAMAR ===================== */
    {
      id: "tamar-genesis", name: "Tamar", title: "Daughter-in-law of Judah (Tāmār)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "supporting",
      names: { bible: "Tamar", hebrew: "תָּמָר (Tāmār)", tradition: "تامار (Tāmār)" },
      archetypes: ["believing-woman"],
      story: [
        "Tamar married into the house of Judah but was left a childless widow, denied the right of offspring through her late husband's line. Wronged and overlooked, she acted boldly to claim what was due to her, and when the truth came to light Judah declared, 'She is more righteous than I.' From her sons Perez and Zerah descended the royal line — the lineage that would lead to David and beyond."
      ],
      lessons: ["The one treated unjustly was vindicated, and her line became a throne."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Tamar, widowed daughter-in-law of Judah, vindicated as righteous and mother of Perez, ancestor of David.", "Genesis 38", "Genesis"),
        b("torah", "Tāmār, of whom Yehudah confessed, 'She is more righteous than I,' bearing Peretz and Zeraḥ.", "Bereshit 38", "Torah")
      ],
      encounters: [ enc("yahudha", "Judah acknowledged her as more righteous than himself.", "Genesis 38") ],
      relations: [ r("yahudha", "kin"), r("dawud", "ancestor") ]
    },

    /* ===================== LOT'S DAUGHTERS ===================== */
    {
      id: "daughters-of-lot", name: "Daughters of Lot", title: "Those Who Fled Sodom (Banāt Lūṭ)",
      named: false, era: "Patriarchs", group: "Genesis", depth: "minor",
      names: { bible: "the daughters of Lot", hebrew: "בְּנוֹת לוֹט (Bᵉnōt Lōṭ)", tradition: "بنات لوط" },
      archetypes: ["oppressed"],
      lessons: ["Spared from the overthrow, they survived where a city perished.",
                "Ancestresses of Moab and Ammon in the Genesis account."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "The daughters of Lot, led out of Sodom before its destruction; from them came Moab and Ammon.", "Genesis 19", "Genesis"),
        b("torah", "The bᵉnōt Lōṭ, brought out by the angels and spared the overthrow of the cities.", "Bereshit 19", "Torah")
      ],
      relations: [ r("lut", "child"), r("lut-wife", "child") ]
    }

  );
})();
