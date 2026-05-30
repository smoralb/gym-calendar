/* =============================================
   Gym Calendar - App de Rutina de Ejercicios
   Versión: 3.0.0 - Plan 3 meses con fases
   ============================================= */

(function () {
  'use strict';

  // =============================================
  // PHASES: 3 meses de progresión
  // Los ejercicios con el mismo ID comparten historial
  // de progreso (misma mancuerna / mismo movimiento)
  // =============================================
  var PHASES = [
    // ---- MES 1: Adaptación y Técnica (Semanas 1-4) ----
    {
      id: 'mes1',
      name: 'Mes 1 · Adaptación',
      subtitle: 'Semanas 1 a 4 — Automatiza la técnica',
      weeks: [1, 2, 3, 4],
      days: [
        {
          id: 'dia1', day: 'Empuje', emoji: '🔥',
          title: 'Pecho, Hombro anterior y Tríceps',
          exercises: [
            { id: 'press_plano', name: 'Press plano con mancuernas', muscle: 'Pecho', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Clavar escápulas. No bloquear codos arriba.', weightHint: '5-7.5 kg / mancuerna' },
            { id: 'press_inclinado', name: 'Press inclinado con mancuernas', muscle: 'Pecho (Superior)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Tronco a 30°-45°. Controla la bajada.', weightHint: '5 kg / mancuerna' },
            { id: 'aperturas_planas', name: 'Aperturas planas (Flyes)', muscle: 'Pecho', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Movimiento controlado en arco. Codos ligeramente flexionados.', weightHint: '2-3 kg / mancuerna' },
            { id: 'press_militar_sentado', name: 'Press militar sentado', muscle: 'Hombro', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Empuje vertical. Espalda recta apoyada.', weightHint: '3-5 kg / mancuerna' },
            { id: 'extension_triceps', name: 'Extensión tras nuca (2 manos)', muscle: 'Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Codos cerrados mirando al frente.', weightHint: '5 kg (1 mancuerna)' }
          ]
        },
        {
          id: 'dia2', day: 'Tirón', emoji: '💪',
          title: 'Espalda, Hombro posterior y Bíceps',
          exercises: [
            { id: 'remo_maquina', name: 'Máquina de remo (apoyo pecho)', muscle: 'Espalda (Grosor)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Piensa en dar un codazo hacia atrás.', weightHint: 'Peso ligero en placas' },
            { id: 'remo_una_mano', name: 'Remo a una mano (en banco)', muscle: 'Espalda (Dorsal)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Trayecto en diagonal hacia la cadera.', weightHint: '5-7.5 kg / mancuerna' },
            { id: 'pajaro', name: 'Pájaro con mancuernas (sentado)', muscle: 'Hombro (Atrás)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Pecho pegado a los muslos. Peso muy ligero.', weightHint: '2-3 kg / mancuerna' },
            { id: 'curl_biceps', name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Codos pegados a los costados. Sin balanceo.', weightHint: '3-5 kg / mancuerna' }
          ]
        },
        {
          id: 'dia3', day: 'Pierna', emoji: '🦵',
          title: 'Pierna y Core',
          exercises: [
            { id: 'sentadilla_goblet', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Baja como si te sentaras. Espalda recta. Mancuerna al pecho.', weightHint: '5-7.5 kg (1 mancuerna)' },
            { id: 'zancadas_estaticas', name: 'Zancadas estáticas', muscle: 'Piernas en general', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Paso al frente y baja vertical. Controla el equilibrio.', weightHint: 'Solo peso corporal' },
            { id: 'elevaciones_laterales', name: 'Elevaciones laterales', muscle: 'Hombro (Lateral)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sube brazos hacia los lados. Peso ligero.', weightHint: '2-3 kg / mancuerna' },
            { id: 'plancha', name: 'Plancha abdominal (Plank)', muscle: 'Abdomen (Core)', series: 3, reps: '30 seg', repsMin: 30, repsMax: 30, rest: '60 seg', isTimed: true, focus: 'Cuerpo recto como una tabla. Aprieta abdomen y glúteo.', weightHint: 'Peso corporal' }
          ]
        }
      ]
    },

    // ---- MES 2: Fuerza y Nuevas Variantes (Semanas 5-8) ----
    {
      id: 'mes2',
      name: 'Mes 2 · Fuerza',
      subtitle: 'Semanas 5 a 8 — Nuevas variantes, más peso',
      weeks: [5, 6, 7, 8],
      days: [
        {
          id: 'dia1', day: 'Empuje', emoji: '🔥',
          title: 'Pecho, Hombro anterior y Tríceps',
          exercises: [
            { id: 'press_plano', name: 'Press plano con mancuernas', muscle: 'Pecho', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Exprimir el pectoral arriba. Más peso que mes 1.', weightHint: '+2kg respecto mes 1' },
            { id: 'flexiones', name: 'Flexiones de pecho (manos elevadas)', muscle: 'Pecho', series: 3, reps: 'Máx (tope 10)', repsMin: 8, repsMax: 10, rest: '60 seg', focus: 'Fuerza con tu propio peso. Cuerpo recto.', weightHint: 'Peso corporal' },
            { id: 'aperturas_planas', name: 'Aperturas planas (Flyes)', muscle: 'Pecho', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Mantén el peso bajo. Busca notar el músculo.', weightHint: '2-3 kg / mancuerna' },
            { id: 'press_militar_pie', name: 'Press militar de pie', muscle: 'Hombro', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Aprieta glúteo para no curvar la espalda.', weightHint: '3-5 kg / mancuerna' },
            { id: 'fondos_triceps', name: 'Fondos de tríceps en silla/banco', muscle: 'Tríceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Flexiona codos hacia atrás, no a los lados.', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'dia2', day: 'Tirón', emoji: '💪',
          title: 'Espalda, Hombro posterior y Bíceps',
          exercises: [
            { id: 'remo_maquina', name: 'Máquina de remo (apoyo pecho)', muscle: 'Espalda (Grosor)', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Sostén 1 segundo la contracción atrás.', weightHint: '' },
            { id: 'remo_una_mano', name: 'Remo a una mano (en banco)', muscle: 'Espalda (Dorsal)', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Movimiento potente. Más peso que mes 1.', weightHint: '' },
            { id: 'remo_menton', name: 'Remo al mentón con mancuernas', muscle: 'Hombro (Atrás)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sube mancuernas pegadas al cuerpo.', weightHint: '2-3 kg / mancuerna' },
            { id: 'curl_martillo', name: 'Curl de bíceps tipo martillo', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Palmas mirándose entre sí. Trabaja grosor del brazo.', weightHint: '3-5 kg / mancuerna' }
          ]
        },
        {
          id: 'dia3', day: 'Pierna', emoji: '🦵',
          title: 'Pierna y Core',
          exercises: [
            { id: 'sentadilla_goblet', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Intenta bajar más profundo que mes 1.', weightHint: '' },
            { id: 'peso_muerto_rumano', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Echa cadera atrás. Nota tensión detrás del muslo.', weightHint: '5-7.5 kg / mancuerna' },
            { id: 'elevaciones_laterales', name: 'Elevaciones laterales', muscle: 'Hombro (Lateral)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Pausa de medio segundo arriba.', weightHint: '2-3 kg / mancuerna' },
            { id: 'crunch', name: 'Crunch abdominal clásico', muscle: 'Abdomen', series: 3, reps: '15', repsMin: 15, repsMax: 15, rest: '—', focus: 'Despega solo las escápulas del suelo.', weightHint: 'Peso corporal' }
          ]
        }
      ]
    },

    // ---- MES 3: Máxima Intensidad (Semanas 9-12) ----
    {
      id: 'mes3',
      name: 'Mes 3 · Intensidad Máxima',
      subtitle: 'Semanas 9 a 12 — Volumen y fuerza máxima',
      weeks: [9, 10, 11, 12],
      days: [
        {
          id: 'dia1', day: 'Empuje', emoji: '🔥',
          title: 'Pecho, Hombro anterior y Tríceps',
          exercises: [
            { id: 'press_plano', name: 'Press plano con mancuernas', muscle: 'Pecho', series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Fuerza máxima controlada. Usa tu peso máximo.', weightHint: 'Tu récord' },
            { id: 'press_inclinado', name: 'Press inclinado con mancuernas', muscle: 'Pecho (Superior)', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Controla la bajada en 3 segundos. Más peso que mes 1.', weightHint: '' },
            { id: 'aperturas_inclinadas', name: 'Aperturas inclinadas', muscle: 'Pecho (Superior)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Tronco inclinado 30°. Estimula zona alta del pecho.', weightHint: '2-3 kg / mancuerna' },
            { id: 'press_militar_pie', name: 'Press militar de pie', muscle: 'Hombro', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Bloqueo firme arriba. Consolida tu peso.', weightHint: '' },
            { id: 'combo_triceps', name: 'Ext. tras nuca + Fondos (combo)', muscle: 'Tríceps', series: 2, reps: '10+10', repsMin: 10, repsMax: 10, rest: '—', focus: 'Sin descanso entre ambos. Fatiga máxima.', weightHint: '5 kg + peso corporal' }
          ]
        },
        {
          id: 'dia2', day: 'Tirón', emoji: '💪',
          title: 'Espalda, Hombro posterior y Bíceps',
          exercises: [
            { id: 'remo_maquina', name: 'Máquina de remo (apoyo pecho)', muscle: 'Espalda (Grosor)', series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Tracciona con máxima energía. Más peso.', weightHint: '' },
            { id: 'remo_una_mano', name: 'Remo a una mano (en banco)', muscle: 'Espalda (Dorsal)', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Espalda perfectamente paralela al suelo.', weightHint: '' },
            { id: 'combo_hombro', name: 'Pájaro + Remo al mentón (combo)', muscle: 'Hombro', series: 2, reps: '12+10', repsMin: 12, repsMax: 10, rest: '—', focus: 'Quemazón total en espalda alta y hombros.', weightHint: '2-3 kg / mancuerna' },
            { id: 'curl_concentrado', name: 'Curl de bíceps concentrado', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sentado, codo apoyado en muslo. Aísla al 100%.', weightHint: '3-5 kg / mancuerna' }
          ]
        },
        {
          id: 'dia3', day: 'Pierna', emoji: '🦵',
          title: 'Pierna y Core',
          exercises: [
            { id: 'sentadilla_goblet', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Rompe paralelo si puedes.', weightHint: 'Tu récord' },
            { id: 'peso_muerto_rumano', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Aumenta peso. Espalda recta como una tabla.', weightHint: '' },
            { id: 'zancadas_caminando', name: 'Zancadas caminando con mancuernas', muscle: 'Piernas en general', series: 3, reps: '10 (pasos totales)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Mantén torso firme. Dinámico, requiere estabilidad.', weightHint: '3-5 kg / mancuerna' },
            { id: 'elevaciones_laterales', name: 'Elevaciones laterales', muscle: 'Hombro (Lateral)', series: 4, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Movimiento estricto, sin tirones.', weightHint: '2-3 kg / mancuerna' },
            { id: 'plancha', name: 'Plancha abdominal (Plank)', muscle: 'Abdomen (Core)', series: 3, reps: '45 seg', repsMin: 45, repsMax: 45, rest: '60 seg', isTimed: true, focus: 'Máxima tensión global. 45 segundos.', weightHint: 'Peso corporal' }
          ]
        }
      ]
    }
  ];

  // =============================================
  // STATE
  // =============================================
  var STORAGE_KEY = 'gym_calendar_data';

  function getDefaultState() {
    return { progress: {}, completions: {} };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        return { progress: data.progress || {}, completions: data.completions || {} };
      }
    } catch (e) {}
    return getDefaultState();
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  var state = loadState();

  function getTodayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function getDateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function getTodayCompletions() { return state.completions[getTodayKey()] || {}; }
  function getCompletionsForDate(dateKey) { return state.completions[dateKey] || {}; }

  // =============================================
  // PHASE DETECTION
  // =============================================
  function getStartDate() {
    // Derive start date from earliest record, or use today
    var dates = [];
    for (var date in state.completions) dates.push(date);
    for (var exId in state.progress) {
      state.progress[exId].forEach(function (e) { dates.push(e.date); });
    }
    if (dates.length > 0) {
      dates.sort();
      return dates[0];
    }
    return getTodayKey();
  }

  function getWeekNumber(dateKey) {
    var start = new Date(getStartDate() + 'T12:00:00');
    var current = new Date(dateKey + 'T12:00:00');
    if (current < start) return 0;
    var diffMs = current - start;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)) + 1;
  }

  function getPhaseIndex(dateKey) {
    var week = getWeekNumber(dateKey);
    if (week <= 4) return 0;
    if (week <= 8) return 1;
    return 2;
  }

  function getPhase(dateKey) { return PHASES[getPhaseIndex(dateKey)]; }

  // =============================================
  // ROUTINE HELPERS
  // =============================================
  function findExercise(exerciseId) {
    for (var p = 0; p < PHASES.length; p++) {
      for (var d = 0; d < PHASES[p].days.length; d++) {
        for (var e = 0; e < PHASES[p].days[d].exercises.length; e++) {
          if (PHASES[p].days[d].exercises[e].id === exerciseId) return PHASES[p].days[d].exercises[e];
        }
      }
    }
    return null;
  }

  function findExerciseDay(exerciseId) {
    for (var p = 0; p < PHASES.length; p++) {
      for (var d = 0; d < PHASES[p].days.length; d++) {
        for (var e = 0; e < PHASES[p].days[d].exercises.length; e++) {
          if (PHASES[p].days[d].exercises[e].id === exerciseId) return d;
        }
      }
    }
    return -1;
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
    for (var i = 1; i < 3; i++) { if (counts[i] > counts[maxIdx]) maxIdx = i; }
    return counts[maxIdx] > 0 ? maxIdx : null;
  }

  function getWorkoutDates() { return Object.keys(state.completions || {}).sort(); }

  function getLastWorkoutDate() {
    var dates = getWorkoutDates();
    return dates.length > 0 ? dates[dates.length - 1] : null;
  }

  function getTodayRoutine() {
    var today = getTodayKey();
    var todayCompletions = getTodayCompletions();
    var hasDoneAny = false;
    for (var k in todayCompletions) { hasDoneAny = true; break; }
    if (hasDoneAny) { var ri = getRoutineForDate(today); return ri !== null ? ri : -1; }

    var lastDate = getLastWorkoutDate();
    if (!lastDate) return 0;
    var last = new Date(lastDate + 'T12:00:00');
    var now = new Date(today + 'T12:00:00');
    var diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return -1;
    var lastRoutine = getRoutineForDate(lastDate);
    if (lastRoutine === null) return 0;
    return (lastRoutine + 1) % 3;
  }

  // =============================================
  // PROGRESS
  // =============================================
  function toggleCompletion(exerciseId) {
    var key = getTodayKey();
    if (!state.completions[key]) state.completions[key] = {};
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
    if (!state.progress[exerciseId]) state.progress[exerciseId] = [];
    var entry = { weight: parseFloat(weight), date: getTodayKey() };
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

  function getExerciseProgress(exerciseId) { return state.progress[exerciseId] || []; }
  function getLastWeight(exerciseId) { var p = getExerciseProgress(exerciseId); return p.length > 0 ? p[p.length - 1].weight : null; }

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
    var increment = currentWeight < 20 ? 2.5 : 5;
    var suggestedWeight = Math.round((currentWeight + increment) * 2) / 2;
    return { currentWeight: currentWeight, suggestedWeight: suggestedWeight, sessionsAtWeight: sameWeightEntries.length, increment: increment };
  }

  // =============================================
  // SOUND & TOAST
  // =============================================
  var audioCtx = null;
  function getAudioCtx() { if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } if (audioCtx.state === 'suspended') audioCtx.resume(); return audioCtx; }

  function playCompleteSound() {
    try {
      var ctx = getAudioCtx(); if (!ctx) return;
      var o1 = ctx.createOscillator(), g1 = ctx.createGain(); o1.connect(g1); g1.connect(ctx.destination);
      o1.type = 'sine'; o1.frequency.value = 880;
      g1.gain.setValueAtTime(0.3, ctx.currentTime); g1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      o1.start(ctx.currentTime); o1.stop(ctx.currentTime + 0.3);
      var o2 = ctx.createOscillator(), g2 = ctx.createGain(); o2.connect(g2); g2.connect(ctx.destination);
      o2.type = 'sine'; o2.frequency.value = 1108.73;
      g2.gain.setValueAtTime(0.01, ctx.currentTime); g2.gain.setValueAtTime(0.25, ctx.currentTime + 0.08);
      g2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      o2.start(ctx.currentTime + 0.08); o2.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  function vibrate() { try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) {} }

  var toastTimeout = null;
  function showToast(msg) {
    var el = document.getElementById('toast'); if (!el) return;
    clearTimeout(toastTimeout); el.textContent = msg; el.classList.add('show');
    toastTimeout = setTimeout(function () { el.classList.remove('show'); }, 2000);
  }

  // =============================================
  // TAB SWITCHING
  // =============================================
  var currentTab = 'rutina';

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(function (btn) { btn.classList.toggle('active', btn.dataset.tab === tab); });
    document.getElementById('homeView').style.display = tab === 'home' ? '' : 'none';
    document.getElementById('rutinaView').style.display = tab === 'rutina' ? '' : 'none';
    document.getElementById('statsView').style.display = tab === 'stats' ? '' : 'none';
    if (tab === 'rutina') { renderCurrentDay(); updateAll(); }
    if (tab === 'home') renderHome();
    if (tab === 'stats') renderStats();
  }

  // =============================================
  // ROUTINE STATUS
  // =============================================
  function getSkippedExercisesFromLastSession() {
    var dates = getWorkoutDates();
    if (dates.length === 0) return null;
    var lastDate = dates[dates.length - 1];
    var dayCompletions = state.completions[lastDate];
    if (!dayCompletions) return null;
    var routineIdx = getRoutineForDate(lastDate);
    if (routineIdx === null) return null;
    var phase = getPhase(lastDate);
    var routine = phase.days[routineIdx];
    var missed = [];
    for (var i = 0; i < routine.exercises.length; i++) {
      if (!dayCompletions[routine.exercises[i].id]) missed.push(routine.exercises[i].name);
    }
    if (missed.length === 0 || missed.length === routine.exercises.length) return null;
    return { date: lastDate, routineName: routine.day, emoji: routine.emoji, missed: missed };
  }

  function renderRoutineStatus() {
    var container = document.getElementById('routineStatus');
    if (!container) return;

    var routineIdx = getTodayRoutine();
    var today = getTodayKey();
    var todayCompletions = getTodayCompletions();
    var hasDoneAny = false;
    for (var k in todayCompletions) { hasDoneAny = true; break; }

    // Determine current phase
    var phaseIdx = getPhaseIndex(today);
    var phase = PHASES[phaseIdx];

    var html = '';
    if (routineIdx === -1 && !hasDoneAny) {
      var lastDate = getLastWorkoutDate();
      html = '<div class="routine-status-card rest">';
      html += '  <div class="routine-status-top"><div class="routine-status-emoji">🛌</div><div class="routine-status-text">Hoy es <strong>descanso</strong></div></div>';
      html += '  <div class="routine-status-sub">';
      if (lastDate) {
        var d = new Date(lastDate + 'T12:00:00');
        var lr = getRoutineForDate(lastDate);
        var rn = lr !== null ? phase.days[lr].day : '—';
        html += 'El ' + formatDateShort(d) + ' hiciste <strong>' + rn + '</strong>. ¡Recupérate bien! 💪';
      } else html += 'Mañana toca entrenar. ¡Prepárate! ⚡';
      html += '  </div>';
      // Show phase info even on rest days
      html += '  <div class="routine-status-phase">' + phase.name + '</div>';
      html += '</div>';
    } else {
      var idx = hasDoneAny ? getRoutineForDate(today) : routineIdx;
      if (idx === null) idx = 0;
      var day = phase.days[idx];
      var borderColor = idx === 0 ? '#e94560' : idx === 1 ? '#0f3460' : '#2ecc71';
      html = '<div class="routine-status-card workout" style="background:linear-gradient(135deg, rgba(233,69,96,0.12), rgba(15,52,96,0.12));border-color:' + borderColor + ';">';
      html += '  <div class="routine-status-top"><div class="routine-status-emoji">' + day.emoji + '</div><div class="routine-status-text">Hoy toca: <strong>' + day.day + '</strong></div>' + (hasDoneAny ? '<div class="routine-status-badge">En progreso</div>' : '') + '</div>';
      html += '  <div class="routine-status-sub">' + day.title + '</div>';
      html += '  <div class="routine-status-phase">' + phase.name + ' · Semana ' + getWeekNumber(today) + '</div>';
      html += '</div>';

      var skipped = getSkippedExercisesFromLastSession();
      if (skipped) {
        var skipDate = new Date(skipped.date + 'T12:00:00');
        var skipLabel = formatDateShort(skipDate);
        html += '<div class="skipped-notice"><div class="skipped-notice-icon">📋</div><div class="skipped-notice-body"><div class="skipped-notice-title">El <strong>' + skipLabel + '</strong> (' + skipped.emoji + ' ' + skipped.routineName + ') te faltó:</div><div class="skipped-notice-list">' + skipped.missed.join(', ') + '</div><div class="skipped-notice-note">No pasa nada, hoy a darle a tu rutina 💪</div></div></div>';
      }
    }

    container.innerHTML = html;
  }

  // =============================================
  // DAY SELECTOR
  // =============================================
  // =============================================
  // RENDER TODAY'S ROUTINE
  // =============================================
  function renderCurrentDay() {
    var container = document.getElementById('dayView');
    if (!container) return;
    var phase = getPhase(getTodayKey());

    var routineIdx = getTodayRoutine();
    if (routineIdx === -1) {
      // Rest day — no exercises to show
      container.innerHTML = '';
      return;
    }
    var day = phase.days[routineIdx];
    if (!day) return;
    var completions = getTodayCompletions();

    var html = '';
    html += '<div class="day-view-header"><h2>' + day.emoji + ' ' + day.day + '</h2><p>' + day.title + '</p></div>';

    day.exercises.forEach(function (ex, idx) {
      var isCompleted = !!completions[ex.id];
      var lastWeight = getLastWeight(ex.id);
      var sessionCount = getSessionCount(ex.id);
      var progress = getExerciseProgress(ex.id);

      html += '<div class="exercise-card ' + (isCompleted ? 'completed' : '') + '" id="card-' + ex.id + '">';
      html += '  <div class="exercise-top"><div class="exercise-info"><div class="exercise-name">' + (idx + 1) + '. ' + ex.name + '</div><span class="exercise-muscle">' + ex.muscle + '</span>';
      if (ex.weightHint) html += '<span class="exercise-weight-hint">💡 ' + ex.weightHint + '</span>';
      html += '  </div><div class="exercise-check"><button class="check-btn ' + (isCompleted ? 'checked' : '') + '" data-ex="' + ex.id + '">' + (isCompleted ? '✓' : '') + '</button></div></div>';
      html += '  <div class="exercise-details">';
      html += '    <div class="exercise-detail-item"><span class="icon">🔄</span><span><span class="label">Series: </span><span class="value">' + ex.series + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">🔁</span><span><span class="label">Reps: </span><span class="value">' + ex.reps + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">⏱️</span><span><span class="label">Descanso: </span><span class="value">' + ex.rest + '</span></span></div>';
      html += '  </div>';
      html += '  <div class="exercise-focus"><div class="focus-label">💡 Enfoque clave</div>' + ex.focus + '</div>';
      html += '  <div class="exercise-weight-section">';
      html += '    <div class="weight-row"><div class="weight-input-group"><input type="number" class="weight-input" id="weight-' + ex.id + '" value="' + (lastWeight !== null ? lastWeight : '') + '" placeholder="' + (lastWeight !== null ? lastWeight : '0') + '" inputmode="decimal" step="0.5" min="0"><span class="weight-unit">kg</span></div><button class="weight-save-btn" data-ex="' + ex.id + '">Guardar</button></div>';
      html += '    <div class="weight-history" id="history-' + ex.id + '">' + renderWeightHistory(ex.id) + '</div>';
      html += '    <div id="suggestion-' + ex.id + '"></div>';
      html += '  </div></div>';
    });

    container.innerHTML = html;

    day.exercises.forEach(function (ex) {
      var checkBtn = container.querySelector('.check-btn[data-ex="' + ex.id + '"]');
      if (checkBtn) checkBtn.addEventListener('click', function () { toggleCompletion(ex.id); });
      var saveBtn = container.querySelector('.weight-save-btn[data-ex="' + ex.id + '"]');
      var weightInput = container.querySelector('#weight-' + ex.id);
      if (saveBtn && weightInput) {
        saveBtn.addEventListener('click', function () {
          var val = weightInput.value.trim();
          if (val && parseFloat(val) >= 0) saveWeight(ex.id, parseFloat(val));
          else showToast('Introduce un peso válido');
        });
        weightInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') saveBtn.click(); });
      }
    });

    updateProgress();
  }

  function renderWeightHistory(exerciseId) {
    var p = getExerciseProgress(exerciseId);
    var sc = getSessionCount(exerciseId);
    var lw = getLastWeight(exerciseId);
    var html = '';
    if (sc > 0) html += '<span class="stat">📊 <span class="stat-value">' + sc + ' ' + (sc === 1 ? 'sesión' : 'sesiones') + '</span></span>';
    if (lw !== null) html += '<span class="stat">🏋️ Último: <span class="stat-value">' + lw + ' kg</span></span>';
    if (p.length > 0) {
      var recent = p.slice(-5);
      html += '<span class="stat">📈 <span class="stat-value">' + recent.map(function (e) { return e.weight + 'kg'; }).join(' → ') + '</span></span>';
    }
    return html;
  }

  function updateProgress() {
    var phase = getPhase(getTodayKey());
    var routineIdx = getTodayRoutine();
    if (routineIdx === -1) { var f = document.getElementById('progressFill'); if (f) f.style.width = '0%'; var l = document.getElementById('progressLabel'); if (l) l.textContent = '—'; var t = document.getElementById('progressText'); if (t) t.textContent = 'Descanso'; return; }
    var day = phase.days[routineIdx];
    if (!day) return;
    var completions = getTodayCompletions();
    var done = 0;
    day.exercises.forEach(function (ex) { if (completions[ex.id]) done++; });
    var pct = day.exercises.length > 0 ? Math.round((done / day.exercises.length) * 100) : 0;
    var fill = document.getElementById('progressFill');
    var label = document.getElementById('progressLabel');
    var text = document.getElementById('progressText');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = done + '/' + day.exercises.length + ' ejercicios';
    if (text) text.textContent = pct + '% completado';
  }

  function checkSuggestions() {
    var phase = getPhase(getTodayKey());
    var routineIdx = getTodayRoutine();
    if (routineIdx === -1) return;
    var day = phase.days[routineIdx];
    if (!day) return;
    day.exercises.forEach(function (ex) {
      var container = document.getElementById('suggestion-' + ex.id);
      if (!container) return;
      var weightInput = document.getElementById('weight-' + ex.id);
      if (!weightInput) return;
      var cw = weightInput.value.trim() !== '' ? parseFloat(weightInput.value.trim()) : getLastWeight(ex.id);
      if (cw === null || cw <= 0) { container.innerHTML = ''; return; }
      var sug = getWeightSuggestion(ex.id, cw);
      if (sug) container.innerHTML = '<div class="suggestion-banner"><span class="icon">🎯</span><span>¡Buen trabajo! ' + sug.sessionsAtWeight + ' sesiones con ' + sug.currentWeight + 'kg. Prueba subir a <strong>' + sug.suggestedWeight + ' kg</strong>.</span></div>';
      else container.innerHTML = '';
    });
  }

  var suggestionTimer = null;
  function scheduleSuggestionCheck() { clearTimeout(suggestionTimer); suggestionTimer = setTimeout(function () { checkSuggestions(); }, 150); }

  function updateAll() { renderRoutineStatus(); updateProgress(); scheduleSuggestionCheck(); }

  // =============================================
  // HOME: Interactive Calendar (with future view)
  // =============================================
  var homeMonthOffset = 0;

  function renderHome() {
    var container = document.getElementById('homeContent');
    if (!container) return;

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + homeMonthOffset;
    while (month < 0) { month += 12; year--; }
    while (month > 11) { month -= 12; year++; }

    var firstDay = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var startOffset = firstDay.getDay();
    var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var dayLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    var todayKey = getTodayKey();

    var attendedSet = {};
    for (var dk in state.completions) {
      var ec = 0; for (var kk in state.completions[dk]) ec++;
      if (ec > 0) {
        var ri = getRoutineForDate(dk);
        attendedSet[dk] = ri !== null ? ri : -1;
      }
    }

    var selectedDate = container.dataset.selectedDate || todayKey;

    var html = '';
    html += '<div class="home-calendar">';
    html += '  <div class="calendar-header"><button class="calendar-nav-btn" id="calPrev">‹</button><h3>' + monthNames[month] + ' ' + year + '</h3><button class="calendar-nav-btn" id="calNext">›</button></div>';
    html += '  <div class="calendar-grid">';
    dayLabels.forEach(function (n) { html += '<div class="calendar-day-label">' + n + '</div>'; });
    for (var i = 0; i < startOffset; i++) html += '<div class="calendar-day other-month"></div>';

    for (var day = 1; day <= daysInMonth; day++) {
      var cellDate = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      var isToday = cellDate === todayKey;
      var isSelected = cellDate === selectedDate;
      var attended = attendedSet[cellDate];
      var isFuture = cellDate > todayKey;

      var cls = 'calendar-day clickable';
      if (isToday) cls += ' today';
      if (isSelected) cls += ' selected';
      if (isFuture) cls += ' future';
      if (attended !== undefined) {
        cls += ' attended';
        cls += attended === 0 ? ' routine-push' : attended === 1 ? ' routine-pull' : ' routine-legs';
      } else if (isFuture) {
        // Predict routine for future dates
        var futureRI = predictFutureRoutine(cellDate);
        if (futureRI >= 0) {
          cls += ' future-pred';
          cls += futureRI === 0 ? ' routine-push' : futureRI === 1 ? ' routine-pull' : ' routine-legs';
        }
      }

      html += '<div class="' + cls + '" data-date="' + cellDate + '">';
      if (attended !== undefined && attended >= 0) html += '<span class="cal-day-emoji">' + getPhase(cellDate).days[attended].emoji + '</span>';
      else if (isFuture) {
        var fri = predictFutureRoutine(cellDate);
        if (fri >= 0) html += '<span class="cal-day-emoji small">' + getPhase(cellDate).days[fri].emoji + '</span>';
      }
      html += '<span class="cal-day-num">' + day + '</span></div>';
    }

    html += '  </div>';
    html += '  <div class="calendar-legend">';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#e94560;"></span> Empuje</span>';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#0f3460;"></span> Tirón</span>';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#2ecc71;"></span> Pierna</span>';
    html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:transparent;border:1px dashed var(--text-muted);"></span> Predicción</span>';
    html += '  </div>';
    html += '</div>';

    html += '<div class="day-detail" id="dayDetail">' + renderDayDetail(selectedDate) + '</div>';
    container.innerHTML = html;

    var prevBtn = document.getElementById('calPrev');
    var nextBtn = document.getElementById('calNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { homeMonthOffset--; renderHome(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { homeMonthOffset++; renderHome(); });

    container.querySelectorAll('.calendar-day.clickable').forEach(function (el) {
      el.addEventListener('click', function () {
        container.dataset.selectedDate = el.dataset.date;
        var detailEl = document.getElementById('dayDetail');
        if (detailEl) detailEl.innerHTML = renderDayDetail(el.dataset.date);
        container.querySelectorAll('.calendar-day.clickable').forEach(function (d) { d.classList.remove('selected'); });
        el.classList.add('selected');
      });
    });
  }

  function predictFutureRoutine(dateKey) {
    // Walk backwards from the given date to find the last known workout
    var checkDate = new Date(dateKey + 'T12:00:00');
    for (var i = 1; i <= 14; i++) { // Look back up to 14 days
      checkDate.setDate(checkDate.getDate() - 1);
      var ck = getDateKey(checkDate);
      var completions = state.completions[ck];
      if (completions) {
        var hasAny = false;
        for (var k in completions) { hasAny = true; break; }
        if (hasAny) {
          var lastRI = getRoutineForDate(ck);
          if (lastRI !== null) {
            // Count days since then
            var futureD = new Date(dateKey + 'T12:00:00');
            var pastD = new Date(ck + 'T12:00:00');
            var diffDays = Math.round((futureD - pastD) / (1000 * 60 * 60 * 24));
            // Every other day: next routine after 2+ days
            if (diffDays <= 1) return -1; // Would be rest
            var steps = Math.floor((diffDays + 1) / 2); // How many workouts in between
            return (lastRI + steps) % 3;
          }
        }
      }
    }
    return 0; // No history, start with push
  }

  function renderDayDetail(dateKey) {
    var d = new Date(dateKey + 'T12:00:00');
    var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var dayName = dayNames[d.getDay()];
    var formatted = formatDateShort(d);
    var todayKey = getTodayKey();
    var isFuture = dateKey > todayKey;

    // Determine phase for this date
    var phase = getPhase(dateKey);
    var weekNum = getWeekNumber(dateKey);

    if (isFuture) {
      var routineIdx = predictFutureRoutine(dateKey);
      var phaseInfo = ' · ' + phase.name;

      if (routineIdx === -1) {
        return '<div class="day-detail-empty"><div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div><div class="day-detail-msg">🛌 Descanso</div><div class="day-detail-sub">Toca recuperación. Vuelve mañana 💪</div></div>';
      }
      var day = phase.days[routineIdx];
      var html = '<div class="day-detail-data">';
      html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div>';
      html += '  <div class="day-detail-routine">' + day.emoji + ' ' + day.day + ' · Semana ' + weekNum + '</div>';
      html += '  <div class="day-detail-exercises">';
      day.exercises.forEach(function (ex) {
        html += '    <div class="day-detail-ex-item"><div class="dd-ex-name">' + ex.name + '</div><div class="dd-ex-meta"><span class="dd-ex-muscle">' + ex.muscle + '</span><span class="dd-ex-reps">' + ex.series + '×' + ex.reps + '</span></div></div>';
      });
      html += '  </div>';
      html += '  <div class="day-detail-summary">🔮 Día de entrenamiento · ' + day.exercises.length + ' ejercicios</div>';
      html += '</div>';
      return html;
    }

    var completions = getCompletionsForDate(dateKey);
    var hasData = false;
    for (var k in completions) { hasData = true; break; }

    if (!hasData) {
      // Check if there's weight data
      var hasWeight = false;
      for (var exId in state.progress) {
        for (var i = 0; i < state.progress[exId].length; i++) {
          if (state.progress[exId][i].date === dateKey) { hasWeight = true; break; }
        }
        if (hasWeight) break;
      }
      if (hasWeight) return renderDayDetailWithData(dateKey, completions, formatted, dayName, phase, weekNum);

      return '<div class="day-detail-empty"><div class="day-detail-date">' + formatted + ' (' + dayName + ')</div><div class="day-detail-msg">🛌 Descanso</div><div class="day-detail-sub">No hubo entrenamiento este día</div></div>';
    }

    return renderDayDetailWithData(dateKey, completions, formatted, dayName, phase, weekNum);
  }

  function renderDayDetailWithData(dateKey, completions, formatted, dayName, phase, weekNum) {
    var count = 0;
    for (var k in completions) count++;
    var routineIdx = getRoutineForDate(dateKey);
    var routineName = routineIdx !== null ? phase.days[routineIdx].day : '—';
    var routineEmoji = routineIdx !== null ? phase.days[routineIdx].emoji : '🏋️';
    var phaseInfo = phase ? ' · ' + phase.name : '';

    var html = '<div class="day-detail-data">';
    html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div>';
    html += '  <div class="day-detail-routine">' + routineEmoji + ' ' + routineName + (weekNum ? ' · Semana ' + weekNum : '') + '</div>';
    html += '  <div class="day-detail-exercises">';

    var dayExercises = [];
    if (routineIdx !== null && phase) dayExercises = phase.days[routineIdx].exercises;
    else {
      for (var exId in completions) { var ex = findExercise(exId); if (ex) dayExercises.push(ex); }
    }

    dayExercises.forEach(function (ex) {
      var done = !!completions[ex.id];
      if (!done) return;
      var weightStr = '—';
      var weightEntries = state.progress[ex.id];
      if (weightEntries) {
        for (var w = 0; w < weightEntries.length; w++) {
          if (weightEntries[w].date === dateKey) { weightStr = weightEntries[w].weight + ' kg'; break; }
        }
      }
      html += '    <div class="day-detail-ex-item"><div class="dd-ex-name">' + ex.name + '</div><div class="dd-ex-meta"><span class="dd-ex-muscle">' + ex.muscle + '</span><span class="dd-ex-weight">🏋️ ' + weightStr + '</span></div></div>';
    });

    html += '  </div>';
    html += '  <div class="day-detail-summary">' + count + ' ejercicios completados</div>';
    html += '</div>';
    return html;
  }

  // =============================================
  // STATS
  // =============================================
  function getTotalWorkoutDays() { return getWorkoutDates().length; }

  function getExercisesCompletedTotal() {
    var total = 0;
    for (var date in state.completions) total += Object.keys(state.completions[date]).length;
    return total;
  }

  function getTotalExerciseLogs() {
    var total = 0;
    for (var exId in state.progress) total += state.progress[exId].length;
    return total;
  }

  function getCurrentStreak() {
    var dates = getWorkoutDates();
    if (dates.length === 0) return 0;
    var streak = 0;
    var dateSet = {};
    dates.forEach(function (d) { dateSet[d] = true; });
    var checkDate = new Date(); checkDate.setHours(0, 0, 0, 0);
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
      var monday = new Date(d); monday.setDate(diff);
      var weekKey = getDateKey(monday);
      if (!weeks[weekKey]) weeks[weekKey] = { monday: monday, dates: [] };
      weeks[weekKey].dates.push(dateStr);
    });
    var weeklyData = [];
    for (var wk in weeks) {
      var dayNs = weeks[wk].dates.map(function (d) { return new Date(d + 'T12:00:00').getDay(); });
      var attended = 0;
      if (dayNs.indexOf(1) >= 0) attended++;
      if (dayNs.indexOf(3) >= 0) attended++;
      if (dayNs.indexOf(5) >= 0) attended++;
      dayNs.forEach(function (day) { if (day !== 1 && day !== 3 && day !== 5) attended = Math.max(attended, 1); });
      weeklyData.push({ weekStart: weeks[wk].monday, attended: Math.min(attended, 3), total: 3 });
    }
    weeklyData.sort(function (a, b) { return b.weekStart - a.weekStart; });
    return weeklyData.slice(0, 8);
  }

  function getMuscleGroupStats() {
    var mc = {};
    for (var date in state.completions) {
      for (var exId in state.completions[date]) {
        var ex = findExercise(exId);
        if (ex) { if (!mc[ex.muscle]) mc[ex.muscle] = 0; mc[ex.muscle]++; }
      }
    }
    var sorted = [];
    for (var m in mc) sorted.push({ muscle: m, count: mc[m] });
    sorted.sort(function (a, b) { return b.count - a.count; });
    return sorted;
  }

  function getLastSessions(limit) {
    limit = limit || 10;
    var dates = getWorkoutDates().reverse();
    var sessions = [];
    var seen = 0;
    for (var i = 0; i < dates.length && seen < limit; i++) {
      var d = dates[i];
      var dc = state.completions[d] || {};
      var count = 0;
      for (var k in dc) count++;
      if (count > 0) {
        var dt = new Date(d + 'T12:00:00');
        var dns = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        sessions.push({ date: d, dayName: dns[dt.getDay()], count: count });
        seen++;
      }
    }
    return sessions;
  }

  function getAllExercisesWithProgress() {
    var list = [];
    var phase = getPhase(getTodayKey());
    for (var d = 0; d < phase.days.length; d++) {
      for (var e = 0; e < phase.days[d].exercises.length; e++) {
        var ex = phase.days[d].exercises[e];
        if (getExerciseProgress(ex.id).length > 0) list.push({ exercise: ex, dayTitle: phase.days[d].day });
      }
    }
    return list;
  }

  function renderStats() {
    var container = document.getElementById('statsContent');
    if (!container) return;

    var totalDays = getTotalWorkoutDays();
    var totalExercises = getExercisesCompletedTotal();
    var streak = getCurrentStreak();
    var weeklyData = getWeeklyConsistency();
    var muscleStats = getMuscleGroupStats();
    var sessions = getLastSessions(8);
    var weeklyPct = 0;
    if (weeklyData.length > 0) {
      var ta = 0, tp = 0;
      weeklyData.forEach(function (w) { ta += w.attended; tp += w.total; });
      weeklyPct = tp > 0 ? Math.round((ta / tp) * 100) : 0;
    }

    // Current phase status
    var phase = getPhase(getTodayKey());
    var weekNum = getWeekNumber(getTodayKey());

    var html = '<div class="phase-banner"><span class="phase-banner-icon">📌</span><span class="phase-banner-text">' + phase.name + '</span><span class="phase-banner-week">Semana ' + weekNum + '/12</span></div>';

    html += '<div class="stats-grid">';
    html += '<div class="stat-card highlight"><div class="stat-icon">📅</div><div class="stat-number">' + totalDays + '</div><div class="stat-label">Días de gym</div></div>';
    html += '<div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-number">' + streak + '</div><div class="stat-label">Racha</div>' + (streak > 0 ? '<div class="stat-sub">días</div>' : '') + '</div>';
    html += '<div class="stat-card"><div class="stat-icon">✅</div><div class="stat-number">' + totalExercises + '</div><div class="stat-label">Ejercicios</div></div>';
    html += '<div class="stat-card"><div class="stat-icon">📊</div><div class="stat-number">' + weeklyPct + '%</div><div class="stat-label">Consistencia</div><div class="stat-sub">' + weeklyData.length + ' semanas</div></div>';
    html += '</div>';

    html += '<div class="stats-section-title">📆 Consistencia semanal <span class="line"></span></div>';
    html += '<div class="weekly-list">';
    if (weeklyData.length === 0) html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:0.78rem;">Aún no hay datos.</div>';
    else {
      weeklyData.forEach(function (w) {
        var pct = Math.round((w.attended / w.total) * 100);
        html += '<div class="weekly-row"><span class="week-label">' + formatDateShort(w.weekStart) + '</span><div class="week-days"><span class="week-dot ' + (w.attended >= 1 ? 'done' : '') + '">W</span><span class="week-dot ' + (w.attended >= 2 ? 'done' : '') + '">W</span><span class="week-dot ' + (w.attended >= 3 ? 'done' : '') + '">W</span></div><span class="week-count">' + w.attended + '/3 (' + pct + '%)</span></div>';
      });
    }
    html += '</div>';

    html += '<div class="stats-section-title">🏋️ Evolución de peso <span class="line"></span></div>';
    var exWithData = getAllExercisesWithProgress();
    if (exWithData.length === 0) {
      html += '<div class="chart-container"><div class="chart-empty"><div class="icon">📈</div><p>Registra tus pesos para ver la evolución.</p></div></div>';
    } else {
      html += '<select class="exercise-selector" id="chartExerciseSelect">';
      exWithData.forEach(function (item) { html += '<option value="' + item.exercise.id + '">' + item.dayTitle + ': ' + item.exercise.name + '</option>'; });
      html += '</select>';
      html += '<div class="chart-container"><div class="chart-title" id="chartTitle">Progresión de peso</div><div class="chart-canvas-wrapper"><canvas id="weightChart" width="400" height="220"></canvas></div><div class="chart-stats-row" id="chartStats"></div></div>';
    }

    if (muscleStats.length > 0) {
      html += '<div class="stats-section-title">💪 Grupos musculares <span class="line"></span></div>';
      html += '<div class="session-list">';
      muscleStats.slice(0, 6).forEach(function (m) { html += '<div class="session-item"><span class="session-date">' + m.muscle + '</span><span class="session-count">' + m.count + '</span></div>'; });
      html += '</div>';
    }

    html += '<div class="stats-section-title">🕐 Últimas sesiones <span class="line"></span></div>';
    html += '<div class="session-list">';
    if (sessions.length === 0) html += '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:0.78rem;">Aún no hay sesiones.</div>';
    else {
      sessions.forEach(function (s) {
        var dt = new Date(s.date + 'T12:00:00');
        html += '<div class="session-item"><span class="session-date">' + formatDateShort(dt) + ' (' + s.dayName + ')</span><span class="session-count">' + s.count + ' ej.</span></div>';
      });
    }
    html += '</div>';

    container.innerHTML = html;

    if (exWithData.length > 0) {
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
    if (!exercise || progress.length === 0) { canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); return; }
    var sorted = progress.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    var titleEl = document.getElementById('chartTitle');
    if (titleEl) titleEl.textContent = exercise.name;
    drawWeightChart(canvas, sorted);
    var statsEl = document.getElementById('chartStats');
    if (statsEl) {
      var firstW = sorted[0].weight, lastW = sorted[sorted.length - 1].weight;
      var maxW = 0, minW = Infinity;
      sorted.forEach(function (e) { if (e.weight > maxW) maxW = e.weight; if (e.weight < minW) minW = e.weight; });
      var diff = lastW - firstW;
      statsEl.innerHTML = '<span class="chart-stat-item">📈 Progreso: <span class="value ' + (diff > 0 ? 'up' : diff < 0 ? 'down' : '') + '">' + (diff > 0 ? '+' : '') + diff.toFixed(1) + ' kg</span></span><span class="chart-stat-item">⬆️ Máx: <span class="value">' + maxW + ' kg</span></span><span class="chart-stat-item">⬇️ Mín: <span class="value">' + minW + ' kg</span></span>';
    }
  }

  function drawWeightChart(canvas, data) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var pad = { top: 18, right: 16, bottom: 32, left: 40 };
    var chartW = W - pad.left - pad.right, chartH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);
    var values = data.map(function (e) { return e.weight; });
    var minVal = Math.min.apply(null, values), maxVal = Math.max.apply(null, values);
    var range = maxVal - minVal;
    var yPad = Math.max(range * 0.1, 2);
    var yMin = Math.max(0, Math.floor((minVal - yPad) / 2.5) * 2.5);
    var yMax = Math.ceil((maxVal + yPad) / 2.5) * 2.5;
    var yRange = yMax - yMin;
    var labels = data.map(function (e) { var d = new Date(e.date + 'T12:00:00'); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); });
    ctx.strokeStyle = '#1e2a45'; ctx.lineWidth = 0.5;
    for (var yi = 0; yi <= 4; yi++) {
      var yVal = yMin + (yi / 4) * yRange;
      var yPos = pad.top + chartH - ((yVal - yMin) / yRange) * chartH;
      ctx.beginPath(); ctx.moveTo(pad.left, yPos); ctx.lineTo(W - pad.right, yPos); ctx.stroke();
      ctx.fillStyle = '#6a6a80'; ctx.font = '10px -apple-system, sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(yVal % 1 === 0 ? yVal.toString() : yVal.toFixed(1), pad.left - 6, yPos);
    }
    if (data.length < 2) {
      var x1 = pad.left + chartW / 2, y1 = pad.top + chartH - ((data[0].weight - yMin) / yRange) * chartH;
      ctx.beginPath(); ctx.arc(x1, y1, 5, 0, Math.PI * 2); ctx.fillStyle = '#e94560'; ctx.fill(); return;
    }
    var xPositions = [];
    for (var i = 0; i < data.length; i++) xPositions.push(pad.left + (i / (data.length - 1)) * chartW);
    ctx.beginPath(); ctx.strokeStyle = '#e94560'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (i = 0; i < data.length; i++) {
      var yPos = pad.top + chartH - ((data[i].weight - yMin) / yRange) * chartH;
      if (i === 0) ctx.moveTo(xPositions[i], yPos); else ctx.lineTo(xPositions[i], yPos);
    }
    ctx.stroke();
    ctx.lineTo(xPositions[xPositions.length - 1], pad.top + chartH);
    ctx.lineTo(xPositions[0], pad.top + chartH);
    ctx.closePath();
    var gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, 'rgba(233, 69, 96, 0.15)'); gradient.addColorStop(1, 'rgba(233, 69, 96, 0)');
    ctx.fillStyle = gradient; ctx.fill();
    for (i = 0; i < data.length; i++) {
      yPos = pad.top + chartH - ((data[i].weight - yMin) / yRange) * chartH;
      ctx.beginPath(); ctx.arc(xPositions[i], yPos, 6, 0, Math.PI * 2); ctx.fillStyle = 'rgba(233, 69, 96, 0.15)'; ctx.fill();
      ctx.beginPath(); ctx.arc(xPositions[i], yPos, 4, 0, Math.PI * 2); ctx.fillStyle = '#e94560'; ctx.fill();
      ctx.beginPath(); ctx.arc(xPositions[i], yPos, 2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
      if (data.length <= 10 || i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)) {
        ctx.fillStyle = '#6a6a80'; ctx.font = '9px -apple-system, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText(labels[i], xPositions[i], pad.top + chartH + 6);
      }
    }
    var lastWeight = data[data.length - 1].weight;
    var lastY = pad.top + chartH - ((lastWeight - yMin) / yRange) * chartH;
    ctx.fillStyle = '#e94560'; ctx.font = 'bold 11px -apple-system, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
    ctx.fillText(lastWeight + ' kg', xPositions[xPositions.length - 1] + 8, lastY - 4);
  }

  function formatDateShort(d) { return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); }

  // =============================================
  // INIT
  // =============================================
  function init() {
    renderRoutineStatus();
    renderCurrentDay();
    updateAll();

    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
    });

    document.addEventListener('input', function (e) {
      if (e.target && e.target.classList.contains('weight-input')) scheduleSuggestionCheck();
    });

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
    }

    console.log('🏋️ Gym Calendar v3 — Plan 3 meses!');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
