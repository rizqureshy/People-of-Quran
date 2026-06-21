/* People of Scriptures — Narrative stories & encounters (wave 2)
 * ------------------------------------------------------------------
 * Patches the remaining figures who had sourced entries and lessons but
 * no narrative "story" prose, giving every person in the universe a
 * story and (where relationships exist) key encounters. Like deepen.js,
 * it reads window.PQ_DATA after the data files have loaded and merges in
 * well-attested material from the Quran, Bible, Tanakh and tradition.
 * Runs after deepen.js.
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


/* ===================== HAWWA ===================== */
patch("hawwa", {
  depth: "supporting",
  story: [
    "She was created as the mate of Ādam, that he might dwell with her in tranquillity, and from the pair God spread out a multitude of men and women. The Quran does not name her, speaking of her only as Ādam's companion at the beginning of the human story. In tradition she is called Ḥawwāʾ, and the Bible names her Eve, 'the mother of all living' — the woman from whom the line of humankind descends."
  ],
  encounters: [
    enc("adam", "Created as his mate, that he might dwell with her in tranquillity.", "Q 7:189"),
    enc("habil", "Mother of the son who was slain.", "Genesis 3:20"),
    enc("qabil", "Mother of the brother who turned on his own.", "Genesis 3:20")
  ]
});

/* ===================== SON OF NUH ===================== */
patch("nuh-son", {
  depth: "minor",
  story: [
    "When the floodwaters rose and the ark was loading, Nūḥ called to his son to embark and not to be among the disbelievers. The son refused, trusting instead in a mountain to shelter him from the deluge: 'I will take refuge on a mountain that will protect me from the water.' Nūḥ answered that there is no protector that day from the command of God, save for those upon whom He has mercy — and a wave came between them, and the son was among the drowned. Exegetical tradition names him Canaan or Yām."
  ],
  encounters: [
    enc("nuh", "The father's last call to board, refused for a mountain's false refuge.", "Q 11:42–47")
  ]
});

/* ===================== BROTHERS OF YUSUF ===================== */
patch("yusuf-brothers", {
  depth: "supporting",
  story: [
    "Envious that their father loved Yūsuf and his brother more, they plotted against the boy, casting him into the bottom of a well and returning with a shirt stained by false blood. Years of famine later drove them to Egypt, to the very brother they had wronged, now risen to power and unknown to them. When at last Yūsuf made himself known, they confessed, 'By God, God has preferred you over us, and we were sinners.' He answered that no blame would fall on them that day, and asked God to forgive them — and their long-mourning father's sight was restored when the shirt was cast over his face."
  ],
  encounters: [
    enc("yusuf", "The brother they cast into the well, who later forgave them in Egypt.", "Q 12:8–18, 12:91–92"),
    enc("yaqub", "The father they deceived with the bloodstained shirt.", "Q 12:16–18")
  ]
});

/* ===================== HAMAN ===================== */
patch("haman", {
  depth: "supporting",
  story: [
    "He was the chief minister of Pharaoh, named in the Quran among the leaders of a tyrannical court that oppressed Bani Israel. When Pharaoh wished to mock the call of Mūsā, he turned to Hāmān: 'O Hāmān, kindle for me a fire upon the clay and build me a lofty tower, that I may look upon the God of Mūsā — though I think he is a liar.' Counted among the corrupt elite who rejected the clear signs, he stands as a warning that power placed at the service of a tyrant only magnifies oppression."
  ],
  encounters: [
    enc("pharaoh", "The minister ordered to raise a tower to mock the God of Mūsā.", "Q 28:38, Q 40:36–37"),
    enc("musa", "Among the elite who named the prophet a liar.", "Q 40:36–37")
  ]
});

/* ===================== WIFE OF IMRAN ===================== */
patch("imran-wife", {
  depth: "supporting",
  story: [
    "She vowed the child she carried to the service of God, dedicating it freely before she knew what it would be: 'My Lord, I have vowed to You what is in my womb, consecrated, so accept it from me.' When she gave birth and saw it was a daughter, she did not waver but named her Maryam and sought God's refuge for her and her offspring from the rejected Satan. The Quran does not name the mother, who is called Ḥannah in tradition; her surrender placed Maryam in God's care and prepared the way for all that came after."
  ],
  encounters: [
    enc("maryam", "The daughter she vowed and consecrated to God's service.", "Q 3:35–36"),
    enc("imran", "Her husband and the house to which she belonged.", "Q 3:35")
  ]
});

/* ===================== THE PEOPLE OF AD ===================== */
patch("ad", {
  depth: "supporting",
  story: [
    "They were a mighty nation, raisers of Iram of the pillars, the like of which had not been created in the lands. Strong in body and proud in their monuments, they boasted, 'Who is mightier than us in power?' — and rejected the warner Hūd, who was sent from among their own kin. When they persisted in arrogance, God loosed against them a furious, barren wind, and all their strength and building could not shield them. Their ruin became a sign that no monument outlasts pride set against God."
  ],
  encounters: [
    enc("hud", "The warner sent from their own kin, whom they mocked.", "Q 41:15–16")
  ]
});

/* ===================== SHETH ===================== */
patch("sheth", {
  depth: "minor",
  story: [
    "He was the son given to Ādam after the loss of Hābīl, 'another seed' through whom the godly line continued. From him the lineage descended to Nūḥ, and so to all who survived the flood, making him a link in the chain of faith. Islamic tradition names him Shīth and counts many of him as a prophet who received scriptures, the heir of Ādam's knowledge — the son given after sorrow through whom the trust was carried forward."
  ],
  encounters: [
    enc("adam", "The son given after the loss of Hābīl, heir to his knowledge.", "Genesis 4:25; 5:3"),
    enc("idris", "An ancestor in the line that descended to the later prophets.", "Bereshit 4–5")
  ]
});

