/* =============================================
   Gym Calendar - App de Rutina de Ejercicios
   Versión: 1.0.0
   ============================================= */

(function () {
  'use strict';

  // =============================================
  // DATA: Ejercicios organizados por día
  // =============================================
  const ROUTINE = [
    {
      id: 'dia1',
      day: 'Lunes',
      title: 'Empuje',
      subtitle: 'Pecho, Hombro anterior y Tríceps',
      gradient: 'linear-gradient(135deg, #e94560, #c23152)',
      exercises: [
        {
          id: 'd1e1',
          name: 'Press plano con mancuernas',
          muscle: 'Pecho',
          series: 3,
          reps: '10-12',
          repsMin: 10,
          repsMax: 12,
          rest: '90 seg',
          focus: 'Bloquea la retracción escapular; no estires los brazos al 100%.'
        },
        {
          id: 'd1e2',
          name: 'Press inclinado con mancuernas',
          muscle: 'Pecho (Superior)',
          series: 3,
          reps: '10-12',
          repsMin: 10,
          repsMax: 12,
          rest: '90 seg',
          focus: 'Usa cojines o banco a 30°-45°. Controla la bajada.'
        },
        {
          id: 'd1e3',
          name: 'Aperturas planas (Flyes)',
          muscle: 'Pecho',
          series: 3,
          reps: '12',
          repsMin: 12,
          repsMax: 12,
          rest: '60 seg',
          focus: 'Peso ligero. Codos un poco flexionados, como abrazando un árbol.'
        },
        {
          id: 'd1e4',
          name: 'Press militar sentado',
          muscle: 'Hombro',
          series: 3,
          reps: '10-12',
          repsMin: 10,
          repsMax: 12,
          rest: '90 seg',
          focus: 'Empuja hacia el techo desde la barbilla. Espalda recta.'
        },
        {
          id: 'd1e5',
          name: 'Extensión tras nuca (2 manos)',
          muscle: 'Tríceps',
          series: 3,
          reps: '12',
          repsMin: 12,
          repsMax: 12,
          rest: '60 seg',
          focus: 'Mantén los codos lo más cerrados y apuntando al frente que puedas.'
        }
      ]
    },
    {
      id: 'dia2',
      day: 'Miércoles',
      title: 'Tirón',
      subtitle: 'Espalda, Hombro posterior y Bíceps',
      gradient: 'linear-gradient(135deg, #0f3460, #1a5276)',
      exercises: [
        {
          id: 'd2e1',
          name: 'Máquina de remo (apoyo pecho)',
          muscle: 'Espalda (Grosor)',
          series: 3,
          reps: '10-12',
          repsMin: 10,
          repsMax: 12,
          rest: '90 seg',
          focus: 'No despegues el pecho. Piensa en dar un codazo hacia atrás.'
        },
        {
          id: 'd2e2',
          name: 'Remo a una mano (en banco)',
          muscle: 'Espalda (Dorsal)',
          series: 3,
          reps: '10-12',
          repsMin: 10,
          repsMax: 12,
          rest: '90 seg',
          focus: 'Recorrido en curva (J invertida) hacia el bolsillo del pantalón.'
        },
        {
          id: 'd2e3',
          name: 'Pájaro con mancuernas (sentado)',
          muscle: 'Hombro (Atrás)',
          series: 3,
          reps: '12',
          repsMin: 12,
          repsMax: 12,
          rest: '60 seg',
          focus: 'Peso muy ligero. Inclina el pecho hacia tus muslos.'
        },
        {
          id: 'd2e4',
          name: 'Curl de bíceps con mancuernas',
          muscle: 'Bíceps',
          series: 3,
          reps: '12',
          repsMin: 12,
          repsMax: 12,
          rest: '60 seg',
          focus: 'Codos pegados a los costados, prohibido balancear el cuerpo.'
        }
      ]
    },
    {
      id: 'dia3',
      day: 'Viernes',
      title: 'Pierna y Core',
      subtitle: 'Cuádriceps, Glúteo, Isquios, Hombro lateral y Abdomen',
      gradient: 'linear-gradient(135deg, #2ecc71, #1abc9c)',
      exercises: [
        {
          id: 'd3e1',
          name: 'Sentadillas (Libres o Goblet)',
          muscle: 'Cuádriceps / Glúteo',
          series: 3,
          reps: '12',
          repsMin: 12,
          repsMax: 12,
          rest: '90 seg',
          focus: 'Baja el trasero como si te sentaras en una silla baja. Espalda recta.'
        },
        {
          id: 'd3e2',
          name: 'Zancadas estáticas',
          muscle: 'Piernas en general',
          series: 3,
          reps: '10 (por pierna)',
          repsMin: 10,
          repsMax: 10,
          rest: '60 seg',
          focus: 'Da un paso al frente y baja de forma vertical, no hacia delante.'
        },
        {
          id: 'd3e3',
          name: 'Peso muerto rumano',
          muscle: 'Isquios / Glúteo',
          series: 3,
          reps: '10-12',
          repsMin: 10,
          repsMax: 12,
          rest: '90 seg',
          focus: 'Echa la cadera hacia atrás. Siente el estiramiento detrás del muslo.'
        },
        {
          id: 'd3e4',
          name: 'Elevaciones laterales',
          muscle: 'Hombro (Lateral)',
          series: 3,
          reps: '12-15',
          repsMin: 12,
          repsMax: 15,
          rest: '60 seg',
          focus: 'Sube los brazos hacia los lados. Peso ligero para dar forma al hombro.'
        },
        {
          id: 'd3e5',
          name: 'Plancha abdominal (Plank)',
          muscle: 'Abdomen (Core)',
          series: 3,
          reps: '20-40 seg',
          repsMin: 20,
          repsMax: 40,
          isTimed: true,
          rest: '60 seg',
          focus: 'Cuerpo recto como una tabla. Aprieta fuerte el abdomen y el glúteo.'
        },
        {
          id: 'd3e6',
          name: 'Crunch abdominal clásico',
          muscle: 'Abdomen',
          series: 2,
          reps: '15',
          repsMin: 15,
          repsMax: 15,
          rest: '—',
          focus: 'Enfócate en contraer el abdomen, no en subir el cuello. Manos detrás de las orejas sin tirar.'
        }
      ]
    }
  ];

  // =============================================
  // STATE: localStorage manager
  // =============================================
  const STORAGE_KEY = 'gym_calendar_data';

  function getDefaultState() {
    return {
      progress: {},   // { "d1e1": [ { weight, reps, date }, ... ] }
      completions: {}, // { "YYYY-MM-DD": { "d1e1": true, ... } }
      goalReps: {}     // { "d1e1": { series: [reps, reps, reps] } } - actual reps per series
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        return {
          progress: data.progress || {},
          completions: data.completions || {},
          goalReps: data.goalReps || {}
        };
      }
    } catch (e) {
      console.warn('Error loading state, resetting:', e);
    }
    return getDefaultState();
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  let state = loadState();

  function getTodayKey() {
    const d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function getTodayCompletions() {
    const key = getTodayKey();
    return state.completions[key] || {};
  }

  function toggleCompletion(exerciseId) {
    const key = getTodayKey();
    if (!state.completions[key]) {
      state.completions[key] = {};
    }
    if (state.completions[key][exerciseId]) {
      delete state.completions[key][exerciseId];
    } else {
      state.completions[key][exerciseId] = true;
      // Play sound + vibrate
      playCompleteSound();
      vibrate();
    }
    saveState(state);
    renderCurrentDay();
    updateProgress();
    updateDayBadges();
  }

  function saveWeight(exerciseId, weight) {
    if (!state.progress[exerciseId]) {
      state.progress[exerciseId] = [];
    }
    const entry = {
      weight: parseFloat(weight),
      date: getTodayKey()
    };
    // Don't add duplicate entries for same date
    const existing = state.progress[exerciseId];
    const last = existing[existing.length - 1];
    if (last && last.date === getTodayKey() && last.weight === entry.weight) {
      showToast('✓ Ya registrado: ' + weight + ' kg hoy');
      return; // Already logged today with same weight
    }
    state.progress[exerciseId].push(entry);
    saveState(state);
    renderCurrentDay();
    // Re-check suggestions with new weight
    scheduleSuggestionCheck();
    showToast('✓ Peso guardado: ' + weight + ' kg');
  }

  function getExerciseProgress(exerciseId) {
    return state.progress[exerciseId] || [];
  }

  function getLastWeight(exerciseId) {
    const p = getExerciseProgress(exerciseId);
    return p.length > 0 ? p[p.length - 1].weight : null;
  }

  function getSessionCount(exerciseId) {
    // Count unique dates
    const dates = new Set();
    getExerciseProgress(exerciseId).forEach(e => dates.add(e.date));
    return dates.size;
  }

  function getWeightSuggestion(exerciseId, currentWeight) {
    const history = getExerciseProgress(exerciseId);
    const exercise = findExercise(exerciseId);
    if (!exercise || history.length < 2) return null;

    // Get entries with the current weight
    const sameWeightEntries = history.filter(e => e.weight === currentWeight);
    if (sameWeightEntries.length < 2) return null;

    // Check if last two same-weight sessions were consecutive in the history
    const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastTwoSame = sorted.filter(e => e.weight === currentWeight).slice(-2);
    if (lastTwoSame.length < 2) return null;

    // Suggest increase
    const increment = currentWeight < 20 ? 2.5 : (currentWeight < 50 ? 2.5 : 5);
    const suggestedWeight = Math.round((currentWeight + increment) * 2) / 2;

    return {
      currentWeight,
      suggestedWeight,
      sessionsAtWeight: sameWeightEntries.length,
      increment
    };
  }

  function findExercise(exerciseId) {
    for (const day of ROUTINE) {
      for (const ex of day.exercises) {
        if (ex.id === exerciseId) return ex;
      }
    }
    return null;
  }

  // =============================================
  // SOUND & VIBRATION
  // =============================================
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return null;
      }
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playCompleteSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;

      // Pleasant two-tone "ding"
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.value = 880;
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.value = 1108.73; // C#6
      gain2.gain.setValueAtTime(0.01, ctx.currentTime);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio not available, silently fail
    }
  }

  function vibrate() {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    } catch (e) {
      // Vibration not supported
    }
  }

  // =============================================
  // UI: Toast notifications
  // =============================================
  let toastTimeout = null;

  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    clearTimeout(toastTimeout);
    el.textContent = msg;
    el.classList.add('show');
    toastTimeout = setTimeout(() => {
      el.classList.remove('show');
    }, 2000);
  }

  // =============================================
  // UI: Render
  // =============================================
  let currentDayIndex = 0;

  function getDayIndexForToday() {
    const dayMap = { 1: 0, 2: 0, 3: 1, 4: 1, 5: 2, 6: 2, 0: 2 };
    // Mon=1 Tue=2 Wed=3 Thu=4 Fri=5 Sat=6 Sun=0
    // We want: Mon -> 0, Wed -> 1, Fri -> 2. Other days -> closest
    const today = new Date().getDay();
    // Mon=1 (0), Wed=3 (1), Fri=5 (2)
    if (today === 1) return 0;
    if (today === 3) return 1;
    if (today === 5) return 2;
    // Otherwise find closest: Mon=1(0), Wed=3(1), Fri=5(2)
    if (today === 0 || today === 6) return 2; // Weekend -> Friday
    if (today === 2 || today === 4) {
      // Tue -> closest Mon
      if (today === 2) return 0;
      // Thu -> closest Wed
      return 1;
    }
    return 0;
  }

  function renderDaySelector() {
    const container = document.getElementById('daySelector');
    if (!container) return;

    container.innerHTML = '';
    ROUTINE.forEach((day, idx) => {
      const btn = document.createElement('button');
      btn.className = 'day-btn' + (idx === currentDayIndex ? ' active' : '');
      btn.dataset.index = idx;
      btn.innerHTML = `
        <span class="day-name">${day.day}</span>
        <span class="day-desc">${day.title}</span>
        <span class="day-badge" id="badge-${idx}"></span>
      `;
      btn.addEventListener('click', function () {
        currentDayIndex = idx;
        renderDaySelector();
        renderCurrentDay();
      });
      container.appendChild(btn);
    });

    // Scroll active into view
    const active = container.querySelector('.day-btn.active');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function updateDayBadges() {
    ROUTINE.forEach((day, idx) => {
      const badge = document.getElementById('badge-' + idx);
      if (!badge) return;
      const completions = getTodayCompletions();
      const done = day.exercises.filter(e => completions[e.id]).length;
      const total = day.exercises.length;
      if (done > 0) {
        badge.textContent = done + '/' + total;
        badge.classList.add('show');
      } else {
        badge.classList.remove('show');
      }
    });
  }

  function renderCurrentDay() {
    const container = document.getElementById('dayView');
    if (!container) return;

    const day = ROUTINE[currentDayIndex];
    if (!day) return;

    const completions = getTodayCompletions();
    const total = day.exercises.length;
    const done = day.exercises.filter(e => completions[e.id]).length;

    let html = `
      <div class="day-view-header">
        <h2>${day.day} — ${day.title}</h2>
        <p>${day.subtitle}</p>
      </div>
    `;

    day.exercises.forEach((ex, idx) => {
      const isCompleted = !!completions[ex.id];
      const lastWeight = getLastWeight(ex.id);
      const sessionCount = getSessionCount(ex.id);
      const progress = getExerciseProgress(ex.id);
      const lastEntry = progress.length > 0 ? progress[progress.length - 1] : null;

      html += `
        <div class="exercise-card ${isCompleted ? 'completed' : ''}" id="card-${ex.id}">
          <div class="exercise-top">
            <div class="exercise-info">
              <div class="exercise-name">${idx + 1}. ${ex.name}</div>
              <span class="exercise-muscle">${ex.muscle}</span>
            </div>
            <div class="exercise-check">
              <button class="check-btn ${isCompleted ? 'checked' : ''}" data-ex="${ex.id}" aria-label="Marcar ${ex.name} como completado">
                ${isCompleted ? '✓' : ''}
              </button>
            </div>
          </div>
          <div class="exercise-details">
            <div class="exercise-detail-item">
              <span class="icon">🔄</span>
              <span><span class="label">Series: </span><span class="value">${ex.series}</span></span>
            </div>
            <div class="exercise-detail-item">
              <span class="icon">🔁</span>
              <span><span class="label">Reps: </span><span class="value">${ex.reps}</span></span>
            </div>
            <div class="exercise-detail-item">
              <span class="icon">⏱️</span>
              <span><span class="label">Descanso: </span><span class="value">${ex.rest}</span></span>
            </div>
          </div>
          <div class="exercise-focus">
            <div class="focus-label">💡 Enfoque clave</div>
            ${ex.focus}
          </div>
          <div class="exercise-weight-section">
            <div class="weight-row">
              <div class="weight-input-group">
                <input type="number" class="weight-input" id="weight-${ex.id}" 
                       value="${lastWeight !== null ? lastWeight : ''}" 
                       placeholder="${lastWeight !== null ? lastWeight : '0'}" 
                       inputmode="decimal" step="0.5" min="0">
                <span class="weight-unit">kg</span>
              </div>
              <button class="weight-save-btn" data-ex="${ex.id}">Guardar peso</button>
            </div>
            <div class="weight-history" id="history-${ex.id}">
              ${renderWeightHistory(ex.id)}
            </div>
            <div id="suggestion-${ex.id}"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach event listeners
    day.exercises.forEach(ex => {
      // Check button
      const checkBtn = container.querySelector(`.check-btn[data-ex="${ex.id}"]`);
      if (checkBtn) {
        checkBtn.addEventListener('click', function () {
          toggleCompletion(ex.id);
        });
      }

      // Save weight button
      const saveBtn = container.querySelector(`.weight-save-btn[data-ex="${ex.id}"]`);
      const weightInput = container.querySelector(`#weight-${ex.id}`);
      if (saveBtn && weightInput) {
        saveBtn.addEventListener('click', function () {
          const val = weightInput.value.trim();
          if (val && parseFloat(val) >= 0) {
            saveWeight(ex.id, parseFloat(val));
          } else {
            showToast('Introduce un peso válido');
          }
        });
        weightInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            saveBtn.click();
          }
        });
      }
    });

    updateProgress();
    updateDayBadges();
  }

  function renderWeightHistory(exerciseId) {
    const progress = getExerciseProgress(exerciseId);
    const sessionCount = getSessionCount(exerciseId);
    const lastWeightVal = getLastWeight(exerciseId);

    let html = '';
    if (sessionCount > 0) {
      html += `<span class="stat">📊 <span class="stat-value">${sessionCount} ${sessionCount === 1 ? 'sesión' : 'sesiones'}</span></span>`;
    }
    if (lastWeightVal !== null) {
      html += `<span class="stat">🏋️ Último peso: <span class="stat-value">${lastWeightVal} kg</span></span>`;
    }

    // Show last 3 weight entries as a trend
    if (progress.length > 0) {
      const recent = progress.slice(-5);
      const trend = recent.map(e => e.weight + 'kg').join(' → ');
      html += `<span class="stat">📈 <span class="stat-value">${trend}</span></span>`;
    }

    return html;
  }

  function updateProgress() {
    const day = ROUTINE[currentDayIndex];
    if (!day) return;

    const completions = getTodayCompletions();
    const total = day.exercises.length;
    const done = day.exercises.filter(e => completions[e.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const text = document.getElementById('progressText');

    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = done + '/' + total + ' ejercicios';
    if (text) text.textContent = pct + '% completado';
  }

  // =============================================
  // UI: Weight suggestion (called after render)
  // =============================================
  function checkSuggestions() {
    const day = ROUTINE[currentDayIndex];
    if (!day) return;

    day.exercises.forEach(ex => {
      const container = document.getElementById('suggestion-' + ex.id);
      if (!container) return;

      const weightInput = document.getElementById('weight-' + ex.id);
      if (!weightInput) return;

      const currentWeight = weightInput.value.trim() !== ''
        ? parseFloat(weightInput.value.trim())
        : getLastWeight(ex.id);

      if (currentWeight === null || currentWeight <= 0) {
        container.innerHTML = '';
        return;
      }

      const suggestion = getWeightSuggestion(ex.id, currentWeight);
      if (suggestion) {
        container.innerHTML = `
          <div class="suggestion-banner">
            <span class="icon">🎯</span>
            <span>¡Buen trabajo! Llevas ${suggestion.sessionsAtWeight} sesiones con ${suggestion.currentWeight}kg. 
                   Prueba subir a <strong>${suggestion.suggestedWeight} kg</strong> la próxima vez.</span>
          </div>
        `;
      } else {
        container.innerHTML = '';
      }
    });
  }

  let suggestionTimer = null;

  function scheduleSuggestionCheck() {
    clearTimeout(suggestionTimer);
    suggestionTimer = setTimeout(function () {
      checkSuggestions();
    }, 150);
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    // Determine which day to show
    currentDayIndex = getDayIndexForToday();

    renderDaySelector();
    renderCurrentDay();
    updateProgress();
    updateDayBadges();

    // Check suggestions after render (weight inputs now have values)
    scheduleSuggestionCheck();

    // Listen for weight input changes to update suggestions
    document.addEventListener('input', function (e) {
      if (e.target && e.target.classList.contains('weight-input')) {
        scheduleSuggestionCheck();
      }
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (err) {
          console.warn('SW registration failed:', err);
        });
      });
    }

    console.log('🏋️ Gym Calendar initialized!');
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
