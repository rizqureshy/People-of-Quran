/* People of the Quran — Ruth, Samuel & the Kings (Bible & Torah) */
(function () {
  "use strict";
  var D = window.PQ_DATA; if (!D) return;
  var b = D.b, r = D.r, enc = D.enc, P = D.people;

  P.push(

    /* ===================== RUTH & THE ANCESTRY OF DAVID ===================== */
    {
      id: "naomi", name: "Naomi", title: "The Widow Who Returned (Naomi)",
      named: false, era: "The Conquest & Judges", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Naomi", hebrew: "נׇעֳמִי (Noʻŏmī)", tradition: "نُعْمِي (Nuʻmī)" },
      archetypes: ["believing-woman", "oppressed"],
      story: [
        "In the Book of Ruth, Naomi of Bethlehem goes with her husband and two sons into the land of Moab to escape a famine. There her husband dies, and afterwards her two sons, leaving her bereft in a foreign land. She turns homeward bitter, asking to be called Mara, 'bitter', for the Almighty had dealt harshly with her — yet her loyal daughter-in-law Ruth clings to her, and through Ruth's son the line of the kings of Israel is renewed."
      ],
      lessons: ["Grief may turn the heart bitter, yet God can restore what loss has emptied.",
                "Faithful kinship outlasts famine and exile."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Naomi loses her husband and sons in Moab and returns to Bethlehem with Ruth, who becomes mother to the line of David.", "Ruth 1; Ruth 4", "Ruth"),
        b("torah", "Noʻŏmī, the widow of Bethlehem whose redemption through Ruth restores the ancestral line of kings.", "Megillat Ruth 1–4", "Tanakh")
      ],
      relations: [ r("ruth", "kin"), r("boaz", "kin"), r("obed", "ancestor"), r("dawud", "ancestor") ]
    },
    {
      id: "ruth", name: "Ruth", title: "The Loyal Moabite (Ruth)",
      named: false, era: "The Conquest & Judges", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Ruth", hebrew: "רוּת (Rūt)", tradition: "راعُوث (Rāʻūth)" },
      archetypes: ["believing-woman", "faithful-companion", "truth-seeker"],
      story: [
        "Ruth was a Moabite woman widowed in her own land, who refused to abandon her widowed mother-in-law Naomi. 'Where you go I will go,' she said, 'your people shall be my people, and your God my God.' Returning with Naomi to Bethlehem, she gleaned in the fields of Boaz, a kinsman, who showed her kindness and took her in marriage. From her was born Obed, grandfather of David — so that a stranger who embraced the faith of Israel became foremother of its greatest king."
      ],
      lessons: ["A sincere convert may be honoured above those born to the covenant.",
                "Loyalty and faith open a place in the line of the righteous."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Ruth the Moabite cleaves to Naomi and her God, marries Boaz, and becomes the great-grandmother of King David.", "Ruth 1–4", "Ruth"),
        b("torah", "Rūt, the Moabite who entered the people of Israel by faith and from whom the royal house would descend.", "Megillat Ruth 1–4", "Tanakh")
      ],
      relations: [ r("boaz", "spouse"), r("naomi", "kin"), r("obed", "parent"), r("dawud", "ancestor") ]
    },
    {
      id: "boaz", name: "Boaz", title: "The Kinsman Redeemer (Boaz)",
      named: false, era: "The Conquest & Judges", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Boaz", hebrew: "בֹּעַז (Bōʻaz)", tradition: "بُوعَز (Būʻaz)" },
      archetypes: ["faithful-companion", "reformer"],
      story: [
        "Boaz was a man of standing in Bethlehem who let the foreign widow Ruth glean freely in his fields and protected her from harm. As a near kinsman of Naomi's house, he undertook the duty of the redeemer, marrying Ruth so that the name and inheritance of the dead would not be lost. Their son Obed became the grandfather of David — and so Boaz stands in the genealogy that leads to the throne of Israel."
      ],
      lessons: ["To redeem the inheritance of the helpless is an act of righteousness.",
                "Generosity to the stranger can shape the destiny of a nation."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Boaz redeems the land of Naomi's house and marries Ruth; their son Obed is the grandfather of David.", "Ruth 2–4", "Ruth"),
        b("torah", "Bōʻaz, the redeemer of Bethlehem who took Rūt to wife and continued the line toward kingship.", "Megillat Ruth 2–4", "Tanakh")
      ],
      relations: [ r("ruth", "spouse"), r("naomi", "kin"), r("obed", "parent"), r("dawud", "ancestor") ]
    },
    {
      id: "obed", name: "Obed", title: "Grandfather of David (Obed)",
      named: false, era: "The Conquest & Judges", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Obed", hebrew: "עוֹבֵד (ʻŌvēd)", tradition: "عُوبيد (ʻŪbīd)" },
      archetypes: ["faithful-companion"],
      lessons: ["A single righteous link can carry a covenant across the generations."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Obed, son of Boaz and Ruth, father of Jesse and grandfather of King David.", "Ruth 4; 1 Chronicles 2", "Ruth · 1 Chronicles"),
        b("torah", "ʻŌvēd, born of Bōʻaz and Rūt, a link in the genealogy of the house of David.", "Megillat Ruth 4", "Tanakh")
      ],
      relations: [ r("ruth", "child"), r("boaz", "child"), r("jesse", "parent"), r("dawud", "ancestor") ]
    },
    {
      id: "jesse", name: "Jesse", title: "The Father of David (Jesse)",
      named: false, era: "Kingdom", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Jesse", hebrew: "יִשַׁי (Yishai)", tradition: "يَسَّى (Yassā)" },
      archetypes: ["faithful-companion"],
      story: [
        "Jesse of Bethlehem, grandson of Boaz and Ruth, was father to eight sons. When the prophet Samuel came at God's command to anoint a new king, Jesse brought his elder sons before him one by one, but God chose none of them. Only when the youngest, David, was called in from tending the sheep did Samuel anoint him. From the 'stump of Jesse' the prophets foretold a righteous shoot would one day grow."
      ],
      lessons: ["God looks not on outward stature but upon the heart.",
                "The least esteemed in a household may be the one God raises up."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Jesse presents his sons to Samuel, who passes over the elders and anoints the youngest, David.", "1 Samuel 16; 1 Samuel 17", "1 Samuel"),
        b("torah", "Yishai of Bethlehem, father of David, from whose stock a future deliverer was foretold.", "Shemuel Aleph 16; Yeshayahu 11", "Tanakh")
      ],
      relations: [ r("dawud", "parent"), r("obed", "child"), r("bani-israel", "kin") ]
    },

    /* ===================== SAMUEL'S BIRTH & THE PRIEST AT SHILOH ===================== */
    {
      id: "hannah", name: "Hannah", title: "The Mother of Samuel (Hannah)",
      named: false, era: "The Conquest & Judges", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Hannah", hebrew: "חַנָּה (Ḥannāh)", tradition: "حَنَّة (Ḥannah)" },
      archetypes: ["believing-woman", "truth-seeker"],
      story: [
        "Hannah was a barren and grieving wife who poured out her soul in prayer at the sanctuary of Shiloh, vowing that if God granted her a son she would dedicate him to His service all his life. The priest Eli at first mistook her silent weeping for drunkenness, then blessed her. God answered her, and she bore Samuel, whom she gave back to the LORD. Her song of thanksgiving — that God lifts the poor from the dust and brings low the proud — echoes through later scripture."
      ],
      lessons: ["The prayer wrung from a broken heart is heard by God.",
                "What is dedicated to God in sincerity is returned in blessing."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Hannah prays for a son at Shiloh, bears Samuel, dedicates him to God, and sings of God who raises the lowly.", "1 Samuel 1; 1 Samuel 2", "1 Samuel"),
        b("torah", "Ḥannāh, whose vow and prayer at Shiloh brought forth Shemūʼēl, the prophet of Israel.", "Shemuel Aleph 1–2", "Tanakh")
      ],
      encounters: [ enc("shamwil", "Dedicated her son to God's service at Shiloh.", "1 Samuel 1") ],
      relations: [ r("shamwil", "parent"), r("eli", "contemporary"), r("bani-israel", "kin") ]
    },
    {
      id: "eli", name: "Eli", title: "The Priest at Shiloh (Eli)",
      named: false, era: "The Conquest & Judges", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Eli", hebrew: "עֵלִי (ʻĒlī)", tradition: "عالي (ʻĀlī)" },
      archetypes: ["advisor", "repentant"],
      story: [
        "Eli was the aged priest and judge at the sanctuary of Shiloh who raised the boy Samuel after his mother dedicated him. Though devout himself, Eli failed to restrain his corrupt sons, and judgement was pronounced upon his house. When word came that the Ark of God had been captured and his sons slain in battle, the old man fell back and died — but the child entrusted to him grew to become the prophet who anointed Israel's first kings."
      ],
      lessons: ["A leader who will not restrain wrongdoing in his own house bears its consequence.",
                "God may raise a faithful servant even in a failing generation."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Eli the priest mentors young Samuel at Shiloh; his negligent sons bring ruin, and he dies when the Ark is captured.", "1 Samuel 1–4", "1 Samuel"),
        b("torah", "ʻĒlī, priest of Shiloh and guardian of the boy Shemūʼēl, whose house was judged for its sins.", "Shemuel Aleph 1–4", "Tanakh")
      ],
      encounters: [ enc("shamwil", "Raised and instructed the boy Samuel in the sanctuary.", "1 Samuel 3") ],
      relations: [ r("shamwil", "teacher"), r("hannah", "contemporary"), r("bani-israel", "kin") ]
    },

    /* ===================== HOUSE OF SAUL & THE COURT OF DAVID ===================== */
    {
      id: "jonathan", name: "Jonathan", title: "The Faithful Friend of David (Jonathan)",
      named: false, era: "Kingdom", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Jonathan", hebrew: "יְהוֹנָתָן (Yehōnātān)", tradition: "يُونَاثان (Yūnāthān)" },
      archetypes: ["faithful-companion", "truth-seeker"],
      story: [
        "Jonathan, the brave eldest son of King Saul, loved David as his own soul, though David was destined to take the throne his own father held. He warned David of Saul's murderous intent, made a covenant of loyalty with him, and gave him his own cloak and sword. Setting friendship and the will of God above his own claim to kingship, he fell at last alongside his father on Mount Gilboa, deeply mourned by David."
      ],
      lessons: ["True friendship can rise above rivalry and self-interest.",
                "To honour God's chosen one over one's own ambition is nobility of soul."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Jonathan, Saul's son, befriends David, protects him from Saul, and dies with his father in battle.", "1 Samuel 18–20; 1 Samuel 31", "1 Samuel"),
        b("torah", "Yehōnātān, son of Shāʼūl, bound in covenant of love with David and slain at Gilboa.", "Shemuel Aleph 18–31", "Tanakh")
      ],
      encounters: [ enc("dawud", "Made a covenant of loyalty and warned David of Saul's plots.", "1 Samuel 20") ],
      relations: [ r("talut", "child"), r("dawud", "ally"), r("michal", "sibling"), r("bani-israel", "kin") ]
    },
    {
      id: "michal", name: "Michal", title: "The Daughter of Saul, Wife of David (Michal)",
      named: false, era: "Kingdom", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Michal", hebrew: "מִיכַל (Mīkhal)", tradition: "ميكال (Mīkāl)" },
      archetypes: ["believing-woman"],
      story: [
        "Michal, a daughter of King Saul, loved David and became his first wife. When Saul sought to kill him, she lowered David from a window by night and let him escape, deceiving the men sent to seize him. In later years she rebuked David for dancing before the Ark as it returned to the city. Her life moved between the falling house of her father and the rising house of her husband."
      ],
      lessons: ["Love may demand the courage to defy even one's own father.",
                "Pride in station can blind one to humble devotion before God."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Michal, Saul's daughter and David's wife, saves David from her father, then later despises his dancing before the Ark.", "1 Samuel 19; 2 Samuel 6", "1–2 Samuel"),
        b("torah", "Mīkhal, daughter of Shāʼūl and wife of David, who delivered him from her father's men.", "Shemuel Aleph 19; Shemuel Bet 6", "Tanakh")
      ],
      relations: [ r("dawud", "spouse"), r("talut", "child"), r("jonathan", "sibling") ]
    },
    {
      id: "abigail", name: "Abigail", title: "The Wise Peacemaker (Abigail)",
      named: false, era: "Kingdom", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Abigail", hebrew: "אֲבִיגַיִל (ʼĂvīgayil)", tradition: "أبيجايل (Abījāyil)" },
      archetypes: ["believing-woman", "advisor"],
      story: [
        "Abigail was a woman 'of good understanding' married to the harsh and foolish Nabal. When her husband insulted David and his men, and David rode out to take vengeance, Abigail met him with gifts and wise, humble words that turned away his anger and kept him from bloodguilt. David blessed her counsel, and after Nabal's death she became his wife — a woman remembered for prudence that stayed a king's hand from sin."
      ],
      lessons: ["Wise and gentle words can avert bloodshed and restrain even a king.",
                "Discernment in a crisis is a gift more valuable than wealth."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Abigail intercedes with David to prevent his vengeance on her household, and later becomes his wife.", "1 Samuel 25", "1 Samuel"),
        b("torah", "ʼĂvīgayil, the discerning woman whose counsel kept David from shedding blood in anger.", "Shemuel Aleph 25", "Tanakh")
      ],
      encounters: [ enc("dawud", "Turned David from vengeance with gifts and wise counsel.", "1 Samuel 25") ],
      relations: [ r("dawud", "spouse"), r("bani-israel", "kin") ]
    },
    {
      id: "bathsheba", name: "Bathsheba", title: "Wife of David, Mother of Solomon (Bathsheba)",
      named: false, era: "Kingdom", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Bathsheba", hebrew: "בַּת־שֶׁבַע (Bat-Shevaʻ)", tradition: "بَثْشَبَع (Bath-Shabaʻ)" },
      archetypes: ["believing-woman"],
      story: [
        "Bathsheba was the wife of Uriah the Hittite, and the woman over whom David committed his great fall, recorded with sorrow and repentance in the scriptures. After Uriah's death she became David's wife and bore him Solomon, the heir to his throne and the builder of the Temple. In David's old age she came before him to secure the kingship for her son, and stood as queen mother in the court of Solomon."
      ],
      lessons: ["Even the failings of the righteous are recorded, that none think themselves above the law.",
                "From repentance God may still bring forth a heir of wisdom."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Bathsheba, wife of Uriah, becomes David's wife and the mother of Solomon, securing his succession.", "2 Samuel 11–12; 1 Kings 1–2", "2 Samuel · 1 Kings"),
        b("torah", "Bat-Shevaʻ, mother of Shelomoh, in whose account David's sin and repentance are remembered.", "Shemuel Bet 11–12; Melakhim Aleph 1", "Tanakh")
      ],
      relations: [ r("dawud", "spouse"), r("sulayman", "parent"), r("uriah", "spouse") ]
    },
    {
      id: "uriah", name: "Uriah the Hittite", title: "The Faithful Soldier Wronged (Uriah)",
      named: false, era: "Kingdom", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Uriah the Hittite", hebrew: "אוּרִיָּה הַחִתִּי (ʼŪriyyāh ha-Ḥittī)", tradition: "أُورِيَّا (Ūriyyā)" },
      archetypes: ["martyr", "oppressed", "faithful-companion"],
      story: [
        "Uriah the Hittite was a loyal soldier in David's army, so devoted that he would not go home to comfort while the Ark and his comrades remained in tents on campaign. He was the husband of Bathsheba, and to conceal his own wrong David had him placed at the front of the fiercest fighting, where he was killed. The prophet Nathan rebuked David with the parable of the poor man's one ewe lamb, and David repented bitterly of the injustice done to his faithful servant."
      ],
      lessons: ["The innocent loyalty of the wronged stands as a witness against the powerful.",
                "No rank exempts a ruler from the justice owed to the least of his servants."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Uriah, David's loyal soldier and Bathsheba's husband, is sent to die in battle; Nathan condemns the wrong.", "2 Samuel 11–12", "2 Samuel"),
        b("torah", "ʼŪriyyāh ha-Ḥittī, the faithful warrior wronged by David, whose death drew the prophet's rebuke.", "Shemuel Bet 11–12", "Tanakh")
      ],
      relations: [ r("bathsheba", "spouse"), r("dawud", "servant"), r("nathan", "contemporary") ]
    },
    {
      id: "nathan", name: "Nathan", title: "The Prophet Who Rebuked the King (Nathan)",
      named: false, era: "Kingdom", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Nathan", hebrew: "נָתָן (Nātān)", tradition: "ناثان (Nāthān)" },
      archetypes: ["prophet", "advisor", "reformer"],
      story: [
        "Nathan was the prophet at the court of David, the voice of God before the throne. It was to him God gave the promise that David's house and kingdom would endure. When David sinned in the matter of Bathsheba and Uriah, Nathan came fearlessly and told the parable of the rich man who seized the poor man's only lamb — then declared, 'You are the man.' His courage brought the king to repentance, and he later helped secure the succession of Solomon."
      ],
      lessons: ["The true prophet speaks God's truth even to a king's face.",
                "Justice held before power can turn a heart to repentance."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Nathan delivers God's covenant to David and rebukes him for his sin, leading him to repentance.", "2 Samuel 7; 2 Samuel 12; 1 Kings 1", "2 Samuel · 1 Kings"),
        b("torah", "Nātān ha-Navi, prophet of David's court, who bore both the promise and the rebuke of God.", "Shemuel Bet 7–12", "Tanakh")
      ],
      encounters: [ enc("dawud", "Confronted David with the parable of the ewe lamb.", "2 Samuel 12") ],
      relations: [ r("dawud", "advisor"), r("sulayman", "advisor"), r("bani-israel", "kin") ]
    },
    {
      id: "joab", name: "Joab", title: "The Commander of David's Army (Joab)",
      named: false, era: "Kingdom", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Joab", hebrew: "יוֹאָב (Yōʼāv)", tradition: "يُوآب (Yūʼāb)" },
      archetypes: ["advisor"],
      story: [
        "Joab, David's nephew, was the long-serving and formidable commander of his armies. He fought David's wars and was at times indispensable to him, yet he was also ruthless — slaying Abner and Absalom against the king's wishes, and shedding blood in peace as in war. In his final charge David instructed Solomon to deal with Joab's bloodguilt. He stands as a warning of the warrior whose loyalty was stained by vengeance."
      ],
      lessons: ["Power untempered by mercy leaves a debt of blood that must be answered.",
                "Service to a king does not excuse shedding innocent blood."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Joab, David's general, leads his armies but kills Abner and Absalom; his bloodguilt is charged at his end.", "2 Samuel 3; 2 Samuel 18; 1 Kings 2", "2 Samuel · 1 Kings"),
        b("torah", "Yōʼāv, commander of David's host, whose vengeance brought blood-guilt upon his head.", "Shemuel Bet 3–20; Melakhim Aleph 2", "Tanakh")
      ],
      relations: [ r("dawud", "servant"), r("abner", "opponent"), r("absalom", "opponent"), r("bani-israel", "kin") ]
    },
    {
      id: "abner", name: "Abner", title: "Saul's Commander (Abner)",
      named: false, era: "Kingdom", group: "House of David", depth: "minor",
      names: { quran: "(unnamed)", bible: "Abner", hebrew: "אַבְנֵר (ʼAvnēr)", tradition: "أبنير (Abnīr)" },
      archetypes: ["advisor"],
      story: [
        "Abner was the captain of King Saul's army and his kinsman, who after Saul's death upheld the rule of Saul's surviving son against the rising house of David. In time he sought to make peace and bring all Israel under David, but was treacherously killed by Joab in revenge for a brother slain in battle. David mourned him publicly and disavowed the murder, lamenting that a prince and great man had fallen in Israel."
      ],
      lessons: ["A peace nearly won can be undone by private vengeance.",
                "The death of an honourable foe may still be worthy of a leader's grief."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Abner, Saul's commander, supports Saul's house then turns to David, and is murdered by Joab; David mourns him.", "2 Samuel 2–3", "2 Samuel"),
        b("torah", "ʼAvnēr, captain of Shāʼūl's army, slain by Yōʼāv as David sought to unite the kingdom.", "Shemuel Bet 2–3", "Tanakh")
      ],
      relations: [ r("talut", "servant"), r("dawud", "opponent"), r("joab", "opponent"), r("bani-israel", "kin") ]
    },
    {
      id: "absalom", name: "Absalom", title: "The Rebel Son (Absalom)",
      named: false, era: "Kingdom", group: "House of David", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Absalom", hebrew: "אַבְשָׁלוֹם (ʼAvshālōm)", tradition: "أبشالوم (Abshālōm)" },
      archetypes: ["tyrant", "arrogant-elite"],
      story: [
        "Absalom, a handsome and ambitious son of David, won the hearts of the people by flattery and then rose in open rebellion against his own father, driving the king from his city. War divided the kingdom, and in the battle Absalom's long hair caught in the branches of an oak as he fled, and Joab killed him there against David's plea to spare the young man. David wept inconsolably — 'O Absalom, my son' — grieving the child whose pride had ruined him."
      ],
      lessons: ["Ambition that turns against one's own father ends in ruin.",
                "A father's love can outlast even a son's betrayal."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Absalom revolts against his father David, seizing the kingdom, and is killed by Joab in the forest of Ephraim.", "2 Samuel 15–18", "2 Samuel"),
        b("torah", "ʼAvshālōm, the rebellious son of David, whose pride led him to revolt and to his death.", "Shemuel Bet 15–18", "Tanakh")
      ],
      relations: [ r("dawud", "child"), r("joab", "opponent"), r("bani-israel", "kin") ]
    },

    /* ===================== THE DIVIDED KINGDOM — KINGS OF ISRAEL & JUDAH ===================== */
    {
      id: "rehoboam", name: "Rehoboam", title: "The King Who Split the Kingdom (Rehoboam)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Rehoboam", hebrew: "רְחַבְעָם (Reḥavʻām)", tradition: "رَحُبْعَام (Raḥubʻām)" },
      archetypes: ["arrogant-elite", "tyrant"],
      story: [
        "Rehoboam, son of Solomon, inherited the throne of a united Israel. When the people asked him to lighten the heavy burdens his father had laid on them, he scorned the counsel of the elders and followed his young companions, threatening to make their yoke heavier still. At this the ten northern tribes broke away under Jeroboam, and the kingdom was torn in two — Judah left to Rehoboam, Israel to another. His arrogance fractured the realm of David and Solomon."
      ],
      lessons: ["Pride that despises wise counsel can shatter what generations built.",
                "A ruler who scorns the burdens of his people forfeits their loyalty."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Rehoboam rejects the elders' counsel and burdens the people, causing the ten tribes to secede under Jeroboam.", "1 Kings 12; 2 Chronicles 10", "1 Kings · 2 Chronicles"),
        b("torah", "Reḥavʻām, son of Shelomoh, whose harshness divided the kingdom into Judah and Israel.", "Melakhim Aleph 12", "Tanakh")
      ],
      relations: [ r("sulayman", "child"), r("dawud", "descendant"), r("jeroboam", "opponent") ]
    },
    {
      id: "jeroboam", name: "Jeroboam", title: "The First King of the North (Jeroboam)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Jeroboam", hebrew: "יָרׇבְעָם (Yārovʻām)", tradition: "يَرُبْعَام (Yarubʻām)" },
      archetypes: ["tyrant", "hypocrite"],
      story: [
        "Jeroboam, once a servant of Solomon, was told by a prophet that God would give him rule over ten tribes. When Rehoboam's folly split the kingdom, Jeroboam became the first king of the northern realm of Israel. Fearing that pilgrimage to the Temple in Jerusalem would draw his people back to the house of David, he set up two golden calves at Bethel and Dan and led Israel into idolatry — a sin for which he became the byword of the kings who 'made Israel to sin.'"
      ],
      lessons: ["To lead a people into idolatry for the sake of power is the gravest of betrayals.",
                "Fear of losing a throne can drive a ruler to corrupt a whole nation's worship."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Jeroboam becomes king of the ten northern tribes and sets up golden calves, leading Israel into sin.", "1 Kings 11–14", "1 Kings"),
        b("torah", "Yārovʻām, first king of the northern Israel, who made the golden calves at Bethel and Dan.", "Melakhim Aleph 11–14", "Tanakh")
      ],
      relations: [ r("sulayman", "servant"), r("rehoboam", "opponent"), r("bani-israel", "kin") ]
    },
    {
      id: "ahab", name: "Ahab", title: "The King Who Served Baal (Ahab)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Ahab", hebrew: "אַחְאָב (ʼAḥʼāv)", tradition: "آخاب (Ākhāb)" },
      archetypes: ["tyrant", "arrogant-elite"],
      story: [
        "Ahab, king of the northern kingdom of Israel, married the Phoenician princess Jezebel and under her influence raised altars to Baal, doing more to provoke God than all the kings before him. Against him stood the prophet Elijah (Ilyās), who challenged the prophets of Baal on Mount Carmel and called down fire from heaven, and who condemned Ahab's seizure of Naboth's vineyard through murder. Ahab fell at last in battle as the prophets had foretold."
      ],
      lessons: ["A throne yoked to idolatry sets itself against the messengers of God.",
                "The blood of the innocent, like Naboth's, cries out against the powerful."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Ahab, king of Israel, promotes Baal worship under Jezebel and opposes the prophet Elijah.", "1 Kings 16–22", "1 Kings"),
        b("torah", "ʼAḥʼāv, king of Israel who served Baal and stood against Ēliyyāhū the prophet.", "Melakhim Aleph 16–22", "Tanakh")
      ],
      encounters: [ enc("ilyas", "Opposed Elijah, who challenged the prophets of Baal at Carmel.", "1 Kings 18") ],
      relations: [ r("ilyas", "opponent"), r("jezebel", "spouse"), r("bani-israel", "kin") ]
    },
    {
      id: "jezebel", name: "Jezebel", title: "The Queen Who Hunted the Prophets (Jezebel)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Jezebel", hebrew: "אִיזֶבֶל (ʼĪzevel)", tradition: "إيزابل (Īzābil)" },
      archetypes: ["tyrant", "arrogant-elite", "skeptic"],
      story: [
        "Jezebel, a Phoenician princess and wife of King Ahab, brought the worship of Baal into Israel and sought to put the prophets of God to the sword, hunting Elijah (Ilyās) until he fled into the wilderness. She engineered the false trial and murder of Naboth to seize his vineyard for her husband. For her cruelty and idolatry the prophets foretold her violent end, and so it came to pass — she stands in scripture as the emblem of a queen who set herself against God."
      ],
      lessons: ["Power used to persecute the righteous draws down a terrible reckoning.",
                "Idolatry wedded to cruelty corrupts a kingdom from its very throne."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Jezebel, Ahab's queen, slaughters the prophets, pursues Elijah, and contrives the death of Naboth.", "1 Kings 18–21; 2 Kings 9", "1–2 Kings"),
        b("torah", "ʼĪzevel, queen of Israel who persecuted the prophets of God and met a violent end.", "Melakhim Aleph 18–21", "Tanakh")
      ],
      encounters: [ enc("ilyas", "Sought to kill Elijah, forcing him to flee into the wilderness.", "1 Kings 19") ],
      relations: [ r("ilyas", "opponent"), r("ahab", "spouse"), r("bani-israel", "opponent") ]
    },
    {
      id: "naaman", name: "Naaman", title: "The Healed Commander (Naaman)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "minor",
      names: { quran: "(unnamed)", bible: "Naaman", hebrew: "נַעֲמָן (Naʻămān)", tradition: "نُعْمان (Nuʻmān)" },
      archetypes: ["truth-seeker", "repentant"],
      story: [
        "Naaman was the commander of the army of Aram, a great man stricken with leprosy. At the word of a captive Israelite girl he sought out the prophet Elisha (Al-Yasaʻ), who bade him wash seven times in the Jordan. At first he scorned so humble a remedy, but when he obeyed his flesh was made clean as a child's. Humbled and healed, he confessed that there was no God in all the earth but the God of Israel."
      ],
      lessons: ["Healing comes through humble obedience, not through pride of station.",
                "A sincere heart can recognise the one true God through His signs."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Naaman, the Aramean commander, is healed of leprosy by washing in the Jordan at Elisha's word, and turns to the God of Israel.", "2 Kings 5", "2 Kings"),
        b("torah", "Naʻămān, the foreign captain cleansed by the prophet Ĕlīshāʻ, who confessed the God of Israel.", "Melakhim Bet 5", "Tanakh")
      ],
      encounters: [ enc("al-yasa", "Was healed of leprosy by obeying Elisha's command to wash in the Jordan.", "2 Kings 5") ],
      relations: [ r("al-yasa", "student"), r("bani-israel", "contemporary") ]
    },
    {
      id: "hezekiah", name: "Hezekiah", title: "The Reforming King of Judah (Hezekiah)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Hezekiah", hebrew: "חִזְקִיָּהוּ (Ḥizqiyyāhū)", tradition: "حِزْقِيَّا (Ḥizqiyyā)" },
      archetypes: ["reformer", "truth-seeker"],
      story: [
        "Hezekiah, king of Judah, was a righteous reformer who tore down the high places and idols and trusted in the LORD as no king before him. When the mighty army of Assyria besieged Jerusalem and its envoy mocked the God of Israel, Hezekiah spread the threatening letter before God in the Temple and prayed; that night the besieging host was struck and withdrew. When sickness brought him near death, he wept and prayed, and God added fifteen years to his life."
      ],
      lessons: ["Trust in God and earnest prayer can deliver a city from an overwhelming foe.",
                "Reform that purges idolatry restores a people to their covenant."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Hezekiah purges idolatry, trusts God against Assyria's siege of Jerusalem, and is granted added years of life.", "2 Kings 18–20; 2 Chronicles 32", "2 Kings · 2 Chronicles"),
        b("torah", "Ḥizqiyyāhū, righteous king of Judah, delivered from Assyria through prayer and faith.", "Melakhim Bet 18–20; Yeshayahu 36–38", "Tanakh")
      ],
      relations: [ r("dawud", "descendant"), r("manasseh", "parent"), r("bani-israel", "kin") ]
    },
    {
      id: "manasseh", name: "Manasseh", title: "The King Who Repented (Manasseh)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "minor",
      names: { quran: "(unnamed)", bible: "Manasseh", hebrew: "מְנַשֶּׁה (Menashsheh)", tradition: "مَنَسَّى (Manassā)" },
      archetypes: ["tyrant", "repentant"],
      story: [
        "Manasseh, son of the righteous Hezekiah, became the most idolatrous of all the kings of Judah, rebuilding the high places his father had destroyed and filling Jerusalem with innocent blood. But when the king of Assyria carried him away in chains, Manasseh humbled himself greatly before the God of his fathers and prayed; God heard him and restored him to his kingdom. Returned, he put away the foreign gods — a startling testament that no sinner is beyond repentance."
      ],
      lessons: ["No depth of wrongdoing is beyond the reach of sincere repentance.",
                "Affliction can break a hardened heart and turn it back to God."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Manasseh, the most idolatrous king of Judah, is taken captive, humbles himself, and is restored after repentance.", "2 Kings 21; 2 Chronicles 33", "2 Kings · 2 Chronicles"),
        b("torah", "Menashsheh, king of Judah whose great sins and later humbling are recorded among the kings.", "Melakhim Bet 21", "Tanakh")
      ],
      relations: [ r("hezekiah", "child"), r("josiah", "ancestor"), r("dawud", "descendant") ]
    },
    {
      id: "josiah", name: "Josiah", title: "The King Who Found the Law (Josiah)",
      named: false, era: "Divided Kingdom", group: "Kings of Israel & Judah", depth: "supporting",
      names: { quran: "(unnamed)", bible: "Josiah", hebrew: "יֹאשִׁיָּהוּ (Yōʼshiyyāhū)", tradition: "يُوشِيَّا (Yūshiyyā)" },
      archetypes: ["reformer", "truth-seeker"],
      story: [
        "Josiah came to the throne of Judah as a boy and grew into its great reformer. When the long-neglected Book of the Law was discovered in the Temple during its repair, he tore his garments in grief that his people had strayed so far from it. He read the covenant aloud to all the people, swept away the idols and high places throughout the land, and restored the Passover as it had not been kept since the days of the judges. No king before or after turned to God with all his heart as he did."
      ],
      lessons: ["The rediscovery of God's word can renew a whole nation's covenant.",
                "Wholehearted reform begins with humble grief over how far one has strayed."],
      sources: ["bible", "torah"],
      entries: [
        b("bible", "Josiah finds the Book of the Law, renews the covenant, destroys idolatry, and restores the Passover.", "2 Kings 22–23; 2 Chronicles 34–35", "2 Kings · 2 Chronicles"),
        b("torah", "Yōʼshiyyāhū, king of Judah, who reformed the worship of the people on finding the Torah scroll.", "Melakhim Bet 22–23", "Tanakh")
      ],
      relations: [ r("manasseh", "descendant"), r("dawud", "descendant"), r("bani-israel", "kin") ]
    }

  );
})();
