// AWL Sublist 1 Question Bank — 360 questions (6 per word × 60 words)
// Format: { word, level ("learn"|"proficient"|"master"), q_number (1|2), passage, distractors[] }
// Correct answer is always q.word (base form). Never stored explicitly.
// Grammar rule: every passage works with the exact base form in the blank.

const QB = [

  // ─── ANALYSE ──────────────────────────────────────────────────────────────
  { word:"analyse", level:"learn", q_number:1,
    passage:"The students were asked to ___ the graph and say what it shows.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"analyse", level:"learn", q_number:2,
    passage:"Scientists ___ soil samples to measure levels of pollution.",
    distractors:["require","vary","occur","respond"] },

  { word:"analyse", level:"proficient", q_number:1,
    passage:"A chemist must carefully ___ each compound to determine its exact properties.",
    distractors:["obtain","conduct","evaluate","restrict"] },

  { word:"analyse", level:"proficient", q_number:2,
    passage:"The detective decided to ___ the evidence systematically before drawing conclusions.",
    distractors:["achieve","conduct","restrict","select"] },

  { word:"analyse", level:"master", q_number:1,
    passage:"A good essay must ___ the causes and implications behind events, not merely describe them.",
    distractors:["conduct","obtain","restrict","select"] },

  { word:"analyse", level:"master", q_number:2,
    passage:"The team was asked to ___ the data in detail rather than just summarise the overall trend.",
    distractors:["achieve","conduct","restrict","justify"] },

  // ─── APPROACH ─────────────────────────────────────────────────────────────
  { word:"approach", level:"learn", q_number:1,
    passage:"The school uses a creative ___ to teaching maths — students learn through games.",
    distractors:["formula","period","income","labour"] },

  { word:"approach", level:"learn", q_number:2,
    passage:"There is more than one ___ to solving this problem.",
    distractors:["formula","section","factor","percent"] },

  { word:"approach", level:"proficient", q_number:1,
    passage:"The therapist's ___ was to listen carefully before offering any advice.",
    distractors:["outcome","scheme","framework","task"] },

  { word:"approach", level:"proficient", q_number:2,
    passage:"The company adopted a cautious ___ to entering the new market.",
    distractors:["outcome","scheme","framework","element"] },

  { word:"approach", level:"master", q_number:1,
    passage:"Rather than following a rigid formula, she preferred a flexible ___ that responded to each student's individual needs.",
    distractors:["scheme","outcome","technique","component"] },

  { word:"approach", level:"master", q_number:2,
    passage:"The two researchers disagreed on the best ___ — one favoured experimentation, the other preferred observation.",
    distractors:["scheme","framework","technique","alternative"] },

  // ─── AREA ─────────────────────────────────────────────────────────────────
  { word:"area", level:"learn", q_number:1,
    passage:"Maths is an ___ that many students find challenging at first.",
    distractors:["issue","period","role","income"] },

  { word:"area", level:"learn", q_number:2,
    passage:"The doctor specialised in the ___ of children's mental health.",
    distractors:["period","section","labour","formula"] },

  { word:"area", level:"proficient", q_number:1,
    passage:"Cybersecurity has become a growing ___ of concern for governments and businesses worldwide.",
    distractors:["outcome","component","emphasis","element"] },

  { word:"area", level:"proficient", q_number:2,
    passage:"The researchers focused their study on the ___ of renewable energy storage.",
    distractors:["outcome","scheme","emphasis","element"] },

  { word:"area", level:"master", q_number:1,
    passage:"Leadership is an ___ of management where theory and practice often fail to align.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"area", level:"master", q_number:2,
    passage:"The report identified urban housing as a key ___ where policy reform was most urgently needed.",
    distractors:["outcome","component","scheme","emphasis"] },

  // ─── ASSESS ───────────────────────────────────────────────────────────────
  { word:"assess", level:"learn", q_number:1,
    passage:"The doctor needs to ___ the patient before deciding on a course of treatment.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"assess", level:"learn", q_number:2,
    passage:"Teachers regularly ___ students to check how much they have learned.",
    distractors:["create","distribute","require","respond"] },

  { word:"assess", level:"proficient", q_number:1,
    passage:"Before investing, it is important to ___ the risks involved carefully.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"assess", level:"proficient", q_number:2,
    passage:"The committee was asked to ___ the impact of the new policy on local communities.",
    distractors:["achieve","conduct","obtain","select"] },

  { word:"assess", level:"master", q_number:1,
    passage:"Engineers must ___ the structural integrity of a bridge before it can be opened to traffic.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"assess", level:"master", q_number:2,
    passage:"Rather than simply describing the problem, the report attempts to ___ its severity and propose solutions.",
    distractors:["achieve","conduct","obtain","justify"] },

  // ─── ASSUME ───────────────────────────────────────────────────────────────
  { word:"assume", level:"learn", q_number:1,
    passage:"Do not ___ that all spiders are dangerous — most are completely harmless.",
    distractors:["create","require","respond","proceed"] },

  { word:"assume", level:"learn", q_number:2,
    passage:"It is unfair to ___ someone is guilty just because they look nervous.",
    distractors:["require","indicate","respond","establish"] },

  { word:"assume", level:"proficient", q_number:1,
    passage:"Many people ___ that expensive products are always of better quality.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"assume", level:"proficient", q_number:2,
    passage:"Scientists cannot ___ that results from laboratory tests will always apply in the real world.",
    distractors:["conduct","obtain","evaluate","restrict"] },

  { word:"assume", level:"master", q_number:1,
    passage:"The writer appears to ___ that the reader already understands the historical context, which is not always the case.",
    distractors:["conduct","obtain","evaluate","select"] },

  { word:"assume", level:"master", q_number:2,
    passage:"It is always dangerous to ___ that new technology will automatically solve existing problems.",
    distractors:["conduct","obtain","evaluate","justify"] },

  // ─── AUTHORITY ────────────────────────────────────────────────────────────
  { word:"authority", level:"learn", q_number:1,
    passage:"The police have the ___ to stop vehicles and check documents.",
    distractors:["method","role","income","factor"] },

  { word:"authority", level:"learn", q_number:2,
    passage:"The school has the ___ to set its own rules about behaviour and uniform.",
    distractors:["role","income","formula","labour"] },

  { word:"authority", level:"proficient", q_number:1,
    passage:"In most legal systems, higher courts have the ___ to overturn decisions made by lower courts.",
    distractors:["outcome","scheme","framework","task"] },

  { word:"authority", level:"proficient", q_number:2,
    passage:"The committee was given full ___ to investigate the allegations and make recommendations.",
    distractors:["outcome","scheme","framework","emphasis"] },

  { word:"authority", level:"master", q_number:1,
    passage:"The new legislation significantly extends the ___ of the regulator to include digital platforms.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"authority", level:"master", q_number:2,
    passage:"Under a federal system, not all decision-making ___ rests with the central government.",
    distractors:["outcome","component","emphasis","task"] },

  // ─── AVAILABLE ────────────────────────────────────────────────────────────
  { word:"available", level:"learn", q_number:1,
    passage:"Clean drinking water is not always ___ in remote or dry regions.",
    distractors:["legal","major","evident","significant"] },

  { word:"available", level:"learn", q_number:2,
    passage:"Tickets for the concert are ___ from the box office.",
    distractors:["legal","major","specific","similar"] },

  { word:"available", level:"proficient", q_number:1,
    passage:"Grants are ___ to students who cannot afford university fees.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"available", level:"proficient", q_number:2,
    passage:"The medicine is now ___ without a prescription at most pharmacies.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"available", level:"master", q_number:1,
    passage:"Public information about government spending should be freely ___ to all citizens.",
    distractors:["appropriate","relevant","sufficient","constant"] },

  { word:"available", level:"master", q_number:2,
    passage:"When resources are limited, schools must decide how to make them equally ___ to all students.",
    distractors:["appropriate","relevant","dominant","primary"] },

  // ─── BENEFIT ──────────────────────────────────────────────────────────────
  { word:"benefit", level:"learn", q_number:1,
    passage:"One ___ of regular exercise is that it improves your mood.",
    distractors:["issue","factor","method","role"] },

  { word:"benefit", level:"learn", q_number:2,
    passage:"The main ___ of living near a school is that children can walk there safely.",
    distractors:["issue","factor","role","formula"] },

  { word:"benefit", level:"proficient", q_number:1,
    passage:"A key ___ of learning a second language is improved problem-solving ability.",
    distractors:["outcome","component","scheme","task"] },

  { word:"benefit", level:"proficient", q_number:2,
    passage:"The ___ of solar energy is that it reduces electricity bills over time.",
    distractors:["outcome","component","emphasis","element"] },

  { word:"benefit", level:"master", q_number:1,
    passage:"The scheme was designed so that all members of the community could ___ equally from the investment.",
    distractors:["achieve","obtain","evaluate","derive"] },

  { word:"benefit", level:"master", q_number:2,
    passage:"It remains unclear whether stricter regulations would ___ consumers or simply increase costs.",
    distractors:["achieve","obtain","conduct","select"] },

  // ─── CONCEPT ──────────────────────────────────────────────────────────────
  { word:"concept", level:"learn", q_number:1,
    passage:"Democracy is a ___ that means people have a say in how their country is run.",
    distractors:["issue","period","source","income"] },

  { word:"concept", level:"learn", q_number:2,
    passage:"The ___ of gravity explains why objects fall towards the ground.",
    distractors:["issue","period","source","formula"] },

  { word:"concept", level:"proficient", q_number:1,
    passage:"The ___ of supply and demand explains how the price of goods changes in a market.",
    distractors:["outcome","scheme","framework","element"] },

  { word:"concept", level:"proficient", q_number:2,
    passage:"Infinity is a mathematical ___ that is difficult to visualise.",
    distractors:["outcome","scheme","emphasis","task"] },

  { word:"concept", level:"master", q_number:1,
    passage:"The ___ of citizenship goes beyond simply holding a passport — it involves rights and responsibilities.",
    distractors:["outcome","framework","emphasis","alternative"] },

  { word:"concept", level:"master", q_number:2,
    passage:"Justice is an abstract ___ that students often find difficult to define, since it cannot be directly observed.",
    distractors:["outcome","framework","emphasis","element"] },

  // ─── CONSIST ──────────────────────────────────────────────────────────────
  { word:"consist", level:"learn", q_number:1,
    passage:"A healthy meal should ___ of vegetables, protein, and carbohydrates.",
    distractors:["create","define","proceed","respond"] },

  { word:"consist", level:"learn", q_number:2,
    passage:"The team will ___ of twelve players selected from the whole school.",
    distractors:["create","require","proceed","vary"] },

  { word:"consist", level:"proficient", q_number:1,
    passage:"The examination will ___ of three sections — reading, writing, and listening.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"consist", level:"proficient", q_number:2,
    passage:"The course will ___ of eight modules, each lasting two weeks.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"consist", level:"master", q_number:1,
    passage:"A democracy does not ___ solely of elections — it also requires free speech and an independent press.",
    distractors:["achieve","conduct","obtain","demonstrate"] },

  { word:"consist", level:"master", q_number:2,
    passage:"The panel will ___ of experts drawn from both the private and public sectors.",
    distractors:["achieve","obtain","evaluate","justify"] },

  // ─── CONSTITUTE ───────────────────────────────────────────────────────────
  { word:"constitute", level:"learn", q_number:1,
    passage:"Young people ___ more than half of the country's total population.",
    distractors:["create","define","proceed","respond"] },

  { word:"constitute", level:"learn", q_number:2,
    passage:"Women ___ the majority of students enrolled in nursing programmes.",
    distractors:["create","require","establish","vary"] },

  { word:"constitute", level:"proficient", q_number:1,
    passage:"Volunteers ___ the backbone of many charitable organisations around the world.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"constitute", level:"proficient", q_number:2,
    passage:"Imports from Asia ___ a large proportion of the country's total trade.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"constitute", level:"master", q_number:1,
    passage:"Refusing to provide information when legally required to do so may ___ a criminal offence.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"constitute", level:"master", q_number:2,
    passage:"Together, these three principles ___ the foundation of the organisation's ethical framework.",
    distractors:["achieve","obtain","evaluate","restrict"] },

  // ─── CONTEXT ──────────────────────────────────────────────────────────────
  { word:"context", level:"learn", q_number:1,
    passage:"You can often guess the meaning of a new word by reading the ___ around it.",
    distractors:["formula","period","income","labour"] },

  { word:"context", level:"learn", q_number:2,
    passage:"Without knowing the ___, it is hard to understand why the character made that choice.",
    distractors:["formula","period","income","source"] },

  { word:"context", level:"proficient", q_number:1,
    passage:"Slang words may be acceptable in an informal ___ but are inappropriate in academic writing.",
    distractors:["outcome","scheme","framework","emphasis"] },

  { word:"context", level:"proficient", q_number:2,
    passage:"The poem was written during wartime, and understanding that ___ helps explain its tone.",
    distractors:["outcome","component","framework","element"] },

  { word:"context", level:"master", q_number:1,
    passage:"Words can have very different meanings depending on the ___ in which they are used.",
    distractors:["outcome","scheme","emphasis","alternative"] },

  { word:"context", level:"master", q_number:2,
    passage:"To evaluate a historical event fairly, we must interpret it within its own ___ rather than judging it by today's standards.",
    distractors:["outcome","component","scheme","emphasis"] },

  // ─── CONTRACT ─────────────────────────────────────────────────────────────
  { word:"contract", level:"learn", q_number:1,
    passage:"The footballer signed a two-year ___ with the new club.",
    distractors:["formula","policy","theory","period"] },

  { word:"contract", level:"learn", q_number:2,
    passage:"Always read a ___ carefully before you sign it.",
    distractors:["formula","policy","period","source"] },

  { word:"contract", level:"proficient", q_number:1,
    passage:"The company was awarded a ___ to build the new motorway.",
    distractors:["outcome","scheme","framework","task"] },

  { word:"contract", level:"proficient", q_number:2,
    passage:"Metals tend to ___ when cooled and expand when heated.",
    distractors:["achieve","obtain","restrict","select"] },

  { word:"contract", level:"master", q_number:1,
    passage:"Breaking the terms of a ___ can result in serious legal consequences.",
    distractors:["outcome","scheme","framework","alternative"] },

  { word:"contract", level:"master", q_number:2,
    passage:"As the economy slowed, consumer spending began to ___ sharply.",
    distractors:["achieve","obtain","restrict","demonstrate"] },

  // ─── CREATE ───────────────────────────────────────────────────────────────
  { word:"create", level:"learn", q_number:1,
    passage:"Artists ___ works that express human feelings and experiences.",
    distractors:["assess","assume","derive","respond"] },

  { word:"create", level:"learn", q_number:2,
    passage:"Governments can ___ thousands of new jobs by investing in green energy.",
    distractors:["assess","assume","derive","distribute"] },

  { word:"create", level:"proficient", q_number:1,
    passage:"The designer was hired to ___ a new logo that better reflected the company's values.",
    distractors:["achieve","conduct","obtain","select"] },

  { word:"create", level:"proficient", q_number:2,
    passage:"Poor urban planning can ___ serious problems such as traffic congestion and pollution.",
    distractors:["achieve","conduct","evaluate","demonstrate"] },

  { word:"create", level:"master", q_number:1,
    passage:"The programme aims to ___ opportunities for young people from disadvantaged backgrounds.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"create", level:"master", q_number:2,
    passage:"By removing trade barriers, the agreement sought to ___ a single unified market.",
    distractors:["achieve","conduct","evaluate","restrict"] },

  // ─── DATA ─────────────────────────────────────────────────────────────────
  { word:"data", level:"learn", q_number:1,
    passage:"Scientists collect ___ over many years before they publish their results.",
    distractors:["labour","formula","income","policy"] },

  { word:"data", level:"learn", q_number:2,
    passage:"Without reliable ___, scientists cannot make accurate predictions.",
    distractors:["labour","formula","income","period"] },

  { word:"data", level:"proficient", q_number:1,
    passage:"The survey collected ___ from over 1,000 households across five different cities.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"data", level:"proficient", q_number:2,
    passage:"The ___ showed a clear link between screen time and sleep problems in teenagers.",
    distractors:["outcome","component","framework","task"] },

  { word:"data", level:"master", q_number:1,
    passage:"Raw ___ is of limited use until it has been sorted, cleaned, and interpreted.",
    distractors:["outcome","component","scheme","element"] },

  { word:"data", level:"master", q_number:2,
    passage:"Privacy laws restrict how companies can store and use personal ___ collected from users.",
    distractors:["outcome","scheme","framework","alternative"] },

  // ─── DEFINE ───────────────────────────────────────────────────────────────
  { word:"define", level:"learn", q_number:1,
    passage:"A dictionary is used to ___ the meaning of words.",
    distractors:["create","require","respond","proceed"] },

  { word:"define", level:"learn", q_number:2,
    passage:"Can you ___ what you mean by a 'healthy lifestyle'?",
    distractors:["respond","create","require","vary"] },

  { word:"define", level:"proficient", q_number:1,
    passage:"It is important to clearly ___ key terms at the start of any essay.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"define", level:"proficient", q_number:2,
    passage:"The report fails to ___ what it means by 'sustainable development'.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"define", level:"master", q_number:1,
    passage:"Different disciplines ___ the concept of 'culture' in quite different ways.",
    distractors:["achieve","conduct","evaluate","justify"] },

  { word:"define", level:"master", q_number:2,
    passage:"It is difficult to ___ success precisely because it means something different to each individual.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── DERIVE ───────────────────────────────────────────────────────────────
  { word:"derive", level:"learn", q_number:1,
    passage:"Many English words ___ from Latin or Greek roots.",
    distractors:["create","require","proceed","respond"] },

  { word:"derive", level:"learn", q_number:2,
    passage:"Aspirin was originally ___ from the bark of willow trees.",
    distractors:["created","required","established","distributed"] },

  { word:"derive", level:"proficient", q_number:1,
    passage:"Students can ___ great satisfaction from completing a challenging task.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"derive", level:"proficient", q_number:2,
    passage:"Researchers hope to ___ a new medicine from naturally occurring plant chemicals.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"derive", level:"master", q_number:1,
    passage:"The authority of a democratic government is said to ___ from the consent of the people.",
    distractors:["achieve","conduct","evaluate","justify"] },

  { word:"derive", level:"master", q_number:2,
    passage:"Much of this theory may ___ from earlier work carried out in the 1970s.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── DISTRIBUTE ───────────────────────────────────────────────────────────
  { word:"distribute", level:"learn", q_number:1,
    passage:"The charity plans to ___ food parcels to families in need.",
    distractors:["create","assess","legislate","proceed"] },

  { word:"distribute", level:"learn", q_number:2,
    passage:"Volunteers will ___ leaflets to every household in the area.",
    distractors:["create","require","respond","establish"] },

  { word:"distribute", level:"proficient", q_number:1,
    passage:"The aid organisation planned to ___ food and medicine equally across all affected areas.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"distribute", level:"proficient", q_number:2,
    passage:"The organisation aims to ___ resources more fairly between wealthy and poorer regions.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"distribute", level:"master", q_number:1,
    passage:"Governments must decide how to ___ public funds across education, health, and infrastructure.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"distribute", level:"master", q_number:2,
    passage:"The way governments choose to ___ wealth across society has a significant impact on levels of inequality.",
    distractors:["achieve","obtain","evaluate","restrict"] },

  // ─── ECONOMY ──────────────────────────────────────────────────────────────
  { word:"economy", level:"learn", q_number:1,
    passage:"Tourism plays a vital role in the country's ___.",
    distractors:["formula","method","labour","section"] },

  { word:"economy", level:"learn", q_number:2,
    passage:"A fall in oil prices had a severe impact on the country's ___.",
    distractors:["formula","method","section","theory"] },

  { word:"economy", level:"proficient", q_number:1,
    passage:"The government introduced tax cuts to stimulate the ___.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"economy", level:"proficient", q_number:2,
    passage:"A growing ___ usually leads to more jobs and higher wages.",
    distractors:["outcome","component","scheme","task"] },

  { word:"economy", level:"master", q_number:1,
    passage:"An ___ based primarily on manufacturing is more vulnerable to global price shocks than a service-based one.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"economy", level:"master", q_number:2,
    passage:"Economists disagree about the best policies for managing a developing ___.",
    distractors:["outcome","component","emphasis","alternative"] },

  // ─── ENVIRONMENT ──────────────────────────────────────────────────────────
  { word:"environment", level:"learn", q_number:1,
    passage:"Plastic waste is one of the biggest threats to the natural ___.",
    distractors:["formula","method","theory","period"] },

  { word:"environment", level:"learn", q_number:2,
    passage:"Cutting down rainforests destroys the ___ that many species depend on.",
    distractors:["formula","method","source","period"] },

  { word:"environment", level:"proficient", q_number:1,
    passage:"Oil spills cause serious damage to the marine ___.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"environment", level:"proficient", q_number:2,
    passage:"A supportive classroom ___ helps students feel confident and willing to take risks.",
    distractors:["outcome","scheme","framework","task"] },

  { word:"environment", level:"master", q_number:1,
    passage:"Businesses have a responsibility to minimise the impact of their operations on the ___.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"environment", level:"master", q_number:2,
    passage:"Research suggests that children raised in a stimulating home ___ perform better academically.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── ESTABLISH ────────────────────────────────────────────────────────────
  { word:"establish", level:"learn", q_number:1,
    passage:"Henry Dunant helped to ___ the Red Cross to provide aid to people affected by war.",
    distractors:["assess","distribute","legislate","vary"] },

  { word:"establish", level:"learn", q_number:2,
    passage:"A local family decided to ___ a charity to provide meals for homeless children.",
    distractors:["assess","distribute","require","respond"] },

  { word:"establish", level:"proficient", q_number:1,
    passage:"Researchers need more evidence to ___ a clear link between diet and the disease.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"establish", level:"proficient", q_number:2,
    passage:"The investigation aimed to ___ exactly how the fire had started.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"establish", level:"master", q_number:1,
    passage:"It took several decades to ___ the principle that all citizens had equal rights under the law.",
    distractors:["achieve","conduct","evaluate","justify"] },

  { word:"establish", level:"master", q_number:2,
    passage:"The organisation works to ___ good governance practices in developing countries.",
    distractors:["conduct","obtain","evaluate","restrict"] },

  // ─── ESTIMATE ─────────────────────────────────────────────────────────────
  { word:"estimate", level:"learn", q_number:1,
    passage:"Scientists ___ that the universe is about 13.8 billion years old.",
    distractors:["create","require","proceed","legislate"] },

  { word:"estimate", level:"learn", q_number:2,
    passage:"The mechanic gave us a rough ___ of the repair costs.",
    distractors:["formula","period","policy","theory"] },

  { word:"estimate", level:"proficient", q_number:1,
    passage:"Experts ___ that sea levels could rise by up to one metre by the year 2100.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"estimate", level:"proficient", q_number:2,
    passage:"It is difficult to ___ how long the project will take because so many factors are uncertain.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"estimate", level:"master", q_number:1,
    passage:"The government's ___ of the project's cost proved to be significantly lower than the actual figure.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"estimate", level:"master", q_number:2,
    passage:"Archaeologists can ___ the age of an artefact by testing the carbon it contains.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  // ─── EVIDENT ──────────────────────────────────────────────────────────────
  { word:"evident", level:"learn", q_number:1,
    passage:"It was ___ from her smile that she had passed the exam.",
    distractors:["legal","major","significant","available"] },

  { word:"evident", level:"learn", q_number:2,
    passage:"The effects of the storm were ___ — trees were down and roads were flooded.",
    distractors:["legal","major","significant","specific"] },

  { word:"evident", level:"proficient", q_number:1,
    passage:"It was ___ from the data that the new drug was more effective than the old one.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"evident", level:"proficient", q_number:2,
    passage:"The student's hard work was ___ in every assignment she submitted.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"evident", level:"master", q_number:1,
    passage:"The influence of earlier philosophers is ___ throughout the author's writing.",
    distractors:["appropriate","relevant","dominant","primary"] },

  { word:"evident", level:"master", q_number:2,
    passage:"It became increasingly ___ that the original plan would need to be revised.",
    distractors:["appropriate","relevant","sufficient","constant"] },

  // ─── EXPORT ───────────────────────────────────────────────────────────────
  { word:"export", level:"learn", q_number:1,
    passage:"Brazil ___ large quantities of coffee to countries around the world.",
    distractors:["create","require","distribute","establish"] },

  { word:"export", level:"learn", q_number:2,
    passage:"Oil is the country's most valuable ___.",
    distractors:["income","formula","factor","labour"] },

  { word:"export", level:"proficient", q_number:1,
    passage:"Japan ___ high-quality cars to markets across the globe.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"export", level:"proficient", q_number:2,
    passage:"The government increased taxes on ___ to slow down the flow of goods leaving the country.",
    distractors:["income","labour","formula","source"] },

  { word:"export", level:"master", q_number:1,
    passage:"Nations that ___ raw materials often earn less than those that sell finished products.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"export", level:"master", q_number:2,
    passage:"The dramatic fall in commodity prices severely reduced the country's ___ revenue.",
    distractors:["outcome","component","scheme","emphasis"] },

  // ─── FACTOR ───────────────────────────────────────────────────────────────
  { word:"factor", level:"learn", q_number:1,
    passage:"Exercise is an important ___ in maintaining good health.",
    distractors:["method","formula","period","theory"] },

  { word:"factor", level:"learn", q_number:2,
    passage:"Sleep is often an overlooked ___ in a student's academic performance.",
    distractors:["method","formula","role","section"] },

  { word:"factor", level:"proficient", q_number:1,
    passage:"Stress is a significant ___ in many cases of heart disease.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"factor", level:"proficient", q_number:2,
    passage:"The report identified poor communication as the main ___ behind the project's failure.",
    distractors:["outcome","component","framework","task"] },

  { word:"factor", level:"master", q_number:1,
    passage:"When designing a safe building, engineers must weigh every structural, environmental, and human ___ carefully.",
    distractors:["outcome","component","scheme","alternative"] },

  { word:"factor", level:"master", q_number:2,
    passage:"Economic growth is rarely the result of a single ___; it depends on a complex combination of conditions.",
    distractors:["outcome","component","scheme","element"] },

  // ─── FINANCE ──────────────────────────────────────────────────────────────
  { word:"finance", level:"learn", q_number:1,
    passage:"The government agreed to ___ the construction of the new hospital.",
    distractors:["create","assess","distribute","legislate"] },

  { word:"finance", level:"learn", q_number:2,
    passage:"She studied ___ at university because she wanted to work in banking.",
    distractors:["formula","method","labour","theory"] },

  { word:"finance", level:"proficient", q_number:1,
    passage:"The EU agreed to ___ the project through a dedicated research grant.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"finance", level:"proficient", q_number:2,
    passage:"Many small businesses struggle to ___ their operations during periods of slow growth.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"finance", level:"master", q_number:1,
    passage:"Governments must balance the need to ___ public services with the risk of increasing national debt.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"finance", level:"master", q_number:2,
    passage:"Personal ___ skills, such as budgeting and saving, are rarely taught in schools.",
    distractors:["outcome","component","scheme","framework"] },

  // ─── FORMULA ──────────────────────────────────────────────────────────────
  { word:"formula", level:"learn", q_number:1,
    passage:"There is no magic ___ for exam success — hard work is essential.",
    distractors:["method","theory","period","source"] },

  { word:"formula", level:"learn", q_number:2,
    passage:"Chemists use a ___ to calculate the molecular weight of a compound.",
    distractors:["method","theory","period","source"] },

  { word:"formula", level:"proficient", q_number:1,
    passage:"The show's producers finally found a winning ___ that audiences loved.",
    distractors:["outcome","scheme","framework","task"] },

  { word:"formula", level:"proficient", q_number:2,
    passage:"Water has the chemical ___ H₂O.",
    distractors:["outcome","component","emphasis","element"] },

  { word:"formula", level:"master", q_number:1,
    passage:"Some politicians repeat the same ___ of blaming outsiders whenever problems arise.",
    distractors:["outcome","scheme","framework","alternative"] },

  { word:"formula", level:"master", q_number:2,
    passage:"The maths teacher showed students how to derive the ___ rather than simply memorising it.",
    distractors:["outcome","component","scheme","emphasis"] },

  // ─── FUNCTION ─────────────────────────────────────────────────────────────
  { word:"function", level:"learn", q_number:1,
    passage:"The main ___ of the heart is to pump blood around the body.",
    distractors:["method","theory","factor","period"] },

  { word:"function", level:"learn", q_number:2,
    passage:"In a team, the ___ of the leader is to guide and motivate the other members.",
    distractors:["method","theory","income","period"] },

  { word:"function", level:"proficient", q_number:1,
    passage:"The kidneys ___ by filtering waste products from the blood.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"function", level:"proficient", q_number:2,
    passage:"Without electricity, most modern devices cannot ___.",
    distractors:["achieve","obtain","evaluate","proceed"] },

  { word:"function", level:"master", q_number:1,
    passage:"Museums serve an important educational ___ in society, preserving culture for future generations.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"function", level:"master", q_number:2,
    passage:"The new software failed to ___ correctly after the latest update was installed.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── IDENTIFY ─────────────────────────────────────────────────────────────
  { word:"identify", level:"learn", q_number:1,
    passage:"Police used CCTV footage to ___ the suspect.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"identify", level:"learn", q_number:2,
    passage:"Can you ___ the main argument in this paragraph?",
    distractors:["create","require","respond","vary"] },

  { word:"identify", level:"proficient", q_number:1,
    passage:"Biologists can ___ a species by examining its DNA.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"identify", level:"proficient", q_number:2,
    passage:"The survey sought to ___ which factors most influenced people's voting behaviour.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"identify", level:"master", q_number:1,
    passage:"One key goal of the research was to ___ barriers that prevent young people from accessing higher education.",
    distractors:["achieve","conduct","evaluate","justify"] },

  { word:"identify", level:"master", q_number:2,
    passage:"The ability to ___ reliable sources is an essential skill in the digital age.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── INCOME ───────────────────────────────────────────────────────────────
  { word:"income", level:"learn", q_number:1,
    passage:"A higher ___ usually allows people to enjoy a better standard of living.",
    distractors:["formula","method","theory","period"] },

  { word:"income", level:"learn", q_number:2,
    passage:"The government introduced a minimum wage to ensure workers earned a fair ___.",
    distractors:["formula","source","labour","period"] },

  { word:"income", level:"proficient", q_number:1,
    passage:"Families on a low ___ often struggle to pay for housing and food.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"income", level:"proficient", q_number:2,
    passage:"The organisation depends largely on donations as its main source of ___.",
    distractors:["outcome","component","scheme","task"] },

  { word:"income", level:"master", q_number:1,
    passage:"Disposable ___ — the money left after tax — is a key measure of household wealth.",
    distractors:["outcome","scheme","framework","emphasis"] },

  { word:"income", level:"master", q_number:2,
    passage:"Widening gaps between high and low ___ earners have contributed to growing social inequality.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── INDICATE ─────────────────────────────────────────────────────────────
  { word:"indicate", level:"learn", q_number:1,
    passage:"Rising sea levels ___ that climate change is having a real impact.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"indicate", level:"learn", q_number:2,
    passage:"These figures clearly ___ that sales increased sharply in the final quarter.",
    distractors:["create","require","vary","respond"] },

  { word:"indicate", level:"proficient", q_number:1,
    passage:"Pale skin and tiredness ___ that someone may be anaemic.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"indicate", level:"proficient", q_number:2,
    passage:"The results ___ a strong link between diet and the risk of heart disease.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"indicate", level:"master", q_number:1,
    passage:"Early findings ___ that the treatment may be effective, but further trials are needed.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"indicate", level:"master", q_number:2,
    passage:"Falling unemployment figures ___ that the economy is beginning to recover.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── INDIVIDUAL ───────────────────────────────────────────────────────────
  { word:"individual", level:"learn", q_number:1,
    passage:"Every ___ has the right to a fair trial.",
    distractors:["formula","period","source","income"] },

  { word:"individual", level:"learn", q_number:2,
    passage:"The programme is designed to meet each ___ student's needs.",
    distractors:["legal","major","evident","available"] },

  { word:"individual", level:"proficient", q_number:1,
    passage:"The rights of the ___ must be balanced against the needs of the wider community.",
    distractors:["outcome","component","scheme","task"] },

  { word:"individual", level:"proficient", q_number:2,
    passage:"Teachers are encouraged to give ___ feedback to each student.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"individual", level:"master", q_number:1,
    passage:"The legal system must protect the ___ from unfair treatment by the state.",
    distractors:["outcome","component","framework","alternative"] },

  { word:"individual", level:"master", q_number:2,
    passage:"While group work has benefits, ___ accountability is also important in education.",
    distractors:["appropriate","relevant","sufficient","primary"] },

  // ─── INTERPRET ────────────────────────────────────────────────────────────
  { word:"interpret", level:"learn", q_number:1,
    passage:"Different people may ___ the same poem in very different ways.",
    distractors:["create","require","proceed","legislate"] },

  { word:"interpret", level:"learn", q_number:2,
    passage:"Archaeologists ___ ancient drawings to learn about early human life.",
    distractors:["create","require","define","respond"] },

  { word:"interpret", level:"proficient", q_number:1,
    passage:"It can be difficult to ___ statistics without access to the full context.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"interpret", level:"proficient", q_number:2,
    passage:"The lawyer asked the court to ___ the contract clause in favour of her client.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"interpret", level:"master", q_number:1,
    passage:"Because ancient scripts can be ambiguous, scholars often ___ the same inscription in completely different ways.",
    distractors:["achieve","conduct","evaluate","justify"] },

  { word:"interpret", level:"master", q_number:2,
    passage:"If data is inconclusive, researchers may ___ the findings as a success while critics view them as a failure.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── INVOLVE ──────────────────────────────────────────────────────────────
  { word:"involve", level:"learn", q_number:1,
    passage:"The clean-up operation will ___ hundreds of volunteers from across the region.",
    distractors:["create","legislate","proceed","distribute"] },

  { word:"involve", level:"learn", q_number:2,
    passage:"The new course will ___ a mix of written and practical assessments.",
    distractors:["create","require","respond","establish"] },

  { word:"involve", level:"proficient", q_number:1,
    passage:"The internship will ___ working alongside experienced professionals in a real workplace setting.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"involve", level:"proficient", q_number:2,
    passage:"The project will ___ teams from three different departments working together.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"involve", level:"master", q_number:1,
    passage:"Any solution to climate change must ___ both governments and private citizens acting together.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"involve", level:"master", q_number:2,
    passage:"The restructuring plan does not just ___ administrative changes; it fundamentally alters how teams work.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── ISSUE ────────────────────────────────────────────────────────────────
  { word:"issue", level:"learn", q_number:1,
    passage:"Climate change is the most urgent ___ facing the world today.",
    distractors:["formula","period","source","income"] },

  { word:"issue", level:"learn", q_number:2,
    passage:"Access to clean water is a major ___ in many developing countries.",
    distractors:["formula","period","source","labour"] },

  { word:"issue", level:"proficient", q_number:1,
    passage:"Pollution remains a key ___ that both governments and local communities must work together to address.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"issue", level:"proficient", q_number:2,
    passage:"Housing affordability has emerged as a pressing ___ in cities across the developed world.",
    distractors:["outcome","component","scheme","task"] },

  { word:"issue", level:"master", q_number:1,
    passage:"The committee was formed specifically to ___ new guidelines on data privacy.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"issue", level:"master", q_number:2,
    passage:"The report urged policymakers to take action on the ___ of mental health support in schools.",
    distractors:["outcome","scheme","framework","emphasis"] },

  // ─── LABOUR ───────────────────────────────────────────────────────────────
  { word:"labour", level:"learn", q_number:1,
    passage:"Building the pyramids required the ___ of thousands of workers over many decades.",
    distractors:["formula","method","theory","income"] },

  { word:"labour", level:"learn", q_number:2,
    passage:"Harvesting crops by hand requires significant physical ___.",
    distractors:["formula","method","income","period"] },

  { word:"labour", level:"proficient", q_number:1,
    passage:"The industrial revolution replaced much human ___ with machines.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"labour", level:"proficient", q_number:2,
    passage:"Economists analyse how tax incentives and immigration policy affect the global ___ market.",
    distractors:["outcome","scheme","framework","emphasis"] },

  { word:"labour", level:"master", q_number:1,
    passage:"Changes in immigration policy can significantly affect the size and composition of the available ___ force.",
    distractors:["outcome","component","scheme","alternative"] },

  { word:"labour", level:"master", q_number:2,
    passage:"Child ___ laws were introduced to protect young people from dangerous and exploitative working conditions.",
    distractors:["outcome","component","framework","task"] },

  // ─── LEGAL ────────────────────────────────────────────────────────────────
  { word:"legal", level:"learn", q_number:1,
    passage:"It is not ___ to drive a car without a valid licence.",
    distractors:["major","evident","available","significant"] },

  { word:"legal", level:"learn", q_number:2,
    passage:"The company sought ___ advice before signing the contract.",
    distractors:["major","evident","specific","significant"] },

  { word:"legal", level:"proficient", q_number:1,
    passage:"The firm was forced to take ___ action against the competitor for copyright infringement.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"legal", level:"proficient", q_number:2,
    passage:"The organisation operates within a ___ framework designed to protect consumers.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"legal", level:"master", q_number:1,
    passage:"Whether the action constitutes a ___ breach depends on the exact wording of the contract.",
    distractors:["appropriate","relevant","dominant","primary"] },

  { word:"legal", level:"master", q_number:2,
    passage:"The right to a fair trial is a fundamental principle of any ___ system.",
    distractors:["appropriate","relevant","sufficient","technical"] },

  // ─── LEGISLATE ────────────────────────────────────────────────────────────
  { word:"legislate", level:"learn", q_number:1,
    passage:"Parliament will ___ to protect workers from unfair dismissal.",
    distractors:["create","assess","proceed","respond"] },

  { word:"legislate", level:"learn", q_number:2,
    passage:"The government plans to ___ to protect endangered species from hunting.",
    distractors:["create","define","proceed","respond"] },

  { word:"legislate", level:"proficient", q_number:1,
    passage:"Many countries have chosen to ___ against smoking in public buildings.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"legislate", level:"proficient", q_number:2,
    passage:"It is difficult to ___ for every possible situation that might arise.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"legislate", level:"master", q_number:1,
    passage:"Some argue that governments should ___ to limit carbon emissions, while others prefer voluntary targets.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"legislate", level:"master", q_number:2,
    passage:"The power to ___ belongs to parliament, not to the courts or the executive.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── MAJOR ────────────────────────────────────────────────────────────────
  { word:"major", level:"learn", q_number:1,
    passage:"The discovery of penicillin was a ___ breakthrough in the history of medicine.",
    distractors:["legal","evident","available","specific"] },

  { word:"major", level:"learn", q_number:2,
    passage:"Lack of clean water is a ___ problem in many parts of the world.",
    distractors:["legal","evident","available","specific"] },

  { word:"major", level:"proficient", q_number:1,
    passage:"Pollution is one of the ___ causes of declining fish populations in rivers.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"major", level:"proficient", q_number:2,
    passage:"The storm caused ___ disruption to transport across the entire region.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"major", level:"master", q_number:1,
    passage:"The merger represents a ___ shift in the balance of power within the industry.",
    distractors:["appropriate","relevant","dominant","primary"] },

  { word:"major", level:"master", q_number:2,
    passage:"No ___ policy changes will be announced until after the election results are confirmed.",
    distractors:["appropriate","relevant","sufficient","technical"] },

  // ─── METHOD ───────────────────────────────────────────────────────────────
  { word:"method", level:"learn", q_number:1,
    passage:"Using mind maps is a useful ___ for organising your notes.",
    distractors:["formula","period","source","income"] },

  { word:"method", level:"learn", q_number:2,
    passage:"The experimental ___ involves testing a hypothesis through observation.",
    distractors:["formula","period","theory","income"] },

  { word:"method", level:"proficient", q_number:1,
    passage:"Strict adherence to the scientific ___ ensures that experiments can be replicated by other teams.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"method", level:"proficient", q_number:2,
    passage:"The ___ of trial and error is one of the oldest ways humans have learned to solve practical problems.",
    distractors:["outcome","scheme","framework","task"] },

  { word:"method", level:"master", q_number:1,
    passage:"The study was criticised because the research ___ did not account for several key variables.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"method", level:"master", q_number:2,
    passage:"No single ___ is sufficient on its own — effective research combines several complementary approaches.",
    distractors:["outcome","component","scheme","alternative"] },

  // ─── OCCUR ────────────────────────────────────────────────────────────────
  { word:"occur", level:"learn", q_number:1,
    passage:"Earthquakes ___ when tectonic plates beneath the earth's surface shift suddenly.",
    distractors:["create","proceed","legislate","distribute"] },

  { word:"occur", level:"learn", q_number:2,
    passage:"Floods are likely to ___ more frequently due to climate change.",
    distractors:["create","define","legislate","distribute"] },

  { word:"occur", level:"proficient", q_number:1,
    passage:"Chemical reactions ___ when two substances combine under the right conditions.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"occur", level:"proficient", q_number:2,
    passage:"Side effects may ___ when taking this medication — consult your doctor if they do.",
    distractors:["achieve","obtain","evaluate","select"] },

  { word:"occur", level:"master", q_number:1,
    passage:"It did not ___ to the researchers that the control group had been exposed to the variable.",
    distractors:["achieve","conduct","obtain","demonstrate"] },

  { word:"occur", level:"master", q_number:2,
    passage:"Changes in climate are likely to ___ more gradually than scientists first predicted.",
    distractors:["achieve","obtain","evaluate","justify"] },

  // ─── PERCENT ──────────────────────────────────────────────────────────────
  { word:"percent", level:"learn", q_number:1,
    passage:"About 70 ___ of the Earth's surface is covered by water.",
    distractors:["income","formula","labour","period"] },

  { word:"percent", level:"learn", q_number:2,
    passage:"The population grew by 12 ___ over the past decade.",
    distractors:["income","formula","labour","source"] },

  { word:"percent", level:"proficient", q_number:1,
    passage:"Approximately 30 ___ of food produced globally is wasted every year.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"percent", level:"proficient", q_number:2,
    passage:"The report found that 45 ___ of respondents had never used public transport.",
    distractors:["outcome","component","scheme","task"] },

  { word:"percent", level:"master", q_number:1,
    passage:"Inflation rose by just under 3 ___, meaning everyday goods became noticeably more expensive.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"percent", level:"master", q_number:2,
    passage:"Studies show that only 60 ___ of eligible voters participated in the last general election.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── PERIOD ───────────────────────────────────────────────────────────────
  { word:"period", level:"learn", q_number:1,
    passage:"The Renaissance was a ___ of great artistic and scientific progress.",
    distractors:["formula","section","theory","income"] },

  { word:"period", level:"learn", q_number:2,
    passage:"After a long ___ of drought, the rains finally arrived.",
    distractors:["formula","section","theory","source"] },

  { word:"period", level:"proficient", q_number:1,
    passage:"The economy grew rapidly during a ___ of low interest rates.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"period", level:"proficient", q_number:2,
    passage:"Students were given a ___ of two weeks to complete the assignment.",
    distractors:["outcome","component","scheme","task"] },

  { word:"period", level:"master", q_number:1,
    passage:"The treaty was signed after a lengthy ___ of negotiation between the two governments.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"period", level:"master", q_number:2,
    passage:"During the ___ immediately following the crisis, public trust in institutions fell sharply.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── POLICY ───────────────────────────────────────────────────────────────
  { word:"policy", level:"learn", q_number:1,
    passage:"The school has a strict ___ on the use of mobile phones during lessons.",
    distractors:["formula","method","theory","source"] },

  { word:"policy", level:"learn", q_number:2,
    passage:"The airline's ___ states that passengers must check in at least two hours before departure.",
    distractors:["formula","method","theory","period"] },

  { word:"policy", level:"proficient", q_number:1,
    passage:"The government's new immigration ___ has been widely debated in parliament.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"policy", level:"proficient", q_number:2,
    passage:"Environmental groups criticised the energy ___ as too slow to tackle climate change.",
    distractors:["outcome","component","scheme","task"] },

  { word:"policy", level:"master", q_number:1,
    passage:"There is growing evidence that the ___ of austerity failed to deliver long-term economic recovery.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"policy", level:"master", q_number:2,
    passage:"Effective public health ___ requires coordination between government, healthcare providers, and communities.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── PRINCIPLE ────────────────────────────────────────────────────────────
  { word:"principle", level:"learn", q_number:1,
    passage:"The ___ of fairness means that everyone should be treated equally.",
    distractors:["formula","method","period","income"] },

  { word:"principle", level:"learn", q_number:2,
    passage:"Innocent until proven guilty is a key ___ of many legal systems.",
    distractors:["formula","method","period","source"] },

  { word:"principle", level:"proficient", q_number:1,
    passage:"The design was based on the ___ that form should follow function.",
    distractors:["outcome","component","scheme","task"] },

  { word:"principle", level:"proficient", q_number:2,
    passage:"She refused to compromise on her ___ even when it was professionally costly.",
    distractors:["outcome","scheme","framework","emphasis"] },

  { word:"principle", level:"master", q_number:1,
    passage:"The ___ of separation of powers prevents any single branch of government from becoming too dominant.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"principle", level:"master", q_number:2,
    passage:"In ___, the plan sounds reasonable, but its implementation would face significant practical obstacles.",
    distractors:["outcome","component","scheme","alternative"] },

  // ─── PROCEED ──────────────────────────────────────────────────────────────
  { word:"proceed", level:"learn", q_number:1,
    passage:"Once the safety checks are complete, the team can ___ with the experiment.",
    distractors:["create","assess","legislate","distribute"] },

  { word:"proceed", level:"learn", q_number:2,
    passage:"Despite the bad weather, the rescue team decided to ___ with the mission.",
    distractors:["create","define","legislate","distribute"] },

  { word:"proceed", level:"proficient", q_number:1,
    passage:"The judge instructed the lawyers to ___ with their opening statements.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"proceed", level:"proficient", q_number:2,
    passage:"It was agreed that construction would ___ as planned, despite local objections.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"proceed", level:"master", q_number:1,
    passage:"Before we ___ any further, we need to establish whether the data is reliable.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"proceed", level:"master", q_number:2,
    passage:"The government indicated it would ___ with the legislation regardless of public opposition.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── PROCESS ──────────────────────────────────────────────────────────────
  { word:"process", level:"learn", q_number:1,
    passage:"Photosynthesis is the ___ by which plants make food from sunlight.",
    distractors:["formula","period","income","theory"] },

  { word:"process", level:"learn", q_number:2,
    passage:"Applying for a visa can be a lengthy ___.",
    distractors:["formula","period","income","source"] },

  { word:"process", level:"proficient", q_number:1,
    passage:"Digestion is the ___ by which the body breaks down food into nutrients.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"process", level:"proficient", q_number:2,
    passage:"Writing a good essay requires a careful ___ of planning, drafting, and revising.",
    distractors:["outcome","component","scheme","task"] },

  { word:"process", level:"master", q_number:1,
    passage:"Democracy is not just an outcome but a ___ — it depends on ongoing debate and participation.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"process", level:"master", q_number:2,
    passage:"The factory uses automated machinery to ___ raw materials into finished goods.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  // ─── REQUIRE ──────────────────────────────────────────────────────────────
  { word:"require", level:"learn", q_number:1,
    passage:"This exercise will ___ concentration and careful reading.",
    distractors:["create","proceed","legislate","distribute"] },

  { word:"require", level:"learn", q_number:2,
    passage:"Growing tomatoes successfully does not ___ much space.",
    distractors:["create","proceed","define","distribute"] },

  { word:"require", level:"proficient", q_number:1,
    passage:"The qualification will ___ candidates to pass both a written and a practical test.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"require", level:"proficient", q_number:2,
    passage:"The rules ___ all visitors to show identification before entering the building.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"require", level:"master", q_number:1,
    passage:"The regulations ___ all food manufacturers to list ingredients clearly on the packaging.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"require", level:"master", q_number:2,
    passage:"Solving this problem will ___ a fundamentally different approach from the one we have used before.",
    distractors:["achieve","obtain","evaluate","conduct"] },

  // ─── RESEARCH ─────────────────────────────────────────────────────────────
  { word:"research", level:"learn", q_number:1,
    passage:"Scientists carry out ___ for many years before publishing their results.",
    distractors:["formula","method","income","period"] },

  { word:"research", level:"learn", q_number:2,
    passage:"Years of ___ led to the development of the first effective polio vaccine.",
    distractors:["formula","method","labour","period"] },

  { word:"research", level:"proficient", q_number:1,
    passage:"The university received funding to ___ the long-term effects of social media on teenagers.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"research", level:"proficient", q_number:2,
    passage:"The ___ suggests a strong connection between poverty and poor health outcomes.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"research", level:"master", q_number:1,
    passage:"Before writing the essay, students are advised to ___ the topic thoroughly using credible sources.",
    distractors:["achieve","conduct","obtain","evaluate"] },

  { word:"research", level:"master", q_number:2,
    passage:"Peer-reviewed ___ is considered more reliable than findings published without independent checking.",
    distractors:["outcome","component","scheme","emphasis"] },

  // ─── RESPOND ──────────────────────────────────────────────────────────────
  { word:"respond", level:"learn", q_number:1,
    passage:"The firefighters were quick to ___ when the alarm was raised.",
    distractors:["create","define","legislate","distribute"] },

  { word:"respond", level:"learn", q_number:2,
    passage:"Pupils are expected to ___ to questions in full sentences.",
    distractors:["create","define","proceed","distribute"] },

  { word:"respond", level:"proficient", q_number:1,
    passage:"The government was criticised for failing to ___ quickly enough to the flooding disaster.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"respond", level:"proficient", q_number:2,
    passage:"Plants ___ to sunlight by growing towards the source of light.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"respond", level:"master", q_number:1,
    passage:"The way a country chooses to ___ to an economic crisis depends largely on the tools at its disposal.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"respond", level:"master", q_number:2,
    passage:"Teachers must be trained to ___ sensitively to students who disclose personal difficulties.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

  // ─── ROLE ─────────────────────────────────────────────────────────────────
  { word:"role", level:"learn", q_number:1,
    passage:"Teachers play a vital ___ in a child's development.",
    distractors:["formula","method","period","source"] },

  { word:"role", level:"learn", q_number:2,
    passage:"Bees play a crucial ___ in pollinating plants and crops.",
    distractors:["formula","method","income","source"] },

  { word:"role", level:"proficient", q_number:1,
    passage:"The ___ of the media in shaping public opinion is widely debated.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"role", level:"proficient", q_number:2,
    passage:"Each member of the team has a clearly defined ___ and set of responsibilities.",
    distractors:["outcome","component","scheme","task"] },

  { word:"role", level:"master", q_number:1,
    passage:"The ___ of the state in regulating the economy has expanded significantly in recent decades.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"role", level:"master", q_number:2,
    passage:"Culture plays a significant ___ in determining how individuals interpret and respond to illness.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── SECTION ──────────────────────────────────────────────────────────────
  { word:"section", level:"learn", q_number:1,
    passage:"The final ___ of the exam tests reading comprehension.",
    distractors:["formula","period","income","theory"] },

  { word:"section", level:"learn", q_number:2,
    passage:"The biology ___ of the paper includes questions on cells and genetics.",
    distractors:["formula","period","income","source"] },

  { word:"section", level:"proficient", q_number:1,
    passage:"The middle ___ of the article presents both sides of the argument.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"section", level:"proficient", q_number:2,
    passage:"A dedicated ___ of the library is reserved for reference books.",
    distractors:["outcome","component","scheme","task"] },

  { word:"section", level:"master", q_number:1,
    passage:"Each ___ of the report addresses a different aspect of the problem.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"section", level:"master", q_number:2,
    passage:"The legislation contains a ___ that explicitly prohibits discrimination on the grounds of age.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── SECTOR ───────────────────────────────────────────────────────────────
  { word:"sector", level:"learn", q_number:1,
    passage:"The technology ___ has grown rapidly over the past two decades.",
    distractors:["formula","period","income","theory"] },

  { word:"sector", level:"learn", q_number:2,
    passage:"The private ___ includes all businesses not owned by the government.",
    distractors:["formula","period","income","source"] },

  { word:"sector", level:"proficient", q_number:1,
    passage:"Investment in the education ___ has risen significantly in recent years.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"sector", level:"proficient", q_number:2,
    passage:"Workers in the public ___ are employed by the government rather than private companies.",
    distractors:["outcome","component","scheme","task"] },

  { word:"sector", level:"master", q_number:1,
    passage:"The financial ___ plays a central role in allocating capital across the economy.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"sector", level:"master", q_number:2,
    passage:"Governments often struggle to regulate a rapidly evolving ___ like digital technology.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── SIGNIFICANT ──────────────────────────────────────────────────────────
  { word:"significant", level:"learn", q_number:1,
    passage:"The invention of the printing press was a ___ moment in history.",
    distractors:["legal","evident","available","specific"] },

  { word:"significant", level:"learn", q_number:2,
    passage:"There has been a ___ increase in the number of students studying science.",
    distractors:["legal","evident","available","specific"] },

  { word:"significant", level:"proficient", q_number:1,
    passage:"The new treatment led to a ___ improvement in patients' conditions.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"significant", level:"proficient", q_number:2,
    passage:"There is a ___ difference between knowing a fact and truly understanding it.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"significant", level:"master", q_number:1,
    passage:"The results were not statistically ___, meaning the differences could have occurred by chance.",
    distractors:["appropriate","relevant","dominant","primary"] },

  { word:"significant", level:"master", q_number:2,
    passage:"Researchers noted a ___ correlation between social isolation and declining mental health.",
    distractors:["appropriate","relevant","sufficient","constant"] },

  // ─── SIMILAR ──────────────────────────────────────────────────────────────
  { word:"similar", level:"learn", q_number:1,
    passage:"The two experiments produced ___ results, which supported the original theory.",
    distractors:["legal","evident","major","available"] },

  { word:"similar", level:"learn", q_number:2,
    passage:"The two cities have ___ populations but very different cultures.",
    distractors:["legal","evident","major","specific"] },

  { word:"similar", level:"proficient", q_number:1,
    passage:"A ___ pattern of behaviour has been observed in several different species.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"similar", level:"proficient", q_number:2,
    passage:"The findings were ___ to those reported in earlier studies on the same topic.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"similar", level:"master", q_number:1,
    passage:"While the two approaches share ___ goals, they differ significantly in method.",
    distractors:["appropriate","relevant","dominant","primary"] },

  { word:"similar", level:"master", q_number:2,
    passage:"Critics argue that the new policy is simply a ___ version of the one it replaced.",
    distractors:["appropriate","relevant","sufficient","technical"] },

  // ─── SOURCE ───────────────────────────────────────────────────────────────
  { word:"source", level:"learn", q_number:1,
    passage:"The sun is the main ___ of energy for all life on Earth.",
    distractors:["formula","period","income","theory"] },

  { word:"source", level:"learn", q_number:2,
    passage:"Students must reference their ___ when writing academic essays.",
    distractors:["formula","method","income","theory"] },

  { word:"source", level:"proficient", q_number:1,
    passage:"Wind is a clean, renewable ___ of electricity that produces no pollution.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"source", level:"proficient", q_number:2,
    passage:"The journalist refused to reveal the ___ of the leaked documents.",
    distractors:["outcome","component","scheme","task"] },

  { word:"source", level:"master", q_number:1,
    passage:"Eyewitness accounts are a valuable ___ for historians but must be treated with caution.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"source", level:"master", q_number:2,
    passage:"The government is attempting to diversify its energy ___ to reduce dependence on fossil fuels.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── SPECIFIC ─────────────────────────────────────────────────────────────
  { word:"specific", level:"learn", q_number:1,
    passage:"Please give ___ examples to support your argument.",
    distractors:["legal","evident","major","available"] },

  { word:"specific", level:"learn", q_number:2,
    passage:"The instructions were very ___ about the order in which to complete each step.",
    distractors:["legal","evident","major","significant"] },

  { word:"specific", level:"proficient", q_number:1,
    passage:"The funding is for a ___ purpose and cannot be used for general expenses.",
    distractors:["appropriate","relevant","sufficient","dominant"] },

  { word:"specific", level:"proficient", q_number:2,
    passage:"Each patient receives a treatment plan tailored to their ___ medical needs.",
    distractors:["appropriate","relevant","sufficient","initial"] },

  { word:"specific", level:"master", q_number:1,
    passage:"The regulation applies only in ___ circumstances defined by the law.",
    distractors:["appropriate","relevant","dominant","primary"] },

  { word:"specific", level:"master", q_number:2,
    passage:"When writing a report, it is important to be ___ rather than relying on vague generalisations.",
    distractors:["appropriate","relevant","sufficient","technical"] },

  // ─── STRUCTURE ────────────────────────────────────────────────────────────
  { word:"structure", level:"learn", q_number:1,
    passage:"A good essay needs a clear ___ with an introduction, body, and conclusion.",
    distractors:["formula","period","income","theory"] },

  { word:"structure", level:"learn", q_number:2,
    passage:"The ___ of the company changed significantly after the merger.",
    distractors:["formula","period","method","theory"] },

  { word:"structure", level:"proficient", q_number:1,
    passage:"The ___ of a language includes its grammar, vocabulary, and pronunciation patterns.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"structure", level:"proficient", q_number:2,
    passage:"Architects must design a ___ that is both functional and safe.",
    distractors:["outcome","component","scheme","task"] },

  { word:"structure", level:"master", q_number:1,
    passage:"The social ___ of a community determines who has access to power and resources.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"structure", level:"master", q_number:2,
    passage:"Without a clear ___, a long piece of writing can feel disorganised and difficult to follow.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── THEORY ───────────────────────────────────────────────────────────────
  { word:"theory", level:"learn", q_number:1,
    passage:"Darwin's ___ of evolution changed how we understand life on Earth.",
    distractors:["formula","period","income","source"] },

  { word:"theory", level:"learn", q_number:2,
    passage:"Einstein's ___ of relativity transformed our understanding of space and time.",
    distractors:["formula","period","income","method"] },

  { word:"theory", level:"proficient", q_number:1,
    passage:"The scientist proposed a new ___ to explain the rapid spread of the disease.",
    distractors:["outcome","component","scheme","framework"] },

  { word:"theory", level:"proficient", q_number:2,
    passage:"In ___, the plan makes sense, but putting it into practice may prove very difficult.",
    distractors:["outcome","component","scheme","task"] },

  { word:"theory", level:"master", q_number:1,
    passage:"A scientific ___ is not a guess — it is an explanation supported by substantial evidence.",
    distractors:["outcome","component","scheme","emphasis"] },

  { word:"theory", level:"master", q_number:2,
    passage:"The ___ of cognitive development proposed by Piaget has influenced education for decades.",
    distractors:["outcome","component","framework","alternative"] },

  // ─── VARY ─────────────────────────────────────────────────────────────────
  { word:"vary", level:"learn", q_number:1,
    passage:"Temperatures ___ greatly between summer and winter in this region.",
    distractors:["create","proceed","legislate","distribute"] },

  { word:"vary", level:"learn", q_number:2,
    passage:"The price of vegetables can ___ depending on the season.",
    distractors:["create","define","legislate","distribute"] },

  { word:"vary", level:"proficient", q_number:1,
    passage:"Reading speeds ___ considerably among students of the same age.",
    distractors:["achieve","conduct","obtain","restrict"] },

  { word:"vary", level:"proficient", q_number:2,
    passage:"Results ___ widely across different regions, making it hard to draw general conclusions.",
    distractors:["achieve","conduct","evaluate","select"] },

  { word:"vary", level:"master", q_number:1,
    passage:"The effectiveness of the treatment was found to ___ significantly depending on the patient's age and overall health.",
    distractors:["achieve","conduct","obtain","justify"] },

  { word:"vary", level:"master", q_number:2,
    passage:"Cultural attitudes towards education ___ enormously from one society to another.",
    distractors:["achieve","obtain","evaluate","demonstrate"] },

];
