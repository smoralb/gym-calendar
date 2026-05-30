/* =============================================
   Gym Calendar - App de Rutina de Ejercicios
   Versión: 2.0.0
   ============================================= */

(function () {
  'use strict';

  // =============================================
  // DATA: Ejercicios organizados por día
  // =============================================
  var ROUTINE = [
    {
      id: 'dia1',
      day: 'Empuje',
      title: 'Pecho, Hombro anterior y Tríceps',
      emoji: '🔥',
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
      day: 'Tirón',
      title: 'Espalda, Hombro posterior y Bíceps',
      emoji: '💪',
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
      day: 'Pierna',
      title: 'Cuádriceps, Glúteo, Isquios, Hombro lateral y Abdomen',
      emoji: '🦵',
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
  var STORAGE_KEY = 'gym_calendar_data';

  function getDefaultState() {
    return {
      progress: {},
      completions: {}
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        return {
          progress: data.progress || {},
          completions: data.completions || {}
        };
      }
    } catch (e) {
      console.warn('Error loading state, resetting:', e);
    }
    return getDefaultState();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  var state = loadState();

  function getTodayKey() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function getDateKey(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function getTodayCompletions() {
    var key = getTodayKey();
    return state.completions[key] || {};
  }

  function getCompletionsForDate(dateKey) {
    return state.completions[dateKey] || {};
  }

  function toggleCompletion(exerciseId) {
    var key = getTodayKey();
    if (!state.completions[key]) {
      state.completions[key] = {};
    }
    if (state.completions[key][exerciseId]) {
      delete state.completions[key][exerciseId];
    } else {
      state.completions[key][exerciseId] = true;
      playCompleteSound();
      vibrate();
    }
    saveState();
    renderCurrentDay();
    updateAll();
  }

  function saveWeight(exerciseId, weight) {
    if (!state.progress[exerciseId]) {
      state.progress[exerciseId] = [];
    }
    var entry = {
      weight: parseFloat(weight),
      date: getTodayKey()
    };
    var existing = state.progress[exerciseId];
    var last = existing[existing.length - 1];
    if (last && last.date === getTodayKey() && last.weight === entry.weight) {
      showToast('✓ Ya registrado: ' + weight + ' kg hoy');
      return;
    }
    state.progress[exerciseId].push(entry);
    saveState();
    renderCurrentDay();
    scheduleSuggestionCheck();
    showToast('✓ Peso guardado: ' + weight + ' kg');
  }

  function getExerciseProgress(exerciseId) {
    return state.progress[exerciseId] || [];
  }

  function getLastWeight(exerciseId) {
    var p = getExerciseProgress(exerciseId);
    return p.length > 0 ? p[p.length - 1].weight : null;
  }

  function getSessionCount(exerciseId) {
    var dates = new Set();
    getExerciseProgress(exerciseId).forEach(function (e) { dates.add(e.date); });
    return dates.size;
  }

  function getWeightSuggestion(exerciseId, currentWeight) {
    var history = getExerciseProgress(exerciseId);
    var exercise = findExercise(exerciseId);
    if (!exercise || history.length < 2) return null;

    var sameWeightEntries = history.filter(function (e) { return e.weight === currentWeight; });
    if (sameWeightEntries.length < 2) return null;

    var sorted = history.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    var lastTwoSame = sorted.filter(function (e) { return e.weight === currentWeight; }).slice(-2);
    if (lastTwoSame.length < 2) return null;

    var increment = currentWeight < 20 ? 2.5 : (currentWeight < 50 ? 2.5 : 5);
    var suggestedWeight = Math.round((currentWeight + increment) * 2) / 2;

    return {
      currentWeight: currentWeight,
      suggestedWeight: suggestedWeight,
      sessionsAtWeight: sameWeightEntries.length,
      increment: increment
    };
  }

  function findExercise(exerciseId) {
    for (var d = 0; d < ROUTINE.length; d++) {
      for (var e = 0; e < ROUTINE[d].exercises.length; e++) {
        if (ROUTINE[d].exercises[e].id === exerciseId) return ROUTINE[d].exercises[e];
      }
    }
    return null;
  }

  function findExerciseDay(exerciseId) {
    for (var d = 0; d < ROUTINE.length; d++) {
      for (var e = 0; e < ROUTINE[d].exercises.length; e++) {
        if (ROUTINE[d].exercises[e].id === exerciseId) return d;
      }
    }
    return -1;
  }

  // =============================================
  // ROUTINE ROTATION LOGIC (un día sí, otro no)
  // =============================================
  function getWorkoutDates() {
    return Object.keys(state.completions || {}).sort();
  }

  function getLastWorkoutDate() {
    var dates = getWorkoutDates();
    return dates.length > 0 ? dates[dates.length - 1] : null;
  }

  function getRoutineForDate(dateKey) {
    var dayCompletions = state.completions[dateKey];
    if (!dayCompletions) return null;
    var counts = [0, 0, 0];
    for (var exId in dayCompletions) {
      var idx = findExerciseDay(exId);
      if (idx >= 0) counts[idx]++;
    }
    var maxIdx = 0;
    for (var i = 1; i < 3; i++) {
      if (counts[i] > counts[maxIdx]) maxIdx = i;
    }
    return counts[maxIdx] > 0 ? maxIdx : null;
  }

  function getTodayRoutine() {
    var today = getTodayKey();
    var todayCompletions = getTodayCompletions();
    var hasDoneAny = false;
    for (var k in todayCompletions) { hasDoneAny = true; break; }

    if (hasDoneAny) {
      // Already worked out today, show current routine
      var routineIdx = getRoutineForDate(today);
      return routineIdx !== null ? routineIdx : -1;
    }

    var lastDate = getLastWorkoutDate();
    if (!lastDate) return 0; // No history → start with Push

    var last = new Date(lastDate + 'T12:00:00');
    var now = new Date(today + 'T12:00:00');
    var diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      // Worked out yesterday → rest
      return -1;
    }

    // Worked out 2+ days ago → next in rotation
    var lastRoutine = getRoutineForDate(lastDate);
    if (lastRoutine === null) return 0;
    return (lastRoutine + 1) % 3;
  }

  // =============================================
  // SOUND & VIBRATION
  // =============================================
  var audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playCompleteSound() {
    try {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.value = 880;
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      var osc2 = ctx.createOscillator();
      var gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.value = 1108.73;
      gain2.gain.setValueAtTime(0.01, ctx.currentTime);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  function vibrate() {
    try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) {}
  }

  // =============================================
  // UI: Toast
  // =============================================
  var toastTimeout = null;

  function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    clearTimeout(toastTimeout);
    el.textContent = msg;
    el.classList.add('show');
    toastTimeout = setTimeout(function () { el.classList.remove('show'); }, 2000);
  }

  // =============================================
  // UI: Tab switching
  // =============================================
  var currentTab = 'rutina';

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    document.getElementById('homeView').style.display = tab === 'home' ? '' : 'none';
    document.getElementById('rutinaView').style.display = tab === 'rutina' ? '' : 'none';
    document.getElementById('statsView').style.display = tab === 'stats' ? '' : 'none';

    if (tab === 'home') renderHome();
    if (tab === 'stats') renderStats();
  }

  // =============================================
  // UI: Routine header (today / rest indicator)
  // =============================================
  function getSkippedExercisesFromLastSession() {
    var dates = getWorkoutDates();
    if (dates.length === 0) return null;

    var lastDate = dates[dates.length - 1];
    var dayCompletions = state.completions[lastDate];
    if (!dayCompletions) return null;

    var routineIdx = getRoutineForDate(lastDate);
    if (routineIdx === null) return null;

    var routine = ROUTINE[routineIdx];
    var missed = [];

    for (var i = 0; i < routine.exercises.length; i++) {
      if (!dayCompletions[routine.exercises[i].id]) {
        missed.push(routine.exercises[i].name);
      }
    }

    if (missed.length === 0) return null;
    if (missed.length === routine.exercises.length) return null; // Entire day skipped, normal

    return {
      date: lastDate,
      routineName: routine.day,
      emoji: routine.emoji,
      missed: missed,
      totalMissed: missed.length,
      totalExercises: routine.exercises.length
    };
  }

  function renderRoutineStatus() {
    var container = document.getElementById('routineStatus');
    if (!container) return;

    var routineIdx = getTodayRoutine();
    var today = getTodayKey();
    var todayCompletions = getTodayCompletions();
    var hasDoneAny = false;
    for (var k in todayCompletions) { hasDoneAny = true; break; }

    var html = '';
    if (routineIdx === -1 && !hasDoneAny) {
      // Rest day
      var lastDate = getLastWorkoutDate();
      html = '<div class="routine-status-card rest">';
      html += '  <div class="routine-status-emoji">🛌</div>';
      html += '  <div class="routine-status-text">Hoy es <strong>descanso</strong></div>';
      html += '  <div class="routine-status-sub">';
      if (lastDate) {
        var d = new Date(lastDate + 'T12:00:00');
        var lastRoutine = getRoutineForDate(lastDate);
        var routineName = lastRoutine !== null ? ROUTINE[lastRoutine].day : '—';
        html += 'El ' + formatDateShort(d) + ' hiciste <strong>' + routineName + '</strong>. ¡Recupérate bien! 💪';
      } else {
        html += 'Mañana toca entrenar. ¡Prepárate! ⚡';
      }
      html += '  </div>';
      html += '</div>';
    } else {
      var idx = hasDoneAny ? getRoutineForDate(today) : routineIdx;
      if (idx === null) idx = 0;
      var day = ROUTINE[idx];
      html = '<div class="routine-status-card workout" style="background:linear-gradient(135deg, rgba(233,69,96,0.12), rgba(15,52,96,0.12));border-color:' + (idx === 0 ? '#e94560' : idx === 1 ? '#0f3460' : '#2ecc71') + ';">';
      html += '  <div class="routine-status-top">';
      html += '    <div class="routine-status-emoji">' + day.emoji + '</div>';
      html += '    <div class="routine-status-text">Hoy toca: <strong>' + day.day + '</strong></div>';
      if (hasDoneAny) html += '    <div class="routine-status-badge">En progreso</div>';
      html += '  </div>';
      html += '  <div class="routine-status-sub">' + day.title + '</div>';
      html += '</div>';

      // Show skipped exercises notice from last session
      var skipped = getSkippedExercisesFromLastSession();
      if (skipped) {
        var skipDate = new Date(skipped.date + 'T12:00:00');
        var skipLabel = formatDateShort(skipDate);
        html += '<div class="skipped-notice">';
        html += '  <div class="skipped-notice-icon">📋</div>';
        html += '  <div class="skipped-notice-body">';
        html += '    <div class="skipped-notice-title">Te quedaron sin marcar el <strong>' + skipLabel + '</strong> (' + skipped.emoji + ' ' + skipped.routineName + '):</div>';
        html += '    <div class="skipped-notice-list">' + skipped.missed.join(', ') + '</div>';
        html += '    <div class="skipped-notice-note">No pasa nada, hoy a darle a tu rutina 💪</div>';
        html += '  </div>';
        html += '</div>';
      }
    }

    container.innerHTML = html;
  }

  // =============================================
  // UI: Day selector (show all 3 routines)
  // =============================================
  var currentDayIndex = 0;

  function renderDaySelector() {
    var container = document.getElementById('daySelector');
    if (!container) return;

    container.innerHTML = '';
    ROUTINE.forEach(function (day, idx) {
      var btn = document.createElement('button');
      btn.className = 'day-btn' + (idx === currentDayIndex ? ' active' : '');
      btn.dataset.index = idx;
      btn.innerHTML =
        '<span class="day-name">' + day.emoji + ' ' + day.day + '</span>' +
        '<span class="day-desc">' + day.title + '</span>' +
        '<span class="day-badge" id="badge-' + idx + '"></span>';
      btn.addEventListener('click', function () {
        currentDayIndex = idx;
        renderDaySelector();
        renderCurrentDay();
      });
      container.appendChild(btn);
    });

    var active = container.querySelector('.day-btn.active');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function updateDayBadges() {
    ROUTINE.forEach(function (day, idx) {
      var badge = document.getElementById('badge-' + idx);
      if (!badge) return;
      var completions = getTodayCompletions();
      var done = 0;
      for (var i = 0; i < day.exercises.length; i++) {
        if (completions[day.exercises[i].id]) done++;
      }
      var total = day.exercises.length;
      if (done > 0) {
        badge.textContent = done + '/' + total;
        badge.classList.add('show');
      } else {
        badge.classList.remove('show');
      }
    });
  }

  // =============================================
  // UI: Render current day
  // =============================================
  function renderCurrentDay() {
    var container = document.getElementById('dayView');
    if (!container) return;

    var day = ROUTINE[currentDayIndex];
    if (!day) return;

    var completions = getTodayCompletions();
    var total = day.exercises.length;

    var html = '';

    day.exercises.forEach(function (ex, idx) {
      var isCompleted = !!completions[ex.id];
      var lastWeight = getLastWeight(ex.id);
      var sessionCount = getSessionCount(ex.id);
      var progress = getExerciseProgress(ex.id);

      html += '<div class="exercise-card ' + (isCompleted ? 'completed' : '') + '" id="card-' + ex.id + '">';
      html += '  <div class="exercise-top">';
      html += '    <div class="exercise-info">';
      html += '      <div class="exercise-name">' + (idx + 1) + '. ' + ex.name + '</div>';
      html += '      <span class="exercise-muscle">' + ex.muscle + '</span>';
      html += '    </div>';
      html += '    <div class="exercise-check">';
      html += '      <button class="check-btn ' + (isCompleted ? 'checked' : '') + '" data-ex="' + ex.id + '" aria-label="Marcar ' + ex.name + ' como completado">' + (isCompleted ? '✓' : '') + '</button>';
      html += '    </div>';
      html += '  </div>';
      html += '  <div class="exercise-details">';
      html += '    <div class="exercise-detail-item"><span class="icon">🔄</span><span><span class="label">Series: </span><span class="value">' + ex.series + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">🔁</span><span><span class="label">Reps: </span><span class="value">' + ex.reps + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">⏱️</span><span><span class="label">Descanso: </span><span class="value">' + ex.rest + '</span></span></div>';
      html += '  </div>';
      html += '  <div class="exercise-focus">';
      html += '    <div class="focus-label">💡 Enfoque clave</div>';
      html += '    ' + ex.focus;
      html += '  </div>';
      html += '  <div class="exercise-weight-section">';
      html += '    <div class="weight-row">';
      html += '      <div class="weight-input-group">';
      html += '        <input type="number" class="weight-input" id="weight-' + ex.id + '" value="' + (lastWeight !== null ? lastWeight : '') + '" placeholder="' + (lastWeight !== null ? lastWeight : '0') + '" inputmode="decimal" step="0.5" min="0">';
      html += '        <span class="weight-unit">kg</span>';
      html += '      </div>';
      html += '      <button class="weight-save-btn" data-ex="' + ex.id + '">Guardar peso</button>';
      html += '    </div>';
      html += '    <div class="weight-history" id="history-' + ex.id + '">' + renderWeightHistory(ex.id) + '</div>';
      html += '    <div id="suggestion-' + ex.id + '"></div>';
      html += '  </div>';
      html += '</div>';
    });

    container.innerHTML = html;

    day.exercises.forEach(function (ex) {
      var checkBtn = container.querySelector('.check-btn[data-ex="' + ex.id + '"]');
      if (checkBtn) {
        checkBtn.addEventListener('click', function () { toggleCompletion(ex.id); });
      }
      var saveBtn = container.querySelector('.weight-save-btn[data-ex="' + ex.id + '"]');
      var weightInput = container.querySelector('#weight-' + ex.id);
      if (saveBtn && weightInput) {
        saveBtn.addEventListener('click', function () {
          var val = weightInput.value.trim();
          if (val && parseFloat(val) >= 0) {
            saveWeight(ex.id, parseFloat(val));
          } else {
            showToast('Introduce un peso válido');
          }
        });
        weightInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') saveBtn.click();
        });
      }
    });

    updateProgress();
    updateDayBadges();
  }

  function renderWeightHistory(exerciseId) {
    var progress = getExerciseProgress(exerciseId);
    var sessionCount = getSessionCount(exerciseId);
    var lastWeightVal = getLastWeight(exerciseId);

    var html = '';
    if (sessionCount > 0) {
      html += '<span class="stat">📊 <span class="stat-value">' + sessionCount + ' ' + (sessionCount === 1 ? 'sesión' : 'sesiones') + '</span></span>';
    }
    if (lastWeightVal !== null) {
      html += '<span class="stat">🏋️ Último peso: <span class="stat-value">' + lastWeightVal + ' kg</span></span>';
    }
    if (progress.length > 0) {
      var recent = progress.slice(-5);
      var trend = recent.map(function (e) { return e.weight + 'kg'; }).join(' → ');
      html += '<span class="stat">📈 <span class="stat-value">' + trend + '</span></span>';
    }
    return html;
  }

  function updateProgress() {
    var day = ROUTINE[currentDayIndex];
    if (!day) return;
    var completions = getTodayCompletions();
    var total = day.exercises.length;
    var done = 0;
    for (var i = 0; i < day.exercises.length; i++) {
      if (completions[day.exercises[i].id]) done++;
    }
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;

    var fill = document.getElementById('progressFill');
    var label = document.getElementById('progressLabel');
    var text = document.getElementById('progressText');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = done + '/' + total + ' ejercicios';
    if (text) text.textContent = pct + '% completado';
  }

  // =============================================
  // UI: Weight suggestion
  // =============================================
  function checkSuggestions() {
    var day = ROUTINE[currentDayIndex];
    if (!day) return;
    day.exercises.forEach(function (ex) {
      var container = document.getElementById('suggestion-' + ex.id);
      if (!container) return;
      var weightInput = document.getElementById('weight-' + ex.id);
      if (!weightInput) return;
      var currentWeight = weightInput.value.trim() !== '' ? parseFloat(weightInput.value.trim()) : getLastWeight(ex.id);
      if (currentWeight === null || currentWeight <= 0) { container.innerHTML = ''; return; }
      var suggestion = getWeightSuggestion(ex.id, currentWeight);
      if (suggestion) {
        container.innerHTML = '<div class="suggestion-banner"><span class="icon">🎯</span><span>¡Buen trabajo! Llevas ' + suggestion.sessionsAtWeight + ' sesiones con ' + suggestion.currentWeight + 'kg. Prueba subir a <strong>' + suggestion.suggestedWeight + ' kg</strong> la próxima vez.</span></div>';
      } else {
        container.innerHTML = '';
      }
    });
  }

  var suggestionTimer = null;
  function scheduleSuggestionCheck() {
    clearTimeout(suggestionTimer);
    suggestionTimer = setTimeout(function () { checkSuggestions(); }, 150);
  }

  // =============================================
  // UI: updateAll (refresh all dynamic UI)
  // =============================================
  function updateAll() {
    renderRoutineStatus();
    updateProgress();
    updateDayBadges();
    scheduleSuggestionCheck();
  }

  // =============================================
  // HOME TAB: Interactive Calendar
  // =============================================
  var homeMonthOffset = 0; // 0 = current month, -1 = previous, etc.

  function renderHome() {
    var container = document.getElementById('homeContent');
    if (!container) return;

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + homeMonthOffset;

    // Adjust for overflow
    while (month < 0) { month += 12; year--; }
    while (month > 11) { month -= 12; year++; }

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var daysInMonth = lastDay.getDate();
    var startOffset = firstDay.getDay();

    var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    var todayKey = getTodayKey();

    // Build attendance set
    var attendedSet = {};
    for (var dateKey in state.completions) {
      var exCount = Object.keys(state.completions[dateKey]).length;
      if (exCount > 0) {
        var routineIdx = getRoutineForDate(dateKey);
        attendedSet[dateKey] = routineIdx !== null ? routineIdx : -1;
      }
    }

    // Determine if a date is selected
    var selectedDate = document.getElementById('homeContent').dataset.selectedDate || todayKey;

    var html = '';

    // Calendar header with navigation
    html += '<div class="home-calendar">';
    html += '  <div class="calendar-header">';
    html += '    <button class="calendar-nav-btn" id="calPrev" aria-label="Mes anterior">‹</button>';
    html += '    <h3>' + monthNames[month] + ' ' + year + '</h3>';
    html += '    <button class="calendar-nav-btn" id="calNext" aria-label="Mes siguiente">›</button>';
    html += '  </div>';
    html += '  <div class="calendar-grid">';

    // Day labels
    dayNames.forEach(function (n) {
      html += '<div class="calendar-day-label">' + n + '</div>';
    });

    // Empty cells
    for (var i = 0; i < startOffset; i++) {
      html += '<div class="calendar-day other-month"></div>';
    }

    // Days
    for (var day = 1; day <= daysInMonth; day++) {
      var cellDate = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      var isToday = cellDate === todayKey;
      var isSelected = cellDate === selectedDate;
      var attended = attendedSet[cellDate];

      var cls = 'calendar-day clickable';
      if (isToday) cls += ' today';
      if (isSelected) cls += ' selected';
      if (attended !== undefined) {
        cls += ' attended';
        if (attended === 0) cls += ' routine-push';
        else if (attended === 1) cls += ' routine-pull';
        else if (attended === 2) cls += ' routine-legs';
      }

      html += '<div class="' + cls + '" data-date="' + cellDate + '">';
      // Show routine emoji on attended days
      if (attended !== undefined && attended >= 0) {
        html += '<span class="cal-day-emoji">' + ROUTINE[attended].emoji + '</span>';
      }
      html += '<span class="cal-day-num">' + day + '</span>';
      html += '</div>';
    }

    html += '  </div>';
    html += '  <div class="calendar-legend">';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#e94560;"></span> Empuje</span>';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#0f3460;"></span> Tirón</span>';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#2ecc71;"></span> Pierna</span>';
    html += '  </div>';
    html += '</div>';

    // Day detail panel
    html += '<div class="day-detail" id="dayDetail">';
    html += renderDayDetail(selectedDate);
    html += '</div>';

    container.innerHTML = html;

    // Bind calendar navigation
    var prevBtn = document.getElementById('calPrev');
    var nextBtn = document.getElementById('calNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { homeMonthOffset--; renderHome(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { homeMonthOffset++; renderHome(); });

    // Bind day clicks
    container.querySelectorAll('.calendar-day.clickable').forEach(function (el) {
      el.addEventListener('click', function () {
        container.dataset.selectedDate = el.dataset.date;
        var detailEl = document.getElementById('dayDetail');
        if (detailEl) detailEl.innerHTML = renderDayDetail(el.dataset.date);
        // Update selected visual
        container.querySelectorAll('.calendar-day.clickable').forEach(function (d) { d.classList.remove('selected'); });
        el.classList.add('selected');
      });
    });
  }

  function renderDayDetail(dateKey) {
    var d = new Date(dateKey + 'T12:00:00');
    var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var dayName = dayNames[d.getDay()];
    var formatted = formatDateShort(d);
    var todayKey = getTodayKey();

    // Check if this date is in the future
    if (dateKey > todayKey) {
      return '<div class="day-detail-empty"><div class="day-detail-date">' + formatted + ' (' + dayName + ')</div><div class="day-detail-msg">🔮 Este día aún no ha llegado</div></div>';
    }

    var completions = getCompletionsForDate(dateKey);
    var hasData = false;
    for (var k in completions) { hasData = true; break; }

    if (!hasData) {
      // Check if there's weight data for this date
      var hasWeight = false;
      for (var exId in state.progress) {
        var entries = state.progress[exId];
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].date === dateKey) { hasWeight = true; break; }
        }
        if (hasWeight) break;
      }

      if (hasWeight) {
        // Has weight data but no completions (unusual, but handle it)
        return renderDayDetailWithData(dateKey, completions, formatted, dayName);
      }

      return '<div class="day-detail-empty">' +
        '<div class="day-detail-date">' + formatted + ' (' + dayName + ')</div>' +
        '<div class="day-detail-msg">🛌 Descanso</div>' +
        '<div class="day-detail-sub">No hubo entrenamiento este día</div>' +
        '</div>';
    }

    return renderDayDetailWithData(dateKey, completions, formatted, dayName);
  }

  function renderDayDetailWithData(dateKey, completions, formatted, dayName) {
    var count = 0;
    for (var k in completions) { count++; }

    var routineIdx = getRoutineForDate(dateKey);
    var routineName = routineIdx !== null ? ROUTINE[routineIdx].day : '—';
    var routineEmoji = routineIdx !== null ? ROUTINE[routineIdx].emoji : '🏋️';

    var html = '<div class="day-detail-data">';
    html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')</div>';
    html += '  <div class="day-detail-routine">' + routineEmoji + ' ' + routineName + '</div>';
    html += '  <div class="day-detail-exercises">';

    // List exercises done
    var dayExercises = [];
    if (routineIdx !== null) {
      dayExercises = ROUTINE[routineIdx].exercises;
    } else {
      // Find exercises from completions
      for (var exId in completions) {
        var ex = findExercise(exId);
        if (ex) dayExercises.push(ex);
      }
    }

    for (var i = 0; i < dayExercises.length; i++) {
      var ex = dayExercises[i];
      var done = !!completions[ex.id];
      if (!done) continue;

      // Find weight for this date
      var weightStr = '—';
      var weightEntries = state.progress[ex.id];
      if (weightEntries) {
        for (var w = 0; w < weightEntries.length; w++) {
          if (weightEntries[w].date === dateKey) {
            weightStr = weightEntries[w].weight + ' kg';
            break;
          }
        }
      }

      html += '    <div class="day-detail-ex-item">';
      html += '      <div class="dd-ex-name">' + ex.name + '</div>';
      html += '      <div class="dd-ex-meta">';
      html += '        <span class="dd-ex-muscle">' + ex.muscle + '</span>';
      html += '        <span class="dd-ex-weight">🏋️ ' + weightStr + '</span>';
      html += '      </div>';
      html += '    </div>';
    }

    html += '  </div>';
    html += '  <div class="day-detail-summary">' + count + ' ejercicios completados</div>';
    html += '</div>';
    return html;
  }

  // =============================================
  // STATS
  // =============================================
  function getTotalWorkoutDays() {
    return getWorkoutDates().length;
  }

  function getExercisesCompletedTotal() {
    var total = 0;
    for (var date in state.completions) {
      total += Object.keys(state.completions[date]).length;
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
    var dateSet = {};
    dates.forEach(function (d) { dateSet[d] = true; });
    var checkDate = new Date(today);
    var maxLookback = 365;
    while (maxLookback > 0) {
      var key = getDateKey(checkDate);
      if (dateSet[key]) { streak++; checkDate.setDate(checkDate.getDate() - 1); maxLookback--; }
      else break;
    }
    return streak;
  }

  function getWeeklyConsistency() {
    var dates = getWorkoutDates();
    var weeks = {};

    dates.forEach(function (dateStr) {
      var d = new Date(dateStr + 'T12:00:00');
      var day = d.getDay();
      var diff = d.getDate() - day + (day === 0 ? -6 : 1);
      var monday = new Date(d);
      monday.setDate(diff);
      var weekKey = getDateKey(monday);
      if (!weeks[weekKey]) weeks[weekKey] = { monday: monday, dates: [] };
      weeks[weekKey].dates.push(dateStr);
    });

    var weeklyData = [];
    for (var wk in weeks) {
      var dayNames = weeks[wk].dates.map(function (d) {
        return new Date(d + 'T12:00:00').getDay();
      });
      var attended = 0;
      if (dayNames.indexOf(1) >= 0) attended++;
      if (dayNames.indexOf(3) >= 0) attended++;
      if (dayNames.indexOf(5) >= 0) attended++;
      // Also count any other day as partial
      dayNames.forEach(function (day) {
        if (day !== 1 && day !== 3 && day !== 5) attended = Math.max(attended, 1);
      });
      weeklyData.push({ weekStart: weeks[wk].monday, attended: Math.min(attended, 3), total: 3 });
    }

    weeklyData.sort(function (a, b) { return b.weekStart - a.weekStart; });
    return weeklyData.slice(0, 8);
  }

  function getMuscleGroupStats() {
    var muscleCount = {};
    for (var date in state.completions) {
      var dayCompletions = state.completions[date];
      for (var exId in dayCompletions) {
        var ex = findExercise(exId);
        if (ex) {
          if (!muscleCount[ex.muscle]) muscleCount[ex.muscle] = 0;
          muscleCount[ex.muscle]++;
        }
      }
    }
    var sorted = [];
    for (var m in muscleCount) sorted.push({ muscle: m, count: muscleCount[m] });
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
      var count = 0;
      for (var k in dayCompletions) count++;
      if (count > 0) {
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
        if (getExerciseProgress(ex.id).length > 0) {
          list.push({ exercise: ex, dayTitle: day.day, dayIdx: dayIdx });
        }
      }
    }
    return list;
  }

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

    var weeklyPct = 0;
    if (weeklyData.length > 0) {
      var totalAttended = 0;
      var totalPossible = 0;
      weeklyData.forEach(function (w) { totalAttended += w.attended; totalPossible += w.total; });
      weeklyPct = totalPossible > 0 ? Math.round((totalAttended / totalPossible) * 100) : 0;
    }

    var html = '';

    // Overview cards
    html += '<div class="stats-grid">';
    html += '<div class="stat-card highlight"><div class="stat-icon">📅</div><div class="stat-number">' + totalDays + '</div><div class="stat-label">Días de gym</div></div>';
    html += '<div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-number">' + streak + '</div><div class="stat-label">Racha actual</div>' + (streak > 0 ? '<div class="stat-sub">días seguidos</div>' : '') + '</div>';
    html += '<div class="stat-card"><div class="stat-icon">✅</div><div class="stat-number">' + totalExercises + '</div><div class="stat-label">Ejercicios hechos</div></div>';
    html += '<div class="stat-card"><div class="stat-icon">📊</div><div class="stat-number">' + weeklyPct + '%</div><div class="stat-label">Consistencia semanal</div><div class="stat-sub">' + weeklyData.length + ' semanas</div></div>';
    html += '</div>';

    // Weekly consistency
    html += '<div class="stats-section-title">📆 Consistencia semanal <span class="line"></span></div>';
    html += '<div class="weekly-list">';
    if (weeklyData.length === 0) {
      html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:0.78rem;">Aún no hay datos. ¡Empieza tu rutina!</div>';
    } else {
      weeklyData.forEach(function (w) {
        var weekLabel = formatDateShort(w.weekStart);
        var pct = Math.round((w.attended / w.total) * 100);
        html += '<div class="weekly-row"><span class="week-label">' + weekLabel + '</span><div class="week-days">';
        html += '<span class="week-dot ' + (w.attended >= 1 ? 'done' : '') + '">W</span>';
        html += '<span class="week-dot ' + (w.attended >= 2 ? 'done' : '') + '">W</span>';
        html += '<span class="week-dot ' + (w.attended >= 3 ? 'done' : '') + '">W</span>';
        html += '</div><span class="week-count">' + w.attended + '/3 (' + pct + '%)</span></div>';
      });
    }
    html += '</div>';

    // Weight progression chart
    html += '<div class="stats-section-title">🏋️ Evolución de peso <span class="line"></span></div>';
    var exercisesWithData = getAllExercisesWithProgress();
    if (exercisesWithData.length === 0) {
      html += '<div class="chart-container"><div class="chart-empty"><div class="icon">📈</div><p>Registra tus pesos en la rutina para ver la evolución aquí.</p></div></div>';
    } else {
      html += '<select class="exercise-selector" id="chartExerciseSelect">';
      exercisesWithData.forEach(function (item) {
        html += '<option value="' + item.exercise.id + '">' + item.dayTitle + ': ' + item.exercise.name + '</option>';
      });
      html += '</select>';
      html += '<div class="chart-container">';
      html += '<div class="chart-title" id="chartTitle">Progresión de peso</div>';
      html += '<div class="chart-canvas-wrapper"><canvas id="weightChart" width="400" height="220"></canvas></div>';
      html += '<div class="chart-stats-row" id="chartStats"></div>';
      html += '</div>';
    }

    // Most trained muscles
    if (muscleStats.length > 0) {
      html += '<div class="stats-section-title">💪 Grupos musculares más trabajados <span class="line"></span></div>';
      html += '<div class="session-list">';
      muscleStats.slice(0, 6).forEach(function (m) {
        html += '<div class="session-item"><span class="session-date">' + m.muscle + '</span><span class="session-count">' + m.count + ' ejercicios</span></div>';
      });
      html += '</div>';
    }

    // Last sessions
    html += '<div class="stats-section-title">🕐 Últimas sesiones <span class="line"></span></div>';
    html += '<div class="session-list">';
    if (sessions.length === 0) {
      html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:0.78rem;">Aún no hay sesiones registradas.</div>';
    } else {
      sessions.forEach(function (s) {
        var d = new Date(s.date + 'T12:00:00');
        var formatted = formatDateShort(d) + ' (' + s.dayName + ')';
        html += '<div class="session-item"><span class="session-date">' + formatted + '</span><span class="session-count">' + s.count + ' ej.</span></div>';
      });
    }
    html += '</div>';

    container.innerHTML = html;

    if (exercisesWithData.length > 0) {
      var select = document.getElementById('chartExerciseSelect');
      setupChart(select.value);
      select.addEventListener('change', function () { setupChart(select.value); });
    }
  }

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
    var sorted = progress.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    var titleEl = document.getElementById('chartTitle');
    if (titleEl) titleEl.textContent = exercise.name;
    drawWeightChart(canvas, sorted);

    var statsEl = document.getElementById('chartStats');
    if (statsEl) {
      var firstW = sorted[0].weight;
      var lastW = sorted[sorted.length - 1].weight;
      var maxW = 0;
      var minW = Infinity;
      sorted.forEach(function (e) { if (e.weight > maxW) maxW = e.weight; if (e.weight < minW) minW = e.weight; });
      var diff = lastW - firstW;
      var diffClass = diff > 0 ? 'up' : (diff < 0 ? 'down' : '');
      var diffSign = diff > 0 ? '+' : '';
      statsEl.innerHTML =
        '<span class="chart-stat-item">📈 Progreso: <span class="value ' + diffClass + '">' + diffSign + diff.toFixed(1) + ' kg</span></span>' +
        '<span class="chart-stat-item">⬆️ Máximo: <span class="value">' + maxW + ' kg</span></span>' +
        '<span class="chart-stat-item">⬇️ Mínimo: <span class="value">' + minW + ' kg</span></span>';
    }
  }

  function drawWeightChart(canvas, data) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var pad = { top: 18, right: 16, bottom: 32, left: 40 };
    var chartW = W - pad.left - pad.right;
    var chartH = H - pad.top - pad.bottom;

    ctx.clearRect(0, 0, W, H);

    var values = data.map(function (e) { return e.weight; });
    var minVal = Math.min.apply(null, values);
    var maxVal = Math.max.apply(null, values);
    var range = maxVal - minVal;
    var yPad = Math.max(range * 0.1, 2);
    var yMin = Math.max(0, Math.floor((minVal - yPad) / 2.5) * 2.5);
    var yMax = Math.ceil((maxVal + yPad) / 2.5) * 2.5;
    var yRange = yMax - yMin;

    var labels = data.map(function (e) {
      var d = new Date(e.date + 'T12:00:00');
      return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
    });

    // Grid lines
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
      ctx.fillStyle = '#6a6a80';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(yVal % 1 === 0 ? yVal.toString() : yVal.toFixed(1), pad.left - 6, yPos);
    }

    if (data.length < 2) {
      var x1 = pad.left + chartW / 2;
      var y1 = pad.top + chartH - ((data[0].weight - yMin) / yRange) * chartH;
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#e94560';
      ctx.fill();
      return;
    }

    var xPositions = [];
    for (var i = 0; i < data.length; i++) {
      xPositions.push(pad.left + (i / (data.length - 1)) * chartW);
    }

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#e94560';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (i = 0; i < data.length; i++) {
      var yPos = pad.top + chartH - ((data[i].weight - yMin) / yRange) * chartH;
      if (i === 0) ctx.moveTo(xPositions[i], yPos);
      else ctx.lineTo(xPositions[i], yPos);
    }
    ctx.stroke();

    // Fill
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

    // Dots
    for (i = 0; i < data.length; i++) {
      var yPos = pad.top + chartH - ((data[i].weight - yMin) / yRange) * chartH;
      ctx.beginPath();
      ctx.arc(xPositions[i], yPos, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(233, 69, 96, 0.15)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(xPositions[i], yPos, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#e94560';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(xPositions[i], yPos, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      if (data.length <= 10 || i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)) {
        ctx.fillStyle = '#6a6a80';
        ctx.font = '9px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], xPositions[i], pad.top + chartH + 6);
      }
    }

    // Last weight label
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
    return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    // Determine day for today's routine
    var routineIdx = getTodayRoutine();
    if (routineIdx >= 0) {
      currentDayIndex = routineIdx;
    } else {
      // Rest day: show last routine or default
      var lastDate = getLastWorkoutDate();
      if (lastDate) {
        var lastRoutine = getRoutineForDate(lastDate);
        currentDayIndex = lastRoutine !== null ? lastRoutine : 0;
      } else {
        currentDayIndex = 0;
      }
    }

    renderRoutineStatus();
    renderDaySelector();
    renderCurrentDay();
    updateAll();

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
    });

    // Weight input suggestion listener
    document.addEventListener('input', function (e) {
      if (e.target && e.target.classList.contains('weight-input')) {
        scheduleSuggestionCheck();
      }
    });

    // Service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function () {});
      });
    }

    console.log('🏋️ Gym Calendar v2 initialized!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