/* ===================== HAM ===================== */
patch("ham", {
  depth: "minor",
  story: [
    "He was one of the three sons of Nūḥ saved in the ark from the flood, named Ḥām in the Bible and in Islamic tradition. From his line, the table of nations traces Cush, Egypt and Canaan among the peoples of the earth. Carried through the deluge with his father and brothers, he became a forefather of many nations that spread across the world after the waters subsided."
  ],
  encounters: [
    enc("nuh", "A son saved in the ark from the flood.", "Genesis 9–10"),
    enc("shem", "A brother among the three sons who survived the deluge.", "Bereshit 9–10")
  ]
});

/* ===================== BILHAH ===================== */
patch("bilhah", {
  depth: "minor",
  story: [
    "She was Rachel's handmaid, given to Yaʿqūb, and through her were born two of the fathers of the tribes of Israel, Dan and Naphtali. In the house of the patriarch, her sons took their place among the twelve, sharing in the covenant and inheritance of Israel. Though her role is briefly told, her line endures in the tribal fathers she bore to Yaʿqūb."
  ],
  encounters: [
    enc("rahil", "The mistress whose handmaid she was.", "Genesis 30"),
    enc("yaqub", "Given to the patriarch, to whom she bore two tribal fathers.", "Genesis 30"),
    enc("dan", "The son she bore who became a father of a tribe.", "Genesis 30"),
    enc("naphtali", "The second son she bore among the tribal fathers.", "Genesis 30")
  ]
});

/* ===================== ASHER ===================== */
patch("asher", {
  depth: "minor",
  story: [
    "He was a son of Yaʿqūb by Zilpah and the founder of the tribe that bears his name, one of the twelve of Israel. Of him it was said in the blessing that his bread would be rich, yielding royal dainties — a portion of plenty among his brothers. Through his line, the tribe of Asher took its place among the descendants who carried forward the inheritance of Yaʿqūb."
  ],
  encounters: [
    enc("yaqub", "His father, in whose blessing his portion of plenty was spoken.", "Genesis 49"),
    enc("zilpah", "His mother among the wives of Yaʿqūb.", "Genesis 30"),
    enc("gad", "His brother by the same mother.", "Genesis 30"),
    enc("asbat-bani-israil", "The tribes descended from him and his brothers.", "Genesis 49")
  ]
});

/* ===================== JOEL ===================== */
patch("joel", {
  depth: "minor",
  story: [
    "He was a prophet to Bani Israel who turned a land stripped bare by locusts into a call for repentance. He summoned the people to fast and to return with all their hearts, proclaiming that God is gracious and merciful, slow to anger and abounding in steadfast love, and that He relents from disaster. In a ruin made parable, he taught that the merciful turn back to their Lord even after devastation, and that sincere repentance is never refused."
  ],
  encounters: [
    enc("bani-israel", "The people he called to fast and return to God.", "Joel 2"),
    enc("shaya", "A contemporary among the prophets of his people.", "Joel 2")
  ]
});

/* ===== HABIL ===== */
patch("habil", {
  depth: "minor",
  story: [
    "He was one of the two sons of Ādam, the one whose offering was accepted while his brother's was not. When his brother, consumed by envy, threatened to kill him, he answered without raising a hand in return: 'If you stretch out your hand against me to kill me, I shall not stretch out my hand against you to kill you — for I fear God, the Lord of the worlds.' He chose to bear the wrong rather than commit it, and so became the first of mankind to be slain, a martyr to his own restraint."
  ],
  encounters: [
    enc("qabil", "Refusing to return his brother's violence, fearing God.", "Q 5:27–28"),
    enc("adam", "A son of the first man, his offering accepted.", "Q 5:27")
  ]
});

/* ===== AZAR ===== */
patch("azar", {
  depth: "minor",
  story: [
    "He was the father of Ibrāhīm, a maker and worshipper of idols who would not abandon the gods of his people. His son came to him with the gentlest of pleas — 'O my father, why do you worship that which neither hears nor sees nor avails you at all?' — and promised, even in the face of rejection, to ask forgiveness for him. But Āzar answered with a threat to stone him and told him to depart. Ibrāhīm withdrew with peace upon his lips, until it became clear that his father was an enemy of God, and he disavowed him."
  ],
  encounters: [
    enc("ibrahim", "The son who pleaded with him to leave the idols, and was answered with a threat.", "Q 19:41–48")
  ]
});

/* ===== AZIZ ===== */
patch("aziz", {
  depth: "minor",
  story: [
    "He was the Egyptian who bought Yūsuf from the caravan, the minister whom the Quran titles al-ʿAzīz. Sensing something in the boy he had purchased, he told his wife, 'Make his stay honourable; perhaps he will benefit us, or we may adopt him as a son.' So Yūsuf was raised in his house and given standing. When his wife's design was exposed and the shirt was found torn from behind, it was he who judged the matter, recognising the truth yet asking Yūsuf to overlook it and his wife to seek forgiveness."
  ],
  encounters: [
    enc("yusuf", "Buying him from the caravan and bidding his household honour him.", "Q 12:21"),
    enc("zulaikha", "Judging the torn shirt in his own household.", "Q 12:30")
  ]
});

