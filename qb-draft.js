// QB DRAFT — 360 questions (6 per word × 60 words)
// Format: { word, level ("learn"|"proficient"|"master"), q_number (1|2), passage, distractors[] }
// Correct answer is always the word itself (q.word).
// Distractors: 4–6 same-POS AWL Sublist 1 words, pre-validated against each passage.

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
    distractors:["define","assess","identify","indicate"] },

  { word:"analyse", level:"proficient", q_number:2,
    passage:"The detective decided to ___ the evidence systematically before drawing conclusions.",
    distractors:["assess","define","interpret","estimate"] },

  { word:"analyse", level:"master", q_number:1,
    passage:"A good essay does not simply describe events — it ___ the causes and implications behind them.",
    distractors:["interpret","assess","define","evaluate"] },

  { word:"analyse", level:"master", q_number:2,
    passage:"The team was asked to ___ the data in detail rather than just summarise the overall trend.",
    distractors:["assess","interpret","process","define"] },

  // ─── APPROACH ─────────────────────────────────────────────────────────────
  { word:"approach", level:"learn", q_number:1,
    passage:"The school uses a creative ___ to teaching maths — students learn through games.",
    distractors:["formula","period","income","labour"] },

  { word:"approach", level:"learn", q_number:2,
    passage:"There is more than one ___ to solving this problem.",
    distractors:["formula","section","factor","percent"] },

  { word:"approach", level:"proficient", q_number:1,
    passage:"The therapist's ___ was to listen carefully before offering any advice.",
    distractors:["method","policy","process","role"] },

  { word:"approach", level:"proficient", q_number:2,
    passage:"The company adopted a cautious ___ to entering the new market.",
    distractors:["method","policy","process","structure"] },

  { word:"approach", level:"master", q_number:1,
    passage:"Rather than following a rigid formula, she preferred a flexible ___ that responded to each student's individual needs.",
    distractors:["method","process","policy","structure"] },

  { word:"approach", level:"master", q_number:2,
    passage:"The two researchers disagreed on the best ___ — one favoured experimentation, the other preferred observation.",
    distractors:["method","process","formula","theory"] },

  // ─── AREA ─────────────────────────────────────────────────────────────────
  { word:"area", level:"learn", q_number:1,
    passage:"Maths is an ___ that many students find challenging at first.",
    distractors:["issue","period","role","income"] },

  { word:"area", level:"learn", q_number:2,
    passage:"The doctor specialised in the ___ of children's mental health.",
    distractors:["period","section","labour","formula"] },

  { word:"area", level:"proficient", q_number:1,
    passage:"Cybersecurity has become a growing ___ of concern for governments and businesses worldwide.",
    distractors:["issue","sector","source","factor"] },

  { word:"area", level:"proficient", q_number:2,
    passage:"The researchers focused their study on the ___ of renewable energy storage.",
    distractors:["issue","sector","concept","field"] },

  { word:"area", level:"master", q_number:1,
    passage:"Leadership is an ___ of management where theory and practice often fail to align.",
    distractors:["issue","sector","role","aspect"] },

  { word:"area", level:"master", q_number:2,
    passage:"The report identified three key ___ where policy reform was most urgently needed.",
    distractors:["issues","sectors","factors","aspects"] },

  // ─── ASSESS ───────────────────────────────────────────────────────────────
  { word:"assess", level:"learn", q_number:1,
    passage:"The doctor needs to ___ the patient before deciding on a course of treatment.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"assess", level:"learn", q_number:2,
    passage:"Teachers regularly ___ students to check how much they have learned.",
    distractors:["create","distribute","require","respond"] },

  { word:"assess", level:"proficient", q_number:1,
    passage:"Before investing, it is important to ___ the risks involved carefully.",
    distractors:["identify","define","estimate","analyse"] },

  { word:"assess", level:"proficient", q_number:2,
    passage:"The committee was asked to ___ the impact of the new policy on local communities.",
    distractors:["analyse","estimate","identify","define"] },

  { word:"assess", level:"master", q_number:1,
    passage:"Engineers must ___ the structural integrity of a bridge before it can be opened to traffic.",
    distractors:["analyse","estimate","establish","identify"] },

  { word:"assess", level:"master", q_number:2,
    passage:"Rather than simply describing the problem, the report attempts to ___ its severity and propose solutions.",
    distractors:["analyse","define","identify","interpret"] },

  // ─── ASSUME ───────────────────────────────────────────────────────────────
  { word:"assume", level:"learn", q_number:1,
    passage:"Do not ___ that all spiders are dangerous — most are completely harmless.",
    distractors:["create","require","respond","proceed"] },

  { word:"assume", level:"learn", q_number:2,
    passage:"It is unfair to ___ someone is guilty just because they look nervous.",
    distractors:["require","indicate","respond","establish"] },

  { word:"assume", level:"proficient", q_number:1,
    passage:"Many people ___ that expensive products are always of better quality.",
    distractors:["indicate","define","estimate","identify"] },

  { word:"assume", level:"proficient", q_number:2,
    passage:"Scientists cannot ___ that results from laboratory tests will always apply in the real world.",
    distractors:["indicate","establish","define","estimate"] },

  { word:"assume", level:"master", q_number:1,
    passage:"The writer appears to ___ that the reader already understands the historical context, which is not always the case.",
    distractors:["indicate","establish","define","identify"] },

  { word:"assume", level:"master", q_number:2,
    passage:"Without verifying the source, the journalist ___ that the information was reliable.",
    distractors:["indicated","established","decided","estimated"] },

  // ─── AUTHORITY ────────────────────────────────────────────────────────────
  { word:"authority", level:"learn", q_number:1,
    passage:"The police have the ___ to stop vehicles and check documents.",
    distractors:["method","role","income","factor"] },

  { word:"authority", level:"learn", q_number:2,
    passage:"The school has the ___ to set its own rules about behaviour and uniform.",
    distractors:["role","income","formula","labour"] },

  { word:"authority", level:"proficient", q_number:1,
    passage:"In most legal systems, higher courts have the ___ to overturn decisions made by lower courts.",
    distractors:["role","policy","function","principle"] },

  { word:"authority", level:"proficient", q_number:2,
    passage:"The committee was given full ___ to investigate the allegations and make recommendations.",
    distractors:["role","function","policy","principle"] },

  { word:"authority", level:"master", q_number:1,
    passage:"The new legislation significantly extends the ___ of the regulator to include digital platforms.",
    distractors:["role","function","policy","structure"] },

  { word:"authority", level:"master", q_number:2,
    passage:"Under a federal system, not all decision-making ___ rests with the central government.",
    distractors:["role","function","policy","responsibility"] },

  // ─── AVAILABLE ────────────────────────────────────────────────────────────
  { word:"available", level:"learn", q_number:1,
    passage:"Clean drinking water is not always ___ in remote or dry regions.",
    distractors:["legal","major","evident","significant"] },

  { word:"available", level:"learn", q_number:2,
    passage:"Tickets for the concert are ___ from the box office.",
    distractors:["legal","major","specific","similar"] },

  { word:"available", level:"proficient", q_number:1,
    passage:"Grants are ___ to students who cannot afford university fees.",
    distractors:["legal","significant","evident","specific"] },

  { word:"available", level:"proficient", q_number:2,
    passage:"The medicine is now ___ without a prescription at most pharmacies.",
    distractors:["legal","evident","significant","specific"] },

  { word:"available", level:"master", q_number:1,
    passage:"Public information about government spending should be freely ___ to all citizens.",
    distractors:["accessible","evident","legal","significant"] },

  { word:"available", level:"master", q_number:2,
    passage:"When resources are limited, schools must decide how to make them equally ___ to all students.",
    distractors:["accessible","evident","legal","specific"] },

  // ─── BENEFIT ──────────────────────────────────────────────────────────────
  { word:"benefit", level:"learn", q_number:1,
    passage:"One ___ of regular exercise is that it improves your mood.",
    distractors:["issue","factor","method","role"] },

  { word:"benefit", level:"learn", q_number:2,
    passage:"The main ___ of living near a school is that children can walk there safely.",
    distractors:["issue","factor","role","formula"] },

  { word:"benefit", level:"proficient", q_number:1,
    passage:"A key ___ of learning a second language is improved problem-solving ability.",
    distractors:["feature","advantage","result","factor"] },

  { word:"benefit", level:"proficient", q_number:2,
    passage:"The ___ of solar energy is that it reduces electricity bills over time.",
    distractors:["function","role","factor","purpose"] },

  { word:"benefit", level:"master", q_number:1,
    passage:"The scheme was designed so that all members of the community could ___ equally from the investment.",
    distractors:["gain","profit","derive","proceed"] },

  { word:"benefit", level:"master", q_number:2,
    passage:"It remains unclear whether stricter regulations would ___ consumers or simply increase costs.",
    distractors:["assist","support","advance","favour"] },

  // ─── CONCEPT ──────────────────────────────────────────────────────────────
  { word:"concept", level:"learn", q_number:1,
    passage:"Democracy is a ___ that means people have a say in how their country is run.",
    distractors:["issue","period","source","income"] },

  { word:"concept", level:"learn", q_number:2,
    passage:"The ___ of gravity explains why objects fall towards the ground.",
    distractors:["issue","period","source","formula"] },

  { word:"concept", level:"proficient", q_number:1,
    passage:"The ___ of supply and demand explains how the price of goods changes in a market.",
    distractors:["theory","principle","issue","idea"] },

  { word:"concept", level:"proficient", q_number:2,
    passage:"Infinity is a mathematical ___ that is difficult to visualise.",
    distractors:["theory","formula","principle","idea"] },

  { word:"concept", level:"master", q_number:1,
    passage:"The ___ of citizenship goes beyond simply holding a passport — it involves rights and responsibilities.",
    distractors:["idea","theory","principle","notion"] },

  { word:"concept", level:"master", q_number:2,
    passage:"Students often struggle with abstract ___s like justice or liberty because they cannot be observed directly.",
    distractors:["ideas","theories","principles","issues"] },

  // ─── CONSIST ──────────────────────────────────────────────────────────────
  { word:"consist", level:"learn", q_number:1,
    passage:"A healthy meal should ___ of vegetables, protein, and carbohydrates.",
    distractors:["create","define","proceed","respond"] },

  { word:"consist", level:"learn", q_number:2,
    passage:"The team will ___ of twelve players selected from the whole school.",
    distractors:["create","require","proceed","vary"] },

  { word:"consist", level:"proficient", q_number:1,
    passage:"The examination will ___ of three sections — reading, writing, and listening.",
    distractors:["comprise","involve","contain","include"] },

  { word:"consist", level:"proficient", q_number:2,
    passage:"The course ___ of eight modules, each lasting two weeks.",
    distractors:["involves","contains","comprises","requires"] },

  { word:"consist", level:"master", q_number:1,
    passage:"A democracy does not ___ solely of elections — it also requires free speech and an independent press.",
    distractors:["involve","comprise","depend","function"] },

  { word:"consist", level:"master", q_number:2,
    passage:"The panel will ___ of experts drawn from both the private and public sectors.",
    distractors:["involve","comprise","include","contain"] },

  // ─── CONSTITUTE ───────────────────────────────────────────────────────────
  { word:"constitute", level:"learn", q_number:1,
    passage:"Young people ___ more than half of the country's total population.",
    distractors:["create","define","proceed","respond"] },

  { word:"constitute", level:"learn", q_number:2,
    passage:"Women ___ the majority of students enrolled in nursing programmes.",
    distractors:["create","require","establish","vary"] },

  { word:"constitute", level:"proficient", q_number:1,
    passage:"Volunteers ___ the backbone of many charitable organisations around the world.",
    distractors:["form","represent","comprise","involve"] },

  { word:"constitute", level:"proficient", q_number:2,
    passage:"Imports from Asia ___ a large proportion of the country's total trade.",
    distractors:["represent","form","comprise","involve"] },

  { word:"constitute", level:"master", q_number:1,
    passage:"Refusing to provide information when legally required to do so may ___ a criminal offence.",
    distractors:["represent","form","create","establish"] },

  { word:"constitute", level:"master", q_number:2,
    passage:"Together, these three principles ___ the foundation of the organisation's ethical framework.",
    distractors:["represent","form","create","establish"] },

  // ─── CONTEXT ──────────────────────────────────────────────────────────────
  { word:"context", level:"learn", q_number:1,
    passage:"You can often guess the meaning of a new word by reading the ___ around it.",
    distractors:["formula","period","income","labour"] },

  { word:"context", level:"learn", q_number:2,
    passage:"Without knowing the ___, it is hard to understand why the character made that choice.",
    distractors:["formula","period","income","source"] },

  { word:"context", level:"proficient", q_number:1,
    passage:"Slang words may be acceptable in an informal ___ but are inappropriate in academic writing.",
    distractors:["setting","situation","environment","sector"] },

  { word:"context", level:"proficient", q_number:2,
    passage:"The poem was written during wartime, and understanding that ___ helps explain its tone.",
    distractors:["setting","period","environment","structure"] },

  { word:"context", level:"master", q_number:1,
    passage:"Words can have very different meanings depending on the ___ in which they are used.",
    distractors:["setting","situation","environment","structure"] },

  { word:"context", level:"master", q_number:2,
    passage:"To evaluate a historical event fairly, we must interpret it within its own ___ rather than judging it by today's standards.",
    distractors:["setting","period","framework","environment"] },

  // ─── CONTRACT ─────────────────────────────────────────────────────────────
  { word:"contract", level:"learn", q_number:1,
    passage:"The footballer signed a two-year ___ with the new club.",
    distractors:["formula","policy","theory","period"] },

  { word:"contract", level:"learn", q_number:2,
    passage:"Always read a ___ carefully before you sign it.",
    distractors:["formula","policy","period","source"] },

  { word:"contract", level:"proficient", q_number:1,
    passage:"The company was awarded a ___ to build the new motorway.",
    distractors:["formula","policy","agreement","structure"] },

  { word:"contract", level:"proficient", q_number:2,
    passage:"Metals tend to ___ when cooled and expand when heated.",
    distractors:["vary","decrease","shrink","reduce"] },

  { word:"contract", level:"master", q_number:1,
    passage:"Breaking the terms of a ___ can result in serious legal consequences.",
    distractors:["agreement","policy","principle","formula"] },

  { word:"contract", level:"master", q_number:2,
    passage:"As the economy slowed, consumer spending began to ___ sharply.",
    distractors:["vary","decrease","reduce","decline"] },

  // ─── CREATE ───────────────────────────────────────────────────────────────
  { word:"create", level:"learn", q_number:1,
    passage:"Artists ___ works that express human feelings and experiences.",
    distractors:["assess","assume","derive","respond"] },

  { word:"create", level:"learn", q_number:2,
    passage:"New jobs can be ___ when governments invest in green energy.",
    distractors:["assessed","assumed","derived","distributed"] },

  { word:"create", level:"proficient", q_number:1,
    passage:"The designer was hired to ___ a new logo that better reflected the company's values.",
    distractors:["develop","produce","establish","build"] },

  { word:"create", level:"proficient", q_number:2,
    passage:"Poor urban planning can ___ serious problems such as traffic congestion and pollution.",
    distractors:["cause","produce","establish","generate"] },

  { word:"create", level:"master", q_number:1,
    passage:"The programme aims to ___ opportunities for young people from disadvantaged backgrounds.",
    distractors:["develop","provide","establish","generate"] },

  { word:"create", level:"master", q_number:2,
    passage:"By removing trade barriers, the agreement sought to ___ a single unified market.",
    distractors:["develop","establish","produce","form"] },

  // ─── DATA ─────────────────────────────────────────────────────────────────
  { word:"data", level:"learn", q_number:1,
    passage:"Scientists collect ___ over many years before they publish their results.",
    distractors:["labour","formula","income","policy"] },

  { word:"data", level:"learn", q_number:2,
    passage:"Without reliable ___, scientists cannot make accurate predictions.",
    distractors:["labour","formula","income","period"] },

  { word:"data", level:"proficient", q_number:1,
    passage:"The survey collected ___ from over 1,000 households across five different cities.",
    distractors:["information","evidence","statistics","research"] },

  { word:"data", level:"proficient", q_number:2,
    passage:"The ___ showed a clear link between screen time and sleep problems in teenagers.",
    distractors:["research","evidence","statistics","results"] },

  { word:"data", level:"master", q_number:1,
    passage:"Raw ___ is of limited use until it has been sorted, cleaned, and interpreted.",
    distractors:["information","evidence","statistics","research"] },

  { word:"data", level:"master", q_number:2,
    passage:"Privacy laws restrict how companies can store and use personal ___ collected from users.",
    distractors:["information","evidence","records","statistics"] },

  // ─── DEFINE ───────────────────────────────────────────────────────────────
  { word:"define", level:"learn", q_number:1,
    passage:"A dictionary is used to ___ the meaning of words.",
    distractors:["create","require","respond","proceed"] },

  { word:"define", level:"learn", q_number:2,
    passage:"Can you ___ what you mean by a 'healthy lifestyle'?",
    distractors:["respond","create","require","vary"] },

  { word:"define", level:"proficient", q_number:1,
    passage:"It is important to clearly ___ key terms at the start of any essay.",
    distractors:["explain","describe","identify","interpret"] },

  { word:"define", level:"proficient", q_number:2,
    passage:"The report fails to ___ what it means by 'sustainable development'.",
    distractors:["explain","describe","identify","clarify"] },

  { word:"define", level:"master", q_number:1,
    passage:"Different disciplines ___ the concept of 'culture' in quite different ways.",
    distractors:["interpret","describe","explain","establish"] },

  { word:"define", level:"master", q_number:2,
    passage:"It is difficult to ___ success precisely because it means something different to each individual.",
    distractors:["interpret","describe","measure","establish"] },

  // ─── DERIVE ───────────────────────────────────────────────────────────────
  { word:"derive", level:"learn", q_number:1,
    passage:"Many English words ___ from Latin or Greek roots.",
    distractors:["create","require","proceed","respond"] },

  { word:"derive", level:"learn", q_number:2,
    passage:"Aspirin was originally ___ from the bark of willow trees.",
    distractors:["created","required","established","distributed"] },

  { word:"derive", level:"proficient", q_number:1,
    passage:"Students can ___ great satisfaction from completing a challenging task.",
    distractors:["gain","obtain","achieve","extract"] },

  { word:"derive", level:"proficient", q_number:2,
    passage:"Researchers hope to ___ a new medicine from naturally occurring plant chemicals.",
    distractors:["obtain","extract","develop","identify"] },

  { word:"derive", level:"master", q_number:1,
    passage:"The authority of a democratic government is said to ___ from the consent of the people.",
    distractors:["originate","come","obtain","result"] },

  { word:"derive", level:"master", q_number:2,
    passage:"Much of the theory ___ from earlier work carried out in the 1970s.",
    distractors:["originates","results","develops","comes"] },

  // ─── DISTRIBUTE ───────────────────────────────────────────────────────────
  { word:"distribute", level:"learn", q_number:1,
    passage:"The charity plans to ___ food parcels to families in need.",
    distractors:["create","assess","legislate","proceed"] },

  { word:"distribute", level:"learn", q_number:2,
    passage:"Volunteers will ___ leaflets to every household in the area.",
    distractors:["create","require","respond","establish"] },

  { word:"distribute", level:"proficient", q_number:1,
    passage:"The profits were ___ equally among all the shareholders.",
    distractors:["shared","divided","allocated","spread"] },

  { word:"distribute", level:"proficient", q_number:2,
    passage:"The organisation aims to ___ resources more fairly between wealthy and poorer regions.",
    distractors:["allocate","share","divide","spread"] },

  { word:"distribute", level:"master", q_number:1,
    passage:"Governments must decide how to ___ public funds across education, health, and infrastructure.",
    distractors:["allocate","divide","assign","spread"] },

  { word:"distribute", level:"master", q_number:2,
    passage:"The way wealth is ___ across society has a significant impact on levels of inequality.",
    distractors:["allocated","divided","shared","spread"] },

  // ─── ECONOMY ──────────────────────────────────────────────────────────────
  { word:"economy", level:"learn", q_number:1,
    passage:"Tourism plays a vital role in the country's ___.",
    distractors:["formula","method","labour","section"] },

  { word:"economy", level:"learn", q_number:2,
    passage:"A fall in oil prices had a severe impact on the country's ___.",
    distractors:["formula","method","section","theory"] },

  { word:"economy", level:"proficient", q_number:1,
    passage:"The government introduced tax cuts to stimulate the ___.",
    distractors:["market","sector","system","industry"] },

  { word:"economy", level:"proficient", q_number:2,
    passage:"A growing ___ usually leads to more jobs and higher wages.",
    distractors:["market","sector","industry","system"] },

  { word:"economy", level:"master", q_number:1,
    passage:"An ___ based primarily on manufacturing is more vulnerable to global price shocks than a service-based one.",
    distractors:["market","sector","industry","system"] },

  { word:"economy", level:"master", q_number:2,
    passage:"Economists disagree about the best policies for managing a developing ___.",
    distractors:["market","sector","industry","system"] },

  // ─── ENVIRONMENT ──────────────────────────────────────────────────────────
  { word:"environment", level:"learn", q_number:1,
    passage:"Plastic waste is one of the biggest threats to the natural ___.",
    distractors:["formula","method","theory","period"] },

  { word:"environment", level:"learn", q_number:2,
    passage:"Cutting down rainforests destroys the ___ that many species depend on.",
    distractors:["formula","method","source","period"] },

  { word:"environment", level:"proficient", q_number:1,
    passage:"Oil spills cause serious damage to the marine ___.",
    distractors:["habitat","ecosystem","setting","surroundings"] },

  { word:"environment", level:"proficient", q_number:2,
    passage:"A supportive classroom ___ helps students feel confident and willing to take risks.",
    distractors:["setting","atmosphere","context","structure"] },

  { word:"environment", level:"master", q_number:1,
    passage:"Businesses have a responsibility to minimise the impact of their operations on the ___.",
    distractors:["ecosystem","habitat","surroundings","setting"] },

  { word:"environment", level:"master", q_number:2,
    passage:"Research suggests that children raised in a stimulating home ___ perform better academically.",
    distractors:["setting","context","atmosphere","structure"] },

  // ─── ESTABLISH ────────────────────────────────────────────────────────────
  { word:"establish", level:"learn", q_number:1,
    passage:"The Red Cross was ___ to help people affected by war.",
    distractors:["assessed","distributed","legislated","varied"] },

  { word:"establish", level:"learn", q_number:2,
    passage:"The charity was ___ to provide meals for homeless children.",
    distractors:["assessed","distributed","required","responded"] },

  { word:"establish", level:"proficient", q_number:1,
    passage:"Researchers need more evidence to ___ a clear link between diet and the disease.",
    distractors:["define","create","identify","prove"] },

  { word:"establish", level:"proficient", q_number:2,
    passage:"The investigation aimed to ___ exactly how the fire had started.",
    distractors:["define","identify","determine","prove"] },

  { word:"establish", level:"master", q_number:1,
    passage:"It took several decades to ___ the principle that all citizens had equal rights under the law.",
    distractors:["create","define","introduce","develop"] },

  { word:"establish", level:"master", q_number:2,
    passage:"The organisation works to ___ good governance practices in developing countries.",
    distractors:["create","promote","develop","introduce"] },

  // ─── ESTIMATE ─────────────────────────────────────────────────────────────
  { word:"estimate", level:"learn", q_number:1,
    passage:"Scientists ___ that the universe is about 13.8 billion years old.",
    distractors:["create","require","proceed","legislate"] },

  { word:"estimate", level:"learn", q_number:2,
    passage:"The mechanic gave us a rough ___ of the repair costs.",
    distractors:["formula","period","policy","theory"] },

  { word:"estimate", level:"proficient", q_number:1,
    passage:"Experts ___ that sea levels could rise by up to one metre by the year 2100.",
    distractors:["indicate","suggest","calculate","project"] },

  { word:"estimate", level:"proficient", q_number:2,
    passage:"It is difficult to ___ how long the project will take because so many factors are uncertain.",
    distractors:["define","assess","calculate","predict"] },

  { word:"estimate", level:"master", q_number:1,
    passage:"The government's ___ of the project's cost proved to be significantly lower than the actual figure.",
    distractors:["assessment","calculation","projection","forecast"] },

  { word:"estimate", level:"master", q_number:2,
    passage:"Archaeologists can ___ the age of an artefact by testing the carbon it contains.",
    distractors:["assess","calculate","determine","measure"] },

  // ─── EVIDENT ──────────────────────────────────────────────────────────────
  { word:"evident", level:"learn", q_number:1,
    passage:"It was ___ from her smile that she had passed the exam.",
    distractors:["legal","major","significant","available"] },

  { word:"evident", level:"learn", q_number:2,
    passage:"The effects of the storm were ___ — trees were down and roads were flooded.",
    distractors:["legal","major","significant","specific"] },

  { word:"evident", level:"proficient", q_number:1,
    passage:"It was ___ from the data that the new drug was more effective than the old one.",
    distractors:["clear","obvious","apparent","visible"] },

  { word:"evident", level:"proficient", q_number:2,
    passage:"The student's hard work was ___ in every assignment she submitted.",
    distractors:["clear","obvious","apparent","significant"] },

  { word:"evident", level:"master", q_number:1,
    passage:"The influence of earlier philosophers is ___ throughout the author's writing.",
    distractors:["clear","apparent","obvious","significant"] },

  { word:"evident", level:"master", q_number:2,
    passage:"It became increasingly ___ that the original plan would need to be revised.",
    distractors:["clear","apparent","obvious","significant"] },

  // ─── EXPORT ───────────────────────────────────────────────────────────────
  { word:"export", level:"learn", q_number:1,
    passage:"Brazil is famous for ___ coffee to countries around the world.",
    distractors:["creating","requiring","distributing","establishing"] },

  { word:"export", level:"learn", q_number:2,
    passage:"Oil is the country's most valuable ___.",
    distractors:["income","formula","factor","labour"] },

  { word:"export", level:"proficient", q_number:1,
    passage:"Japan is well known for ___ high-quality cars to markets across the globe.",
    distractors:["producing","creating","distributing","selling"] },

  { word:"export", level:"proficient", q_number:2,
    passage:"The government introduced new taxes on ___ to protect domestic producers.",
    distractors:["income","trade","imports","goods"] },

  { word:"export", level:"master", q_number:1,
    passage:"Nations that ___ raw materials often earn less than those that sell finished products.",
    distractors:["produce","sell","trade","distribute"] },

  { word:"export", level:"master", q_number:2,
    passage:"The dramatic fall in commodity prices severely reduced the country's ___ revenue.",
    distractors:["trade","income","labour","economy"] },

  // ─── FACTOR ───────────────────────────────────────────────────────────────
  { word:"factor", level:"learn", q_number:1,
    passage:"Exercise is an important ___ in maintaining good health.",
    distractors:["method","formula","period","theory"] },

  { word:"factor", level:"learn", q_number:2,
    passage:"Sleep is often an overlooked ___ in a student's academic performance.",
    distractors:["method","formula","role","section"] },

  { word:"factor", level:"proficient", q_number:1,
    passage:"Stress is a significant ___ in many cases of heart disease.",
    distractors:["cause","element","issue","source"] },

  { word:"factor", level:"proficient", q_number:2,
    passage:"The report identified poor communication as the main ___ behind the project's failure.",
    distractors:["cause","issue","reason","element"] },

  { word:"factor", level:"master", q_number:1,
    passage:"When designing a safe building, engineers must consider a range of structural, environmental, and human ___s.",
    distractors:["elements","variables","issues","aspects"] },

  { word:"factor", level:"master", q_number:2,
    passage:"Economic growth is rarely the result of a single ___; it depends on a complex combination of conditions.",
    distractors:["cause","element","variable","aspect"] },

  // ─── FINANCE ──────────────────────────────────────────────────────────────
  { word:"finance", level:"learn", q_number:1,
    passage:"The government agreed to ___ the construction of the new hospital.",
    distractors:["create","assess","distribute","legislate"] },

  { word:"finance", level:"learn", q_number:2,
    passage:"She studied ___ at university because she wanted to work in banking.",
    distractors:["formula","method","labour","theory"] },

  { word:"finance", level:"proficient", q_number:1,
    passage:"The project was ___ by a grant from the European Union.",
    distractors:["funded","supported","backed","established"] },

  { word:"finance", level:"proficient", q_number:2,
    passage:"Many small businesses struggle to ___ their operations during periods of slow growth.",
    distractors:["fund","support","manage","sustain"] },

  { word:"finance", level:"master", q_number:1,
    passage:"Governments must balance the need to ___ public services with the risk of increasing national debt.",
    distractors:["fund","support","manage","provide"] },

  { word:"finance", level:"master", q_number:2,
    passage:"Personal ___ skills, such as budgeting and saving, are rarely taught in schools.",
    distractors:["management","economy","income","labour"] },

  // ─── FORMULA ──────────────────────────────────────────────────────────────
  { word:"formula", level:"learn", q_number:1,
    passage:"There is no magic ___ for exam success — hard work is essential.",
    distractors:["method","theory","period","source"] },

  { word:"formula", level:"learn", q_number:2,
    passage:"Chemists use a ___ to calculate the molecular weight of a compound.",
    distractors:["method","theory","period","source"] },

  { word:"formula", level:"proficient", q_number:1,
    passage:"The show's producers finally found a winning ___ that audiences loved.",
    distractors:["method","approach","recipe","structure"] },

  { word:"formula", level:"proficient", q_number:2,
    passage:"Water has the chemical ___ H₂O.",
    distractors:["symbol","equation","code","structure"] },

  { word:"formula", level:"master", q_number:1,
    passage:"Some politicians repeat the same ___ of blaming outsiders whenever problems arise.",
    distractors:["method","approach","strategy","pattern"] },

  { word:"formula", level:"master", q_number:2,
    passage:"The maths teacher showed students how to derive the ___ rather than simply memorising it.",
    distractors:["equation","rule","method","principle"] },

  // ─── FUNCTION ─────────────────────────────────────────────────────────────
  { word:"function", level:"learn", q_number:1,
    passage:"The main ___ of the heart is to pump blood around the body.",
    distractors:["method","theory","factor","period"] },

  { word:"function", level:"learn", q_number:2,
    passage:"In a team, the ___ of the leader is to guide and motivate the other members.",
    distractors:["method","theory","income","period"] },

  { word:"function", level:"proficient", q_number:1,
    passage:"The kidneys ___ by filtering waste products from the blood.",
    distractors:["operate","work","perform","proceed"] },

  { word:"function", level:"proficient", q_number:2,
    passage:"Without electricity, most modern devices cannot ___.",
    distractors:["operate","work","proceed","respond"] },

  { word:"function", level:"master", q_number:1,
    passage:"Museums serve an important educational ___ in society, preserving culture for future generations.",
    distractors:["role","purpose","task","responsibility"] },

  { word:"function", level:"master", q_number:2,
    passage:"The new software failed to ___ correctly after the latest update was installed.",
    distractors:["operate","perform","work","proceed"] },

  // ─── IDENTIFY ─────────────────────────────────────────────────────────────
  { word:"identify", level:"learn", q_number:1,
    passage:"Police used CCTV footage to ___ the suspect.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"identify", level:"learn", q_number:2,
    passage:"Can you ___ the main argument in this paragraph?",
    distractors:["create","require","respond","vary"] },

  { word:"identify", level:"proficient", q_number:1,
    passage:"Biologists can ___ a species by examining its DNA.",
    distractors:["recognise","define","determine","assess"] },

  { word:"identify", level:"proficient", q_number:2,
    passage:"The survey sought to ___ which factors most influenced people's voting behaviour.",
    distractors:["determine","establish","define","assess"] },

  { word:"identify", level:"master", q_number:1,
    passage:"One key goal of the research was to ___ barriers that prevent young people from accessing higher education.",
    distractors:["determine","establish","define","analyse"] },

  { word:"identify", level:"master", q_number:2,
    passage:"The ability to ___ reliable sources is an essential skill in the digital age.",
    distractors:["recognise","determine","assess","locate"] },

  // ─── INCOME ───────────────────────────────────────────────────────────────
  { word:"income", level:"learn", q_number:1,
    passage:"A higher ___ usually allows people to enjoy a better standard of living.",
    distractors:["formula","method","theory","period"] },

  { word:"income", level:"learn", q_number:2,
    passage:"The government introduced a minimum wage to ensure workers earned a fair ___.",
    distractors:["formula","source","labour","period"] },

  { word:"income", level:"proficient", q_number:1,
    passage:"Families on a low ___ often struggle to pay for housing and food.",
    distractors:["salary","wage","earnings","revenue"] },

  { word:"income", level:"proficient", q_number:2,
    passage:"The organisation depends largely on donations as its main source of ___.",
    distractors:["revenue","funding","finance","labour"] },

  { word:"income", level:"master", q_number:1,
    passage:"Disposable ___ — the money left after tax — is a key measure of household wealth.",
    distractors:["salary","earnings","revenue","finance"] },

  { word:"income", level:"master", q_number:2,
    passage:"Widening gaps between high and low ___ earners have contributed to growing social inequality.",
    distractors:["salary","wage","earnings","labour"] },

  // ─── INDICATE ─────────────────────────────────────────────────────────────
  { word:"indicate", level:"learn", q_number:1,
    passage:"Rising sea levels ___ that climate change is having a real impact.",
    distractors:["create","distribute","legislate","proceed"] },

  { word:"indicate", level:"learn", q_number:2,
    passage:"The graph clearly ___ that sales increased sharply in the final quarter.",
    distractors:["create","require","vary","respond"] },

  { word:"indicate", level:"proficient", q_number:1,
    passage:"Pale skin and tiredness ___ that someone may be anaemic.",
    distractors:["suggest","show","reveal","demonstrate"] },

  { word:"indicate", level:"proficient", q_number:2,
    passage:"The results ___ a strong link between diet and the risk of heart disease.",
    distractors:["suggest","show","reveal","demonstrate"] },

  { word:"indicate", level:"master", q_number:1,
    passage:"Early findings ___ that the treatment may be effective, but further trials are needed.",
    distractors:["suggest","imply","show","demonstrate"] },

  { word:"indicate", level:"master", q_number:2,
    passage:"Falling unemployment figures ___ that the economy is beginning to recover.",
    distractors:["suggest","imply","demonstrate","show"] },

  // ─── INDIVIDUAL ───────────────────────────────────────────────────────────
  { word:"individual", level:"learn", q_number:1,
    passage:"Every ___ has the right to a fair trial.",
    distractors:["formula","period","source","income"] },

  { word:"individual", level:"learn", q_number:2,
    passage:"The programme is designed to meet each ___ student's needs.",
    distractors:["legal","major","evident","available"] },

  { word:"individual", level:"proficient", q_number:1,
    passage:"The rights of the ___ must be balanced against the needs of the wider community.",
    distractors:["person","citizen","member","human"] },

  { word:"individual", level:"proficient", q_number:2,
    passage:"Teachers are encouraged to give ___ feedback to each student.",
    distractors:["personal","specific","separate","distinct"] },

  { word:"individual", level:"master", q_number:1,
    passage:"The legal system must protect the ___ from unfair treatment by the state.",
    distractors:["person","citizen","subject","member"] },

  { word:"individual", level:"master", q_number:2,
    passage:"While group work has benefits, ___ accountability is also important in education.",
    distractors:["personal","specific","separate","independent"] },

  // ─── INTERPRET ────────────────────────────────────────────────────────────
  { word:"interpret", level:"learn", q_number:1,
    passage:"Different people may ___ the same poem in very different ways.",
    distractors:["create","require","proceed","legislate"] },

  { word:"interpret", level:"learn", q_number:2,
    passage:"Archaeologists ___ ancient drawings to learn about early human life.",
    distractors:["create","require","define","respond"] },

  { word:"interpret", level:"proficient", q_number:1,
    passage:"It can be difficult to ___ statistics without access to the full context.",
    distractors:["analyse","understand","assess","define"] },

  { word:"interpret", level:"proficient", q_number:2,
    passage:"The lawyer asked the court to ___ the contract clause in favour of her client.",
    distractors:["read","analyse","define","assess"] },

  { word:"