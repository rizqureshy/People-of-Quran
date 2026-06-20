/* People of the Quran — Prophets, Exile & Return (Bible & Torah) */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(

    /* ===================== THE TWELVE — WRITING PROPHETS ===================== */
    {
      id: "hosea", name: "Hosea", title: "The Prophet of Faithful Love (Hosea)",
      named: false, era: "Divided Kingdom", group: "The Prophets", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Hosea", hebrew: "הוֹשֵׁעַ (Hōšēaʿ)", tradition: "هوشع (Hūshaʿ)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Hosea prophesied in the northern kingdom of Israel in the eighth century before Christ, when the people had turned to idols. Through the image of a faithful spouse betrayed yet still loving, he proclaimed God's enduring tenderness toward a wayward people, calling them back from unfaithfulness to return and be healed."
      ],
      lessons: ["God's mercy outlasts a people's faithlessness, and the door of return is never barred."],
      sources: ["bible"],
      entries: [
        b("bible", "Hosea, who likened Israel's idolatry to a broken marriage and pleaded for the people's return to God.", "Hosea 1; Hosea 14", "Hosea")
      ],
      relations: [ r("bani-israel", "kin"), r("shaya", "contemporary") ]
    },
    {
      id: "joel", name: "Joel", title: "The Prophet of the Day of the Lord (Joel)",
      named: false, era: "Other Prophets", group: "The Prophets", depth: "minor",
      names: { quran: "(unnamed)", bible: "Joel", hebrew: "יוֹאֵל (Yōʼēl)", tradition: "يوئيل (Yūʼīl)" },
      archetypes: ["prophet", "reformer"],
      lessons: ["A locust-stripped land becomes a parable for repentance, and a sign that the merciful turn back even after ruin."],
      sources: ["bible"],
      entries: [
        b("bible", "Joel, who called the people to fast and return with all their hearts, for God is gracious and slow to anger.", "Joel 2", "Joel")
      ],
      relations: [ r("bani-israel", "kin"), r("shaya", "contemporary") ]
    },
    {
      id: "amos", name: "Amos", title: "The Shepherd Prophet of Justice (Amos)",
      named: false, era: "Divided Kingdom", group: "The Prophets", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Amos", hebrew: "עָמוֹס (ʿĀmōs)", tradition: "عاموس (ʿĀmūs)" },
      archetypes: ["prophet", "reformer", "oppressed"],
      story: [
        "Amos was a herdsman of Tekoa, called from tending flocks to proclaim God's word in the northern kingdom. He thundered against those who trampled the poor and bought the needy for a pair of sandals, demanding that justice roll down like waters and righteousness like an ever-flowing stream."
      ],
      lessons: ["Worship without justice is empty; God weighs how a people treats its poor."],
      sources: ["bible"],
      entries: [
        b("bible", "Amos the shepherd, who denounced the oppression of the poor and called for justice to flow like water.", "Amos 1; Amos 5", "Amos")
      ],
      relations: [ r("bani-israel", "kin"), r("shaya", "contemporary"), r("hosea", "contemporary") ]
    },
    {
      id: "obadiah", name: "Obadiah", title: "The Prophet Against Edom's Pride (Obadiah)",
      named: false, era: "Other Prophets", group: "The Prophets", depth: "minor",
      names: { quran: "(unnamed)", bible: "Obadiah", hebrew: "עֹבַדְיָה (ʿŌvaḏyāh)", tradition: "عوبديا (ʿŪbadyā)" },
      archetypes: ["prophet"],
      lessons: ["The pride of the high places brings them low; no fortress shields the arrogant from God."],
      sources: ["bible"],
      entries: [
        b("bible", "Obadiah, whose short vision foretold the humbling of Edom for its pride and its cruelty to its kin.", "Obadiah 1", "Obadiah")
      ],
      relations: [ r("bani-israel", "kin"), r("armiya", "contemporary") ]
    },
    {
      id: "micah", name: "Micah", title: "The Prophet of Mercy and Justice (Micah)",
      named: false, era: "Divided Kingdom", group: "The Prophets", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Micah", hebrew: "מִיכָה (Mīḵāh)", tradition: "ميخا (Mīkhā)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Micah of Moresheth prophesied in Judah in the days of the Assyrian threat. He condemned the corrupt rulers and false prophets who profited from the people, yet held out a vision of peace. He summed the whole of religion in a single line: to do justice, to love mercy, and to walk humbly with God."
      ],
      lessons: ["What God asks is plain — justice, mercy, and a humble walk with Him."],
      sources: ["bible"],
      entries: [
        b("bible", "Micah, who taught that God requires of His servants to act justly, love mercy, and walk humbly with Him.", "Micah 6", "Micah")
      ],
      relations: [ r("bani-israel", "kin"), r("shaya", "contemporary") ]
    },
    {
      id: "nahum", name: "Nahum", title: "The Prophet of Nineveh's Fall (Nahum)",
      named: false, era: "Other Prophets", group: "The Prophets", depth: "minor",
      names: { quran: "(unnamed)", bible: "Nahum", hebrew: "נַחוּם (Naḥūm)", tradition: "ناحوم (Nāḥūm)" },
      archetypes: ["prophet"],
      lessons: ["The city once spared at Yunus's call returns to violence — and judgement comes at last to the unrepentant tyrant."],
      sources: ["bible"],
      entries: [
        b("bible", "Nahum, who foretold the downfall of Nineveh, the Assyrian capital, for its endless cruelty and bloodshed.", "Nahum 1; Nahum 3", "Nahum")
      ],
      relations: [ r("bani-israel", "kin"), r("yunus", "successor"), r("armiya", "contemporary") ]
    },
    {
      id: "habakkuk", name: "Habakkuk", title: "The Prophet Who Questioned God (Habakkuk)",
      named: false, era: "Other Prophets", group: "The Prophets", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Habakkuk", hebrew: "חֲבַקּוּק (Ḥăḇaqqūq)", tradition: "حبقوق (Ḥabaqqūq)" },
      archetypes: ["prophet", "truth-seeker"],
      story: [
        "Habakkuk dared to ask God why the wicked seemed to prosper and why violence went unanswered. In return he was given a vision and a promise: that the appointed time would surely come, and that the righteous would live by their faith — waiting in trust even when justice seemed delayed."
      ],
      lessons: ["The righteous live by faith, trusting God's timing even when His justice seems delayed."],
      sources: ["bible"],
      entries: [
        b("bible", "Habakkuk, who questioned God over the triumph of the wicked and was answered that the just shall live by faith.", "Habakkuk 1; Habakkuk 2", "Habakkuk")
      ],
      relations: [ r("bani-israel", "kin"), r("armiya", "contemporary") ]
    },
    {
      id: "zephaniah", name: "Zephaniah", title: "The Prophet of the Coming Day (Zephaniah)",
      named: false, era: "Other Prophets", group: "The Prophets", depth: "minor",
      names: { quran: "(unnamed)", bible: "Zephaniah", hebrew: "צְפַנְיָה (Ṣəp̄anyāh)", tradition: "صفنيا (Ṣafanyā)" },
      archetypes: ["prophet", "reformer"],
      lessons: ["The humble who seek God are sheltered on the day of reckoning; pride finds no refuge."],
      sources: ["bible"],
      entries: [
        b("bible", "Zephaniah, who warned of the day of the Lord and urged the humble of the land to seek righteousness.", "Zephaniah 1; Zephaniah 2", "Zephaniah")
      ],
      relations: [ r("bani-israel", "kin"), r("armiya", "contemporary") ]
    },
    {
      id: "haggai", name: "Haggai", title: "The Prophet of the Rebuilt Temple (Haggai)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Haggai", hebrew: "חַגַּי (Ḥaggay)", tradition: "حجاي (Ḥajjāy)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "After the return from Babylon, the people had rebuilt their own homes but left the House of God in ruins. Haggai rose among the returned exiles to rouse the governor Zerubbabel and the people to take up the work again, promising that the glory of the latter temple would surpass the former."
      ],
      lessons: ["Rebuilding the worship of God comes before private comfort; His house must not lie in ruins."],
      sources: ["bible"],
      entries: [
        b("bible", "Haggai, who stirred the returned exiles under Zerubbabel to rebuild the temple in Jerusalem.", "Haggai 1; Haggai 2", "Haggai")
      ],
      relations: [ r("bani-israel", "kin"), r("uzair", "contemporary"), r("zerubbabel", "ally") ]
    },
    {
      id: "zechariah-prophet", name: "Zechariah", title: "The Prophet of Visions After the Exile (Zechariah)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed — not Zakariyyā, father of Yaḥyā)", bible: "Zechariah", hebrew: "זְכַרְיָה (Zəḵaryāh)", tradition: "زكريا النبي (Zakariyyā al-nabī)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "A contemporary of Haggai among the returned exiles, this Zechariah — distinct from Zakariyyā the father of Yaḥyā — urged on the rebuilding of the temple through a series of night visions. He proclaimed a coming king, lowly and riding upon a donkey, who would bring peace to the nations."
      ],
      lessons: ["Hope is renewed for a scattered people: God remembers His covenant and a king of peace will come."],
      sources: ["bible"],
      entries: [
        b("bible", "Zechariah, the prophet of the return, whose visions encouraged the rebuilding and foretold a humble king of peace.", "Zechariah 1; Zechariah 9", "Zechariah")
      ],
      relations: [ r("bani-israel", "kin"), r("haggai", "contemporary"), r("zerubbabel", "ally"), r("uzair", "contemporary") ]
    },
    {
      id: "malachi", name: "Malachi", title: "The Last of the Twelve (Malachi)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Malachi", hebrew: "מַלְאָכִי (Malʼāḵī)", tradition: "ملاخي (Malākhī)" },
      archetypes: ["prophet", "reformer"],
      story: [
        "Malachi, whose name means 'my messenger,' was the last of the writing prophets of the older covenant. He rebuked careless worship and broken faith among the people after the return, and closed his prophecy with the promise of a messenger who would prepare the way before the coming of the great day of God."
      ],
      lessons: ["Faithfulness in worship and in the home honours God; He promises a messenger to come before His day."],
      sources: ["bible"],
      entries: [
        b("bible", "Malachi, the final prophet of the twelve, who promised a messenger to prepare the way of the Lord.", "Malachi 3; Malachi 4", "Malachi")
      ],
      relations: [ r("bani-israel", "kin"), r("uzair", "contemporary"), r("zechariah-prophet", "successor") ]
    },

    /* ===================== EXILE & RETURN — BABYLON & PERSIA ===================== */
    {
      id: "nebuchadnezzar", name: "Nebuchadnezzar", title: "The King of Babylon and the Exile (Nebuchadnezzar)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Nebuchadnezzar", hebrew: "נְבוּכַדְנֶאצַּר (Nəvūḵaḏneʼṣṣar)", tradition: "بخت نصر (Bukhtanaṣṣar)" },
      archetypes: ["tyrant", "arrogant-elite", "repentant"],
      story: [
        "Nebuchadnezzar, king of Babylon, besieged Jerusalem, destroyed the temple, and carried the people of Judah into exile. In the book of Daniel his troubled dreams are interpreted by the captive prophet, and his pride is humbled until he is brought low like a beast of the field — only then confessing the sovereignty of the Most High."
      ],
      lessons: ["The mightiest king is humbled when he forgets that all dominion belongs to God."],
      sources: ["bible"],
      entries: [
        b("bible", "Nebuchadnezzar, who took Judah into exile, was humbled in his pride, and acknowledged the rule of the Most High.", "Daniel 2; Daniel 4", "Daniel")
      ],
      encounters: [ enc("daniyal", "His dreams were interpreted by the captive prophet, who revealed God's sovereignty.", "Daniel 2") ],
      relations: [ r("daniyal", "opponent"), r("armiya", "contemporary"), r("bani-israel", "opponent"), r("belshazzar", "ancestor") ]
    },
    {
      id: "belshazzar", name: "Belshazzar", title: "The King of the Writing on the Wall (Belshazzar)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Belshazzar", hebrew: "בֵּלְשַׁאצַּר (Bēlšaʼṣṣar)", tradition: "بيلشاصر (Bīlshāṣar)" },
      archetypes: ["tyrant", "arrogant-elite"],
      story: [
        "At a great feast Belshazzar profaned the sacred vessels taken from the temple of Jerusalem. A hand appeared and wrote upon the wall, and Daniel was called to read the words: his kingdom was weighed, found wanting, and numbered for its end. That very night Babylon fell to the Persians."
      ],
      lessons: ["Sacrilege and arrogance are weighed in the balance; the proud kingdom can fall in a single night."],
      sources: ["bible"],
      entries: [
        b("bible", "Belshazzar, who saw the writing on the wall interpreted by Daniel, and whose kingdom fell that very night.", "Daniel 5", "Daniel")
      ],
      encounters: [ enc("daniyal", "Daniel read the writing on the wall that foretold the fall of his kingdom.", "Daniel 5") ],
      relations: [ r("daniyal", "opponent"), r("nebuchadnezzar", "descendant"), r("bani-israel", "opponent") ]
    },
    {
      id: "cyrus", name: "Cyrus the Great", title: "The Liberator of the Exiles (Cyrus)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Cyrus", hebrew: "כּוֹרֶשׁ (Kōreš)", tradition: "كورش (Kūrush)" },
      archetypes: ["reformer", "truth-seeker"],
      story: [
        "Cyrus, king of Persia, overthrew Babylon and issued the decree that freed the captives of Judah to return to Jerusalem and rebuild the House of God. The scriptures honour him as God's instrument, called by name to set the exiles free and restore them to their land."
      ],
      lessons: ["God can raise even a foreign king to deliver the oppressed and fulfil His promise of return."],
      sources: ["bible"],
      entries: [
        b("bible", "Cyrus, king of Persia, who decreed the return of the exiles and the rebuilding of the temple in Jerusalem.", "Ezra 1; Isaiah 45", "Ezra · Isaiah")
      ],
      encounters: [ enc("uzair", "His decree opened the way for the return of the exiles whom Ezra led.", "Ezra 1") ],
      relations: [ r("uzair", "ally"), r("bani-israel", "ally"), r("zerubbabel", "ruler"), r("belshazzar", "opponent") ]
    },
    {
      id: "shadrach-meshach-abednego", name: "Shadrach, Meshach & Abednego", title: "The Three in the Fiery Furnace (Daniel's Companions)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Shadrach, Meshach and Abednego", hebrew: "חֲנַנְיָה מִישָׁאֵל עֲזַרְיָה (Ḥănanyāh, Mīšāʼēl, ʿĂzaryāh)", tradition: "رفقاء دانيال (Companions of Daniyāl)" },
      archetypes: ["faithful-companion", "martyr", "oppressed"],
      story: [
        "Three young men of Judah, companions of Daniel in the Babylonian court, refused to bow before the golden image set up by Nebuchadnezzar. Cast into a furnace heated sevenfold, they were preserved unharmed, and a fourth figure was seen walking with them in the flames — a sign that God delivers those who will not betray their faith."
      ],
      lessons: ["Better the furnace than the idol; God stands beside those who refuse to bow to falsehood."],
      sources: ["bible"],
      entries: [
        b("bible", "The three companions who would not worship the golden image and were preserved unharmed in the fiery furnace.", "Daniel 3", "Daniel")
      ],
      encounters: [ enc("nebuchadnezzar", "Defied his command to worship the golden image and were cast into the furnace.", "Daniel 3") ],
      relations: [ r("daniyal", "companion"), r("nebuchadnezzar", "opponent"), r("bani-israel", "kin") ]
    },
    {
      id: "ahasuerus", name: "Ahasuerus", title: "The King of Persia in Esther's Days (Xerxes)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Ahasuerus", hebrew: "אֲחַשְׁוֵרוֹשׁ (ʼĂḥašwērōš)", tradition: "أحشويرش (Aḥshwīrush) · Xerxes" },
      archetypes: ["arrogant-elite"],
      story: [
        "Ahasuerus, the great king who ruled from India to Cush, deposed his queen Vashti and chose Esther in her place. Through her courage and the wisdom of Mordecai, his royal decree that would have destroyed the exiled people was overturned, and the plot of his vizier Haman was undone."
      ],
      lessons: ["The whim of an absolute king can doom or save a people; providence works even through a royal court."],
      sources: ["bible"],
      entries: [
        b("bible", "Ahasuerus, king of Persia, who raised Esther to be queen and reversed the decree against her people.", "Esther 1; Esther 8", "Esther")
      ],
      relations: [ r("esther", "spouse"), r("vashti", "spouse"), r("haman-agagite", "advisor"), r("mordecai", "ruler"), r("bani-israel", "ruler") ]
    },
    {
      id: "vashti", name: "Vashti", title: "The Queen Who Refused (Vashti)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "minor",
      names: { quran: "(unnamed)", bible: "Vashti", hebrew: "וַשְׁתִּי (Waštī)", tradition: "وشتي (Washtī)" },
      archetypes: ["believing-woman"],
      lessons: ["A queen's refusal to be displayed opens the way, in God's design, for another to rise."],
      sources: ["bible"],
      entries: [
        b("bible", "Vashti, queen of Persia, who refused the king's summons at his feast and was deposed, making way for Esther.", "Esther 1", "Esther")
      ],
      relations: [ r("ahasuerus", "spouse"), r("esther", "contemporary") ]
    },
    {
      id: "esther", name: "Esther", title: "The Queen Who Saved Her People (Esther)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Esther", hebrew: "אֶסְתֵּר (ʼEstēr) · הֲדַסָּה (Hăḏassāh)", tradition: "أستير (Astīr)" },
      archetypes: ["believing-woman", "reformer", "faithful-companion"],
      story: [
        "Esther, a young woman of the Jewish exile raised by her kinsman Mordecai, was chosen as queen of Persia. When Haman plotted to destroy her people, she risked her own life by approaching the king unbidden, declaring, 'If I perish, I perish.' Through her courage the decree was reversed and her people delivered."
      ],
      lessons: ["She was raised to her place for such an hour as this — courage in the right moment saves a people."],
      sources: ["bible"],
      entries: [
        b("bible", "Esther, the exiled queen who risked her life before the king and turned away the destruction of her people.", "Esther 4; Esther 7", "Esther")
      ],
      encounters: [ enc("haman-agagite", "Exposed his plot to destroy her people before the king at the banquet.", "Esther 7") ],
      relations: [ r("mordecai", "kin"), r("ahasuerus", "spouse"), r("haman-agagite", "opponent"), r("bani-israel", "kin"), r("daniyal", "kin") ]
    },
    {
      id: "mordecai", name: "Mordecai", title: "The Guardian of Esther (Mordecai)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Mordecai", hebrew: "מָרְדֳּכַי (Mordŏḵay)", tradition: "مردخاي (Mardakhāy)" },
      archetypes: ["advisor", "faithful-companion", "reformer"],
      story: [
        "Mordecai, a Jew of the Persian exile, raised his orphaned cousin Esther and counselled her when she became queen. He refused to bow to the vizier Haman, exposed a plot against the king's life, and stood firm against the decree of destruction — until in the end he was honoured in the very robes Haman had hoped to wear."
      ],
      lessons: ["Steadfast refusal to bow to the proud, joined to patient counsel, can overturn the deadliest of plots."],
      sources: ["bible"],
      entries: [
        b("bible", "Mordecai, who raised Esther, refused to bow before Haman, and was raised to honour for his loyalty.", "Esther 2; Esther 6", "Esther")
      ],
      encounters: [ enc("haman-agagite", "Refused to bow before him, provoking the plot against the Jews.", "Esther 3") ],
      relations: [ r("esther", "kin"), r("haman-agagite", "opponent"), r("ahasuerus", "advisor"), r("bani-israel", "kin"), r("daniyal", "kin") ]
    },
    {
      id: "haman-agagite", name: "Haman the Agagite", title: "The Persian Vizier Who Plotted Genocide (Haman)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed — not Hāmān, Pharaoh's minister)", bible: "Haman", hebrew: "הָמָן (Hāmān)", tradition: "هامان الأجاجي (Hāmān al-Ajājī)" },
      archetypes: ["tyrant", "arrogant-elite", "hypocrite"],
      story: [
        "Haman the Agagite, vizier to King Ahasuerus and distinct from the Hāmān of Pharaoh's court, was enraged that Mordecai would not bow to him. He cast lots and obtained a decree to destroy all the Jews of the empire, and built a gallows for Mordecai — only to be hanged upon it himself when Esther exposed his plot. His pride became his ruin."
      ],
      lessons: ["The pit dug for the innocent becomes the grave of the one who dug it; pride goes before destruction."],
      sources: ["bible"],
      entries: [
        b("bible", "Haman, vizier of Persia, who plotted to destroy the Jews and was hanged on the gallows he built for Mordecai.", "Esther 3; Esther 7", "Esther")
      ],
      encounters: [ enc("esther", "His plot against her people was exposed at the banquet, sealing his downfall.", "Esther 7") ],
      relations: [ r("mordecai", "opponent"), r("esther", "opponent"), r("ahasuerus", "advisor"), r("bani-israel", "opponent") ]
    },
    {
      id: "zerubbabel", name: "Zerubbabel", title: "The Governor Who Rebuilt the Temple (Zerubbabel)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Zerubbabel", hebrew: "זְרֻבָּבֶל (Zərubbāḇel)", tradition: "زربابل (Zarubābil)" },
      archetypes: ["reformer", "faithful-companion"],
      story: [
        "Zerubbabel, of the royal line of David, led the first company of exiles back from Babylon and laid the foundation of the second temple. Encouraged by the prophets Haggai and Zechariah, he saw the House of God rebuilt — not by might nor by power, but by the Spirit of the Lord."
      ],
      lessons: ["The work of God advances not by might nor by power, but by His Spirit."],
      sources: ["bible"],
      entries: [
        b("bible", "Zerubbabel, governor of Judah, who led the return and rebuilt the temple with the prophets' encouragement.", "Ezra 3; Zechariah 4", "Ezra · Zechariah")
      ],
      relations: [ r("uzair", "contemporary"), r("haggai", "ally"), r("zechariah-prophet", "ally"), r("cyrus", "servant"), r("dawud", "descendant"), r("bani-israel", "kin") ]
    },
    {
      id: "nehemiah", name: "Nehemiah", title: "The Rebuilder of Jerusalem's Walls (Nehemiah)",
      named: false, era: "Exile & Return", group: "Exile & Return", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Nehemiah", hebrew: "נְחֶמְיָה (Nəḥemyāh)", tradition: "نحميا (Naḥmiyā)" },
      archetypes: ["reformer", "advisor", "faithful-companion"],
      story: [
        "Nehemiah, cupbearer to the Persian king, was grieved to hear that Jerusalem lay in ruins. Sent as governor, he rallied the people to rebuild the city walls in fifty-two days, working with a tool in one hand and a weapon in the other against their enemies, and renewed the people's covenant with God alongside Ezra."
      ],
      lessons: ["Prayer joined to action rebuilds what lies in ruins; the work of restoration needs both trust and toil."],
      sources: ["bible"],
      entries: [
        b("bible", "Nehemiah, who rebuilt the walls of Jerusalem and renewed the covenant of the returned people with Ezra.", "Nehemiah 2; Nehemiah 8", "Nehemiah")
      ],
      relations: [ r("uzair", "companion"), r("bani-israel", "kin"), r("zerubbabel", "successor") ]
    }

  );
})();