/* ===== QARUN ===== */
patch("qarun", {
  depth: "supporting",
  story: [
    "He was a man of Mūsā's own people whom God had given treasures so vast that their very keys would have burdened a band of strong men. Warned to seek the Hereafter with his wealth, to do good, and not to spread corruption, he answered with arrogance: 'I was only given it because of knowledge I have.' He went out before his people in all his splendour, and those who longed for the world envied him, while those given knowledge knew better. Then God caused the earth to swallow him and his house, and there was no party to help him, nor could he help himself."
  ],
  encounters: [
    enc("musa", "The kinsman who answered warning with arrogance over his wealth.", "Q 28:76"),
    enc("bani-israel", "Dazzling his own people with his splendour before the earth took him.", "Q 28:79–81")
  ]
});

/* ===== HAWARIYYUN ===== */
patch("hawariyyun", {
  depth: "supporting",
  story: [
    "They were the faithful disciples of ʿĪsā, the ones who answered when he asked who would be his helpers in the cause of God: 'We are the helpers of God; we believe in God, so bear witness that we have submitted.' Theirs was a faith that volunteered itself in the open. When they asked whether God could send down a table spread with food from heaven, ʿĪsā cautioned them to fear God if they were believers, and they answered that they wished only to eat from it, to set their hearts at rest, and to bear witness to it."
  ],
  encounters: [
    enc("isa", "Declaring themselves helpers of God and asking for the heavenly table.", "Q 5:111–115")
  ]
});

/* ===== THAMUD ===== */
patch("thamud", {
  depth: "supporting",
  story: [
    "They were a people of strength after ʿĀd, who hewed dwellings out of the mountains and felt secure in their carved palaces. To them was sent their brother Ṣāliḥ, calling them to worship God alone, and they were given the she-camel as a clear sign, to share their water on its appointed day. But the most wretched among them hamstrung her in defiance of the warning. After three days' respite a single mighty blast seized them, and when morning came they lay lifeless in their homes, as though they had never prospered there."
  ],
  encounters: [
    enc("salih", "The brother who warned them and gave them the sign of the she-camel.", "Q 7:73–79")
  ]
});

/* ===== AL-YASA ===== */
patch("al-yasa", {
  depth: "minor",
  story: [
    "He is named in the Quran among the prophets, each favoured above the worlds, listed alongside Ismāʿīl, Yūnus and Lūṭ, and again among the best of men in Sūrat Ṣād. The Quran gives him no extended narrative, but honours him as one of the guided, a link in the unbroken chain of prophecy among the Children of Israel. In the biblical tradition he is Elisha, successor to Ilyās, who received a double portion of his master's spirit and continued his work of mercy and signs."
  ],
  encounters: [
    enc("ilyas", "Successor who carried on the prophetic call.", "Q 6:86"),
    enc("ibrahim", "Counted among the guided progeny of Ibrāhīm.", "Q 6:86")
  ]
});

/* ===== JAPHETH ===== */
patch("japheth", {
  depth: "minor",
  story: [
    "He was one of the sons of Nūḥ saved in the ark, named in tradition Yāfith. When his father lay uncovered, he and his brother Shem walked backward to lay a garment over him, choosing to cover rather than to expose, and were blessed for their reverence. In the table of nations his line is said to spread to the coastlands and distant isles, making him in tradition a forefather of many northern peoples."
  ],
  encounters: [
    enc("nuh", "A believing son saved in the ark.", "Genesis 9–10"),
    enc("shem", "With whom he covered their father.", "Genesis 9")
  ]
});

/* ===== ZILPAH ===== */
patch("zilpah", {
  depth: "minor",
  story: [
    "She was the handmaid of Leah, given to Yaʿqūb, and through her were born two of the fathers of the twelve tribes, Gad and Asher. Though she enters the story as a servant, her sons take their place among the asbāṭ, the tribal heads of Israel, woven into the covenant line of Yaʿqūb's household."
  ],
  encounters: [
    enc("yaqub", "Given to him, she bore him Gad and Asher.", "Genesis 30"),
    enc("leah", "Whose handmaid she was.", "Genesis 30"),
    enc("gad", "Her son among the tribal fathers.", "Genesis 30"),
    enc("asher", "Her son among the tribal fathers.", "Genesis 30")
  ]
});

/* ===== ISSACHAR ===== */
patch("issachar", {
  depth: "minor",
  story: [
    "He was a son of Yaʿqūb by Leah, founder of one of the twelve tribes of Israel. In Yaʿqūb's blessing over his sons he is likened to a strong beast of burden, bowing his shoulder to bear the load — an image of patient strength. His tribe took its place among the people descended from the asbāṭ, the tribal fathers of Israel."
  ],
  encounters: [
    enc("yaqub", "His father, who blessed him as a bearer of burdens.", "Genesis 49"),
    enc("leah", "His mother among the wives of Yaʿqūb.", "Genesis 30"),
    enc("zebulun", "His brother by the same mother.", "Genesis 30"),
    enc("asbat-bani-israil", "Father of one of the twelve tribes.", "Genesis 49")
  ]
});

/* ===== OBADIAH ===== */
patch("obadiah", {
  depth: "minor",
  story: [
    "He is the prophet of the shortest book among the Hebrew prophets, sent with a single vision against the pride of Edom. His message warned that the high places of the arrogant would be brought low — that no fortress raised among the rocks could shield a people from God, and that cruelty shown to one's own kin would return upon them. The Quran does not name him, but he stands within the line of warners raised among the Children of Israel."
  ],
  encounters: [
    enc("bani-israel", "A warner raised among the Children of Israel.", "Obadiah 1"),
    enc("armiya", "A contemporary among the prophets of his age.", "Obadiah 1")
  ]
});

