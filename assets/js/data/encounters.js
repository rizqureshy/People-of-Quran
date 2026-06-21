/* People of Scriptures — Encounters (wave 3)
 * ------------------------------------------------------------------
 * Adds key relational "encounters" to figures who had relations but no
 * encounters recorded. Each encounter is drawn from the person's own
 * relations and cited from their sourced entries. Runs after stories.js.
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
  }


/* ===== IDRIS ===== */
patch("idris", {
  encounters: [
    enc("adam", "A descendant of the first man, kept truthful and patient in the early generations.", "Q 19:56–57"),
    enc("nuh", "An ancestor in the line that ran on toward Nūḥ.", "Q 19:56–57")
  ]
});

/* ===== SAHARA (The Magicians of Pharaoh) ===== */
patch("sahara", {
  encounters: [
    enc("musa", "Defeated by his sign, they fall in prostration and believe.", "Q 7:113–126"),
    enc("pharaoh", "Defying his threat of crucifixion and torture, they hold to their new faith.", "Q 20:70–73")
  ]
});

/* ===== YAHUDHA (Judah) ===== */
patch("yahudha", {
  encounters: [
    enc("yusuf", "He persuades the brothers to sell him, then later offers himself in Benyāmīn's place.", "Genesis 37; Genesis 44"),
    enc("yaqub", "A son who would not return until leave was given over the youngest brother.", "Genesis 44"),
    enc("dawud", "The royal tribe springs from his line.", "Matthew 1")
  ]
});

/* ===== DANIYAL (Daniel) ===== */
patch("daniyal", {
  encounters: [
    enc("bani-israel", "A captive of his people in Babylon, granted understanding of dreams and visions.", "Daniel 1–6"),
    enc("armiya", "A faithful one of the exile generation.", "Daniel 1–6")
  ]
});

/* ===== QAWM-TUBBA (The People of Tubbaʿ) ===== */
patch("qawm-tubba", {
  encounters: [
    enc("muhammad", "Held up to the Meccans of his day as a perished people who were no better than they.", "Q 44:37"),
    enc("saba", "Kindred kings of the south, counted among the nations destroyed.", "Q 50:14")
  ]
});

/* ===== ELEAZAR ===== */
patch("eleazar", {
  encounters: [
    enc("harun", "Invested with the high priesthood at his father's death upon the mountain.", "Numbers 20:25–28"),
    enc("yusha", "Standing with him to divide the land among the tribes.", "Joshua 14:1")
  ]
});

/* ===== BEZALEL ===== */
patch("bezalel", {
  encounters: [
    enc("musa", "Filled with the Spirit of God to craft the sanctuary at his charge.", "Exodus 31:1–11"),
    enc("yahudha", "Of the tribe of Judah, endowed for every craft of the tabernacle.", "Exodus 35:30–35")
  ]
});

/* ===== OTHNIEL ===== */
patch("othniel", {
  encounters: [
    enc("caleb", "The younger kinsman of Kālēb, raised up as the first judge.", "Judges 3:7–11"),
    enc("yusha", "Succeeding the leadership after the conquest, delivering Israel.", "Judges 3:7–11")
  ]
});

/* ===== JEPHTHAH ===== */
patch("jephthah", {
  encounters: [
    enc("bani-israel", "An outcast recalled to lead his people against ʿAmmon.", "Judges 11–12"),
    enc("gideon", "A later judge in the line of deliverers raised over Israel.", "Judges 11–12")
  ]
});

/* ===== BOAZ ===== */
patch("boaz", {
  encounters: [
    enc("ruth", "The kinsman-redeemer who takes Rūt to wife at the threshing floor.", "Ruth 2–4"),
    enc("naomi", "Redeeming the land of her house as near kinsman.", "Ruth 2–4"),
    enc("dawud", "Their son Obed becomes the grandfather of the king.", "Ruth 2–4")
  ]
});

