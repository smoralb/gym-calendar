/* =============================================
   Gym Calendar - App de Rutina de Ejercicios
   Versión: 4.2.0 — Horario semanal configurable
   ============================================= */

(function () {
  'use strict';

  var APP_VERSION = '4.2.0';

  // =============================================
  // SERGIO_PHASES: plan Push/Pull/Pierna 3 días/semana
  // =============================================
  var SERGIO_PHASES = [
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
            { id: 'press_plano', name: 'Press plano con mancuernas', muscle: 'Pecho', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Clavar escápulas. No bloquear codos arriba. Empieza ligero, sube solo si la técnica es perfecta.', weightHint: '5-7.5 kg / mancuerna' },
            { id: 'press_inclinado', name: 'Press inclinado con mancuernas', muscle: 'Pecho (Superior)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Tronco a 30°-45°. Controla la bajada. Empieza ligero, domina el movimiento antes de subir peso.', weightHint: '5 kg / mancuerna' },
            { id: 'aperturas_planas', name: 'Aperturas planas (Flyes)', muscle: 'Pecho', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Movimiento controlado en arco. Codos ligeramente flexionados. Peso muy ligero, siente el pecho.', weightHint: '2-3 kg / mancuerna' },
            { id: 'press_militar_sentado', name: 'Press militar sentado', muscle: 'Hombro', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Empuje vertical. Espalda recta apoyada. Empieza ligero, prioriza el control antes que el peso.', weightHint: '3-5 kg / mancuerna' },
            { id: 'extension_triceps', name: 'Extensión tras nuca (2 manos)', muscle: 'Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Codos cerrados mirando al frente. Controla el descenso, no uses impulso.', weightHint: '5 kg (1 mancuerna)' }
          ]
        },
        {
          id: 'dia2', day: 'Tirón', emoji: '💪',
          title: 'Espalda, Hombro posterior y Bíceps',
          exercises: [
            { id: 'remo_maquina', name: 'Máquina de remo (apoyo pecho)', muscle: 'Espalda (Grosor)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Piensa en dar un codazo hacia atrás. Peso ligero, controla el retroceso.', weightHint: 'Peso ligero en placas' },
            { id: 'remo_una_mano', name: 'Remo a una mano (en banco)', muscle: 'Espalda (Dorsal)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Trayecto en diagonal hacia la cadera. Empieza ligero, siente el dorsal.', weightHint: '5-7.5 kg / mancuerna' },
            { id: 'pajaro', name: 'Pájaro con mancuernas (sentado)', muscle: 'Hombro (Atrás)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Pecho pegado a los muslos. Peso muy ligero, movimiento sin balanceo.', weightHint: '2-3 kg / mancuerna' },
            { id: 'curl_biceps', name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Codos pegados a los costados. Sin balanceo. Empieza ligero, controla el movimiento completo.', weightHint: '3-5 kg / mancuerna' }
          ]
        },
        {
          id: 'dia3', day: 'Pierna', emoji: '🦵',
          title: 'Pierna y Core',
          exercises: [
            { id: 'sentadilla_goblet', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Baja como si te sentaras. Espalda recta. Mancuerna al pecho. Empieza ligero, domina la profundidad.', weightHint: '5-7.5 kg (1 mancuerna)' },
            { id: 'zancadas_estaticas', name: 'Zancadas estáticas', muscle: 'Piernas en general', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Paso al frente y baja vertical. Controla el equilibrio. Solo peso corporal.', weightHint: 'Solo peso corporal' },
            { id: 'elevaciones_laterales', name: 'Elevaciones laterales', muscle: 'Hombro (Lateral)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sube brazos hacia los lados. Peso muy ligero, control estricto, sin balanceo.', weightHint: '2-3 kg / mancuerna' },
            { id: 'plancha', name: 'Plancha abdominal (Plank)', muscle: 'Abdomen (Core)', series: 3, reps: '30 seg', repsMin: 30, repsMax: 30, rest: '60 seg', isTimed: true, focus: 'Cuerpo recto como una tabla. Aprieta abdomen y glúteo. Respiración constante.', weightHint: 'Peso corporal' }
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
  // EVA_PHASES: plan postparto Full Body 2 días/semana
  // =============================================
  var EVA_PHASES = [
    // ---- MES 1: Reactivación (Semanas 1-4) ----
    {
      id: 'eva_mes1',
      name: 'Mes 1 · Reactivación',
      subtitle: 'Semanas 1 a 4 — Activa el cuerpo con suavidad',
      weeks: [1, 2, 3, 4],
      days: [
        {
          id: 'diaA', day: 'Día A', emoji: '🌸',
          title: 'Piernas + Empuje',
          exercises: [
            { id: 'sentadilla_goblet_eva', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Mancuerna al pecho. Baja como si te sentaras. Espalda recta, rodillas no hacia dentro. Muy ligero.', weightHint: '3 kg (1 mancuerna)' },
            { id: 'puente_gluteo', name: 'Puente de glúteos', muscle: 'Glúteos / Core', series: 2, reps: '15', repsMin: 15, repsMax: 15, rest: '60 seg', focus: 'Tumbada boca arriba, pies apoyados. Sube cadera apretando glúteo. Aguanta 1 segundo arriba.', weightHint: 'Peso corporal' },
            { id: 'press_pecho_eva', name: 'Press de pecho con mancuernas', muscle: 'Pecho / Tríceps', series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Tumbada en banco o suelo. Controla la bajada. Empieza muy ligero, siente el pecho.', weightHint: '2-3 kg / mancuerna' },
            { id: 'remo_una_mano_eva', name: 'Remo a una mano en banco', muscle: 'Espalda / Bíceps', series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Apoya rodilla y mano en el banco. Trayecto hacia la cadera. Siente la espalda.', weightHint: '3-5 kg / mancuerna' },
            { id: 'plancha_rodillas', name: 'Plancha con rodillas', muscle: 'Core', series: 2, reps: '20 seg', repsMin: 20, repsMax: 20, rest: '60 seg', isTimed: true, focus: 'Rodillas en el suelo, cuerpo recto desde cabeza a rodillas. Aprieta abdomen. Respira.', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'diaB', day: 'Día B', emoji: '💜',
          title: 'Glúteos + Tirón',
          exercises: [
            { id: 'peso_muerto_rumano_eva', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Echa la cadera atrás. Nota tensión detrás del muslo. Espalda recta. Peso muy ligero al inicio.', weightHint: '3-5 kg / mancuerna' },
            { id: 'zancada_eva', name: 'Zancada estática', muscle: 'Cuádriceps / Glúteo', series: 2, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Paso al frente y baja vertical. Rodilla trasera hacia el suelo sin tocar. Controlada.', weightHint: 'Peso corporal' },
            { id: 'press_hombros_eva', name: 'Press de hombros sentada', muscle: 'Hombros', series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Sentada con espalda apoyada. Empuja hacia arriba. Muy ligero, controla el movimiento.', weightHint: '2-3 kg / mancuerna' },
            { id: 'curl_biceps_eva', name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Codos pegados al cuerpo. Sin balanceo. Sube y baja controlado.', weightHint: '2-3 kg / mancuerna' },
            { id: 'bird_dog', name: 'Bird-Dog (cuadrupedia)', muscle: 'Core / Lumbar', series: 2, reps: '10 (por lado)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'A cuatro patas, extiende brazo y pierna contrarios. Mantén 2 segundos. Muy estabilizador.', weightHint: 'Peso corporal' }
          ]
        }
      ]
    },

    // ---- MES 2: Fuerza Base (Semanas 5-8) ----
    {
      id: 'eva_mes2',
      name: 'Mes 2 · Fuerza Base',
      subtitle: 'Semanas 5 a 8 — Más peso, más volumen',
      weeks: [5, 6, 7, 8],
      days: [
        {
          id: 'diaA', day: 'Día A', emoji: '🌸',
          title: 'Piernas + Empuje',
          exercises: [
            { id: 'sentadilla_goblet_eva', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más profundidad que mes 1. Sube carga progresivamente.', weightHint: '+1-2 kg respecto mes 1' },
            { id: 'hip_thrust_eva', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Espalda en banco, mancuerna en cadera. Sube cadera hasta paralelo. Aprieta glúteo arriba.', weightHint: '5-7.5 kg (1 mancuerna)' },
            { id: 'press_pecho_eva', name: 'Press de pecho con mancuernas', muscle: 'Pecho / Tríceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso que mes 1. Controla la bajada en 2 segundos.', weightHint: '' },
            { id: 'remo_una_mano_eva', name: 'Remo a una mano en banco', muscle: 'Espalda / Bíceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso. Sostén 1 segundo la contracción.', weightHint: '' },
            { id: 'plancha_completa', name: 'Plancha clásica (completa)', muscle: 'Core', series: 2, reps: '25 seg', repsMin: 25, repsMax: 25, rest: '60 seg', isTimed: true, focus: 'Ya sin rodillas. Cuerpo recto como tabla. Aprieta todo el cuerpo.', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'diaB', day: 'Día B', emoji: '💜',
          title: 'Glúteos + Tirón',
          exercises: [
            { id: 'peso_muerto_rumano_eva', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso. Controla el descenso. Nota la tensión isquiotibial.', weightHint: '' },
            { id: 'zancada_eva', name: 'Zancada estática con mancuernas', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Añade mancuernas ligeras. Mantén torso firme.', weightHint: '2-3 kg / mancuerna' },
            { id: 'press_hombros_eva', name: 'Press de hombros de pie', muscle: 'Hombros', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'De pie, aprieta glúteo para no curvar la espalda.', weightHint: '' },
            { id: 'curl_biceps_eva', name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Alternado o simultáneo. Sin balanceo.', weightHint: '' },
            { id: 'extension_triceps_eva', name: 'Extensión de tríceps tras nuca', muscle: 'Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sentada, una mancuerna con ambas manos. Codos cerrados.', weightHint: '3-5 kg (1 mancuerna)' }
          ]
        }
      ]
    },

    // ---- MES 3: Progresión (Semanas 9-12) ----
    {
      id: 'eva_mes3',
      name: 'Mes 3 · Progresión',
      subtitle: 'Semanas 9 a 12 — Intensidad y fuerza máxima',
      weeks: [9, 10, 11, 12],
      days: [
        {
          id: 'diaA', day: 'Día A', emoji: '🌸',
          title: 'Piernas + Empuje',
          exercises: [
            { id: 'sentadilla_goblet_eva', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Profundidad máxima con técnica perfecta.', weightHint: 'Tu récord' },
            { id: 'hip_thrust_eva', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 4, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso. Pausa 2 segundos arriba apretando glúteo.', weightHint: '' },
            { id: 'press_pecho_eva', name: 'Press de pecho con mancuernas', muscle: 'Pecho / Tríceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Consolida tu peso máximo. Exprimir el pectoral arriba.', weightHint: '' },
            { id: 'remo_una_mano_eva', name: 'Remo a una mano en banco', muscle: 'Espalda / Bíceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Espalda paralela al suelo. Fuerza máxima.', weightHint: '' },
            { id: 'plancha_completa', name: 'Plancha clásica (completa)', muscle: 'Core', series: 3, reps: '30 seg', repsMin: 30, repsMax: 30, rest: '60 seg', isTimed: true, focus: 'Tensión total. Respira despacio. ¡30 segundos!', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'diaB', day: 'Día B', emoji: '💜',
          title: 'Glúteos + Tirón',
          exercises: [
            { id: 'peso_muerto_rumano_eva', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Espalda perfectamente recta.', weightHint: 'Tu récord' },
            { id: 'zancadas_caminando_eva', name: 'Zancadas caminando con mancuernas', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '12 (pasos totales)', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Dinámica. Mantén torso firme. Requiere más estabilidad.', weightHint: '3-5 kg / mancuerna' },
            { id: 'press_hombros_eva', name: 'Press de hombros de pie', muscle: 'Hombros', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Bloqueo firme arriba. Consolida tu peso.', weightHint: '' },
            { id: 'curl_biceps_eva', name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Alternado. Máxima contracción arriba.', weightHint: '' },
            { id: 'extension_triceps_eva', name: 'Extensión de tríceps tras nuca', muscle: 'Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Controla el descenso. Codos sin abrirse.', weightHint: '' }
          ]
        }
      ]
    }
  ];

  // =============================================
  // EXERCISE_META: descripción, video y alternativas
  // =============================================
  var EXERCISE_META = {
    'press_plano': {
      description: 'Tumbado en el banco con los pies bien apoyados en el suelo. Sujeta las mancuernas a la altura del pecho con codos a 45°. Empuja hacia arriba de forma controlada hasta casi extender los brazos. Baja lentamente en 2 segundos notando la tensión en el pecho.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_press_plano_flex', name: 'Flexiones de pecho', reason: 'Sin banco / sin mancuernas', muscle: 'Pecho / Tríceps', series: 3, reps: '12', rest: '60 seg', focus: 'Cuerpo recto de cabeza a talones. Baja el pecho rozando el suelo. Codos a 45°.', weightHint: 'Peso corporal' },
        { id: 'alt_press_plano_suelo', name: 'Press de pecho en el suelo', reason: 'Sin banco', muscle: 'Pecho / Tríceps', series: 3, reps: '12', rest: '90 seg', focus: 'Mismo movimiento que press plano. Al bajar, los codos tocan el suelo. Rango parcial.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'press_inclinado': {
      description: 'Banco a 30-45°. Sujeta las mancuernas a la altura del pecho. Empuja hacia arriba y ligeramente hacia atrás, en línea con el ángulo del banco. Baja controlado en 2 segundos notando el pecho superior.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_press_inc_pies', name: 'Flexiones con pies elevados', reason: 'Sin banco inclinado', muscle: 'Pecho Superior', series: 3, reps: '10', rest: '60 seg', focus: 'Pies en silla o step elevados. Simula el ángulo inclinado. Cuerpo recto, codos a 45°.', weightHint: 'Peso corporal' }
      ]
    },
    'aperturas_planas': {
      description: 'Tumbado en el banco. Con las mancuernas arriba y los codos ligeramente flexionados, abre los brazos hacia los lados en arco hasta notar estiramiento en el pecho. Vuelve al centro apretando el pectoral.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_aperturas_suelo', name: 'Aperturas en el suelo', reason: 'Sin banco', muscle: 'Pecho', series: 3, reps: '12', rest: '60 seg', focus: 'Igual que aperturas planas pero en el suelo. El rango de bajada es menor pero es seguro.', weightHint: 'Peso ligero' }
      ]
    },
    'aperturas_inclinadas': {
      description: 'Banco a 30°. Con mancuernas muy ligeras arriba, abre los brazos en arco controlado. El objetivo es sentir la zona alta del pecho, no mover mucho peso. Mantén siempre los codos ligeramente flexionados.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_apertura_inc_flex', name: 'Flexiones con pies elevados', reason: 'Sin banco inclinado', muscle: 'Pecho Superior', series: 3, reps: '10', rest: '60 seg', focus: 'Pies en silla. Simula el trabajo de pecho superior con peso corporal.', weightHint: 'Peso corporal' }
      ]
    },
    'press_pecho_eva': {
      description: 'Túmbate en un banco o en el suelo. Coge las mancuernas con los codos a 45°. Empuja suave y controlado hacia arriba. Baja lentamente. Con el suelo como alternativa, el rango de movimiento es más limitado pero seguro para postparto.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_press_pecho_eva_suelo', name: 'Press de pecho en el suelo', reason: 'Sin banco', muscle: 'Pecho / Tríceps', series: 2, reps: '12', rest: '90 seg', focus: 'Tumbada en el suelo. Codos tocan el suelo al bajar. Empuja suave y controlado.', weightHint: 'Mismas mancuernas' },
        { id: 'alt_press_pecho_eva_flex', name: 'Flexiones en rodillas', reason: 'Sin mancuernas', muscle: 'Pecho / Tríceps', series: 2, reps: '10', rest: '60 seg', focus: 'Rodillas en el suelo, manos anchas. Baja el pecho al suelo. Cuerpo recto desde rodillas.', weightHint: 'Peso corporal' }
      ]
    },
    'press_militar_sentado': {
      description: 'Sentado con la espalda bien apoyada. Mancuernas a la altura de los hombros con palmas hacia adelante. Empuja hacia arriba sin arquear la zona lumbar. Baja controlado hasta la altura de los hombros.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_pm_arnold', name: 'Press Arnold sentado', reason: 'Variante más completa', muscle: 'Hombro', series: 3, reps: '12', rest: '90 seg', focus: 'Empieza con palmas hacia ti y rota mientras subes. Trabaja más cabezas del deltoides.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'press_militar_pie': {
      description: 'De pie con los pies a la anchura de los hombros. Aprieta glúteos y abdomen para no arquear la espalda. Empuja las mancuernas verticalmente. Baja controlado a la altura de las orejas.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_pm_pie_sentado', name: 'Press de hombros sentado', reason: 'Más estabilidad', muscle: 'Hombro', series: 3, reps: '10', rest: '90 seg', focus: 'Sentado en banco o silla con espalda apoyada. Más control y seguridad.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'press_hombros_eva': {
      description: 'Sentada en una silla o banco con la espalda bien apoyada. Mancuernas a la altura de los hombros. Empuja suave y controlado hacia arriba. Baja sin prisas. Peso muy ligero al inicio.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_ph_eva_pie', name: 'Press de hombros de pie', reason: 'Sin banco o silla', muscle: 'Hombros', series: 2, reps: '12', rest: '90 seg', focus: 'De pie. Aprieta el abdomen para proteger la espalda. Empuja controlado hacia arriba.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'elevaciones_laterales': {
      description: 'De pie, mancuernas a los lados. Sube los brazos lateralmente hasta la altura de los hombros (no más). Codos ligeramente flexionados. Baja lentamente en 2 segundos. El peso debe ser muy ligero.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_el_lat_inc', name: 'Elevaciones laterales inclinado', reason: 'Mayor aislamiento', muscle: 'Hombro (Lateral)', series: 3, reps: '12', rest: '60 seg', focus: 'Apóyate en banco inclinado. Eliminas el balanceo y el aislamiento es mayor.', weightHint: 'Mismo peso o menos' }
      ]
    },
    'remo_maquina': {
      description: 'Siéntate en la máquina de remo con el pecho apoyado. Coge el agarre y tira hacia ti pensando en dar un codazo hacia atrás. Mantén la espalda recta. Sostén 1 segundo la contracción. Extiende los brazos controlado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_remo_maq_mancuernas', name: 'Remo inclinado bilateral', reason: 'Sin máquina', muscle: 'Espalda', series: 3, reps: '12', rest: '90 seg', focus: 'Inclinado a 45° con una mancuerna en cada mano. Tira hacia la cadera. Espalda recta.', weightHint: '5-10 kg / mancuerna' }
      ]
    },
    'remo_una_mano': {
      description: 'Apoya una rodilla y la mano contraria en el banco. Coge la mancuerna y tira hacia la cadera en diagonal — no hacia arriba. La espalda debe quedar paralela al suelo. Siente la contracción del dorsal antes de bajar.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_remo_1m_inclinado', name: 'Remo bilateral inclinado', reason: 'Sin banco', muscle: 'Espalda / Bíceps', series: 3, reps: '12', rest: '90 seg', focus: 'De pie inclinado a 45° con dos mancuernas. Tira ambas hacia la cadera a la vez.', weightHint: '5-10 kg / mancuerna' }
      ]
    },
    'remo_una_mano_eva': {
      description: 'Apoya una rodilla y la mano contraria en el banco. Coge la mancuerna con suavidad. Tira hacia la cadera manteniendo la espalda recta. Siente el dorsal trabajar. Peso ligero y control total.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_remo_1m_eva_bilatrl', name: 'Remo inclinado bilateral', reason: 'Sin banco', muscle: 'Espalda / Bíceps', series: 2, reps: '12', rest: '90 seg', focus: 'De pie inclinada 45°. Dos mancuernas. Tira hacia las caderas. Espalda recta.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'pajaro': {
      description: 'Sentado, inclínate con el pecho pegado a los muslos. Con las mancuernas colgando, sube los brazos hacia los lados en arco hasta la altura de los hombros. Movimiento lento y controlado. Peso muy ligero.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_pajaro_de_pie', name: 'Pájaro de pie inclinado', reason: 'Sin banco', muscle: 'Hombro (Atrás)', series: 3, reps: '12', rest: '60 seg', focus: 'De pie, inclinado a 90°. Mismo movimiento. Peso muy ligero para no usar impulso.', weightHint: 'Mismo peso' }
      ]
    },
    'remo_menton': {
      description: 'De pie, mancuernas delante del cuerpo. Tira hacia arriba manteniendo las mancuernas cerca del torso hasta la altura del mentón. Codos por encima de las manos. Baja controlado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_remo_ment_pajaro', name: 'Pájaro con mancuernas', reason: 'Si molesta el hombro', muscle: 'Hombro (Atrás)', series: 3, reps: '12', rest: '60 seg', focus: 'Alternativa más segura para el manguito rotador. Trabaja hombro posterior.', weightHint: 'Mismo peso o menos' }
      ]
    },
    'combo_hombro': {
      description: 'Superserie sin descanso: 12 rep de pájaro seguidas de 10 rep de remo al mentón. Objetivo: fatigar completamente hombro posterior y espalda alta. Peso muy ligero.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_combo_hombro_sep', name: 'Pájaro + El. laterales (separado)', reason: 'Más control', muscle: 'Hombro', series: 3, reps: '12+12', rest: '90 seg', focus: 'Dos ejercicios separados con 60 seg de descanso. Más controlado que la superserie.', weightHint: 'Peso ligero' }
      ]
    },
    'curl_biceps': {
      description: 'De pie con los codos pegados al cuerpo. Sube las mancuernas doblando el codo hasta cerca del hombro. Aprieta el bíceps arriba. Baja lentamente en 2 segundos. Sin balancear el torso.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_curl_alternado', name: 'Curl de bíceps alternado', reason: 'Más concentración', muscle: 'Bíceps', series: 3, reps: '12', rest: '60 seg', focus: 'Un brazo cada vez. Mayor concentración y control que el bilateral.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'curl_biceps_eva': {
      description: 'De pie o sentada con los codos pegados al cuerpo. Sube las mancuernas suavemente hasta los hombros. Aprieta el bíceps. Baja lentamente. Sin balanceo. Peso ligero y control total.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_curl_ev_botella', name: 'Curl con botella de agua', reason: 'Sin mancuernas', muscle: 'Bíceps', series: 2, reps: '15', rest: '60 seg', focus: 'Usa una botella de agua llena. Mismo movimiento. Enfócate en sentir el bíceps.', weightHint: 'Botella 1-2 litros' }
      ]
    },
    'curl_martillo': {
      description: 'De pie, mancuernas a los lados con las palmas mirándose (agarre neutro). Sube ambas o alternando. Trabaja el braquiorradial y el grosor del brazo. Sin balanceo.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_curl_mart_alt', name: 'Curl martillo alternado', reason: 'Más concentración', muscle: 'Bíceps / Antebrazo', series: 3, reps: '12', rest: '60 seg', focus: 'Un brazo cada vez con agarre neutro. Mayor control del movimiento.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'curl_concentrado': {
      description: 'Sentado, apoya el codo en la parte interna del muslo. Sube la mancuerna hasta el hombro apretando el bíceps al máximo. Baja muy lento. Aísla el bíceps al 100%. Peso moderado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_curl_conc_normal', name: 'Curl de bíceps normal', reason: 'Sin banco', muscle: 'Bíceps', series: 3, reps: '12', rest: '60 seg', focus: 'De pie, codos pegados. Menos aislamiento pero más peso posible.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'extension_triceps': {
      description: 'Sentado o de pie, coge la mancuerna con ambas manos por encima de la cabeza. Baja doblando los codos hacia atrás sin que se abran. Extiende de vuelta apretando el tríceps. Codos cerrados siempre.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_ext_tric_patada', name: 'Patada de tríceps (kickback)', reason: 'Variante más sencilla', muscle: 'Tríceps', series: 3, reps: '12', rest: '60 seg', focus: 'Inclinado a 45°, codo pegado al cuerpo a 90°. Extiende el brazo hacia atrás apretando.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'extension_triceps_eva': {
      description: 'Sentada, coge una mancuerna ligera con ambas manos por encima de la cabeza. Baja doblando los codos hacia atrás. Extiende suavemente. Codos siempre cerrados hacia adelante. Peso muy ligero.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_ext_tric_eva_patada', name: 'Patada de tríceps', reason: 'Más sencillo', muscle: 'Tríceps', series: 3, reps: '12', rest: '60 seg', focus: 'Inclinada a 45°, codo fijo a 90°. Extiende el brazo hacia atrás apretando el tríceps.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'fondos_triceps': {
      description: 'Apoya las manos en el borde de un banco con los dedos hacia adelante. Baja doblando los codos hacia atrás (no a los lados) hasta 90°. Empuja de vuelta arriba. Para más facilidad, dobla las rodillas.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_fondos_diamante', name: 'Flexiones diamante', reason: 'Sin banco', muscle: 'Tríceps', series: 3, reps: '10', rest: '60 seg', focus: 'Manos juntas formando un diamante. Aisla el tríceps. Más difícil que flexión normal.', weightHint: 'Peso corporal' }
      ]
    },
    'combo_triceps': {
      description: 'Superserie: extensión tras nuca seguida de fondos en banco sin descanso entre ellos. La combinación fatiga el tríceps completamente. Descansa solo al terminar ambos movimientos.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_combo_tric_sep', name: 'Extensión + Patadas (separado)', reason: 'Más control', muscle: 'Tríceps', series: 3, reps: '10+10', rest: '90 seg', focus: 'Dos ejercicios separados con 60 seg de descanso entre ellos. Más controlado.', weightHint: 'Mismo peso' }
      ]
    },
    'flexiones': {
      description: 'Apoya manos y pies en el suelo, cuerpo recto de cabeza a talones. Baja el pecho al suelo con los codos a 45°. Empuja de vuelta hasta casi extender. Si es difícil, empieza con las rodillas en el suelo.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_flex_elevadas', name: 'Flexiones con manos elevadas', reason: 'Versión más fácil', muscle: 'Pecho / Tríceps', series: 3, reps: '12', rest: '60 seg', focus: 'Manos en banco o escalón. El ángulo reduce el porcentaje de peso corporal. Más sencillo.', weightHint: 'Peso corporal' }
      ]
    },
    'sentadilla_goblet': {
      description: 'De pie, pies separados a la anchura de los hombros con dedos ligeramente hacia afuera. Sostén la mancuerna vertical contra el pecho. Baja como si te sentaras, espalda recta, rodillas siguiendo la dirección de los pies. Sube empujando desde los talones.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_sq_goblet_pc', name: 'Sentadilla con peso corporal', reason: 'Sin mancuerna', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '15', rest: '60 seg', focus: 'Misma técnica sin peso. Perfecto para repasar el patrón de movimiento.', weightHint: 'Peso corporal' },
        { id: 'alt_sq_goblet_bulgara', name: 'Sentadilla búlgara', reason: 'Más intensidad unilateral', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '90 seg', focus: 'Pie trasero en banco. Baja con peso en el pie delantero. Muy efectivo para glúteo.', weightHint: 'Mismas mancuernas o menos' }
      ]
    },
    'sentadilla_goblet_eva': {
      description: 'De pie, pies separados a la anchura de los hombros. Sostén la mancuerna ligera contra el pecho. Baja lentamente como si te sentaras en una silla. Espalda recta. Rodillas en línea con los pies. Sube empujando desde los talones.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_sq_goblet_eva_pc', name: 'Sentadilla con peso corporal', reason: 'Sin mancuerna', muscle: 'Cuádriceps / Glúteo', series: 2, reps: '15', rest: '60 seg', focus: 'Misma técnica sin peso. Muy seguro para postparto. Céntrate en la profundidad y técnica.', weightHint: 'Peso corporal' }
      ]
    },
    'zancadas_estaticas': {
      description: 'Da un paso largo al frente. Mantén el torso recto y baja verticalmente hasta que la rodilla trasera casi toque el suelo. Empuja desde el pie delantero para volver. Alterna piernas o completa todas de un lado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_zan_stat_split', name: 'Sentadilla split (estática)', reason: 'Más estabilidad', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '60 seg', focus: 'Pies fijos en posición de zancada. Sube y baja sin mover los pies. Más control.', weightHint: 'Peso corporal' }
      ]
    },
    'zancada_eva': {
      description: 'Da un paso largo al frente manteniendo el torso recto. Baja verticalmente con la rodilla trasera hacia el suelo (sin tocar). Vuelve al punto de partida empujando con el pie delantero. Controla el equilibrio en todo momento.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_zan_eva_step', name: 'Step up (subida al escalón)', reason: 'Más equilibrio / menos impacto', muscle: 'Cuádriceps / Glúteo', series: 2, reps: '10 (por pierna)', rest: '60 seg', focus: 'Sube un pie a un escalón o step. Empuja con el talón. Baja controlado. Muy seguro.', weightHint: 'Peso corporal' }
      ]
    },
    'zancadas_caminando': {
      description: 'Coge las mancuernas y avanza dando pasos de zancada. Mantén el torso erguido y la rodilla delantera alineada con el pie. Más coordinación y estabilidad que las zancadas estáticas.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_zan_cam_stat', name: 'Zancadas estáticas con mancuernas', reason: 'Menos espacio / más control', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '60 seg', focus: 'Mismo trabajo sin avanzar. Más control del movimiento. Muy útil en espacios reducidos.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'zancadas_caminando_eva': {
      description: 'Con mancuernas ligeras, avanza dando pasos de zancada. Mantén el torso erguido. Rodilla delantera en línea con el pie. Más dinámica que la estática; requiere coordinación y algo de equilibrio.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_zan_cam_eva_stat', name: 'Zancada estática con mancuernas', reason: 'Menos coordinación', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '60 seg', focus: 'Sin avanzar. Mismo trabajo con más control. Mismas mancuernas.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'peso_muerto_rumano': {
      description: 'De pie, mancuernas delante de los muslos. Empuja la cadera hacia atrás bajando las mancuernas por las piernas con la espalda recta. Nota el estiramiento detrás del muslo. Cuando sientas la tensión máxima, sube volviendo a la posición apretando glúteos.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_pdr_una_pierna', name: 'Peso muerto a una pierna', reason: 'Mayor desafío unilateral', muscle: 'Isquios / Glúteo', series: 3, reps: '10 (por pierna)', rest: '90 seg', focus: 'Una mancuerna. Baja inclinando el cuerpo mientras la pierna libre sube detrás. Requiere equilibrio.', weightHint: 'Menos peso (1 mancuerna)' }
      ]
    },
    'peso_muerto_rumano_eva': {
      description: 'De pie con mancuernas delante de los muslos. Empuja la cadera hacia atrás bajando suavemente las mancuernas por las piernas. Espalda recta en todo momento. Nota la tensión en los isquiotibiales. Sube empujando caderas hacia adelante y apretando los glúteos.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_pdr_eva_rodillas', name: 'Peso muerto rodillas semiflexionadas', reason: 'Menos flexibilidad requerida', muscle: 'Isquios / Glúteo', series: 2, reps: '12', rest: '90 seg', focus: 'Igual pero con rodillas más flexionadas. Reduce la exigencia de flexibilidad de isquiotibiales.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'puente_gluteo': {
      description: 'Tumbada boca arriba con las rodillas flexionadas y pies apoyados en el suelo. Aprieta los glúteos y sube las caderas hasta formar una línea recta desde hombros a rodillas. Mantén 1-2 segundos arriba. Baja lentamente.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_puente_gl_una_pierna', name: 'Puente de glúteos a una pierna', reason: 'Mayor intensidad', muscle: 'Glúteos / Core', series: 2, reps: '12 (por pierna)', rest: '60 seg', focus: 'Igual pero con una pierna extendida. Más difícil. Ideal cuando el ejercicio base se vuelve fácil.', weightHint: 'Peso corporal' }
      ]
    },
    'hip_thrust_eva': {
      description: 'Espalda apoyada en el banco (borde a la altura de los omóplatos). Mancuerna sobre las caderas. Pies apoyados en el suelo. Sube las caderas apretando los glúteos hasta paralelo. Pausa 1-2 segundos arriba. Baja controlado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_hip_thrust_suelo', name: 'Puente de glúteos con mancuerna', reason: 'Sin banco', muscle: 'Glúteos', series: 3, reps: '12', rest: '90 seg', focus: 'Tumbada en el suelo. Mancuerna sobre caderas. Menor rango que el hip thrust pero muy efectivo.', weightHint: 'Misma mancuerna' }
      ]
    },
    'plancha': {
      description: 'Apóyate en los antebrazos y las puntas de los pies. El cuerpo debe formar una línea recta desde los talones hasta la cabeza. Aprieta abdomen, glúteos y cuádriceps. Mantén la posición respirando con normalidad.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_plancha_rodillas', name: 'Plancha con rodillas', reason: 'Versión más sencilla', muscle: 'Core', series: 3, reps: '30 seg', rest: '60 seg', isTimed: true, focus: 'Rodillas en el suelo. Mismo alineamiento de cadera y hombros. Excelente para empezar.', weightHint: 'Peso corporal' }
      ]
    },
    'plancha_rodillas': {
      description: 'Apóyate en los antebrazos y las rodillas. El cuerpo forma una línea recta desde las rodillas hasta la cabeza. Aprieta el abdomen. Mantén sin hundir las caderas ni levantarlas. Respira con calma.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_plancha_full_prog', name: 'Plancha clásica completa', reason: 'Progresión natural', muscle: 'Core', series: 2, reps: '15 seg', rest: '60 seg', isTimed: true, focus: 'Sin rodillas. Apunta a mantenerla 15 segundos primero y progresa cada semana.', weightHint: 'Peso corporal' }
      ]
    },
    'plancha_completa': {
      description: 'Apóyate en los antebrazos y las puntas de los pies. Cuerpo recto de cabeza a talones. Aprieta todo el cuerpo: abdomen, glúteos, cuádriceps. No hundas las caderas ni las subas demasiado. Respiración constante y tranquila.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_plancha_lateral', name: 'Plancha lateral', reason: 'Variante oblicuos', muscle: 'Core / Oblicuos', series: 2, reps: '20 seg (por lado)', rest: '60 seg', isTimed: true, focus: 'Apóyate en un antebrazo lateralmente. Cuerpo en línea recta de lado. Trabaja oblicuos.', weightHint: 'Peso corporal' }
      ]
    },
    'crunch': {
      description: 'Tumbado boca arriba con las rodillas flexionadas. Manos detrás de las orejas sin tirar del cuello. Despega las escápulas del suelo apretando el abdomen. Baja controlado sin llegar a apoyar completamente.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_crunch_bici', name: 'Crunch de bicicleta', reason: 'Más músculos activados', muscle: 'Abdomen / Oblicuos', series: 3, reps: '15', rest: '—', focus: 'Codo derecho hacia rodilla izquierda alternando. Activa más fibras abdominales.', weightHint: 'Peso corporal' }
      ]
    },
    'bird_dog': {
      description: 'A cuatro patas con las manos bajo los hombros y las rodillas bajo las caderas. Extiende simultáneamente el brazo derecho y la pierna izquierda hasta quedar en línea con el cuerpo. Mantén 2 segundos. Vuelve sin apoyar y repite con el otro lado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_dead_bug', name: 'Dead bug', reason: 'En el suelo, más sencillo', muscle: 'Core / Lumbar', series: 2, reps: '10 (por lado)', rest: '60 seg', focus: 'Tumbada boca arriba. Extiende brazo y pierna contrarios hacia el suelo lentamente. Espalda baja plana.', weightHint: 'Peso corporal' }
      ]
    }
  };

  // =============================================
  // WARMUP
  // =============================================
  var WARMUP = {
    general: '🔥 5 min de movilidad articular (cuello, hombros, muñecas, cadera, tobillos)',
    approach: '➕ 1-2 series de aproximación con peso ligero en el primer ejercicio'
  };

  var WARMUP_EVA = {
    general: '🌸 5 min de movilidad suave: cuello, hombros, caderas, tobillos',
    approach: '➕ 1 serie de aproximación sin peso o muy ligero en el primer ejercicio'
  };

  // =============================================
  // PROFILES
  // =============================================
  var PROFILES = {
    sergio: { name: 'Sergio', initial: 'S', phases: SERGIO_PHASES, warmup: WARMUP, defaultDays: [1, 3, 5], daysLabel: '3 días por semana' },
    eva:    { name: 'Eva',    initial: 'E', phases: EVA_PHASES,    warmup: WARMUP_EVA, defaultDays: [1, 4], daysLabel: '2 días por semana' }
  };

  function migrateOldData() {
    var oldKey = 'gym_calendar_data';
    var newKey = 'gym_calendar_data_sergio';
    try {
      if (!localStorage.getItem(newKey) && localStorage.getItem(oldKey)) {
        localStorage.setItem(newKey, localStorage.getItem(oldKey));
      }
    } catch (e) {}
  }

  migrateOldData();

  var activeProfile = localStorage.getItem('gym_active_profile') || 'sergio';

  // These are updated by switchProfile()
  var PHASES = PROFILES[activeProfile].phases;
  var ACTIVE_WARMUP = PROFILES[activeProfile].warmup;

  // =============================================
  // STATE
  // =============================================
  function getStorageKey() { return 'gym_calendar_data_' + activeProfile; }

  function getDefaultState() {
    return { progress: {}, completions: {}, swaps: {}, settings: { trainingDays: PROFILES[activeProfile].defaultDays.slice() } };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(getStorageKey());
      if (raw) {
        var data = JSON.parse(raw);
        var st = { progress: data.progress || {}, completions: data.completions || {}, swaps: data.swaps || {} };
        st.settings = data.settings || {};
        if (!Array.isArray(st.settings.trainingDays) || st.settings.trainingDays.length === 0) {
          st.settings.trainingDays = PROFILES[activeProfile].defaultDays.slice();
        }
        return st;
      }
    } catch (e) {}
    return getDefaultState();
  }

  function saveState() {
    try { localStorage.setItem(getStorageKey(), JSON.stringify(state)); } catch (e) {}
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

  function getPhaseIndex(dateKey) {
    var week = getWeekNumber(dateKey);
    if (week <= 4) return 0;
    if (week <= 8) return 1;
    return 2;
  }

  function getPhase(dateKey) { return PHASES[Math.min(getPhaseIndex(dateKey), PHASES.length - 1)]; }

  // =============================================
  // ISO WEEK & SCHEDULE HELPERS
  // =============================================
  function isoDow(date) {
    return (date.getDay() + 6) % 7; // Mon=0, Tue=1, ..., Sun=6
  }

  function getMonday(dateObj) {
    var d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 12, 0, 0);
    var day = d.getDay();
    var diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d;
  }

  function getWeekNumber(dateKey) {
    var startKey = getStartDate();
    var start = new Date(startKey + 'T12:00:00');
    var current = new Date(dateKey + 'T12:00:00');
    var mondayStart = getMonday(start);
    var mondayCurrent = getMonday(current);
    if (mondayCurrent < mondayStart) return 0;
    var diffMs = mondayCurrent - mondayStart;
    return Math.floor(diffMs / (7 * 86400000)) + 1;
  }

  function getTrainingDays() {
    if (!state.settings || !Array.isArray(state.settings.trainingDays) || state.settings.trainingDays.length === 0) {
      return [1, 3, 5];
    }
    var days = state.settings.trainingDays.slice();
    days.sort(function(a, b) {
      var aIso = (a + 6) % 7;
      var bIso = (b + 6) % 7;
      return aIso - bIso;
    });
    return days;
  }

  function isTrainingDay(dateKey) {
    var d = new Date(dateKey + 'T12:00:00');
    var day = d.getDay();
    return getTrainingDays().indexOf(day) !== -1;
  }

  function getRoutineSlotForDate(dateKey) {
    if (!isTrainingDay(dateKey)) return -1;
    var d = new Date(dateKey + 'T12:00:00');
    var day = d.getDay();
    var trainingDays = getTrainingDays();
    var slot = trainingDays.indexOf(day);
    if (slot === -1) return -1;
    var phase = getPhase(dateKey);
    return slot % phase.days.length;
  }

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
    var numDays = PHASES[0].days.length;
    var counts = [];
    for (var ci = 0; ci < numDays; ci++) counts.push(0);
    for (var exId in dayCompletions) {
      var idx = findExerciseDay(exId);
      if (idx >= 0 && idx < numDays) counts[idx]++;
    }
    var maxIdx = 0;
    for (var i = 1; i < numDays; i++) { if (counts[i] > counts[maxIdx]) maxIdx = i; }
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

    // If completions exist today, use the actual routine from completions
    if (hasDoneAny) {
      var ri = getRoutineForDate(today);
      return ri !== null ? ri : -1;
    }

    // If today is a training day, return the scheduled routine
    if (isTrainingDay(today)) {
      return getRoutineSlotForDate(today);
    }

    // Rest day with no completions
    return -1;
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
    var phaseIdx = Math.min(getPhaseIndex(today), PHASES.length - 1);
    var phase = PHASES[phaseIdx];

    var html = '';
    if (routineIdx === -1 && !hasDoneAny) {
      var lastDate = getLastWorkoutDate();
      // Find next training day
      var nextDate = null;
      var checkD = new Date(today + 'T12:00:00');
      for (var ci = 1; ci <= 7; ci++) {
        checkD.setDate(checkD.getDate() + 1);
        var ck = getDateKey(checkD);
        if (isTrainingDay(ck)) { nextDate = ck; break; }
      }
      var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      html = '<div class="routine-status-card rest">';
      html += '  <div class="routine-status-top"><div class="routine-status-emoji">🛌</div><div class="routine-status-text">Hoy es <strong>descanso</strong></div></div>';
      html += '  <div class="routine-status-sub">';
      if (lastDate) {
        var d = new Date(lastDate + 'T12:00:00');
        var lr = getRoutineForDate(lastDate);
        var rn = lr !== null ? phase.days[lr].day : '—';
        html += 'El ' + formatDateShort(d) + ' hiciste <strong>' + rn + '</strong>. ¡Recupérate bien! 💪';
      } else {
        html += '¡Empieza tu plan! Selecciona un día de entreno para comenzar. 💪';
      }
      if (nextDate) {
        var nd = new Date(nextDate + 'T12:00:00');
        html += ' Próximo entreno: <strong>' + dayNames[nd.getDay()] + '</strong>.';
      }
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
  // EXPAND / COLLAPSE & EXERCISE SWAP
  // =============================================
  var expandedCards = {};

  function getEffectiveExercises(day, dateKey) {
    var key = dateKey || getTodayKey();
    var todaySwaps = (state.swaps && state.swaps[key]) ? state.swaps[key] : {};
    return day.exercises.map(function(origEx) {
      var swapped = todaySwaps[origEx.id];
      return { ex: swapped || origEx, originalId: origEx.id, isSwapped: !!swapped };
    });
  }

  function toggleExpand(originalId) {
    expandedCards[originalId] = !expandedCards[originalId];
    var body = document.getElementById('body-' + originalId);
    var chevron = document.getElementById('chevron-' + originalId);
    if (body) body.classList.toggle('expanded', !!expandedCards[originalId]);
    if (chevron) chevron.textContent = expandedCards[originalId] ? '˅' : '›';
  }

  function swapExercise(originalId, altExercise) {
    if (!state.swaps) state.swaps = {};
    var key = getTodayKey();
    if (!state.swaps[key]) state.swaps[key] = {};
    state.swaps[key][originalId] = altExercise;
    saveState();
    expandedCards[originalId] = true;
    renderCurrentDay();
    showToast('↔ ' + altExercise.name);
  }

  function revertSwap(originalId) {
    var key = getTodayKey();
    if (state.swaps && state.swaps[key]) {
      delete state.swaps[key][originalId];
      saveState();
    }
    renderCurrentDay();
    showToast('Ejercicio original restaurado');
  }

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

    // Warmup card
    var phaseIdx = getPhaseIndex(getTodayKey());
    var warmupEmphasis;
    if (phaseIdx === 0) {
      warmupEmphasis = activeProfile === 'eva'
        ? '🌸 <strong>Mes 1: Movimientos suaves y controlados.</strong> Escucha tu cuerpo. Si algo duele, para. Empieza sin peso o muy ligero.'
        : '🔧 <strong>Mes 1: Prioriza la técnica sobre el peso.</strong> Aprende el movimiento, controla cada repetición. Empieza ligero, sube solo si la técnica es perfecta.';
    } else {
      warmupEmphasis = '🔥 Calentamiento: movilidad articular + series de aproximación.';
    }
    html += '<div class="warmup-card">';
    html += '  <div class="warmup-card-icon">🔥</div>';
    html += '  <div class="warmup-card-content">';
    html += '    <div class="warmup-card-text">' + ACTIVE_WARMUP.general + '</div>';
    html += '    <div class="warmup-card-text">' + ACTIVE_WARMUP.approach + '</div>';
    html += '    <div class="warmup-card-emphasis">' + warmupEmphasis + '</div>';
    html += '  </div>';
    html += '</div>';

    var effectiveExercises = getEffectiveExercises(day);

    effectiveExercises.forEach(function (item, idx) {
      var ex = item.ex;
      var originalId = item.originalId;
      var isSwapped = item.isSwapped;
      var isCompleted = !!completions[ex.id];
      var lastWeight = getLastWeight(ex.id);
      var meta = EXERCISE_META[ex.id] || EXERCISE_META[originalId] || {};
      var isExpanded = !!expandedCards[originalId];
      var repsLabel = ex.series + '×' + ex.reps;

      html += '<div class="exercise-card' + (isCompleted ? ' completed' : '') + '" id="card-' + originalId + '">';

      // HEADER (always visible)
      html += '<div class="exercise-header" id="header-' + originalId + '">';
      html += '  <div class="exercise-info">';
      html += '    <div class="exercise-name">' + (idx + 1) + '. ' + ex.name + '</div>';
      html += '    <div class="exercise-header-meta">';
      html += '      <span class="exercise-muscle">' + ex.muscle + '</span>';
      html += '      <span class="exercise-collapsed-meta">' + repsLabel + '</span>';
      if (isSwapped) html += '      <span class="exercise-swap-badge">↔</span>';
      html += '    </div>';
      html += '  </div>';
      html += '  <button class="check-btn' + (isCompleted ? ' checked' : '') + '" data-ex="' + ex.id + '" data-orig="' + originalId + '">' + (isCompleted ? '✓' : '') + '</button>';
      html += '  <span class="exercise-chevron" id="chevron-' + originalId + '">' + (isExpanded ? '˅' : '›') + '</span>';
      html += '</div>';

      // BODY (expandable)
      html += '<div class="exercise-body' + (isExpanded ? ' expanded' : '') + '" id="body-' + originalId + '">';

      html += '  <div class="exercise-details">';
      html += '    <div class="exercise-detail-item"><span class="icon">🔄</span><span><span class="label">Series: </span><span class="value">' + ex.series + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">🔁</span><span><span class="label">Reps: </span><span class="value">' + ex.reps + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">⏱️</span><span><span class="label">Descanso: </span><span class="value">' + ex.rest + '</span></span></div>';
      html += '  </div>';

      html += '  <div class="exercise-focus"><div class="focus-label">💡 Enfoque clave</div>' + ex.focus + '</div>';

      if (meta.description) {
        html += '  <div class="exercise-description">' + meta.description + '</div>';
      }

      if (meta.videoUrl) {
        html += '  <div class="exercise-video-wrapper"><iframe src="' + meta.videoUrl + '?rel=0&modestbranding=1" allowfullscreen loading="lazy" title="' + ex.name + '"></iframe></div>';
      }

      if (ex.weightHint) {
        html += '  <div class="exercise-weight-hint">💡 ' + ex.weightHint + '</div>';
      }

      html += '  <div class="exercise-weight-section">';
      html += '    <div class="weight-row"><div class="weight-input-group"><input type="number" class="weight-input" id="weight-' + ex.id + '" value="' + (lastWeight !== null ? lastWeight : '') + '" placeholder="' + (lastWeight !== null ? lastWeight : '0') + '" inputmode="decimal" step="0.5" min="0"><span class="weight-unit">kg</span></div><button class="weight-save-btn" data-ex="' + ex.id + '">Guardar</button></div>';
      html += '    <div class="weight-history" id="history-' + ex.id + '">' + renderWeightHistory(ex.id) + '</div>';
      html += '    <div id="suggestion-' + ex.id + '"></div>';
      html += '  </div>';

      if (!isSwapped && meta.alternatives && meta.alternatives.length > 0) {
        html += '  <div class="exercise-alternatives">';
        html += '    <div class="alternatives-title">🔀 Alternativas</div>';
        meta.alternatives.forEach(function(alt, ai) {
          html += '    <div class="alternative-item">';
          html += '      <div class="alternative-info"><div class="alternative-name">' + alt.name + '</div><div class="alternative-reason">' + alt.reason + '</div></div>';
          html += '      <button class="swap-btn" data-orig="' + originalId + '" data-alt-idx="' + ai + '">Usar</button>';
          html += '    </div>';
        });
        html += '  </div>';
      }

      if (isSwapped) {
        html += '  <div class="swap-indicator">⇔ Usando alternativa · <button class="revert-btn" data-orig="' + originalId + '">Volver al original</button></div>';
      }

      html += '</div>'; // end exercise-body
      html += '</div>'; // end exercise-card
    });

    container.innerHTML = html;

    container.querySelectorAll('.exercise-header').forEach(function(header) {
      var origId = header.id.replace('header-', '');
      header.addEventListener('click', function(e) {
        if (e.target.closest('.check-btn')) return;
        toggleExpand(origId);
      });
    });

    container.querySelectorAll('.check-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleCompletion(btn.dataset.ex);
      });
    });

    container.querySelectorAll('.weight-save-btn').forEach(function(btn) {
      (function(exId) {
        var weightInput = container.querySelector('#weight-' + exId);
        if (weightInput) {
          btn.addEventListener('click', function() {
            var val = weightInput.value.trim();
            if (val && parseFloat(val) >= 0) saveWeight(exId, parseFloat(val));
            else showToast('Introduce un peso válido');
          });
          weightInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') btn.click(); });
        }
      })(btn.dataset.ex);
    });

    container.querySelectorAll('.swap-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var origId = btn.dataset.orig;
        var ai = parseInt(btn.dataset.altIdx, 10);
        var meta = EXERCISE_META[origId] || {};
        if (meta.alternatives && meta.alternatives[ai]) swapExercise(origId, meta.alternatives[ai]);
      });
    });

    container.querySelectorAll('.revert-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        revertSwap(btn.dataset.orig);
      });
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
    var effExs = getEffectiveExercises(day);
    effExs.forEach(function (item) { if (completions[item.ex.id]) done++; });
    var pct = effExs.length > 0 ? Math.round((done / effExs.length) * 100) : 0;
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
    getEffectiveExercises(day).forEach(function (item) {
      var ex = item.ex;
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

    // ---- Schedule settings (day selector) ----
    var dayLabelsShort = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    var dayNamesFull = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var dayGetDayMap = [1, 2, 3, 4, 5, 6, 0]; // Mon=1 ... Sun=0
    var currentTrainingDays = getTrainingDays();

    html += '<div class="schedule-settings">';
    html += '  <div class="schedule-settings-title">📅 Tus días de entrenamiento</div>';
    html += '  <div class="schedule-settings-chips">';
    for (var ci = 0; ci < 7; ci++) {
      var dVal = dayGetDayMap[ci];
      var isActive = currentTrainingDays.indexOf(dVal) !== -1;
      html += '    <button class="weekday-chip' + (isActive ? ' active' : '') + '" data-day="' + dVal + '">' + dayLabelsShort[ci] + '</button>';
    }
    html += '  </div>';
    html += '  <div class="schedule-settings-hint">Recomendado: ' + PROFILES[activeProfile].daysLabel + '</div>';
    html += '</div>';

    // ---- Calendar ----
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
      var isPast = cellDate < todayKey;
      var isFuture = cellDate > todayKey;
      var scheduled = isTrainingDay(cellDate);
      var routineIdx = scheduled ? getRoutineSlotForDate(cellDate) : -1;

      var cls = 'calendar-day clickable';
      if (isToday) cls += ' today';
      if (isSelected) cls += ' selected';
      if (isFuture) cls += ' future';

      if (attended !== undefined && attended >= 0) {
        // Done: attended
        cls += ' attended done';
        cls += attended === 0 ? ' routine-push' : attended === 1 ? ' routine-pull' : ' routine-legs';
      } else if (scheduled && isToday) {
        // Planned for today (not yet done)
        cls += ' routine-push'; // Will be overridden by routine class below
        cls += routineIdx === 0 ? ' routine-push' : routineIdx === 1 ? ' routine-pull' : ' routine-legs';
      } else if (scheduled && isFuture) {
        // Planned future
        cls += ' planned';
        cls += routineIdx === 0 ? ' routine-push' : routineIdx === 1 ? ' routine-pull' : ' routine-legs';
      } else if (scheduled && isPast) {
        // Missed (scheduled but not done)
        cls += ' missed';
        cls += routineIdx === 0 ? ' routine-push' : routineIdx === 1 ? ' routine-pull' : ' routine-legs';
      } else {
        // Rest day
        cls += ' rest';
      }

      html += '<div class="' + cls + '" data-date="' + cellDate + '">';
      if (attended !== undefined && attended >= 0) {
        html += '<span class="cal-day-emoji">' + getPhase(cellDate).days[attended].emoji + '</span>';
      } else if (scheduled) {
        html += '<span class="cal-day-emoji">' + getPhase(cellDate).days[routineIdx].emoji + '</span>';
      } else {
        html += '<span class="cal-day-emoji rest-dot">·</span>';
      }
      html += '<span class="cal-day-num">' + day + '</span>';
      if (attended !== undefined && attended >= 0) {
        html += '<span class="cal-day-check">✓</span>';
      }
      html += '</div>';
    }

    html += '  </div>';
    html += '  <div class="calendar-legend">';
    var legendColors = ['#e94560', '#0f3460', '#2ecc71'];
    for (var li = 0; li < PHASES[0].days.length; li++) {
      html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:' + legendColors[li] + ';"></span> ' + PHASES[0].days[li].day + '</span>';
    }
    html += '    <span class="calendar-legend-item"><span class="legend-box rest-box"></span> Descanso</span>';
    html += '  </div>';
    html += '</div>';

    html += '<div class="day-detail" id="dayDetail">' + renderDayDetail(selectedDate) + '</div>';
    container.innerHTML = html;

    // Weekday chip toggle
    container.querySelectorAll('.weekday-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var dayVal = parseInt(chip.dataset.day, 10);
        var days = state.settings.trainingDays.slice();
        var idx = days.indexOf(dayVal);
        if (idx !== -1) {
          if (days.length <= 1) {
            showToast('Selecciona al menos un día');
            return;
          }
          days.splice(idx, 1);
        } else {
          days.push(dayVal);
        }
        state.settings.trainingDays = days;
        saveState();
        // Preserve selected date
        var selDate = container.dataset.selectedDate;
        renderHome();
        // Re-apply selected date
        var newContainer = document.getElementById('homeContent');
        if (newContainer && selDate) newContainer.dataset.selectedDate = selDate;
      });
    });

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

  function renderDayDetail(dateKey) {
    var d = new Date(dateKey + 'T12:00:00');
    var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var dayName = dayNames[d.getDay()];
    var formatted = formatDateShort(d);
    var todayKey = getTodayKey();
    var isPast = dateKey < todayKey;
    var isFuture = dateKey > todayKey;
    var isToday = dateKey === todayKey;

    // Determine phase for this date
    var phase = getPhase(dateKey);
    var weekNum = getWeekNumber(dateKey);
    var scheduled = isTrainingDay(dateKey);
    var routineIdx = scheduled ? getRoutineSlotForDate(dateKey) : -1;
    var phaseInfo = ' · ' + phase.name;

    // Check for completions / weight data
    var completions = getCompletionsForDate(dateKey);
    var hasData = false;
    for (var k in completions) { hasData = true; break; }
    if (!hasData) {
      for (var exId in state.progress) {
        for (var i = 0; i < state.progress[exId].length; i++) {
          if (state.progress[exId][i].date === dateKey) { hasData = true; break; }
        }
        if (hasData) break;
      }
    }

    // If there's data (completions or weights), show the data view
    if (hasData) {
      return renderDayDetailWithData(dateKey, completions, formatted, dayName, phase, weekNum);
    }

    // Rest day (not scheduled, no data)
    if (!scheduled) {
      var nextDate = null;
      var checkD = new Date(dateKey + 'T12:00:00');
      for (var ci = 1; ci <= 7; ci++) {
        checkD.setDate(checkD.getDate() + 1);
        var ck = getDateKey(checkD);
        if (isTrainingDay(ck)) { nextDate = ck; break; }
      }
      var nextText = '';
      if (nextDate) {
        var nd = new Date(nextDate + 'T12:00:00');
        nextText = ' Próximo entreno: ' + dayNames[nd.getDay()] + ' ' + formatDateShort(nd) + '.';
      }
      return '<div class="day-detail-empty"><div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div><div class="day-detail-msg">🛌 Descanso</div><div class="day-detail-sub">Día libre. Aprovecha para recuperar 💪' + nextText + '</div></div>';
    }

    // Scheduled training day
    var day = phase.days[routineIdx];

    if (isFuture || isToday) {
      // Future or today (not yet done)
      var verb = isFuture ? 'Te tocará' : 'Hoy toca';
      var html = '<div class="day-detail-data">';
      html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div>';
      html += '  <div class="day-detail-routine">' + day.emoji + ' ' + day.day + ' · Semana ' + weekNum + '</div>';
      html += '  <div class="day-detail-exercises">';
      day.exercises.forEach(function (ex) {
        html += '    <div class="day-detail-ex-item"><div class="dd-ex-name">' + ex.name + '</div><div class="dd-ex-meta"><span class="dd-ex-muscle">' + ex.muscle + '</span><span class="dd-ex-reps">' + ex.series + '×' + ex.reps + '</span></div></div>';
      });
      html += '  </div>';
      html += '  <div class="day-detail-summary">📋 ' + verb + ' ' + day.day + ' · ' + day.exercises.length + ' ejercicios</div>';
      html += '</div>';
      return html;
    }

    // Past scheduled day with no data (missed)
    var html = '<div class="day-detail-data">';
    html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div>';
    html += '  <div class="day-detail-routine">' + day.emoji + ' ' + day.day + ' · Semana ' + weekNum + '</div>';
    html += '  <div class="day-detail-exercises">';
    day.exercises.forEach(function (ex) {
      html += '    <div class="day-detail-ex-item"><div class="dd-ex-name">' + ex.name + '</div><div class="dd-ex-meta"><span class="dd-ex-muscle">' + ex.muscle + '</span><span class="dd-ex-reps">' + ex.series + '×' + ex.reps + '</span></div></div>';
    });
    html += '  </div>';
    html += '  <div class="day-detail-summary">📋 Entrenamiento planificado (sin registrar) · ' + day.exercises.length + ' ejercicios</div>';
    html += '</div>';
    return html;
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
    var trainingDays = getTrainingDays();
    var totalDays = trainingDays.length;
    var weeks = {};
    dates.forEach(function (dateStr) {
      var d = new Date(dateStr + 'T12:00:00');
      var monday = getMonday(d);
      var weekKey = getDateKey(monday);
      if (!weeks[weekKey]) weeks[weekKey] = { monday: monday, dates: [] };
      weeks[weekKey].dates.push(dateStr);
    });
    var weeklyData = [];
    for (var wk in weeks) {
      var dayNs = weeks[wk].dates.map(function (d) { return new Date(d + 'T12:00:00').getDay(); });
      var attended = 0;
      trainingDays.forEach(function (td) {
        if (dayNs.indexOf(td) >= 0) attended++;
      });
      // Extra sessions on non-programmed days count up to total
      var extraCount = 0;
      dayNs.forEach(function (day) {
        if (trainingDays.indexOf(day) === -1) extraCount++;
      });
      attended = Math.min(attended + extraCount, totalDays);
      weeklyData.push({ weekStart: weeks[wk].monday, attended: attended, total: totalDays });
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
        var dots = '';
        for (var di = 0; di < w.total; di++) {
          dots += '<span class="week-dot ' + (w.attended > di ? 'done' : '') + '">W</span>';
        }
        html += '<div class="weekly-row"><span class="week-label">' + formatDateShort(w.weekStart) + '</span><div class="week-days">' + dots + '</div><span class="week-count">' + w.attended + '/' + w.total + ' (' + pct + '%)</span></div>';
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
  // PROFILE SWITCHER
  // =============================================
  function updateProfileUI() {
    var badge = document.getElementById('profileBadge');
    var subtitle = document.getElementById('appSubtitle');
    var profile = PROFILES[activeProfile];
    if (badge) {
      badge.textContent = profile.initial;
      badge.dataset.profile = activeProfile;
    }
    if (subtitle) subtitle.textContent = profile.daysLabel;
    // Mark active option in modal
    document.querySelectorAll('.profile-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.profile === activeProfile);
    });
  }

  function openProfileSelector() {
    var modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('hidden');
  }

  function closeProfileSelector() {
    var modal = document.getElementById('profileModal');
    if (modal) modal.classList.add('hidden');
  }

  function switchProfile(profileId) {
    if (!PROFILES[profileId]) return;
    activeProfile = profileId;
    localStorage.setItem('gym_active_profile', activeProfile);
    PHASES = PROFILES[activeProfile].phases;
    ACTIVE_WARMUP = PROFILES[activeProfile].warmup;
    state = loadState();
    updateProfileUI();
    renderRoutineStatus();
    renderCurrentDay();
    updateAll();
    if (currentTab === 'home') renderHome();
    if (currentTab === 'stats') renderStats();
    closeProfileSelector();
    showToast('Perfil: ' + PROFILES[activeProfile].name);
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    renderRoutineStatus();
    renderCurrentDay();
    updateAll();
    updateProfileUI();

    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
    });

    document.addEventListener('input', function (e) {
      if (e.target && e.target.classList.contains('weight-input')) scheduleSuggestionCheck();
    });

    var badge = document.getElementById('profileBadge');
    if (badge) badge.addEventListener('click', openProfileSelector);

    var overlay = document.getElementById('profileModalOverlay');
    if (overlay) overlay.addEventListener('click', closeProfileSelector);

    document.querySelectorAll('.profile-option').forEach(function (btn) {
      btn.addEventListener('click', function () { switchProfile(btn.dataset.profile); });
    });

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
    }

    var vEl = document.getElementById('appVersion');
    if (vEl) vEl.textContent = 'v' + APP_VERSION;

    console.log('🏋️ Gym Calendar v' + APP_VERSION);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
