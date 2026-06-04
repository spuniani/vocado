const DB_NAME = 'vocado-db';
const DB_VERSION = 2;
let _db = null;

function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      // Wipe question_schedule on upgrade — new QB schema is incompatible with v1
      if (db.objectStoreNames.contains('question_schedule')) {
        db.deleteObjectStore('question_schedule');
      }
      db.createObjectStore('question_schedule', { keyPath: 'id' });
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

function scheduleId(listId, word, level, qNumber) {
  return `${listId}:${word}:${level}:${qNumber}`;
}

// ── Public API ────────────────────────────────────────────────────

async function initDB() {
  await openDB();
  const existing = await tx('question_schedule', 'readonly', s => s.getAllKeys());
  if (existing.length === QB.length) return;

  const existingSet = new Set(existing);
  const toAdd = QB.filter(q => !existingSet.has(scheduleId((WORDS.find(w => w.word === q.word) || {}).sublist || 1, q.word, q.level, q.q_number)));
  if (!toAdd.length) return;

  await tx('question_schedule', 'readwrite', store => {
    toAdd.forEach(q => {
      const listId = (WORDS.find(w => w.word === q.word) || {}).sublist || 1;
      store.put({
        id: scheduleId(listId, q.word, q.level, q.q_number),
        listId,
        word: q.word,
        level: q.level,
        qNumber: q.q_number,
        timesSeen: 0,
        correctCount: 0,
      });
    });
  });
}

async function loadSchedules(listId) {
  const all = await tx('question_schedule', 'readonly', s => s.getAll());
  return all.filter(r => r.listId === listId);
}

async function loadSchedulesMulti(listIds) {
  const all = await tx('question_schedule', 'readonly', s => s.getAll());
  return all.filter(r => listIds.includes(r.listId));
}

async function isSublistMastered(listId) {
  const words = WORDS.filter(w => w.sublist === listId).map(w => w.word);
  if (!words.length) return false;
  const schedules = await loadSchedules(listId);
  const byWord = groupByWord(schedules);
  return words.every(word => byWord[word] && getWordStatus(byWord[word]) === 'mastered');
}

async function getUnlockedSublists() {
  const available = [...new Set(WORDS.map(w => w.sublist))].sort((a, b) => a - b);
  const unlocked = [];
  for (const sl of available) {
    if (sl === 1 || (unlocked.includes(sl - 1) && await isSublistMastered(sl - 1))) {
      unlocked.push(sl);
    }
  }
  return unlocked;
}

async function updateQuestionResult(listId, word, level, qNumber, isCorrect) {
  const id = scheduleId(listId, word, level, qNumber);
  const rec = await tx('question_schedule', 'readonly', s => s.get(id));
  if (!rec) return;
  rec.timesSeen++;
  if (isCorrect) rec.correctCount++;
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

function groupByWord(schedules) {
  const byWord = {};
  for (const s of schedules) {
    if (!byWord[s.word]) byWord[s.word] = [];
    byWord[s.word].push(s);
  }
  return byWord;
}

function getWordStatus(records) {
  if (records.some(r => r.level === 'master'     && r.correctCount > 0)) return 'mastered';
  if (records.some(r => r.level === 'proficient' && r.correctCount > 0)) return 'proficient';
  if (records.some(r => r.level === 'learn'      && r.correctCount > 0)) return 'learnt';
  return 'unknown';
}

function selectSessionQuestions(schedules, slen = 10) {
  const byWord = groupByWord(schedules);
  const pool = [];
  for (const records of Object.values(byWord)) {
    const status = getWordStatus(records);
    let eligible;
    if (status === 'mastered') {
      eligible = records;
    } else if (status === 'proficient') {
      eligible = records.filter(r => r.level === 'master');
    } else if (status === 'learnt') {
      eligible = records.filter(r => r.level === 'proficient');
    } else {
      eligible = records.filter(r => r.level === 'learn');
    }
    pool.push(...eligible);
  }
  return shuffle(pool).slice(0, slen);
}

async function getStats(listId) {
  const schedules = await loadSchedules(listId);
  const byWord = groupByWord(schedules);
  let learnt = 0, proficient = 0, mastered = 0;
  for (const records of Object.values(byWord)) {
    const status = getWordStatus(records);
    if (status === 'learnt') learnt++;
    else if (status === 'proficient') proficient++;
    else if (status === 'mastered') mastered++;
  }
  const streak = (await getState('streak')) || 0;
  return { learnt, proficient, mastered, streak };
}
