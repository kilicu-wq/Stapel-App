(function () {

const WEEKS = ['31', '32', '33', '34', '35'];
const WEEK_TYPE = { 31: 'Volumen', 32: 'Intensität', 33: 'Volumen', 34: 'Maximum', 35: 'Volumen' };
const WEEK_COLOR = {
  'Volumen': 'var(--accent-v)',
  'Intensität': 'var(--accent-i)',
  'Maximum': 'var(--accent-m)'
};

function ex(key, name, scheme, w31v, w31e, w32v, w32e, w33v, w33e, w34v, w34e, w35v, w35e) {
  return {
    key, name, scheme,
    weeks: {
      31: { vorgabe: w31v, ergebnis: w31e || '' },
      32: { vorgabe: w32v, ergebnis: w32e || '' },
      33: { vorgabe: w33v, ergebnis: w33e || '' },
      34: { vorgabe: w34v, ergebnis: w34e || '' },
      35: { vorgabe: w35v, ergebnis: w35e || '' }
    }
  };
}

const DAYS = [
  {
    id: 'A', label: 'Push', cardio: true,
    exercises: [
      ex('bankdruecken-lh', 'Bankdrücken (LH)', '4×8/5/8/5/8', '55×8', 'ok', '65×5', '70×5', '62,5×8', '', '72,5×5', '', '65×8', ''),
      ex('schraegbank-kh', 'Schrägbank (KH)', '3×8/5/8/5/8', '20×8', 'ok', '24×5', '28×5', '24×8', '', '30×5', '', '26×8', ''),
      ex('dips', 'Dips', '3×8/5/8/5/8', 'KG×8', 'ok', '+5kg×5', '+10kg×5', 'KG×8', '', '+12,5kg×5', '', 'KG×8', ''),
      ex('trizeps-pushdown', 'Trizeps Pushdown', '3×12', '20×12', 'ok', '25×12', 'ok(ish)', '22,5×12', '', '27,5×12', '', '25×12', ''),
      ex('kh-flys', 'KH Flys', '3×12', '10×12', '10×12', '12×12', '14×10', '12×12', '', '14×12', '', '13×12', ''),
      ex('plank', 'Plank', '3×—', '45 Sek', 'ok', '50 Sek', 'ok', '50 Sek', '', '60 Sek', '', '55 Sek', ''),
      ex('beinheben', 'Beinheben', '3×12/15', '12 Wdh', 'ok', '12 Wdh', 'ok', '15 Wdh', '', '15 Wdh', '', '15 Wdh', '')
    ]
  },
  {
    id: 'B', label: 'Pull', cardio: true,
    exercises: [
      ex('kreuzheben', 'Kreuzheben', '4×8/5/8/5/8', '65×8', 'ok', '75×5', 'ok', '70×8', '', '80×5', '', '72,5×8', ''),
      ex('latzug-weit', 'Latzug (weit)', '4×8/5/8/5/8', '55×8', 'ok', '65×5', '70×5', '62,5×8', '', '72,5×5', '', '65×8', ''),
      ex('kabelrow', 'Kabelrow', '3×8/5/8/5/8', '45×8', 'ok', '55×5', '70×5', '60×8', '', '72,5×5', '', '62,5×8', ''),
      ex('bizeps-curl-sz', 'Bizeps Curl (SZ)', '3×8/5/8/5/8', '30×8', 'ok', '35×5', '60×5', '50×8', '', '62,5×5', '', '52,5×8', ''),
      ex('hammer-curl', 'Hammer Curl', '3×12', '14×12', 'ok', '16×12', '', '14×12', '', '18×12', '', '16×12', ''),
      ex('reverse-flys', 'Reverse Flys', '2×12', '10×12', 'ok', '12×12', '', '10×12', '', '13×12', '', '11×12', ''),
      ex('crunches-kabel', 'Crunches (Kabel)', '3×15', '50×15', 'ok', '65×15', '70×15', '60×15', '', '75×15', '', '65×15', '')
    ]
  },
  {
    id: 'C', label: 'Schultern + Beine', cardio: true,
    exercises: [
      ex('beinpresse', 'Beinpresse', '4×8/5/8/5/8', '230×8', 'ok', '270×5', '290×5', '255×8', '', '305×5', '', '265×8', ''),
      ex('schulterdruecken-lh', 'Schulterdrücken (LH)', '4×8/5/8/5/8', '20×8', '17,5×8', '25×5', 'ok', '20×8', '', '27,5×5', '', '22,5×8', ''),
      ex('beinbeuger', 'Beinbeuger', '3×8/5/8/5/8', '35×8', 'ok', '40×5', '50×5', '42,5×8', '', '52,5×5', '', '45×8', ''),
      ex('seitheben-kh', 'Seitheben (KH)', '2×12', '10×12', 'ok', '12×12', '12×10', '10×12', '', '12×12', '', '11×12', ''),
      ex('ausfallschritte', 'Ausfallschritte', '3×10/Seite', '10×10', 'ok', '12×10', 'ok', '10×10', '', '14×10', '', '12×10', ''),
      ex('frontheben-kh', 'Frontheben (KH)', '2×12', '10×12', 'ok', '12×12', '12×10', '10×12', '', '14×12', '', '12×12', ''),
      ex('wadenheben', 'Wadenheben', '3×15', '27,5×15', 'ok', '30×15', '35×15', '30×15', '', '37,5×15', '', '32,5×15', ''),
      ex('nacken-kh', 'Nacken KH', '2×12', '26×12', 'ok', '28×12', '30×12', '28×12', '', '32×12', '', '30×12', ''),
      ex('russian-twist', 'Russian Twist', '3×15/Seite', '8×15', 'ok', '10×15', '5×15', '6×15', '', '8×15', '', '7×15', '')
    ]
  }
];

// Exercise keys in the order they used to be stored (index-based) before
// storage switched to key-based lookup. Used once to migrate any
// previously saved state so it keeps pointing at the right exercise
// after an exercise list gets reordered or an exercise is removed.
const LEGACY_KEY_ORDER = {
  A: ['bankdruecken-lh', 'schraegbank-kh', 'dips', 'trizeps-pushdown', 'kh-flys', 'plank', 'beinheben'],
  B: ['kreuzheben', 'latzug-weit', 'bizeps-curl-sz', 'kabelrow', 'hammer-curl', 'reverse-flys', 'crunches-kabel'],
  C: ['beinpresse', 'schulterdruecken-lh', 'beinbeuger', 'frontheben-kh', 'ausfallschritte', 'seitheben-kh', 'wadenheben', 'nacken-kh', 'russian-twist']
};

function migrateLegacyIndexState(raw) {
  const migrated = { A: {}, B: {}, C: {} };
  Object.keys(raw || {}).forEach(dayId => {
    const legacyOrder = LEGACY_KEY_ORDER[dayId];
    const weeks = raw[dayId] || {};
    migrated[dayId] = {};
    Object.keys(weeks).forEach(w => {
      const weekData = weeks[w] || {};
      migrated[dayId][w] = {};
      Object.keys(weekData).forEach(k => {
        const isLegacyIndex = /^\d+$/.test(k) && legacyOrder && legacyOrder[k] !== undefined;
        const targetKey = isLegacyIndex ? legacyOrder[k] : k;
        migrated[dayId][w][targetKey] = weekData[k];
      });
    });
  });
  return migrated;
}

// ---- state ----
let state = { A: {}, B: {}, C: {} }; // state[day][week][exerciseKey] = {ergebnis, done}
let activeDay = 'A';
let activeWeek = '32';
let saveTimeout = null;

function seedDefaults() {
  DAYS.forEach(day => {
    WEEKS.forEach(w => {
      if (!state[day.id][w]) state[day.id][w] = {};
      day.exercises.forEach(exo => {
        if (!state[day.id][w][exo.key]) {
          const orig = exo.weeks[w].ergebnis;
          state[day.id][w][exo.key] = { ergebnis: orig, done: !!orig };
        }
      });
    });
  });
}

async function loadState() {
  try {
    const saved = await window.stapelDB.get('stapel-state');
    if (saved) {
      state = Object.assign({ A: {}, B: {}, C: {} }, migrateLegacyIndexState(saved));
    }
  } catch (e) { /* no saved state yet */ }
  seedDefaults();

  try {
    const view = await window.stapelDB.get('stapel-view');
    if (view && DAYS.some(d => d.id === view.activeDay) && WEEKS.includes(view.activeWeek)) {
      activeDay = view.activeDay;
      activeWeek = view.activeWeek;
    }
  } catch (e) { /* no saved view yet */ }
}

async function persist() {
  try {
    await window.stapelDB.set('stapel-state', state);
    flashSaveNote('gespeichert');
  } catch (e) {
    flashSaveNote('speichern fehlgeschlagen');
  }
}

function persistView() {
  window.stapelDB.set('stapel-view', { activeDay, activeWeek }).catch(() => {});
}

function scheduleSave() {
  clearTimeout(saveTimeout);
  flashSaveNote('speichert…');
  saveTimeout = setTimeout(persist, 500);
}

function flashSaveNote(text) {
  const el = document.getElementById('save-note');
  if (!el) return;
  el.textContent = text;
  el.style.opacity = '1';
  if (text === 'gespeichert') {
    setTimeout(() => { if (el.textContent === 'gespeichert') el.style.opacity = '0'; }, 1200);
  }
}

function render() {
  const app = document.getElementById('app');
  const day = DAYS.find(d => d.id === activeDay);
  const weekType = WEEK_TYPE[activeWeek];
  const wc = WEEK_COLOR[weekType];

  const total = day.exercises.length;
  const doneCount = day.exercises.filter(exo => state[day.id][activeWeek][exo.key].done).length;

  let html = '';

  html += `<div class="header">
    <div>
      <div class="title">STAPEL</div>
      <div class="subtitle">Wave-Periodisierung · KW31–KW35</div>
    </div>
    <button class="export-btn" id="export-btn">Export</button>
  </div>`;

  html += `<div class="day-tabs">`;
  DAYS.forEach(d => {
    html += `<div class="day-tab ${d.id === activeDay ? 'active' : ''}" data-day="${d.id}">
      ${d.id} — ${d.label.split(' ')[0]}<span class="sub">${d.label}</span>
    </div>`;
  });
  html += `</div>`;

  html += `<div class="week-tabs">`;
  WEEKS.forEach(w => {
    const type = WEEK_TYPE[w];
    const col = WEEK_COLOR[type];
    html += `<div class="week-tab ${w === activeWeek ? 'active' : ''}" style="--wc:${col}" data-week="${w}">
      <span class="dot"></span>KW${w} · ${type}
    </div>`;
  });
  html += `</div>`;

  html += `<div class="stack" style="--wc:${wc}">
    <div class="stack-plates">`;
  for (let i = 0; i < total; i++) {
    html += `<div class="plate ${i < doneCount ? 'filled' : ''}" style="--wc:${wc}"></div>`;
  }
  html += `</div><div class="stack-label">${doneCount}/${total}</div></div>`;

  day.exercises.forEach(exo => {
    const st = state[day.id][activeWeek][exo.key];
    const wdata = exo.weeks[activeWeek];
    const hasTarget = !!wdata.vorgabe;
    html += `<div class="card ${st.done ? 'done' : ''}" data-key="${exo.key}">
      <div class="card-top">
        <div>
          <div class="ex-name">${exo.name}</div>
          <div class="ex-scheme">${exo.scheme}</div>
        </div>
        <button class="check-btn ${st.done ? 'checked' : ''}" data-action="toggle" data-key="${exo.key}">✓</button>
      </div>
      <div class="card-body">
        <div class="vorgabe-box" style="--wc:${wc}">
          <div class="vorgabe-label">Vorgabe</div>
          <div class="vorgabe-value" style="--wc:${wc}">${hasTarget ? wdata.vorgabe : '—'}</div>
        </div>
        <div class="ergebnis-box">
          <div class="ergebnis-label">Ergebnis</div>
          <input class="ergebnis-input" style="--wc:${wc}" data-action="input" data-key="${exo.key}"
            value="${st.ergebnis || ''}" placeholder="eintragen" ${hasTarget ? '' : 'disabled'} />
        </div>
      </div>
    </div>`;
  });

  if (day.cardio) {
    html += `<div class="cardio">
      <div class="cardio-label">Optional: <b>20 Min Cardio</b></div>
    </div>`;
  }

  html += `<div class="save-note" id="save-note"></div>`;

  app.innerHTML = html;
  attachHandlers();
}

function buildExportText() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('de-DE');
  let lines = [];
  lines.push('STAPEL — Ergebnisse');
  lines.push('Exportiert am: ' + dateStr);
  lines.push('');
  DAYS.forEach(day => {
    lines.push('== ' + day.id + ' — ' + day.label + ' ==');
    day.exercises.forEach(exo => {
      lines.push(exo.name + '  (' + exo.scheme + ')');
      WEEKS.forEach(w => {
        const wdata = exo.weeks[w];
        if (!wdata.vorgabe) { return; }
        const st = state[day.id][w][exo.key];
        const type = WEEK_TYPE[w];
        const erg = (st.ergebnis && st.ergebnis.trim()) ? st.ergebnis : '–';
        const mark = st.done ? '✓' : ' ';
        lines.push('  KW' + w + ' (' + type + ') [' + mark + ']  Vorgabe: ' + wdata.vorgabe + '   Ergebnis: ' + erg);
      });
      lines.push('');
    });
  });
  return lines.join('\n');
}

function openExport() {
  const text = buildExportText();
  document.getElementById('export-text').textContent = text;
  document.getElementById('export-overlay').classList.remove('hidden');
}

function closeExport() {
  document.getElementById('export-overlay').classList.add('hidden');
}

async function copyExport() {
  const text = document.getElementById('export-text').textContent;
  const btn = document.getElementById('export-copy');
  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch (e) {
    try {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('export-text'));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      ok = document.execCommand('copy');
      sel.removeAllRanges();
    } catch (e2) { ok = false; }
  }
  btn.textContent = ok ? 'Kopiert ✓' : 'Bitte manuell markieren & kopieren';
  btn.classList.toggle('copied', ok);
  setTimeout(() => {
    btn.textContent = 'In Zwischenablage kopieren';
    btn.classList.remove('copied');
  }, 1800);
}

