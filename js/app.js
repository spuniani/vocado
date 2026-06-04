const SLEN = 10;
let fcIdx = 0, fcOrder = [], fcFlipped = false;
let S = {session:[],cq:0,results:[],sel:null,submitted:false,statusBefore:{}};
let T = {session:[],ci:0,correct:0,passed:0,timerSec:30,timerInterval:null,revealed:false};

function shuffle(a){return[...a].sort(()=>Math.random()-.5);}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+id).classList.add('active');}
function goHome(){clearTabooTimer();show('home');renderStats();}

async function renderStats(){
  const stats = await getStats(1);
  const streak = stats.streak;
  document.getElementById('stat-streak').textContent = streak ? streak : '—';
  document.getElementById('stat-learnt').textContent = stats.learnt;
  document.getElementById('stat-proficient').textContent = stats.proficient;
  document.getElementById('stat-mastered').textContent = `${stats.mastered}/60`;
}

// ── STUDY ──────────────────────────────────────────────────────────
function startStudy(){
  fcOrder = shuffle(WORDS.map((_,i)=>i));
  fcIdx = 0; fcFlipped = false;
  show('study'); renderFCFront();
}

function studyDone(){
  // record that study mode was completed (used for All Rounder badge later)
  setState('study_completed', true).catch(()=>{});
}

function renderFCFront(){
  const w = WORDS[fcOrder[fcIdx]];
  fcFlipped = false;
  document.getElementById('fc-counter').textContent = `${fcIdx+1} / ${WORDS.length}`;
  document.getElementById('fc-flip-btn').textContent = 'Tap to reveal →';
  document.getElementById('fc-flip-btn').style.display = 'block';
  document.getElementById('fc-card').innerHTML = `
    <div class="fc-front">
      <div class="fc-word">${w.word}</div>
      <div class="fc-pos">${w.pos}</div>
      <div class="fc-flip-hint">tap card or button to reveal</div>
    </div>`;
}

function renderFCBack(){
  const w = WORDS[fcOrder[fcIdx]];
  fcFlipped = true;
  const ex = w.example_sentence.replace(/___/g,`<strong>${w.word}</strong>`);
  document.getElementById('fc-flip-btn').textContent = 'Flip back ↩';
  document.getElementById('fc-card').innerHTML = `
    <div class="fc-back">
      <div class="fc-front" style="margin-bottom:.25rem">
        <div class="fc-word" style="font-size:22px">${w.word}</div>
        <div class="fc-pos">${w.pos}</div>
      </div>
      <div class="fc-divider"></div>
      <div class="fc-row"><div class="fc-lbl">Meaning</div><div class="fc-val">${w.definition}</div></div>
      <div class="fc-row"><div class="fc-lbl">Synonyms</div><div class="fc-val fc-syn">${w.synonyms.join(', ')}</div></div>
      <div class="fc-row"><div class="fc-lbl">Antonyms</div><div class="fc-val fc-ant">${w.antonyms.join(', ')}</div></div>
      <div class="fc-row"><div class="fc-lbl">Example</div><div class="fc-val fc-ex">${ex}</div></div>
    </div>`;
}

function flipCard(){
  if(fcFlipped) renderFCFront(); else renderFCBack();
}

function fcNav(dir){
  fcIdx = (fcIdx+dir+WORDS.length)%WORDS.length;
  if(fcIdx === WORDS.length - 1 && dir === 1) studyDone();
  renderFCFront(); window.scrollTo(0,0);
}

// ── QUIZ ───────────────────────────────────────────────────────────
async function startQuiz(){
  const schedules = await loadSchedules(1);
  const selected = selectSessionQuestions(schedules);
  const questions = selected.map(s => {
    const q = QB.find(q => q.word === s.word && q.level === s.level && q.q_number === s.qNumber);
    if (!q) return null;
    const wrong = shuffle(q.distractors).slice(0, 3);
    const opts = shuffle([q.word, ...wrong]);
    const correct = ['A','B','C','D'][opts.indexOf(q.word)];
    return {...q, opts, correct};
  }).filter(Boolean);

  // snapshot word statuses before session for level-up detection
  const byWord = groupByWord(schedules);
  const statusBefore = {};
  for (const [word, records] of Object.entries(byWord)) {
    statusBefore[word] = getWordStatus(records);
  }

  S = {session:questions, cq:0, results:[], sel:null, submitted:false, statusBefore};
  show('question'); updateProg(); renderQ();
}

function updateProg(){
  document.getElementById('qpl').textContent=`Q${S.cq+1} / ${SLEN}`;
  document.getElementById('qpf').style.width=((S.cq+1)/SLEN*100)+'%';
}

