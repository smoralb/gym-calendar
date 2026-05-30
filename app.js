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
  // TAB SWITCHING
  // =============================================
  let currentTab = 'rutina';

  function switchTab(tab) {
    currentTab = tab;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Show/hide views
    var rutinaView = document.getElementById('rutinaView');
    var statsView = document.getElementById('statsView');
    if (tab === 'rutina') {
      rutinaView.style.display = '';
      statsView.style.display = 'none';
    } else {
      rutinaView.style.display = 'none';
      statsView.style.display = '';
      renderStats();
    }
  }

  // =============================================
  // STATS: Core data helpers
  // =============================================
  function getWorkoutDates() {
    return Object.keys(state.completions || {}).sort();
  }

  function getTotalWorkoutDays() {
    return getWorkoutDates().length;
  }

  function getExercisesCompletedTotal() {
    var total = 0;
    var completions = state.completions || {};
    for (var date in completions) {
      total += Object.keys(completions[date]).length;
    }
    return total;
  }

  function getTotalExerciseLogs() {
    var total = 0;
    for (var exId in state.progress) {
      total += state.progress[exId].length;
    }
    return total;
  }

  function getCurrentStreak() {
    var dates = getWorkoutDates();
    if (dates.length === 0) return 0;
    var streak = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there was a workout today or yesterday to count
    var dateSet = {};
    dates.forEach(function (d) { dateSet[d] = true; });

    // Walk backwards from today
    var checkDate = new Date(today);
    var maxLookback = 365;
    while (maxLookback > 0) {
      var key = checkDate.getFullYear() + '-' +
        String(checkDate.getMonth() + 1).padStart(2, '0') + '-' +
        String(checkDate.getDate()).padStart(2, '0');
      if (dateSet[key]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
        maxLookback--;
      } else {
        break;
      }
    }
    return streak;
  }

  function getWeeklyConsistency() {
    var dates = getWorkoutDates();
    var weeks = {};

    // Group by ISO week
    dates.forEach(function (dateStr) {
      var d = new Date(dateStr + 'T12:00:00');
      // Get Monday of that week
      var day = d.getDay();
      var diff = d.getDate() - day + (day === 0 ? -6 : 1);
      var monday = new Date(d);
      monday.setDate(diff);
      var weekKey = monday.getFullYear() + '-' +
        String(monday.getMonth() + 1).padStart(2, '0') + '-' +
        String(monday.getDate()).padStart(2, '0');

      if (!weeks[weekKey]) {
        weeks[weekKey] = { monday: monday, dates: [] };
      }
      weeks[weekKey].dates.push(dateStr);
    });

    // Get expected days per week (Mon, Wed, Fri = 3 possible)
    var weeklyData = [];
    for (var wk in weeks) {
      var dayNames = weeks[wk].dates.map(function (d) {
        var dt = new Date(d + 'T12:00:00');
        return dt.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
      });

      // Count how many of our training days (1=Mon, 3=Wed, 5=Fri)
      var mon = dayNames.indexOf(1) >= 0 ? 1 : 0;
      var wed = dayNames.indexOf(3) >= 0 ? 1 : 0;
      var fri = dayNames.indexOf(5) >= 0 ? 1 : 0;
      var attended = mon + wed + fri;

      weeklyData.push({
        weekStart: weeks[wk].monday,
        attended: attended,
        total: 3,
        mon: mon,
        wed: wed,
        fri: fri
      });
    }

    // Sort by week descending
    weeklyData.sort(function (a, b) { return b.weekStart - a.weekStart; });

    // Limit to last 8 weeks
    return weeklyData.slice(0, 8);
  }

  function getMuscleGroupStats() {
    var muscleCount = {};
    var completions = state.completions || {};

    for (var date in completions) {
      var dayCompletions = completions[date];
      for (var exId in dayCompletions) {
        var ex = findExercise(exId);
        if (ex) {
          var muscle = ex.muscle;
          if (!muscleCount[muscle]) muscleCount[muscle] = 0;
          muscleCount[muscle]++;
        }
      }
    }

    // Sort by count descending
    var sorted = [];
    for (var m in muscleCount) {
      sorted.push({ muscle: m, count: muscleCount[m] });
    }
    sorted.sort(function (a, b) { return b.count - a.count; });

    return sorted;
  }

  function getLastSessions(limit) {
    limit = limit || 10;
    var dates = getWorkoutDates().reverse();
    var sessions = [];
    var seen = 0;

    for (var i = 0; i < dates.length && seen < limit; i++) {
      var date = dates[i];
      var dayCompletions = state.completions[date] || {};
      var count = Object.keys(dayCompletions).length;
      if (count > 0) {
        // Determine which days
        var d = new Date(date + 'T12:00:00');
        var dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        var dayName = dayNames[d.getDay()];
        sessions.push({ date: date, dayName: dayName, count: count });
        seen++;
      }
    }
    return sessions;
  }

  function getAllExercisesWithProgress() {
    var list = [];
    for (var dayIdx = 0; dayIdx < ROUTINE.length; dayIdx++) {
      var day = ROUTINE[dayIdx];
      for (var exIdx = 0; exIdx < day.exercises.length; exIdx++) {
        var ex = day.exercises[exIdx];
        var p = getExerciseProgress(ex.id);
        if (p.length > 0) {
          list.push({ exercise: ex, dayTitle: day.title, dayIdx: dayIdx });
        }
      }
    }
    return list;
  }

  // =============================================
  // STATS: Render
  // =============================================
  function renderStats() {
    var container = document.getElementById('statsContent');
    if (!container) return;

    var totalDays = getTotalWorkoutDays();
    var totalExercises = getExercisesCompletedTotal();
    var totalLogs = getTotalExerciseLogs();
    var streak = getCurrentStreak();
    var weeklyData = getWeeklyConsistency();
    var muscleStats = getMuscleGroupStats();
    var sessions = getLastSessions(8);

    var topMuscle = muscleStats.length > 0 ? muscleStats[0].muscle : '—';

    var weeklyPct = 0;
    if (weeklyData.length > 0) {
      var totalAttended = 0;
      var totalPossible = 0;
      weeklyData.forEach(function (w) {
        totalAttended += w.attended;
        totalPossible += w.total;
      });
      weeklyPct = totalPossible > 0 ? Math.round((totalAttended / totalPossible) * 100) : 0;
    }

    var html = '';

    // ---- Overview Cards ----
    html += '<div class="stats-grid">';
    html += '<div class="stat-card highlight">';
    html += '<div class="stat-icon">📅</div>';
    html += '<div class="stat-number">' + totalDays + '</div>';
    html += '<div class="stat-label">Días de gym</div>';
    html += '</div>';
    html += '<div class="stat-card">';
    html += '<div class="stat-icon">🔥</div>';
    html += '<div class="stat-number">' + streak + '</div>';
    html += '<div class="stat-label">Racha actual</div>';
    html += streak > 0 ? '<div class="stat-sub">días seguidos</div>' : '';
    html += '</div>';
    html += '<div class="stat-card">';
    html += '<div class="stat-icon">✅</div>';
    html += '<div class="stat-number">' + totalExercises + '</div>';
    html += '<div class="stat-label">Ejercicios hechos</div>';
    html += '</div>';
    html += '<div class="stat-card">';
    html += '<div class="stat-icon">📊</div>';
    html += '<div class="stat-number">' + weeklyPct + '%</div>';
    html += '<div class="stat-label">Consistencia semanal</div>';
    html += '<div class="stat-sub">' + weeklyData.length + ' semanas</div>';
    html += '</div>';
    html += '</div>';

    // ---- Attendance Calendar ----
    html += renderAttendanceCalendar();

    // ---- Weekly Consistency ----
    html += '<div class="stats-section-title">📆 Consistencia semanal <span class="line"></span></div>';
    html += '<div class="weekly-list">';
    if (weeklyData.length === 0) {
      html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:0.78rem;">Aún no hay datos. ¡Empieza tu rutina!</div>';
    } else {
      weeklyData.forEach(function (w) {
        var weekLabel = formatDateShort(w.weekStart);
        var pct = Math.round((w.attended / w.total) * 100);
        html += '<div class="weekly-row">';
        html += '<span class="week-label">' + weekLabel + '</span>';
        html += '<div class="week-days">';
        html += '<span class="week-dot ' + (w.mon ? 'done' : '') + '">L</span>';
        html += '<span class="week-dot ' + (w.wed ? 'done' : '') + '">M</span>';
        html += '<span class="week-dot ' + (w.fri ? 'done' : '') + '">V</span>';
        html += '</div>';
        html += '<span class="week-count">' + w.attended + '/3 (' + pct + '%)</span>';
        html += '</div>';
      });
    }
    html += '</div>';

    // ---- Weight Progression Chart ----
    html += '<div class="stats-section-title">🏋️ Evolución de peso <span class="line"></span></div>';

    var exercisesWithData = getAllExercisesWithProgress();
    if (exercisesWithData.length === 0) {
      html += '<div class="chart-container">';
      html += '<div class="chart-empty"><div class="icon">📈</div><p>Registra tus pesos en la rutina para ver la evolución aquí.</p></div>';
      html += '</div>';
    } else {
      html += '<select class="exercise-selector" id="chartExerciseSelect">';
      exercisesWithData.forEach(function (item, idx) {
        html += '<option value="' + item.exercise.id + '">' + item.dayTitle + ': ' + item.exercise.name + '</option>';
      });
      html += '</select>';
      html += '<div class="chart-container">';
      html += '<div class="chart-title" id="chartTitle">Progresión de peso</div>';
      html += '<div class="chart-canvas-wrapper">';
      html += '<canvas id="weightChart" width="400" height="220"></canvas>';
      html += '</div>';
      html += '<div class="chart-stats-row" id="chartStats"></div>';
      html += '</div>';
    }

    // ---- Most trained muscles ----
    if (muscleStats.length > 0) {
      html += '<div class="stats-section-title">💪 Grupos musculares más trabajados <span class="line"></span></div>';
      html += '<div class="session-list">';
      var showMuscles = muscleStats.slice(0, 6);
      showMuscles.forEach(function (m) {
        html += '<div class="session-item">';
        html += '<span class="session-date">' + m.muscle + '</span>';
        html += '<span class="session-count">' + m.count + ' ejercicios</span>';
        html += '</div>';
      });
      html += '</div>';
    }

    // ---- Last sessions ----
    html += '<div class="stats-section-title">🕐 Últimas sesiones <span class="line"></span></div>';
    html += '<div class="session-list">';
    if (sessions.length === 0) {
      html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:0.78rem;">Aún no hay sesiones registradas.</div>';
    } else {
      sessions.forEach(function (s) {
        var d = new Date(s.date + 'T12:00:00');
        var formatted = formatDateShort(d) + ' (' + s.dayName + ')';
        html += '<div class="session-item">';
        html += '<span class="session-date">' + formatted + '</span>';
        html += '<span class="session-count">' + s.count + ' ej.</span>';
        html += '</div>';
      });
    }
    html += '</div>';

    container.innerHTML = html;

    // ---- Setup chart ----
    if (exercisesWithData.length > 0) {
      var select = document.getElementById('chartExerciseSelect');
      setupChart(select.value);
      select.addEventListener('change', function () {
        setupChart(select.value);
      });
    }
  }

  // =============================================
  // STATS: Attendance Calendar (month view)
  // =============================================
  function renderAttendanceCalendar() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var daysInMonth = lastDay.getDate();
    var startOffset = firstDay.getDay(); // 0=Sun

    // Build date key set for quick lookup
    var attendedSet = {};
    var completions = state.completions || {};
    for (var dateKey in completions) {
      var exCount = Object.keys(completions[dateKey]).length;
      attendedSet[dateKey] = exCount;
    }

    var todayKey = getTodayKey();
    var dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

    var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    var html = '<div class="attendance-calendar">';
    html += '<div class="calendar-header">';
    html += '<h3>📅 ' + monthNames[month] + ' ' + year + '</h3>';
    html += '</div>';
    html += '<div class="calendar-grid">';

    // Day labels
    dayNames.forEach(function (n) {
      html += '<div class="calendar-day-label">' + n + '</div>';
    });

    // Empty cells before first day
    for (var i = 0; i < startOffset; i++) {
      html += '<div class="calendar-day other-month"></div>';
    }

    // Days
    for (var day = 1; day <= daysInMonth; day++) {
      var cellDate = year + '-' +
        String(month + 1).padStart(2, '0') + '-' +
        String(day).padStart(2, '0');
      var isToday = cellDate === todayKey;
      var attended = attendedSet[cellDate];

      var cls = 'calendar-day';
      if (isToday) cls += ' today';
      if (attended && attended >= 3) cls += ' attended';
      else if (attended && attended > 0) cls += ' attended-some';

      var label = '';
      if (attended) label = '✓';
      else if (isToday) label = day;

      html += '<div class="' + cls + '" title="' + cellDate + '">' + (label || day) + '</div>';
    }

    html += '</div>';

    // Legend
    html += '<div class="calendar-legend">';
    html += '<span class="calendar-legend-item"><span class="legend-box" style="background:var(--accent-green);"></span> Completo</span>';
    html += '<span class="calendar-legend-item"><span class="legend-box" style="background:rgba(46,204,113,0.3);"></span> Parcial</span>';
    html += '<span class="calendar-legend-item"><span class="legend-box" style="background:transparent;border:1px solid var(--border-color);"></span> Hoy</span>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  // =============================================
  // STATS: Weight Chart (Canvas)
  // =============================================
  function setupChart(exerciseId) {
    var canvas = document.getElementById('weightChart');
    if (!canvas) return;

    var progress = getExerciseProgress(exerciseId);
    var exercise = findExercise(exerciseId);
    if (!exercise || progress.length === 0) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Sort by date
    var sorted = progress.slice().sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    var titleEl = document.getElementById('chartTitle');
    if (titleEl) titleEl.textContent = exercise.name;

    // Draw chart
    drawWeightChart(canvas, sorted, exercise);

    // Update stats
    var statsEl = document.getElementById('chartStats');
    if (statsEl) {
      var firstW = sorted[0].weight;
      var lastW = sorted[sorted.length - 1].weight;
      var maxW = sorted.reduce(function (m, e) { return Math.max(m, e.weight); }, 0);
      var minW = sorted.reduce(function (m, e) { return Math.min(m, e.weight); }, maxW);
      var diff = lastW - firstW;
      var diffClass = diff > 0 ? 'up' : (diff < 0 ? 'down' : '');
      var diffSign = diff > 0 ? '+' : '';

      statsEl.innerHTML =
        '<span class="chart-stat-item">📈 Progreso total: <span class="value ' + diffClass + '">' + diffSign + diff.toFixed(1) + ' kg</span></span>' +
        '<span class="chart-stat-item">⬆️ Máximo: <span class="value">' + maxW + ' kg</span></span>' +
        '<span class="chart-stat-item">⬇️ Mínimo: <span class="value">' + minW + ' kg</span></span>' +
        '<span class="chart-stat-item">📊 Registros: <span class="value">' + sorted.length + '</span></span>';
    }
  }

  function drawWeightChart(canvas, data, exercise) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var pad = { top: 18, right: 16, bottom: 32, left: 40 };
    var chartW = W - pad.left - pad.right;
    var chartH = H - pad.top - pad.bottom;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Find min/max for Y axis
    var values = data.map(function (e) { return e.weight; });
    var minVal = Math.min.apply(null, values);
    var maxVal = Math.max.apply(null, values);
    var range = maxVal - minVal;

    // Add padding to range (10% each side, min 2kg)
    var yPad = Math.max(range * 0.1, 2);
    var yMin = Math.max(0, Math.floor((minVal - yPad) / 2.5) * 2.5);
    var yMax = Math.ceil((maxVal + yPad) / 2.5) * 2.5;
    var yRange = yMax - yMin;

    // X axis: date labels
    var labels = data.map(function (e) {
      var d = new Date(e.date + 'T12:00:00');
      return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
    });

    // ---- Grid lines ----
    ctx.strokeStyle = '#1e2a45';
    ctx.lineWidth = 0.5;

    var ySteps = 4;
    for (var yi = 0; yi <= ySteps; yi++) {
      var yVal = yMin + (yi / ySteps) * yRange;
      var yPos = pad.top + chartH - ((yVal - yMin) / yRange) * chartH;

      ctx.beginPath();
      ctx.moveTo(pad.left, yPos);
      ctx.lineTo(W - pad.right, yPos);
      ctx.stroke();

      // Y label
      ctx.fillStyle = '#6a6a80';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      var label = yVal % 1 === 0 ? yVal.toString() : yVal.toFixed(1);
      ctx.fillText(label, pad.left - 6, yPos);
    }

    // ---- Line ----
    if (data.length < 2) {
      // Single point, just draw a dot
      var x1 = pad.left + chartW / 2;
      var y1 = pad.top + chartH - ((data[0].weight - yMin) / yRange) * chartH;
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#e94560';
      ctx.fill();
      return;
    }

    // Calculate X positions
    var xPositions = [];
    for (var i = 0; i < data.length; i++) {
      var x = pad.left + (i / (data.length - 1)) * chartW;
      xPositions.push(x);
    }

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#e94560';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    for (var i = 0; i < data.length; i++) {
      var yVal = data[i].weight;
      var yPos = pad.top + chartH - ((yVal - yMin) / yRange) * chartH;
      if (i === 0) ctx.moveTo(xPositions[i], yPos);
      else ctx.lineTo(xPositions[i], yPos);
    }
    ctx.stroke();

    // Gradient fill under line
    var lastX = xPositions[xPositions.length - 1];
    var firstX = xPositions[0];
    ctx.lineTo(lastX, pad.top + chartH);
    ctx.lineTo(firstX, pad.top + chartH);
    ctx.closePath();

    var gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, 'rgba(233, 69, 96, 0.15)');
    gradient.addColorStop(1, 'rgba(233, 69, 96, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw dots
    for (var i = 0; i < data.length; i++) {
      var yVal = data[i].weight;
      var yPos = pad.top + chartH - ((yVal - yMin) / yRange) * chartH;

      // Outer circle (glow)
      ctx.beginPath();
      ctx.arc(xPositions[i], yPos, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(233, 69, 96, 0.15)';
      ctx.fill();

      // Inner circle
      ctx.beginPath();
      ctx.arc(xPositions[i], yPos, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#e94560';
      ctx.fill();

      // White center
      ctx.beginPath();
      ctx.arc(xPositions[i], yPos, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // X label (skip if too many)
      if (data.length <= 10 || i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)) {
        ctx.fillStyle = '#6a6a80';
        ctx.font = '9px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], xPositions[i], pad.top + chartH + 6);
      }
    }

    // Show weight on last point
    var lastWeight = data[data.length - 1].weight;
    var lastY = pad.top + chartH - ((lastWeight - yMin) / yRange) * chartH;
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 11px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(lastWeight + ' kg', xPositions[xPositions.length - 1] + 8, lastY - 4);
  }

  // =============================================
  // UTILITIES
  // =============================================
  function formatDateShort(d) {
    var day = String(d.getDate()).padStart(2, '0');
    var month = String(d.getMonth() + 1).padStart(2, '0');
    return day + '/' + month;
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

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTab(btn.dataset.tab);
      });
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
