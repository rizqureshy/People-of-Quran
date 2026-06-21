/* People of Scriptures — Cross-scriptural references (wave 5)
 * ------------------------------------------------------------------
 * Adds Bible/Torah sourced entries to figures who carried a biblical
 * identity (a Bible/Hebrew name) but had no actual cross-scriptural
 * citation, so the "Across the Sources" panel reflects every tradition a
 * figure truly appears in. Only canonical references are added; figures
 * whose biblical identity is apocryphal or contested (Imran→Joachim,
 * his wife→Anne, Dhul-Kifl→Ezekiel) are deliberately left as tradition.
 * Runs after the other data files.
 */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b;
  var byId = {}; D.people.forEach(function (p) { byId[p.id] = p; });
  function addEntries(id, entries) {
    var p = byId[id]; if (!p) return;
    p.entries = (p.entries || []).concat(entries);
    // keep the source set in sync so tier chips reflect the new layers
    var have = {}; (p.sources || []).forEach(function (s) { have[s] = true; });
    entries.forEach(function (e) { if (!have[e.layer]) { (p.sources = p.sources || []).push(e.layer); have[e.layer] = true; } });
  }

  addEntries("iblis", [
    b("torah", "In Bereshit, the serpent (ha-naḥash) tempts the first couple to eat from the forbidden tree; in Iyyov, ha-satan — 'the accuser' — challenges God to test Job's faith.", "Bereshit 3; Iyyov 1–2", "Torah · Tanakh"),
    b("bible", "Satan appears as the adversary opposing the high priest, the tempter (the devil) who confronts Jesus in the wilderness, and the great dragon cast down in the Revelation.", "Zechariah 3; Matthew 4:1–11; Revelation 12", "Bible")
  ]);

  addEntries("nimrod", [
    b("torah", "In Bereshit, Nimrod son of Cush is 'a mighty one on the earth' and 'a mighty hunter before the Lord,' the beginning of whose kingdom was Babel — later tradition making him the king who opposed Ibrāhīm.", "Bereshit 10:8–12", "Torah")
  ]);

  addEntries("yusuf-brothers", [
    b("torah", "In Bereshit, the elder sons of Yaʿaqov, envious of Yosef, cast him into a pit and sell him to passing traders; years later they bow before him in Egypt without knowing him, and are forgiven.", "Bereshit 37, 42–45", "Torah")
  ]);

  addEntries("aziz", [
    b("torah", "In Bereshit, Potiphar, an officer of Pharaoh and captain of the guard, buys Yosef and sets him over his house, then imprisons him when his wife's accusation is believed.", "Bereshit 39", "Torah")
  ]);

  addEntries("musa-mother", [
    b("torah", "In Shemot, Yokheved, of the house of Levi, hides her infant son for three months and sets him in a basket among the reeds of the Nile; she is named as the mother of Moses, Aaron and Miriam.", "Shemot 2:1–10; 6:20", "Torah")
  ]);

  addEntries("bani-israel", [
    b("torah", "The Children of Israel — the descendants of Yaʿaqov through his twelve sons — are the covenant people throughout the Torah: enslaved in Egypt, brought out by Moses, given the Law at Sinai, and led toward the promised land.", "Shemot–Devarim", "Torah"),
    b("bible", "Their history continues through the Tanakh — the conquest and judges, the united and divided kingdoms, exile and return.", "Joshua–2 Chronicles", "Tanakh")
  ]);

  addEntries("hawariyyun", [
    b("bible", "In the Gospels, Jesus calls twelve disciples — among them Peter, Andrew, James and John — and sends them out to preach and heal; after him they carry his message, as recounted in the Acts of the Apostles.", "Matthew 10:1–4; Luke 6:12–16; Acts", "Gospels · Acts")
  ]);

  addEntries("shuayb", [
    b("bible", "Classical tradition identifies Shuʿayb with Jethro (Reuel), the priest of Midian who shelters the fleeing Moses, gives him a daughter in marriage, and later counsels him on appointing just judges.", "Exodus 2:16–22; 3:1; 18", "Bible · by traditional identification")
  ]);

})();