/* ===== QABIL ===== */
patch("qabil", {
  depth: "supporting",
  story: [
    "He was one of the two sons of Ādam, who each brought an offering, and only his brother's was accepted. Rather than search his own heart, he let envy harden into threat: 'I will surely kill you.' Hābīl answered that he would not raise a hand in return, fearing God, the Lord of the worlds — and Qābīl, his soul yielding to him the killing of his brother, slew him and became one of the losers.",
    "Then he stood lost over the body, not knowing what to do with it, until God sent a crow that scratched the ground to show how to bury the dead. Seeing it, he cried out in regret that he could not even match a crow, and became one of the remorseful — the first death by human hand, and the first burial, born of the first envy."
  ],
  encounters: [
    enc("habil", "The rejected offering, the envy, and the first murder.", "Q 5:27–31"),
    enc("adam", "A son of the first man, whose grief began with his own household.", "Q 5:27"),
    enc("hawwa", "Born to the first mother, into a family marked by the first loss.", "Q 5:27")
  ]
});

/* ===== NIMROD ===== */
patch("nimrod", {
  depth: "supporting",
  story: [
    "He was the king whom God had given dominion, and that very gift swelled into a quarrel with Ibrāhīm about his Lord. When Ibrāhīm said, 'My Lord is He who gives life and causes death,' the king answered, 'I give life and cause death' — sparing one condemned man and killing another, as though that were the same. So Ibrāhīm met him on ground he could not steal: 'God brings the sun from the east; bring it then from the west.' The disbeliever was confounded, his tyranny silenced by the rising sun. Classical commentators name him Nimrūd."
  ],
  encounters: [
    enc("ibrahim", "Disputing about the Lord who gives life and brings the sun from the east.", "Q 2:258")
  ]
});

/* ===== ZULAIKHA ===== */
patch("zulaikha", {
  depth: "supporting",
  story: [
    "She was the wife of al-ʿAzīz of Egypt, in whose house Yūsuf was raised, and as he grew into the fullness of his beauty she desired him. She bolted the doors and called him to herself, but he refused, seeking refuge with God; and as he fled to the door she tore his shirt from behind, and they met her husband there. A witness from her own household judged the truth by the torn shirt, and her plot was laid bare.",
    "When the women of the city reproached her, she set them a banquet and called Yūsuf before them, and they cut their hands in awe of him, saying this was no mortal but a noble angel. Then she confessed openly: 'It was I who sought to seduce him, and he is of the truthful.' Later, when the truth came fully to light, she declared, 'Now the truth is evident' — a public confession after a private wrong. Later tradition and poetry name her Zulaykhā."
  ],
  encounters: [
    enc("yusuf", "The seduction refused, the torn shirt, and her open confession.", "Q 12:23–32, 12:51"),
    enc("aziz", "Wife of al-ʿAzīz, in whose house the trial unfolded.", "Q 12:25")
  ]
});

/* ===== SAMIRI ===== */
patch("samiri", {
  depth: "supporting",
  story: [
    "While Mūsā was away at the mountain, the people of Bani Israel grew restless, and al-Sāmirī seized the moment. He gathered the ornaments they had carried out of Egypt and cast them into the fire, shaping from the molten gold the body of a calf that gave a lowing sound. 'This is your god,' he said, 'and the god of Mūsā, but he has forgotten' — and a freed people, so lately delivered, bowed to a thing that could neither speak nor help nor harm them.",
    "When Mūsā returned in anger he confronted Hārūn, then turned to al-Sāmirī, who confessed he had grasped a handful from the trace of the messenger and his own soul had enticed him. Mūsā's sentence was exile: 'Go, and in this life you will say, Touch me not' — cast out from the people he had led astray, his calf to be burnt and scattered upon the sea."
  ],
  encounters: [
    enc("harun", "Leading the people astray while Hārūn was left in charge.", "Q 20:90–94"),
    enc("bani-israel", "Casting the calf that turned a freed people back to idols.", "Q 20:85–88")
  ]
});

/* ===== LUQMAN ===== */
patch("luqman", {
  depth: "major",
  story: [
    "God granted Luqmān wisdom, and the heart of that wisdom was gratitude: 'Be grateful to God, for whoever is grateful is grateful for his own good.' He was a sage rather than a king or a warrior, and his greatness lies in the counsel a father gives a son he loves — preserved in the surah that bears his name. Tradition places him in the time of Dāwud.",
    "His advice begins with the foundation: 'O my son, do not associate others with God — that is a great wrong.' From there it unfolds gently — that God sees the deed though it weigh no more than a mustard seed hidden in a rock; that one should establish prayer, enjoin good, forbid wrong, and bear patiently what befalls; that one should not turn his cheek from people in scorn nor walk the earth in pride, but be modest in bearing and lower the voice. It is a manual of tender, sustained wisdom from a father to a child."
  ],
  encounters: [
    enc("dawud", "A sage of his age, placed by tradition in the time of Dāwud.", "Q 31:12")
  ]
});

/* ===== ZAYD ===== */
patch("zayd", {
  depth: "supporting",
  story: [
    "He was a freed slave raised in the Prophet's household and among the earliest to believe — beloved so dearly that he was once called by the Prophet's name before the ruling on adoption was revealed. He is the only companion of the Prophet named directly in the Quran. When his marriage came to an end, God ordained that the Prophet marry his former wife, ending a custom that had treated adopted sons as though they were sons by blood: 'when Zayd had ended his need of her, We gave her to you in marriage,' so that no blame should attach to the believers in such a matter."
  ],
  encounters: [
    enc("muhammad", "The beloved companion, raised in his house and named in the revelation.", "Q 33:37")
  ]
});