function renderQ(){
  if(S.cq >= S.session.length){finishQuiz();return;}
  const q=S.session[S.cq]; S.sel=null; S.submitted=false;
  const ph=q.passage.replace(/___/g,'<span class="blank">&nbsp;</span>');
  const opts=q.opts.map((word,i)=>{
    const k=['A','B','C','D'][i];
    return `<button class="opt" id="opt-${k}" data-key="${k}" onclick="selOpt('${k}')">
      <span class="opt-k">${k}</span><span>${word}</span></button>`;
  }).join('');
  document.getElementById('qcontent').innerHTML=`
    <div class="pcard"><span class="badge">AWL Sublist 1</span><div class="passage">${ph}</div></div>
    <div class="opts">${opts}</div>
    <div class="submit-wrap"><button class="submit-btn" id="subbtn" disabled onclick="submitAns()">Check answer</button></div>
    <div id="fbarea"></div>`;
}

function selOpt(k){
  if(S.submitted)return;
  S.sel=k;
  document.querySelectorAll('.opt').forEach(b=>{
    b.style.border='.5px solid var(--border2)';b.style.background='var(--bg)';b.style.color='var(--txt)';
  });
  const btn=document.getElementById('opt-'+k);
  if(btn){btn.style.border='2px solid #1D9E75';btn.style.background='#E1F5EE';btn.style.color='#085041';}
  document.getElementById('subbtn').disabled=false;
}

async function submitAns(){
  if(S.submitted)return; S.submitted=true;
  document.getElementById('subbtn').disabled=true;
  const q=S.session[S.cq]; const ok=S.sel===q.correct;
  S.results.push({w:q.word,d:q.passage,ok});
  await updateQuestionResult(1, q.word, q.level, q.q_number, ok);
  document.querySelectorAll('.opt').forEach(b=>{
    b.disabled=true;
    b.style.border='.5px solid var(--border2)';b.style.background='var(--bg)';b.style.color='var(--txt)';
    const k=b.getAttribute('data-key');
    if(k===q.correct){b.style.border='2px solid #1D9E75';b.style.background='#E1F5EE';b.style.color='#085041';}
    else if(k===S.sel&&!ok){b.style.border='2px solid #D85A30';b.style.background='#FAECE7';b.style.color='#4A1B0C';}
  });
  const cw=q.opts[['A','B','C','D'].indexOf(q.correct)];
  const wData = WORDS.find(w=>w.word===q.word)||{};
  document.getElementById('fbarea').innerHTML=`<div class="fbcard">
    <div class="fb-hd"><span style="font-size:18px">${ok?'✅':'❌'}</span>
    <span class="fb-lbl ${ok?'ok':'bad'}">${ok?'Correct':'Incorrect'}</span></div>
    <div class="fb-txt">${ok
      ?`<strong>${cw}</strong> fits — the sentence needs a word meaning "${wData.definition||''}".`
      :`The answer is <strong>${cw}</strong>, which means "${wData.definition||''}".`
    }</div></div>`;
  const isLast=S.cq>=SLEN-1;
  const nxt=document.createElement('button');
  nxt.className='nxt';nxt.textContent=isLast?'See results':'Next question →';
  nxt.onclick=isLast?finishQuiz:nextQ;
  document.getElementById('screen-question').appendChild(nxt);
}

function nextQ(){S.cq++;document.querySelector('.nxt')?.remove();updateProg();renderQ();window.scrollTo(0,0);}

async function finishQuiz(){
  const correct=S.results.filter(r=>r.ok).length;
  await completeSession(1);
  const stats = await getStats(1);

  document.getElementById('sumh').textContent=correct===SLEN?'Perfect session!':correct>=7?'Great work!':correct>=5?'Good effort':'Keep going!';
  document.getElementById('sums').textContent='AWL Sublist 1 — Quiz';
  document.getElementById('sum-lbl1').textContent='This session';
  document.getElementById('sum-lbl2').textContent='Mastered';
  document.getElementById('sumc').textContent=`${correct}/${SLEN}`;
  document.getElementById('suma').textContent=`${stats.mastered}/60`;

  // words that levelled up this session
  const schedules = await loadSchedules(1);
  const statusAfter = {};
  for (const [word, records] of Object.entries(groupByWord(schedules))) {
    statusAfter[word] = getWordStatus(records);
  }
  const levelOrder = ['unknown','learnt','proficient','mastered'];
  const levelledUp = Object.keys(statusAfter).filter(w =>
    levelOrder.indexOf(statusAfter[w]) > levelOrder.indexOf(S.statusBefore[w] || 'unknown')
  );

  const ml=document.getElementById('missed-list');
  const lbl=document.getElementById('missed-lbl');
  if(levelledUp.length > 0){
    lbl.textContent='Levelled up';
    ml.innerHTML=levelledUp.map(w=>`<div class="missed-item">
      <span class="missed-word">${w}</span>
      <span class="missed-def" style="color:var(--acc)">${statusAfter[w]}</span></div>`).join('');
  } else {
    lbl.textContent='';
    ml.innerHTML='';
  }

  document.getElementById('again-btn').onclick=startQuiz;
  show('summary');
}