/* ===== URIAH ===== */
patch("uriah", {
  encounters: [
    enc("dawud", "His loyal soldier, sent to the front line to die.", "2 Samuel 11–12"),
    enc("bathsheba", "The husband whose wife was taken from him.", "2 Samuel 11–12"),
    enc("nathan", "The prophet who rose to condemn the wrong done against him.", "2 Samuel 11–12")
  ]
});

/* ===== REHOBOAM ===== */
patch("rehoboam", {
  encounters: [
    enc("sulayman", "Heir to Sulaymān's throne who rejected the elders' counsel.", "1 Kings 12"),
    enc("jeroboam", "His harshness drove the ten tribes to secede under him.", "1 Kings 12")
  ]
});

/* ===== JOSIAH ===== */
patch("josiah", {
  encounters: [
    enc("manasseh", "A descendant who turned from his forefather's idolatry.", "2 Kings 22–23"),
    enc("dawud", "Of the house of Dāwud, he renewed the covenant on finding the Book of the Law.", "2 Kings 22–23")
  ]
});

/* ===== HABAKKUK ===== */
patch("habakkuk", {
  encounters: [
    enc("bani-israel", "Crying out over the triumph of the wicked among his people.", "Habakkuk 1"),
    enc("armiya", "A prophet of the same troubled generation.", "Habakkuk 2")
  ]
});

/* ===== AHASUERUS (Xerxes) ===== */
patch("ahasuerus", {
  encounters: [
    enc("esther", "He raised her to be queen of Persia.", "Esther 1"),
    enc("haman-agagite", "His advisor whose decree he was led to issue, then reversed.", "Esther 8"),
    enc("mordecai", "Whose people were spared when he reversed the decree.", "Esther 8")
  ]
});

/* ===== YUSUF-NAJJAR (Joseph the Carpenter) ===== */
patch("yusuf-najjar", {
  encounters: [
    enc("maryam", "The just carpenter betrothed to Maryam in the Gospel account.", "Matthew 1–2"),
    enc("isa", "Guardian of the child and the mother.", "Luke 2")
  ]
});

/* ===== BARTHOLOMEW (Nathanael) ===== */
patch("bartholomew", {
  encounters: [
    enc("isa", "The doubter of Nazareth who confessed Him.", "John 1"),
    enc("philip-apostle", "Brought to the teacher by his fellow disciple.", "John 1")
  ]
});

/* ===== SIMON THE ZEALOT ===== */
patch("simon-zealot", {
  encounters: [
    enc("isa", "A disciple who declared himself a helper of God.", "Q 3:52"),
    enc("hawariyyun", "Named among the Twelve.", "Luke 6")
  ]
});

/* ===== BARNABAS ===== */
patch("barnabas", {
  encounters: [
    enc("paul-tarsus", "The encourager who sponsors him and walks the first journeys with him.", "Acts 11–14"),
    enc("hawariyyun", "A believer who joined the company after ʿĪsā.", "Acts 4")
  ]
});

/* ===== Yusha ibn Nun ===== */
patch("yusha", {
  encounters: [
    enc("musa", "The young companion on the journey to the meeting of the two seas.", "Q 18:60–62"),
    enc("bani-israel", "Leading Israel across the Jordan after Mūsā, where the walls of Jericho fell.", "Joshua 1–6")
  ]
});

/* ===== Ashab al-Ukhdud ===== */
patch("ashab-ukhdud", {
  encounters: [
    enc("isa", "Believers of the generations after ʿĪsā, burned in the fiery ditch for their faith.", "Q 85:4–9")
  ]
});

/* ===== Hizqil ===== */
patch("hizqil", {
  encounters: [
    enc("bani-israel", "Prophesying among the exiles, who saw the valley of dry bones clothed again with life.", "Ezekiel 37"),
    enc("dhul-kifl", "Sometimes identified with him in the commentaries of the prophets.", "al-Tabari; Ibn Kathir")
  ]
});

/* ===== The Owners of the Garden ===== */
patch("ashab-al-jannah", {
  encounters: [
    enc("muhammad", "A parable revealed to him: an orchard destroyed in the night for withholding the poor's due.", "Q 68:17–33")
  ]
});