/* ===== DHUL-KIFL ===== */
patch("dhul-kifl", {
  depth: "major",
  story: [
    "He is named in the Quran among the patient and the righteous, set beside Ismāʿīl and Idrīs: 'all were of the patient, and We admitted them into Our mercy; they were of the righteous.' His very name is read as 'the one of the double portion' or 'the one who guaranteed' — one who took upon himself a burden or a trust and fulfilled it faithfully, so that patience itself was made into a name.",
    "His identity is debated among the commentators: many link him to Ezekiel, while others hold he was a righteous man who pledged to fast by day, pray by night, and judge justly, and never broke his word. Whatever the account, the Quran joins him to the company of those who endured and kept faith, and counts him among the chosen and the good."
  ],
  encounters: [
    enc("ibrahim", "Among the patient prophets gathered into God's mercy.", "Q 21:85–86")
  ]
});

/* ===== NAHOR ===== */
patch("nahor", {
  depth: "minor",
  story: [
    "He was the brother of Abraham in the household of Terah, and though he does not stand among the prophets, the covenant line wound back through his house. From Nahor came Bethuel, and from Bethuel came Rebekah, who would marry Isaac, and Laban, into whose family Jacob would marry in Aram. So the wives of the patriarchs were drawn from his kin, and his name endures in the genealogies of Genesis as a quiet root of the chosen line."
  ],
  encounters: [
    enc("ibrahim", "Brother in the house of Terah, whose line met Abraham's again in marriage.", "Genesis 11"),
    enc("bethuel", "Father of Bethuel, and so grandfather of Rebekah and Laban.", "Genesis 22; Genesis 24")
  ]
});

/* ===== DAN ===== */
patch("dan", {
  depth: "minor",
  story: [
    "He was a son of Jacob by Bilhah, the handmaid of Rachel, and when she bore him Rachel said God had judged in her favour — so he was named Dan, 'judgement.' He stood among the brothers of Joseph and became the father of one of the twelve tribes of Israel. In the blessing Jacob gave before his death, Dan was named as one who would judge his people, a tribe given its place among the sons of Israel."
  ],
  encounters: [
    enc("yaqub", "A son blessed to judge his people among the tribes.", "Genesis 49"),
    enc("bilhah", "Born to Bilhah, the handmaid of Rachel.", "Genesis 30"),
    enc("naphtali", "Full brother through Bilhah.", "Genesis 30")
  ]
});

/* ===== ZEBULUN ===== */
patch("zebulun", {
  depth: "minor",
  story: [
    "He was the sixth and last son born to Jacob by Leah, who hoped at his birth that her husband would now dwell with her in honour. He became the father of one of the twelve tribes of Israel. In Jacob's blessing he was given a portion by the sea: Zebulun would dwell at the haven of the ships, a tribe set toward the shore and the trade of the waters."
  ],
  encounters: [
    enc("yaqub", "Blessed to dwell at the haven of the sea.", "Genesis 49"),
    enc("leah", "The last son Leah bore to Jacob.", "Genesis 30"),
    enc("issachar", "Full brother through Leah.", "Genesis 30")
  ]
});

/* ===== NAHUM ===== */
patch("nahum", {
  depth: "minor",
  story: [
    "He was a prophet of Israel whose burden fell upon Nineveh, the Assyrian capital that Yūnus had once warned and seen repent. In the generations after, the city returned to cruelty and bloodshed, and Nahum foretold its downfall — a jealous and avenging God, slow to anger but great in power, who would not leave the guilty unpunished. The city once spared at Yūnus's call would be overthrown at last, its endless violence answered with ruin."
  ],
  encounters: [
    enc("yunus", "Foretelling the doom of the Nineveh that Yūnus had seen spared.", "Nahum 1; Nahum 3"),
    enc("bani-israel", "A prophet raised among the people of Israel.", "Nahum 1"),
    enc("armiya", "A contemporary among the prophets of the age.", "Nahum 1")
  ]
});

/* ===== IBLIS ===== */
patch("iblis", {
  depth: "major",
  story: [
    "When God fashioned Ādam and commanded the angels to prostrate before him, all bowed save Iblīs, who held back in pride. 'I am better than him,' he claimed; 'You created me from fire and him from clay.' For this refusal he was cast out from grace and named the rejected. He asked then for respite until the Day they are raised, and was granted his reprieve.",
    "With that respite he vowed enmity to the children of Ādam — to approach them from before and behind, from their right and their left, and to find most of them ungrateful. The Quran sets him forth not as a power beside God but as a deceiver whose whisper holds no compulsion: he calls, and those who follow do so by their own choosing. His first sin was arrogance, and his lasting work is to dress that same arrogance as reason."
  ],
  encounters: [
    enc("adam", "Refusing to prostrate before him, then vowing to mislead his descendants.", "Q 7:11–18")
  ]
});

/* ===== LUT-WIFE ===== */
patch("lut-wife", {
  depth: "minor",
  story: [
    "She lived in the household of a prophet yet shared the heart of his people, and the Quran sets her forth as a parable of betrayal — a wife who, despite her nearness to a righteous man, was untrue to the trust between them. When ruin came upon the cities of the plain, she was counted among those who lingered behind and perished with them. In the Genesis account she is the one who looked back as the cities were overthrown and became a pillar of salt. Proximity to faith could not save what the will refused."
  ],
  encounters: [
    enc("lut", "The wife who stayed behind and perished while his household was saved.", "Q 66:10")
  ]
});

