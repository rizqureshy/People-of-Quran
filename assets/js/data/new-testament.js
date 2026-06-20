/* People of the Quran — The New Testament */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(

    /* ===================== HOUSE OF IMRAN — THE FAMILY ===================== */
    {
      id: "elizabeth", name: "Elizabeth", title: "Mother of John the Baptist",
      named: false, era: "Gospel", group: "House of Imran", depth: "supporting",
      names: { bible: "Elizabeth", greek: "Ἐλισάβετ (Elisábet)", tradition: "إليصابات (Īlīṣābāt)" },
      archetypes: ["believing-woman"],
      story: [
        "In the Gospel of Luke she is the aged, barren wife of the priest Zechariah — the Zakariyyā of the Quran — and a kinswoman of Mary. When the angel announced that she would bear a son in her old age, she conceived John, the forerunner whom the Quran calls Yaḥyā. When Mary came to her, the child stirred in her womb and she greeted Mary as blessed among women. The Quran honours the answered prayer of Zakariyyā for an heir 'though my wife is barren'; the barren wife of that prayer is, in the Gospel telling, Elizabeth."
      ],
      lessons: ["A prayer answered late is a prayer answered still.",
                "She rejoiced at another's blessing before her own."],
      sources: ["bible", "tradition"],
      entries: [
        b("bible", "Elizabeth, wife of Zechariah and mother of John the Baptist, conceives in old age and greets her kinswoman Mary.", "Luke 1", "Gospels"),
        b("tradition", "Identified with the barren wife for whom Zakariyyā prayed and who was granted Yaḥyā.", "Q 3:40; Q 19:5–8", "Tafsir on the Quranic account")
      ],
      relations: [ r("zakariyya", "spouse"), r("yahya", "parent"), r("maryam", "kin") ]
    },
    {
      id: "yusuf-najjar", name: "Joseph the Carpenter", title: "Betrothed of Mary",
      named: false, era: "Gospel", group: "House of Imran", depth: "supporting",
      names: { bible: "Joseph", greek: "Ἰωσήφ (Iōséph)", tradition: "يوسف النجار (Yūsuf al-Najjār)" },
      archetypes: ["faithful-companion"],
      story: [
        "In the Gospels of Matthew and Luke, Joseph is a carpenter of Nazareth, of the line of David, betrothed to Mary. A just man, he resolved to part from her quietly when he learned of her pregnancy, until a dream reassured him; he then guarded mother and child, leading them to Bethlehem and into Egypt to escape Herod.",
        "Islam frames this differently and with reverence: the Quran teaches that Jesus had no earthly father, conceived by the word 'Be' as a sign to mankind. Joseph is therefore not a figure of the Quranic narrative; where tradition mentions a companion of Mary, it is as a protector, never as a father of ʿĪsā."
      ],
      lessons: ["Mercy chose to shield rather than to shame.",
                "A quiet guardian asks for no credit."],
      sources: ["bible", "tradition"],
      entries: [
        b("bible", "Joseph, the just carpenter of David's line, betrothed to Mary, guards the child and the mother.", "Matthew 1–2; Luke 2", "Gospels"),
        b("tradition", "The Quran affirms that ʿĪsā had no earthly father, being created by God's command; Joseph has no role as a father in the Islamic account.", "Q 3:47; Q 19:20–21", "Quranic teaching")
      ],
      relations: [ r("maryam", "spouse", "betrothed, in the Gospel account"), r("isa", "kin", "guardian, not father, in tradition") ]
    },

    /* ===================== THE APOSTLES — THE TWELVE ===================== */
    {
      id: "simon-peter", name: "Simon Peter", title: "The Rock, Chief of the Apostles",
      named: false, era: "Gospel", group: "The Apostles", depth: "major",
      names: { bible: "Simon Peter / Cephas", greek: "Πέτρος (Pétros)", tradition: "شمعون الصفا (Shamʿūn al-Ṣafā)" },
      archetypes: ["faithful-companion", "truth-seeker"],
      story: [
        "A fisherman of Galilee called from his nets, Simon was renamed Peter — 'the rock.' Foremost among the Twelve, he confessed Jesus as the Christ, walked briefly on the water, yet denied his master three times on the night of the arrest, then wept and was restored. In Acts he leads the early community in Jerusalem and preaches at Pentecost. Islamic tradition counts him among the loyal ḥawāriyyūn, the helpers who answered, 'We are God's helpers.'"
      ],
      lessons: ["Even the firmest faith can falter — and be restored.",
                "Tears of repentance rebuild what fear has broken."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Counted among the disciples who said, 'We are the helpers of God.'", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Simon Peter, fisherman, foremost apostle; confesses Christ, denies him, and leads the early church.", "Matthew 16; Luke 5; John 21; Acts 2", "Gospels · Acts"),
        b("tradition", "Named among the disciples sent to support ʿĪsā in the commentaries on the Quranic story.", "al-Tabari; Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("isa", "Confessed him as the Messiah and was called 'the rock.'", "Matthew 16") ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin"), r("andrew", "sibling") ]
    },
    {
      id: "andrew", name: "Andrew", title: "The First-Called",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Andrew", greek: "Ἀνδρέας (Andréas)", tradition: "أندراوس (Andrāwus)" },
      archetypes: ["faithful-companion"],
      story: [
        "Brother of Simon Peter and a fisherman of Bethsaida, Andrew was among the first to follow Jesus, and at once brought his brother to him. He appears bringing the boy with the loaves and fishes before the feeding of the multitude. Tradition numbers him among the loyal ḥawāriyyūn."
      ],
      lessons: ["The first thing he did was bring another to the truth."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who pledged themselves as helpers of God.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Andrew, brother of Peter, first-called of the apostles, who brings others to Jesus.", "John 1; John 6; Matthew 4", "Gospels"),
        b("tradition", "Listed among the disciples of ʿĪsā in the commentaries.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin"), r("simon-peter", "sibling") ]
    },
    {
      id: "james-zebedee", name: "James son of Zebedee", title: "Apostle, the Elder James",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "James (the Greater)", greek: "Ἰάκωβος (Iákōbos)", tradition: "يعقوب بن زبدي (Yaʿqūb ibn Zabdī)" },
      archetypes: ["faithful-companion", "martyr"],
      story: [
        "A fisherman and brother of John the Evangelist, James was among the inner circle of three who witnessed the transfiguration. Jesus called the brothers 'sons of thunder.' He was the first of the Twelve to be martyred, put to the sword by Herod Agrippa. Islamic tradition counts him among the ḥawāriyyūn."
      ],
      lessons: ["He was the first apostle to die for the message he carried."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who declared themselves helpers of God.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "James, son of Zebedee, of the inner circle, first apostle martyred under Herod Agrippa.", "Mark 1; Mark 9; Acts 12", "Gospels · Acts"),
        b("tradition", "Numbered among the disciples of ʿĪsā.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin"), r("john-evangelist", "sibling"), r("herod-agrippa", "opponent") ]
    },
    {
      id: "john-evangelist", name: "John the Evangelist", title: "The Beloved Disciple",
      named: false, era: "Gospel", group: "The Apostles", depth: "major",
      names: { bible: "John", greek: "Ἰωάννης (Iōánnēs)", tradition: "يوحنا (Yūḥannā)" },
      archetypes: ["faithful-companion", "truth-seeker"],
      story: [
        "Brother of James and son of Zebedee, John is remembered as 'the disciple whom Jesus loved,' one of the inner three present at the transfiguration and in Gethsemane. At the cross he was entrusted with the care of Mary. Christian tradition ascribes to him a Gospel and letters. Islamic tradition numbers him among the loyal ḥawāriyyūn who supported ʿĪsā."
      ],
      lessons: ["Nearness in love is its own form of witness.",
                "He was trusted with the care of the mother."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who answered, 'We are the helpers of God.'", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "John, the beloved disciple, entrusted with Mary at the cross; of the inner circle of three.", "John 13; John 19; Mark 9", "Gospels"),
        b("tradition", "Counted among the disciples sent to aid ʿĪsā in the Quranic commentaries.", "Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("maryam", "Entrusted with her care at the foot of the cross.", "John 19") ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin"), r("james-zebedee", "sibling"), r("maryam", "companion") ]
    },
    {
      id: "philip-apostle", name: "Philip", title: "Apostle of Bethsaida",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "Philip", greek: "Φίλιππος (Phílippos)", tradition: "فيلبس (Fīlibbus)" },
      archetypes: ["faithful-companion", "truth-seeker"],
      story: [
        "A disciple from Bethsaida, Philip was called early and at once brought Nathanael to Jesus, saying, 'Come and see.' At the Last Supper he asked, 'Lord, show us the Father,' drawing a teaching on knowing God through the one sent. Tradition lists him among the ḥawāriyyūn."
      ],
      lessons: ["'Come and see' — an invitation, not an argument."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who pledged themselves as God's helpers.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Philip, of Bethsaida, who brings Nathanael and asks to be shown the Father.", "John 1; John 14", "Gospels"),
        b("tradition", "Named among the disciples of ʿĪsā.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin"), r("bartholomew", "companion") ]
    },
    {
      id: "bartholomew", name: "Bartholomew", title: "Apostle (Nathanael)",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "Bartholomew / Nathanael", greek: "Βαρθολομαῖος (Bartholomaîos)", tradition: "برثولماوس (Barthulmāwus)" },
      archetypes: ["truth-seeker", "faithful-companion"],
      story: [
        "Commonly identified with Nathanael, whom Philip brought to Jesus. Sceptical at first — 'Can anything good come out of Nazareth?' — he was won over when Jesus showed knowledge of him, and confessed him at once. Tradition counts him among the ḥawāriyyūn."
      ],
      lessons: ["An honest doubt, met with truth, becomes faith."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who declared themselves helpers of God.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Nathanael (Bartholomew), the doubter of Nazareth who confessed Jesus as Son of God.", "John 1; Matthew 10", "Gospels"),
        b("tradition", "Listed among the disciples of ʿĪsā.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin"), r("philip-apostle", "companion") ]
    },
    {
      id: "thomas", name: "Thomas", title: "The Apostle Who Doubted",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Thomas (Didymus)", greek: "Θωμᾶς (Thōmâs)", tradition: "توما (Tūmā)" },
      archetypes: ["skeptic", "faithful-companion"],
      story: [
        "Called the Twin, Thomas is remembered for refusing to believe in the resurrection until he could see for himself — and then, shown the wounds, confessing 'My Lord and my God.' Earlier he had bravely urged the others to go with Jesus into danger. Tradition numbers him among the ḥawāriyyūn, and credits him with carrying the message far to the East."
      ],
      lessons: ["He asked to see — and then believed wholly.",
                "Honest doubt can end in the deepest confession."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who answered, 'We are the helpers of God.'", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Thomas, who doubted the resurrection until he saw, then confessed Jesus as Lord and God.", "John 11; John 20", "Gospels"),
        b("tradition", "Counted among the disciples of ʿĪsā; tradition sends him eastward with the message.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin") ]
    },
    {
      id: "matthew-levi", name: "Matthew", title: "The Tax Collector (Levi)",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Matthew / Levi", greek: "Μαθθαῖος (Maththaîos)", tradition: "متى (Mattā)" },
      archetypes: ["repentant", "faithful-companion"],
      story: [
        "A tax collector — a despised profession — Levi was called by Jesus with the words 'Follow me,' and rose at once, leaving his booth. Christian tradition ascribes the first Gospel to him. His call is held up as a sign that mercy seeks the outcast. Tradition lists him among the ḥawāriyyūn."
      ],
      lessons: ["He left a life of profit at a single word.",
                "Mercy is sent for the rejected, not the respectable."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who pledged themselves as helpers of God.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Matthew the tax collector, called from his booth to follow Jesus.", "Matthew 9; Mark 2; Luke 5", "Gospels"),
        b("tradition", "Named among the disciples of ʿĪsā.", "Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("isa", "Called from his tax booth: 'Follow me.'", "Matthew 9") ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin") ]
    },
    {
      id: "james-alphaeus", name: "James son of Alphaeus", title: "Apostle, the Younger James",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "James (the Less)", greek: "Ἰάκωβος (Iákōbos)", tradition: "يعقوب بن حلفى (Yaʿqūb ibn Ḥalfā)" },
      archetypes: ["faithful-companion"],
      story: [
        "One of the Twelve, distinguished from James son of Zebedee, and called 'the Less' or 'the Younger.' He appears in every list of the apostles though the Gospels record little of him by name. Tradition numbers him among the ḥawāriyyūn who supported ʿĪsā."
      ],
      lessons: ["Faithfulness needs no fame to be counted."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who answered, 'We are the helpers of God.'", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "James, son of Alphaeus, listed among the Twelve apostles.", "Matthew 10; Mark 3; Acts 1", "Gospels · Acts"),
        b("tradition", "Counted among the disciples of ʿĪsā.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin") ]
    },
    {
      id: "thaddaeus", name: "Thaddaeus", title: "Apostle (Jude)",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "Thaddaeus / Judas of James", greek: "Θαδδαῖος (Thaddaîos)", tradition: "تداوس (Taddāwus)" },
      archetypes: ["faithful-companion"],
      story: [
        "One of the Twelve, called Thaddaeus and also Jude, distinguished from Judas Iscariot. At the Last Supper he asked why Jesus would reveal himself to the disciples and not to the world, and was answered with a teaching on love and obedience. Tradition lists him among the ḥawāriyyūn."
      ],
      lessons: ["A sincere question opened the way to a teaching."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who pledged to be helpers of God.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Thaddaeus (Jude, not Iscariot), one of the Twelve, who questions Jesus at the supper.", "Matthew 10; John 14; Acts 1", "Gospels · Acts"),
        b("tradition", "Numbered among the disciples of ʿĪsā.", "Ibn Kathir", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin") ]
    },
    {
      id: "simon-zealot", name: "Simon the Zealot", title: "Apostle of the Twelve",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "Simon the Zealot", greek: "Σίμων ὁ Ζηλωτής (Símōn ho Zēlōtḗs)", tradition: "سمعان الغيور (Shamʿūn al-Ghayūr)" },
      archetypes: ["faithful-companion"],
      story: [
        "One of the Twelve, called 'the Zealot' to mark his former zeal — perhaps for the Law or for the cause of Israel against Rome. The Gospels record little of him by name beyond the apostolic lists. Tradition numbers him among the ḥawāriyyūn."
      ],
      lessons: ["Zeal, once turned toward truth, becomes devotion."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "Among the disciples who declared themselves helpers of God.", "Q 3:52; Q 5:111", "The ḥawāriyyūn"),
        b("bible", "Simon the Zealot, named among the Twelve apostles.", "Luke 6; Acts 1", "Gospels · Acts"),
        b("tradition", "Counted among the disciples of ʿĪsā.", "al-Tabari", "Tafsir")
      ],
      relations: [ r("isa", "student"), r("hawariyyun", "kin") ]
    },
    {
      id: "judas-iscariot", name: "Judas Iscariot", title: "The Apostle Who Betrayed",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Judas Iscariot", greek: "Ἰούδας Ἰσκαριώτης (Ioúdas Iskariṓtēs)", tradition: "يهوذا الإسخريوطي (Yahūdhā al-Iskharyūṭī)" },
      archetypes: ["hypocrite"],
      story: [
        "One of the Twelve and keeper of the common purse, Judas betrayed Jesus to the authorities for thirty pieces of silver, marking him with a kiss. The Gospels record his remorse and end. He stands as the figure of trust broken from within the closest circle.",
        "Islamic tradition, holding that ʿĪsā was not crucified but raised to God and another made to resemble him, names in several commentaries the betrayer as the one upon whom that likeness fell — so that the plotter perished in the place he had prepared."
      ],
      lessons: ["The nearest place can hide the deepest betrayal.",
                "Greed can sell what no price can buy back."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "The Quran teaches that ʿĪsā was neither killed nor crucified, but it was made to appear so to them.", "Q 4:157–158", "Surah al-Nisāʼ"),
        b("bible", "Judas Iscariot, who betrayed Jesus for thirty pieces of silver and then despaired.", "Matthew 26–27; John 13", "Gospels"),
        b("tradition", "Several commentators name the betrayer as the one made to resemble ʿĪsā, dying in his place.", "al-Tabari; Ibn Kathir", "Tafsir on Q 4:157")
      ],
      encounters: [ enc("isa", "Betrayed him with a kiss in the garden.", "Matthew 26") ],
      relations: [ r("isa", "opponent"), r("hawariyyun", "kin") ]
    },

    /* ===================== GOSPEL — DISCIPLES & FRIENDS ===================== */
    {
      id: "mary-magdalene", name: "Mary Magdalene", title: "Witness of the Resurrection",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Mary Magdalene", greek: "Μαρία ἡ Μαγδαληνή (María hē Magdalēnḗ)", tradition: "مريم المجدلية (Maryam al-Majdaliyya)" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: [
        "A devoted follower healed by Jesus, Mary of Magdala stood by the cross when most had fled and came to the tomb at dawn. In the Gospel of John she is the first to whom the risen Christ appears, sent to carry the news to the others — remembered in tradition as the one who bore witness first."
      ],
      lessons: ["She stayed when others fled.",
                "The first witness was a woman who would not leave."],
      sources: ["bible"],
      entries: [
        b("bible", "Mary Magdalene, healed and devoted, stands at the cross and is first to meet the risen Jesus.", "Luke 8; John 19–20; Mark 16", "Gospels")
      ],
      encounters: [ enc("isa", "First to whom the risen Christ appeared at the tomb.", "John 20") ],
      relations: [ r("isa", "student"), r("hawariyyun", "companion") ]
    },
    {
      id: "lazarus", name: "Lazarus", title: "The Friend Raised from Death",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Lazarus of Bethany", greek: "Λάζαρος (Lázaros)", tradition: "العازر (al-ʿĀzar)" },
      archetypes: ["faithful-companion"],
      story: [
        "The brother of Martha and Mary of Bethany and a friend of Jesus. When he died, Jesus wept, then called him from the tomb after four days — the greatest of the raising miracles in John's Gospel. The Quran affirms that ʿĪsā, by God's leave, gave life to the dead, and the commentators recall this sign among them."
      ],
      lessons: ["Even at the tomb, mercy is not finished.",
                "Life and death answer to God's command alone."],
      sources: ["bible", "quran", "tradition"],
      entries: [
        b("quran", "ʿĪsā, by God's leave, raised the dead — among the signs given to him.", "Q 3:49; Q 5:110", "On the miracles of ʿĪsā"),
        b("bible", "Lazarus of Bethany, brother of Martha and Mary, raised by Jesus after four days in the tomb.", "John 11", "Gospels"),
        b("tradition", "His raising is recalled among the life-giving signs granted to ʿĪsā by God's leave.", "Ibn Kathir", "Tafsir")
      ],
      encounters: [ enc("isa", "Called from the tomb after four days.", "John 11") ],
      relations: [ r("isa", "companion"), r("martha", "sibling") ]
    },
    {
      id: "martha", name: "Martha", title: "The Hospitable Sister of Bethany",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "Martha", greek: "Μάρθα (Mártha)", tradition: "مرتا (Martā)" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: [
        "Sister of Lazarus and Mary of Bethany, Martha welcomed Jesus into her home and busied herself in service, gently reminded that the better part is to listen. At her brother's death she confessed her faith that Jesus was the Christ before Lazarus was raised."
      ],
      lessons: ["Service is good; attentive faith is better.",
                "She confessed belief in the face of grief."],
      sources: ["bible"],
      entries: [
        b("bible", "Martha of Bethany, who serves Jesus and confesses him as the Christ at her brother's tomb.", "Luke 10; John 11", "Gospels")
      ],
      relations: [ r("isa", "companion"), r("lazarus", "sibling") ]
    },
    {
      id: "nicodemus", name: "Nicodemus", title: "The Pharisee Who Came by Night",
      named: false, era: "Gospel", group: "The Apostles", depth: "minor",
      names: { bible: "Nicodemus", greek: "Νικόδημος (Nikódēmos)", tradition: "نيقوديموس (Nīqūdīmūs)" },
      archetypes: ["truth-seeker", "advisor"],
      story: [
        "A Pharisee and member of the ruling council, Nicodemus came to Jesus by night to question him, and received the teaching on being born anew. Later he defended Jesus before the council and, after the crucifixion, helped prepare the body for burial — a cautious seeker who at last stepped into the light."
      ],
      lessons: ["A seeker may begin in the dark and end in the light.",
                "He defended the truth among those who opposed it."],
      sources: ["bible"],
      entries: [
        b("bible", "Nicodemus, a Pharisee and ruler, who seeks Jesus by night, defends him, and helps bury him.", "John 3; John 7; John 19", "Gospels")
      ],
      encounters: [ enc("isa", "Came by night and was taught of being born anew.", "John 3") ],
      relations: [ r("isa", "student") ]
    },

    /* ===================== THE APOSTOLIC AGE ===================== */
    {
      id: "paul-tarsus", name: "Paul of Tarsus", title: "Apostle to the Nations",
      named: false, era: "The Apostolic Age", group: "The Apostles", depth: "major",
      names: { bible: "Paul / Saul", greek: "Παῦλος (Paûlos)", tradition: "بولس (Būlus)" },
      archetypes: ["reformer", "repentant"],
      story: [
        "Once Saul, a zealous persecutor of the early believers, he was stopped by a vision on the road to Damascus and became Paul, the tireless apostle to the gentiles. His journeys and letters shaped the early church across the Roman world; he was imprisoned and, by tradition, martyred in Rome. He never met Jesus in life, coming to the faith after him."
      ],
      lessons: ["The fiercest opponent can become the firmest voice.",
                "A single encounter can overturn a whole life."],
      sources: ["bible"],
      entries: [
        b("bible", "Saul the persecutor, transformed on the Damascus road into Paul, apostle to the gentiles, author of many epistles.", "Acts 9; Romans; Galatians", "Acts · Epistles"),
        b("tradition", "In Islamic discussions of Christian history, Paul is often viewed as a major shaper of later Christian doctrine, distinct from the direct disciples of ʿĪsā.", "Comparative discussion", "Historical view")
      ],
      relations: [ r("isa", "successor", "an apostle who came after Jesus"), r("hawariyyun", "successor"), r("barnabas", "companion") ]
    },
    {
      id: "stephen", name: "Stephen", title: "The First Martyr",
      named: false, era: "The Apostolic Age", group: "The Apostles", depth: "supporting",
      names: { bible: "Stephen", greek: "Στέφανος (Stéphanos)", tradition: "إستفانوس (Isṭifānūs)" },
      archetypes: ["martyr", "faithful-companion"],
      story: [
        "One of the seven chosen to serve the early community in Jerusalem, Stephen preached boldly and was the first believer put to death for the faith, stoned outside the city while praying forgiveness for those who killed him. Saul, the future Paul, looked on at his death."
      ],
      lessons: ["He prayed for his killers as he died.",
                "The first to fall watered the faith with patience."],
      sources: ["bible"],
      entries: [
        b("bible", "Stephen, deacon and first martyr of the early church, stoned while praying for his persecutors.", "Acts 6–7", "Acts")
      ],
      relations: [ r("isa", "successor", "a follower after Jesus"), r("hawariyyun", "successor"), r("paul-tarsus", "contemporary") ]
    },
    {
      id: "barnabas", name: "Barnabas", title: "The Son of Encouragement",
      named: false, era: "The Apostolic Age", group: "The Apostles", depth: "supporting",
      names: { bible: "Barnabas (Joseph)", greek: "Βαρνάβας (Barnábas)", tradition: "برنابا (Barnābā)" },
      archetypes: ["faithful-companion", "advisor"],
      story: [
        "A Levite of Cyprus called 'son of encouragement,' Barnabas vouched for the newly converted Paul when others feared him, and travelled with him on the first missions to the gentiles. Generous and trusted, he is remembered as a bridge-builder of the early church."
      ],
      lessons: ["He vouched for a former enemy when none other would.",
                "Encouragement can open a door faith cannot force."],
      sources: ["bible"],
      entries: [
        b("bible", "Barnabas, the encourager, who sponsors Paul and accompanies him on the first missionary journeys.", "Acts 4; Acts 9; Acts 11–14", "Acts")
      ],
      relations: [ r("isa", "successor", "a believer after Jesus"), r("hawariyyun", "successor"), r("paul-tarsus", "companion") ]
    },

    /* ===================== RULERS & POWERS ===================== */
    {
      id: "herod-great", name: "Herod the Great", title: "King of Judea",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Herod the Great", greek: "Ἡρῴδης (Hērṓidēs)", tradition: "هيرودس (Hīrūdus)" },
      archetypes: ["tyrant"],
      story: [
        "The Rome-appointed king of Judea at the birth of Jesus, Herod was a great but ruthless builder. Troubled by the news of a newborn king, he is remembered in Matthew's Gospel for ordering the slaughter of the infants of Bethlehem, from which the holy family fled into Egypt. He stands as the fearful tyrant who turns power against the innocent."
      ],
      lessons: ["A throne defended by cruelty is a throne afraid.",
                "Tyranny fears most the child it cannot control."],
      sources: ["bible", "historical"],
      entries: [
        b("bible", "Herod the Great, troubled by the news of a newborn king, orders the slaughter of the infants of Bethlehem.", "Matthew 2", "Gospels"),
        b("historical", "Client king of Judea under Rome, renowned builder of the Temple, infamous for cruelty.", "Josephus, Antiquities", "Scholarship")
      ],
      encounters: [ enc("isa", "Sought the infant's life, prompting the flight into Egypt.", "Matthew 2") ],
      relations: [ r("isa", "opponent"), r("herod-antipas", "parent") ]
    },
    {
      id: "herod-antipas", name: "Herod Antipas", title: "Tetrarch of Galilee",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Herod Antipas", greek: "Ἡρῴδης Ἀντίπας (Hērṓidēs Antípas)", tradition: "هيرودس أنتيباس (Hīrūdus Antībās)" },
      archetypes: ["tyrant"],
      story: [
        "Son of Herod the Great and ruler of Galilee, Antipas had John the Baptist — the Yaḥyā of the Quran — imprisoned for rebuking his marriage, and at a banquet ordered his beheading. He later questioned Jesus during the passion. He is the ruler who silenced a prophet to please a court."
      ],
      lessons: ["He killed a prophet to keep a rash oath.",
                "Power that fears rebuke destroys the one who warns it."],
      sources: ["bible", "historical"],
      entries: [
        b("bible", "Herod Antipas, tetrarch of Galilee, who imprisons and beheads John the Baptist and later questions Jesus.", "Mark 6; Luke 23", "Gospels"),
        b("historical", "Son of Herod the Great, tetrarch of Galilee and Perea under Rome.", "Josephus, Antiquities", "Scholarship")
      ],
      encounters: [ enc("yahya", "Imprisoned and beheaded John the Baptist.", "Mark 6") ],
      relations: [ r("yahya", "opponent"), r("isa", "opponent"), r("herod-great", "child") ]
    },
    {
      id: "herod-agrippa", name: "Herod Agrippa", title: "King Who Persecuted the Church",
      named: false, era: "The Apostolic Age", group: "The Apostles", depth: "minor",
      names: { bible: "Herod Agrippa I", greek: "Ἡρῴδης Ἀγρίππας (Hērṓidēs Agríppas)", tradition: "هيرودس أغريباس (Hīrūdus Aghrībās)" },
      archetypes: ["tyrant"],
      story: [
        "Grandson of Herod the Great and king over Judea, Agrippa persecuted the early church, putting James son of Zebedee to the sword and imprisoning Peter. Acts records his sudden death after accepting the praise of a crowd as a god — a warning against pride that seizes what belongs to God."
      ],
      lessons: ["He took for himself the honour due to God alone."],
      sources: ["bible", "historical"],
      entries: [
        b("bible", "Herod Agrippa, who kills James and imprisons Peter, then dies after being hailed as a god.", "Acts 12", "Acts"),
        b("historical", "Herod Agrippa I, king of Judea, grandson of Herod the Great.", "Josephus, Antiquities", "Scholarship")
      ],
      relations: [ r("james-zebedee", "opponent"), r("simon-peter", "opponent"), r("herod-great", "descendant") ]
    },
    {
      id: "pontius-pilate", name: "Pontius Pilate", title: "Roman Prefect of Judea",
      named: false, era: "Gospel", group: "The Apostles", depth: "supporting",
      names: { bible: "Pontius Pilate", greek: "Πόντιος Πιλᾶτος (Póntios Pilâtos)", tradition: "بيلاطس البنطي (Bīlāṭus al-Bunṭī)" },
      archetypes: ["arrogant-elite"],
      story: [
        "The Roman governor of Judea before whom Jesus was brought. The Gospels show him finding no fault, yet washing his hands and yielding to the crowd. The Quran teaches that ʿĪsā was not in truth crucified but raised to God, and that it only appeared so — so that the sentence Pilate allowed did not fall as men supposed."
      ],
      lessons: ["To wash one's hands is not to be free of the deed.",
                "Yielding to a crowd is still a choice."],
      sources: ["bible", "quran", "historical"],
      entries: [
        b("quran", "The Quran teaches that ʿĪsā was neither killed nor crucified, but it was made to appear so.", "Q 4:157–158", "Surah al-Nisāʼ"),
        b("bible", "Pontius Pilate, the governor who finds no fault yet hands Jesus over to be crucified.", "Matthew 27; John 18–19", "Gospels"),
        b("historical", "Roman prefect of Judea, attested in Roman and Jewish sources and an inscription at Caesarea.", "Tacitus; Josephus", "Scholarship")
      ],
      encounters: [ enc("isa", "Judged him, found no fault, yet yielded to the crowd.", "John 18–19") ],
      relations: [ r("isa", "opponent") ]
    }

  );
})();
