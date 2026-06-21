/* People of Scriptures — More narrative story threads (wave 6)
 * ------------------------------------------------------------------
 * The original eleven threads were Quran-centred. These extend the
 * "Stories" index across the Bible/Torah/New-Testament arcs now in the
 * universe — the patriarchs and tribes, the Exodus and the Law, the
 * judges, the house of David, the divided kingdom, the prophets, the
 * exile and return, the Gospel and the early church. Each thread names
 * the people whose lives weave it together. Runs after data.js.
 */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D || !D.stories) return;
  var have = {}; D.stories.forEach(function (s) { have[s.id] = true; });
  function s(id, title, era, summary, people) {
    if (have[id]) return;
    D.stories.push({ id: id, title: title, era: era, summary: summary, people: people });
  }

  s("patriarchs-covenant", "The Patriarchs and the Covenant", "Patriarchs",
    "The promise carried down the generations — from Ibrāhīm through Isḥāq and Yaʿqūb, with their wives and the brother who turned away.",
    ["ibrahim", "ishaq", "yaqub", "ismail", "sarah", "rebecca", "esau"]);

  s("twelve-tribes", "The Twelve Tribes", "Patriarchs",
    "The sons of Yaʿqūb become the tribes of Israel — among them Yahūdhā, Lāwī and Binyāmīn, and their sister Dīnah.",
    ["yaqub", "asbat-bani-israil", "yahudha", "lawi", "rubil", "binyamin", "dinah"]);

  s("the-burning-bush", "The Burning Bush", "Exodus",
    "A child drawn from the river is raised in the tyrant's house and called at the mountain to free his people.",
    ["musa", "harun", "musa-mother", "musa-sister", "asiya", "pharaoh"]);

  s("the-law-and-the-calf", "The Law and the Calf", "Exodus",
    "While Mūsā receives the Law on the mountain, Hārūn struggles to hold the people back from al-Sāmirī's golden calf.",
    ["musa", "harun", "samiri", "bani-israel", "qarun"]);

  s("conquest-and-judges", "The Conquest and the Judges", "The Conquest & Judges",
    "After Mūsā, Yūshaʿ leads the people in, and a line of deliverers — Deborah, Gideon, Jephthah, Samson — rises in turn.",
    ["yusha", "deborah", "barak", "gideon", "jephthah", "samson", "delilah", "othniel", "ehud"]);

  s("ruth-and-the-line", "Ruth and the Line of David", "The Conquest & Judges",
    "A loyal foreign widow gleans in the fields of Boaz, and from their union descends, through Obed and Jesse, the house of David.",
    ["naomi", "ruth", "boaz", "obed", "jesse", "dawud"]);

  s("house-of-david", "The House of David", "Kingdom",
    "From the giant's fall to the throne — the king's covenant friend, his wives, his prophet, and the son who rebelled.",
    ["dawud", "jalut", "talut", "jonathan", "michal", "abigail", "bathsheba", "nathan", "absalom", "sulayman"]);

  s("divided-kingdom", "The Divided Kingdom", "Divided Kingdom",
    "The kingdom splits under Rehoboam and Jeroboam; Ilyās and al-Yasaʿ stand against Ahab and Jezebel and the worship of Baal.",
    ["rehoboam", "jeroboam", "ahab", "jezebel", "ilyas", "al-yasa", "naaman"]);

  s("prophets-of-warning", "The Prophets of Warning", "Other Prophets",
    "Voices raised against injustice and idolatry as judgment nears — Isaiah, Jeremiah, Ezekiel and the prophets beside them.",
    ["shaya", "armiya", "hizqil", "hosea", "amos", "micah", "hezekiah", "josiah"]);

  s("exile-and-return", "The Exile and the Return", "Exile & Return",
    "Jerusalem falls to Nebuchadnezzar and the people are carried to Babylon; Daniel keeps faith in a foreign court, and under Cyrus they return to rebuild.",
    ["daniyal", "shadrach-meshach-abednego", "nebuchadnezzar", "belshazzar", "cyrus", "uzair", "zerubbabel", "nehemiah"]);

  s("esther-deliverance", "Esther and the Deliverance", "Exile & Return",
    "A hidden queen in the Persian court risks her life, with Mordecai, to turn Haman's plot away from her people.",
    ["esther", "mordecai", "ahasuerus", "vashti", "haman-agagite"]);

  s("trials-of-the-prophets", "The Patient and the Repentant", "Other Prophets",
    "Two trials answered by mercy — Ayyūb's steadfastness through total loss, and Yūnus's prayer from the belly of the fish.",
    ["ayyub", "yunus"]);

  s("the-annunciation", "The Annunciation", "Gospel",
    "Within the house of ʿImrān, an aged priest and a chosen mother each receive an impossible child — Yaḥyā and ʿĪsā.",
    ["imran", "imran-wife", "zakariyya", "yahya", "maryam", "isa", "elizabeth"]);

  s("the-twelve-and-gospel", "The Twelve and the Gospel", "The Apostolic Age",
    "ʿĪsā calls his disciples — Peter, Andrew, the sons of Zebedee and the rest — and sends them out to carry his message.",
    ["isa", "hawariyyun", "simon-peter", "andrew", "james-zebedee", "john-evangelist", "matthew-levi", "thomas", "philip-apostle"]);

  s("the-early-church", "The Early Church", "The Apostolic Age",
    "After the Gospel — the first martyr Stephen, the convert Paul and his companion Barnabas, and the witnesses who carried the faith outward.",
    ["stephen", "paul-tarsus", "barnabas", "mary-magdalene", "nicodemus", "herod-agrippa"]);

  s("people-of-the-cave", "The People of the Cave", "Other Prophets",
    "Youths who fled a tyrant for their faith and slept in a cave for years beyond counting — a sign of the resurrection.",
    ["ashab-kahf", "isa"]);

})();
