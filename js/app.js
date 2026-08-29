(function () {

const WEEKS = ['36', '37', '38', '39', '40', '41', '42'];
const WEEK_TYPE = { 36: 'Deload', 37: 'Volumen', 38: 'Intensität', 39: 'Volumen', 40: 'Maximum', 41: 'Volumen', 42: 'Deload' };
const WEEK_COLOR = {
  'Deload': 'var(--accent-deload)',
  'Volumen': 'var(--accent-v)',
  'Intensität': 'var(--accent-i)',
  'Maximum': 'var(--accent-m)'
};

// weeks: { '36': [vorgabe, ergebnis?], '37': [...], ... }
function ex(key, name, scheme, weeks) {
  const w = {};
  Object.keys(weeks).forEach(week => {
    const [vorgabe, ergebnis] = weeks[week];
    w[week] = { vorgabe, ergebnis: ergebnis || '' };
  });
  return { key, name, scheme, weeks: w };
}

const DAYS = [
  {
    id: 'A', label: 'Push', cardio: true,
    exercises: [
      ex('bankdruecken-lh', 'Bankdrücken (LH)', '4×8/5/8/5/8', {
        36: ['40×8'], 37: ['67,5×8'], 38: ['75×5'], 39: ['70×8'], 40: ['80×5'], 41: ['72,5×8'], 42: ['47,5×8']
      }),
      ex('kh-flys', 'KH Flys', '3×12', {
        36: ['8×12'], 37: ['12×12'], 38: ['14×12'], 39: ['13×12'], 40: ['15×12'], 41: ['13×12'], 42: ['8×12']
      }),
      ex('schraegbank-kh', 'Schrägbank (KH)', '3×8/5/8/5/8', {
        36: ['16×8'], 37: ['27×8'], 38: ['30×5'], 39: ['28×8'], 40: ['32×5'], 41: ['29×8'], 42: ['20×8']
      }),
      ex('kh-kickbacks', 'KH Kickbacks', '3×12', {
        36: ['8×12'], 37: ['12×12'], 38: ['14×12'], 39: ['13×12'], 40: ['15×12'], 41: ['13×12'], 42: ['8×12']
      }),
      ex('dips', 'Dips', '3×8/5/8/5/8', {
        36: ['KG×8'], 37: ['KG×8'], 38: ['+15kg×5'], 39: ['KG×8'], 40: ['+20kg×5'], 41: ['KG×8'], 42: ['KG×5']
      }),
      ex('plank', 'Plank', '3×—', {
        36: ['30 Sek'], 37: ['55 Sek'], 38: ['60 Sek'], 39: ['55 Sek'], 40: ['65 Sek'], 41: ['60 Sek'], 42: ['40 Sek']
      }),
      ex('beinheben', 'Beinheben', '3×15', {
        36: ['10 Wdh'], 37: ['15 Wdh'], 38: ['15 Wdh'], 39: ['15 Wdh'], 40: ['15 Wdh'], 41: ['15 Wdh'], 42: ['10 Wdh']
      })
    ]
  },
  {
    id: 'B', label: 'Pull', cardio: true,
    exercises: [
      ex('kreuzheben', 'Kreuzheben (LH)', '4×8/5/8/5/8', {
        36: ['45×8'], 37: ['77,5×8'], 38: ['85×5'], 39: ['80×8'], 40: ['90×5'], 41: ['82,5×8'], 42: ['55×8']
      }),
      ex('reverse-flys', 'Reverse Flys (KH)', '2×12', {
        36: ['6×12'], 37: ['10×12'], 38: ['12×12'], 39: ['11×12'], 40: ['13×12'], 41: ['11×12'], 42: ['7×12']
      }),
      ex('latzug-weit', 'Latzug (weit)', '4×8/5/8/5/8', {
        36: ['40×8'], 37: ['72,5×8'], 38: ['80×5'], 39: ['75×8'], 40: ['85×5'], 41: ['77,5×8'], 42: ['50×8']
      }),
      ex('bizeps-curl-sz', 'Bizeps Curl (SZ)', '3×8/5/8/5/8', {
        36: ['37,5×8'], 37: ['60×8'], 38: ['70×5'], 39: ['65×8'], 40: ['75×5'], 41: ['70×8'], 42: ['45×8']
      }),
      ex('pendlay-row-lh', 'Pendlay Row (LH)', '3×8/5/8/5/8', {
        36: ['35×8'], 37: ['55×8'], 38: ['62,5×5'], 39: ['57,5×8'], 40: ['67,5×5'], 41: ['60×8'], 42: ['40×8']
      }),
      ex('hammer-curl', 'Hammer Curl (KH)', '3×12', {
        36: ['10×12'], 37: ['16×12'], 38: ['18×12'], 39: ['16×12'], 40: ['18×12'], 41: ['17×12'], 42: ['10×12']
      }),
      ex('kh-rudern-einarmig', 'KH Rudern einarmig', '3×8/5/8/5/8', {
        36: ['12×8'], 37: ['20×8'], 38: ['24×5'], 39: ['22×8'], 40: ['26×5'], 41: ['24×8'], 42: ['14×8']
      }),
      ex('crunches-kabel', 'Crunches (Kabel)', '3×15', {
        36: ['37,5×15'], 37: ['60×15'], 38: ['70×15'], 39: ['65×15'], 40: ['75×15'], 41: ['67,5×15'], 42: ['40×15']
      })
    ]
  },
  {
    id: 'C', label: 'Schultern + Beine', cardio: true,
    exercises: [
      ex('kniebeugen-lh', 'Kniebeugen (LH)', '4×8/5/8/5/8', {
        36: ['35×8'], 37: ['55×8'], 38: ['65×5'], 39: ['57,5×8'], 40: ['70×5'], 41: ['60×8'], 42: ['40×8']
      }),
      ex('seitheben-kh', 'Seitheben (KH)', '3×12', {
        36: ['8×12'], 37: ['12×12'], 38: ['14×12'], 39: ['12×12'], 40: ['14×12'], 41: ['12×12'], 42: ['8×12']
      }),
      ex('rum-kreuzheben-lh', 'Rum. Kreuzheben (LH)', '3×8/5/8/5/8', {
        36: ['37,5×8'], 37: ['60×8'], 38: ['70×5'], 39: ['62,5×8'], 40: ['75×5'], 41: ['65×8'], 42: ['42,5×8']
      }),
      ex('kh-schulterdruecken', 'KH Schulterdrücken', '4×8/5/8/5/8', {
        36: ['12×8'], 37: ['18×8'], 38: ['22×5'], 39: ['20×8'], 40: ['25×5'], 41: ['21×8'], 42: ['15×8']
      }),
      ex('beinbeuger', 'Beinbeuger sitzend', '3×8/5/8/5/8', {
        36: ['30×8'], 37: ['50×8'], 38: ['55×5'], 39: ['52,5×8'], 40: ['60×5'], 41: ['55×8'], 42: ['37,5×8']
      }),
      ex('frontheben-kh', 'Frontheben (KH)', '2×12', {
        36: ['6×12'], 37: ['10×12'], 38: ['12×12'], 39: ['10×12'], 40: ['12×12'], 41: ['11×12'], 42: ['7×12']
      }),
      ex('hip-thrust-lh', 'Hip Thrust (LH)', '3×8/5/8/5/8', {
        36: ['37,5×8'], 37: ['60×8'], 38: ['70×5'], 39: ['62,5×8'], 40: ['75×5'], 41: ['65×8'], 42: ['42,5×8']
      }),
      ex('ausfallschritte', 'Ausfallschritte (KH)', '3×10/Seite', {
        36: ['8×10'], 37: ['12×10'], 38: ['14×10'], 39: ['12×10'], 40: ['16×10'], 41: ['13×10'], 42: ['8×10']
      }),
      ex('wadenheben', 'Wadenheben', '3×15', {
        36: ['22,5×15'], 37: ['35×15'], 38: ['40×15'], 39: ['37,5×15'], 40: ['42,5×15'], 41: ['40×15'], 42: ['25×15']
      })
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
let activeWeek = '36';
let saveTimeout = null;

function seedDefaults() {
  DAYS.forEach(day => {
    WEEKS.forEach(w => {
      if (!state[day.id][w]) state[day.id][w] = {};
      day.exercises.forEach(exo => {
        const existing = state[day.id][w][exo.key];
        const orig = exo.weeks[w].ergebnis;
        // Adopt the built-in default not just when nothing is stored yet,
        // but also when a blank/untouched placeholder is sitting there
        // (e.g. after a data reset) and a real recorded value exists in
        // code - that placeholder isn't something the user deliberately
        // entered, so it's safe to fill in.
        const isBlankPlaceholder = existing && !existing.ergebnis && !existing.done;
        if (!existing || (isBlankPlaceholder && orig)) {
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

function downloadBackup() {
  const payload = {
    app: 'stapel',
    version: 1,
    exportedAt: new Date().toISOString(),
    state
  };
  const dateStr = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stapel-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function restoreFromFile(file) {
  let parsed;
  try {
    const text = await file.text();
    parsed = JSON.parse(text);
  } catch (e) {
    alert('Diese Datei konnte nicht gelesen werden. Ist es eine gültige Stapel-Sicherung?');
    return;
  }

  if (!parsed || typeof parsed !== 'object' || !parsed.state || typeof parsed.state !== 'object') {
    alert('Diese Datei sieht nicht wie eine Stapel-Sicherung aus.');
    return;
  }

  const ok = confirm('Aktuelle Daten in der App durch diese Sicherung ersetzen? Das kann nicht rückgängig gemacht werden.');
  if (!ok) return;

  state = Object.assign({ A: {}, B: {}, C: {} }, migrateLegacyIndexState(parsed.state));
  seedDefaults();
  await persist();
  render();
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
      <div class="subtitle">Wave-Periodisierung · Block 3 · KW36–KW42</div>
    </div>
  </div>`;

  html += `<div class="toolbar">
    <button class="toolbar-btn" id="export-btn">Export</button>
    <button class="toolbar-btn" id="backup-btn">Sichern</button>
    <button class="toolbar-btn" id="restore-btn">Wiederherstellen</button>
    <input type="file" id="restore-file-input" accept="application/json" style="display:none" />
  </div>`;

  html += `<div class="day-tabs">`;
  DAYS.forEach(d => {
    html += `<div class="day-tab ${d.id === activeDay ? 'active' : ''}" data-day="${d.id}">
      ${d.id} — ${d.label.split(' ')[0]}<span class="sub">${d.label}</span>
    </div>`;
  });
  html += `</div>`;

  html += `<div class="week-select-wrap" style="--wc:${wc}">
    <select id="week-select" class="week-select">`;
  WEEKS.forEach(w => {
    const type = WEEK_TYPE[w];
    html += `<option value="${w}" ${w === activeWeek ? 'selected' : ''}>KW${w} · ${type}</option>`;
  });
  html += `</select>
  </div>`;

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
  const backupBtn = document.getElementById('backup-btn');
  if (backupBtn) backupBtn.addEventListener('click', downloadBackup);
  const restoreBtn = document.getElementById('restore-btn');
  const restoreFileInput = document.getElementById('restore-file-input');
  if (restoreBtn && restoreFileInput) {
    restoreBtn.addEventListener('click', () => restoreFileInput.click());
    restoreFileInput.addEventListener('change', () => {
      const file = restoreFileInput.files && restoreFileInput.files[0];
      if (file) restoreFromFile(file);
      restoreFileInput.value = '';
    });
  }
  document.querySelectorAll('.day-tab').forEach(el => {
    el.addEventListener('click', () => {
      activeDay = el.getAttribute('data-day');
      persistView();
      render();
    });
  });
  const weekSelect = document.getElementById('week-select');
  if (weekSelect) {
    weekSelect.addEventListener('change', () => {
      activeWeek = weekSelect.value;
      persistView();
      render();
    });
  }
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
      // Defer to the next tick so a click landing on another control at
      // the same moment (e.g. a toolbar button right after editing a
      // field) still reaches its target before this re-render replaces it.
      setTimeout(render, 0);
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