/* ===== Shem ===== */
patch("shem", {
  encounters: [
    enc("nuh", "The eldest son saved in the ark, who with Yefet covered his father honourably.", "Genesis 9–11"),
    enc("ibrahim", "Ancestor of the line that reached to Ibrāhīm.", "Genesis 11")
  ]
});

/* ===== Ithamar ===== */
patch("ithamar", {
  encounters: [
    enc("harun", "Youngest son who ministered with his father at the tabernacle.", "Exodus 6:23"),
    enc("eleazar", "Brother beside whom he oversaw the service of the Levites.", "Numbers 4:28")
  ]
});

/* ===== Dathan and Abiram ===== */
patch("dathan-abiram", {
  encounters: [
    enc("musa", "Rebelling against him and swallowed by the earth with their households.", "Numbers 16:1–35"),
    enc("qarun", "Allied with Qārūn in the rebellion against Mūsā.", "Ibn Kathir")
  ]
});

/* ===== Ehud ===== */
patch("ehud", {
  encounters: [
    enc("bani-israel", "The left-handed judge who delivered Israel from Eglon of Moab; the land had rest eighty years.", "Judges 3:12–30"),
    enc("othniel", "The deliverer who arose after Othniel.", "Judges 3:12–30")
  ]
});

/* ===== Delilah ===== */
patch("delilah", {
  encounters: [
    enc("samson", "Bribed by the Philistine lords, she wore down Shimshōn until he revealed his secret.", "Judges 16:4–21")
  ]
});

/* ===== Jesse ===== */
patch("jesse", {
  encounters: [
    enc("dawud", "Presenting his sons to Samuel, who passed over the elders and anointed the youngest, Dāwud.", "1 Samuel 16"),
    enc("obed", "Son of Obed in the line of Bethlehem.", "Shemuel Aleph 16")
  ]
});

/* ===== Joab ===== */
patch("joab", {
  encounters: [
    enc("dawud", "Commander of his host, leading his armies through war and rebellion.", "2 Samuel 3"),
    enc("abner", "Killing Abner, bringing blood-guilt upon his head.", "2 Samuel 3"),
    enc("absalom", "Striking down the rebel Absalom against the king's word.", "2 Samuel 18")
  ]
});

/* ===== Jeroboam ===== */
patch("jeroboam", {
  encounters: [
    enc("sulayman", "Once a servant of Sulaymān before the kingdom was torn.", "1 Kings 11"),
    enc("rehoboam", "Rival to Rehoboam, taking the ten northern tribes.", "1 Kings 12")
  ]
});

/* ===== Hosea ===== */
patch("hosea", {
  encounters: [
    enc("bani-israel", "Likening Israel's idolatry to a broken marriage and pleading for their return.", "Hosea 1; Hosea 14")
  ]
});

/* ===== Haggai ===== */
patch("haggai", {
  encounters: [
    enc("zerubbabel", "Stirring the returned exiles under Zerubbabel to rebuild the temple.", "Haggai 1"),
    enc("bani-israel", "Rousing the people to raise the house of God in Jerusalem.", "Haggai 2")
  ]
});

/* ===== Zerubbabel ===== */
patch("zerubbabel", {
  encounters: [
    enc("haggai", "Led to rebuild the temple at the prophet's urging.", "Ezra 3"),
    enc("zechariah-prophet", "Encouraged in the work by the prophet's vision.", "Zechariah 4"),
    enc("cyrus", "Governor of the return granted under Cyrus.", "Ezra 3")
  ]
});

/* ===== Andrew ===== */
patch("andrew", {
  encounters: [
    enc("isa", "First-called of the apostles, who brings others to ʿĪsā.", "John 1"),
    enc("simon-peter", "Brother of Peter, whom he brought to ʿĪsā.", "John 1")
  ]
});

/* ===== Thomas ===== */
patch("thomas", {
  encounters: [
    enc("isa", "Who doubted the resurrection until he saw, then confessed ʿĪsā as Lord.", "John 20"),
    enc("hawariyyun", "Among the disciples who answered, 'We are the helpers of God.'", "Q 3:52")
  ]
});