// ── TABOO ──────────────────────────────────────────────────────────
function setTimer(sec){
  T.timerSec=sec;
  document.getElementById('taboo-timer-display').textContent=sec?sec+'s':'Off';
  ['30','45','60','0'].forEach(v=>{
    const btn=document.getElementById('tbtn-'+v);
    const active=parseInt(v)===sec;
    btn.style.background=active?'var(--taboo-bg)':'var(--bg)';
    btn.style.borderColor=active?'var(--taboo-border)':'var(--border2)';
    btn.style.color=active?'var(--taboo-txt)':'var(--txt)';
  });
}

function startTabooSetup(){show('taboo-setup');}

function startTaboo(){
  T.session=shuffle(WORDS.map((_,i)=>i)).slice(0,SLEN);
  T.ci=0; T.correct=0; T.passed=0; T.revealed=false;
  clearTabooTimer();
  show('taboo');
  renderTabooReady();
}

function endTaboo(){
  clearTabooTimer();
  goHome();
}

function renderTabooReady(){
  T.revealed=false;
  document.getElementById('taboo-hdr').textContent=`Taboo — Card ${T.ci+1}/10`;
  document.getElementById('taboo-content').innerHTML=`
    <div class="taboo-reveal-wrap">
      <div class="taboo-ready-lbl">Guesser — look away!</div>
      <div class="taboo-ready-word">• • • • • •</div>
      <div class="taboo-ready-lbl" style="margin-top:.5rem">Describer — tap when ready</div>
      <button class="taboo-show-btn" onclick="revealTabooCard()">Show card →</button>
    </div>`;
}

function revealTabooCard(){
  T.revealed=true;
  const w=WORDS[T.session[T.ci]];
  const chips=w.taboo_words.map(t=>`<span class="taboo-chip">${t}</span>`).join('');
  const timerHtml=T.timerSec?`<div class="taboo-timer" id="taboo-clock">${T.timerSec}</div>`:'';
  document.getElementById('taboo-content').innerHTML=`
    <div class="taboo-card-wrap">
      <div class="taboo-card">
        <div>
          <div class="taboo-target-lbl">Describe this word</div>
          <div class="taboo-target-word">${w.word}</div>
          <div class="taboo-target-pos">${w.pos} — ${w.definition}</div>
        </div>
        <div>
          <div class="taboo-forbidden-lbl">🚫 Cannot say</div>
          <div class="taboo-forbidden-list">${chips}</div>
        </div>
        ${timerHtml}
        <div class="taboo-actions">
          <button class="taboo-pass" onclick="tabooResult(false)">✗ Pass</button>
          <button class="taboo-got"  onclick="tabooResult(true)">✓ Got it!</button>
        </div>
      </div>
    </div>`;
  if(T.timerSec) startTabooTimer();
}

function startTabooTimer(){
  clearTabooTimer();
  let remaining=T.timerSec;
  T.timerInterval=setInterval(()=>{
    remaining--;
    const el=document.getElementById('taboo-clock');
    if(!el){clearTabooTimer();return;}
    el.textContent=remaining;
    if(remaining<=10) el.classList.add('warning');
    if(remaining<=0){clearTabooTimer();tabooResult(false);}
  },1000);
}

function clearTabooTimer(){
  if(T.timerInterval){clearInterval(T.timerInterval);T.timerInterval=null;}
}

function tabooResult(gotIt){
  clearTabooTimer();
  if(gotIt) T.correct++; else T.passed++;
  T.ci++;
  if(T.ci>=SLEN){finishTaboo();return;}
  renderTabooReady();
  window.scrollTo(0,0);
}

function finishTaboo(){
  document.getElementById('sumh').textContent=T.correct>=8?'Excellent!':T.correct>=5?'Good round':'Keep practising';
  document.getElementById('sums').textContent='AWL Sublist 1 — Taboo';
  document.getElementById('sum-lbl1').textContent='Got it';
  document.getElementById('sum-lbl2').textContent='Passed';
  document.getElementById('sumc').textContent=`${T.correct}/${SLEN}`;
  document.getElementById('suma').textContent=`${T.passed}/${SLEN}`;
  document.getElementById('missed-lbl').textContent='';
  document.getElementById('missed-list').innerHTML='';
  document.getElementById('again-btn').onclick=startTaboo;
  show('summary');
}

// ── INIT ───────────────────────────────────────────────────────────
window.addEventListener('load', ()=>{
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(err=>{
      console.warn('SW registration failed:', err);
    });
  }
  initDB().then(renderStats).catch(console.warn);
});
