/* People of the Quran — Deepening existing figures
 * ------------------------------------------------------------------
 * This file PATCHES existing people with a narrative story, key
 * encounters, depth, richer cross-tier sourced statements and fuller
 * names. It never edits the main data file: it reads window.PQ_DATA
 * after data.js has loaded and merges in additional, well-attested
 * material from the Quran, Bible, Tanakh and classical tradition.
 */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, enc = D.enc;
  var byId = {}; D.people.forEach(function (p) { byId[p.id] = p; });
  function patch(id, extra) {
    var p = byId[id]; if (!p) return;
    if (extra.depth) p.depth = extra.depth;
    if (extra.story) p.story = extra.story;
    if (extra.encounters) p.encounters = extra.encounters;
    if (extra.names) p.names = Object.assign({}, p.names, extra.names);
    if (extra.addEntries) p.entries = (p.entries || []).concat(extra.addEntries);
    if (extra.addLessons) p.lessons = (p.lessons || []).concat(extra.addLessons);
    if (extra.sources) p.sources = extra.sources;
  }

  /* ===================== DAWUD ===================== */
  patch("dawud", {
    depth: "major",
    story: [
      "He came to the field as the youngest, a shepherd among armoured men, and faced the giant Jālūt with a sling and a handful of stones. With God's leave the stone found its mark, the tyrant fell, and from that day the boy's name was bound to courage and trust in his Lord. God gave him the kingship and wisdom and taught him what He willed.",
      "As king he was given the Zabūr — the Psalms — and a voice so pure that the mountains and the birds echoed his praise of God. Iron softened in his hands like wax, and he was taught to fashion coats of mail. He judged between people with insight, was tested and turned back to his Lord in repentance, and passed a strengthened kingdom to his son Sulaymān."
    ],
    encounters: [
      enc("jalut", "The youth with the sling against the giant; the stone and God's leave.", "Q 2:251"),
      enc("talut", "Serving in the army of the appointed king before the throne came to him.", "Q 2:249–251"),
      enc("sulayman", "Passing on a prophetic kingship to his son.", "Q 27:16")
    ],
    names: { bible: "David", hebrew: "דָּוִד (Dāwid)" },
    addEntries: [
      b("bible", "David, the shepherd anointed by Samuel, who felled Goliath, became king of Israel, and is remembered as the psalmist of the Psalms.", "1 Samuel 16–17; 2 Samuel; Psalms", "1–2 Samuel · Psalms"),
      b("torah", "In the Tanakh, Dāwid rises from shepherd to king, dances before the Ark, and is promised an enduring house.", "Shmuel / Tehillim", "Tanakh"),
      b("tradition", "His fasting (a day fasting, a day not) and his long night prayer are praised as the most beloved devotions to God.", "Sahih al-Bukhari; al-Tabari", "Hadith · Tafsir")
    ],
    addLessons: ["Strength is given by God, not by stature or arms."]
  });

  /* ===================== SULAYMAN ===================== */
  patch("sulayman", {
    depth: "major",
    story: [
      "Heir to Dāwud, he prayed for a kingdom such as would belong to no one after him, and it was granted: the wind ran at his command, the jinn laboured for him, and the speech of birds and beasts was opened to him. Yet for every gift he sought gratitude over grandeur, knowing the favour was a test from his Lord.",
      "When the hoopoe brought word of a queen who ruled a sun-worshipping people, Sulaymān summoned her with a letter. He had her throne brought in the blink of an eye and a court of polished glass laid before her, until she recognised the truth and submitted, 'with Sulaymān, to the Lord of the worlds.' He died leaning on his staff, and only when a creature gnawed it through did the jinn learn he had passed."
    ],
    encounters: [
      enc("bilqis", "The letter, the test of the throne, and a queen brought to faith.", "Q 27:22–44"),
      enc("dawud", "Inheriting prophecy and kingship from his father.", "Q 27:16")
    ],
    names: { bible: "Solomon", hebrew: "שְׁלֹמֹה (Shəlōmōh)" },
    addEntries: [
      b("bible", "Solomon, son of David, asks God for wisdom, judges the disputed child, and builds the Temple in Jerusalem.", "1 Kings 3–11", "1 Kings"),
      b("torah", "In the Tanakh, Shəlōmōh is the wise king whose reign marks the height of the united kingdom and the building of the First Temple.", "Melakhim", "Tanakh"),
      b("tradition", "Commentators recount his control of the wind and jinn and the manner of his death, leaning on his staff.", "Ibn Kathir; Qisas al-Anbiya", "Tafsir")
    ],
    addLessons: ["Mastery over the world is itself a trial in gratitude."]
  });

  /* ===================== BILQIS ===================== */
  patch("bilqis", {
    depth: "supporting",
    story: [
      "She ruled a prosperous people who bowed to the sun, until a hoopoe carried word of her to Sulaymān and his letter reached her court. Wise and unhurried, she gathered her counsel, sent gifts to test the king's intent, and when these were refused she came herself. Shown her own throne transformed and a hall she mistook for water, she saw past the wonders to their source and declared her submission, with Sulaymān, to the Lord of the worlds."
    ],
    encounters: [
      enc("sulayman", "The letter, the gifts of testing, and her submission to one God.", "Q 27:22–44")
    ],
    names: { tradition: "بلقيس (Bilqīs)" },
    addEntries: [
      b("bible", "A queen of Sheba travels to test Solomon with hard questions and marvels at his wisdom and his kingdom.", "1 Kings 10:1–13", "1 Kings"),
      b("tradition", "Classical commentary and the Qisas al-Anbiya literature give her the name Bilqis and elaborate her story.", "Qisas al-Anbiya; al-Tabari", "Tafsir")
    ],
    addLessons: ["A wise ruler tests before trusting, then yields to the truth once seen."]
  });

  /* ===================== TALUT ===================== */
  patch("talut", {
    depth: "supporting",
    story: [
      "When Bani Israel asked their prophet for a king to fight under, God appointed Ṭālūt — chosen for knowledge and strength rather than wealth or noble birth. The people objected that he had no riches, but the sign of his kingship was the return of the ark. Marching to battle he tested his army at a river: only those who refused to drink, or took no more than a handful, were fit to face the enemy, and they were few."
    ],
    encounters: [
      enc("jalut", "Leading the believing few against the giant's host.", "Q 2:249–251"),
      enc("dawud", "The young shepherd in his ranks who would fell the giant.", "Q 2:251")
    ],
    names: { bible: "Saul", hebrew: "שָׁאוּל (Shāʼūl)" },
    addEntries: [
      b("bible", "Saul, anointed by Samuel as the first king of Israel.", "1 Samuel 9–10", "1 Samuel"),
      b("torah", "In the Tanakh, Shāʼūl is chosen as Israel's first king and leads its early battles.", "Shmuel", "Tanakh"),
      b("tradition", "Exegetes link the river test to Gideon's selection and stress that kingship is granted by God's wisdom, not lineage.", "al-Tabari", "Tafsir")
    ]
  });

  /* ===================== JALUT ===================== */
  patch("jalut", {
    depth: "supporting",
    story: [
      "He was the champion of an overwhelming host, a figure of terror before whom Ṭālūt's army quailed. Yet the believers who had passed the river steadied themselves with prayer: 'How many a small company has overcome a large company by the will of God.' The young Dāwud went out against him, and with a single stone and God's leave the giant fell, turning the whole battle."
    ],
    encounters: [
      enc("dawud", "Felled by the shepherd's stone, by God's leave.", "Q 2:251"),
      enc("talut", "The terror of the appointed king's army.", "Q 2:249–250")
    ],
    names: { bible: "Goliath", hebrew: "גָּלְיָת (Golyāt)" },
    addEntries: [
      b("bible", "Goliath of Gath, the Philistine giant who defied the army of Israel and was killed by David's sling.", "1 Samuel 17", "1 Samuel"),
      b("torah", "In the Tanakh, Golyāt the Philistine champion challenges Israel until the young Dāwid strikes him down.", "Shmuel", "Tanakh")
    ],
    addLessons: ["Overwhelming might collapses before faith and God's decree."]
  });

  /* ===================== PHARAOH ===================== */
  patch("pharaoh", {
    depth: "major",
    story: [
      "He sat at the summit of the mightiest kingdom of its age and let power swell into the claim of godhood: 'I am your lord, most high.' Fearing a prophecy, he enslaved Bani Israel, ordered their newborn sons killed, and tore families apart — and the very child meant to end his reign was raised in his own palace.",
      "When Mūsā came with clear signs he called them sorcery, yet his own magicians fell in prostration to the Lord of Mūsā and Hārūn. Hardening his heart through plague after plague, he pursued the fleeing people into the parted sea. As the waters closed over him he cried that he believed — but faith offered only at the moment of drowning came too late, and his body was preserved as a sign to those who come after."
    ],
    encounters: [
      enc("musa", "Confronted by the staff, the signs, and a call he named sorcery.", "Q 7:103–126"),
      enc("asiya", "The believing wife in his own household whom he could not turn.", "Q 66:11"),
      enc("haman", "His minister, ordered to raise a tower to mock the God of Mūsā.", "Q 28:38")
    ],
    names: { bible: "Pharaoh" },
    addEntries: [
      b("bible", "The Pharaoh of the Exodus hardens his heart through the plagues, pursues Israel, and is drowned in the sea.", "Exodus 5–14", "Exodus"),
      b("torah", "In Shemot, Parʿoh refuses to let Israel go until the plagues and the drowning at the Sea of Reeds.", "Shemot 5–14", "Torah"),
      b("tradition", "Tafsir identifies his late, rejected confession of faith and the preservation of his body as a warning sign.", "Ibn Kathir; al-Tabari", "Tafsir")
    ],
    addLessons: ["Repentance has a season; it is not accepted at the edge of death."]
  });

  /* ===================== HARUN ===================== */
  patch("harun", {
    depth: "supporting",
    story: [
      "When Mūsā feared his own speech would fail before Pharaoh, he prayed for his elder brother Hārūn to be sent with him, and God granted it: 'We will strengthen your arm with your brother.' Clearer of tongue, Hārūn stood beside him before the tyrant and shared the burden of leading a stubborn people. Left in charge while Mūsā went to the mountain, he warned Bani Israel against the golden calf, and when they would not listen he held them together as gently as he could until his brother returned — taking him by the head and beard, he pleaded that he had only feared to divide them."
    ],
    encounters: [
      enc("musa", "Given as a strengthening helper and fellow prophet.", "Q 20:29–36"),
      enc("samiri", "Powerless to stop the maker of the calf in Mūsā's absence.", "Q 20:90–94")
    ],
    names: { bible: "Aaron", hebrew: "אַהֲרֹן (ʼAhărōn)" },
    addEntries: [
      b("bible", "Aaron, brother of Moses and Israel's first high priest, speaks before Pharaoh and serves at the altar.", "Exodus 4, 7, 28", "Exodus"),
      b("torah", "In Shemot and Vayikra, ʼAhărōn is consecrated as kohen gadol and the priestly line descends from him.", "Shemot · Vayikra", "Torah"),
      b("tradition", "Beloved among his people for gentleness; the commentators dwell on his restraint during the affair of the calf.", "al-Tabari", "Tafsir")
    ]
  });

  /* ===================== HAJAR ===================== */
  patch("hajar", {
    depth: "supporting",
    story: [
      "Left by Ibrāhīm with her infant Ismāʿīl in a barren valley with no water and no people, she asked whether God had commanded it, and when told He had, she answered, 'Then He will not abandon us.' As her child cried with thirst she ran in search of water between the hills of Ṣafā and Marwa, seven times, until God caused the spring of Zamzam to gush at the infant's feet. Her trust turned a desolate valley into the cradle of a city and her run into a rite that pilgrims retrace to this day."
    ],
    encounters: [
      enc("ibrahim", "Left in the valley by God's command, with her trust intact.", "Q 14:37"),
      enc("ismail", "Running for water for her thirsting child, and the gift of Zamzam.", "Sahih al-Bukhari")
    ],
    names: { bible: "Hagar", hebrew: "הָגָר (Hāgār)" },
    addEntries: [
      b("bible", "Hagar, the Egyptian, mother of Ishmael; in the wilderness God hears the child and shows her a well of water.", "Genesis 16, 21", "Genesis"),
      b("torah", "In Bereshit, Hāgār is comforted by the angel of God in the wilderness and promised a great nation through her son.", "Bereshit 16, 21", "Torah"),
      b("tradition", "Her search between Ṣafā and Marwa is established as the Saʿy, and the spring she found is the well of Zamzam.", "Sahih al-Bukhari", "Hadith")
    ],
    addLessons: ["Trust voiced in a barren place becomes a wellspring."]
  });

  /* ===================== SARAH ===================== */
  patch("sarah", {
    depth: "supporting",
    story: [
      "Wife of Ibrāhīm and his companion through migration and trial, she was present when the angel-guests came bearing the tidings of a son. Old and long without children, she laughed in wonder and struck her face, asking how she could bear a child; she was answered that nothing is beyond the power of God. So came Isḥāq, and beyond him the promise of Yaʿqūb — a whole line of prophets from a birth that seemed impossible."
    ],
    encounters: [
      enc("ibrahim", "His lifelong companion through migration and trial.", "Q 11:71"),
      enc("ishaq", "The impossible son announced to her in old age.", "Q 11:71–73")
    ],
    names: { bible: "Sarah", hebrew: "שָׂרָה (Sārāh)" },
    addEntries: [
      b("bible", "Sarah, wife of Abraham; promised a son in old age, she laughs, then bears Isaac.", "Genesis 17–21", "Genesis"),
      b("torah", "In Bereshit, Sārāh's name is changed from Sarai and she bears Yiṣḥaq, mother of the covenant line.", "Bereshit 17–21", "Torah"),
      b("tradition", "Commentators recount her amazement and the angels' reassurance that this was God's mercy and blessing upon the household.", "al-Tabari", "Tafsir")
    ]
  });

  /* ===================== ISMAIL ===================== */
  patch("ismail", {
    depth: "major",
    story: [
      "Born to Ibrāhīm and Hājar in the years of longing, he was the child left with his mother in the valley that became Mecca. When his father saw in a dream that he was to sacrifice him, he laid the vision before the boy, who answered without flinching: 'O my father, do as you are commanded; you will find me, God willing, among the patient.' Both submitted, and at the moment of the trial God ransomed him with a great sacrifice.",
      "Grown, he stood with his father to raise the foundations of the Kaaba, the two of them praying that God accept the work and make their descendants a people submitting to Him. Truthful and true to his promise, a prophet to his people, he became through his line the forefather of the Prophet Muḥammad."
    ],
    encounters: [
      enc("ibrahim", "The shared submission of the sacrifice, and raising the Kaaba together.", "Q 37:102–107; Q 2:127"),
      enc("hajar", "The infant in the valley for whom Zamzam sprang forth.", "Sahih al-Bukhari")
    ],
    names: { bible: "Ishmael", hebrew: "יִשְׁמָעֵאל (Yišmāʿēl)" },
    addEntries: [
      b("bible", "Ishmael, firstborn of Abraham through Hagar; God promises to make of him a great nation of twelve princes.", "Genesis 16, 17, 21, 25", "Genesis"),
      b("torah", "In Bereshit, Yišmāʿēl is circumcised with his father and blessed to become a great nation.", "Bereshit 17, 21", "Torah"),
      b("tradition", "He helps Ibrāhīm build the Kaaba and is held the forefather, through the Arabs, of the Prophet Muḥammad.", "Sahih al-Bukhari; Ibn Kathir", "Hadith · Tafsir")
    ],
    addLessons: ["Submission tested at the edge of loss is ransomed by God's mercy."]
  });

  /* ===================== ISHAQ ===================== */
  patch("ishaq", {
    depth: "supporting",
    story: [
      "He was the glad tidings itself — a son announced to Ibrāhīm and Sarah in their old age, and with him the further promise of Yaqūb beyond. Named among the righteous and made a prophet, he stood in the unbroken line of the covenant, grandfather of the tribes of Israel. The Quran joins his name to his father's and his son's as a blessing placed upon a whole household."
    ],
    encounters: [
      enc("ibrahim", "The promised son, glad tidings to his aged father.", "Q 37:112–113"),
      enc("yaqub", "The further gift announced alongside his own birth.", "Q 11:71")
    ],
    names: { bible: "Isaac", hebrew: "יִצְחָק (Yiṣḥāq)" },
    addEntries: [
      b("bible", "Isaac, son of promise, bound on Mount Moriah, father of Jacob and Esau.", "Genesis 21–28", "Genesis"),
      b("torah", "In Bereshit, Yiṣḥaq — 'he laughs' — carries the covenant of Abraham forward to Yaʿaqov.", "Bereshit 21–28", "Torah"),
      b("tradition", "Commentators discuss the binding (al-dhabīḥ) and the blessing of prophethood placed in his line.", "al-Tabari; Ibn Kathir", "Tafsir")
    ]
  });

  /* ===================== LUT ===================== */
  patch("lut", {
    depth: "supporting",
    story: [
      "He believed in Ibrāhīm and migrated with him, then was sent as a prophet to the cities of the plain, a people who had made open indecency their custom. He stood almost alone against them, calling them to purity and warning of ruin, while they answered with threats and demanded he hand over his guests. The angels came to him in the guise of travellers, and he was commanded to leave by night with the believers and not look back. At daybreak the cities were overturned — only his household was saved, save his wife, who belonged to the city more than to him."
    ],
    encounters: [
      enc("ibrahim", "Believing in him and migrating at his side.", "Q 29:26"),
      enc("lut-wife", "The wife who stayed behind and perished with the cities.", "Q 66:10")
    ],
    names: { bible: "Lot", hebrew: "לוֹט (Lōṭ)" },
    addEntries: [
      b("bible", "Lot, nephew of Abraham, is rescued from Sodom by angels before the cities are destroyed by fire from heaven.", "Genesis 19", "Genesis"),
      b("torah", "In Bereshit, Lōṭ is led out of Sedom by the messengers; his wife looks back and becomes a pillar of salt.", "Bereshit 19", "Torah"),
      b("tradition", "Exegetes detail his lonely struggle against his people's corruption and the overturning of their cities.", "al-Tabari", "Tafsir")
    ]
  });

  /* ===================== YAQUB ===================== */
  patch("yaqub", {
    depth: "major",
    story: [
      "Son of Isḥāq and heir to the covenant, he raised twelve sons who became the tribes of Israel. When his beloved Yūsuf was taken from him by his brothers' envy, he met the lie of the bloodstained shirt with 'beautiful patience,' refusing to despair of God's mercy. He wept for his lost son until his eyes turned white with grief, yet held fast, knowing what they did not.",
      "Years later, when famine had carried his sons to Egypt and back, he caught the scent of Yūsuf on a returning shirt and would not be dissuaded. The shirt cast over his face restored his sight, and the family was gathered in Egypt — the long sorrow answered, and the boy's old dream of the bowing stars fulfilled before his father's eyes."
    ],
    encounters: [
      enc("yusuf", "The beloved son lost, mourned with beautiful patience, and regained.", "Q 12:84–96"),
      enc("ishaq", "Heir to the covenant line of his father.", "Q 12:38")
    ],
    names: { bible: "Jacob / Israel", hebrew: "יַעֲקֹב (Yaʿăqōb)" },
    addEntries: [
      b("bible", "Jacob, renamed Israel after wrestling at Peniel, father of the twelve tribes; he mourns Joseph, then is reunited with him in Egypt.", "Genesis 25–49", "Genesis"),
      b("torah", "In Bereshit, Yaʿaqov receives the blessing, sees the ladder to heaven, and his sons become the shevatim of Israel.", "Bereshit 25–49", "Torah"),
      b("tradition", "Commentators expound his 'beautiful patience' (ṣabr jamīl) and his certainty in God's relief.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["Grief borne with trust in God never hardens into despair."]
  });

  /* ===================== ZAKARIYYA ===================== */
  patch("zakariyya", {
    depth: "supporting",
    story: [
      "Guardian of Maryam in the sanctuary, he marvelled at the out-of-season provision he found with her and saw that God provides without measure. Old now, with a barren wife and no heir to carry the trust of prophecy, he turned to his Lord in a quiet, secret prayer. He was answered with the glad tidings of a son, Yaḥyā, and asked for a sign; he was told to keep silent for three days, speaking to the people only by gesture while his tongue gave constant praise."
    ],
    encounters: [
      enc("maryam", "Guardian who found her provided for out of season.", "Q 3:37"),
      enc("yahya", "The son granted to him in old age against all expectation.", "Q 19:7")
    ],
    names: { bible: "Zechariah", hebrew: "זְכַרְיָה (Zəkharyāh)" },
    addEntries: [
      b("bible", "Zechariah the priest, told by the angel Gabriel that his aged wife Elizabeth will bear John; struck silent until the birth.", "Luke 1", "Gospel of Luke"),
      b("tradition", "Commentators recount his secret supplication and the sign of three days' silence.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["No barrenness of years closes the door to God's gift."]
  });

  /* ===================== YAHYA ===================== */
  patch("yahya", {
    depth: "supporting",
    story: [
      "Granted to Zakariyyā in his old age, he was given a name no one had borne before and wisdom while still a child. Pure and tender-hearted, dutiful to his parents, neither arrogant nor disobedient, he was bidden to hold to the Scripture with strength. Peace was pronounced upon him the day he was born, the day he dies, and the day he is raised again."
    ],
    encounters: [
      enc("zakariyya", "The long-awaited son and answer to his father's prayer.", "Q 19:7"),
      enc("isa", "Kinsman and forerunner in the line of the House of Imran.", "Q 6:85")
    ],
    names: { bible: "John the Baptist", hebrew: "יוֹחָנָן (Yōḥānān)" },
    addEntries: [
      b("bible", "John the Baptist, son of Zechariah, who prepares the way and baptises in the Jordan.", "Matthew 3; Luke 1", "Gospels"),
      b("tradition", "His purity, asceticism and early wisdom are praised in the commentaries.", "al-Tabari; Ibn Kathir", "Tafsir")
    ]
  });

  /* ===================== AYYUB ===================== */
  patch("ayyub", {
    depth: "supporting",
    story: [
      "He was a man of wealth, family and health who lost all of it in succession, and was struck with long affliction in his own body. Through every loss he never blamed his Lord nor relinquished his patience, until at last he turned to God: 'Adversity has touched me, and You are the most merciful of the merciful.' He was answered — told to strike the ground with his foot, and a cool spring gushed for washing and drink — and his health, his family and more were restored. God found him patient: 'an excellent servant, ever turning back.'"
    ],
    encounters: [
      enc("ibrahim", "Counted among the guided progeny of Ibrāhīm.", "Q 6:84")
    ],
    names: { bible: "Job", hebrew: "אִיּוֹב (ʼIyyōb)" },
    addEntries: [
      b("bible", "Job, a blameless and upright man, loses his children, wealth and health yet holds his integrity, and is finally restored.", "Book of Job", "Book of Job"),
      b("torah", "In the Ketuvim, ʼIyyōb endures suffering and questions, and God answers him out of the whirlwind.", "Iyyov", "Tanakh · Ketuvim"),
      b("tradition", "Exegetes recount the spring brought forth at his foot and his refusal, in patience, to complain of his Lord.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["Patience holds its tongue from complaint even under total loss."]
  });

  /* ===================== YUNUS ===================== */
  patch("yunus", {
    depth: "supporting",
    story: [
      "Sent to a people who would not heed him, he left them in anger before God's leave was given, and boarded a ship. When lots were cast he was thrown into the sea and swallowed by a great fish. In the layered darkness — of the deep, the night, and the belly of the fish — he called out: 'There is no god but You; glory be to You; I was among the wrongdoers.' God heard him, delivered him from grief, and cast him onto an open shore, weakened, where a sheltering plant was made to grow over him. His city, meanwhile, believed — the one nation whose faith turned away the punishment."
    ],
    encounters: [
      enc("ibrahim", "Named among the guided messengers in the line of the prophets.", "Q 6:86")
    ],
    names: { bible: "Jonah", hebrew: "יוֹנָה (Yōnāh)" },
    addEntries: [
      b("bible", "Jonah flees God's command, is swallowed by a great fish for three days, prays, is delivered, and Nineveh repents.", "Book of Jonah", "Book of Jonah"),
      b("torah", "In the Nevi'im, Yōnāh is cast into the sea, prays from the fish's belly, and the people of Nineveh turn back.", "Yonah", "Tanakh · Nevi'im"),
      b("tradition", "Commentators name him Dhū al-Nūn ('the man of the fish') and dwell on the prayer that brought his rescue.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["The prayer of the contrite in darkness is never beyond God's hearing."]
  });

  /* ===================== HUD ===================== */
  patch("hud", {
    depth: "supporting",
    story: [
      "He was sent to ʿĀd, a people of great strength who raised lofty monuments and boasted, 'Who is mightier than us in power?' He called them to worship God alone and to abandon their arrogance, asking no reward for it. They mocked him, accused him of folly, and clung to the idols of their fathers. When they persisted in rejection, a barren wind was loosed against them for seven nights and eight days, and only Hūd and the believers were saved."
    ],
    encounters: [
      enc("ad", "The mighty people he warned against pride in their strength.", "Q 7:65–72"),
      enc("nuh", "Following in the line of warners after the Flood.", "Q 7:69")
    ],
    names: { tradition: "هُود (Hūd)" },
    addEntries: [
      b("tradition", "Identified with the region of al-Aḥqāf in southern Arabia; the commentators describe ʿĀd's pillared city of Iram and its destruction by the wind.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["Strength becomes ruin when it breeds pride against God."]
  });

  /* ===================== SALIH ===================== */
  patch("salih", {
    depth: "supporting",
    story: [
      "He was sent to Thamūd, a people who carved secure homes into the mountains and grew complacent in their prosperity. When they demanded a sign he was given the she-camel — a creature set apart by God, to drink on its appointed day and to be left unharmed. They could not bear the test: the most wretched of them hamstrung the camel, defying the warning. Three days' respite was granted, and then a mighty blast seized them in their homes, while Ṣāliḥ and the believers were delivered."
    ],
    encounters: [
      enc("thamud", "The people he warned, and the sign of the she-camel they killed.", "Q 7:73–79"),
      enc("nuh", "Standing in the line of warners after the Flood.", "Q 7:73")
    ],
    names: { tradition: "صَالِح (Ṣāliḥ)" },
    addEntries: [
      b("tradition", "Tradition locates Thamūd at al-Ḥijr (Madāʾin Ṣāliḥ) in north-western Arabia; commentators detail the she-camel and the people's doom.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["A people's testing comes in what they most take for granted."]
  });

  /* ===================== ASIYA ===================== */
  patch("asiya", {
    depth: "supporting",
    story: [
      "She lived in the house of the tyrant himself and yet believed, becoming the example God sets forth for all who have faith. When the infant Mūsā was drawn from the river she pleaded for his life — 'a comfort of the eye for me and you' — and he was raised in the very palace that sought his kind's destruction. Holding to her faith against Pharaoh's claim to godhood, she prayed the prayer the Quran preserves: 'My Lord, build for me, near You, a house in the Garden, and save me from Pharaoh and his deeds.'"
    ],
    encounters: [
      enc("pharaoh", "Believing in secret against the tyrant she was married to.", "Q 66:11"),
      enc("musa", "Pleading for the infant's life and raising him in the palace.", "Q 28:9")
    ],
    names: { tradition: "آسية بنت مزاحم (Āsiya bint Muzāḥim)" },
    addEntries: [
      b("tradition", "Counted among the foremost women of all time alongside Maryam; her steadfast faith in Pharaoh's household is praised at length.", "Sahih al-Bukhari; al-Tabari", "Hadith · Tafsir")
    ],
    addLessons: ["Faith can take root even in the house of its fiercest enemy."]
  });

  /* ===================== KHIDR ===================== */
  patch("khidr", {
    depth: "supporting",
    story: [
      "He is the servant of God, met by Mūsā at the meeting of the two seas, granted a knowledge from God's own teaching that Mūsā had not been given. Mūsā asked to follow and learn, and was warned he would not have the patience for it. Three acts followed that seemed only destruction and injustice — scuttling a poor men's boat, taking a young life, restoring a wall in a town that gave no welcome — until al-Khiḍr unveiled the hidden mercy in each and parted from Mūsā, leaving a lasting lesson that God's wisdom runs beneath appearances."
    ],
    encounters: [
      enc("musa", "The journey of three perplexing acts and their hidden wisdom.", "Q 18:65–82"),
      enc("yusha", "The attendant who travelled with Mūsā to the meeting place.", "Q 18:60–62")
    ],
    names: { tradition: "الخضر (al-Khiḍr)" },
    addEntries: [
      b("tradition", "The prophetic narration names him al-Khiḍr and recounts the lost fish that marked the meeting place with Mūsā.", "Sahih al-Bukhari; Ibn Kathir", "Hadith · Tafsir")
    ],
    addLessons: ["What looks like harm may carry a mercy the eye cannot see."]
  });

  /* ===================== SHUAYB ===================== */
  patch("shuayb", {
    depth: "supporting",
    story: [
      "Sent to the people of Madyan, he called them to worship God alone and to deal honestly — to give full measure and weight and not to spread corruption after their land had been set right. So persuasive and just was his speech that he is remembered as the 'orator of the prophets.' His people, wedded to their fraud, mocked and threatened him; when they would not turn, they were seized by the punishment of an overshadowing day. By tradition he was also the man of Madyan who sheltered the fleeing Mūsā and gave him a daughter in marriage."
    ],
    encounters: [
      enc("musa", "Sheltering the fugitive Mūsā and giving him work and a daughter in marriage.", "Q 28:23–28")
    ],
    names: { tradition: "شُعَيْب (Shuʿayb)", bible: "Jethro / Reuel (traditionally identified)" },
    addEntries: [
      b("tradition", "Classical commentary identifies him with the priest of Midian who hosted Mūsā, and calls him khaṭīb al-anbiyāʾ, the orator of the prophets.", "al-Tabari; Ibn Kathir", "Tafsir")
    ],
    addLessons: ["Worship of God is incomplete without honesty in the marketplace."]
  });

})();