/* ===== Martha ===== */
patch("martha", {
  encounters: [
    enc("isa", "Serving ʿĪsā and confessing him as the Christ at her brother's tomb.", "John 11"),
    enc("lazarus", "Sister at the tomb of Lazarus.", "John 11")
  ]
});

/* ===== Herod Agrippa ===== */
patch("herod-agrippa", {
  encounters: [
    enc("james-zebedee", "Putting James to the sword.", "Acts 12"),
    enc("simon-peter", "Imprisoning Peter, who was delivered by night.", "Acts 12")
  ]
});

/* ===== Ilyas ===== */
patch("ilyas", {
  encounters: [
    enc("ibrahim", "Counted among the righteous in the guided line of Ibrāhīm.", "Q 6:85"),
    enc("al-yasa", "Bound to al-Yasaʿ among the guided messengers who followed him.", "Q 6:85")
  ]
});

/* ===== The People of Saba ===== */
patch("saba", {
  encounters: [
    enc("bilqis", "Their queen, who ruled them before her submission with Sulaymān.", "Q 27:22–24"),
    enc("sulayman", "The king whose letter reached their court in their own days.", "Q 27:22–24")
  ]
});

/* ===== Shaya ===== */
patch("shaya", {
  encounters: [
    enc("bani-israel", "Prophesying to Judah, condemning empty ritual without justice.", "Isaiah 1"),
    enc("armiya", "A fellow prophet of the last days before the Babylonian exile.", "Isaiah 40")
  ]
});

/* ===== The Romans ===== */
patch("al-rum", {
  encounters: [
    enc("muhammad", "The promised reversal of their defeat foretold in his time.", "Q 30:2–5")
  ]
});

/* ===== Dinah ===== */
patch("dinah", {
  encounters: [
    enc("yaqub", "The only named daughter of Yaʿqūb, wronged at Shechem.", "Genesis 34"),
    enc("leah", "Daughter of Leah in the house of Yaʿqūb.", "Genesis 30"),
    enc("shimon", "The brother who rose up to avenge her.", "Genesis 34")
  ]
});

/* ===== Nadab and Abihu ===== */
patch("nadab-abihu", {
  encounters: [
    enc("harun", "Elder sons of Hārūn, taken for offering unauthorised fire.", "Leviticus 10:1–2"),
    enc("eleazar", "Brothers to Eleazar in the priestly house.", "Numbers 3:4")
  ]
});

/* ===== Balaam ===== */
patch("balaam", {
  encounters: [
    enc("bani-israel", "Hired to curse Israel, his oracles turned to blessing.", "Numbers 22–24"),
    enc("musa", "Opposing the people of Mūsā, then snaring them at Peʿor.", "Numbers 31:16")
  ]
});

/* ===== Deborah ===== */
patch("deborah", {
  encounters: [
    enc("barak", "Rousing Barak and Israel against Sisera, then singing the victory.", "Judges 4–5"),
    enc("bani-israel", "Judging Israel beneath her palm and leading their deliverance.", "Judges 4–5")
  ]
});

/* ===== Naomi ===== */
patch("naomi", {
  encounters: [
    enc("ruth", "Returning from Moab with the daughter-in-law who would not leave her.", "Ruth 1"),
    enc("boaz", "Kinsman through whom Ruth was redeemed at Bethlehem.", "Ruth 4"),
    enc("obed", "The grandson born to her line, forefather of kings.", "Ruth 4")
  ]
});

/* ===== Michal ===== */
patch("michal", {
  encounters: [
    enc("dawud", "Saving Dāwud from her father's men, then despising his dancing before the Ark.", "1 Samuel 19"),
    enc("talut", "Daughter of Ṭālūt, given as wife to Dāwud.", "1 Samuel 19")
  ]
});

/* ===== Abner ===== */
patch("abner", {
  encounters: [
    enc("talut", "Captain of Ṭālūt's army, supporting his house.", "2 Samuel 2–3"),
    enc("joab", "Slain by Yōʼāv as the kingdom moved toward Dāwud.", "2 Samuel 2–3"),
    enc("dawud", "Turning to Dāwud, who mourned him after his murder.", "2 Samuel 2–3")
  ]
});

