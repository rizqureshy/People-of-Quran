/* People of the Quran — Nations, Tribes & Communities */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;
  P.push(
    {
      id: "madyan",
      name: "The People of Madyan",
      title: "The Merchants Who Cheated the Scales",
      named: true,
      era: "Other Prophets",
      group: "Nations & Tribes",
      depth: "supporting",
      isCommunity: true,
      names: { quran: "مَدْيَن (Madyan)", bible: "Midian", torah: "מִדְיָן (Midyān)" },
      archetypes: ["arrogant-elite", "oppressed"],
      story: [
        "A trading people settled along the caravan routes of north-west Arabia, Madyan grew prosperous and corrupt. They gave short measure and short weight, cheating their neighbours in the marketplace and waylaying travellers on the road. To them God sent Shuʿayb, one of their own, who called them to worship the one God and to deal honestly in the balance. They mocked him, threatened him, and clung to their fraud — and were seized by a punishment of a dreadful day, remembered as the day of the overshadowing cloud."
      ],
      lessons: ["Honesty in the marketplace is part of the worship of God.",
                "A people can be ruined as much by fraud in trade as by idolatry."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "To Madyan was sent their brother Shuʿayb, who urged them to fill the measure and weight in justice; they rejected him and were destroyed by the punishment of the day of the cloud.", "Q 7:85–93; Q 11:84–95; Q 26:176–191", "Surahs al-Aʿrāf, Hūd, al-Shuʿarāʼ"),
        b("bible", "Midian appears as a people of the desert margins; Moses, fleeing Egypt, takes refuge among them and marries a daughter of their priest.", "Exodus 2–3", "Exodus"),
        b("torah", "The Midianites descend from Midian, a son of Abraham by Keturah.", "Genesis 25:1–4", "Genesis"),
        b("tradition", "Classical tafsir locates Madyan near the Gulf of Aqaba; the Aṣḥāb al-Aykah (Companions of the Wood) are widely identified with the same people.", "Ibn Kathir, Qisas al-Anbiyaʼ", "Tafsir")
      ],
      encounters: [
        enc("shuayb", "The prophet raised from among them, who pleaded for honest scales.", "Q 11:84"),
        enc("musa", "The land that sheltered Musa in his years of exile.", "Q 28:22–28")
      ],
      relations: [ r("shuayb", "kin", "their prophet, sent from among them"), r("musa", "contemporary") ]
    },
    {
      id: "qawm-lut",
      name: "The People of Lut",
      title: "The Cities of the Plain",
      named: false,
      era: "Patriarchs",
      group: "Nations & Tribes",
      depth: "supporting",
      isCommunity: true,
      names: { quran: "قَوْم لُوط (Qawm Lūṭ)", bible: "Sodom and Gomorrah", torah: "סְדֹם (Sĕdōm)" },
      archetypes: ["arrogant-elite", "oppressed"],
      story: [
        "The townships to which Lut was sent committed an indecency no people had committed before them — approaching men with desire, waylaying travellers, and meeting depravity in their gatherings. Lut warned them and was answered with threats of expulsion. When the angelic messengers came as guests, the people pressed at his door; at dawn the cities were overturned and rained with stones of baked clay. Only Lut and his believing household were delivered, save his wife, who lingered with the city she belonged to."
      ],
      lessons: ["A society can normalise corruption until warning itself becomes intolerable.",
                "Deliverance follows faith, not lineage — even a prophet's wife was left behind."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "The people of Lut rejected the messengers and persisted in their transgression, and their towns were overturned and rained with stones of hard clay.", "Q 7:80–84; Q 11:77–83; Q 26:160–175", "Surahs al-Aʿrāf, Hūd, al-Shuʿarāʼ"),
        b("bible", "Sodom and Gomorrah are destroyed by fire and brimstone; Lot is rescued, and his wife becomes a pillar of salt.", "Genesis 19", "Genesis"),
        b("torah", "The outcry of Sodom and Gomorrah rises before God, and the cities of the plain are overthrown.", "Genesis 18–19", "Genesis"),
        b("tradition", "Tafsir places the overturned cities by the Dead Sea, on the route the Quran says wrongdoers still pass by morning and night.", "Ibn Kathir, Qisas al-Anbiyaʼ", "Tafsir")
      ],
      encounters: [
        enc("lut", "Their lone warner, harassed and threatened for his stand.", "Q 11:78–79"),
        enc("lut-wife", "One of their own who stayed among them and perished with them.", "Q 66:10")
      ],
      relations: [ r("lut", "kin", "their prophet"), r("ibrahim", "contemporary") ]
    },
    {
      id: "qawm-yunus",
      name: "The People of Nineveh",
      title: "The City That Repented in Time",
      named: false,
      era: "Other Prophets",
      group: "Nations & Tribes",
      depth: "supporting",
      isCommunity: true,
      names: { quran: "قَوْم يُونُس (Qawm Yūnus)", bible: "Nineveh", torah: "נִינְוֵה (Nīnwēh)" },
      archetypes: ["repentant", "truth-seeker"],
      story: [
        "Alone among the nations threatened with destruction, the people of Yunus turned back before the punishment fell. Their prophet, distressed at their rejection, departed in anger — yet when the signs of the promised chastisement loomed, the whole city believed, humbled itself, and cried to God. He lifted the punishment from them and let them enjoy their lives for a time. The Quran holds them up as the one community whose faith availed them after warning, and Yunus is returned to a people now willing to listen."
      ],
      lessons: ["Sincere repentance, in time, can avert what was decreed.",
                "A whole city can change its course when it humbles itself before God."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "No town believed and benefited from its faith except the people of Yunus; when they believed, the punishment of disgrace was removed from them.", "Q 10:98; Q 37:147–148", "Surahs Yūnus, al-Ṣāffāt"),
        b("bible", "Jonah preaches against Nineveh; the people fast and repent, and God spares the city.", "Jonah 3", "Jonah"),
        b("torah", "Nineveh, the great Assyrian city, appears in the prophetic books as a seat of empire and a place of judgement.", "Nahum 1–3", "Nahum"),
        b("tradition", "Tafsir identifies the city as Nineveh in the land of Mosul, and recounts the people coming out in repentance with their children and livestock.", "Ibn Kathir, Tafsir", "Tafsir")
      ],
      encounters: [
        enc("yunus", "The prophet who left them, then returned to a people transformed.", "Q 37:147")
      ],
      relations: [ r("yunus", "kin", "their prophet") ]
    },
    {
      id: "ashab-al-fil",
      name: "The People of the Elephant",
      title: "The Army Turned Back from the Kaʿba",
      named: false,
      era: "Revelation in Mecca",
      group: "Nations & Tribes",
      depth: "supporting",
      isCommunity: true,
      names: { quran: "أَصْحَاب الْفِيل (Aṣḥāb al-Fīl)", tradition: "the army of Abraha" },
      archetypes: ["arrogant-elite", "tyrant"],
      story: [
        "In the year of the Prophet's birth, an army marched on Mecca with elephants at its head, led by the Abyssinian governor Abraha, intent on destroying the Kaʿba and diverting the pilgrimage to his cathedral in Sanaa. The Quran recalls how God turned their scheme astray, sending birds in flocks that pelted them with stones of baked clay, leaving them like devoured stubble. The Sacred House was preserved, and the event entered Arab memory as the Year of the Elephant."
      ],
      lessons: ["No power, however vast, can overturn what God protects.",
                "The downfall of the mighty came not from armies but from the smallest of creatures."],
      sources: ["quran", "tradition", "historical"],
      entries: [
        b("quran", "God made the plot of the Companions of the Elephant go astray, sending against them birds in flocks that struck them with stones of baked clay.", "Q 105:1–5", "Surah al-Fīl"),
        b("tradition", "The sīra records the campaign of Abraha al-Ashram against Mecca, the failure of his elephant to advance, and the destruction of his host.", "Ibn Isḥāq / Ibn Hishām, Sīra", "Sira"),
        b("historical", "The episode is dated to around 570 CE, the traditional Year of the Elephant, the year of the Prophet's birth.", "Ibn Hishām; historical accounts", "History")
      ],
      encounters: [
        enc("muhammad", "Their defeat in the year of his birth, an omen of the Sacred House preserved for him.", "Q 105:1")
      ],
      relations: [ r("muhammad", "contemporary", "their defeat fell in the year of his birth"), r("quraysh", "opponent", "they marched against the keepers of the Kaʿba") ]
    },
    {
      id: "quraysh",
      name: "The Tribe of Quraysh",
      title: "The Keepers of the Sacred House",
      named: true,
      era: "Revelation in Mecca",
      group: "Nations & Tribes",
      depth: "major",
      isCommunity: true,
      names: { quran: "قُرَيْش (Quraysh)", tradition: "Ahl Makka — the people of Mecca" },
      archetypes: ["arrogant-elite", "truth-seeker"],
      story: [
        "Quraysh were the leading tribe of Mecca, custodians of the Kaʿba and the pilgrimage, knit together by their winter and summer caravans of trade. The Quran reminds them of the security and provision God granted them and calls them to worship the Lord of that House. From among them rose the final Messenger, and within them the message met its fiercest early opposition — boycott, ridicule and persecution — before many of their number became its foremost carriers. They are the tribe whose name a short surah bears."
      ],
      lessons: ["Privilege and proximity to the sacred bring responsibility, not exemption.",
                "The same people who first opposed the message later carried it furthest."],
      sources: ["quran", "tradition", "historical"],
      entries: [
        b("quran", "For the security of Quraysh, their caravans of winter and summer, let them worship the Lord of this House who fed them against hunger and secured them from fear.", "Q 106:1–4", "Surah Quraysh"),
        b("tradition", "The sīra records the leaders of Quraysh, their boycott of the Prophet's clan, and the gradual entry of their notables into faith.", "Ibn Isḥāq / Ibn Hishām, Sīra", "Sira"),
        b("historical", "Quraysh controlled Mecca's sanctuary and trade in the sixth and seventh centuries CE, organising the caravans the Quran names.", "Ibn Hishām; historical accounts", "History")
      ],
      encounters: [
        enc("muhammad", "The tribe from which the Messenger arose and which both opposed and finally embraced him.", "Q 106:1"),
        enc("abu-lahab", "One of their chiefs whose hostility a whole surah answers.", "Q 111")
      ],
      relations: [ r("muhammad", "kin", "the tribe of the Prophet"), r("abu-lahab", "kin") ]
    },
    {
      id: "asbat-bani-israil",
      name: "The Twelve Tribes of Israel",
      title: "The Children of Yaʿqub",
      named: true,
      era: "Patriarchs",
      group: "Nations & Tribes",
      depth: "supporting",
      isCommunity: true,
      names: { quran: "الْأَسْبَاط (al-Asbāṭ)", bible: "the Twelve Tribes of Israel", torah: "שִׁבְטֵי יִשְׂרָאֵל (Shivṭē Yiśrāʼēl)" },
      archetypes: ["oppressed", "truth-seeker"],
      story: [
        "From the twelve sons of Yaʿqub — who is Israel — descended the twelve tribes, the Asbāṭ, named in the Quran among those to whom revelation was given. They went down into Egypt in the days of Yusuf, multiplied into a nation, and were later enslaved under Pharaoh before their deliverance through Musa. At the rock that Musa struck, twelve springs gushed forth, each tribe knowing its own drinking-place. The Asbāṭ are the lineage through which the prophets of Bani Israel came, the collective ancestry of a people central to the revealed scriptures."
      ],
      lessons: ["A single family can grow into a nation that carries revelation across ages.",
                "The tribes were provided for distinctly — each knew its own spring."],
      sources: ["quran", "bible", "torah", "tradition"],
      entries: [
        b("quran", "Revelation was sent to Ibrāhīm, Ismāʿīl, Isḥāq, Yaʿqūb and the Asbāṭ; and from the rock Musa struck, twelve springs flowed, each of the twelve tribes knowing its drinking-place.", "Q 2:136; Q 7:160", "Surahs al-Baqara, al-Aʿrāf"),
        b("bible", "The twelve sons of Jacob become the twelve tribes of Israel, allotted their portions of the land.", "Genesis 49; Numbers 1", "Genesis, Numbers"),
        b("torah", "Jacob, renamed Israel, blesses his twelve sons, the heads of the tribes.", "Genesis 35:22–26; 49", "Genesis"),
        b("tradition", "Tafsir explains the Asbāṭ as the tribes descended from the sons of Yaʿqūb, paralleling the twelve tribes of the Torah.", "Ibn Kathir, Tafsir", "Tafsir")
      ],
      encounters: [
        enc("yaqub", "Their father, Israel, from whose sons they descend.", "Q 2:136"),
        enc("musa", "The prophet through whom they were delivered and provided.", "Q 7:160")
      ],
      relations: [ r("yaqub", "descendant", "the tribes of his twelve sons"), r("yusuf", "kin"), r("bani-israel", "kin", "the wider nation they form") ]
    },
    {
      id: "ashab-al-jannah",
      name: "The Owners of the Garden",
      title: "The Orchard Withheld from the Poor",
      named: false,
      era: "Other Prophets",
      group: "Nations & Tribes",
      depth: "minor",
      isCommunity: true,
      names: { quran: "أَصْحَاب الْجَنَّة (Aṣḥāb al-Jannah)" },
      archetypes: ["arrogant-elite", "repentant"],
      story: [
        "The Quran tells of the owners of a fruitful garden who swore to harvest it at dawn, deliberately leaving nothing for the poor and making no exception in their oath. In the night a visitation from their Lord swept over the garden while they slept, leaving it black and barren. Coming in the morning, they thought at first they had lost their way, then realised their loss and confessed their wrong, blaming their own arrogance and turning to God. Their story is set as a parable of how miserliness and forgetting the poor can strip a blessing away."
      ],
      lessons: ["To shut the poor out of one's wealth is to invite its loss.",
                "Realising one's fault and turning back is the beginning of repair."],
      sources: ["quran", "tradition"],
      entries: [
        b("quran", "The owners of the garden resolved to reap it withholding from the poor; their garden was destroyed in the night, and they repented of their excess.", "Q 68:17–33", "Surah al-Qalam"),
        b("tradition", "Tafsir presents the parable as a warning against the miserliness that withholds the due of the poor, contrasting these owners with their God-fearing forebears.", "Ibn Kathir, Tafsir", "Tafsir")
      ],
      relations: [ r("muhammad", "contemporary", "a parable revealed to him for his people") ]
    },
    {
      id: "al-rum",
      name: "The Romans",
      title: "The Byzantines of the Promised Victory",
      named: true,
      era: "Revelation in Mecca",
      group: "Nations & Tribes",
      depth: "minor",
      isCommunity: true,
      names: { quran: "الرُّوم (al-Rūm)", historical: "the Eastern Roman (Byzantine) Empire" },
      archetypes: ["truth-seeker"],
      story: [
        "The Quran opens a surah by naming the Romans — the Christian Byzantines — defeated in a nearby land by the Persians, and foretells that after their defeat they would themselves be victorious within a few years, on a day the believers would rejoice. As a People of the Book, their fortunes were of close interest to the early Muslims. The prophecy of their turnabout against the Persians is recalled in tradition as a sign that came to pass, and the surah bears their name."
      ],
      lessons: ["The rise and fall of empires unfold within God's decree.",
                "What seems a final defeat may be the prelude to victory."],
      sources: ["quran", "tradition", "historical"],
      entries: [
        b("quran", "The Romans have been defeated in a nearby land, yet after their defeat they will be victorious within a few years — and on that day the believers will rejoice.", "Q 30:2–5", "Surah al-Rūm"),
        b("tradition", "Tafsir links the verses to the wars between Byzantium and Sasanian Persia, and recounts the early Muslims' anticipation of the foretold reversal.", "Ibn Kathir, Tafsir", "Tafsir"),
        b("historical", "The Byzantine–Sasanian wars of the early seventh century CE saw heavy Roman losses followed by Heraclius's counter-offensives.", "historical accounts", "History")
      ],
      relations: [ r("muhammad", "contemporary", "the prophecy concerning them was revealed in his time") ]
    },
    {
      id: "ashab-al-rass",
      name: "The Companions of the Rass",
      title: "The People of the Well",
      named: true,
      era: "Other Prophets",
      group: "Nations & Tribes",
      depth: "minor",
      isCommunity: true,
      names: { quran: "أَصْحَاب الرَّسّ (Aṣḥāb al-Rass)" },
      archetypes: ["arrogant-elite", "oppressed"],
      story: [
        "The Quran names the Companions of the Rass among the rejecting peoples of old, listed beside ʿAd, Thamud and the people of Lut as nations destroyed for denying their messengers. The Rass is traditionally understood to be a well or a hewn pit beside which they dwelt. Their precise history is not detailed in the text; the Quran cites them as one more example in the long roll of communities that turned away from the warners sent to them, and met the consequence."
      ],
      lessons: ["The Quran preserves the memory of even the obscure nations that rejected guidance.",
                "Every people received a warner, and every rejection had its reckoning."],
      sources: ["quran", "tradition"],
      entries: [
        b("quran", "The Companions of the Rass are named among the peoples who denied their messengers, listed with ʿĀd, Thamūd and others who were destroyed.", "Q 25:38; Q 50:12", "Surahs al-Furqān, Qāf"),
        b("tradition", "Tafsir differs on their identity, generally taking the Rass to be a well or pit, and counts them among the destroyed nations whose details are not fully preserved.", "Ibn Kathir, Tafsir", "Tafsir")
      ],
      relations: [ r("muhammad", "contemporary", "named among the warning examples revealed to him"), r("thamud", "contemporary", "listed alongside them among the destroyed peoples") ]
    },
    {
      id: "qawm-tubba",
      name: "The People of Tubbaʿ",
      title: "The Kings of the South",
      named: true,
      era: "Other Prophets",
      group: "Nations & Tribes",
      depth: "minor",
      isCommunity: true,
      names: { quran: "قَوْم تُبَّع (Qawm Tubbaʿ)", historical: "the Tubbaʿ kings of Himyar" },
      archetypes: ["arrogant-elite"],
      story: [
        "The Quran twice mentions the people of Tubbaʿ, a title borne by the kings of the Himyarite realm in southern Arabia. It places them among the earlier nations who rejected guidance and were destroyed, asking whether the Meccans were any better than they. The text does not dwell on their story, holding them up rather as one of the powerful peoples of the past whose strength did not save them when they denied the truth."
      ],
      lessons: ["The greatness of past kingdoms is recalled only as a warning to the present.",
                "Worldly power offers no defence against the consequence of denial."],
      sources: ["quran", "tradition", "historical"],
      entries: [
        b("quran", "Are the Meccans better, or the people of Tubbaʿ and those before them, whom God destroyed for they were criminals?", "Q 44:37; Q 50:14", "Surahs al-Dukhān, Qāf"),
        b("tradition", "Tafsir takes Tubbaʿ as the dynastic title of the Himyarite kings of Yemen, counting his people among the perished nations.", "Ibn Kathir, Tafsir", "Tafsir"),
        b("historical", "The Tubbaʿ were rulers of the Himyarite kingdom that dominated south Arabia in the centuries before Islam.", "historical accounts", "History")
      ],
      relations: [ r("muhammad", "contemporary", "cited as a warning to the Meccans of his day"), r("saba", "kin", "kindred southern Arabian peoples") ]
    }
  );
})();
