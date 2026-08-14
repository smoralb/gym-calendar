/* =============================================
   Gym Calendar - App de Rutina de Ejercicios
   Versión: 4.9.0 — Finalizar entrenamiento y detalle simplificado
   ============================================= */

(function () {
  'use strict';

  var APP_VERSION = '4.9.0';

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
  // GELY_PHASES: plan tonificación Full Body 3 días/semana + remo
  // =============================================
  var GELY_PHASES = [
    // ---- MES 1: Fundamentos (Semanas 1-4) ----
    {
      id: 'gely_mes1',
      name: 'Mes 1 · Fundamentos',
      subtitle: 'Semanas 1 a 4 — Aprende la técnica, pesa ligero',
      weeks: [1, 2, 3, 4],
      days: [
        {
          id: 'diaA', day: 'Tren Inferior', emoji: '🍑',
          title: 'Glúteos, Piernas y Core',
          exercises: [
            { id: 'sentadilla_goblet_gely', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Mancuerna al pecho. Baja como si te sentaras. Espalda recta. Peso ligero, domina la técnica.', weightHint: '3-5 kg (1 mancuerna)' },
            { id: 'hip_thrust_gely', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 3, reps: '15', repsMin: 15, repsMax: 15, rest: '90 seg', focus: 'Espalda en el banco. Mancuerna sobre caderas. Sube apretando glúteo. Pausa 1 seg arriba.', weightHint: '5-7.5 kg (1 mancuerna)' },
            { id: 'peso_muerto_rumano', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Empuja cadera atrás. Espalda recta. Siente el estiramiento detrás del muslo.', weightHint: '3-5 kg / mancuerna' },
            { id: 'zancada_gely', name: 'Zancada estática', muscle: 'Piernas en general', series: 2, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Paso al frente y baja vertical. Rodilla trasera hacia el suelo. Solo peso corporal al inicio.', weightHint: 'Peso corporal' },
            { id: 'plancha', name: 'Plancha abdominal', muscle: 'Core', series: 3, reps: '30 seg', repsMin: 30, repsMax: 30, rest: '60 seg', isTimed: true, focus: 'Cuerpo recto de cabeza a talones. Aprieta abdomen y glúteos. Respira constante.', weightHint: 'Peso corporal' },
            { id: 'elevacion_cadera_gely', name: 'Puente de glúteos', muscle: 'Glúteos', series: 2, reps: '15', repsMin: 15, repsMax: 15, rest: '60 seg', focus: 'Tumbada boca arriba. Sube cadera apretando glúteo. 1 seg arriba. Baja controlado.', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'diaB', day: 'Tren Superior', emoji: '💪',
          title: 'Pecho, Espalda, Hombros y Brazos',
          exercises: [
            { id: 'press_pecho_gely', name: 'Press de pecho con mancuernas', muscle: 'Pecho / Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Tumbada en el banco. Controla la bajada. Empuja suave. Peso ligero, siente el pecho.', weightHint: '2-3 kg / mancuerna' },
            { id: 'remo_una_mano', name: 'Remo a una mano en banco', muscle: 'Espalda / Bíceps', series: 3, reps: '12 (por brazo)', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Apoya rodilla y mano en banco. Tira hacia la cadera. Espalda paralela al suelo.', weightHint: '3-5 kg / mancuerna' },
            { id: 'press_militar_sentado', name: 'Press de hombros sentada', muscle: 'Hombros', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Sentada con espalda apoyada. Empuja hacia arriba. Muy ligero, controla el movimiento.', weightHint: '2-3 kg / mancuerna' },
            { id: 'elevaciones_laterales', name: 'Elevaciones laterales', muscle: 'Hombro (Lateral)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sube brazos a los lados. Peso muy ligero. Sin balanceo. Siente el hombro.', weightHint: '1-2 kg / mancuerna' },
            { id: 'curl_biceps', name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Codos pegados al cuerpo. Sin balanceo. Sube y baja controlado.', weightHint: '2-3 kg / mancuerna' },
            { id: 'extension_triceps', name: 'Extensión de tríceps tras nuca', muscle: 'Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Una mancuerna con ambas manos. Codos cerrados. Baja detrás de la cabeza.', weightHint: '3-5 kg (1 mancuerna)' }
          ]
        },
        {
          id: 'diaC', day: 'Cuerpo Completo', emoji: '⚡',
          title: 'Full Body + Glúteo',
          exercises: [
            { id: 'sentadilla_bulgara_gely', name: 'Sentadilla búlgara', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Pie trasero en el banco. Baja con control. Rodilla delantera alineada. Peso corporal.', weightHint: 'Peso corporal' },
            { id: 'remo_inclinado_gely', name: 'Remo inclinado bilateral', muscle: 'Espalda (Grosor)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Inclinada a 45° con una mancuerna en cada mano. Tira hacia la cadera. Espalda recta.', weightHint: '3-5 kg / mancuerna' },
            { id: 'hip_thrust_gely', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Más repeticiones concentradas. Pausa 1 seg arriba apretando el glúteo.', weightHint: '5-7.5 kg (1 mancuerna)' },
            { id: 'flexiones', name: 'Flexiones de pecho', muscle: 'Pecho / Tríceps', series: 3, reps: '8', repsMin: 8, repsMax: 8, rest: '60 seg', focus: 'Cuerpo recto de cabeza a talones. Baja el pecho al suelo. Codos a 45°.', weightHint: 'Peso corporal' },
            { id: 'bird_dog', name: 'Bird-Dog (cuadrupedia)', muscle: 'Core / Lumbar', series: 3, reps: '10 (por lado)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'A cuatro patas. Extiende brazo y pierna contrarios. Mantén 2 seg. Muy estabilizador.', weightHint: 'Peso corporal' },
            { id: 'patada_gluteo_gely', name: 'Patada de glúteo en cuadrupedia', muscle: 'Glúteos', series: 3, reps: '15 (por pierna)', repsMin: 15, repsMax: 15, rest: '60 seg', focus: 'A cuatro patas. Eleva pierna flexionada hacia arriba. Aprieta glúteo arriba. Controlado.', weightHint: 'Peso corporal' }
          ]
        }
      ]
    },

    // ---- MES 2: Activación (Semanas 5-8) ----
    {
      id: 'gely_mes2',
      name: 'Mes 2 · Activación',
      subtitle: 'Semanas 5 a 8 — Más peso, más volumen',
      weeks: [5, 6, 7, 8],
      days: [
        {
          id: 'diaA', day: 'Tren Inferior', emoji: '🍑',
          title: 'Glúteos, Piernas y Core',
          exercises: [
            { id: 'sentadilla_goblet_gely', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más profundidad que mes 1. Sube carga progresivamente. Controla la bajada.', weightHint: '+1-2 kg respecto mes 1' },
            { id: 'hip_thrust_gely', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Más peso. Pausa 2 segundos arriba apretando el glúteo. Nota la contracción.', weightHint: '+2 kg respecto mes 1' },
            { id: 'peso_muerto_rumano', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso. Controla el descenso. Nota la tensión isquiotibial.', weightHint: '+1-2 kg respecto mes 1' },
            { id: 'zancada_gely', name: 'Zancada estática con mancuernas', muscle: 'Piernas en general', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Añade mancuernas ligeras. Mantén torso firme. Rodilla trasera sin tocar suelo.', weightHint: '2-3 kg / mancuerna' },
            { id: 'plancha', name: 'Plancha abdominal', muscle: 'Core', series: 3, reps: '40 seg', repsMin: 40, repsMax: 40, rest: '60 seg', isTimed: true, focus: 'Mantén la tensión 40 seg. Aprieta abdomen y glúteos. Respira constante.', weightHint: 'Peso corporal' },
            { id: 'elevacion_cadera_gely', name: 'Puente de glúteos a una pierna', muscle: 'Glúteos', series: 3, reps: '15 (por pierna)', repsMin: 15, repsMax: 15, rest: '60 seg', focus: 'Una pierna extendida. Sube cadera apretando glúteo. Más intenso que bilateral.', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'diaB', day: 'Tren Superior', emoji: '💪',
          title: 'Pecho, Espalda, Hombros y Brazos',
          exercises: [
            { id: 'press_pecho_gely', name: 'Press de pecho con mancuernas', muscle: 'Pecho / Tríceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso que mes 1. Controla la bajada en 2 segundos.', weightHint: '+1 kg respecto mes 1' },
            { id: 'remo_una_mano', name: 'Remo a una mano en banco', muscle: 'Espalda / Bíceps', series: 3, reps: '10 (por brazo)', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso. Sostén 1 segundo la contracción. Espalda paralela al suelo.', weightHint: '+1-2 kg respecto mes 1' },
            { id: 'press_arnold_gely', name: 'Press Arnold sentada', muscle: 'Hombros', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Empieza con palmas hacia ti. Rota mientras subes. Trabaja más cabezas del hombro.', weightHint: '2-3 kg / mancuerna' },
            { id: 'pajaro', name: 'Pájaro con mancuernas (sentada)', muscle: 'Hombro (Posterior)', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Pecho pegado a los muslos. Peso muy ligero. Movimiento sin balanceo.', weightHint: '1-2 kg / mancuerna' },
            { id: 'curl_martillo', name: 'Curl de bíceps tipo martillo', muscle: 'Bíceps / Antebrazo', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Palmas mirándose entre sí. Trabaja grosor del brazo. Sin balanceo.', weightHint: '2-3 kg / mancuerna' },
            { id: 'fondos_triceps', name: 'Fondos de tríceps en banco', muscle: 'Tríceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Manos en el banco. Flexiona codos hacia atrás. Baja y sube controlado.', weightHint: 'Peso corporal' }
          ]
        },
        {
          id: 'diaC', day: 'Cuerpo Completo', emoji: '⚡',
          title: 'Full Body + Glúteo',
          exercises: [
            { id: 'sentadilla_bulgara_gely', name: 'Sentadilla búlgara con mancuernas', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Añade mancuernas. Pie trasero en banco. Baja controlado. Rodilla alineada.', weightHint: '2-3 kg / mancuerna' },
            { id: 'remo_inclinado_gely', name: 'Remo inclinado bilateral', muscle: 'Espalda (Grosor)', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Más peso que mes 1. Tira hacia la cadera. Sostén 1 seg la contracción.', weightHint: '+1-2 kg respecto mes 1' },
            { id: 'hip_thrust_gely', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg', focus: 'Consolida tu peso. Pausa 2 seg arriba. Máxima contracción de glúteo.', weightHint: '' },
            { id: 'flexiones', name: 'Flexiones de pecho', muscle: 'Pecho / Tríceps', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Cuerpo recto. Baja pecho al suelo. Si es necesario, rodillas en suelo.', weightHint: 'Peso corporal' },
            { id: 'dead_bug_gely', name: 'Dead bug', muscle: 'Core / Lumbar', series: 3, reps: '10 (por lado)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Tumbada boca arriba. Extiende brazo y pierna contrarios lentamente. Espalda baja plana.', weightHint: 'Peso corporal' },
            { id: 'patada_gluteo_gely', name: 'Patada de glúteo con mancuerna', muscle: 'Glúteos', series: 3, reps: '12 (por pierna)', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'A cuatro patas con mancuerna en la corva. Eleva pierna flexionada. Control total.', weightHint: '1-2 kg (1 mancuerna)' }
          ]
        }
      ]
    },

    // ---- MES 3: Tono (Semanas 9-12) ----
    {
      id: 'gely_mes3',
      name: 'Mes 3 · Tono',
      subtitle: 'Semanas 9 a 12 — Intensidad y fuerza máxima',
      weeks: [9, 10, 11, 12],
      days: [
        {
          id: 'diaA', day: 'Tren Inferior', emoji: '🍑',
          title: 'Glúteos, Piernas y Core',
          exercises: [
            { id: 'sentadilla_goblet_gely', name: 'Sentadilla Goblet', muscle: 'Cuádriceps / Glúteo', series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Profundidad máxima con técnica perfecta.', weightHint: 'Tu récord' },
            { id: 'hip_thrust_gely', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 4, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Tu récord de peso. Pausa 2 segundos arriba apretando el glúteo.', weightHint: 'Tu récord' },
            { id: 'peso_muerto_rumano', name: 'Peso muerto rumano con mancuernas', muscle: 'Isquios / Glúteo', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Récord de peso. Espalda perfectamente recta. Controla el descenso.', weightHint: 'Tu récord' },
            { id: 'zancada_gely', name: 'Zancada estática con mancuernas', muscle: 'Piernas en general', series: 3, reps: '10 (por pierna)', repsMin: 10, repsMax: 10, rest: '60 seg', focus: 'Más peso. Mantén torso firme. Rodilla trasera cerca del suelo sin tocar.', weightHint: '3-5 kg / mancuerna' },
            { id: 'plancha_lateral_gely', name: 'Plancha lateral', muscle: 'Core / Oblicuos', series: 3, reps: '30 seg (por lado)', repsMin: 30, repsMax: 30, rest: '60 seg', isTimed: true, focus: 'Apóyate en un antebrazo lateralmente. Cuerpo en línea recta. Trabaja oblicuos.', weightHint: 'Peso corporal' },
            { id: 'elevacion_cadera_gely', name: 'Puente de glúteos a una pierna con peso', muscle: 'Glúteos', series: 3, reps: '15 (por pierna)', repsMin: 15, repsMax: 15, rest: '60 seg', focus: 'Mancuerna sobre cadera. Una pierna extendida. Sube y baja controlado.', weightHint: '3-5 kg (1 mancuerna)' }
          ]
        },
        {
          id: 'diaB', day: 'Tren Superior', emoji: '💪',
          title: 'Pecho, Espalda, Hombros y Brazos',
          exercises: [
            { id: 'press_pecho_gely', name: 'Press de pecho con mancuernas', muscle: 'Pecho / Tríceps', series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Exprimir el pectoral arriba. Controla la bajada en 3 seg.', weightHint: 'Tu récord' },
            { id: 'remo_una_mano', name: 'Remo a una mano en banco', muscle: 'Espalda / Bíceps', series: 4, reps: '8 (por brazo)', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Tracciona con máxima energía. Espalda paralela.', weightHint: 'Tu récord' },
            { id: 'press_militar_sentado', name: 'Press de hombros sentada', muscle: 'Hombros', series: 3, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Consolida tu peso. Bloqueo firme arriba. Espalda bien apoyada.', weightHint: '' },
            { id: 'combo_hombro_gely', name: 'Elev. laterales + Pájaro (combo)', muscle: 'Hombro', series: 2, reps: '12+12', repsMin: 12, repsMax: 12, rest: '—', focus: 'Sin descanso entre ambos. Quemazón total en hombros. Peso muy ligero.', weightHint: '1-2 kg / mancuerna' },
            { id: 'curl_concentrado', name: 'Curl de bíceps concentrado', muscle: 'Bíceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Sentada, codo apoyado en muslo. Aísla el bíceps al 100%. Pausa arriba.', weightHint: '3-5 kg / mancuerna' },
            { id: 'combo_triceps_gely', name: 'Ext. tras nuca + Fondos (combo)', muscle: 'Tríceps', series: 2, reps: '10+10', repsMin: 10, repsMax: 10, rest: '—', focus: 'Sin descanso entre ambos. Fatiga máxima de tríceps.', weightHint: '3-5 kg + peso corporal' }
          ]
        },
        {
          id: 'diaC', day: 'Cuerpo Completo', emoji: '⚡',
          title: 'Full Body + Glúteo',
          exercises: [
            { id: 'sentadilla_bulgara_gely', name: 'Sentadilla búlgara con mancuernas', muscle: 'Cuádriceps / Glúteo', series: 4, reps: '8 (por pierna)', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Pie trasero en banco. Baja controlado. Fuerza máxima.', weightHint: '3-5 kg / mancuerna' },
            { id: 'remo_inclinado_gely', name: 'Remo inclinado bilateral', muscle: 'Espalda (Grosor)', series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '90 seg', focus: 'Récord de peso. Tracciona con energía. Sostén 1 seg la contracción.', weightHint: 'Tu récord' },
            { id: 'hip_thrust_gely', name: 'Hip Thrust con mancuerna', muscle: 'Glúteos', series: 4, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg', focus: 'Peso máximo. Pausa 2 seg arriba. Contracción total de glúteo.', weightHint: 'Tu récord' },
            { id: 'flexiones', name: 'Flexiones de pecho', muscle: 'Pecho / Tríceps', series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '60 seg', focus: 'Máximo volumen. Baja pecho al suelo. Codos a 45°. Cuerpo recto.', weightHint: 'Peso corporal' },
            { id: 'plancha', name: 'Plancha abdominal', muscle: 'Core', series: 3, reps: '45 seg', repsMin: 45, repsMax: 45, rest: '60 seg', isTimed: true, focus: 'Máxima tensión global. 45 segundos. Aprieta abdomen y glúteos.', weightHint: 'Peso corporal' },
            { id: 'patada_gluteo_gely', name: 'Patada de glúteo con mancuerna', muscle: 'Glúteos', series: 3, reps: '15 (por pierna)', repsMin: 15, repsMax: 15, rest: '60 seg', focus: 'Máximo volumen. Mancuerna en la corva. Eleva y aprieta. Controla la bajada.', weightHint: '1-2 kg (1 mancuerna)' }
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
    },

    // ---- GELY exercises ----
    'sentadilla_goblet_gely': {
      description: 'De pie, pies separados a la anchura de los hombros con dedos ligeramente hacia afuera. Sostén la mancuerna vertical contra el pecho. Baja como si te sentaras, espalda recta, rodillas siguiendo la dirección de los pies. Sube empujando desde los talones.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_sq_goblet_gely_pc', name: 'Sentadilla con peso corporal', reason: 'Sin mancuerna', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '15', rest: '60 seg', focus: 'Misma técnica sin peso. Perfecto para repasar el patrón de movimiento.', weightHint: 'Peso corporal' },
        { id: 'alt_sq_goblet_gely_band', name: 'Sentadilla con banda elástica', reason: 'Variante con banda', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '15', rest: '60 seg', focus: 'Banda por encima de las rodillas. Activa glúteo medio al bajar y subir.', weightHint: 'Banda ligera' }
      ]
    },
    'hip_thrust_gely': {
      description: 'Espalda apoyada en el banco (borde a la altura de los omóplatos). Mancuerna sobre las caderas. Pies apoyados en el suelo. Sube las caderas apretando los glúteos hasta paralelo. Pausa 1-2 segundos arriba. Baja controlado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_hip_thrust_gely_suelo', name: 'Puente de glúteos con mancuerna', reason: 'Sin banco', muscle: 'Glúteos', series: 3, reps: '15', rest: '90 seg', focus: 'Tumbada en el suelo. Mancuerna sobre caderas. Menor rango pero muy efectivo.', weightHint: 'Misma mancuerna' },
        { id: 'alt_hip_thrust_gely_unilateral', name: 'Hip Thrust a una pierna', reason: 'Mayor intensidad unilateral', muscle: 'Glúteos', series: 3, reps: '12 (por pierna)', rest: '90 seg', focus: 'Una pierna elevada. Solo peso corporal. Más difícil y activador.', weightHint: 'Peso corporal' }
      ]
    },
    'zancada_gely': {
      description: 'De pie, da un paso largo al frente manteniendo el torso recto. Baja verticalmente hasta que la rodilla trasera casi toque el suelo. Empuja desde el pie delantero para volver. Controla el equilibrio en todo momento.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_zan_gely_split', name: 'Sentadilla split estática', reason: 'Más estabilidad', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '60 seg', focus: 'Pies fijos en posición de zancada. Sube y baja sin mover los pies.', weightHint: 'Peso corporal' },
        { id: 'alt_zan_gely_step', name: 'Step up al banco', reason: 'Menos impacto', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '60 seg', focus: 'Sube un pie al banco. Empuja con el talón. Baja controlado.', weightHint: 'Peso corporal' }
      ]
    },
    'elevacion_cadera_gely': {
      description: 'Tumbada boca arriba con las rodillas flexionadas y pies apoyados en el suelo. Aprieta los glúteos y sube las caderas hasta formar una línea recta desde hombros a rodillas. Mantén 1-2 segundos arriba. Baja lentamente.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_elev_cad_gely_peso', name: 'Puente con mancuerna', reason: 'Más resistencia', muscle: 'Glúteos', series: 3, reps: '12', rest: '60 seg', focus: 'Mancuerna sobre las caderas. Mismo movimiento con peso añadido.', weightHint: '3-5 kg (1 mancuerna)' }
      ]
    },
    'press_pecho_gely': {
      description: 'Tumbada en el banco con los pies bien apoyados. Sujeta las mancuernas a la altura del pecho con codos a 45°. Empuja hacia arriba de forma controlada hasta casi extender los brazos. Baja lentamente en 2 segundos.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_press_pecho_gely_suelo', name: 'Press de pecho en el suelo', reason: 'Sin banco', muscle: 'Pecho / Tríceps', series: 3, reps: '12', rest: '90 seg', focus: 'Tumbada en el suelo. Codos tocan el suelo al bajar. Rango parcial pero seguro.', weightHint: 'Mismas mancuernas' },
        { id: 'alt_press_pecho_gely_flex', name: 'Flexiones de pecho', reason: 'Sin mancuernas', muscle: 'Pecho / Tríceps', series: 3, reps: '10', rest: '60 seg', focus: 'Cuerpo recto. Baja el pecho al suelo. Codos a 45°.', weightHint: 'Peso corporal' },
        { id: 'alt_press_pecho_gely_band', name: 'Press con banda elástica', reason: 'Variante con banda', muscle: 'Pecho', series: 3, reps: '15', rest: '60 seg', focus: 'Banda sujeta detrás de la espalda. Empuja hacia adelante como un press.', weightHint: 'Banda ligera' }
      ]
    },
    'remo_inclinado_gely': {
      description: 'De pie, inclinada a 45° con la espalda recta. Una mancuerna en cada mano. Tira de ambas hacia la cadera a la vez, juntando los omóplatos. Baja controlado. Siente la espalda trabajar.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_remo_inc_gely_1m', name: 'Remo a una mano en banco', reason: 'Más apoyo lumbar', muscle: 'Espalda / Bíceps', series: 3, reps: '12 (por brazo)', rest: '90 seg', focus: 'Apoya rodilla y mano en banco. Tira hacia la cadera. Más estable para la espalda.', weightHint: 'Mismas mancuernas' },
        { id: 'alt_remo_inc_gely_band', name: 'Remo con banda elástica', reason: 'Sin mancuernas', muscle: 'Espalda', series: 3, reps: '15', rest: '60 seg', focus: 'Banda sujeta a un punto fijo. Tira hacia ti. Aprieta omóplatos.', weightHint: 'Banda media' }
      ]
    },
    'sentadilla_bulgara_gely': {
      description: 'Coloca el pie trasero sobre el banco. El pie delantero está lo suficientemente lejos para que al bajar la rodilla no sobrepase la punta del pie. Baja flexionando la rodilla delantera hasta que el muslo quede paralelo al suelo. Vuelve a subir empujando con el talón.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_bulg_gely_split', name: 'Sentadilla split estática', reason: 'Menos equilibrio requerido', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '90 seg', focus: 'Ambos pies en el suelo. Baja y sube. Menos rango pero más estable.', weightHint: 'Mismas mancuernas' },
        { id: 'alt_bulg_gely_zancada', name: 'Zancada estática con mancuernas', reason: 'Movimiento más natural', muscle: 'Cuádriceps / Glúteo', series: 3, reps: '10 (por pierna)', rest: '60 seg', focus: 'Paso al frente. Baja vertical. Controla el equilibrio.', weightHint: 'Mismas mancuernas' }
      ]
    },
    'patada_gluteo_gely': {
      description: 'A cuatro patas con las manos bajo los hombros y las rodillas bajo las caderas. Manteniendo la rodilla flexionada a 90°, eleva el pie hacia arriba apretando el glúteo. Baja controlado sin tocar el suelo. Repite todas las repeticiones antes de cambiar de pierna.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_pat_glu_gely_band', name: 'Patada con banda elástica', reason: 'Más resistencia', muscle: 'Glúteos', series: 3, reps: '15 (por pierna)', rest: '60 seg', focus: 'Banda alrededor de los tobillos. Más resistencia al elevar.', weightHint: 'Banda ligera' },
        { id: 'alt_pat_glu_gely_plancha', name: 'Plancha con elevación de pierna', reason: 'Variante de core + glúteo', muscle: 'Glúteos / Core', series: 3, reps: '12 (por pierna)', rest: '60 seg', focus: 'En posición de plancha. Eleva una pierna hacia arriba. Activa core y glúteo.', weightHint: 'Peso corporal' }
      ]
    },
    'press_arnold_gely': {
      description: 'Sentada con la espalda apoyada. Mancuernas a la altura de los hombros con palmas hacia ti. Empuja hacia arriba rotando las palmas hacia adelante. Al bajar, invierte la rotación. Trabaja las tres cabezas del hombro.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_arnold_gely_normal', name: 'Press de hombros sentada', reason: 'Movimiento más simple', muscle: 'Hombros', series: 3, reps: '10', rest: '90 seg', focus: 'Sin rotación. Empuje vertical simple. Más control y peso.', weightHint: 'Mismas mancuernas o más' }
      ]
    },
    'dead_bug_gely': {
      description: 'Tumbada boca arriba con brazos extendidos hacia arriba y piernas elevadas a 90°. Mantén la espalda baja pegada al suelo. Extiende lentamente el brazo derecho y la pierna izquierda hacia el suelo sin tocar. Vuelve al centro y repite con el otro lado.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_dead_bug_gely_bird', name: 'Bird-Dog', reason: 'En cuadrupedia, más activo', muscle: 'Core / Lumbar', series: 3, reps: '10 (por lado)', rest: '60 seg', focus: 'A cuatro patas. Extiende brazo y pierna contrarios. Mantén 2 segundos.', weightHint: 'Peso corporal' }
      ]
    },
    'plancha_lateral_gely': {
      description: 'Túmbate de lado. Apóyate en el antebrazo con el codo bajo el hombro. Apila los pies o colócalos uno delante del otro. Eleva las caderas formando una línea recta de cabeza a pies. Mantén la posición apretando oblicuos y glúteos.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_plancha_lat_gely_clasica', name: 'Plancha clásica', reason: 'Menos rotación', muscle: 'Core', series: 3, reps: '30 seg', rest: '60 seg', isTimed: true, focus: 'Antebrazos y puntas de los pies. Cuerpo recto. Trabajo de core general.', weightHint: 'Peso corporal' }
      ]
    },
    'combo_hombro_gely': {
      description: 'Superserie sin descanso: 12 rep de elevaciones laterales seguidas de 12 rep de pájaro. Objetivo: fatigar completamente los hombros. Peso muy ligero. Concéntrate en la calidad del movimiento.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_combo_hombro_gely_sep', name: 'Elev. laterales + Pájaro (separado)', reason: 'Más control', muscle: 'Hombro', series: 3, reps: '12+12', rest: '90 seg', focus: 'Dos ejercicios separados con 60 seg de descanso entre ellos. Más controlado.', weightHint: 'Peso ligero' }
      ]
    },
    'combo_triceps_gely': {
      description: 'Superserie: extensión tras nuca seguida de fondos en banco sin descanso entre ellos. La combinación fatiga el tríceps completamente. Descansa solo al terminar ambos movimientos.',
      videoUrl: '',
      alternatives: [
        { id: 'alt_combo_tric_gely_sep', name: 'Extensión + Fondos (separado)', reason: 'Más control', muscle: 'Tríceps', series: 3, reps: '10+10', rest: '90 seg', focus: 'Dos ejercicios separados con 60 seg de descanso entre ellos. Más controlado.', weightHint: '3-5 kg + peso corporal' }
      ]
    }
  };

  // =============================================
  // EXERCISE_DB: acceso al dataset público de ejercicios
  //   https://github.com/smoralb/exercises-dataset  (1.324 ejercicios)
  //
  // · El índice ligero (data/exercises-index.json, ~0.9 MB) se sirve
  //   desde el propio repo y lo genera tools/build-exercise-index.ps1.
  // · Las imágenes (180x180) y los GIFs se piden bajo demanda a jsDelivr,
  //   así no metemos los 128 MB de media en este repo.
  // =============================================
  var EXERCISE_DB = (function () {
    var DATASET_REF = 'main';   // rama o commit del dataset a fijar
    var CDN = 'https://cdn.jsdelivr.net/gh/smoralb/exercises-dataset@' + DATASET_REF + '/';
    var INDEX_URL = 'data/exercises-index.json';

    var items = null;       // array crudo del índice
    var byId = null;        // { "0289": rec }
    var loading = null;     // Promise en vuelo (deduplica llamadas)

    // Etiquetas en español para poder buscar sin saber inglés
    var BODY_PART_ES = {
      'back': 'espalda', 'cardio': 'cardio', 'chest': 'pecho',
      'lower arms': 'antebrazos', 'lower legs': 'gemelos pantorrillas',
      'neck': 'cuello', 'shoulders': 'hombros',
      'upper arms': 'brazos biceps triceps', 'upper legs': 'piernas muslos',
      'waist': 'core abdomen cintura'
    };
    var EQUIPMENT_ES = {
      'body weight': 'peso corporal sin material', 'dumbbell': 'mancuerna mancuernas',
      'barbell': 'barra', 'cable': 'polea cable', 'band': 'banda elastica',
      'resistance band': 'banda elastica', 'kettlebell': 'kettlebell pesa rusa',
      'leverage machine': 'maquina', 'smith machine': 'maquina smith multipower',
      'stability ball': 'fitball pelota', 'ez barbell': 'barra z',
      'olympic barbell': 'barra olimpica', 'weighted': 'con peso lastre',
      'assisted': 'asistido', 'medicine ball': 'balon medicinal',
      'rope': 'cuerda', 'roller': 'rueda abdominal', 'sled machine': 'maquina trineo'
    };
    var TARGET_ES = {
      'abs': 'abdominales', 'biceps': 'biceps', 'triceps': 'triceps',
      'pectorals': 'pectoral pecho', 'delts': 'deltoides hombro',
      'lats': 'dorsal', 'upper back': 'espalda alta', 'traps': 'trapecio',
      'glutes': 'gluteos', 'quads': 'cuadriceps', 'hamstrings': 'isquiotibiales femoral',
      'calves': 'gemelos', 'adductors': 'aductores', 'abductors': 'abductores',
      'forearms': 'antebrazos', 'spine': 'lumbar espalda baja',
      'serratus anterior': 'serrato', 'levator scapulae': 'cuello',
      'cardiovascular system': 'cardio'
    };

    // -----------------------------------------------------------------
    // Nombres de ejercicio en español
    // -----------------------------------------------------------------
    // El dataset sólo trae el nombre en inglés y en minúsculas ("dumbbell
    // incline row"). Traducirlo palabra por palabra daría "mancuerna
    // inclinado remo", así que se clasifica cada término y se recompone en
    // el orden español: movimiento + zona + matices + postura + material.
    //
    // No es una traducción completa: cubre el vocabulario habitual del
    // dataset. Lo que no reconoce se deja tal cual, que es preferible a
    // inventar. Los nombres propios ("london bridge") se quedan en inglés.

    // Ruido del dataset que no aporta nada al nombre.
    var NAME_NOISE = /\b(male|female|v\.?\s*\d+|version\s*\d+)\b/g;

    // Expresiones de varias palabras. Se sustituyen antes de tokenizar,
    // porque su traducción no es la suma de sus partes.
    var NAME_PHRASES = [
      ['lat pulldown', 'jalón al pecho'],
      ['bench press', 'press banca'],
      ['push up', 'flexiones'], ['push-up', 'flexiones'], ['pushup', 'flexiones'],
      ['pull up', 'dominadas'], ['pull-up', 'dominadas'], ['pullup', 'dominadas'],
      ['chin up', 'dominadas supinas'], ['chin-up', 'dominadas supinas'],
      ['sit up', 'abdominales'], ['sit-up', 'abdominales'], ['situp', 'abdominales'],
      ['step up', 'subida al cajón'], ['step-up', 'subida al cajón'],
      ['calf raise', 'elevación de talones'],
      ['leg raise', 'elevación de piernas'],
      ['lateral raise', 'elevación lateral'],
      ['front raise', 'elevación frontal'],
      ['upright row', 'remo al mentón'],
      ['face pull', 'face pull'],
      ['hip thrust', 'empuje de cadera'],
      ['glute bridge', 'puente de glúteos'],
      ['good morning', 'buenos días'],
      ['romanian deadlift', 'peso muerto rumano'],
      ['straight leg deadlift', 'peso muerto piernas rectas'],
      ['stiff leg deadlift', 'peso muerto piernas rígidas'],
      ['close grip', 'agarre cerrado'],
      ['wide grip', 'agarre abierto'],
      ['neutral grip', 'agarre neutro'],
      ['reverse grip', 'agarre invertido'],
      ['one arm', 'a una mano'], ['single arm', 'a una mano'],
      ['one leg', 'a una pierna'], ['single leg', 'a una pierna'],
      ['bent over', 'inclinado'], ['bent-over', 'inclinado'],
      ['exercise ball', 'fitball'], ['stability ball', 'fitball'],
      ['swiss ball', 'fitball'], ['bosu ball', 'bosu'],
      ['medicine ball', 'balón medicinal'],
      ['ez barbell', 'barra Z'], ['ez bar', 'barra Z'],
      ['olympic barbell', 'barra olímpica'],
      ['smith machine', 'multipower'],
      ['leverage machine', 'máquina'], ['sled machine', 'máquina de trineo'],
      ['resistance band', 'banda elástica'],
      ['body weight', ''], ['bodyweight', ''],
      ['jump rope', 'comba'],
      ['mountain climber', 'escalador'],
      ['jumping jack', 'jumping jacks'],
      ['russian twist', 'giro ruso'],
      ['skull crusher', 'press francés'],
      ['preacher curl', 'curl predicador'],
      ['hammer curl', 'curl martillo'],
      ['concentration curl', 'curl concentrado'],
      ['wrist curl', 'curl de muñeca'],
      ['shoulder press', 'press militar'],
      ['military press', 'press militar'],
      ['chest fly', 'aperturas de pecho'],
      ['pec deck', 'contractor de pecho'],
      ['tricep', 'tríceps'], ['triceps', 'tríceps'], ['bicep', 'bíceps'], ['biceps', 'bíceps']
    ];

    // Categorías. El orden de montaje es el de esta lista.
    var NAME_MOVE = {
      'curl': 'curl', 'press': 'press', 'row': 'remo', 'squat': 'sentadilla',
      'raise': 'elevación', 'extension': 'extensión', 'extensions': 'extensión',
      'fly': 'aperturas', 'flye': 'aperturas', 'flyes': 'aperturas',
      'crunch': 'crunch', 'crunches': 'crunch', 'lunge': 'zancada',
      'deadlift': 'peso muerto', 'pulldown': 'jalón', 'pullover': 'pullover',
      'dip': 'fondos', 'dips': 'fondos', 'stretch': 'estiramiento',
      'twist': 'giro', 'shrug': 'encogimiento de hombros', 'plank': 'plancha',
      'thrust': 'empuje', 'bridge': 'puente', 'pull': 'tirón', 'push': 'empuje',
      'kickback': 'patada', 'pushdown': 'extensión en polea', 'run': 'carrera',
      'walk': 'caminata', 'jump': 'salto', 'hold': 'isométrico', 'bend': 'flexión',
      'clean': 'cargada', 'snatch': 'arrancada', 'swing': 'swing', 'burpee': 'burpee',
      'rotation': 'rotación', 'abduction': 'abducción', 'adduction': 'aducción',
      'curls': 'curl', 'presses': 'press', 'rows': 'remo', 'squats': 'sentadilla'
    };
    var NAME_ZONE = {
      'chest': 'de pecho', 'shoulder': 'de hombro', 'shoulders': 'de hombro',
      'tríceps': 'de tríceps', 'bíceps': 'de bíceps', 'leg': 'de pierna',
      'legs': 'de piernas', 'hip': 'de cadera', 'wrist': 'de muñeca',
      'calf': 'de gemelo', 'glute': 'de glúteo', 'glutes': 'de glúteo',
      'ab': 'abdominal', 'abs': 'abdominal', 'oblique': 'oblicuo',
      'back': 'de espalda', 'neck': 'de cuello', 'thigh': 'de muslo',
      'hamstring': 'femoral', 'quad': 'de cuádriceps', 'lat': 'de dorsal',
      'trap': 'de trapecio', 'forearm': 'de antebrazo', 'ankle': 'de tobillo',
      'knee': 'de rodilla', 'spine': 'de espalda baja', 'groin': 'de aductores'
    };
    var NAME_MOD = {
      'reverse': 'inverso', 'lateral': 'lateral', 'front': 'frontal',
      'rear': 'posterior', 'side': 'lateral', 'alternate': 'alterno',
      'alternating': 'alterno', 'overhead': 'sobre la cabeza',
      'close': 'cerrado', 'wide': 'abierto', 'narrow': 'estrecho',
      'straight': 'recto', 'bent': 'flexionado', 'cross': 'cruzado',
      'high': 'alto', 'low': 'bajo', 'jumping': 'con salto', 'weighted': 'con lastre',
      'assisted': 'asistido', 'isometric': 'isométrico', 'static': 'estático',
      'dynamic': 'dinámico', 'bulgarian': 'búlgara', 'sumo': 'sumo',
      'hack': 'hack', 'zercher': 'zercher', 'arnold': 'arnold', 'spider': 'araña',
      'twisting': 'con giro', 'walking': 'caminando', 'partial': 'parcial'
    };
    var NAME_POSTURE = {
      'seated': 'sentado', 'standing': 'de pie', 'lying': 'tumbado',
      // "incline" (banco inclinado) e "inclinado" de bent-over son cosas
      // distintas: si ambos dan "inclinado", dos ejercicios acaban con el
      // mismo nombre en la rutina.
      'kneeling': 'de rodillas', 'incline': 'en banco inclinado', 'decline': 'declinado',
      'inclined': 'en banco inclinado', 'prone': 'boca abajo', 'supine': 'boca arriba',
      'hanging': 'colgado', 'floor': 'en el suelo', 'wall': 'en la pared',
      'bench': 'en banco', 'inclinado': 'inclinado'
    };
    var NAME_EQUIP = {
      'dumbbell': 'con mancuernas', 'dumbbells': 'con mancuernas',
      'barbell': 'con barra', 'bar': 'con barra', 'cable': 'en polea',
      'band': 'con banda', 'kettlebell': 'con kettlebell', 'lever': 'en máquina',
      'machine': 'en máquina', 'multipower': 'en multipower', 'fitball': 'con fitball',
      'bosu': 'en bosu', 'rope': 'con cuerda', 'roller': 'con rueda',
      'sled': 'en trineo', 'weight': 'con peso'
    };

    // Palabras de relleno que no aportan al nombre en español.
    var NAME_SKIP = { 'on': 1, 'with': 1, 'the': 1, 'a': 1, 'to': 1, 'and': 1, 'of': 1, 'in': 1, 'for': 1, 'up': 1, 'over': 1, 'exercise': 1 };

    function translateExerciseName(raw) {
      var s = String(raw || '').toLowerCase();
      if (!s) return '';
      s = s.replace(NAME_NOISE, ' ');

      // Frases primero: se marcan con '~' para que no se vuelvan a partir.
      NAME_PHRASES.forEach(function (p) {
        var re = new RegExp('(^|[^a-záéíóúñ])' + p[0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '(?![a-záéíóúñ])', 'g');
        s = s.replace(re, function (m, pre) { return pre + (p[1] ? '~' + p[1].replace(/ /g, '~') : ''); });
      });

      // Las frases que son matices ("a una mano") van detrás del movimiento;
      // las que son el movimiento en sí ("press banca") hacen de núcleo.
      var PHRASE_MOD = {
        'a una mano': 1, 'a una pierna': 1, 'agarre cerrado': 1, 'agarre abierto': 1,
        'agarre neutro': 1, 'agarre invertido': 1, 'inclinado': 1, 'con lastre': 1,
        'asistido': 1, 'barra Z': 1, 'barra olímpica': 1, 'fitball': 1, 'bosu': 1,
        'multipower': 1, 'máquina': 1, 'banda elástica': 1, 'balón medicinal': 1
      };
      var move = [], zone = [], mod = [], posture = [], equip = [];
      var phraseHead = [], phraseMod = [];
      var unknown = false;
      s.split(/[\s\-\/]+/).forEach(function (w) {
        w = w.replace(/[(),.]/g, '').trim();
        if (!w || NAME_SKIP[w]) return;
        if (w.indexOf('~') !== -1) {
          var txt = w.replace(/~/g, ' ').trim();
          push(PHRASE_MOD[txt] ? phraseMod : phraseHead, txt);
          return;
        }
        if (NAME_MOVE[w]) { push(move, NAME_MOVE[w]); return; }
        if (NAME_ZONE[w]) { push(zone, NAME_ZONE[w]); return; }
        if (NAME_MOD[w]) { push(mod, NAME_MOD[w]); return; }
        if (NAME_POSTURE[w]) { push(posture, NAME_POSTURE[w]); return; }
        if (NAME_EQUIP[w]) { push(equip, NAME_EQUIP[w]); return; }
        unknown = true;   // palabra que no sabemos traducir
      });
      function push(arr, v) { if (v && arr.indexOf(v) === -1) arr.push(v); }

      // Regla de oro: o se entiende el nombre entero, o no se traduce. Una
      // traducción a medias sale como "Arm slingers de rodilla colgado", que
      // es peor que dejar el original en inglés bien escrito.
      if (unknown) return capitalize(String(raw || '').replace(NAME_NOISE, '').trim());

      var head = move.length ? move.concat(phraseHead) : phraseHead;
      var parts = head.concat(zone, phraseMod, mod, posture, equip);
      var out = parts.join(' ').replace(/\s+/g, ' ').trim();
      if (!out) return capitalize(String(raw || ''));
      return capitalize(out);
    }

    function capitalize(s) {
      return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    }

    // TARGET_ES son términos de búsqueda (sin acentos y con sinónimos), así
    // que para mostrar el músculo en la rutina hace falta la forma bonita.
    var TARGET_DISPLAY = {
      'abs': 'Abdominales', 'biceps': 'Bíceps', 'triceps': 'Tríceps',
      'pectorals': 'Pectoral', 'delts': 'Deltoides', 'lats': 'Dorsal',
      'upper back': 'Espalda alta', 'traps': 'Trapecio', 'glutes': 'Glúteos',
      'quads': 'Cuádriceps', 'hamstrings': 'Isquiotibiales', 'calves': 'Gemelos',
      'adductors': 'Aductores', 'abductors': 'Abductores', 'forearms': 'Antebrazos',
      'spine': 'Lumbar', 'serratus anterior': 'Serrato',
      'levator scapulae': 'Cuello', 'cardiovascular system': 'Cardio'
    };

    // Quita acentos y baja a minúsculas para comparar
    function norm(s) {
      var t = String(s || '').toLowerCase();
      if (t.normalize) t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return t;
    }

    // Glosario ES -> EN. El dataset sólo trae los nombres en inglés, así que
    // cada palabra de la búsqueda se expande a sus equivalentes ingleses.
    var ES_SYNONYMS = {
      // movimientos
      'sentadilla': ['squat'], 'sentadillas': ['squat'],
      'zancada': ['lunge', 'split squat'], 'zancadas': ['lunge', 'split squat'],
      'estocada': ['lunge'], 'bulgara': ['split squat'],
      'peso muerto': ['deadlift'], 'muerto': ['deadlift'], 'peso': ['weight', 'deadlift'],
      'remo': ['row'], 'jalon': ['pulldown'], 'dominada': ['pull-up'], 'dominadas': ['pull-up'],
      'press': ['press'], 'empuje': ['press'],
      'curl': ['curl'], 'flexion': ['push-up', 'curl'], 'flexiones': ['push-up'],
      'fondo': ['dip'], 'fondos': ['dip'],
      'apertura': ['fly'], 'aperturas': ['fly'], 'aleteo': ['fly'],
      'elevacion': ['raise'], 'elevaciones': ['raise'],
      'plancha': ['plank'], 'puente': ['bridge'], 'patada': ['kickback'],
      'extension': ['extension'], 'encogimiento': ['shrug'],
      'abdominal': ['crunch', 'sit-up'], 'abdominales': ['crunch', 'sit-up', 'abs'],
      'crunch': ['crunch'], 'giro': ['twist'], 'rotacion': ['twist'],
      'salto': ['jump'], 'zancada caminando': ['walking lunge'],
      'martillo': ['hammer'], 'concentrado': ['concentration'],
      'pullover': ['pullover'], 'arnold': ['arnold'], 'goblet': ['goblet'],
      'hip': ['hip'], 'thrust': ['thrust'],
      // material
      'mancuerna': ['dumbbell'], 'mancuernas': ['dumbbell'],
      'barra': ['barbell'], 'polea': ['cable'], 'cable': ['cable'],
      'banda': ['band'], 'gomas': ['band'], 'elastica': ['band'],
      'maquina': ['machine', 'lever'], 'multipower': ['smith'],
      'banco': ['bench'], 'kettlebell': ['kettlebell'], 'pesa': ['kettlebell'],
      'fitball': ['exercise ball', 'stability ball'], 'pelota': ['ball'],
      'corporal': ['body weight'], 'lastre': ['weighted'],
      // músculos y zonas
      'pecho': ['chest', 'pectorals'], 'pectoral': ['pectorals'],
      'espalda': ['back'], 'dorsal': ['lats'], 'dorsales': ['lats'],
      'trapecio': ['traps'], 'lumbar': ['spine', 'lower back'],
      'hombro': ['shoulder', 'delts'], 'hombros': ['shoulder', 'delts'],
      'deltoides': ['delts'], 'biceps': ['biceps'], 'triceps': ['triceps'],
      'antebrazo': ['forearms'], 'antebrazos': ['forearms'],
      'gluteo': ['glutes'], 'gluteos': ['glutes'],
      'pierna': ['leg', 'upper legs'], 'piernas': ['leg', 'upper legs'],
      'cuadriceps': ['quads'], 'isquios': ['hamstrings'],
      'isquiotibiales': ['hamstrings'], 'femoral': ['hamstrings'],
      'gemelo': ['calves'], 'gemelos': ['calves'], 'pantorrilla': ['calves'],
      'aductor': ['adductors'], 'aductores': ['adductors'],
      'abductor': ['abductors'], 'abductores': ['abductors'],
      'abdomen': ['abs', 'waist'], 'core': ['abs', 'waist'],
      'oblicuos': ['obliques'], 'cadera': ['hip'], 'cuello': ['neck'],
      'cardio': ['cardio', 'cardiovascular'],
      // modificadores
      'inclinado': ['incline'], 'inclinada': ['incline'],
      'declinado': ['decline'], 'declinada': ['decline'],
      'sentado': ['seated'], 'sentada': ['seated'],
      'pie': ['standing'], 'tumbado': ['lying'], 'tumbada': ['lying'],
      'lateral': ['lateral', 'side'], 'laterales': ['lateral', 'side'],
      'frontal': ['front'], 'frontales': ['front'],
      'posterior': ['rear', 'reverse'], 'posteriores': ['rear', 'reverse'],
      'inverso': ['reverse'], 'inversa': ['reverse'],
      'unilateral': ['one arm', 'single leg'], 'alterno': ['alternate'],
      'agarre': ['grip'], 'estrecho': ['close-grip'], 'ancho': ['wide']
    };

    // Palabras vacías que se ignoran en la búsqueda
    var STOPWORDS = {
      'de': 1, 'del': 1, 'la': 1, 'las': 1, 'el': 1, 'los': 1, 'un': 1, 'una': 1,
      'con': 1, 'sin': 1, 'en': 1, 'a': 1, 'al': 1, 'y': 1, 'o': 1, 'por': 1,
      'para': 1, 'the': 1, 'of': 1, 'with': 1, 'and': 1
    };

    // Devuelve todas las formas que valen para una palabra de la búsqueda
    function variants(word) {
      var syn = ES_SYNONYMS[word];
      return syn ? [word].concat(syn) : [word];
    }

    // Blob de texto sobre el que se busca (inglés + equivalentes en español)
    function haystack(rec) {
      if (rec._h) return rec._h;
      rec._h = norm([
        rec.n, rec.bp, rec.eq, rec.tg, rec.mg, (rec.sm || []).join(' '),
        BODY_PART_ES[rec.bp], EQUIPMENT_ES[rec.eq], TARGET_ES[rec.tg]
      ].join(' '));
      return rec._h;
    }

    function load() {
      if (items) return Promise.resolve(items);
      if (loading) return loading;
      loading = fetch(INDEX_URL)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          items = data;
          byId = {};
          for (var i = 0; i < data.length; i++) byId[data[i].id] = data[i];
          mergeExtra();
          return items;
        })
        .catch(function (err) {
          loading = null;   // permite reintentar
          throw err;
        });
      return loading;
    }

    // Registros que no vienen del dataset descargado (por ejemplo los de
    // "Recuperación running" que no tienen equivalente). Se guardan aparte
    // porque load() reemplaza `items` y habría que volver a meterlos.
    var extra = [];

    function mergeExtra() {
      if (!items) return;
      extra.forEach(function (r) {
        if (byId[r.id]) return;
        items.push(r);
        byId[r.id] = r;
      });
    }

    function addExtra(recs) {
      extra = extra.concat(recs);
      mergeExtra();
    }

    function get(id) { return byId ? (byId[id] || null) : null; }

    // Búsqueda por palabras: todas las palabras deben aparecer.
    // Ordena poniendo delante las coincidencias en el nombre.
    function search(query, opts) {
      if (!items) return [];
      opts = opts || {};
      // Se descartan las palabras vacías: son subcadenas de cualquier cosa
      // ("de" está dentro de "side") y ensuciarían el resultado.
      var words = norm(query).split(/\s+/).filter(function (w) {
        return w && !STOPWORDS[w];
      });
      var limit = opts.limit || 40;
      var results = [];

      // Cada palabra se expande a sus equivalentes en inglés (ES_SYNONYMS)
      var terms = words.map(variants);

      for (var i = 0; i < items.length && results.length < 2000; i++) {
        var rec = items[i];
        if (opts.bodyPart && rec.bp !== opts.bodyPart) continue;
        if (opts.equipment && rec.eq !== opts.equipment) continue;
        var hay = haystack(rec);
        var name = norm(rec.n);
        var ok = true, score = 0;
        for (var w = 0; w < terms.length; w++) {
          var hit = false;
          for (var v = 0; v < terms[w].length; v++) {
            if (hay.indexOf(terms[w][v]) === -1) continue;
            hit = true;
            if (name.indexOf(terms[w][v]) !== -1) score += 2;
          }
          if (!hit) { ok = false; break; }
          score += 1;
        }
        if (!ok) continue;
        if (name.indexOf(norm(query)) === 0) score += 10;
        results.push({ rec: rec, score: score });
      }

      // A igual puntuación gana el nombre más corto (suele ser el ejercicio base)
      results.sort(function (a, b) {
        return b.score - a.score || a.rec.n.length - b.rec.n.length || a.rec.n.localeCompare(b.rec.n);
      });
      return results.slice(0, limit).map(function (r) { return r.rec; });
    }

    // Sin `mid` no hay media en el dataset (registros propios): mejor cadena
    // vacía que una URL rota que dejaría el hueco de la animación cargando.
    function imageUrl(rec) { return rec && rec.mid ? CDN + 'images/' + rec.id + '-' + rec.mid + '.jpg' : ''; }
    function gifUrl(rec) { return rec && rec.mid ? CDN + 'videos/' + rec.id + '-' + rec.mid + '.gif' : ''; }
    function repoUrl(rec) {
      return rec && rec.mid ? 'https://github.com/smoralb/exercises-dataset/blob/' + DATASET_REF + '/videos/' + rec.id + '-' + rec.mid + '.gif' : '';
    }

    function bodyParts() {
      if (!items) return [];
      var seen = {}, out = [];
      items.forEach(function (r) { if (!seen[r.bp]) { seen[r.bp] = 1; out.push(r.bp); } });
      return out.sort();
    }

    return {
      CDN: CDN,
      load: load, get: get, search: search, addExtra: addExtra,
      all: function () { return items ? items.slice() : []; },
      imageUrl: imageUrl, gifUrl: gifUrl, repoUrl: repoUrl,
      bodyParts: bodyParts,
      labelBodyPart: function (bp) { return BODY_PART_ES[bp] ? BODY_PART_ES[bp].split(' ')[0] : bp; },
      labelEquipment: function (eq) { return EQUIPMENT_ES[eq] ? EQUIPMENT_ES[eq].split(' ')[0] : eq; },
      labelTarget: function (tg) { return TARGET_ES[tg] ? TARGET_ES[tg].split(' ')[0] : tg; },
      labelName: translateExerciseName,
      labelTargetDisplay: function (tg) { return TARGET_DISPLAY[tg] || capitalize(tg); },
      isLoaded: function () { return !!items; },
      count: function () { return items ? items.length : 0; },
      norm: norm
    };
  })();

  // =============================================
  // EXERCISE_TAGS: categorías derivadas del dataset
  // ---------------------------------------------
  // El dataset no trae tags, así que se calculan por reglas a partir de
  // bp/eq/tg y del nombre. Es preferible a etiquetar 1.324 fichas a mano:
  // al regenerar el índice los tags siguen siendo correctos sin tocar nada.
  // Cada ejercicio recibe tags de cuatro familias:
  //   place    casa | gimnasio | sin_material
  //   pattern  empuje | tiron | pierna | core | cardio | brazos
  //   goal     fuerza | hipertrofia | tono | perder_peso | movilidad
  //   level    principiante | intermedio | avanzado
  // =============================================
  var EXERCISE_TAGS = (function () {

    // Material que se puede tener en casa. El resto se considera de gimnasio.
    var HOME_EQUIPMENT = {
      'body weight': 1, 'dumbbell': 1, 'band': 1, 'resistance band': 1,
      'kettlebell': 1, 'stability ball': 1, 'medicine ball': 1, 'roller': 1,
      'wheel roller': 1, 'rope': 1, 'bosu ball': 1, 'weighted': 1
    };

    // Material que exige técnica o carga alta: sube el nivel del ejercicio.
    var ADVANCED_EQUIPMENT = {
      'barbell': 1, 'olympic barbell': 1, 'ez barbell': 1, 'trap bar': 1,
      'sled machine': 1, 'tire': 1, 'kettlebell': 1
    };

    // Material guiado: seguro para quien empieza aunque mueva mucho peso.
    var GUIDED_EQUIPMENT = {
      'leverage machine': 1, 'smith machine': 1, 'cable': 1, 'assisted': 1,
      'band': 1, 'resistance band': 1
    };

    // tg -> patrón de movimiento
    var TARGET_PATTERN = {
      'pectorals': 'empuje', 'triceps': 'empuje', 'delts': 'empuje',
      'serratus anterior': 'empuje',
      'lats': 'tiron', 'upper back': 'tiron', 'traps': 'tiron',
      'biceps': 'tiron', 'forearms': 'tiron', 'levator scapulae': 'tiron',
      'glutes': 'pierna', 'quads': 'pierna', 'hamstrings': 'pierna',
      'calves': 'pierna', 'adductors': 'pierna', 'abductors': 'pierna',
      'abs': 'core', 'spine': 'core',
      'cardiovascular system': 'cardio'
    };

    // Ejercicios de brazo aislado: útiles como accesorio, nunca como básico.
    var ARM_TARGETS = { 'biceps': 1, 'triceps': 1, 'forearms': 1 };

    // Palabras del nombre que marcan trabajo de movilidad o estiramiento.
    var MOBILITY_RE = /\b(stretch|mobility|rotation|dynamic|warm[- ]?up|foam roll|roll)\b/;

    // Palabras del nombre que marcan trabajo explosivo o metabólico.
    var CONDITIONING_RE = /\b(jump|jumping|burpee|hop|sprint|skip|mountain climber|clean|snatch|swing|thruster|jack)\b/;

    // Nombres que indican una variante exigente (unilateral, inestable, lastrada).
    var HARD_RE = /\b(one arm|single leg|one leg|pistol|handstand|muscle up|planche|lever|weighted|deficit|archer|clap|explosive|bosu|balance)\b/;

    // Nombres que indican una regresión o versión asistida.
    var EASY_RE = /\b(kneeling|knee|assisted|incline push|wall|seated|machine|supported|partial|quarter|half|isometric|band)\b/;

    // Movimientos básicos multiarticulares: son los que abren cada sesión.
    var COMPOUND_RE = /\b(squat|deadlift|press|row|pull-up|pullup|chin-up|dip|lunge|push-up|pushup|thrust|bridge|clean|snatch|pulldown|step-up)\b/;

    // Movimientos de aislamiento: fly, curl, extensión, elevación…
    var ISOLATION_RE = /\b(fly|flye|curl|extension|raise|kickback|pullover|shrug|crunch|lateral raise)\b/;

    function tagsFor(rec) {
      if (!rec) return null;
      if (rec._t) return rec._t;

      var name = String(rec.n || '').toLowerCase();
      var eq = rec.eq || '';
      var tg = rec.tg || '';
      var bp = rec.bp || '';
      var t = {};

      // --- place ---
      if (eq === 'body weight') { t.sin_material = 1; t.casa = 1; }
      else if (HOME_EQUIPMENT[eq]) t.casa = 1;
      else t.gimnasio = 1;

      // --- pattern ---
      var pattern = TARGET_PATTERN[tg] || (bp === 'cardio' ? 'cardio' : 'core');
      t[pattern] = 1;
      if (ARM_TARGETS[tg]) t.brazos = 1;

      // --- goal ---
      var isCompound = COMPOUND_RE.test(name);
      var isIsolation = !isCompound && ISOLATION_RE.test(name);
      if (MOBILITY_RE.test(name)) {
        t.movilidad = 1;
      } else if (pattern === 'cardio' || CONDITIONING_RE.test(name)) {
        t.perder_peso = 1;
        t.tono = 1;
      } else {
        // Los básicos con carga sirven para fuerza; todo lo demás construye
        // volumen o tono según se use, así que ambos objetivos los admiten.
        if (isCompound && eq !== 'body weight') t.fuerza = 1;
        t.hipertrofia = 1;
        if (isIsolation || eq === 'body weight' || HOME_EQUIPMENT[eq]) t.tono = 1;
      }

      // --- level ---
      var level = 'intermedio';
      if (HARD_RE.test(name) || (ADVANCED_EQUIPMENT[eq] && isCompound)) level = 'avanzado';
      else if (EASY_RE.test(name) || GUIDED_EQUIPMENT[eq] || (eq === 'body weight' && !isCompound)) level = 'principiante';
      t[level] = 1;
      t._level = level;
      t._pattern = pattern;
      t._compound = isCompound;

      rec._t = t;
      return t;
    }

    function has(rec, tag) {
      var t = tagsFor(rec);
      return !!(t && t[tag]);
    }

    // Un ejercicio vale para un nivel si es de ese nivel o más fácil:
    // a un avanzado no se le esconde la sentadilla básica.
    var LEVEL_ORDER = { principiante: 0, intermedio: 1, avanzado: 2 };
    function fitsLevel(rec, level) {
      var t = tagsFor(rec);
      if (!t) return false;
      return LEVEL_ORDER[t._level] <= LEVEL_ORDER[level];
    }

    return { tagsFor: tagsFor, has: has, fitsLevel: fitsLevel, levelOrder: LEVEL_ORDER };
  })();

  // Etiquetas visibles de los tags con los que se puede filtrar el catálogo.
  var TAG_FILTERS = [
    { tag: 'sin_material', label: '🤸 Sin material' },
    { tag: 'casa', label: '🏠 En casa' },
    { tag: 'gimnasio', label: '🏢 Gimnasio' },
    { tag: 'empuje', label: '🔥 Empuje' },
    { tag: 'tiron', label: '💪 Tirón' },
    { tag: 'pierna', label: '🦵 Pierna' },
    { tag: 'core', label: '🧘 Core' },
    { tag: 'cardio', label: '❤️ Cardio' },
    { tag: 'fuerza', label: '🏋️ Fuerza' },
    { tag: 'hipertrofia', label: '📈 Volumen' },
    { tag: 'tono', label: '✨ Tono' },
    { tag: 'perder_peso', label: '🔥 Quemar' },
    { tag: 'movilidad', label: '🌀 Movilidad' },
    { tag: 'principiante', label: '🌱 Principiante' },
    { tag: 'avanzado', label: '⚡ Avanzado' }
  ];

  // =============================================
  // RUNNING_RECOVERY: colección "Recuperación running"
  // Trabajo preventivo y de recuperación para corredores. No es una rutina
  // (no lleva series ni repeticiones), es un catálogo consultable.
  // `db` = id en exercises-dataset para la animación; null si no hay equivalente.
  // =============================================
  var RUNNING_RECOVERY_LABEL = 'Recuperación running';

  var RUNNING_RECOVERY = [
    { id: 'foam_roller', name: 'Foam Roller', db: null,
      description: 'Masajear lentamente las zonas cargadas como espalda, glúteos, isquiotibiales y gemelos.',
      muscles: ['Espalda', 'Glúteos', 'Isquiotibiales', 'Gemelos'], equipment: ['Foam Roller'] },
    { id: 'glute_bridge', name: 'Puente de glúteos', db: '3013',
      description: 'Tumbado boca arriba, realiza una retroversión pélvica y eleva la cadera sin perder la posición lumbar.',
      muscles: ['Glúteos', 'Core'], equipment: [] },
    { id: 'single_leg_glute_bridge', name: 'Puente de glúteos a una pierna', db: '3645',
      description: 'Eleva la cadera apoyándote sobre una sola pierna manteniendo la pelvis estable.',
      muscles: ['Glúteos', 'Isquiotibiales', 'Core'], equipment: [] },
    { id: 'hamstring_walkouts', name: 'Hamstring Walkouts', db: null,
      description: 'Desde un puente de glúteos camina lentamente hacia delante con los talones y vuelve.',
      muscles: ['Isquiotibiales', 'Glúteos', 'Core'], equipment: [] },
    { id: 'short_glute_bridge', name: 'Puente de glúteos corto', db: '3013',
      description: 'Puente con recorrido corto para mantener siempre el control de la pelvis.',
      muscles: ['Glúteos', 'Core'], equipment: [] },
    { id: 'dead_bug', name: 'Dead Bug', db: '0276',
      description: 'Extiende brazo y pierna contrarios manteniendo la espalda pegada al suelo.',
      muscles: ['Core'], equipment: [] },
    { id: 'dead_bug_isometric', name: 'Dead Bug isométrico', db: '0276',
      description: 'Empuja la mano contra la rodilla contraria mientras mantienes la pelvis estable.',
      muscles: ['Core', 'Psoas'], equipment: [] },
    { id: 'crab_walk', name: 'Crab Walk', db: '0628',
      description: 'Camina lateralmente con una banda en los tobillos manteniendo tensión constante.',
      muscles: ['Glúteo medio', 'Glúteos'], equipment: ['Banda elástica'] },
    { id: 'c_band_walk', name: 'Caminata en C', db: '0628',
      description: 'Realiza pequeños desplazamientos formando una C con los pies para activar los glúteos.',
      muscles: ['Glúteos'], equipment: ['Banda elástica'] },
    { id: 'hip_flexor_march', name: 'Marcha con banda', db: null,
      description: 'Eleva la rodilla hasta la cadera manteniendo la pelvis neutra.',
      muscles: ['Psoas', 'Flexores de cadera', 'Core'], equipment: ['Banda elástica'] },
    { id: 'single_leg_squat', name: 'Sentadilla a una pierna', db: '1476',
      description: 'Realiza una pequeña sentadilla manteniendo la rodilla alineada con el pie.',
      muscles: ['Cuádriceps', 'Glúteos'], equipment: [] },
    { id: 'banded_knee_raise', name: 'Elevación de rodilla con banda', db: null,
      description: 'Con la banda sobre las rodillas eleva una rodilla en distintas direcciones.',
      muscles: ['Glúteos', 'Cadera'], equipment: ['Banda elástica'] },
    { id: 'double_calf_raise', name: 'Elevaciones de gemelos', db: '1373',
      description: 'Sube lentamente sobre las puntas de los pies y baja de forma controlada.',
      muscles: ['Gemelos'], equipment: [] },
    { id: 'single_calf_raise', name: 'Elevaciones de gemelos a una pierna', db: '1387',
      description: 'Realiza elevaciones de gemelo apoyando solo una pierna.',
      muscles: ['Gemelos'], equipment: [] },
    { id: 'hip_hike', name: 'Hip Hike', db: null,
      description: 'Sobre un escalón baja y eleva la pelvis utilizando únicamente la cadera de apoyo.',
      muscles: ['Glúteo medio', 'Cadera'], equipment: ['Escalón'] },
    { id: 'toe_walk', name: 'Caminata de puntillas', db: null,
      description: 'Camina únicamente sobre las puntas de los pies.',
      muscles: ['Gemelos', 'Pie'], equipment: [] },
    { id: 'toe_walk_pause', name: 'Caminata de puntillas con pausas', db: null,
      description: 'Camina de puntillas realizando pequeñas pausas en cada paso.',
      muscles: ['Gemelos'], equipment: [] },
    { id: 'front_plank', name: 'Plancha frontal', db: '0464',
      description: 'Mantén el cuerpo alineado apoyándote sobre antebrazos y pies.',
      muscles: ['Core'], equipment: [] },
    { id: 'front_plank_leg_raise', name: 'Plancha con elevación de pierna', db: null,
      description: 'Desde una plancha frontal eleva alternativamente una pierna.',
      muscles: ['Core', 'Glúteos'], equipment: [] },
    { id: 'side_plank', name: 'Plancha lateral', db: '3544',
      description: 'Mantén el cuerpo recto apoyándote sobre un antebrazo.',
      muscles: ['Oblicuos', 'Core'], equipment: [] },
    { id: 'side_plank_leg_raise', name: 'Plancha lateral con elevación', db: '1774',
      description: 'Desde la plancha lateral eleva la pierna superior.',
      muscles: ['Glúteo medio', 'Oblicuos'], equipment: [] },
    { id: 'side_plank_dips', name: 'Plancha lateral con descenso de cadera', db: '3544',
      description: 'Baja y eleva la cadera de forma controlada.',
      muscles: ['Oblicuos', 'Core'], equipment: [] },
    { id: 'hip_raise', name: 'Elevación lateral de cadera', db: '0710',
      description: 'Eleva la cadera desde una posición lateral para fortalecer abductores.',
      muscles: ['Abductores', 'Glúteos'], equipment: [] },
    { id: 'kettlebell_core', name: 'Core con kettlebell', db: '0554',
      description: 'Mantén la espalda neutra mientras mueves una kettlebell.',
      muscles: ['Core'], equipment: ['Kettlebell'] },
    { id: 'rowing', name: 'Remo', db: '0861',
      description: 'Ejercicio de remo utilizado como parte del trabajo de core.',
      muscles: ['Espalda', 'Core'], equipment: ['Polea o máquina de remo'] },
    { id: 'swiss_ball_plank', name: 'Plancha sobre fitball', db: null,
      description: 'Empuja el balón con los antebrazos manteniendo la plancha.',
      muscles: ['Core'], equipment: ['Fitball'] },
    { id: 'swiss_ball_crunch', name: 'Crunch con fitball', db: '2297',
      description: 'Sujeta el balón con los pies y realiza pequeños crunches.',
      muscles: ['Abdominales'], equipment: ['Fitball'] },
    { id: 'copenhagen_plank', name: 'Plancha Copenhagen', db: '1775',
      description: 'Plancha lateral apoyando la pierna sobre un banco para trabajar aductores.',
      muscles: ['Aductores', 'Core'], equipment: ['Banco'] },
    { id: 'single_leg_hamstring_hold', name: 'Puente isométrico de isquiotibiales', db: '3645',
      description: 'Mantén la cadera elevada con una sola pierna durante varios segundos.',
      muscles: ['Isquiotibiales', 'Glúteos'], equipment: [] }
  ];

  // Los 9 ejercicios de la colección que no existen en el dataset (db: null)
  // se registran como fichas propias para que el generador de rutinas también
  // pueda elegirlos. Se les da el vocabulario del dataset (bp/eq/tg) porque de
  // ahí salen los tags. No tienen `mid`: se quedan sin animación, que es
  // justo el motivo por el que no tenían equivalente.
  var RUNNING_RECOVERY_RECORDS = [
    { id: 'rr_foam_roller', bp: 'upper legs', eq: 'roller', tg: 'hamstrings' },
    { id: 'rr_hamstring_walkouts', bp: 'upper legs', eq: 'body weight', tg: 'hamstrings' },
    { id: 'rr_hip_flexor_march', bp: 'upper legs', eq: 'band', tg: 'quads' },
    { id: 'rr_banded_knee_raise', bp: 'upper legs', eq: 'band', tg: 'glutes' },
    { id: 'rr_hip_hike', bp: 'upper legs', eq: 'body weight', tg: 'abductors' },
    { id: 'rr_toe_walk', bp: 'lower legs', eq: 'body weight', tg: 'calves' },
    { id: 'rr_toe_walk_pause', bp: 'lower legs', eq: 'body weight', tg: 'calves' },
    { id: 'rr_front_plank_leg_raise', bp: 'waist', eq: 'body weight', tg: 'abs' },
    { id: 'rr_swiss_ball_plank', bp: 'waist', eq: 'stability ball', tg: 'abs' }
  ];

  // Enlaza cada ficha propia con su entrada de la colección para heredar
  // nombre y descripción, y las da de alta en el catálogo.
  (function registerRunningRecoveryRecords() {
    var byId = {};
    RUNNING_RECOVERY.forEach(function (it) { byId[it.id] = it; });
    var recs = [];
    RUNNING_RECOVERY_RECORDS.forEach(function (r) {
      var src = byId[r.id.replace(/^rr_/, '')];
      if (!src) return;
      recs.push({
        id: r.id, mid: null, n: src.name, bp: r.bp, eq: r.eq, tg: r.tg,
        mg: (src.muscles[0] || '').toLowerCase(),
        sm: [],
        es: [src.description],
        // El nombre ya está en español: que no pase por el traductor.
        esName: true
      });
      // Para que la tarjeta de la rutina sepa de qué entrada saca la ficha.
      src.recordId = r.id;
    });
    EXERCISE_DB.addExtra(recs);
  })();

  // Búsqueda dentro de la colección de recuperación (nombre, descripción,
  // músculos y material), ignorando acentos y mayúsculas.
  function searchRunningRecovery(query) {
    var q = EXERCISE_DB.norm(query).split(/\s+/).filter(Boolean);
    if (!q.length) return RUNNING_RECOVERY.slice();
    return RUNNING_RECOVERY.filter(function (it) {
      var hay = EXERCISE_DB.norm([
        it.name, it.description, it.muscles.join(' '), it.equipment.join(' ')
      ].join(' '));
      for (var i = 0; i < q.length; i++) if (hay.indexOf(q[i]) === -1) return false;
      return true;
    });
  }

  // Ejercicio de la rutina -> id en el dataset. null = no hay equivalente.
  var EXERCISE_DB_MAP = {
    // --- Sergio ---
    'press_plano': '0289',            // dumbbell bench press
    'press_inclinado': '0314',        // dumbbell incline bench press
    'aperturas_planas': '0308',       // dumbbell fly
    'aperturas_inclinadas': '0319',   // dumbbell incline fly
    'press_militar_sentado': '0405',  // dumbbell seated shoulder press
    'press_militar_pie': '0426',      // dumbbell standing overhead press
    'extension_triceps': '2188',      // dumbbell seated triceps extension
    'fondos_triceps': '0812',         // triceps dip (bench leg)
    'combo_triceps': '2188',
    'remo_maquina': '1350',           // lever seated row
    'remo_una_mano': '0292',          // dumbbell one arm bent-over row
    'remo_menton': '0437',            // dumbbell upright row
    'pajaro': '0380',                 // dumbbell rear lateral raise
    'combo_hombro': '0380',
    'elevaciones_laterales': '0334',  // dumbbell lateral raise
    'curl_biceps': '0416',            // dumbbell standing biceps curl
    'curl_martillo': '0313',          // dumbbell hammer curl
    'curl_concentrado': '0297',       // dumbbell concentration curl
    'sentadilla_goblet': '1760',      // dumbbell goblet squat
    'zancadas_estaticas': '2368',     // split squats
    'zancadas_caminando': '1460',     // walking lunge
    'peso_muerto_rumano': '1459',     // dumbbell romanian deadlift
    'plancha': '0464',                // front plank with twist
    'crunch': '3201',                 // quarter sit-up
    'flexiones': '0493',              // incline push-up

    // --- Eva ---
    'sentadilla_goblet_eva': '1760',
    'puente_gluteo': '3013',          // low glute bridge on floor
    'press_pecho_eva': '0289',
    'remo_una_mano_eva': '0292',
    'plancha_rodillas': '3239',       // kneeling plank tap shoulder
    'peso_muerto_rumano_eva': '1459',
    'zancada_eva': '2368',
    'press_hombros_eva': '0405',
    'curl_biceps_eva': '0416',
    'bird_dog': null,                 // no está en el dataset
    'hip_thrust_eva': '1409',         // barbell glute bridge
    'plancha_completa': '0464',
    'extension_triceps_eva': '2188',
    'zancadas_caminando_eva': '1460',

    // --- Gely ---
    'sentadilla_goblet_gely': '1760',
    'hip_thrust_gely': '1409',
    'zancada_gely': '2368',
    'elevacion_cadera_gely': '3013',
    'press_pecho_gely': '0289',
    'sentadilla_bulgara_gely': '0410', // dumbbell single leg split squat
    'remo_inclinado_gely': '0293',     // dumbbell bent over row
    'patada_gluteo_gely': null,        // no está en el dataset
    'press_arnold_gely': '0287',       // dumbbell arnold press v.2
    'dead_bug_gely': '0276',           // dead bug
    'plancha_lateral_gely': '3544',    // bodyweight incline side plank
    'combo_hombro_gely': '0334',
    'combo_triceps_gely': '2188',

    // --- Alternativas (EXERCISE_META[*].alternatives) ---
    'alt_press_plano_flex': '0662',          // push-up
    'alt_press_pecho_gely_flex': '0662',
    'alt_press_plano_suelo': null,           // no hay press de suelo con mancuernas
    'alt_press_pecho_eva_suelo': null,
    'alt_press_pecho_gely_suelo': null,
    'alt_press_inc_pies': '0279',            // decline push-up (pies elevados)
    'alt_apertura_inc_flex': '0279',
    'alt_aperturas_suelo': '0308',           // dumbbell fly
    'alt_press_pecho_eva_flex': '3211',      // kneeling push-up
    'alt_press_pecho_gely_band': '1254',     // band bench press
    'alt_flex_elevadas': '0493',             // incline push-up
    'alt_fondos_diamante': '0283',           // diamond push-up
    'alt_pm_arnold': '0287',                 // dumbbell arnold press
    'alt_pm_pie_sentado': '0405',
    'alt_ph_eva_pie': '0426',
    'alt_arnold_gely_normal': '0405',
    'alt_el_lat_inc': '0334',
    'alt_pajaro_de_pie': '0380',
    'alt_remo_ment_pajaro': '0380',
    'alt_combo_hombro_sep': '0334',
    'alt_combo_hombro_gely_sep': '0334',
    'alt_remo_maq_mancuernas': '0293',
    'alt_remo_1m_inclinado': '0293',
    'alt_remo_1m_eva_bilatrl': '0293',
    'alt_remo_inc_gely_1m': '0292',
    'alt_remo_inc_gely_band': '3144',        // resistance band seated row
    'alt_curl_alternado': '0285',            // dumbbell alternate biceps curl
    'alt_curl_ev_botella': '0416',
    'alt_curl_mart_alt': '1648',             // dumbbell alternate seated hammer curl
    'alt_curl_conc_normal': '0416',
    'alt_ext_tric_patada': '0333',           // dumbbell kickback
    'alt_ext_tric_eva_patada': '0333',
    'alt_combo_tric_sep': '0333',
    'alt_combo_tric_gely_sep': '2188',
    'alt_sq_goblet_pc': null,                // no hay sentadilla libre de peso corporal
    'alt_sq_goblet_eva_pc': null,
    'alt_sq_goblet_gely_pc': null,
    'alt_sq_goblet_gely_band': '1004',       // band squat
    'alt_sq_goblet_bulgara': '0410',
    'alt_bulg_gely_split': '0410',
    'alt_zan_stat_split': '2368',
    'alt_zan_gely_split': '2368',
    'alt_zan_cam_stat': '2368',
    'alt_zan_cam_eva_stat': '2368',
    'alt_bulg_gely_zancada': '2368',
    'alt_zan_eva_step': '0431',              // dumbbell step-up
    'alt_zan_gely_step': '0431',
    'alt_pdr_una_pierna': '1757',            // dumbbell single leg deadlift
    'alt_pdr_eva_rodillas': '1459',
    'alt_puente_gl_una_pierna': '3645',      // single leg bridge
    'alt_hip_thrust_gely_unilateral': '3645',
    'alt_hip_thrust_suelo': '1409',
    'alt_hip_thrust_gely_suelo': '1409',
    'alt_elev_cad_gely_peso': '1409',
    'alt_plancha_rodillas': '3239',
    'alt_plancha_full_prog': '0464',
    'alt_plancha_lat_gely_clasica': '0464',
    'alt_plancha_lateral': '3544',
    'alt_crunch_bici': '0003',               // air bike (crunch de bicicleta)
    'alt_dead_bug': '0276',
    'alt_dead_bug_gely_bird': null,          // bird-dog no está en el dataset
    'alt_pat_glu_gely_band': '0980',         // band bent-over hip extension
    'alt_pat_glu_gely_plancha': null
  };

  // Devuelve el registro del dataset para un ejercicio de la rutina.
  // Sólo mapeos explícitos: adivinar por nombre daba animaciones equivocadas.
  function getDbRecord(exerciseId) {
    if (!EXERCISE_DB.isLoaded()) return null;
    var mapped = EXERCISE_DB_MAP[exerciseId];
    return mapped ? EXERCISE_DB.get(mapped) : null;
  }

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

  var WARMUP_GELY = {
    general: '🌺 5 min de movilidad articular: cuello, hombros, muñecas, cadera, tobillos + activación de glúteos (10 elevaciones de cadera)',
    approach: '➕ 1-2 series de aproximación con peso muy ligero en el primer ejercicio'
  };

  // =============================================
  // PROFILES
  // =============================================
  // El perfil del tutorial se registra durante el arranque, antes que el resto
  // del bloque del tutorial, así que sus constantes viven aquí: declaradas más
  // abajo llegarían sin valor a installCustomPlan().
  var CUSTOM_PROFILE_ID = 'mia';
  var CUSTOM_PLAN_KEY = 'gym_custom_plan';

  var PROFILES = {
    sergio: { name: 'Sergio', initial: 'S', phases: SERGIO_PHASES, warmup: WARMUP, defaultDays: [1, 3, 5], daysLabel: '3 días por semana' },
    eva:    { name: 'Eva',    initial: 'E', phases: EVA_PHASES,    warmup: WARMUP_EVA, defaultDays: [1, 4], daysLabel: '2 días por semana' },
    gely:   { name: 'Gely',   initial: 'G', phases: GELY_PHASES,   warmup: WARMUP_GELY, defaultDays: [1, 3, 5], daysLabel: '3 días tono + remo' }
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

  // El plan generado por el tutorial es un perfil más, así que se registra
  // antes de resolver el perfil activo (si no, «Mi plan» no existiría todavía).
  var savedCustomPlan = loadCustomPlan();
  if (savedCustomPlan) installCustomPlan(savedCustomPlan);

  var activeProfile = localStorage.getItem('gym_active_profile') || 'sergio';
  if (!PROFILES[activeProfile]) activeProfile = 'sergio';

  // These are updated by switchProfile()
  var PHASES = PROFILES[activeProfile].phases;
  var ACTIVE_WARMUP = PROFILES[activeProfile].warmup;

  // =============================================
  // STATE
  // =============================================
  function getStorageKey() { return 'gym_calendar_data_' + activeProfile; }

  function getDefaultState() {
    return { progress: {}, completions: {}, swaps: {}, customDays: {}, finished: {}, settings: { trainingDays: PROFILES[activeProfile].defaultDays.slice() } };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(getStorageKey());
      if (raw) {
        var data = JSON.parse(raw);
        var st = { progress: data.progress || {}, completions: data.completions || {}, swaps: data.swaps || {}, customDays: data.customDays || {}, finished: data.finished || {} };
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

  // Marca de "entrenamiento finalizado": el progreso ya se guarda ejercicio a
  // ejercicio, pero sin un cierre explícito no se percibe como guardado.
  function isWorkoutFinished(dateKey) { return !!(state.finished && state.finished[dateKey]); }
  function getFinishedAt(dateKey) { return (state.finished && state.finished[dateKey]) || null; }
  function finishWorkout() {
    var key = getTodayKey();
    if (!state.finished) state.finished = {};
    state.finished[key] = new Date().toISOString();
    saveState();
    renderCurrentDay();
    showToast('✓ Entrenamiento guardado');
  }
  function reopenWorkout() {
    var key = getTodayKey();
    if (state.finished) delete state.finished[key];
    saveState();
    renderCurrentDay();
    showToast('Entrenamiento reabierto');
  }
  function formatFinishedTime(iso) {
    try {
      var d = new Date(iso);
      return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    } catch (e) { return ''; }
  }
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
    var custom = state.customDays && state.customDays[dateKey];
    if (custom === 'rest') return false;
    if (custom && typeof custom === 'object') return true;
    var d = new Date(dateKey + 'T12:00:00');
    var day = d.getDay();
    return getTrainingDays().indexOf(day) !== -1;
  }

  function getRoutineSlotForDate(dateKey) {
    var custom = state.customDays && state.customDays[dateKey];
    if (custom && typeof custom === 'object') return custom.routineIdx;
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
  // CUSTOM DAY ACTIONS
  // =============================================
  function addCustomTraining(dateKey, routineIdx) {
    if (!state.customDays) state.customDays = {};
    state.customDays[dateKey] = { routineIdx: routineIdx };
    saveState();
    renderHome();
    if (dateKey === getTodayKey()) renderCurrentDay();
  }

  function skipDay(dateKey) {
    if (!state.customDays) state.customDays = {};
    state.customDays[dateKey] = 'rest';
    saveState();
    renderHome();
    if (dateKey === getTodayKey()) renderCurrentDay();
  }

  function removeCustomDay(dateKey) {
    if (state.customDays) delete state.customDays[dateKey];
    saveState();
    renderHome();
    if (dateKey === getTodayKey()) renderCurrentDay();
  }

  function showRoutinePickerModal(dateKey) {
    var existing = document.getElementById('routinePickerOverlay');
    if (existing) existing.remove();

    var phase = getPhase(dateKey);
    var overlay = document.createElement('div');
    overlay.id = 'routinePickerOverlay';
    overlay.className = 'routine-picker-overlay';

    var modal = document.createElement('div');
    modal.className = 'routine-picker-modal';

    var title = document.createElement('div');
    title.className = 'routine-picker-title';
    title.textContent = '¿Qué rutina vas a hacer?';
    modal.appendChild(title);

    phase.days.forEach(function(day, idx) {
      var btn = document.createElement('button');
      btn.className = 'routine-picker-btn';
      btn.innerHTML = '<span class="rp-emoji">' + day.emoji + '</span><span class="rp-name">' + day.day + '</span>';
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        addCustomTraining(dateKey, idx);
        overlay.remove();
        // Re-render day detail
        var detailEl = document.getElementById('dayDetail');
        if (detailEl) {
          detailEl.innerHTML = renderDayDetail(dateKey);
          bindHomeCardListeners();
        }
      });
      modal.appendChild(btn);
    });

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'routine-picker-cancel';
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.addEventListener('click', function() { overlay.remove(); });
    modal.appendChild(cancelBtn);

    overlay.appendChild(modal);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
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
      // Check if all exercises done (Eva motivational message)
      if (activeProfile === 'eva') checkEvaWorkoutComplete();
    }
    saveState();
    renderCurrentDay();
    updateAll();
  }

  function EVA_MESSAGES() {
    return [
      '¡Lo has hecho genial! 🌸 Cada día más fuerte 💪',
      '¡Entrenazo! Tu constancia es tu superpoder ✨',
      '¡Buen trabajo! Un pasito más cerca de tu meta 🎯',
      '¡Orgulloso de ti! Cada gota de sudor cuenta 💜',
      '¡Eres una máquina! No hay quien te pare 🚀',
      '¡A darle! Ya has terminado, disfruta el logro 🌟',
      '¡Qué bien lo has hecho! Esta Eva es imparable 🔥',
      '¡Clase! Entreno completado con nota 👏',
      '¡Bravo! Tu fuerza crece cada día 🌷',
      '¡Enhorabuena! Hoy has vuelto a demostrar de qué estás hecha 💪'
    ];
  }

  function checkEvaWorkoutComplete() {
    var today = getTodayKey();
    var routineIdx = getTodayRoutine();
    if (routineIdx === -1) return;
    var phase = getPhase(today);
    var day = phase.days[routineIdx];
    if (!day) return;
    var completions = getTodayCompletions();
    var effective = getEffectiveExercises(day);
    var allDone = effective.every(function (item) { return completions[item.ex.id]; });
    if (allDone) {
      var messages = EVA_MESSAGES();
      var msg = messages[Math.floor(Math.random() * messages.length)];
      showEvaMotivation(msg);
    }
  }

  function showEvaMotivation(msg) {
    var existing = document.getElementById('evaMotivation');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'evaMotivation';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.55);animation:fadeIn 0.3s ease;';
    overlay.addEventListener('click', function () { overlay.remove(); });

    var card = document.createElement('div');
    card.style.cssText = 'background:var(--bg-card);border:2px solid #9b59b6;border-radius:var(--radius-xl);padding:32px 28px;max-width:320px;width:90%;text-align:center;box-shadow:var(--shadow);animation:slideUp 0.4s ease;';
    card.onclick = function (e) { e.stopPropagation(); };

    card.innerHTML = '<div style="font-size:2.5rem;margin-bottom:12px;">🌸</div>'
      + '<div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);margin-bottom:8px;line-height:1.4;">' + msg + '</div>'
      + '<button id="evaMotivationBtn" style="margin-top:16px;padding:10px 28px;border:none;border-radius:var(--radius-md);background:#9b59b6;color:#fff;font-family:var(--font);font-size:0.9rem;font-weight:600;cursor:pointer;-webkit-tap-highlight-color:transparent;">¡Gracias! 💜</button>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    var btn = document.getElementById('evaMotivationBtn');
    btn.addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('keydown', function(e) { if (e.key === 'Escape') overlay.remove(); });

    setTimeout(function () { if (overlay.parentNode) overlay.remove(); }, 8000);
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

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

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
    var dbView = document.getElementById('dbView');
    if (dbView) dbView.style.display = tab === 'db' ? '' : 'none';
    if (tab === 'rutina') { renderCurrentDay(); updateAll(); }
    if (tab === 'home') renderHome();
    if (tab === 'stats') renderStats();
    if (tab === 'db') renderExerciseBrowser();
  }

  // =============================================
  // EXPLORADOR DEL DATASET (pestaña "Ejercicios")
  // =============================================
  var dbQuery = '';
  var dbFilterBodyPart = '';
  var dbFilterTags = [];      // tags activos (se acumulan: todos deben cumplirse)
  var dbOpenId = null;
  var dbCollection = 'all';   // 'all' = dataset completo · 'running' = recuperación running

  function renderExerciseBrowser() {
    var el = document.getElementById('dbContent');
    if (!el) return;

    if (!EXERCISE_DB.isLoaded()) {
      el.innerHTML = '<div class="db-loading">Cargando catálogo de ejercicios…</div>';
      EXERCISE_DB.load().then(renderExerciseBrowser).catch(function () {
        el.innerHTML = '<div class="db-loading">No se pudo cargar el catálogo. Comprueba tu conexión.</div>';
      });
      return;
    }

    var isRunning = dbCollection === 'running';

    var html = '';

    // Selector de colección
    html += '<div class="db-collections">';
    html += '  <button class="db-collection' + (isRunning ? '' : ' active') + '" data-collection="all">🏋️ Catálogo</button>';
    html += '  <button class="db-collection' + (isRunning ? ' active' : '') + '" data-collection="running">🏃 ' + RUNNING_RECOVERY_LABEL + '</button>';
    html += '</div>';

    html += '<div class="db-searchbar">';
    html += '  <input type="search" id="dbSearchInput" class="db-search-input" placeholder="' + (isRunning ? 'Buscar: glúteos, banda, plancha…' : 'Buscar: sentadilla, mancuerna, glúteos…') + '" value="' + escapeHtml(dbQuery) + '">';
    html += '</div>';

    if (isRunning) {
      html += renderRunningRecovery();
      el.innerHTML = html;
      bindExerciseBrowserListeners(el);
      return;
    }

    // Acceso al tutorial que genera una rutina a medida
    html += '<button class="db-wizard-cta" id="dbWizardBtn">🎯 ¿No sabes por dónde empezar? Crea tu rutina a medida</button>';

    html += '<div class="db-chips">';
    html += '  <button class="db-chip' + (dbFilterBodyPart === '' ? ' active' : '') + '" data-bp="">Todos</button>';
    EXERCISE_DB.bodyParts().forEach(function (bp) {
      html += '  <button class="db-chip' + (dbFilterBodyPart === bp ? ' active' : '') + '" data-bp="' + escapeHtml(bp) + '">' + escapeHtml(EXERCISE_DB.labelBodyPart(bp)) + '</button>';
    });
    html += '</div>';

    html += '<div class="db-chips db-chips-tags">';
    TAG_FILTERS.forEach(function (f) {
      var on = dbFilterTags.indexOf(f.tag) !== -1;
      html += '  <button class="db-chip db-chip-tag' + (on ? ' active' : '') + '" data-tag="' + f.tag + '">' + f.label + '</button>';
    });
    html += '</div>';

    // Se pide el catálogo entero porque el filtro por tags se aplica después:
    // recortar antes dejaría fuera coincidencias válidas.
    var results = EXERCISE_DB.search(dbQuery, { limit: 2000, bodyPart: dbFilterBodyPart || null });
    if (dbFilterTags.length) {
      results = results.filter(function (rec) {
        for (var i = 0; i < dbFilterTags.length; i++) {
          if (!EXERCISE_TAGS.has(rec, dbFilterTags[i])) return false;
        }
        return true;
      });
    }
    var totalMatches = results.length;
    results = results.slice(0, 60);
    html += '<div class="db-count">' + results.length
      + (totalMatches > results.length ? ' de ' + totalMatches + ' coincidencias' : ' de ' + EXERCISE_DB.count() + ' ejercicios') + '</div>';

    html += '<div class="db-grid">';
    results.forEach(function (rec, idx) {
      var open = dbOpenId === rec.id;
      html += '<div class="db-card' + (open ? ' open' : '') + '" data-id="' + rec.id + '">';
      html += '  <div class="db-card-head">';
      // La tarjeta abierta y las primeras de la lista cargan ya; el resto
      // espera al observer (ver observeThumbs)
      // Las fichas propias no tienen miniatura: se deja el hueco vacío en vez
      // de un <img src=""> que el navegador pinta como imagen rota.
      var thumb = open ? EXERCISE_DB.gifUrl(rec) : EXERCISE_DB.imageUrl(rec);
      html += thumb
        ? '    <img class="db-thumb" alt="" ' + (open || idx < EAGER_THUMBS ? 'src="' : 'data-src="') + thumb + '">'
        : '    <div class="db-thumb db-thumb-empty" aria-hidden="true">🏃</div>';
      html += '    <div class="db-card-info">';
      html += '      <div class="db-card-name">' + escapeHtml(rec.n) + '</div>';
      html += '      <div class="db-card-meta">' + escapeHtml(EXERCISE_DB.labelTarget(rec.tg)) + ' · ' + escapeHtml(EXERCISE_DB.labelEquipment(rec.eq)) + '</div>';
      html += '      <div class="db-card-tags">' + renderTagBadges(rec) + '</div>';
      html += '    </div>';
      html += '  </div>';
      if (open && rec.es && rec.es.length) {
        html += '  <ol class="db-steps">';
        rec.es.forEach(function (s) { html += '<li>' + escapeHtml(s) + '</li>'; });
        html += '  </ol>';
      }
      html += '</div>';
    });
    html += '</div>';

    if (results.length === 0) {
      html += '<div class="db-loading">Sin resultados para «' + escapeHtml(dbQuery) + '».</div>';
    }

    html += '<div class="db-credit">Datos e imágenes: <a href="https://github.com/smoralb/exercises-dataset" target="_blank" rel="noopener">exercises-dataset</a> · © Gym visual</div>';

    el.innerHTML = html;
    bindExerciseBrowserListeners(el);
  }

  // Insignias de los tags más informativos de una ficha (material, patrón y
  // nivel). No se pintan todos: la tarjeta quedaría ilegible.
  var TAG_BADGE_LABEL = {
    sin_material: 'sin material', casa: 'casa', gimnasio: 'gimnasio',
    empuje: 'empuje', tiron: 'tirón', pierna: 'pierna', core: 'core',
    cardio: 'cardio', movilidad: 'movilidad',
    principiante: 'principiante', intermedio: 'intermedio', avanzado: 'avanzado'
  };
  var TAG_BADGE_ORDER = ['sin_material', 'casa', 'gimnasio', 'empuje', 'tiron', 'pierna', 'core', 'cardio', 'movilidad', 'principiante', 'intermedio', 'avanzado'];

  function renderTagBadges(rec) {
    var t = EXERCISE_TAGS.tagsFor(rec);
    if (!t) return '';
    var out = '', shown = 0;
    for (var i = 0; i < TAG_BADGE_ORDER.length && shown < 3; i++) {
      var tag = TAG_BADGE_ORDER[i];
      // "casa" es redundante si ya se muestra "sin material"
      if (tag === 'casa' && t.sin_material) continue;
      if (!t[tag]) continue;
      out += '<span class="db-tag db-tag-' + tag + '">' + TAG_BADGE_LABEL[tag] + '</span>';
      shown++;
    }
    return out;
  }

  // Colección "Recuperación running": catálogo propio, con la animación
  // del dataset cuando existe un equivalente.
  function renderRunningRecovery() {
    var results = searchRunningRecovery(dbQuery);
    var html = '';

    html += '<div class="db-count">' + results.length + ' de ' + RUNNING_RECOVERY.length + ' ejercicios · trabajo preventivo y de recuperación para corredores</div>';

    html += '<div class="db-grid">';
    results.forEach(function (it, idx) {
      var open = dbOpenId === it.id;
      var rec = it.db ? EXERCISE_DB.get(it.db) : null;
      html += '<div class="db-card' + (open ? ' open' : '') + '" data-id="' + it.id + '">';
      html += '  <div class="db-card-head">';
      if (rec) {
        html += '    <img class="db-thumb" alt="" ' + (open ? 'src="' + EXERCISE_DB.gifUrl(rec) + '"'
          : (idx < EAGER_THUMBS ? 'src="' : 'data-src="') + EXERCISE_DB.imageUrl(rec) + '"') + '>';
      } else {
        html += '    <div class="db-thumb db-thumb-empty">🏃</div>';
      }
      html += '    <div class="db-card-info">';
      html += '      <div class="db-card-name">' + escapeHtml(it.name) + '</div>';
      html += '      <div class="db-card-meta">' + escapeHtml(it.muscles.join(' · '))
           + (it.equipment.length ? ' · ' + escapeHtml(it.equipment.join(', ')) : ' · sin material') + '</div>';
      html += '    </div>';
      html += '  </div>';
      if (open) {
        html += '  <div class="db-card-desc">' + escapeHtml(it.description) + '</div>';
        if (rec && rec.es && rec.es.length) {
          html += '  <ol class="db-steps">';
          rec.es.forEach(function (s) { html += '<li>' + escapeHtml(s) + '</li>'; });
          html += '  </ol>';
        }
      }
      html += '</div>';
    });
    html += '</div>';

    if (results.length === 0) {
      html += '<div class="db-loading">Sin resultados para «' + escapeHtml(dbQuery) + '».</div>';
    }

    html += '<div class="db-credit">Animaciones: <a href="https://github.com/smoralb/exercises-dataset" target="_blank" rel="noopener">exercises-dataset</a> · © Gym visual</div>';
    return html;
  }

  // Carga diferida de las miniaturas de la lista.
  // No se usa loading="lazy": al repintar la lista entera Chrome no llega a
  // disparar la carga aunque las imágenes estén dentro del viewport.
  var dbThumbObserver = null;
  var EAGER_THUMBS = 12;   // las primeras de la lista se piden sin esperar

  function observeThumbs(el) {
    var imgs = el.querySelectorAll('.db-thumb[data-src]');
    if (!window.IntersectionObserver) {
      imgs.forEach(function (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); });
      return;
    }
    if (dbThumbObserver) dbThumbObserver.disconnect();
    dbThumbObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        obs.unobserve(img);
      });
    }, { rootMargin: '300px' });
    imgs.forEach(function (img) { dbThumbObserver.observe(img); });
  }

  function bindExerciseBrowserListeners(el) {
    observeThumbs(el);

    var input = document.getElementById('dbSearchInput');
    if (input) {
      var t = null;
      input.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () {
          dbQuery = input.value;
          dbOpenId = null;
          renderExerciseBrowser();
          var again = document.getElementById('dbSearchInput');
          if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
        }, 220);
      });
    }

    el.querySelectorAll('.db-collection').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (dbCollection === btn.dataset.collection) return;
        dbCollection = btn.dataset.collection;
        dbQuery = '';
        dbFilterBodyPart = '';
        dbFilterTags = [];
        dbOpenId = null;
        renderExerciseBrowser();
      });
    });

    var wizardBtn = document.getElementById('dbWizardBtn');
    if (wizardBtn) wizardBtn.addEventListener('click', function () { openRoutineWizard(false); });

    el.querySelectorAll('.db-chip[data-bp]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        dbFilterBodyPart = chip.dataset.bp;
        dbOpenId = null;
        renderExerciseBrowser();
      });
    });

    el.querySelectorAll('.db-chip-tag').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var tag = chip.dataset.tag;
        var i = dbFilterTags.indexOf(tag);
        if (i === -1) dbFilterTags.push(tag); else dbFilterTags.splice(i, 1);
        dbOpenId = null;
        renderExerciseBrowser();
      });
    });

    el.querySelectorAll('.db-card').forEach(function (card) {
      card.addEventListener('click', function () {
        dbOpenId = (dbOpenId === card.dataset.id) ? null : card.dataset.id;
        renderExerciseBrowser();
      });
    });
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
  // REST TIMER
  // =============================================
  var activeTimer = null;

  function parseRestSeconds(restStr) {
    if (!restStr || restStr === '—' || restStr === '-') return 0;
    var match = restStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  function formatTimerDisplay(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function clearActiveTimer() {
    if (activeTimer) {
      clearInterval(activeTimer.interval);
      var el = document.getElementById('timer-' + activeTimer.exerciseId);
      if (el) el.classList.remove('timer-active', 'timer-finished');
      var icon = document.getElementById('timer-icon-' + activeTimer.exerciseId);
      if (icon) icon.textContent = '⏱️';
      activeTimer = null;
    }
  }

  function startRestTimer(exerciseId, totalSeconds) {
    if (totalSeconds <= 0) return;
    clearActiveTimer();

    var remaining = totalSeconds;
    var timerDisplay = document.getElementById('timer-display-' + exerciseId);
    var timerContainer = document.getElementById('timer-' + exerciseId);
    var timerIcon = document.getElementById('timer-icon-' + exerciseId);

    if (!timerContainer || !timerDisplay) return;

    timerContainer.classList.add('timer-active');
    if (timerIcon) timerIcon.textContent = '⏳';
    timerDisplay.textContent = formatTimerDisplay(remaining);

    activeTimer = {
      exerciseId: exerciseId,
      interval: setInterval(function () {
        remaining--;
        timerDisplay.textContent = formatTimerDisplay(remaining);

        if (remaining <= 5 && remaining > 0) {
          timerContainer.classList.add('timer-warning');
        }

        if (remaining <= 0) {
          clearActiveTimer();
          timerContainer.classList.remove('timer-warning');
          timerContainer.classList.add('timer-finished');
          if (timerIcon) timerIcon.textContent = '✅';
          try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) {}
          showToast('⏰ ¡Descanso terminado!');
        }
      }, 1000)
    };
  }

  // =============================================
  // EXPAND / COLLAPSE & EXERCISE SWAP
  // =============================================
  var expandedCards = {};
  var homeExpandedCards = {};

  function toggleHomeExpand(exerciseId) {
    homeExpandedCards[exerciseId] = !homeExpandedCards[exerciseId];
    var body = document.getElementById('home-body-' + exerciseId);
    var chevron = document.getElementById('home-chevron-' + exerciseId);
    if (body) body.classList.toggle('expanded', !!homeExpandedCards[exerciseId]);
    if (chevron) chevron.textContent = homeExpandedCards[exerciseId] ? '˅' : '›';
  }

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

  function swapExercise(originalId, altExercise, dateKey) {
    if (!state.swaps) state.swaps = {};
    var key = dateKey || getTodayKey();
    if (!state.swaps[key]) state.swaps[key] = {};
    state.swaps[key][originalId] = altExercise;
    saveState();
    expandedCards[originalId] = true;
    homeExpandedCards[originalId] = true;
    renderCurrentDay();
    showToast('↔ ' + altExercise.name);
  }

  function revertSwap(originalId, dateKey) {
    var key = dateKey || getTodayKey();
    if (state.swaps && state.swaps[key]) {
      delete state.swaps[key][originalId];
      saveState();
    }
    renderCurrentDay();
    showToast('Ejercicio original restaurado');
  }

  // Repinta el detalle del día seleccionado en la pestaña Inicio
  function refreshHomeDayDetail() {
    var container = document.getElementById('homeContent');
    var detailEl = document.getElementById('dayDetail');
    if (!container || !detailEl) return;
    var selDate = container.dataset.selectedDate;
    if (!selDate) return;
    detailEl.innerHTML = renderDayDetail(selDate);
    bindHomeCardListeners();
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
      var restSecs = parseRestSeconds(ex.rest);
      html += '    <div class="exercise-detail-item"><span class="icon" id="timer-icon-' + originalId + '">⏱️</span><span><span class="label">Descanso: </span><span class="value">' + ex.rest + '</span></span>' + (restSecs > 0 ? '<button class="timer-start-btn" data-ex="' + originalId + '" data-secs="' + restSecs + '">Iniciar</button>' : '') + '</div>';
      html += '  </div>';

      if (restSecs > 0) {
        html += '  <div class="timer-container" id="timer-' + originalId + '">';
        html += '    <div class="timer-display" id="timer-display-' + originalId + '">' + formatTimerDisplay(restSecs) + '</div>';
        html += '    <button class="timer-cancel-btn" data-ex="' + originalId + '">Cancelar</button>';
        html += '  </div>';
      }

      html += '  <div class="exercise-focus"><div class="focus-label">💡 Enfoque clave</div>' + ex.focus + '</div>';

      // Animación + instrucciones del dataset público (si hay equivalente)
      var dbRec = getDbRecord(ex.id);
      var dbHasSteps = !!(dbRec && dbRec.es && dbRec.es.length);

      // La descripción es el mismo contenido en un párrafo corrido: solo se
      // muestra si no hay pasos numerados del dataset más abajo.
      if (meta.description && !dbHasSteps) {
        html += '  <div class="exercise-description">' + meta.description + '</div>';
      }

      if (meta.videoUrl) {
        html += '  <div class="exercise-video-wrapper"><iframe src="' + meta.videoUrl + '?rel=0&modestbranding=1" allowfullscreen loading="lazy" title="' + ex.name + '"></iframe></div>';
      }

      if (dbRec) {
        // Las fichas propias (Recuperación running) no tienen animación: se
        // muestran los pasos sin el <img>, que si no saldría roto.
        var dbGif = EXERCISE_DB.gifUrl(dbRec);
        html += '  <div class="exercise-db-block">';
        if (dbGif) {
          html += '    <img class="exercise-db-gif" loading="lazy" alt="Animación: ' + escapeHtml(dbRec.n) + '" src="' + dbGif + '">';
        }
        html += '    <div class="exercise-db-caption">' + escapeHtml(dbRec.n) + ' · ' + escapeHtml(EXERCISE_DB.labelEquipment(dbRec.eq)) + '</div>';
        if (dbRec.es && dbRec.es.length) {
          html += '    <ol class="exercise-db-steps">';
          dbRec.es.forEach(function (s) { html += '<li>' + escapeHtml(s) + '</li>'; });
          html += '    </ol>';
        }
        if (dbGif) html += '    <div class="exercise-db-credit">© Gym visual · dataset de ejercicios</div>';
        html += '  </div>';
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

    // Cierre del entrenamiento
    var doneCount = 0;
    effectiveExercises.forEach(function (item) { if (completions[item.ex.id]) doneCount++; });
    html += '<div class="finish-workout-block">';
    if (isWorkoutFinished(getTodayKey())) {
      var at = formatFinishedTime(getFinishedAt(getTodayKey()));
      html += '  <div class="finish-workout-saved">✓ Entrenamiento guardado' + (at ? ' a las ' + at : '')
        + '<span class="finish-workout-detail">' + doneCount + ' de ' + effectiveExercises.length + ' ejercicios completados</span></div>';
      html += '  <button class="finish-workout-reopen" id="reopenWorkoutBtn">Reabrir entrenamiento</button>';
    } else {
      html += '  <button class="finish-workout-btn" id="finishWorkoutBtn">🏁 Finalizar entrenamiento</button>';
      html += '  <div class="finish-workout-hint">Tu progreso se guarda automáticamente, aunque no lo termines.</div>';
    }
    html += '</div>';

    container.innerHTML = html;

    var finishBtn = container.querySelector('#finishWorkoutBtn');
    if (finishBtn) finishBtn.addEventListener('click', finishWorkout);
    var reopenBtn = container.querySelector('#reopenWorkoutBtn');
    if (reopenBtn) reopenBtn.addEventListener('click', reopenWorkout);

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

    container.querySelectorAll('.timer-start-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        startRestTimer(btn.dataset.ex, parseInt(btn.dataset.secs, 10));
      });
    });

    container.querySelectorAll('.timer-cancel-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        clearActiveTimer();
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
    html += '  <button class="home-wizard-cta" id="homeWizardBtn">'
      + '    <span class="home-wizard-cta-icon">🎯</span>'
      + '    <span class="home-wizard-cta-text">'
      + '      <span class="home-wizard-cta-title">Modificar entrenamiento</span>'
      + '      <span class="home-wizard-cta-desc">Responde otra vez el cuestionario y ajusta tu rutina</span>'
      + '    </span>'
      + '  </button>';
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

      var customVal = state.customDays && state.customDays[cellDate];
      var isCustomTraining = customVal && typeof customVal === 'object';
      var isSkipped = customVal === 'rest';

      var cls = 'calendar-day clickable';
      if (isToday) cls += ' today';
      if (isSelected) cls += ' selected';
      if (isFuture) cls += ' future';
      if (isCustomTraining) cls += ' custom-training';
      if (isSkipped) cls += ' skipped';

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

    var homeWizardBtn = document.getElementById('homeWizardBtn');
    if (homeWizardBtn) homeWizardBtn.addEventListener('click', function () { openRoutineWizard(false); });

    var prevBtn = document.getElementById('calPrev');
    var nextBtn = document.getElementById('calNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { homeMonthOffset--; renderHome(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { homeMonthOffset++; renderHome(); });

    bindHomeCardListeners();

    container.querySelectorAll('.calendar-day.clickable').forEach(function (el) {
      el.addEventListener('click', function () {
        container.dataset.selectedDate = el.dataset.date;
        var detailEl = document.getElementById('dayDetail');
        if (detailEl) detailEl.innerHTML = renderDayDetail(el.dataset.date);
        container.querySelectorAll('.calendar-day.clickable').forEach(function (d) { d.classList.remove('selected'); });
        el.classList.add('selected');
        bindHomeCardListeners();
      });
    });
  }

  function bindHomeCardListeners() {
    var detailEl = document.getElementById('dayDetail');
    if (!detailEl) return;
    detailEl.querySelectorAll('.home-ex-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var exId = header.id.replace('home-header-', '');
        toggleHomeExpand(exId);
      });
    });
    // Temporizador de descanso
    detailEl.querySelectorAll('.timer-start-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        startRestTimer(btn.dataset.ex, parseInt(btn.dataset.secs, 10));
      });
    });

    detailEl.querySelectorAll('.timer-cancel-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        clearActiveTimer();
      });
    });

    // Cambiar el ejercicio por la alternativa propuesta
    detailEl.querySelectorAll('.home-swap-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var origId = btn.dataset.orig;
        var ai = parseInt(btn.dataset.altIdx, 10);
        var meta = EXERCISE_META[origId] || {};
        if (!meta.alternatives || !meta.alternatives[ai]) return;
        swapExercise(origId, meta.alternatives[ai], btn.dataset.date || null);
        refreshHomeDayDetail();
      });
    });

    detailEl.querySelectorAll('.home-revert-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        revertSwap(btn.dataset.orig, btn.dataset.date || null);
        refreshHomeDayDetail();
      });
    });

    detailEl.querySelectorAll('.day-action-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var action = btn.dataset.action;
        var dateKey = btn.dataset.date;
        if (action === 'add-training') {
          showRoutinePickerModal(dateKey);
        } else if (action === 'skip-day') {
          skipDay(dateKey);
          var container = document.getElementById('homeContent');
          var selDate = container ? container.dataset.selectedDate : null;
          if (selDate) {
            detailEl.innerHTML = renderDayDetail(selDate);
            bindHomeCardListeners();
          }
        } else if (action === 'remove-custom') {
          removeCustomDay(dateKey);
          var container = document.getElementById('homeContent');
          var selDate = container ? container.dataset.selectedDate : null;
          if (selDate) {
            detailEl.innerHTML = renderDayDetail(selDate);
            bindHomeCardListeners();
          }
        } else if (action === 'recover-day') {
          removeCustomDay(dateKey);
          var container = document.getElementById('homeContent');
          var selDate = container ? container.dataset.selectedDate : null;
          if (selDate) {
            detailEl.innerHTML = renderDayDetail(selDate);
            bindHomeCardListeners();
          }
        }
      });
    });
  }

  // Tarjeta de ejercicio del detalle de día (pestaña Inicio).
  // opts: { dateKey, originalId, isSwapped, readOnly, weightStr }
  //  - readOnly: día pasado ya registrado (sin temporizador ni cambio de alternativa)
  function renderExerciseDetailItemForHome(ex, meta, opts) {
    opts = opts || {};
    var dateKey = opts.dateKey || null;
    var originalId = opts.originalId || ex.id;
    var isSwapped = !!opts.isSwapped;
    var readOnly = !!opts.readOnly;
    // Namespace propio para no chocar con los ids de la pestaña Rutina
    var timerId = 'home-' + originalId;
    var restStr = ex.rest || '—';
    var restSecs = parseRestSeconds(ex.rest);
    var isExpanded = !!homeExpandedCards[originalId];
    var html = '';

    html += '<div class="day-detail-ex-item home-ex-card" id="home-card-' + originalId + '">';

    // Clickable header
    html += '<div class="home-ex-header" id="home-header-' + originalId + '">';
    html += '  <div class="home-ex-info">';
    html += '    <div class="dd-ex-name">' + ex.name + (isSwapped ? ' <span class="exercise-swap-badge">↔</span>' : '') + '</div>';
    html += '    <div class="dd-ex-meta"><span class="dd-ex-muscle">' + ex.muscle + '</span>';
    html += (readOnly && opts.weightStr)
      ? '<span class="dd-ex-weight">🏋️ ' + opts.weightStr + '</span>'
      : '<span class="dd-ex-reps">' + ex.series + '×' + ex.reps + '</span>';
    html += '</div>';
    html += '  </div>';
    html += '  <span class="exercise-chevron" id="home-chevron-' + originalId + '">' + (isExpanded ? '˅' : '›') + '</span>';
    html += '</div>';

    // Expandable body
    html += '<div class="exercise-body' + (isExpanded ? ' expanded' : '') + '" id="home-body-' + originalId + '">';

    // Details grid (con botón de descanso salvo en días ya registrados)
    html += '  <div class="exercise-details">';
    html += '    <div class="exercise-detail-item"><span class="icon">🔄</span><span><span class="label">Series: </span><span class="value">' + ex.series + '</span></span></div>';
    html += '    <div class="exercise-detail-item"><span class="icon">🔁</span><span><span class="label">Reps: </span><span class="value">' + ex.reps + '</span></span></div>';
    html += '    <div class="exercise-detail-item"><span class="icon" id="timer-icon-' + timerId + '">⏱️</span><span><span class="label">Descanso: </span><span class="value">' + restStr + '</span></span>'
         + (!readOnly && restSecs > 0 ? '<button class="timer-start-btn" data-ex="' + timerId + '" data-secs="' + restSecs + '">Iniciar</button>' : '')
         + '</div>';
    html += '  </div>';

    if (!readOnly && restSecs > 0) {
      html += '  <div class="timer-container" id="timer-' + timerId + '">';
      html += '    <div class="timer-display" id="timer-display-' + timerId + '">' + formatTimerDisplay(restSecs) + '</div>';
      html += '    <button class="timer-cancel-btn" data-ex="' + timerId + '">Cancelar</button>';
      html += '  </div>';
    }

    // Focus
    if (ex.focus) {
      html += '  <div class="exercise-focus"><div class="focus-label">💡 Enfoque clave</div>' + ex.focus + '</div>';
    }

    // Animación + instrucciones del dataset público
    var dbRec = getDbRecord(ex.id);
    var dbHasSteps = !!(dbRec && dbRec.es && dbRec.es.length);

    // Description: mismo contenido que los pasos del dataset pero en un
    // párrafo corrido; se omite cuando esos pasos están disponibles.
    if (meta && meta.description && !dbHasSteps) {
      html += '  <div class="exercise-description">' + meta.description + '</div>';
    }

    // Video
    if (meta && meta.videoUrl) {
      html += '  <div class="exercise-video-wrapper"><iframe src="' + meta.videoUrl + '?rel=0&modestbranding=1" allowfullscreen loading="lazy" title="' + ex.name + '"></iframe></div>';
    }

    if (dbRec) {
      var gifSrc = EXERCISE_DB.gifUrl(dbRec);
      html += '  <div class="exercise-db-block">';
      if (gifSrc) {
        html += '    <img class="exercise-db-gif" loading="lazy" alt="Animación: ' + escapeHtml(dbRec.n) + '" src="' + gifSrc + '">';
      }
      html += '    <div class="exercise-db-caption">' + escapeHtml(dbRec.n) + ' · ' + escapeHtml(EXERCISE_DB.labelEquipment(dbRec.eq)) + '</div>';
      if (dbRec.es && dbRec.es.length) {
        html += '    <ol class="exercise-db-steps">';
        dbRec.es.forEach(function (s) { html += '<li>' + escapeHtml(s) + '</li>'; });
        html += '    </ol>';
      }
      if (gifSrc) html += '    <div class="exercise-db-credit">© Gym visual · dataset de ejercicios</div>';
      html += '  </div>';
    }

    // Weight hint
    if (ex.weightHint) {
      html += '  <div class="exercise-weight-hint">💡 ' + ex.weightHint + '</div>';
    }

    // Alternatives
    if (!isSwapped && meta && meta.alternatives && meta.alternatives.length > 0) {
      html += '  <div class="exercise-alternatives">';
      html += '    <div class="alternatives-title">🔀 Alternativas</div>';
      meta.alternatives.forEach(function(alt, ai) {
        html += '    <div class="alternative-item">';
        html += '      <div class="alternative-info"><div class="alternative-name">' + alt.name + '</div><div class="alternative-reason">' + alt.reason + '</div></div>';
        if (!readOnly) {
          html += '      <button class="home-swap-btn" data-orig="' + originalId + '" data-alt-idx="' + ai + '" data-date="' + (dateKey || '') + '">Cambiar</button>';
        }
        html += '    </div>';
      });
      html += '  </div>';
    }

    if (isSwapped && !readOnly) {
      html += '  <div class="swap-indicator">⇔ Usando alternativa · <button class="home-revert-btn" data-orig="' + originalId + '" data-date="' + (dateKey || '') + '">Volver al original</button></div>';
    }

    html += '</div>'; // end exercise-body
    html += '</div>'; // end day-detail-ex-item

    return html;
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

    // Determine custom day state for action buttons
    var customVal = state.customDays && state.customDays[dateKey];
    var isCustomTraining = customVal && typeof customVal === 'object';
    var isSkipped = customVal === 'rest';
    var isBaseScheduled = (function() {
      var d2 = new Date(dateKey + 'T12:00:00');
      return getTrainingDays().indexOf(d2.getDay()) !== -1;
    })();

    function buildActionBtn(dateKey) {
      if (isCustomTraining) {
        return '<button class="day-action-btn day-action-remove" data-action="remove-custom" data-date="' + dateKey + '">✕ Quitar entrenamiento añadido</button>';
      }
      if (isSkipped) {
        return '<button class="day-action-btn day-action-recover" data-action="recover-day" data-date="' + dateKey + '">↩ Recuperar entrenamiento</button>';
      }
      if (isBaseScheduled) {
        return '<button class="day-action-btn day-action-skip" data-action="skip-day" data-date="' + dateKey + '">↷ Saltar este día</button>';
      }
      return '<button class="day-action-btn day-action-add" data-action="add-training" data-date="' + dateKey + '">＋ Añadir entrenamiento</button>';
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
      var actionHtml = buildActionBtn(dateKey);
      return '<div class="day-detail-empty"><div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div><div class="day-detail-msg">🛌 Descanso</div><div class="day-detail-sub">Día libre. Aprovecha para recuperar 💪' + nextText + '</div>' + actionHtml + '</div>';
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
      getEffectiveExercises(day, dateKey).forEach(function (item) {
        var meta = EXERCISE_META[item.originalId] || {};
        html += renderExerciseDetailItemForHome(item.ex, meta, {
          dateKey: dateKey, originalId: item.originalId, isSwapped: item.isSwapped
        });
      });
      html += '  </div>';
      html += '  <div class="day-detail-summary">📋 ' + verb + ' ' + day.day + ' · ' + day.exercises.length + ' ejercicios</div>';
      html += buildActionBtn(dateKey);
      html += '</div>';
      return html;
    }

    // Past scheduled day with no data (missed)
    var html = '<div class="day-detail-data">';
    html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div>';
    html += '  <div class="day-detail-routine">' + day.emoji + ' ' + day.day + ' · Semana ' + weekNum + '</div>';
    html += '  <div class="day-detail-exercises">';
    getEffectiveExercises(day, dateKey).forEach(function (item) {
      var meta = EXERCISE_META[item.originalId] || {};
      html += renderExerciseDetailItemForHome(item.ex, meta, {
        dateKey: dateKey, originalId: item.originalId, isSwapped: item.isSwapped
      });
    });
    html += '  </div>';
    html += '  <div class="day-detail-summary">📋 Entrenamiento planificado (sin registrar) · ' + day.exercises.length + ' ejercicios</div>';
    html += buildActionBtn(dateKey);
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
      var meta = EXERCISE_META[ex.id] || {};
      html += renderExerciseDetailItemForHome(ex, meta, {
        dateKey: dateKey, originalId: ex.id, readOnly: true, weightStr: weightStr
      });
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
  // TUTORIAL: rutina a medida
  // ---------------------------------------------
  // Pregunta objetivo, material, días y nivel, y con eso arma una rutina
  // completa (3 fases de 4 semanas) eligiendo ejercicios del dataset por sus
  // tags. La rutina se guarda como un perfil más ('mia'), así que hereda todo
  // lo que ya funciona: calendario, pesos, progreso y estadísticas.
  // =============================================
  // Material de casa que aparece en el dataset, agrupado en pastillas. Cada
  // opción lista los valores `eq` del catálogo que desbloquea. El peso
  // corporal no está: siempre se puede hacer, se marque lo que se marque.
  var GEAR_OPTIONS = [
    { value: 'dumbbell', label: '🏋️ Mancuernas', desc: 'Un par de mancuernas o pesas', eq: ['dumbbell'] },
    { value: 'band', label: '🎗️ Bandas elásticas', desc: 'Gomas o bandas de resistencia', eq: ['band', 'resistance band'] },
    { value: 'kettlebell', label: '🔔 Kettlebell', desc: 'Pesa rusa', eq: ['kettlebell'] },
    { value: 'stability_ball', label: '🟣 Fitball', desc: 'Pelota grande de estabilidad', eq: ['stability ball'] },
    { value: 'medicine_ball', label: '⚽ Balón medicinal', desc: 'Balón con peso', eq: ['medicine ball'] },
    { value: 'wheel_roller', label: '🎡 Rueda abdominal', desc: 'Rueda de core (ab wheel)', eq: ['wheel roller'] },
    { value: 'roller', label: '🧻 Foam roller', desc: 'Rodillo de espuma para masaje y movilidad', eq: ['roller'] },
    { value: 'rope', label: '➰ Comba o cuerda', desc: 'Cuerda de saltar', eq: ['rope'] },
    { value: 'bosu', label: '🌗 Bosu', desc: 'Media pelota de equilibrio', eq: ['bosu ball'] },
    { value: 'weighted', label: '🎒 Lastre o chaleco', desc: 'Chaleco, tobilleras o mochila con peso', eq: ['weighted'] }
  ];

  // value de GEAR_OPTIONS -> valores `eq` del dataset
  var GEAR_EQUIPMENT = (function () {
    var map = {};
    GEAR_OPTIONS.forEach(function (o) { map[o.value] = o.eq; });
    return map;
  })();

  var WIZARD_STEPS = [
    {
      key: 'goal', title: '¿Qué quieres conseguir?', multi: true,
      hint: 'Puedes marcar varios objetivos. Ajustan los ejercicios, las series y las repeticiones.',
      options: [
        { value: 'fuerza', label: '🏋️ Ganar fuerza', desc: 'Pocas repeticiones, más peso, movimientos básicos' },
        { value: 'hipertrofia', label: '📈 Ganar músculo', desc: 'Volumen medio-alto, 8-12 repeticiones' },
        { value: 'tono', label: '✨ Tonificar', desc: 'Repeticiones altas, descansos cortos, cuerpo completo' },
        { value: 'perder_peso', label: '🔥 Perder peso', desc: 'Circuitos, poco descanso y trabajo metabólico' },
        { value: 'movilidad', label: '🌀 Movilidad y salud', desc: 'Trabajo suave de core, movilidad y estabilidad' }
      ]
    },
    {
      key: 'place', title: '¿Dónde vas a entrenar?', multi: true,
      hint: 'Puedes marcar varios sitios. Sólo se elegirán ejercicios que puedas hacer con lo que tengas.',
      options: [
        { value: 'gimnasio', label: '🏢 En el gimnasio', desc: 'Máquinas, barras, poleas y mancuernas' },
        { value: 'casa', label: '🏠 En casa con material', desc: 'Mancuernas, bandas, kettlebell o fitball' },
        { value: 'sin_material', label: '🤸 Sin material', desc: 'Sólo peso corporal' }
      ]
    },
    {
      // Sólo tiene sentido si entrena en casa con material: quien va al
      // gimnasio lo tiene todo, y 'sin material' ya dice que no hay nada.
      key: 'gear', title: '¿Qué material tienes en casa?', multi: true, pills: true,
      hint: 'Marca todo lo que tengas. Sólo se elegirán ejercicios que puedas hacer con ello (el peso corporal siempre entra).',
      when: function (answers) {
        var places = answerList(answers, 'place');
        return places.indexOf('casa') !== -1 && places.indexOf('gimnasio') === -1;
      },
      options: GEAR_OPTIONS
    },
    {
      key: 'days', title: '¿Cuántos días por semana?',
      hint: 'Con más días la rutina se reparte en más grupos musculares.',
      options: [
        { value: '2', label: '2 días', desc: 'Dos sesiones de cuerpo completo' },
        { value: '3', label: '3 días', desc: 'Empuje · Tirón · Pierna' },
        { value: '4', label: '4 días', desc: 'Torso · Pierna, dos veces' },
        { value: '5', label: '5 días', desc: 'Un grupo muscular por sesión' }
      ]
    },
    {
      key: 'level', title: '¿Cuál es tu experiencia?',
      hint: 'Marca el nivel de dificultad técnica de los ejercicios propuestos.',
      options: [
        { value: 'principiante', label: '🌱 Empiezo ahora', desc: 'Menos de 6 meses entrenando' },
        { value: 'intermedio', label: '💪 Tengo experiencia', desc: 'Entreno con regularidad desde hace tiempo' },
        { value: 'avanzado', label: '⚡ Avanzado', desc: 'Domino la técnica de los básicos' }
      ]
    },
    {
      key: 'running', title: '¿Corres o haces deporte de impacto?',
      hint: 'Se añade un bloque corto de trabajo preventivo al final de las sesiones de pierna.',
      options: [
        { value: '', label: '🚫 No, o casi nunca', desc: 'Sin trabajo preventivo extra' },
        { value: 'si', label: '🏃 Sí, corro', desc: 'Añade 2 ejercicios de la colección "Recuperación running"' }
      ]
    },
    {
      key: 'focus', title: '¿Alguna zona prioritaria?',
      hint: 'Se añade un ejercicio extra de esa zona en cada sesión que la trabaje.',
      options: [
        { value: '', label: '⚖️ Equilibrado', desc: 'Sin prioridad, todo por igual' },
        { value: 'pierna', label: '🦵 Pierna y glúteo', desc: 'Más volumen en tren inferior' },
        { value: 'empuje', label: '🔥 Pecho y hombro', desc: 'Más volumen en empuje' },
        { value: 'tiron', label: '💪 Espalda y brazos', desc: 'Más volumen en tirón' },
        { value: 'core', label: '🧘 Abdomen y core', desc: 'Más trabajo de zona media' }
      ]
    }
  ];

  // Reparto de patrones por sesión según los días disponibles.
  var SPLITS = {
    2: [
      { day: 'Cuerpo completo A', emoji: '🔥', title: 'Empuje, pierna y core', patterns: ['pierna', 'empuje', 'tiron', 'core'] },
      { day: 'Cuerpo completo B', emoji: '💪', title: 'Tirón, pierna y core', patterns: ['tiron', 'pierna', 'empuje', 'core'] }
    ],
    3: [
      { day: 'Empuje', emoji: '🔥', title: 'Pecho, hombro y tríceps', patterns: ['empuje', 'empuje', 'brazos'] },
      { day: 'Tirón', emoji: '💪', title: 'Espalda, hombro posterior y bíceps', patterns: ['tiron', 'tiron', 'brazos'] },
      { day: 'Pierna', emoji: '🦵', title: 'Pierna y core', patterns: ['pierna', 'pierna', 'core'] }
    ],
    4: [
      { day: 'Torso A', emoji: '🔥', title: 'Pecho, hombro y tríceps', patterns: ['empuje', 'empuje', 'brazos'] },
      { day: 'Pierna A', emoji: '🦵', title: 'Cuádriceps, glúteo y core', patterns: ['pierna', 'pierna', 'core'] },
      { day: 'Torso B', emoji: '💪', title: 'Espalda, hombro posterior y bíceps', patterns: ['tiron', 'tiron', 'brazos'] },
      { day: 'Pierna B', emoji: '🦵', title: 'Isquios, glúteo y core', patterns: ['pierna', 'pierna', 'core'] }
    ],
    5: [
      { day: 'Pecho', emoji: '🔥', title: 'Pecho y tríceps', patterns: ['empuje', 'empuje', 'brazos'] },
      { day: 'Espalda', emoji: '💪', title: 'Espalda y bíceps', patterns: ['tiron', 'tiron', 'brazos'] },
      { day: 'Pierna', emoji: '🦵', title: 'Pierna completa', patterns: ['pierna', 'pierna', 'pierna'] },
      { day: 'Hombro', emoji: '🎯', title: 'Hombro y brazos', patterns: ['empuje', 'brazos', 'brazos'] },
      { day: 'Core', emoji: '🧘', title: 'Zona media y estabilidad', patterns: ['core', 'core', 'core'] }
    ]
  };

  // Días de la semana por defecto según cuántas sesiones tenga la rutina.
  var DEFAULT_DAYS_BY_COUNT = { 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5] };

  // Series, repeticiones y descanso por objetivo y fase.
  // Las tres fases repiten los mismos ejercicios subiendo la exigencia.
  var GOAL_SCHEME = {
    fuerza: [
      { series: 3, reps: '8', repsMin: 8, repsMax: 8, rest: '120 seg' },
      { series: 4, reps: '6', repsMin: 6, repsMax: 6, rest: '150 seg' },
      { series: 5, reps: '5', repsMin: 5, repsMax: 5, rest: '180 seg' }
    ],
    hipertrofia: [
      { series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '90 seg' },
      { series: 4, reps: '10', repsMin: 10, repsMax: 10, rest: '90 seg' },
      { series: 4, reps: '8', repsMin: 8, repsMax: 8, rest: '75 seg' }
    ],
    tono: [
      { series: 3, reps: '15', repsMin: 15, repsMax: 15, rest: '60 seg' },
      { series: 3, reps: '15', repsMin: 15, repsMax: 15, rest: '45 seg' },
      { series: 4, reps: '15', repsMin: 15, repsMax: 15, rest: '45 seg' }
    ],
    perder_peso: [
      { series: 3, reps: '15', repsMin: 15, repsMax: 15, rest: '45 seg' },
      { series: 4, reps: '15', repsMin: 15, repsMax: 15, rest: '30 seg' },
      { series: 4, reps: '20', repsMin: 20, repsMax: 20, rest: '30 seg' }
    ],
    movilidad: [
      { series: 2, reps: '12', repsMin: 12, repsMax: 12, rest: '45 seg' },
      { series: 3, reps: '12', repsMin: 12, repsMax: 12, rest: '45 seg' },
      { series: 3, reps: '15', repsMin: 15, repsMax: 15, rest: '45 seg' }
    ]
  };

  var GOAL_LABEL = {
    fuerza: 'Fuerza', hipertrofia: 'Músculo', tono: 'Tono',
    perder_peso: 'Quemar grasa', movilidad: 'Movilidad'
  };
  var PLACE_LABEL = { gimnasio: 'en el gimnasio', casa: 'en casa', sin_material: 'sin material' };

  // Los pasos 'goal' y 'place' admiten varias opciones. Las respuestas se
  // guardan siempre como array, pero los planes creados antes de este cambio
  // (y los que sólo tienen una opción) traen un string: se normaliza aquí.
  function answerList(answers, key) {
    var v = answers[key];
    if (Array.isArray(v)) return v.filter(function (x) { return x !== undefined && x !== null; });
    return (v === undefined || v === null) ? [] : [v];
  }

  // Con varios sitios marcados manda el más permisivo: quien va al gimnasio
  // puede hacer también lo de casa, y 'sin material' es un subconjunto de 'casa'.
  var PLACE_RANK = { sin_material: 0, casa: 1, gimnasio: 2 };
  function effectivePlace(answers) {
    var best = null;
    answerList(answers, 'place').forEach(function (p) {
      if (best === null || (PLACE_RANK[p] || 0) > (PLACE_RANK[best] || 0)) best = p;
    });
    return best === null ? 'gimnasio' : best;
  }

  // Set de valores `eq` permitidos por el material marcado en casa, o null si
  // no se ha contestado (entonces vale cualquier material casero, como antes).
  function allowedEquipment(answers) {
    var gear = answerList(answers, 'gear');
    if (!gear.length) return null;
    var set = { 'body weight': 1 };
    gear.forEach(function (g) {
      (GEAR_EQUIPMENT[g] || []).forEach(function (eq) { set[eq] = 1; });
    });
    return set;
  }

  var PHASE_NAMES = [
    { name: 'Mes 1 · Adaptación', subtitle: 'Semanas 1 a 4 — Aprende la técnica', weeks: [1, 2, 3, 4] },
    { name: 'Mes 2 · Progresión', subtitle: 'Semanas 5 a 8 — Sube la carga', weeks: [5, 6, 7, 8] },
    { name: 'Mes 3 · Intensidad', subtitle: 'Semanas 9 a 12 — Máxima exigencia', weeks: [9, 10, 11, 12] }
  ];

  // Cuántos ejercicios pide cada sesión. Con poco tiempo o poco nivel, menos.
  function exerciseCountFor(answers) {
    if (answers.days === '5') return 4;
    if (answers.days === '2') return 6;
    return 5;
  }

  // Candidatos del dataset para un patrón concreto, ya filtrados por material
  // y nivel y ordenados de básico a accesorio.
  function candidatesFor(pattern, answers) {
    var items = [];
    var goals = answerList(answers, 'goal');
    if (!goals.length) goals = ['hipertrofia'];
    var place = effectivePlace(answers);
    // El material declarado sólo acota cuando se entrena en casa: en el
    // gimnasio se da por hecho que está todo disponible.
    var gearSet = place === 'casa' ? allowedEquipment(answers) : null;
    EXERCISE_DB.all().forEach(function (rec) {
      var t = EXERCISE_TAGS.tagsFor(rec);
      if (!t) return;
      // 'brazos' no es un patrón sino una marca sobre tirón/empuje, por eso
      // se comprueba como tag y no contra t._pattern.
      if (pattern === 'brazos' ? !t.brazos : t._pattern !== pattern) return;
      // Material: 'sin_material' es un subconjunto de 'casa', y quien va al
      // gimnasio puede hacer también lo de casa.
      if (place === 'sin_material' && !t.sin_material) return;
      if (place === 'casa' && !t.casa) return;
      if (gearSet && !gearSet[rec.eq || '']) return;
      if (!EXERCISE_TAGS.fitsLevel(rec, answers.level)) return;
      // El objetivo filtra sólo cuando tiene sentido: en movilidad se buscan
      // estiramientos, y en el resto se descartan. Con varios objetivos basta
      // con encajar en uno (unión), si no la intersección dejaría el catálogo
      // casi vacío al mezclar, por ejemplo, fuerza y movilidad.
      var fitsGoal = goals.some(function (g) {
        if (g === 'movilidad') return !!(t.movilidad || t.core || t.principiante);
        if (t.movilidad) return false;
        if (g === 'fuerza') return !!(t.fuerza || t._compound);
        if (g === 'perder_peso') return !(t.gimnasio && !t._compound);
        return true;
      });
      if (!fitsGoal) return;

      var score = 0;
      if (t._compound) score += 10;                                  // básicos primero
      var goalHits = 0;
      goals.forEach(function (g) { if (t[g]) goalHits++; });
      // Encajar con un objetivo puntúa; encajar con varios a la vez, algo más.
      if (goalHits) score += 5 + (goalHits - 1);
      if (place === 'gimnasio' && t.gimnasio) score += 2;             // aprovecha el material
      if (t._level === answers.level) score += 2;                    // nivel exacto
      items.push({ rec: rec, score: score });
    });

    items.sort(function (a, b) {
      return b.score - a.score || a.rec.n.length - b.rec.n.length || a.rec.n.localeCompare(b.rec.n);
    });
    return items.map(function (i) { return i.rec; });
  }

  // Construye la rutina completa a partir de las respuestas del tutorial.
  // Devuelve null si el catálogo no da para llenar ni una sesión.
  function generateRoutine(answers) {
    var split = SPLITS[answers.days] || SPLITS['3'];
    var perSession = exerciseCountFor(answers);
    // Con varios objetivos manda el primero que se marcó para las series y
    // repeticiones: mezclar esquemas daría un progreso incoherente.
    var scheme = GOAL_SCHEME[answerList(answers, 'goal')[0]] || GOAL_SCHEME.hipertrofia;

    // Cache de candidatos por patrón: se reutiliza en cada sesión.
    // El seed rota la lista sin perder el orden por puntuación, así cada
    // "Otros ejercicios" entra por un punto distinto de los mejor valorados.
    var pool = {};
    function poolFor(p) {
      if (!pool[p]) {
        var list = candidatesFor(p, answers);
        if (wizardShuffleSeed && list.length > 1) {
          var offset = wizardShuffleSeed % list.length;
          list = list.slice(offset).concat(list.slice(0, offset));
        }
        pool[p] = list;
      }
      return pool[p];
    }

    var usedGlobal = {};   // evita repetir el mismo ejercicio en toda la rutina
    var usedName = {};     // ...y que dos fichas distintas se vean igual
    var picks = [];        // ejercicios elegidos por sesión

    // El dataset trae variantes ("barbell upright row v. 2") que al traducir
    // colapsan en el mismo nombre. Como el usuario no puede distinguirlas,
    // se descartan por nombre visible además de por id.
    var nameCache = {};
    function displayName(rec) {
      if (nameCache[rec.id] === undefined) {
        nameCache[rec.id] = rec.esName ? rec.n : EXERCISE_DB.labelName(rec.n);
      }
      return nameCache[rec.id];
    }

    split.forEach(function (session) {
      var patterns = session.patterns.slice();
      // La zona prioritaria añade un hueco extra en las sesiones que la trabajan
      if (answers.focus && patterns.indexOf(answers.focus) !== -1) patterns.push(answers.focus);
      // Todas las sesiones cierran con core salvo las que ya son de core
      if (patterns.indexOf('core') === -1) patterns.push('core');
      while (patterns.length < perSession) patterns.push(patterns[patterns.length % session.patterns.length]);
      patterns = patterns.slice(0, perSession);

      var chosen = [];
      var usedEquipment = {};   // para no montar la sesión entera con lo mismo
      patterns.forEach(function (p) {
        var list = poolFor(p);
        var fallback = null;
        for (var i = 0; i < list.length; i++) {
          if (usedGlobal[list[i].id] || usedName[displayName(list[i])]) continue;
          // Se prefiere material que no se haya usado aún en esta sesión; si
          // todo lo disponible repite, vale el primero libre.
          if (usedEquipment[list[i].eq] && !fallback) { fallback = list[i]; continue; }
          if (usedEquipment[list[i].eq]) continue;
          fallback = list[i];
          break;
        }
        // Pool agotado: se tolera repetir un ejercicio de otra sesión, pero
        // nunca dos veces en la misma (antes caía en list[0] a ciegas y salían
        // sesiones con el mismo ejercicio dos veces).
        if (!fallback) {
          for (var j = 0; j < list.length; j++) {
            var dn = displayName(list[j]);
            if (chosen.every(function (c) { return displayName(c) !== dn; })) { fallback = list[j]; break; }
          }
        }
        if (!fallback) return;
        usedGlobal[fallback.id] = 1;
        usedName[displayName(fallback)] = 1;
        usedEquipment[fallback.eq] = 1;
        chosen.push(fallback);
      });
      picks.push(chosen);
    });

    if (!picks.length || !picks[0].length) return null;

    // Bloque preventivo para corredores (paso "¿Corres?"). Se añade al final
    // de las sesiones que tocan pierna, sumando: no quita nada de la sesión,
    // porque este trabajo es de prevención y no sustituye a la carga.
    var preventive = [];
    if (answers.running === 'si') {
      var rrPool = RUNNING_RECOVERY.filter(function (it) { return it.db || it.recordId; });
      var cursor = wizardShuffleSeed % (rrPool.length || 1);
      split.forEach(function (session, sIdx) {
        if (session.patterns.indexOf('pierna') === -1) { preventive[sIdx] = []; return; }
        var take = [];
        for (var k = 0; k < 2 && rrPool.length; k++) {
          take.push(rrPool[cursor % rrPool.length]);
          cursor++;
        }
        preventive[sIdx] = take;
      });
    }

    // Prescripción fija: series bajas y descanso corto. No progresa por fases
    // porque el objetivo es la calidad del movimiento, no la carga.
    function preventiveExercise(it) {
      var rec = EXERCISE_DB.get(it.recordId || it.db);
      var timed = /plancha|isom|hold|caminata|walk|foam|roller/i.test(it.name);
      return {
        id: 'gen_rr_' + it.id,
        dbId: rec ? rec.id : null,
        name: it.name,
        muscle: it.muscles[0] || 'Prevención',
        series: 2,
        reps: timed ? '30 seg' : '12',
        repsMin: timed ? 30 : 12,
        repsMax: timed ? 30 : 12,
        rest: '45 seg',
        isTimed: timed,
        preventive: true,
        focus: it.description,
        weightHint: it.equipment && it.equipment.length ? it.equipment.join(', ') : 'Peso corporal'
      };
    }

    // Una fase por bloque de 4 semanas, con los mismos ejercicios y más carga
    var phases = PHASE_NAMES.map(function (ph, phaseIdx) {
      var sc = scheme[phaseIdx];
      return {
        id: 'fase' + (phaseIdx + 1),
        name: ph.name,
        subtitle: ph.subtitle,
        weeks: ph.weeks.slice(),
        days: split.map(function (session, sIdx) {
          return {
            id: 'dia' + (sIdx + 1),
            day: session.day,
            emoji: session.emoji,
            title: session.title,
            exercises: picks[sIdx].map(function (rec) {
              var t = EXERCISE_TAGS.tagsFor(rec);
              var timed = /\b(plank|hold|isometric)\b/.test(String(rec.n).toLowerCase());
              return {
                id: 'gen_' + rec.id,
                dbId: rec.id,
                name: displayName(rec),
                muscle: EXERCISE_DB.labelTargetDisplay(rec.tg),
                series: sc.series,
                reps: timed ? (20 + phaseIdx * 10) + ' seg' : sc.reps,
                repsMin: timed ? 20 + phaseIdx * 10 : sc.repsMin,
                repsMax: timed ? 20 + phaseIdx * 10 : sc.repsMax,
                rest: sc.rest,
                isTimed: timed,
                focus: (rec.es && rec.es.length ? rec.es[0] : 'Movimiento controlado en todo el recorrido.'),
                weightHint: t.sin_material ? 'Peso corporal' : 'Ajusta el peso a tu nivel'
              };
            }).concat((preventive[sIdx] || []).map(preventiveExercise))
          };
        })
      };
    });

    return {
      version: 1,
      createdAt: getTodayKey(),
      answers: answers,
      phases: phases,
      trainingDays: (DEFAULT_DAYS_BY_COUNT[answers.days] || [1, 3, 5]).slice(),
      daysLabel: answers.days + ' días · '
        + answerList(answers, 'goal').map(function (g) { return GOAL_LABEL[g] || ''; }).filter(Boolean).join(' + ')
        + ' ' + (PLACE_LABEL[effectivePlace(answers)] || '')
    };
  }

  // Registra el plan como perfil: rellena PROFILES, el mapa al dataset (para
  // las animaciones) y EXERCISE_META (para la descripción paso a paso).
  function installCustomPlan(plan) {
    if (!plan || !plan.phases) return;

    PROFILES[CUSTOM_PROFILE_ID] = {
      name: 'Mi plan',
      initial: 'M',
      phases: plan.phases,
      warmup: {
        general: '🔥 5 min de movilidad articular (cuello, hombros, muñecas, cadera, tobillos)',
        approach: '➕ 1-2 series de aproximación con peso ligero en el primer ejercicio'
      },
      defaultDays: plan.trainingDays.slice(),
      daysLabel: plan.daysLabel,
      generated: true
    };

    plan.phases.forEach(function (phase) {
      phase.days.forEach(function (day) {
        day.exercises.forEach(function (ex) {
          if (!ex.dbId) return;
          EXERCISE_DB_MAP[ex.id] = ex.dbId;
          // La descripción sale del dataset, que puede no haber cargado aún:
          // por eso se vuelve a instalar el plan cuando termine la carga.
          if (!EXERCISE_META[ex.id] || !EXERCISE_META[ex.id].description) {
            var rec = EXERCISE_DB.get(ex.dbId);
            EXERCISE_META[ex.id] = {
              description: rec && rec.es && rec.es.length ? rec.es.join(' ') : '',
              videoUrl: '',
              alternatives: []
            };
          }
        });
      });
    });
  }

  function loadCustomPlan() {
    try {
      var raw = localStorage.getItem(CUSTOM_PLAN_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveCustomPlan(plan) {
    try { localStorage.setItem(CUSTOM_PLAN_KEY, JSON.stringify(plan)); } catch (e) {}
  }

  // ---- Onboarding de primer arranque ----
  var ONBOARDING_KEY = 'gym_onboarding_done';

  function markOnboardingDone() {
    try { localStorage.setItem(ONBOARDING_KEY, '1'); } catch (e) { /* modo privado */ }
  }

  // Sólo se muestra a quien abre la app por primera vez: si ya hay plan
  // propio o perfil elegido, es un usuario existente y se da por hecho.
  function needsOnboarding() {
    try {
      if (localStorage.getItem(ONBOARDING_KEY)) return false;
      if (loadCustomPlan() || localStorage.getItem('gym_active_profile')) {
        markOnboardingDone();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // ---- UI del tutorial ----
  var wizardStep = 0;
  var wizardAnswers = {};

  // Pasos visibles con las respuestas actuales: algunos sólo aplican según lo
  // contestado antes (el material de casa, por ejemplo). Se recalcula en cada
  // pintado, así que wizardStep siempre indexa esta lista.
  function activeWizardSteps() {
    return WIZARD_STEPS.filter(function (s) {
      return typeof s.when !== 'function' || s.when(wizardAnswers);
    });
  }

  // En modo onboarding el asistente ocupa toda la pantalla y no se puede cerrar.
  var wizardOnboarding = false;

  function openRoutineWizard(onboarding) {
    if (!EXERCISE_DB.isLoaded()) {
      showToast('Cargando catálogo…');
      EXERCISE_DB.load().then(function () { openRoutineWizard(onboarding); }).catch(function () {
        showToast('No se pudo cargar el catálogo');
      });
      return;
    }
    wizardOnboarding = onboarding === true;
    wizardStep = 0;
    wizardAnswers = {};
    var existing = loadCustomPlan();
    if (existing && existing.answers) wizardAnswers = existing.answers;
    renderWizard();
    var modal = document.getElementById('wizardModal');
    modal.classList.toggle('onboarding', wizardOnboarding);
    modal.classList.remove('hidden');
    document.body.classList.toggle('onboarding-lock', wizardOnboarding);
  }

  function closeRoutineWizard() {
    // Durante el onboarding sólo se sale completando el asistente.
    if (wizardOnboarding) return;
    var modal = document.getElementById('wizardModal');
    if (modal) modal.classList.add('hidden');
  }

  // Cierre forzado: lo usa el paso final del onboarding. Se desvanece antes
  // de destaparse la app para que la transición no sea un corte seco.
  function finishRoutineWizard() {
    var wasOnboarding = wizardOnboarding;
    wizardOnboarding = false;
    var modal = document.getElementById('wizardModal');
    if (!modal) return;

    if (!wasOnboarding) {
      modal.classList.add('hidden');
      document.body.classList.remove('onboarding-lock');
      return;
    }

    modal.classList.add('closing');
    setTimeout(function () {
      modal.classList.add('hidden');
      modal.classList.remove('onboarding', 'closing');
      document.body.classList.remove('onboarding-lock');
    }, 320);
  }

  // Reinicia la animación de entrada: quitar la clase y forzar un reflow
  // hace que el navegador vuelva a lanzar los keyframes en cada paso.
  function playWizardEnter(el) {
    el.classList.remove('wizard-enter');
    void el.offsetWidth;
    el.classList.add('wizard-enter');
  }

  function renderWizard() {
    var el = document.getElementById('wizardBody');
    if (!el) return;

    var steps = activeWizardSteps();

    // Última pantalla: resumen de la rutina generada
    if (wizardStep >= steps.length) { renderWizardSummary(el); return; }

    var step = steps[wizardStep];
    var intro = '';
    if (wizardOnboarding && wizardStep === 0) {
      intro = '<div class="wizard-welcome">'
        + '  <div class="wizard-welcome-icon">🏋️</div>'
        + '  <h2 class="wizard-welcome-title">Bienvenido a Gym Calendar</h2>'
        + '  <p class="wizard-welcome-text">Responde unas preguntas rápidas y creamos tu rutina a medida.</p>'
        + '</div>';
    }
    var html = intro;

    html += '<div class="wizard-progress">';
    for (var i = 0; i < steps.length; i++) {
      html += '<span class="wizard-dot' + (i <= wizardStep ? ' done' : '') + '"></span>';
    }
    html += '</div>';

    html += '<div class="wizard-step-count">Paso ' + (wizardStep + 1) + ' de ' + steps.length + '</div>';
    html += '<h3 class="wizard-title">' + escapeHtml(step.title) + '</h3>';
    html += '<p class="wizard-hint">' + escapeHtml(step.hint) + '</p>';

    // En los pasos múltiples el clic marca y desmarca, y se avanza con el
    // botón "Continuar"; en los simples el clic sigue avanzando directamente.
    var selected = answerList(wizardAnswers, step.key);

    // Los pasos con muchas opciones cortas se pintan como pastillas: la
    // descripción pasa al title para no hacer una lista interminable.
    html += '<div class="wizard-options' + (step.pills ? ' pills' : '') + '">';
    step.options.forEach(function (opt) {
      var sel = selected.indexOf(opt.value) !== -1;
      html += '<button class="wizard-option' + (sel ? ' selected' : '') + (step.multi ? ' multi' : '') + '"'
        + ' data-value="' + escapeHtml(opt.value) + '"'
        + (step.pills ? ' title="' + escapeHtml(opt.desc) + '"' : '')
        + ' aria-pressed="' + (sel ? 'true' : 'false') + '">';
      html += '  <span class="wizard-option-label">' + escapeHtml(opt.label) + '</span>';
      if (!step.pills) html += '  <span class="wizard-option-desc">' + escapeHtml(opt.desc) + '</span>';
      html += '</button>';
    });
    html += '</div>';

    html += '<div class="wizard-nav">';
    if (wizardStep > 0) html += '<button class="wizard-back" id="wizardBack">← Atrás</button>';
    if (step.multi) {
      html += '<button class="wizard-next" id="wizardNext"' + (selected.length ? '' : ' disabled') + '>'
        + (selected.length > 1 ? 'Continuar (' + selected.length + ') →' : 'Continuar →') + '</button>';
    }
    html += '</div>';

    el.innerHTML = html;
    playWizardEnter(el);

    el.querySelectorAll('.wizard-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.dataset.value;
        if (!step.multi) {
          wizardAnswers[step.key] = value;
          wizardStep++;
          renderWizard();
          return;
        }
        var list = answerList(wizardAnswers, step.key);
        var at = list.indexOf(value);
        if (at === -1) list.push(value); else list.splice(at, 1);
        wizardAnswers[step.key] = list;
        // Sin repintar el paso: volver a renderizar reinicia la animación de
        // entrada y da sensación de recarga. Sólo cambia el botón pulsado.
        var on = at === -1;
        btn.classList.toggle('selected', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        updateWizardNext(step, list);
      });
    });
    var next = document.getElementById('wizardNext');
    if (next) next.addEventListener('click', function () {
      if (!answerList(wizardAnswers, step.key).length) return;
      wizardStep++;
      renderWizard();
    });
    var back = document.getElementById('wizardBack');
    if (back) back.addEventListener('click', function () { wizardStep--; renderWizard(); });
  }

  // Etiqueta y estado del botón "Continuar" de los pasos múltiples. Se llama
  // al marcar y desmarcar, así el paso no necesita repintarse entero.
  function updateWizardNext(step, selected) {
    var next = document.getElementById('wizardNext');
    if (!next || !step.multi) return;
    next.disabled = selected.length === 0;
    next.textContent = selected.length > 1
      ? 'Continuar (' + selected.length + ') →'
      : 'Continuar →';
  }

  function renderWizardSummary(el) {
    var plan = generateRoutine(wizardAnswers);
    if (!plan) {
      el.innerHTML = '<div class="wizard-empty">No hemos encontrado suficientes ejercicios con esos criterios. '
        + '<button class="wizard-back" id="wizardBack">← Cambiar respuestas</button></div>';
      var b = document.getElementById('wizardBack');
      if (b) b.addEventListener('click', function () { wizardStep--; renderWizard(); });
      return;
    }

    var html = '';
    html += '<div class="wizard-progress">';
    for (var i = 0; i < activeWizardSteps().length; i++) html += '<span class="wizard-dot done"></span>';
    html += '</div>';

    html += '<h3 class="wizard-title">Tu rutina está lista 🎉</h3>';
    html += '<p class="wizard-hint">' + escapeHtml(plan.daysLabel)
      + ' · 12 semanas en 3 fases. Se guardará como el perfil «Mi plan».</p>';

    // Se muestran los días de la primera fase: las otras dos repiten
    // ejercicios cambiando series y repeticiones.
    plan.phases[0].days.forEach(function (day) {
      html += '<div class="wizard-day">';
      html += '  <div class="wizard-day-head">' + day.emoji + ' <strong>' + escapeHtml(day.day) + '</strong> · ' + escapeHtml(day.title) + '</div>';
      html += '  <ul class="wizard-day-list">';
      day.exercises.forEach(function (ex) {
        html += '<li><span class="wizard-ex-name">' + escapeHtml(ex.name) + '</span>'
          + '<span class="wizard-ex-meta">' + ex.series + '×' + escapeHtml(ex.reps) + ' · ' + escapeHtml(ex.muscle) + '</span></li>';
      });
      html += '  </ul>';
      html += '</div>';
    });

    html += '<div class="wizard-nav wizard-nav-final">';
    html += '  <button class="wizard-back" id="wizardBack">← Atrás</button>';
    html += '  <button class="wizard-regen" id="wizardRegen">🔀 Otros ejercicios</button>';
    html += '  <button class="wizard-save" id="wizardSave">✅ Usar esta rutina</button>';
    html += '</div>';

    el.innerHTML = html;
    playWizardEnter(el);

    document.getElementById('wizardBack').addEventListener('click', function () { wizardStep--; renderWizard(); });

    // "Otros ejercicios" baraja el orden de los candidatos para proponer
    // alternativas distintas con las mismas respuestas.
    document.getElementById('wizardRegen').addEventListener('click', function () {
      wizardShuffleSeed++;
      renderWizard();
    });

    document.getElementById('wizardSave').addEventListener('click', function () {
      saveCustomPlan(plan);
      installCustomPlan(plan);
      addCustomProfileOption();
      markOnboardingDone();
      finishRoutineWizard();
      switchProfile(CUSTOM_PROFILE_ID);
      switchTab('rutina');
      showToast('Rutina creada 🎉');
    });
  }

  // Cada regeneración rota los candidatos para que salgan ejercicios distintos.
  var wizardShuffleSeed = 0;

  // Añade (o refresca) la opción «Mi plan» en el selector de perfiles.
  function addCustomProfileOption() {
    if (!PROFILES[CUSTOM_PROFILE_ID]) return;
    var wrap = document.querySelector('.profile-modal-options');
    if (!wrap || wrap.querySelector('[data-profile="' + CUSTOM_PROFILE_ID + '"]')) return;
    var btn = document.createElement('button');
    btn.className = 'profile-option';
    btn.dataset.profile = CUSTOM_PROFILE_ID;
    btn.innerHTML = '<span class="profile-option-initial">M</span><span class="profile-option-name">Mi plan</span>';
    btn.addEventListener('click', function () { switchProfile(CUSTOM_PROFILE_ID); });
    wrap.appendChild(btn);
  }

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

    // Rehacer el tutorial desde el menú. No va en modo onboarding: aquí sí se
    // puede cerrar sin completarlo, y el plan actual se mantiene hasta que se
    // confirme el nuevo en el resumen.
    var redoBtn = document.getElementById('redoWizardBtn');
    if (redoBtn) redoBtn.addEventListener('click', function () {
      closeProfileSelector();
      openRoutineWizard(false);
    });

    addCustomProfileOption();
    updateProfileUI();

    var wizardOverlay = document.getElementById('wizardModalOverlay');
    if (wizardOverlay) wizardOverlay.addEventListener('click', closeRoutineWizard);
    var wizardClose = document.getElementById('wizardClose');
    if (wizardClose) wizardClose.addEventListener('click', closeRoutineWizard);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
    }

    var pendingOnboarding = needsOnboarding();
    // Bloquea la app desde el primer frame para que no se vea el fondo
    if (pendingOnboarding) document.body.classList.add('onboarding-lock');

    // Carga el catálogo en segundo plano y repinta cuando esté listo
    EXERCISE_DB.load().then(function () {
      // Ahora sí hay dataset: el plan generado recupera sus descripciones
      if (savedCustomPlan) installCustomPlan(savedCustomPlan);
      if (currentTab === 'rutina') renderCurrentDay();
      if (currentTab === 'db') renderExerciseBrowser();
      if (pendingOnboarding) openRoutineWizard(true);
    }).catch(function () {
      // Sin catálogo no se puede generar rutina: no bloqueamos la app
      document.body.classList.remove('onboarding-lock');
    });

    var vEl = document.getElementById('appVersion');
    if (vEl) vEl.textContent = 'v' + APP_VERSION;

    console.log('🏋️ Gym Calendar v' + APP_VERSION);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