/* ===== Hezekiah ===== */
patch("hezekiah", {
  encounters: [
    enc("dawud", "A righteous descendant of Dāwud upon the throne of Judah.", "2 Kings 18–20"),
    enc("manasseh", "Father to Manasseh, who succeeded him.", "2 Kings 18–20")
  ]
});

/* ===== Amos ===== */
patch("amos", {
  encounters: [
    enc("bani-israel", "The shepherd who denounced oppression and called for justice to flow like water.", "Amos 5"),
    enc("hosea", "A contemporary among the prophets of the divided kingdom.", "Amos 1")
  ]
});

/* ===== Zechariah ===== */
patch("zechariah-prophet", {
  encounters: [
    enc("zerubbabel", "Encouraging the rebuilding under Zerubbabel after the return.", "Zechariah 1"),
    enc("haggai", "A fellow prophet of the return alongside Haggai.", "Zechariah 1")
  ]
});

/* ===== Nehemiah ===== */
patch("nehemiah", {
  encounters: [
    enc("bani-israel", "Rebuilding the walls of Jerusalem for the returned people.", "Nehemiah 2"),
    enc("uzair", "Renewing the covenant of the people together with Ezra.", "Nehemiah 8")
  ]
});

/* ===== James son of Zebedee ===== */
patch("james-zebedee", {
  encounters: [
    enc("isa", "Of the inner circle who declared themselves helpers of God.", "Q 3:52"),
    enc("john-evangelist", "Brother to John in the call by the sea.", "Mark 1"),
    enc("herod-agrippa", "The first apostle martyred under Herod Agrippa.", "Acts 12")
  ]
});

/* ===== James son of Alphaeus ===== */
patch("james-alphaeus", {
  encounters: [
    enc("isa", "Among the disciples who answered, 'We are the helpers of God.'", "Q 3:52"),
    enc("hawariyyun", "Numbered among the Twelve apostles.", "Matthew 10")
  ]
});

/* ===== Paul of Tarsus ===== */
patch("paul-tarsus", {
  encounters: [
    enc("isa", "The persecutor transformed on the Damascus road to follow after him.", "Acts 9"),
    enc("barnabas", "His companion in the mission to the nations.", "Acts 9")
  ]
});

/* ===== UZAIR ===== */
patch("uzair", {
  encounters: [
    enc("bani-israel", "Restoring the Torah to his people's memory after the exile.", "Q 2:259; Q 9:30")
  ]
});

/* ===== RAHIL ===== */
patch("rahil", {
  encounters: [
    enc("yaqub", "The beloved wife for whom Yaʿqūb served Lābān long years.", "Genesis 29–30"),
    enc("yusuf", "Mother of Yūsuf, the firstborn of her longing.", "Genesis 30"),
    enc("binyamin", "Dying as she bore her second son, Binyāmīn.", "Genesis 35")
  ]
});

/* ===== ARMIYA ===== */
patch("armiya", {
  encounters: [
    enc("bani-israel", "Warning Judah of the Babylonian ruin and foretelling a new covenant.", "Jeremiah 1; Jeremiah 31"),
    enc("uzair", "A prophet about the time of the exile and the return.", "Q 2:259")
  ]
});

/* ===== ASHAB-AL-RASS ===== */
patch("ashab-al-rass", {
  encounters: [
    enc("muhammad", "Named to him among the peoples who denied their messengers.", "Q 25:38"),
    enc("thamud", "Listed alongside them among the destroyed nations.", "Q 25:38")
  ]
});

/* ===== AMRAM ===== */
patch("amram", {
  encounters: [
    enc("musa-mother", "Husband of Yukābid, of the house of Lāwī.", "Exodus 6:18–20"),
    enc("musa", "Father, through that marriage, of Mūsā.", "Exodus 6:20"),
    enc("harun", "Father of Hārūn of the priestly line.", "Exodus 6:20")
  ]
});