/* ===== MUSA-MOTHER ===== */
patch("musa-mother", {
  depth: "supporting",
  story: [
    "When Pharaoh's command threatened the newborn sons of Bani Israel, she was inspired by God to nurse her infant, and when she feared for him, to set him upon the river and not to fear or grieve, for he would be returned to her and made a messenger. With a heart all but emptied of everything else, she let the basket go and sent her daughter to follow it from afar. The current carried the child into the very household that sought his life.",
    "God turned away every nurse the palace offered so that the infant would refuse all but his own mother's milk, and through his sister's word she was brought to suckle him as a hired nurse. So he was restored to her, 'that her eye might be comforted and that she might not grieve' — the promise kept, and the trust she had voiced answered in full."
  ],
  encounters: [
    enc("musa", "Inspired to cast him on the river, then given him back to nurse.", "Q 28:7–13"),
    enc("musa-sister", "Sending her daughter to watch the basket from afar.", "Q 28:11")
  ]
});

/* ===== BANI-ISRAEL ===== */
patch("bani-israel", {
  depth: "major",
  story: [
    "The descendants of Yaʿqūb, they were enslaved under Pharaoh, their sons slaughtered and their people humbled, until God raised Mūsā to lead them out. They watched the sea part before them and close over their pursuers, were sheltered by cloud and fed with manna and quails in the wilderness, and were given the Torah at the mountain. Few peoples were shown such open signs.",
    "Yet the Quran recounts how quickly they wavered: asking for a god like the idols they passed, worshipping the golden calf while Mūsā was on the mountain, shrinking from the land they were promised, and quarrelling over the heifer they were told to slaughter. Carried through both deliverance and trial, they stand in the scripture as a mirror — a community reminded again and again of favours received, and called again and again to be faithful to them."
  ],
  encounters: [
    enc("musa", "Led out of bondage through the parted sea and given the Torah.", "Q 2:49–53"),
    enc("pharaoh", "Enslaved and oppressed before their deliverance.", "Q 2:49"),
    enc("yaqub", "The tribes descended from the patriarch Israel.", "Q 2:40")
  ]
});

/* ===== DHUL-QARNAYN ===== */
patch("dhul-qarnayn", {
  depth: "supporting",
  story: [
    "A righteous ruler whom God established firmly in the earth and granted a means to every end, he journeyed to where the sun seemed to set and then to where it seemed to rise, judging the peoples he met with even justice — punishing the wrongdoer, rewarding the believer with kindness, and speaking only ease to him. He sought neither plunder nor glory but the pleasure of his Lord, naming every success as a mercy from God.",
    "Reaching a place between two barriers he found a people who could scarcely understand speech, beset by Gog and Magog who spread corruption in the land. They offered him tribute to build a wall; he asked instead for their labour, and with blocks of iron and molten copper he raised a barrier none could scale or breach. Then he turned from all credit, saying, 'This is a mercy from my Lord,' and warned that when God's promise comes He will level it to dust."
  ],
  encounters: [
    enc("ibrahim", "Tradition places his just rule in the era of the patriarch.", "Q 18:83–98")
  ]
});

/* ===== ABU-LAHAB ===== */
patch("abu-lahab", {
  depth: "supporting",
  story: [
    "An uncle of the Prophet and a leader of the Meccan opposition, he met his nephew's call not with the softening of kinship but with open hostility. A whole surah is named for him and turns his own by-name — 'father of flame' — into his sentence: his wealth and all he earned would avail him nothing, and he would burn in a flame, his wife beside him bearing wood. Of the early enemies of the message, his rejection is singled out in the Quran as a standing warning that blood and riches cannot purchase against the truth one has chosen to fight."
  ],
  encounters: [
    enc("muhammad", "An uncle whose enmity is condemned in a surah named after him.", "Q 111"),
    enc("umm-jamil", "His wife, named beside him in the surah as a carrier of wood.", "Q 111:4")
  ]
});

/* ===== LEAH ===== */
patch("leah", {
  depth: "minor",
  story: [
    "Unnamed in the Quran but remembered in the Bible and Torah, she was the elder daughter of Lābān and a wife of Yaʿqūb, given to him before her sister Rāḥīl. From her came several of the twelve fathers of the tribes — among them Lāwī and Yahūdhā, and so the priesthood and the kingship that would descend through Israel. In the tradition she is recalled simply as a wife of Yaʿqūb and mother of the patriarchs, a mother of many tribes whose line carried two of the great trusts of the covenant."
  ],
  encounters: [
    enc("yaqub", "The elder daughter of Lābān given to him in marriage.", "Genesis 29–30"),
    enc("rahil", "Her younger sister and fellow wife of Yaʿqūb.", "Genesis 29"),
    enc("bani-israel", "Ancestress of the tribes of Lāwī and Yahūdhā.", "Genesis 29–30")
  ]
});

/* ===== BETHUEL ===== */
patch("bethuel", {
  depth: "minor",
  story: [
    "Named in the Bible and Torah rather than the Quran, he was a son of Naḥōr and the father of Rebekah and Laban, of Aram-Naharaim. When Ibrāhīm's servant came seeking a wife for Isḥāq, it was Bethuel who, with his son Laban, consented to send Rebekah to wed into the covenant family. Through that consent his daughter became a matriarch of the line of promise, and his household joined to the household of Ibrāhīm."
  ],
  encounters: [
    enc("nahor", "Son of the brother of Ibrāhīm, in the line of Aram-Naharaim.", "Genesis 22"),
    enc("rebecca", "Father who consented to send his daughter to wed Isḥāq.", "Genesis 24"),
    enc("laban", "Father whose son joined him in giving Rebekah in marriage.", "Genesis 24")
  ]
});

