/* People of the Quran — Further Prophets & Kings */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(

    /* ===================== HOUSE OF YAQUB — SONS & WIVES ===================== */
    {
      id: "rahil", name: "Rahil", title: "The Beloved Wife of Yaqub (Rachel)",
      named: false, era: "Patriarchs", group: "House of Yaqub", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Rachel", hebrew: "רָחֵל (Rāḥēl)", tradition: "راحيل (Rāḥīl)" },
      archetypes: ["believing-woman"],
      story: [
        "In the biblical and Jewish accounts she is the beloved wife of Yaʿqūb, for whom he laboured many years, and the mother of Yūsuf and Binyāmīn — the two sons set apart in the Quranic story. She died giving birth to Binyāmīn. The Quran does not name Yaʿqūb's wives, but tradition remembers her as the mother of the brother Yūsuf loved most."
      ],
      lessons: ["A mother's two sons became the heart of the most beautiful story."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Rachel, the beloved wife of Jacob, mother of Joseph and Benjamin, who died bearing her second son.", "Genesis 29–30; Genesis 35", "Genesis"),
        b("torah", "Rāḥēl, for whom Yaʿaqov served Lavan, weeping bitterly for her children in the words of the prophet.", "Bereshit 29–35; Yirmeyahu 31", "Torah · Tanakh"),
        b("tradition", "Named in the commentaries as the mother of Yūsuf and Binyāmīn, the full brothers among the twelve.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("yaqub", "spouse"), r("yusuf", "parent"), r("binyamin", "parent"), r("leah", "sibling") ]
    },
    {
      id: "leah", name: "Leah", title: "The Mother of Many Tribes (Leah)",
      named: false, era: "Patriarchs", group: "House of Yaqub", depth: "minor",
      names: { quran: "(unnamed)", bible: "Leah", hebrew: "לֵאָה (Lēʼāh)", tradition: "ليا (Līyā)" },
      archetypes: ["believing-woman"],
      lessons: ["From her line came the priesthood of Lawi and the kingship of Yahudha."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Leah, the elder daughter of Laban and wife of Jacob, mother of Reuben, Levi, Judah and others.", "Genesis 29–30", "Genesis"),
        b("torah", "Lēʼāh, ancestress of the tribes of Levi and Judah, from whom priesthood and kingship descend.", "Bereshit 29–30", "Torah"),
        b("tradition", "Remembered as a wife of Yaʿqūb and mother of several of the twelve fathers of the tribes.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("yaqub", "spouse"), r("rahil", "sibling"), r("bani-israel", "ancestor") ]
    },
    {
      id: "rubil", name: "Rubil", title: "The Eldest Brother (Reuben)",
      named: false, era: "Patriarchs", group: "House of Yaqub", depth: "supporting",
      names: { quran: "(unnamed — 'the eldest of them')", bible: "Reuben", hebrew: "רְאוּבֵן (Rēʼūvēn)", tradition: "رُوبيل (Rūbīl)" },
      archetypes: ["repentant"],
      story: [
        "When the brothers plotted against Yūsuf, it was the eldest who urged them not to kill him but to cast him into the well, so that a caravan might take him — sparing his life. Later, when the brothers could not return Binyāmīn to their father, the eldest stayed behind in Egypt in shame, unwilling to face Yaʿqūb without him. Tradition names him Rūbīl, the Reuben of the Bible."
      ],
      lessons: ["Even among the jealous, one voice can plead for mercy.",
                "He would not return to his father in failure."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "One brother said, 'Do not kill Yūsuf, but cast him into the well'; later the eldest refuses to leave Egypt until his father permits or God decides.", "Q 12:10; Q 12:80", "Surah Yūsuf"),
        b("bible", "Reuben, Jacob's firstborn, tries to save Joseph from his brothers, planning to return him to their father.", "Genesis 37; Genesis 42", "Genesis"),
        b("torah", "Rēʼūvēn, the firstborn of Yaʿaqov and Lēʼāh, who sought to deliver Yosef from the pit.", "Bereshit 37; Bereshit 42", "Torah"),
        b("tradition", "Identified by the commentators as the brother who counselled against killing Yūsuf.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("yusuf", "Pleaded that he be cast into the well rather than killed.", "Q 12:10") ],
      relations: [ r("yaqub", "child"), r("yusuf", "sibling"), r("yusuf-brothers", "kin"), r("leah", "child") ]
    },
    {
      id: "yahudha", name: "Yahudha", title: "The Brother Who Stood Surety (Judah)",
      named: false, era: "Patriarchs", group: "House of Yaqub", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Judah", hebrew: "יְהוּדָה (Yehūdāh)", tradition: "يهوذا (Yahūdhā)" },
      archetypes: ["repentant"],
      story: [
        "Among the brothers of Yūsuf, Judah is remembered in the wider scriptures as the one who proposed selling Yūsuf rather than killing him, and who later pledged himself as surety for Binyāmīn before their father, offering his own freedom in the boy's place. From his line, the Torah teaches, descend the kings of Israel and the house of Dāwūd."
      ],
      lessons: ["A pledge of surety can redeem an earlier wrong.",
                "From his tribe came the throne of Dāwūd."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Judah persuades his brothers to sell Joseph and later offers himself in Benjamin's place; the kingly line of David springs from his tribe.", "Genesis 37; Genesis 44; Matthew 1", "Genesis · Matthew"),
        b("torah", "Yehūdāh, fourth son of Yaʿaqov and Lēʼāh, ancestor of the royal tribe from which kingship would not depart.", "Bereshit 37–44; Bereshit 49", "Torah"),
        b("tradition", "Counted among the brothers of Yūsuf; his descendants are linked in tradition to the later kings of the Children of Israel.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("yaqub", "child"), r("yusuf", "sibling"), r("yusuf-brothers", "kin"), r("leah", "child"), r("dawud", "ancestor") ]
    },
    {
      id: "lawi", name: "Lawi", title: "Father of the Priestly Line (Levi)",
      named: false, era: "Patriarchs", group: "House of Yaqub", depth: "minor",
      names: { quran: "(unnamed)", bible: "Levi", hebrew: "לֵוִי (Lēwī)", tradition: "لاوي (Lāwī)" },
      archetypes: ["faithful-companion"],
      lessons: ["From his line came Mūsā, Hārūn and the keepers of the sanctuary."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Levi, third son of Jacob, ancestor of the priestly tribe and of Moses and Aaron.", "Genesis 29; Exodus 6", "Genesis · Exodus"),
        b("torah", "Lēwī, forefather of the kohanim and the Levites who served the sanctuary.", "Bereshit 29; Shemot 6", "Torah"),
        b("tradition", "Named among the twelve sons of Yaʿqūb; the line of Mūsā and Hārūn is traced back to him.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("yaqub", "child"), r("yusuf", "sibling"), r("yusuf-brothers", "kin"), r("leah", "child"), r("musa", "ancestor"), r("harun", "ancestor") ]
    },

    /* ===================== EGYPT — THE KING OF YUSUF'S DAY ===================== */
    {
      id: "pharaoh-yusuf", name: "The King of Egypt", title: "The Ruler of Yusuf's Day (the Pharaoh of Joseph)",
      named: false, era: "Patriarchs", group: "House of Yaqub", depth: "supporting",
      names: { quran: "الْمَلِك (al-Malik) — 'the King'", bible: "Pharaoh", hebrew: "פַּרְעֹה (Parʿōh)" },
      archetypes: ["advisor"],
      story: [
        "The Quran is precise in its language: the ruler of Yūsuf's day is called al-Malik, 'the King,' not Pharaoh — distinguishing him from the tyrant of Mūsā's era. Troubled by a dream of seven fat cows devoured by seven lean ones, and seven green ears beside seven withered, he could find none to interpret it until Yūsuf, still in prison, read it as seven years of plenty followed by seven of famine. Recognising wisdom and integrity, the King raised Yūsuf to authority over the storehouses of the land, and the prophet's foresight saved Egypt and the surrounding peoples from starvation."
      ],
      lessons: ["A ruler honoured for heeding wisdom over pride.",
                "The Quran calls him 'the King,' not Pharaoh — a deliberate distinction."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Titled 'the King'; his dream of the cows and ears is interpreted by Yūsuf, whom he then sets over the treasures of the land.", "Q 12:43–56", "Surah Yūsuf"),
        b("bible", "Pharaoh dreams of the cattle and the corn; Joseph interprets it and is made second over all Egypt.", "Genesis 41", "Genesis"),
        b("torah", "Parʿōh of Yosef's day, who set him over the land after the dream of the famine.", "Bereshit 41", "Torah"),
        b("tradition", "Commentators note the Quran's careful use of 'al-Malik' for this just ruler, reserving 'Firʿawn' for the oppressor of Mūsā's time.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("yusuf", "The dream of the seven years, and Yūsuf's rise over the storehouses.", "Q 12:54–55") ],
      relations: [ r("yusuf", "ruler"), r("aziz", "kin", "the court of Egypt"), r("pharaoh", "contemporary", "a distinct, earlier ruler from Mūsā's Pharaoh") ]
    },

    /* ===================== KINGDOM — THE PROPHET WHO ANOINTED THE KING ===================== */
    {
      id: "shamwil", name: "Shamwil", title: "The Prophet Who Named the King (Samuel)",
      named: false, era: "Kingdom", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed — 'a prophet of theirs')", bible: "Samuel", hebrew: "שְׁמוּאֵל (Shemūʼēl)", tradition: "شَمْوِيل (Shamwīl)" },
      archetypes: ["prophet", "advisor"],
      story: [
        "After the time of Mūsā, the chiefs of the Children of Israel asked a prophet of theirs to appoint a king to lead them in battle. When God named Ṭālūt (Saul), they objected that he had neither wealth nor noble birth; the prophet answered that God had chosen him and increased him in knowledge and stature, and that the sign of his kingship would be the return of the Ark. Tradition identifies this prophet as Shamwīl — the Samuel who anointed the first king of Israel."
      ],
      lessons: ["God chooses by knowledge and capacity, not by lineage or wealth.",
                "The prophet appoints the king, but the kingdom is God's to give."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "A prophet of the Children of Israel conveys God's appointment of Ṭālūt as king, with the Ark as a sign.", "Q 2:246–248", "Surah al-Baqarah"),
        b("bible", "Samuel, the last judge, anoints Saul and later David as kings over Israel.", "1 Samuel 8–16", "1 Samuel"),
        b("torah", "Shemūʼēl, dedicated to God from childhood, who anointed the first kings at the people's demand.", "Shemuel Aleph 1–16", "Tanakh"),
        b("tradition", "The commentators name the unnamed prophet of this passage as Shamwīl (Samuel).", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("talut", "Conveyed God's choice of him as king, and the sign of the Ark.", "Q 2:247–248") ],
      relations: [ r("talut", "advisor"), r("dawud", "teacher"), r("bani-israel", "kin") ]
    },

    /* ===================== OTHER PROPHETS OF BANI ISRAEL ===================== */
    {
      id: "hizqil", name: "Hizqil", title: "The Prophet of the Dry Bones (Ezekiel)",
      named: false, era: "Other Prophets", group: "Other Prophets & Sages", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Ezekiel", hebrew: "יְחֶזְקֵאל (Yeḥezqēʼl)", tradition: "حِزْقِيل (Ḥizqīl)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Tradition counts Ḥizqīl (Ezekiel) among the prophets sent to the Children of Israel, and many commentators connect him to the Quranic passage of those who fled their homes in their thousands fearing death, whom God caused to die and then revived. In the Bible he prophesies in the exile, and is given the vision of a valley of dry bones brought back to life — a sign of the resurrection of a scattered people."
      ],
      lessons: ["The dead bones of a people can be raised to life again by God.",
                "Exile is not the end of a covenant."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Connected by commentators to those who left their homes in their thousands fearing death, whom God said to die and then revived.", "Q 2:243", "Surah al-Baqarah"),
        b("bible", "Ezekiel prophesies among the exiles and sees the valley of dry bones clothed again with life.", "Ezekiel 1; Ezekiel 37", "Ezekiel"),
        b("torah", "Yeḥezqēʼl, priest and prophet of the Babylonian exile.", "Yechezqel 1–37", "Tanakh"),
        b("tradition", "Named in the commentaries among the prophets of the Children of Israel, often identified with the revival in Q 2:243.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("bani-israel", "kin"), r("dhul-kifl", "kin", "sometimes identified with Ezekiel in tradition") ]
    },
    {
      id: "shaya", name: "Shaya", title: "The Prophet of the Coming Servant (Isaiah)",
      named: false, era: "Other Prophets", group: "Other Prophets & Sages", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Isaiah", hebrew: "יְשַׁעְיָהוּ (Yeshaʿyāhū)", tradition: "شَعْيَا (Shaʿyā)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Shaʿyā (Isaiah) is remembered in Islamic tradition among the prophets of the Children of Israel, sent in the days of the kings of Judah to call a wayward people back to justice and trust in God. The Bible preserves his soaring oracles of judgement and consolation, and his foretelling of a servant through whom God's light would reach the nations."
      ],
      lessons: ["A prophet may comfort as well as warn — 'Comfort my people.'",
                "Justice for the oppressed is the worship God seeks."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Isaiah prophesies to Judah, condemns empty ritual without justice, and foretells deliverance and a suffering servant.", "Isaiah 1; Isaiah 40; Isaiah 53", "Isaiah"),
        b("torah", "Yeshaʿyāhū, prophet in Jerusalem in the days of several kings of Judah.", "Yeshayahu 1–66", "Tanakh"),
        b("tradition", "Counted by the commentators among the prophets of the Children of Israel, preaching shortly before the Babylonian exile.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("bani-israel", "kin"), r("armiya", "contemporary", "prophets of the last days of Judah") ]
    },
    {
      id: "armiya", name: "Armiya", title: "The Weeping Prophet of the Exile (Jeremiah)",
      named: false, era: "Other Prophets", group: "Other Prophets & Sages", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Jeremiah", hebrew: "יִרְמְיָהוּ (Yirmeyāhū)", tradition: "إِرْمِيَا (Irmiyā)" },
      archetypes: ["prophet", "reformer", "martyr"],
      story: [
        "Armiyā (Jeremiah) is named in Islamic tradition among the prophets sent to the Children of Israel before the destruction of Jerusalem, warning of the ruin that their turning from God would bring. Some commentators connect him with the figure in the Quran who passed a town fallen into ruin and wondered how God could restore it to life. In the Bible he weeps over the coming exile yet promises a new covenant written upon the heart."
      ],
      lessons: ["A prophet may carry a message his people will not hear.",
                "Beyond ruin God promises a covenant renewed."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Linked by some commentators to the one who passed a ruined town and asked how God could revive it, then was shown the sign of resurrection.", "Q 2:259", "Surah al-Baqarah"),
        b("bible", "Jeremiah warns Judah of the Babylonian conquest, laments the fall of Jerusalem, and foretells a new covenant.", "Jeremiah 1; Jeremiah 31", "Jeremiah · Lamentations"),
        b("torah", "Yirmeyāhū, prophet of the last days of Judah and of the exile.", "Yirmeyahu 1–52", "Tanakh"),
        b("tradition", "Named among the prophets of the Children of Israel about the time of the Babylonian destruction of the temple.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      relations: [ r("bani-israel", "kin"), r("shaya", "contemporary"), r("uzair", "contemporary", "around the exile and return") ]
    },
    {
      id: "daniyal", name: "Daniyal", title: "The Steadfast in Exile (Daniel)",
      named: false, era: "Other Prophets", group: "Other Prophets & Sages", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Daniel", hebrew: "דָּנִיֵּאל (Dāniyyēʼl)", tradition: "دَانْيال (Dānyāl)" },
      archetypes: ["truth-seeker", "faithful-companion"],
      story: [
        "Dānyāl (Daniel) is remembered in Islamic tradition as a righteous figure among the Children of Israel taken into the Babylonian exile, who held to his faith in a foreign court. The Bible tells how God preserved him in the den of lions and gave him the interpretation of kings' dreams and visions of the end of days. The early Muslims are reported to have honoured his memory when his resting place was found in the lands of Persia."
      ],
      lessons: ["Faith can be kept whole even in a king's court and a lion's den.",
                "God gives the meaning of dreams to those who trust Him."],
      sources: ["bible", "torah", "tradition"],
      entries: [
        b("bible", "Daniel, a captive in Babylon, interprets the king's dreams and is delivered unharmed from the lions' den.", "Daniel 1–6", "Daniel"),
        b("torah", "Dāniyyēʼl, the faithful exile granted understanding of visions and dreams.", "Daniyel 1–12", "Tanakh"),
        b("tradition", "Honoured in the commentaries and early accounts as a righteous prophet of the exile, whose grave was reverently reburied in the time of the conquests.", "al-Tabari; Ibn Kathir", "Tafsir · History")
      ],
      relations: [ r("bani-israel", "kin"), r("armiya", "contemporary", "the generation of the exile"), r("uzair", "contemporary") ]
    }

  );
})();
