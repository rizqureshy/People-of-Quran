/* People of Scriptures — Cross-tradition names (wave 4)
 * ------------------------------------------------------------------
 * Adds the Bible/Hebrew identity to figures who are clearly biblical but
 * carried only their Quranic/traditional name, so each person's cross-
 * tradition identity is shown evenly. Runs last. Only well-attested
 * identifications are added (figures with no biblical counterpart — the
 * Companions, the Arab tribes, Hūd, Ṣāliḥ, Luqmān… — are left as they are).
 */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var byId = {}; D.people.forEach(function (p) { byId[p.id] = p; });
  function addNames(id, names) {
    var p = byId[id]; if (!p) return;
    p.names = Object.assign({}, p.names, names);
  }

  addNames("nimrod", { bible: "Nimrod", hebrew: "נִמְרוֹד (Nimrōd)" });
  addNames("musa-mother", { bible: "Jochebed", hebrew: "יוֹכֶבֶד (Yōkheved)" });
  addNames("yusuf-brothers", { bible: "the sons of Jacob", hebrew: "בְּנֵי יַעֲקֹב (Bənēi Yaʿaqōv)" });
  addNames("bani-israel", { bible: "the Israelites (Children of Israel)", hebrew: "בְּנֵי יִשְׂרָאֵל (Bənēi Yisrāʾēl)" });
  addNames("lut-wife", { bible: "Lot's wife", hebrew: "אֵשֶׁת לוֹט (Eshet Lōṭ)" });
  addNames("bilqis", { bible: "the Queen of Sheba", hebrew: "מַלְכַּת שְׁבָא (Malkat Shəvāʾ)" });
  addNames("ashab-kahf", { tradition: "أصحاب الكهف (Aṣḥāb al-Kahf)", greek: "the Seven Sleepers of Ephesus" });

})();