/* ===== NAPHTALI ===== */
patch("naphtali", {
  depth: "minor",
  story: [
    "Unnamed in the Quran but recorded in the Bible and Torah, he was a son of Yaʿqūb born to Bilhah, and the founder of one of the twelve tribes of Israel. In the blessing Yaʿqūb spoke over his sons, Naftālī is likened to a doe let loose, one who bears goodly words. He stands among the brothers of Yūsuf and the fathers of the tribes, a link in the line through which the Children of Israel descended."
  ],
  encounters: [
    enc("yaqub", "A son blessed by his father as a doe let loose.", "Genesis 49"),
    enc("bilhah", "His mother, by whom Yaʿqūb fathered him.", "Genesis 30"),
    enc("yusuf-brothers", "Numbered among the brothers and fathers of the tribes.", "Genesis 30")
  ]
});

/* ===== DAUGHTERS-OF-LOT ===== */
patch("daughters-of-lot", {
  depth: "minor",
  story: [
    "Named in the Bible and Torah, they were the daughters of Lūṭ, led out of the doomed city by the angel-guests before its overthrow. Where a whole people perished for their corruption, these few were spared and brought to safety among the believing household. In the Genesis account they survive the destruction of the cities of the plain, and from them came the peoples of Moab and Ammon. Their rescue is a small remnant carried out of ruin."
  ],
  encounters: [
    enc("lut", "Daughters led out of the city before its destruction.", "Genesis 19"),
    enc("lut-wife", "Spared the overthrow that took their mother who lingered behind.", "Genesis 19")
  ]
});

/* ===== ZEPHANIAH ===== */
patch("zephaniah", {
  depth: "minor",
  story: [
    "Unnamed in the Quran but counted among the prophets of the Bible, he proclaimed the coming day of the Lord — a day of reckoning against pride and complacency. He warned of judgement upon the unfaithful and called the humble of the land to seek righteousness and meekness, that they might be sheltered when that day arrived. His message is one of warning bound to mercy: that those who turn to God in humility find refuge, while the proud find none."
  ],
  encounters: [
    enc("bani-israel", "Warning the people to seek righteousness before the day of reckoning.", "Zephaniah 2"),
    enc("armiya", "A fellow prophet of his generation among the people.", "Zephaniah 1")
  ]
});

/* ===== Wife of Nuh ===== */
patch("nuh-wife", {
  depth: "minor",
  story: [
    "She shared the home of a prophet and yet stood apart from his faith. The Quran sets her, beside the wife of Lūṭ, as a parable for those who disbelieve: married to two of God's righteous servants, the two women betrayed their husbands and so gained nothing of their nearness to God. When the verdict came it was said to them, 'Enter the Fire with those who enter.' Proximity to prophecy did not save her, for faith is not inherited from a household but chosen by the heart."
  ],
  encounters: [
    enc("nuh", "The believing husband whom she betrayed, gaining nothing thereby.", "Q 66:10")
  ]
});

/* ===== Binyamin ===== */
patch("binyamin", {
  depth: "supporting",
  story: [
    "He was the youngest son of Yaʿqūb and the full brother of Yūsuf, kept close to his grieving father after the elder brothers had taken Yūsuf away. When famine drove the brothers down to Egypt, Yūsuf — now the trusted minister, still unknown to them — required that they bring this youngest brother to him, and he drew him aside to make himself known: 'I am your brother.'",
    "To keep him in Egypt without his brothers' knowledge, Yūsuf had the king's measuring-cup placed in Binyāmīn's saddlebag, then had it found there, so that by the law the brothers themselves named, the youngest could be held back. The device gave father and lost son their reunion at last, and Binyāmīn — Benjamin in the Torah — became forefather of one of the tribes of Israel."
  ],
  encounters: [
    enc("yusuf", "The brother who drew him aside and kept him in Egypt by the device of the cup.", "Q 12:69–79"),
    enc("yaqub", "The youngest son kept close after the loss of Yūsuf.", "Q 12:69")
  ],
  names: { hebrew: "בִּנְיָמִין (Binyāmīn)" }
});

/* ===== Sister of Musa ===== */
patch("musa-sister", {
  depth: "supporting",
  story: [
    "When the mother of Mūsā set her infant adrift on the river to spare him from Pharaoh's slaughter, she bade his sister follow at a distance and watch. The girl trailed the basket along the bank, unseen, until it was drawn into the palace itself. Seeing the household seek a nurse for the child, she came forward with quiet wit and offered to point them to a family who would suckle him — and so led them back to his own mother, that mother and child might be reunited and her eyes be cooled. By tradition she is Maryam, sister of Hārūn, remembered in the Torah as Miriam the prophetess."
  ],
  encounters: [
    enc("musa", "Following the basket along the river to watch over her infant brother.", "Q 28:11"),
    enc("musa-mother", "Guiding the palace back to her own mother to nurse the child.", "Q 28:12")
  ],
  names: { hebrew: "מִרְיָם (Miryām)" }
});

/* ===== Imran ===== */
patch("imran", {
  depth: "supporting",
  story: [
    "He is the father after whom a whole surah is named — Āl ʿImrān, the Family of ʿImrān — and his house is set among those God chose above the worlds, beside Ādam, Nūḥ and the family of Ibrāhīm. Of the line of Bani Israel, his household carried the trust of devotion into the age of Maryam and ʿĪsā.",
    "It was his wife who, expecting a child, vowed what was in her womb to the service of God, and was answered with Maryam — and through Maryam with ʿĪsā. So through ʿImrān's house ran a chain of grace, one offspring of another, kept pure and dedicated to its Lord."
  ],
  encounters: [
    enc("maryam", "Father of the dedicated daughter through whom came ʿĪsā.", "Q 3:35–37"),
    enc("imran-wife", "Husband of the woman who vowed her unborn child to God's service.", "Q 3:35"),
    enc("bani-israel", "His chosen house standing within the line of Bani Israel.", "Q 3:33")
  ]
});

