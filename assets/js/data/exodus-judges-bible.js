/* People of the Quran — Exodus to Judges (Bible & Torah) */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(

    /* ===================== THE WILDERNESS GENERATION ===================== */
    {
      id: "zipporah", name: "Zipporah", title: "The Wife of Musa (Tzipporah)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "supporting",
      names: { quran: "(unnamed — 'one of his two daughters')", bible: "Zipporah", hebrew: "צִפֹּרָה (Tzippōrāh)", tradition: "صفورا (Ṣafūrā)" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: [
        "When Mūsā fled to Madyan, he found two women holding back their flocks from a crowded well and watered their animals for them. One of them, modest in her approach, came to invite him on her father's behalf, saying, 'My father invites you to reward you for watering our flocks.' The Quran does not name her, but the wider scriptures and tradition remember her as Zipporah, the daughter of the prophet of Madyan, who became the wife of Mūsā.",
        "She bore him sons in the years of his shepherding and stood beside him as he returned toward Egypt and his prophetic calling — the believing companion of the man God would speak to directly."
      ],
      lessons: ["Modesty and courage met at the well of Madyan.",
                "The companion of a prophet shares the long years before the calling, not only the glory after it."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "One of the two daughters of the man of Madyan whom Mūsā helped at the well; her father then offered her in marriage in exchange for years of service.", "Q 28:23–28", "Surah al-Qaṣaṣ"),
        b("bible", "Zipporah, daughter of Jethro the priest of Midian, given to Moses in marriage; mother of Gershom and Eliezer.", "Exodus 2:21–22; Exodus 18:2–6", "Exodus"),
        b("torah", "Tzipporah, daughter of Yitro, wife of Mosheh, who acted swiftly at the lodging place on the road back to Egypt.", "Shemot 2:21; Shemot 4:24–26", "Torah"),
        b("tradition", "Named Ṣafūrā in the commentaries as the daughter of Shuʿayb whom Mūsā married.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [
        enc("musa", "The meeting at the well of Madyan and the marriage that followed.", "Q 28:25–27")
      ],
      relations: [ r("musa", "spouse"), r("shuayb", "child") ]
    },
    {
      id: "amram", name: "Amram", title: "The Father of Musa and Harun (Amram)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed)", bible: "Amram", hebrew: "עַמְרָם (ʿAmrām)", tradition: "عمران (ʿImrān, of the line of Lawi)" },
      archetypes: ["faithful-companion"],
      story: [
        "The Quran names the household into which Mūsā and Hārūn were born only through their mother and sister, yet the wider scriptures remember their father as Amram of the tribe of Lawi, a descendant of the priestly line. From his house came the prophet God spoke to, the first high priest, and the prophetess who watched the basket on the Nile."
      ],
      lessons: ["A single household of the oppressed carried three who would lead a people."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Amram of the house of Levi, husband of Jochebed, father of Aaron, Moses and Miriam.", "Exodus 6:18–20; Numbers 26:59", "Exodus · Numbers"),
        b("torah", "ʿAmrām, son of Kehat son of Lēwī, from whose marriage came Aharon and Mosheh.", "Shemot 6:18–20", "Torah"),
        b("tradition", "The line of Mūsā and Hārūn is traced through Lāwī (Levi); the father is named ʿImrān of that tribe, distinct from the ʿImrān father of Maryam.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("musa", "parent"), r("harun", "parent"), r("musa-sister", "parent"), r("musa-mother", "spouse"), r("lawi", "descendant") ]
    },
    {
      id: "eleazar", name: "Eleazar", title: "The Priest Who Succeeded Harun (Eleazar)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Eleazar", hebrew: "אֶלְעָזָר (Elʿāzār)", tradition: "(of the line of Hārūn)" },
      archetypes: ["faithful-companion", "reformer"],
      story: [
        "Among the sons of Hārūn, Eleazar served as a priest in his father's lifetime and, when Hārūn died on the mountain, received his garments and the office of high priest after him. He stood beside Yūshaʿ ibn Nūn at the apportioning of the land and carried the priesthood forward into the generation of the conquest."
      ],
      lessons: ["The robe of one generation's service is handed to the next.",
                "Faithfulness, not only birth, qualified him to inherit the sanctuary."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Eleazar, third son of Aaron, invested with the high priesthood on Aaron's death and standing with Joshua to divide the land.", "Numbers 20:25–28; Joshua 14:1", "Numbers · Joshua"),
        b("torah", "Elʿāzār ben Aharon, who succeeded his father as kohen gadol and ministered through the wilderness years.", "Bemidbar 20:25–28", "Torah"),
        b("tradition", "Counted in the commentaries among the sons of Hārūn who continued the line of service.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("harun", "child"), r("musa", "kin", "nephew"), r("yusha", "ally") ]
    },
    {
      id: "ithamar", name: "Ithamar", title: "The Youngest Son of Harun (Ithamar)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed)", bible: "Ithamar", hebrew: "אִיתָמָר (Īthāmār)", tradition: "(of the line of Hārūn)" },
      archetypes: ["faithful-companion"],
      story: [
        "The youngest of Hārūn's four sons, Ithamar was charged with the oversight of the Levites who carried the sanctuary and its furnishings through the wilderness. When his elder brothers Nadab and Abihu perished before the Lord, he and Eleazar carried on the priestly service."
      ],
      lessons: ["The ordinary, faithful labour of keeping the sanctuary mattered no less than the high office."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Ithamar, youngest son of Aaron, set over the service of the tabernacle and its carriage.", "Exodus 6:23; Numbers 4:28", "Exodus · Numbers"),
        b("torah", "Īthāmār ben Aharon, who ministered with his father and brother and oversaw the Gershonite and Merarite Levites.", "Shemot 38:21; Bemidbar 4:28–33", "Torah"),
        b("tradition", "Listed among the sons of Hārūn in the genealogies preserved by the commentators.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("harun", "child"), r("eleazar", "sibling"), r("musa", "kin", "nephew") ]
    },
    {
      id: "nadab-abihu", name: "Nadab and Abihu", title: "The Sons Consumed by Strange Fire",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed)", bible: "Nadab and Abihu", hebrew: "נָדָב וַאֲבִיהוּא (Nādāv va-Avīhūʼ)" },
      archetypes: ["skeptic"],
      story: [
        "The two eldest sons of Hārūn were granted a rare nearness, ascending with their father and the elders to behold the glory at Sinai. Yet in the very service of the sanctuary they offered 'strange fire' that had not been commanded, and were consumed before the Lord — a warning that nearness to the holy demands obedience, not improvisation."
      ],
      lessons: ["Closeness to the sacred is no licence to act outside its command.",
                "Privilege of birth did not exempt them from the standard of obedience."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Nadab and Abihu, elder sons of Aaron, who offered unauthorised fire before the Lord and died.", "Leviticus 10:1–2; Numbers 3:4", "Leviticus · Numbers"),
        b("torah", "Nādāv and Avihūʼ, who beheld the glory at Sinai yet brought near a foreign fire and were taken.", "Shemot 24:1; Vayikra 10:1–2", "Torah"),
        b("tradition", "Named among the sons of Hārūn in the genealogical reports of the commentators.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("harun", "child"), r("eleazar", "sibling"), r("ithamar", "sibling") ]
    },
    {
      id: "hur", name: "Hur", title: "The Companion Who Held Up Musa's Hands (Hur)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed)", bible: "Hur", hebrew: "חוּר (Ḥūr)" },
      archetypes: ["faithful-companion", "advisor"],
      story: [
        "In the battle against Amalek, when Mūsā's raised hands meant victory and his weariness meant retreat, it was Hūr together with Hārūn who supported his arms from either side until the sun set and the day was won. When Mūsā ascended the mountain, he left the people in the charge of Hārūn and Hūr — a trusted elder of the people."
      ],
      lessons: ["Some serve not by leading but by holding up the hands of the one who leads.",
                "Steadfast support can decide the outcome of a struggle."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Hur, who with Aaron upheld Moses' hands at Rephidim and was left to judge the people during Moses' absence.", "Exodus 17:10–12; Exodus 24:14", "Exodus"),
        b("torah", "Ḥūr, companion of Mosheh and Aharon, set with Aharon over the people at the foot of the mountain.", "Shemot 17:10–12; Shemot 24:14", "Torah"),
        b("tradition", "Remembered among the elders who stood with Mūsā in the wilderness.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("musa", "companion"), r("harun", "companion"), r("bani-israel", "kin") ]
    },
    {
      id: "bezalel", name: "Bezalel", title: "The Craftsman of the Sanctuary (Bezalel)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed)", bible: "Bezalel", hebrew: "בְּצַלְאֵל (Bətzalʼēl)" },
      archetypes: ["faithful-companion"],
      story: [
        "When the sanctuary was to be built in the wilderness, it was Bezalel, filled with skill and wisdom, who was named to fashion the ark, the lampstand and the holy vessels in gold, silver and bronze. His was a craftsmanship offered as worship — the hands that gave form to the place of God's presence among a wandering people."
      ],
      lessons: ["Skill of the hands, devoted to God, is itself a form of service.",
                "The builder is remembered alongside the prophet and the priest."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Bezalel son of Uri, of the tribe of Judah, filled with the Spirit of God to design and craft the tabernacle and its furnishings.", "Exodus 31:1–11; Exodus 35:30–35", "Exodus"),
        b("torah", "Bətzalʼēl, endowed with ḥokhmah for every craft, who made the Mishkan, the ark and the menorah.", "Shemot 31:1–11", "Torah"),
        b("tradition", "Known to the commentators as the master artisan of the sanctuary of Mūsā's people.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("musa", "servant"), r("bani-israel", "kin"), r("yahudha", "descendant") ]
    },
    {
      id: "caleb", name: "Caleb", title: "The Faithful Spy (Caleb)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "supporting",
      names: { quran: "(unnamed — among 'two men who feared God')", bible: "Caleb", hebrew: "כָּלֵב (Kālēv)" },
      archetypes: ["faithful-companion", "truth-seeker"],
      story: [
        "When Mūsā sent scouts into the land and most returned spreading fear of its mighty inhabitants, two men among those who feared God urged the people, 'Enter upon them through the gate, for when you enter it you will be victorious. Put your trust in God, if you are believers.' The wider scriptures name these two as Caleb and Yūshaʿ ibn Nūn — the only ones of that generation permitted to enter the land for their faith.",
        "While the rest of the people refused, saying, 'We will not enter it ever, so long as they are within it,' Caleb held fast to his trust in God, and for it he was promised the very land he had walked as a scout."
      ],
      lessons: ["When the many counsel fear, the faithful few counsel trust.",
                "'Put your trust in God, if you are believers' — confidence rooted in faith, not in numbers."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Two God-fearing men, whom God had favoured, urged the people to enter the gate and trust in God when the rest shrank back in fear.", "Q 5:20–26", "Surah al-Māʼidah"),
        b("bible", "Caleb son of Jephunneh, who with Joshua brought back a faithful report and alone of his generation entered Canaan.", "Numbers 13:30; Numbers 14:6–9; Joshua 14:6–14", "Numbers · Joshua"),
        b("torah", "Kālēv ben Yephunneh, one of the twelve spies, who stilled the people and said, 'We are well able to overcome it.'", "Bemidbar 13–14", "Torah"),
        b("tradition", "Identified by the commentators, with Yūshaʿ, as the two faithful men of the surah of al-Māʼidah.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [
        enc("musa", "Standing with the prophet when the people refused to enter the land.", "Q 5:23"),
        enc("yusha", "The two faithful spies who counselled trust in God.", "Numbers 14:6")
      ],
      relations: [ r("yusha", "ally"), r("musa", "companion"), r("bani-israel", "kin") ]
    },
    {
      id: "dathan-abiram", name: "Dathan and Abiram", title: "Companions of Korah's Rebellion",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed)", bible: "Dathan and Abiram", hebrew: "דָּתָן וַאֲבִירָם (Dāthān va-Avīrām)" },
      archetypes: ["arrogant-elite", "skeptic"],
      story: [
        "When Qārūn (Korah) rose against the leadership of Mūsā, he did not rise alone. Dathan and Abiram of the tribe of Reuben joined the revolt, refusing even to come when Mūsā summoned them and accusing him of setting himself above the assembly. With Korah they and their households were swallowed alive by the earth — the rebellion and its companions sharing one fate."
      ],
      lessons: ["To make common cause with arrogance is to share its ruin.",
                "Contempt for God-given leadership opened the ground beneath their feet."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Dathan and Abiram, who with Korah rebelled against Moses and Aaron and were swallowed by the earth with their households.", "Numbers 16:1–35", "Numbers"),
        b("torah", "Dāthān va-Avīrām of the tribe of Reuven, who said, 'Will you put out the eyes of these men?' and went down alive into the pit.", "Bemidbar 16", "Torah"),
        b("tradition", "Named alongside Qārūn in the accounts of the rebellion against Mūsā.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("musa", "opponent"), r("qarun", "ally"), r("bani-israel", "kin") ]
    },
    {
      id: "balaam", name: "Balaam", title: "The Seer Who Lost His Way (Bilʿam)",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "supporting",
      names: { quran: "(unnamed, by tradition)", bible: "Balaam son of Beor", hebrew: "בִּלְעָם (Bilʿām)", tradition: "بلعام بن باعوراء (Balʿām ibn Bāʿūrāʼ)" },
      archetypes: ["hypocrite", "skeptic"],
      story: [
        "A man given signs of God, the Quran says, slipped away from them, so that Satan pursued him and he became one of the deviators — 'his likeness is that of a dog: if you drive it away it pants, and if you leave it, it pants.' Many commentators identify this man with Balaam son of Beor, the seer of the wilderness narratives.",
        "Hired to curse the Children of Israel, he found that every time he opened his mouth a blessing came out instead, for he could speak only what God put in his mouth. Yet tradition remembers that he later counselled the enticement of the people into sin — knowledge of God turned, in the end, against the people of God."
      ],
      lessons: ["Knowledge of God is no protection when desire pulls the heart the other way.",
                "A tongue meant for blessing can be hired for a curse — and a heart can betray its own gift."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "The man to whom God gave His signs, who then cast them off and followed his desire, becoming one of the lost — likened to a panting dog.", "Q 7:175–176", "Surah al-Aʿrāf"),
        b("bible", "Balaam son of Beor, hired by Balak to curse Israel, whose donkey saw the angel and who could utter only blessing.", "Numbers 22–24; Numbers 31:16", "Numbers"),
        b("torah", "Bilʿām ben Bəʿōr, the seer of Pethor whose oracles turned to blessing and whose counsel later snared Israel at Peʿor.", "Bemidbar 22–24; Bemidbar 31:16", "Torah"),
        b("tradition", "Identified by many commentators as the man of Q 7:175–176, named Balʿām ibn Bāʿūrāʼ.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("musa", "opponent"), r("bani-israel", "opponent") ]
    },
    {
      id: "pharaohs-daughter", name: "Daughter of Pharaoh", title: "She Who Drew Musa from the Nile",
      named: false, era: "Exodus", group: "Bani Israel & Egypt", depth: "minor",
      names: { quran: "(unnamed; the household of Pharaoh)", bible: "the daughter of Pharaoh", hebrew: "בַּת־פַּרְעֹה (bat-Parʿōh)", tradition: "(linked in tafsir to Āsiya)" },
      archetypes: ["believing-woman"],
      story: [
        "The basket bearing the infant Mūsā was lifted from the river by the household of the very tyrant who had ordered the killing of Hebrew sons. In the Quran it is the family of Pharaoh, and his wife Āsiya, who took the child in, saying he might be 'a comfort of the eye' and that they might adopt him. In the Exodus account it is the daughter of Pharaoh who comes down to bathe, sees the child, has compassion on him, and names him Moses, 'for I drew him out of the water.'",
        "Through her compassion the deliverer of an enslaved people was raised in the palace of their oppressor."
      ],
      lessons: ["Mercy in the house of the oppressor preserved the one who would free the oppressed.",
                "God places His instruments where no enemy would think to look."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "The household of Pharaoh picked up the infant from the river, to become for them — though they knew it not — an enemy and a sorrow; the wife of Pharaoh pleaded for his life.", "Q 28:8–9", "Surah al-Qaṣaṣ"),
        b("bible", "The daughter of Pharaoh comes to the river, takes pity on the Hebrew child, and adopts him, naming him Moses.", "Exodus 2:5–10", "Exodus"),
        b("torah", "Bat-Parʿōh, who drew the child from among the reeds and raised him as her son in the palace.", "Shemot 2:5–10", "Torah"),
        b("tradition", "Some commentators connect the one who took in the child with Āsiya, the believing wife of Pharaoh.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("pharaoh", "child"), r("musa", "kin", "drew him from the Nile"), r("asiya", "kin") ]
    },

    /* ===================== THE CONQUEST & JUDGES ===================== */
    {
      id: "othniel", name: "Othniel", title: "The First Judge (Othniel)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "minor",
      names: { quran: "(not mentioned)", bible: "Othniel son of Kenaz", hebrew: "עָתְנִיאֵל (ʿOthnīʼēl)" },
      archetypes: ["reformer", "faithful-companion"],
      story: [
        "After Yūshaʿ and the elders who outlived him had passed, and the people turned again to other gods, the first of the deliverers God raised was Othniel, kinsman of Caleb the faithful spy. The spirit of God came upon him; he judged the people and delivered them, and the land had rest in his days."
      ],
      lessons: ["When a people forgets, God raises a deliverer to call them back.",
                "Faithfulness ran in the line of Caleb into the next generation."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Othniel son of Kenaz, Caleb's younger kinsman, the first judge, upon whom the Spirit of the Lord came to deliver Israel.", "Judges 3:7–11", "Judges"),
        b("torah", "ʿOthnīʼēl, first of the shoftim, who freed Israel from Cushan-Rishathaim, after which the land had rest forty years.", "Shofetim 3:7–11", "Tanakh")
      ],
      relations: [ r("caleb", "kin"), r("yusha", "successor"), r("bani-israel", "ruler") ]
    },
    {
      id: "ehud", name: "Ehud", title: "The Left-Handed Deliverer (Ehud)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "minor",
      names: { quran: "(not mentioned)", bible: "Ehud son of Gera", hebrew: "אֵהוּד (Ēhūd)" },
      archetypes: ["reformer"],
      story: [
        "When the people were again oppressed, this time by Eglon king of Moab, God raised up Ehud, a left-handed man of the tribe of Benjamin. By a bold and solitary act he struck down the oppressor and rallied the people, and the land had rest for many years."
      ],
      lessons: ["God's deliverance often comes through the overlooked and unexpected.",
                "One resolute act can break a long oppression."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Ehud son of Gera, a left-handed Benjaminite, who delivered Israel from Eglon of Moab; the land had rest eighty years.", "Judges 3:12–30", "Judges"),
        b("torah", "Ēhūd, the shofet who freed Israel from Moʼav and blew the shofar in the hill country of Ephraim.", "Shofetim 3:12–30", "Tanakh")
      ],
      relations: [ r("othniel", "successor"), r("bani-israel", "ruler") ]
    },
    {
      id: "deborah", name: "Deborah", title: "The Prophetess Who Judged Israel (Deborah)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "supporting",
      names: { quran: "(not mentioned)", bible: "Deborah", hebrew: "דְּבוֹרָה (Dəvōrāh)" },
      archetypes: ["believing-woman", "reformer", "advisor"],
      story: [
        "Deborah, a prophetess, judged Israel in the days of Jabin's oppression, sitting beneath her palm tree where the people came to her for judgement. She summoned Barak and commanded him in the name of God to face the army of Sisera, and when he would go only if she went with him, she went — and the victory, she foretold, would come by the hand of a woman.",
        "After the deliverance she sang one of the oldest songs of scripture, a hymn of God's triumph and the courage of those who answered the call. The land had rest for forty years."
      ],
      lessons: ["Wisdom and prophecy in a woman led a whole people to deliverance.",
                "Courage answers the call even when the appointed man hesitates."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Deborah, prophetess and judge, who roused Barak and Israel against Sisera and sang the song of victory.", "Judges 4–5", "Judges"),
        b("torah", "Dəvōrāh ha-neviʼah, who judged Israel beneath her palm and led the deliverance from Yavin and Sisra.", "Shofetim 4–5", "Tanakh")
      ],
      relations: [ r("barak", "ally"), r("ehud", "successor"), r("bani-israel", "ruler") ]
    },
    {
      id: "barak", name: "Barak", title: "The Captain Who Followed the Prophetess (Barak)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "minor",
      names: { quran: "(not mentioned)", bible: "Barak son of Abinoam", hebrew: "בָּרָק (Bārāq)" },
      archetypes: ["faithful-companion"],
      story: [
        "Barak son of Abinoam was the commander summoned by Deborah to lead ten thousand men against the iron chariots of Sisera. He would go only if the prophetess went with him, and so the honour of the day passed to a woman; yet at her word he came down from Mount Tabor and the enemy was routed before him."
      ],
      lessons: ["Faith may be real even when it leans on another for courage.",
                "Obedience to God's word brought down an army of iron chariots."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Barak son of Abinoam, who at Deborah's call led Israel to defeat Sisera and the host of Jabin.", "Judges 4:6–16; Judges 5:1", "Judges"),
        b("torah", "Bārāq ben Avinoʿam, who descended from Har Tavor and put the army of Sisra to flight.", "Shofetim 4:6–16", "Tanakh")
      ],
      relations: [ r("deborah", "ally"), r("bani-israel", "kin") ]
    },
    {
      id: "gideon", name: "Gideon", title: "The Reluctant Deliverer (Gideon)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "supporting",
      names: { quran: "(not mentioned; the river-test echoes Talut)", bible: "Gideon / Jerubbaal", hebrew: "גִּדְעוֹן (Gidʿōn)" },
      archetypes: ["reformer", "truth-seeker"],
      story: [
        "Called while threshing wheat in secret for fear of Midian, Gideon doubted at first — 'if the Lord is with us, why has all this befallen us?' — and asked for signs before he would believe. Once persuaded, he tore down his father's altar to Baal and gathered an army against the raiders.",
        "But the host was too many, lest the people boast of their own strength; so they were tested at the water, and only those who lapped from their hands — three hundred — were kept. With these few and with trumpets and torches God gave the victory. The trial at the river echoes the test of Ṭālūt's army in the Quran, where 'how many a small company has overcome a great company by God's leave.'"
      ],
      lessons: ["God gives victory by the few, that none may claim it as their own.",
                "Even a doubter who tears down the idols can become a deliverer."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Gideon, who threw down the altar of Baal and, with three hundred men chosen at the water, routed Midian.", "Judges 6–8", "Judges"),
        b("torah", "Gidʿōn (Yerubaʿal), whose three hundred lappers overthrew Midyan with shofar and torch.", "Shofetim 6–8", "Tanakh"),
        b("tradition", "Commentators note the parallel between the water-test of Gideon and the river-test of Ṭālūt's army in Q 2:249.", "Ibn Kathir", "Tafsir")
      ],
      encounters: [
        enc("talut", "The water-test of the army echoes the trial of Ṭālūt before the battle with Jālūt.", "Q 2:249")
      ],
      relations: [ r("deborah", "successor"), r("talut", "contemporary", "shared the river-test motif"), r("bani-israel", "ruler") ]
    },
    {
      id: "jephthah", name: "Jephthah", title: "The Outcast Who Led (Jephthah)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "minor",
      names: { quran: "(not mentioned)", bible: "Jephthah the Gileadite", hebrew: "יִפְתָּח (Yiphtāḥ)" },
      archetypes: ["reformer"],
      story: [
        "Driven out by his own kin, Jephthah the Gileadite was called back in the hour of danger to lead Israel against the Ammonites. He delivered the people, but bound himself by a rash vow whose cost fell upon his own household — a warning, in the scriptures, against vows uttered without thought before God."
      ],
      lessons: ["The one cast out may be the one God calls to deliver.",
                "A vow made in haste can bring grief upon one's own house."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Jephthah the Gileadite, an outcast recalled to lead Israel against Ammon, bound by a tragic vow.", "Judges 11–12", "Judges"),
        b("torah", "Yiphtāḥ ha-Gilʿādi, the shofet who defeated Bənei ʿAmmon after his rash neder.", "Shofetim 11–12", "Tanakh")
      ],
      relations: [ r("gideon", "successor"), r("bani-israel", "ruler") ]
    },
    {
      id: "samson", name: "Samson", title: "The Strong Man Set Apart (Shamshun)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "supporting",
      names: { quran: "(not mentioned; in some qiṣaṣ)", bible: "Samson", hebrew: "שִׁמְשׁוֹן (Shimshōn)", tradition: "شمشون (Shamshūn)" },
      archetypes: ["reformer", "faithful-companion"],
      story: [
        "Born to a barren woman by the promise of an angel, Samson was a Nazirite from the womb, set apart to God, his uncut hair the sign of his vow and the seat of his great strength. With it he judged Israel and struck again and again at the Philistines who oppressed them.",
        "But his strength was undone by his own desires: when Delilah coaxed from him the secret of his hair and it was shorn, his power left him, and the Philistines blinded and bound him. In his last act, his hair grown again, he prayed for strength once more and pulled down the pillars of their temple upon himself and them — gaining in death more than he had in life. He is remembered in some Islamic qiṣaṣ as Shamshūn, the warrior of long endurance against the enemies of his people."
      ],
      lessons: ["Great strength is no protection against unguarded desire.",
                "Even after failure, a sincere return to God can redeem the final hour."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Samson the Nazirite, whose strength lay in his uncut hair, who judged Israel and at last pulled down the temple of Dagon.", "Judges 13–16", "Judges"),
        b("torah", "Shimshōn, the nazir from the womb, last of the great shoftim against the Pəlishtim.", "Shofetim 13–16", "Tanakh"),
        b("tradition", "Recounted in some qiṣaṣ al-anbiyāʼ literature as Shamshūn, a long-suffering warrior for God against an oppressing people.", "Qisas al-Anbiya", "Tradition")
      ],
      encounters: [
        enc("delilah", "The secret of his strength coaxed away, and his downfall.", "Judges 16:4–21")
      ],
      relations: [ r("delilah", "opponent"), r("jephthah", "successor"), r("bani-israel", "kin") ]
    },
    {
      id: "delilah", name: "Delilah", title: "She Who Coaxed the Secret (Delilah)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "minor",
      names: { quran: "(not mentioned)", bible: "Delilah", hebrew: "דְּלִילָה (Dəlīlāh)" },
      archetypes: ["hypocrite"],
      story: [
        "Loved by Samson, Delilah was paid by the lords of the Philistines to discover the secret of his strength. She pressed him day after day until he told her that his power lay in his unshorn hair, and while he slept she had it cut and delivered him bound to his enemies — affection turned into the instrument of betrayal."
      ],
      lessons: ["Intimacy bought by an enemy becomes a trap.",
                "Persistence turned to a wrong end can bring down even the strong."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Delilah, bribed by the Philistine lords, who wore down Samson until he revealed the secret of his strength.", "Judges 16:4–21", "Judges"),
        b("torah", "Dəlīlāh, who betrayed Shimshōn into the hands of the Pəlishtim for silver.", "Shofetim 16", "Tanakh")
      ],
      relations: [ r("samson", "opponent") ]
    },
    {
      id: "eli", name: "Eli", title: "The Priest at Shiloh (Eli)",
      named: false, era: "The Conquest & Judges", group: "The Conquest & Judges", depth: "minor",
      names: { quran: "(not mentioned)", bible: "Eli", hebrew: "עֵלִי (ʿĒlī)" },
      archetypes: ["advisor"],
      story: [
        "Eli was priest and judge at Shiloh, keeper of the sanctuary in the days before the kingdom. It was to him that the child Samuel — the Shamwīl of the Quranic tradition, the prophet who would later anoint Ṭālūt — was brought and under whom he was raised. Yet Eli failed to restrain the corruption of his own sons, and the priesthood passed from his house with the loss of the ark."
      ],
      lessons: ["He raised up a prophet but could not correct his own sons.",
                "Leniency toward wrong in one's household can cost a whole inheritance."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Eli, priest and judge at Shiloh, mentor of the boy Samuel, whose house was judged for the sins of his sons.", "1 Samuel 1–4", "1 Samuel"),
        b("torah", "ʿĒlī ha-kohen, who ministered at Shiloh and under whom Shemuʼel was raised.", "Shemuʼel Aleph 1–4", "Tanakh"),
        b("tradition", "Linked to the boyhood of Shamwīl (Samuel), the prophet who later appointed Ṭālūt as king.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("shamwil", "teacher"), r("samson", "successor"), r("bani-israel", "ruler") ]
    }

  );
})();