function attachHandlers() {
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) exportBtn.addEventListener('click', openExport);
  document.querySelectorAll('.day-tab').forEach(el => {
    el.addEventListener('click', () => {
      activeDay = el.getAttribute('data-day');
      persistView();
      render();
    });
  });
  document.querySelectorAll('.week-tab').forEach(el => {
    el.addEventListener('click', () => {
      activeWeek = el.getAttribute('data-week');
      persistView();
      render();
    });
  });
  document.querySelectorAll('[data-action="toggle"]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.getAttribute('data-key');
      const st = state[activeDay][activeWeek][key];
      st.done = !st.done;
      scheduleSave();
      render();
    });
  });
  document.querySelectorAll('[data-action="input"]').forEach(el => {
    el.addEventListener('input', () => {
      const key = el.getAttribute('data-key');
      const st = state[activeDay][activeWeek][key];
      st.ergebnis = el.value;
      if (el.value && !st.done) { st.done = true; }
      scheduleSave();
    });
    el.addEventListener('blur', () => {
      render();
    });
  });
}

async function init() {
  document.getElementById('app').innerHTML = '<div style="padding:40px;text-align:center;color:#93969D;font-family:Inter,sans-serif;">Lädt…</div>';
  await loadState();
  render();
  // Persist silently so a migrated/seeded state is durably saved without
  // flashing the "gespeichert" note on every app launch.
  try { await window.stapelDB.set('stapel-state', state); } catch (e) { /* ignore */ }
  document.getElementById('export-close').addEventListener('click', closeExport);
  document.getElementById('export-copy').addEventListener('click', copyExport);
  document.getElementById('export-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'export-overlay') closeExport();
  });
}

init();

})();