/* ===== Ashab al-Kahf ===== */
patch("ashab-kahf", {
  depth: "supporting",
  story: [
    "They were young men who believed in their one Lord in a generation that had turned to other gods, and when their faith put them in danger from a tyrannical people, they withdrew to a cave and prayed, 'Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair.' God sealed their ears, and they slept through the long years while the world outside grew old without them.",
    "When at last He raised them they supposed they had slept but a day or part of a day, and sent one of their number with silver coins to buy food — only for his ancient money and forgotten ways to reveal the wonder to the people of the city. The Quran turns aside from idle dispute over their number and the years of their stay, fixing instead on the sign: that the One who held them in sleep and woke them can as easily raise the dead. Their faithful dog lay at the threshold, and over them God's power kept watch."
  ],
  encounters: [
    enc("isa", "Monotheists holding to one God in the generations after ʿĪsā.", "Q 18:9–26")
  ]
});

/* ===== Wife of Abu Lahab ===== */
patch("umm-jamil", {
  depth: "minor",
  story: [
    "She joined her husband Abū Lahab in his open enmity toward the Prophet, and the Quran answers her in a single, lasting image: the 'carrier of firewood,' with a rope of twisted palm-fibre about her neck. By tradition she would scatter thorns in the Prophet's path by night, and the surah binds her fate to her husband's — his wealth and gains availing him nothing, and she at his side in the Fire. Named in the biographical tradition as Umm Jamīl, sister of Abū Sufyān, she stands as a warning that high birth offers no shelter to those who war against the truth."
  ],
  encounters: [
    enc("abu-lahab", "Sharing her husband's enmity and his fate, the rope about her neck.", "Q 111:4–5"),
    enc("muhammad", "The opponent who carried thorns to scatter in the Prophet's path.", "Q 111:4")
  ]
});

/* ===== Lawi ===== */
patch("lawi", {
  depth: "minor",
  story: [
    "Third of the sons of Yaʿqūb by Leah, he stands among the twelve brothers of Yūsuf and the fathers of the tribes of Israel. The Quran does not name the brothers one by one, but tradition counts him among them, and from his line came the keepers of the sanctuary — the priests and Levites who served the place of worship. Above all, the line of Mūsā and Hārūn is traced back to him, so that through Lāwī passed both the office of the altar and the gift of prophecy."
  ],
  encounters: [
    enc("yaqub", "Third son in the house of his father.", "Genesis 29"),
    enc("musa", "Ancestor of the prophet drawn from his line.", "Exodus 6"),
    enc("harun", "Forefather of the priestly office descending to him.", "Exodus 6")
  ]
});

/* ===== Keturah ===== */
patch("keturah", {
  depth: "minor",
  story: [
    "After the death of Sarah, Ibrāhīm took Keturah, and she bore him further sons — among them Midian, ancestor of the people of Madyan. To these later children he gave gifts and sent them eastward, away from Isḥāq, so that from her line came peoples of the Arabian east. The Quran does not name her, but the Torah remembers Qᵉṭūrāh, and classical commentary keeps her as a wife of Ibrāhīm and an ancestress of Madyan, the land to which Mūsā would one day flee and where Shuʿayb would be sent."
  ],
  encounters: [
    enc("ibrahim", "The wife he took after Sarah, mother of his eastern sons.", "Genesis 25"),
    enc("madyan", "Ancestress of Midian through her son.", "Genesis 25")
  ]
});

/* ===== Gad ===== */
patch("gad", {
  depth: "minor",
  story: [
    "He was a son of Yaʿqūb by Zilpah, the handmaid of Leah, and brother to Asher among the twelve who fathered the tribes of Israel. At the naming his mother spoke of good fortune, and at the last Yaʿqūb blessed him with words of struggle and triumph: a raiding troop would press upon Gād, yet he would press upon their heel at the end. From him descended the tribe of Gad, one of the asbāṭ of Bani Israel."
  ],
  encounters: [
    enc("yaqub", "A son blessed with words of struggle and final triumph.", "Genesis 49"),
    enc("zilpah", "Born to the handmaid of Leah.", "Genesis 30"),
    enc("asher", "Brother by the same mother among the twelve.", "Genesis 30")
  ]
});

/* ===== Obed ===== */
patch("obed", {
  depth: "minor",
  story: [
    "He was born of Boaz and Ruth the Moabite, a child in whom the women of Bethlehem saw the restoration of a stricken family and a comfort to old Naomi. Though Scripture gives little of his own life, his place in the line is everything: father of Jesse and grandfather of David the king. Through ʻŌvēd the covenant passed quietly from a famine-struck household to the throne of Israel, a reminder that a single faithful link can carry a promise across the generations."
  ],
  encounters: [
    enc("boaz", "Son of Boaz, the redeemer of his family's line.", "Ruth 4"),
    enc("ruth", "Son of Ruth the Moabite, comfort to her household.", "Ruth 4"),
    enc("jesse", "Father of Jesse and so grandfather of David.", "Ruth 4"),
    enc("dawud", "Grandfather of the shepherd-king through his son Jesse.", "1 Chronicles 2")
  ]
});

/* ===== Vashti ===== */
patch("vashti", {
  depth: "minor",
  story: [
    "She was queen of Persia, wife of Ahasuerus, and at the height of his feast she refused his summons to be displayed before his drunken princes. For that refusal she was deposed, and the search that followed for a new queen opened the way for Esther to rise — and through Esther for her people to be delivered. The Torah remembers Waštī's name and her single act of refusal, which, within God's larger design, set in motion a far greater rescue."
  ],
  encounters: [
    enc("ahasuerus", "The king whose summons she refused, and who deposed her.", "Esther 1"),
    enc("esther", "The queen whose rise her refusal made way for.", "Esther 1")
  ]
});

})();
