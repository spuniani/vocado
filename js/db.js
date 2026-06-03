const DB_NAME = 'vocado-db';
const DB_VERSION = 1;
let _db = null;

function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('question_schedule')) {
        db.createObjectStore('question_schedule', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('app_state')) {
        db.createObjectStore('app_state', { keyPath: 'key' });
      }
    };
    req.onsuccess = e => { _db = e.target.result; resolve(_db); };
    req.onerror = e => reject(e.target.error);
  });
}

function tx(storeName, mode, fn) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const t = db.transaction(storeName, mode);
    const store = t.objectStore(storeName);
    const req = fn(store);
    t.oncomplete = () => resolve(req ? req.result : undefined);
    t.onerror = e => reject(e.target.error);
  }));
}

function getState(key) {
  return tx('app_state', 'readonly', s => s.get(key))
    .then(rec => rec ? rec.value : null);
}

function setState(key, value) {
  return tx('app_state', 'readwrite', s => s.put({ key, value }));
}

function scheduleId(listId, word, qNumber) {
  return `${listId}:${word}:${qNumber}`;
}

// ── Public API ────────────────────────────────────────────────────

async function initDB() {
  await openDB();
  // Seed any missing question_schedule records on first run
  const existing = await tx('question_schedule', 'readonly', s => s.getAllKeys());
  if (existing.length === QB.length) return;

  const toAdd = QB.filter(q => !existing.includes(scheduleId(q.word_list || 1, q.word, q.q_number)));
  await new Promise((resolve, reject) => {
    openDB().then(db => {
      const t = db.transaction('question_schedule', 'readwrite');
      const store = t.objectStore('question_schedule');
      toAdd.forEach(q => {
        const listId = q.word_list || 1;
        store.put({
          id: scheduleId(listId, q.word, q.q_number),
          listId,
          word: q.word,
          qNumber: q.q_number,
          timesSeen: 0,
          q1CorrectCount: 0,
          q2CorrectCount: 0,
          timesCorrect: 0,
          nextDue: 0,
          lastResult: null
        });
      });
      t.oncomplete = resolve;
      t.onerror = e => reject(e.target.error);
    });
  });
}

async function loadSchedules(listId) {
  const all = await tx('question_schedule', 'readonly', s => s.getAll());
  return all.filter(r => r.listId === listId);
}

async function updateQuestionResult(listId, word, qNumber, isCorrect, sessionNum) {
  const id = scheduleId(listId, word, qNumber);
  const rec = await tx('question_schedule', 'readonly', s => s.get(id));
  if (!rec) return;

  rec.timesSeen++;
  rec.lastResult = isCorrect ? 'correct' : 'wrong';

  if (isCorrect) {
    rec.timesCorrect++;
    if (qNumber === 1) rec.q1CorrectCount++;
    else rec.q2CorrectCount++;
  }

  const intervals = [2, 3, 5, 5];
  rec.nextDue = isCorrect
    ? sessionNum + intervals[Math.min(rec.timesCorrect - 1, intervals.length - 1)]
    : sessionNum + 1;

  await tx('question_schedule', 'readwrite', s => s.put(rec));
}

async function completeSession(listId) {
  const sessionKey = `session_count_${listId}`;
  const count = (await getState(sessionKey)) || 0;
  await setState(sessionKey, count + 1);

  const today = new Date().toISOString().slice(0, 10);
  const lastDate = await getState('last_session_date');
  const streak = (await getState('streak')) || 0;

  if (lastDate === today) {
    // already played today — streak unchanged
  } else if (lastDate === yesterday()) {
    await setState('streak', streak + 1);
  } else {
    await setState('streak', 1);
  }
  await setState('last_session_date', today);
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

async function getStats(listId) {
  const schedules = await loadSchedules(listId);
  const wordMap = {};
  for (const s of schedules) {
    if (!wordMap[s.word]) wordMap[s.word] = { q1: 0, q2: 0, total: 0 };
    if (s.qNumber === 1) wordMap[s.word].q1 = s.q1CorrectCount;
    else wordMap[s.word].q2 = s.q2CorrectCount;
    wordMap[s.word].total = (wordMap[s.word].q1 || 0) + (wordMap[s.word].q2 || 0);
  }

  let learnt = 0, proficient = 0, mastered = 0;
  for (const w of Object.values(wordMap)) {
    const status = getWordStatus(w.q1, w.q2);
    if (status === 'learnt') learnt++;
    else if (status === 'proficient') proficient++;
    else if (status === 'mastered') mastered++;
  }

  const streak = (await getState('streak')) || 0;
  return { learnt, proficient, mastered, streak };
}

function getWordStatus(q1Correct, q2Correct) {
  if (!q1Correct && !q2Correct) return 'unknown';
  if (!q1Correct || !q2Correct) return 'learnt';
  if (q1Correct + q2Correct < 3) return 'proficient';
  return 'mastered';
}

function selectSessionQuestions(schedules, sessionNum, slen = 10) {
  const newQ     = schedules.filter(s => s.timesSeen === 0);
  const dueQ     = schedules.filter(s => s.timesSeen > 0 && s.nextDue <= sessionNum);
  const upcoming = schedules.filter(s => s.timesSeen > 0 && s.nextDue > sessionNum)
                             .sort((a, b) => a.nextDue - b.nextDue);

  const selected = [];
  selected.push(...shuffle(dueQ).slice(0, 4));
  const newSlots = Math.min(6, slen - selected.length);
  selected.push(...shuffle(newQ).slice(0, newSlots));
  if (selected.length < slen) {
    selected.push(...upcoming.slice(0, slen - selected.length));
  }
  return shuffle(selected).slice(0, slen);
}