/* ===== HUR ===== */
patch("hur", {
  encounters: [
    enc("musa", "Upholding Mūsā's hands through the battle at Rephidim.", "Exodus 17:10–12"),
    enc("harun", "Standing with Hārūn over the people at the foot of the mountain.", "Exodus 24:14")
  ]
});

/* ===== PHARAOHS-DAUGHTER ===== */
patch("pharaohs-daughter", {
  encounters: [
    enc("musa", "Drawing the infant from the river and taking him as her own.", "Q 28:9"),
    enc("pharaoh", "A daughter of his house who saved the child meant to end his reign.", "Exodus 2:5–10")
  ]
});

/* ===== BARAK ===== */
patch("barak", {
  encounters: [
    enc("deborah", "Marching at the prophetess's call to rout Sisera's host.", "Judges 4:6–16")
  ]
});

/* ===== RUTH ===== */
patch("ruth", {
  encounters: [
    enc("naomi", "Cleaving to her mother-in-law and to her God.", "Ruth 1"),
    enc("boaz", "Gleaning in his field and taken by him in marriage.", "Ruth 2–4"),
    enc("dawud", "Great-grandmother of the king Dāwud.", "Ruth 4")
  ]
});

/* ===== BATHSHEBA ===== */
patch("bathsheba", {
  encounters: [
    enc("dawud", "Taken as Dāwud's wife in the account of his sin and repentance.", "2 Samuel 11–12"),
    enc("sulayman", "Mother of Sulaymān, securing his succession.", "1 Kings 1–2"),
    enc("uriah", "Once wife of Ūriyā, whose death is remembered against the king.", "2 Samuel 11")
  ]
});

/* ===== ABSALOM ===== */
patch("absalom", {
  encounters: [
    enc("dawud", "Revolting against his father and seizing the kingdom.", "2 Samuel 15–18"),
    enc("joab", "Slain by Yūʾāb in the forest of Ephraim.", "2 Samuel 18")
  ]
});

/* ===== MANASSEH ===== */
patch("manasseh", {
  encounters: [
    enc("hezekiah", "Son of the faithful Ḥizqiyā, yet most idolatrous of Judah's kings.", "2 Kings 21"),
    enc("josiah", "Forefather of the reforming king Yūshiyā.", "2 Chronicles 33")
  ]
});

/* ===== MICAH ===== */
patch("micah", {
  encounters: [
    enc("bani-israel", "Teaching them to act justly, love mercy, and walk humbly with God.", "Micah 6")
  ]
});

/* ===== MALACHI ===== */
patch("malachi", {
  encounters: [
    enc("bani-israel", "Promising a messenger to prepare the way of the Lord.", "Malachi 3"),
    enc("zechariah-prophet", "Last of the twelve, following in the line of the prophets.", "Malachi 4")
  ]
});

/* ===== ELIZABETH ===== */
patch("elizabeth", {
  encounters: [
    enc("zakariyya", "The barren wife for whom Zakariyyā prayed.", "Q 19:5–8"),
    enc("yahya", "Granted Yaḥyā, conceiving in her old age.", "Luke 1"),
    enc("maryam", "Greeting her kinswoman Maryam who came to her.", "Luke 1")
  ]
});

/* ===== PHILIP-APOSTLE ===== */
patch("philip-apostle", {
  encounters: [
    enc("isa", "Asking ʿĪsā to be shown the Father.", "John 14"),
    enc("bartholomew", "Bringing Nathanael to follow the teacher.", "John 1")
  ]
});

/* ===== THADDAEUS ===== */
patch("thaddaeus", {
  encounters: [
    enc("isa", "Questioning ʿĪsā at the supper, and pledged among His helpers.", "John 14"),
    enc("hawariyyun", "Numbered among the disciples of ʿĪsā.", "Q 3:52")
  ]
});

/* ===== STEPHEN ===== */
patch("stephen", {
  encounters: [
    enc("isa", "A follower stoned while praying for his persecutors.", "Acts 6–7"),
    enc("paul-tarsus", "Martyred in the presence of the man not yet turned.", "Acts 7")
  ]
});

})();
