/* People of the Quran — The Household & Companions */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(
    /* ===================== THE PROPHET'S HOUSEHOLD ===================== */
    {
      id: "abdullah-ibn-abd-al-muttalib",
      name: "Abdullah ibn Abd al-Muttalib",
      title: "The Prophet's Father",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "ʿAbd Allāh ibn ʿAbd al-Muṭṭalib", arabic: "عبد الله بن عبد المطلب" },
      archetypes: ["faithful-companion"],
      story: ["The father of the Prophet Muhammad, a young man of the clan of Hāshim, who died during a trading journey to Medina before his son was born. Muhammad thus entered the world an orphan, and his father is remembered chiefly through the line he carried and the early loss that shaped his son's care for orphans."],
      lessons: ["The Prophet was orphaned before birth, and so understood the orphan's need."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Remembered as the father of the Prophet, who died on a journey to Medina while Āmina was pregnant.", "Sira", "Sira"),
        b("historical", "A son of ʿAbd al-Muṭṭalib of the Banū Hāshim of Quraysh; died in Medina before Muhammad's birth, c. 570 CE.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The father who died before his son was born, leaving him an orphan.", "Sira") ],
      relations: [ r("muhammad", "parent"), r("abd-al-muttalib", "child"), r("amina-bint-wahb", "spouse") ]
    },
    {
      id: "amina-bint-wahb",
      name: "Amina bint Wahb",
      title: "The Prophet's Mother",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "Āmina bint Wahb", arabic: "آمنة بنت وهب" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: ["The mother of the Prophet Muhammad, of the Banū Zuhra of Quraysh. Widowed before her son's birth, she raised him in his earliest years and died when he was about six, on the road back from a visit to his kin in Medina. Her loss left him to the care of his grandfather and then his uncle, and tradition remembers his tenderness toward her memory throughout his life."],
      lessons: ["Twice orphaned, the Prophet learned compassion through his own early grief."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The mother of the Prophet, who died at al-Abwāʼ when he was a young child; he later visited and wept at her grave.", "Sahih Muslim", "Hadith"),
        b("historical", "Of the Banū Zuhra of Quraysh; died c. 576 CE while Muhammad was about six years old.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The mother whose early death left him an orphan in the care of his kin.", "Sira") ],
      relations: [ r("muhammad", "parent"), r("abdullah-ibn-abd-al-muttalib", "spouse") ]
    },
    {
      id: "abd-al-muttalib",
      name: "Abd al-Muttalib",
      title: "The Prophet's Grandfather",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "ʿAbd al-Muṭṭalib ibn Hāshim", arabic: "عبد المطلب" },
      archetypes: ["faithful-companion"],
      story: ["The grandfather who took the orphaned Muhammad into his care, a chief of the Banū Hāshim and a custodian of the Kaʿba and the well of Zamzam. Honoured among the Quraysh, he showed the young boy unusual favour. He died when Muhammad was about eight, passing his guardianship to his uncle Abū Ṭālib."],
      lessons: ["Kinship duty sheltered the orphan who would become the Messenger."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Took the orphaned Muhammad under his care and showed him marked affection until his own death.", "Sira", "Sira"),
        b("historical", "A leading figure of Quraysh, custodian of the Kaʿba; associated with the rediscovery of the well of Zamzam.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The grandfather who raised him after his mother's death.", "Sira") ],
      relations: [ r("muhammad", "kin", "grandfather"), r("abdullah-ibn-abd-al-muttalib", "parent"), r("abu-talib", "parent"), r("hamza", "parent"), r("abbas", "parent") ]
    },
    {
      id: "abu-talib",
      name: "Abu Talib",
      title: "The Protecting Uncle",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "Abū Ṭālib ibn ʿAbd al-Muṭṭalib", arabic: "أبو طالب" },
      archetypes: ["faithful-companion"],
      story: ["The uncle who raised Muhammad after the death of ʿAbd al-Muṭṭalib and who shielded him through the hardest years of the Meccan mission. Though Abū Ṭālib never openly professed the new faith, his protection of his nephew against the hostility of Quraysh was steadfast; his death, in the same year as Khadīja's, left the Prophet so bereft that the year is remembered as the Year of Sorrow. He was the father of ʿAlī."],
      lessons: ["Loyalty of kin can shelter a cause even amid doubt."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Defended the Prophet against Quraysh; his death in the Year of Sorrow removed a key protector.", "Sira", "Sira"),
        b("historical", "Father of ʿAlī ibn Abī Ṭālib; a respected chief of the Banū Hāshim who upheld his nephew's safety.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The uncle who raised and protected him through the years of persecution.", "Sira") ],
      relations: [ r("muhammad", "kin", "uncle"), r("abd-al-muttalib", "child"), r("ali", "parent") ]
    },
    {
      id: "hamza",
      name: "Hamza ibn Abd al-Muttalib",
      title: "Lion of God",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "Ḥamza ibn ʿAbd al-Muṭṭalib · Asad Allāh", arabic: "حمزة بن عبد المطلب" },
      archetypes: ["faithful-companion", "martyr"],
      story: ["An uncle of the Prophet, close to him in age and his foster-brother, renowned for his courage. His embrace of Islam strengthened the young community against the scorn of Quraysh, and he earned the title Lion of God. He fell as a martyr at the battle of Uḥud, and the Prophet grieved him deeply; he is honoured as the foremost of the martyrs."],
      lessons: ["Courage in defence of faith is remembered above strength alone."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Called 'the master of the martyrs'; his death at Uḥud was among the heaviest griefs the Prophet bore.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "Uncle and foster-brother of the Prophet; an early convert whose strength bolstered the Muslims; killed at Uḥud, 625 CE.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The beloved uncle whose martyrdom at Uḥud he mourned.", "Sira") ],
      relations: [ r("muhammad", "kin", "uncle"), r("abd-al-muttalib", "child"), r("abbas", "sibling") ]
    },
    {
      id: "abbas",
      name: "Abbas ibn Abd al-Muttalib",
      title: "The Prophet's Uncle",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "minor",
      names: { tradition: "al-ʿAbbās ibn ʿAbd al-Muṭṭalib", arabic: "العباس بن عبد المطلب" },
      archetypes: ["faithful-companion"],
      story: ["An uncle of the Prophet, a Meccan of standing who in time joined the Muslim community and was held in honour. From his line descended the later Abbasid family. He is remembered as a generous and well-regarded elder of the Prophet's kin."],
      lessons: ["Kinship and faith can converge late yet leave a lasting line."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "An uncle of the Prophet, mentioned with respect in the reports of the early community.", "Hadith", "Hadith"),
        b("historical", "A prominent member of Quraysh and the Banū Hāshim; ancestor of the later Abbasid family.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The uncle whose descendants would carry the family's name forward.", "Sira") ],
      relations: [ r("muhammad", "kin", "uncle"), r("abd-al-muttalib", "child"), r("hamza", "sibling") ]
    },
    {
      id: "khadija",
      name: "Khadija bint Khuwaylid",
      title: "The First Believer",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "major",
      names: { tradition: "Khadīja bint Khuwaylid", arabic: "خديجة بنت خويلد" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: [
        "A noble and successful merchant of Mecca, Khadīja employed Muhammad for his honesty and afterward proposed marriage to him. She was his first wife and, for as long as she lived, his only one. When the first revelation came in the cave of Ḥirāʼ and he returned trembling, it was Khadīja who wrapped him, reassured him, and bore witness that God would not forsake him.",
        "She was the first to believe in his message, supporting him with her wealth, her counsel and her unwavering trust through the bitterest years of persecution. The mother of his children, including Fāṭima, she died shortly before the migration, in the Year of Sorrow. The Prophet honoured her memory all his life as the best of his companions."
      ],
      lessons: ["The first to believe was the one who knew his character best.",
                "Steady reassurance can carry another through their darkest hour."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The first to accept Islam; she comforted the Prophet after the first revelation and was promised a house in Paradise.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "A respected Meccan merchant who married Muhammad and supported his mission; mother of Fāṭima; died c. 619 CE.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [
        enc("muhammad", "His first wife and first believer, who steadied him when revelation began.", "Sira"),
        enc("fatima", "Her daughter, born of her marriage to the Prophet.", "Sira")
      ],
      relations: [ r("muhammad", "spouse"), r("fatima", "parent") ]
    },
    {
      id: "aisha",
      name: "Aisha bint Abi Bakr",
      title: "Mother of the Believers",
      named: false, era: "Revelation in Medina", group: "The Prophet's Household", depth: "major",
      names: { tradition: "ʿĀʼisha bint Abī Bakr · Umm al-Muʼminīn", arabic: "عائشة بنت أبي بكر" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: ["A wife of the Prophet and daughter of Abū Bakr, ʿĀʼisha became one of the foremost teachers of the early community. Known for her keen memory and sharp understanding, she transmitted a great many ḥadīth and was consulted on matters of faith and law long after the Prophet's death. She is honoured, as are the Prophet's wives, with the title Mother of the Believers."],
      lessons: ["Knowledge faithfully preserved becomes a guide for generations."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Among the most prolific narrators of ḥadīth; later Companions turned to her for understanding of the Prophet's practice.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "Daughter of Abū Bakr and wife of the Prophet; a major authority of the early community in Medina.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [
        enc("muhammad", "His wife, who preserved and taught much of his guidance.", "Sira"),
        enc("abu-bakr", "Her father, the first of the caliphs.", "Sira")
      ],
      relations: [ r("muhammad", "spouse"), r("abu-bakr", "child") ]
    },
    {
      id: "fatima",
      name: "Fatima bint Muhammad",
      title: "The Prophet's Daughter",
      named: false, era: "Revelation in Medina", group: "The Prophet's Household", depth: "major",
      names: { tradition: "Fāṭima al-Zahrāʼ", arabic: "فاطمة بنت محمد" },
      archetypes: ["believing-woman", "faithful-companion"],
      story: ["The daughter of the Prophet and Khadīja, dearest to her father among his children. She married ʿAlī ibn Abī Ṭālib, and from them came Ḥasan and Ḥusayn. Remembered for her piety, patience and modest life, she is among the most honoured women of the household. She died within a few months of her father, and through her the Prophet's lineage continued."],
      lessons: ["Nearness to the Prophet was measured in devotion, not station."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The Prophet said Fāṭima was a part of him; she is counted among the foremost women of Paradise.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "Daughter of Muhammad and Khadīja; wife of ʿAlī; mother of Ḥasan and Ḥusayn; died c. 632 CE.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [
        enc("muhammad", "His beloved daughter, through whom his lineage continued.", "Sira"),
        enc("ali", "Her husband, the Prophet's cousin.", "Sira")
      ],
      relations: [ r("muhammad", "parent"), r("khadija", "parent"), r("ali", "spouse"), r("hasan", "child"), r("husayn", "child") ]
    },
    {
      id: "ali",
      name: "Ali ibn Abi Talib",
      title: "Cousin and Son-in-Law",
      named: false, era: "Revelation in Mecca", group: "The Prophet's Household", depth: "major",
      names: { tradition: "ʿAlī ibn Abī Ṭālib", arabic: "علي بن أبي طالب" },
      archetypes: ["faithful-companion", "advisor"],
      story: [
        "The Prophet's cousin, raised in his household, and among the very first to believe — a child when he accepted the message. He grew into a devoted companion known for learning, courage and judgement, and he married the Prophet's daughter Fāṭima, becoming the father of Ḥasan and Ḥusayn.",
        "On the night of the migration he lay in the Prophet's bed to deceive those who sought to kill him, and he stood at the Prophet's side through the great events of Medina. He later became the fourth of the caliphs. He is honoured across the community as one of the closest of the Prophet's kin and companions."
      ],
      lessons: ["Early faith and steadfast loyalty marked a life beside the Prophet."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Among the first to embrace Islam; he slept in the Prophet's bed on the night of the hijra to draw away his pursuers.", "Sira", "Sira"),
        b("historical", "Cousin and son-in-law of the Prophet, husband of Fāṭima, father of Ḥasan and Ḥusayn; the fourth caliph (656–661 CE).", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [
        enc("muhammad", "The cousin he raised, who risked his life on the night of the migration.", "Sira"),
        enc("fatima", "His wife, the Prophet's daughter.", "Sira")
      ],
      relations: [ r("muhammad", "kin", "cousin"), r("abu-talib", "child"), r("fatima", "spouse"), r("hasan", "parent"), r("husayn", "parent") ]
    },
    {
      id: "hasan",
      name: "Hasan ibn Ali",
      title: "Grandson of the Prophet",
      named: false, era: "Revelation in Medina", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "al-Ḥasan ibn ʿAlī", arabic: "الحسن بن علي" },
      archetypes: ["faithful-companion"],
      story: ["The elder grandson of the Prophet, son of ʿAlī and Fāṭima, beloved by his grandfather who carried him and prayed for him. Remembered for his gentleness and for his choice to set aside a claim to leadership in order to spare the community bloodshed, he is honoured among the people of the household."],
      lessons: ["Peace willingly chosen can be greater than power held."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The Prophet loved Ḥasan and Ḥusayn and called them his two grandsons; he was seen carrying Ḥasan on his shoulder.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "Son of ʿAlī and Fāṭima; relinquished his claim to leadership to avoid civil strife; died c. 670 CE.", "Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "His grandfather, who cherished him in childhood.", "Sira") ],
      relations: [ r("muhammad", "descendant", "grandson"), r("ali", "child"), r("fatima", "child"), r("husayn", "sibling") ]
    },
    {
      id: "husayn",
      name: "Husayn ibn Ali",
      title: "Grandson of the Prophet",
      named: false, era: "Revelation in Medina", group: "The Prophet's Household", depth: "supporting",
      names: { tradition: "al-Ḥusayn ibn ʿAlī", arabic: "الحسين بن علي" },
      archetypes: ["faithful-companion", "martyr"],
      story: ["The younger grandson of the Prophet, son of ʿAlī and Fāṭima, beloved by his grandfather. In later years he stood against what he saw as injustice and was killed at Karbalāʼ, a death mourned across the community and remembered as a martyrdom for principle. He is honoured among the people of the household."],
      lessons: ["To stand for justice may cost everything, yet endure in memory."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The Prophet held Ḥusayn dear, naming him and his brother among the foremost of the youth of Paradise.", "Sunan al-Tirmidhi", "Hadith"),
        b("historical", "Son of ʿAlī and Fāṭima; killed at Karbalāʼ in 680 CE, mourned as a martyr across the community.", "Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "His grandfather, who loved him as a child.", "Sira") ],
      relations: [ r("muhammad", "descendant", "grandson"), r("ali", "child"), r("fatima", "child"), r("hasan", "sibling") ]
    },

    /* ===================== THE COMPANIONS ===================== */
    {
      id: "abu-bakr",
      name: "Abu Bakr al-Siddiq",
      title: "The Faithful Friend",
      named: false, era: "Revelation in Mecca", group: "The Companions", depth: "major",
      names: { tradition: "Abū Bakr al-Ṣiddīq", arabic: "أبو بكر الصديق" },
      archetypes: ["faithful-companion", "truth-seeker"],
      story: [
        "A respected merchant of Mecca and the closest friend of the Prophet, Abū Bakr was among the first men to believe and gave his wealth freely to free those enslaved for their faith. His instant trust earned him the title al-Ṣiddīq, 'the truthful, the affirming.'",
        "He was the Prophet's companion in the cave during the migration, sharing its danger, and remained at his side through every trial. After the Prophet's death he became the first caliph, holding the young community together. He is remembered as the foremost of the Companions in faith and loyalty."
      ],
      lessons: ["To believe without hesitation is itself a kind of greatness."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The Prophet's companion in the cave during the hijra, referred to in revelation as 'the second of two.'", "Sahih al-Bukhari", "Hadith"),
        b("historical", "An early convert who spent his wealth freeing the persecuted; the first caliph (632–634 CE).", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [
        enc("muhammad", "His dearest friend and companion in the cave on the night of the migration.", "Sira"),
        enc("aisha", "His daughter, a wife of the Prophet.", "Sira")
      ],
      relations: [ r("muhammad", "companion"), r("aisha", "parent"), r("umar", "successor") ]
    },
    {
      id: "umar",
      name: "Umar ibn al-Khattab",
      title: "The Just Caliph",
      named: false, era: "Revelation in Mecca", group: "The Companions", depth: "major",
      names: { tradition: "ʿUmar ibn al-Khaṭṭāb · al-Fārūq", arabic: "عمر بن الخطاب" },
      archetypes: ["faithful-companion", "reformer"],
      story: [
        "Once a fierce opponent of the new faith, ʿUmar set out to harm the Prophet and was instead overcome by the words of the Quran; his conversion gave the community new strength and openness. Stern in justice and plain in living, he became known as al-Fārūq, the one who distinguishes right from wrong.",
        "As the second caliph he guided the community through a time of great expansion, yet held himself and his governors to strict account, walking among the people and seeing to the poor. He is remembered as a model of justice and integrity in authority."
      ],
      lessons: ["The fiercest opponent can become the firmest believer.",
                "Justice begins with holding oneself to account."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "His acceptance of Islam strengthened the early Muslims, who could thereafter pray openly at the Kaʿba.", "Sira", "Sira"),
        b("historical", "The second caliph (634–644 CE), remembered for administrative reform and a reputation for justice.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The former adversary who became one of his closest companions.", "Sira") ],
      relations: [ r("muhammad", "companion"), r("abu-bakr", "successor"), r("uthman", "successor") ]
    },
    {
      id: "uthman",
      name: "Uthman ibn Affan",
      title: "Compiler of the Quran",
      named: false, era: "Revelation in Mecca", group: "The Companions", depth: "major",
      names: { tradition: "ʿUthmān ibn ʿAffān · Dhū al-Nūrayn", arabic: "عثمان بن عفان" },
      archetypes: ["faithful-companion"],
      story: ["A gentle and generous man of wealth among the early believers, ʿUthmān gave freely for the good of the community and married two daughters of the Prophet in turn, earning the title Dhū al-Nūrayn, 'possessor of the two lights.' As the third caliph he oversaw the gathering of the Quran into a single authoritative written form, a service for which the whole community remains in his debt."],
      lessons: ["Modesty and generosity can serve a cause as much as boldness."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Noted for his modesty and generosity; he funded provisions and a well for the community in Medina.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "The third caliph (644–656 CE); under him the Quran was compiled into a standard written text.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The son-in-law whose later care preserved the Quran's written form.", "Sira") ],
      relations: [ r("muhammad", "companion"), r("umar", "successor") ]
    },
    {
      id: "bilal",
      name: "Bilal ibn Rabah",
      title: "The First Muezzin",
      named: false, era: "Revelation in Mecca", group: "The Companions", depth: "supporting",
      names: { tradition: "Bilāl ibn Rabāḥ", arabic: "بلال بن رباح" },
      archetypes: ["faithful-companion", "oppressed", "martyr"],
      story: ["An enslaved man of Abyssinian origin in Mecca, Bilāl was tortured to make him renounce his faith, yet he answered only, 'One, One.' Abū Bakr bought his freedom, and he became among the most beloved of the Companions. Chosen for the beauty and strength of his voice, he gave the first call to prayer — the adhān — and his story stands as a sign that faith, not lineage or station, raises a person in the sight of God."],
      lessons: ["In faith there is no rank of birth, only of sincerity."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "The first to call the adhān; he endured torture for his faith with the words 'aḥad, aḥad' — 'One, One.'", "Sahih al-Bukhari", "Hadith"),
        b("historical", "A freed slave of Abyssinian descent, among the earliest Muslims and a close companion of the Prophet.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [
        enc("muhammad", "The Prophet who chose his voice to summon the community to prayer.", "Sira"),
        enc("abu-bakr", "The companion who bought his freedom from slavery.", "Sira")
      ],
      relations: [ r("muhammad", "companion"), r("abu-bakr", "ally") ]
    },
    {
      id: "salman-al-farsi",
      name: "Salman al-Farsi",
      title: "The Seeker from Persia",
      named: false, era: "Revelation in Medina", group: "The Companions", depth: "supporting",
      names: { tradition: "Salmān al-Fārisī", arabic: "سلمان الفارسي" },
      archetypes: ["truth-seeker", "faithful-companion"],
      story: ["Born in Persia, Salmān left his homeland on a long search for the true religion, passing through years of study and even slavery until he reached Medina and recognised the Prophet he had been told to seek. A man of wisdom and learning, he is remembered for the strategy of the trench that protected Medina, and the Prophet honoured him as one of the household. His life is a testament to the seeker who travels far to find the truth."],
      lessons: ["The honest search for truth can cross the whole world to find it."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "His long journey from Persia in search of the true faith is recounted in detail in the tradition.", "Musnad Ahmad", "Hadith"),
        b("historical", "A Persian convert who advised the digging of the trench at the siege of Medina (627 CE).", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The prophet he crossed the world to seek, who counted him among his household.", "Sira") ],
      relations: [ r("muhammad", "companion") ]
    },
    {
      id: "musab-ibn-umayr",
      name: "Mus'ab ibn Umayr",
      title: "The First Envoy",
      named: false, era: "Revelation in Mecca", group: "The Companions", depth: "supporting",
      names: { tradition: "Muṣʿab ibn ʿUmayr", arabic: "مصعب بن عمير" },
      archetypes: ["faithful-companion", "martyr", "reformer"],
      story: ["A young man of Mecca raised in comfort and known for his fine appearance, Muṣʿab gave up wealth and ease when he embraced Islam, enduring his family's rejection. The Prophet sent him to Medina as the first teacher and envoy of the faith, and through his gentle instruction many of its people believed, preparing the way for the migration. He fell as a martyr at Uḥud, mourned for the life of plenty he had freely left behind."],
      lessons: ["To leave comfort for conviction is the measure of true faith."],
      sources: ["tradition", "historical"],
      entries: [
        b("tradition", "Remembered as one who left a life of luxury for faith; at his death there was scarcely enough cloth to shroud him.", "Sahih al-Bukhari", "Hadith"),
        b("historical", "Sent ahead to Medina as the first teacher of Islam there; killed at the battle of Uḥud, 625 CE.", "Ibn Isḥāq, Sira", "Sira")
      ],
      encounters: [ enc("muhammad", "The Prophet who entrusted him with the first mission to Medina.", "Sira") ],
      relations: [ r("muhammad", "companion") ]
    }
  );
})();
