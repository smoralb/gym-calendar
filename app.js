/* =============================================
   Gym Calendar - App de Rutina de Ejercicios
   Versión: 4.38.0 — Modelo más capaz para entender lo que le pides al coach
   ============================================= */

(function () {
  'use strict';

  var APP_VERSION = '4.38.0';

  // Histórico de novedades, de la más reciente a la más antigua.
  //
  // Es una lista y no una sola versión porque quien pasa semanas sin abrir la
  // app se saltaba todo lo intermedio: sólo veía lo último y lo anterior se
  // perdía para siempre. Ahora se enseña TODO lo que hay entre la última
  // versión vista y la actual, agrupado por versión.
  //
  // Sólo entran cambios que el usuario nota. Los arreglos internos no van aquí.
  var CHANGELOG = [
    {
      version: '4.38.0',
      items: [
        { icon: '🧠', text: 'El coach entiende mejor lo que le pides. Ahora usa un modelo más capaz para traducir tus peticiones a cambios en la rutina, y además responde más rápido. En las pruebas pasó de acertar 8 de cada 10 a 10 de 10.' }
      ]
    },
    {
      version: '4.37.0',
      items: [
        { icon: '🔁', text: 'El coach ahora lo reintenta cuando se le atraganta una petición, en vez de rendirse a la primera. Casi todos los «no he sabido qué cambiar» eran eso.' },
        { icon: '🛡️', text: 'Y deja de inventarse cosas: si le pides algo muy abierto («ponme algo mejor») ya no te reescribe media configuración, y no puede apuntarte una lesión que no le hayas dicho. Te pedirá que concretes.' }
      ]
    },
    {
      version: '4.36.1',
      items: [
        { icon: '🐛', text: 'Arreglado: le pedías un cambio al coach, lo entendía, y al pulsar Aplicar te soltaba «no he sabido qué cambiar con eso». Pasaba cuando pedías más de lo que existe (un cuarto día de carrera, por ejemplo) o cuando lo decías con una frase larga.' }
      ]
    },
    {
      version: '4.36.0',
      items: [
        { icon: '🏃', text: 'Ya puedes elegir cuántos días corres: 1, 2 o 3 a la semana. Antes eran 3 fijos o ninguno, y por eso pedir «1 día de running» te dejaba sin ninguna carrera. Con 1 día se corre el rodaje largo, con 2 se añade una sesión corta.' },
        { icon: '💪', text: 'Y como la carrera ocupa menos días, te caben más de fuerza: pidiendo 4 días de fuerza y 1 de carrera ya no se te reagrupa nada, tienes tus 4 días tal cual.' }
      ]
    },
    {
      version: '4.35.0',
      items: [
        { icon: '🐛', text: 'Arreglado: el coach te decía «pulsa Aplicar a mi rutina» y ese botón no aparecía. Salía o no según las palabras que usaras: «sólo quiero 1 sesión de running a la semana» no lo sacaba. Ahora entiende muchas más formas de pedirlo y, si el coach te dice que lo apliques, el botón está sí o sí.' },
        { icon: '🏃', text: 'Ya puedes pedirle al coach que te quite el plan de vuelta a correr. Antes era imposible: la petición se descartaba por el camino y no pasaba nada. Ojo, el plan son 3 sesiones por semana fijas y no se puede dejar en 1 — o lo sigues, o lo quitas y corres por tu cuenta.' }
      ]
    },
    {
      version: '4.34.0',
      items: [
        { icon: '🎯', text: 'El coach ya te aplica los cambios sobre cualquier plan, también los de plantilla (Sergio, Eva, Gely). Antes te dejaba pedirlos y luego no había forma de aplicarlos: ahora al aceptar, tu plantilla se convierte en rutina a tu medida conservando pesos, sesiones y racha. Se puede deshacer desde Perfil → Editar.' },
        { icon: '🏃', text: 'Y si pides menos días de los que te van a quedar, te lo dice antes de aceptar en vez de dejarte descubrirlo en el calendario: con el plan de vuelta a correr, la carrera se lleva 3 días suyos y ese número no lo mandas tú.' }
      ]
    },
    {
      version: '4.33.1',
      items: [
        { icon: '☁️', text: 'Arreglado: la primera copia de tus datos esperaba a que cambiaras algo. Si abrías la app y no tocabas nada, no se guardaba nada. Ahora se hace sola nada más abrir.' }
      ]
    },
    {
      version: '4.33.0',
      items: [
        { icon: '☁️', text: 'Tus datos ya se copian solos fuera del móvil: cada vez que entrenas y cada vez que cierras la app. Sin cuentas ni botones. En Perfil tienes un código para recuperarlos en otro móvil — apúntalo, es la única llave.' },
        { icon: '🪄', text: 'Los planes de plantilla (Sergio, Eva, Gely) ya se pueden convertir en rutina a tu medida, conservando tus pesos, tus sesiones y tu racha. A partir de ahí el coach sí puede ajustártelos. Y se puede volver atrás desde Perfil → Editar.' },
        { icon: '🐛', text: 'Arreglado: le pedías al coach que te cambiara la rutina, te decía que sí, y no cambiaba nada. Con los planes de plantilla no había forma de aplicarlo y no te avisaba de ello.' },
        { icon: '🗓️', text: 'Mapa de calor de los últimos 6 meses en Perfil: una casilla por día, más intensa cuantos más ejercicios hiciste.' },
        { icon: '⚖️', text: 'Tu peso corporal ahora tiene gráfica: cada vez que lo actualizas queda un apunte y ves la curva.' },
        { icon: '💾', text: 'También puedes descargarte tus datos a un fichero y volver a importarlos, si prefieres no depender de nada.' },
        { icon: '🔆', text: 'La pantalla ya no se apaga mientras entrenas.' },
        { icon: '🏃', text: 'Con el plan de vuelta a correr, la cabecera decía los días que pediste y no los que hay de verdad. Ahora dice la verdad y te explica por qué la carrera ocupa 3 días suyos.' }
      ]
    },
    {
      version: '4.32.1',
      items: [
        { icon: '🐛', text: 'Arreglado: al cambiar tu rutina desde el coach o desde el asistente, decía «Rutina actualizada» pero seguías viendo la de antes. Y si pedías más días, te dejaba el programa anterior repartido entre ellos en vez de uno de verdad para esos días.' }
      ]
    },
    {
      version: '4.32.0',
      items: [
        { icon: '🔍', text: 'Las alternativas ya no son un desastre: salen del mismo núcleo curado que tu rutina, así que respetan el material que dijiste tener, tu nivel y tus molestias. Además no repiten lo que ya haces ese día y cambian de orden cada vez.' }
      ]
    },
    {
      version: '4.31.1',
      items: [
        { icon: '⚖️', text: 'Tu peso ya es el mismo en todos los planes. Antes era de cada plan y al cambiar de uno a otro te lo volvía a pedir, cuando tú pesas lo mismo en todos.' }
      ]
    },
    {
      version: '4.31.0',
      items: [
        { icon: '👤', text: 'El botón redondo de arriba a la derecha ahora abre tu perfil, que es lo que parecía. Dentro tienes tus planes, tu progreso y tus ajustes, todo junto. La pestaña «Perfil» desaparece de abajo: se entra por ese botón.' }
      ]
    },
    {
      version: '4.30.0',
      items: [
        { icon: '🔥', text: 'Nueva racha: cuenta las sesiones que llevas seguidas sin fallar ninguna de las que te tocaban. Los días de descanso no la rompen, que para eso están. Si hoy toca y aún no has entrenado, te avisa antes de que la pierdas.' }
      ]
    },
    {
      version: '4.29.0',
      items: [
        { icon: '👤', text: 'La pestaña «Stats» ahora se llama «Perfil»: además de tu progreso, es donde están tus ajustes. Tu peso y los recordatorios se han mudado ahí desde Inicio.' }
      ]
    },
    {
      version: '4.28.0',
      items: [
        { icon: '🔔', text: 'Recordatorios los días que te toca entrenar, a la hora que tú elijas. Si ya has entrenado, no te molesto. Se activan y desactivan desde Perfil. En iPhone hay que tener la app añadida a la pantalla de inicio.' }
      ]
    },
    {
      version: '4.27.0',
      items: [
        { icon: '📜', text: 'Si pasas tiempo sin abrir la app, ya no te pierdes nada: se te resumen de golpe todas las novedades desde la última vez. Y pulsando el número de versión de arriba ves el historial completo.' }
      ]
    },
    {
      version: '4.26.0',
      items: [
        { icon: '🔥', text: 'Calorías estimadas de cada sesión y del total de la semana. Añade tu peso en Perfil para activarlas: sin él no se pueden calcular. Es una orientación, no una medida exacta.' }
      ]
    },
    {
      version: '4.25.0',
      items: [
        { icon: '🧠', text: 'Nuevo botón de entrenador: pregúntale por qué tu plan es como es, cómo vas de series esta semana o qué hacer con un ejercicio que se te atraganta. Conoce tu plan y tus últimos pesos.' },
        { icon: '🎯', text: 'Cuéntale que algo ha cambiado —«me molesta el hombro», «ahora solo tengo 30 minutos»— y te ofrece aplicarlo a la rutina. Ves qué cambia antes de tocar nada, y sigue siendo el generador de siempre el que arma el plan.' },
        { icon: '⬇️', text: 'Al actualizar ya ves cuánto queda, y las novedades se cuentan cuando la app está lista de verdad, no antes.' }
      ]
    },
    {
      version: '4.23.0',
      items: [
        { icon: '🏃', text: 'Si dices que corres, ya se te ofrece el plan de vuelta a correr elijas los días que elijas. Antes, con 4 o más días de entrenamiento, ni se te preguntaba ni se te explicaba por qué.' },
        { icon: '📅', text: 'Cuando el plan de carrera no cabe, tu fuerza se reagrupa en menos sesiones y más largas para dejarle sitio, manteniendo el total de series de la semana.' }
      ]
    },
    {
      version: '4.22.0',
      items: [
        { icon: '📊', text: 'Las rutinas se construyen por series semanales de cada músculo, no por número de ejercicios, y cada programa tiene nombre: Cuerpo completo, Push · Pull · Legs, Torso · Pierna…' },
        { icon: '🧭', text: 'Nuevo «¿Por qué este entrenamiento?»: te explica qué programa sigues, cuántas series necesita cada músculo y cómo progresas.' }
      ]
    },
    {
      version: '4.21.0',
      items: [
        { icon: '🗂️', text: 'Varios planes a la vez: puedes crear, renombrar y borrar los que quieras desde el selector, cada uno con su propio historial.' }
      ]
    },
    {
      version: '4.20.0',
      items: [
        { icon: '🎨', text: 'Rediseño visual: paleta más neutra y tarjetas planas, para que se lea mejor en el gimnasio.' }
      ]
    },
    {
      version: '4.19.0',
      items: [
        { icon: '✅', text: 'Ya puedes marcar entrenamientos de días pasados.' },
        { icon: '📱', text: 'Arreglado: en iPhone, deslizar sobre la imagen de un ejercicio movía toda la pantalla.' }
      ]
    },
    {
      version: '4.18.0',
      items: [
        { icon: '🏃', text: 'Plan de vuelta a correr de 12 semanas, combinable con tus días de fuerza desde el asistente.' }
      ]
    }
  ];

  // La versión que se marca como «vista» al cerrar el modal. Es la del
  // changelog, no APP_VERSION: los parches sin novedades no deben resetear
  // el aviso ni hacer que reaparezca sin nada nuevo que contar.
  var CHANGELOG_LATEST = CHANGELOG.length ? CHANGELOG[0].version : APP_VERSION;

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

    // El dataset marca estos como "body weight" pero requieren barra de
    // dominadas, anillas o paralelas: no son ejercicios "sin material".
    var NEEDS_BAR_RE = /\b(pull[- ]?up|pullup|chin[- ]?up|elevator|chest dip|l[- ]?pull[- ]?up|muscle[- ]?up|ring[- ]?dips?|swing 360|back lever|front lever|korean dips?|hanging pike|inverted row)\b/;

    function tagsFor(rec) {
      if (!rec) return null;
      if (rec._t) return rec._t;

      var name = String(rec.n || '').toLowerCase();
      var eq = rec.eq || '';
      var tg = rec.tg || '';
      var bp = rec.bp || '';
      var t = {};

      // --- place ---
      if (eq === 'body weight' && NEEDS_BAR_RE.test(name)) { t.gimnasio = 1; }
      else if (eq === 'body weight') { t.sin_material = 1; t.casa = 1; }
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

    function needsBar(rec) {
      return rec && rec.eq === 'body weight' && NEEDS_BAR_RE.test(String(rec.n || '').toLowerCase());
    }

    return { tagsFor: tagsFor, has: has, fitsLevel: fitsLevel, levelOrder: LEVEL_ORDER, needsBar: needsBar };
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

  // =============================================
  // RUNNING_PLAN: vuelta a correr en 12 semanas
  // =============================================
  // Plan de readaptación de 3 sesiones por semana. A diferencia de la rutina
  // de fuerza, que repite los mismos ejercicios durante las 4 semanas de cada
  // fase, aquí la sesión cambia *cada semana*, así que el plan se indexa por
  // número de semana y por sesión dentro de la semana.
  //
  // kind:
  //   'intervals'  → bloques de trote y caminata (blocks)
  //   'continuous' → minutos de carrera continua (min)
  //   'distance'   → kilómetros a ritmo cómodo (km)
  //   'goal'       → el día del objetivo
  var RUNNING_PHASES = [
    { name: 'Fase 1 · Readaptación al impacto', weeks: [1, 2, 3, 4],
      note: 'Entrena en días alternos. El resto, descanso total o fuerza.' },
    { name: 'Fase 2 · Construcción de la base', weeks: [5, 6, 7, 8],
      note: 'Se eliminan las caminatas de forma gradual. Ante cualquier molestia, vuelve a la fase anterior.' },
    { name: 'Fase 3 · Camino a los 10 km', weeks: [9, 10, 11, 12],
      note: 'Dos rodajes cortos entre semana y uno largo para ganar volumen.' }
  ];

  // Reglas de seguridad del plan. Se muestran en cada sesión: son la parte
  // que evita la recaída, no un adorno.
  var RUNNING_RULES = [
    { icon: '💪', title: 'Fuerza obligatoria',
      text: 'Dedica 2 días a la semana a glúteos, cuádriceps y pantorrillas. Los músculos fuertes absorben el impacto que tus articulaciones no pueden.' },
    { icon: '🚦', title: 'Escucha el dolor',
      text: 'Si notas molestias en la zona de la antigua lesión por encima de 3 sobre 10, detén la sesión inmediatamente.' },
    { icon: '🗣️', title: 'Control del ritmo',
      text: 'Corre a un ritmo que te permita mantener una conversación completa. La velocidad destruye los tejidos que aún se están adaptando.' }
  ];

  // Atajos para no repetir la estructura de calentamiento y vuelta a la calma.
  function runIntervals(reps, jog, walk) {
    return {
      kind: 'intervals', label: 'Trote y caminata',
      blocks: [
        { type: 'walk', min: 5, reps: 1 },
        { type: 'set', reps: reps, jog: jog, walk: walk },
        { type: 'walk', min: 5, reps: 1 }
      ],
      totalMin: 5 + reps * (jog + walk) + 5
    };
  }
  function runContinuous(min, label) {
    return { kind: 'continuous', label: label || 'Carrera continua', min: min, totalMin: min };
  }
  function runDistance(km, label) {
    // ~6:30 min/km a ritmo cómodo, sólo para estimar la duración en pantalla.
    return { kind: 'distance', label: label || 'Rodaje largo', km: km, totalMin: Math.round(km * 6.5) };
  }

  // Semana 1..12 -> sesiones de esa semana, en orden.
  var RUNNING_PLAN = {
    1:  [runIntervals(5, 2, 3), runIntervals(5, 2, 3), runIntervals(5, 2, 3)],
    2:  [runIntervals(5, 3, 2), runIntervals(5, 3, 2), runIntervals(5, 3, 2)],
    3:  [runIntervals(4, 5, 2), runIntervals(4, 5, 2), runIntervals(4, 5, 2)],
    4:  [runIntervals(3, 8, 2), runIntervals(3, 8, 2), runIntervals(3, 8, 2)],
    5:  [runContinuous(20), runContinuous(20), runContinuous(30, 'Rodaje largo')],
    6:  [runContinuous(25), runContinuous(25), runContinuous(35, 'Rodaje largo')],
    7:  [runContinuous(30), runContinuous(30), runContinuous(40, 'Rodaje largo · 5-6 km aprox.')],
    8:  [runContinuous(25, 'Descarga suave'), runContinuous(25, 'Descarga suave'), runContinuous(25, 'Descarga suave')],
    9:  [runContinuous(35, 'Rodaje corto'), runContinuous(35, 'Rodaje corto'), runDistance(7)],
    10: [runContinuous(40, 'Rodaje corto'), runContinuous(40, 'Rodaje corto'), runDistance(8)],
    11: [runContinuous(30, 'Rodaje corto'), runContinuous(30, 'Rodaje corto'), runDistance(9)],
    12: [runContinuous(30, 'Rodaje de mitad de semana'),
         { kind: 'goal', label: '🏁 Día del Objetivo', km: 10, totalMin: 65 }]
  };

  var RUNNING_TOTAL_WEEKS = 12;

  // RUNNING_RECOVERY es un catálogo consultable: sus fichas no traen series ni
  // repeticiones. Esto las envuelve como ejercicios de rutina para poder
  // meterlas en el bloque de mejora al final de los días de fuerza.
  function runningExtraExercise(recoveryId, opts) {
    opts = opts || {};
    var rec = null;
    for (var i = 0; i < RUNNING_RECOVERY.length; i++) {
      if (RUNNING_RECOVERY[i].id === recoveryId) { rec = RUNNING_RECOVERY[i]; break; }
    }
    if (!rec) return null;
    var id = 'rr_' + recoveryId;
    if (rec.db) EXERCISE_DB_MAP[id] = rec.db;
    if (!EXERCISE_META[id]) {
      EXERCISE_META[id] = { description: rec.description || '', videoUrl: '', alternatives: [] };
    }
    var timed = !!opts.isTimed;
    var reps = opts.reps || (timed ? '30 seg' : '12');
    return {
      id: id,
      name: rec.name,
      muscle: (rec.muscles && rec.muscles.length) ? rec.muscles.join(' / ') : 'Core',
      series: opts.series || 2,
      reps: reps,
      repsMin: parseInt(reps, 10) || 12,
      repsMax: parseInt(reps, 10) || 12,
      rest: opts.rest || '45 seg',
      isTimed: timed,
      focus: rec.description || 'Movimiento controlado en todo el recorrido.',
      weightHint: 'Peso corporal',
      group: 'running'
    };
  }

  function runningPhaseForWeek(week) {
    for (var i = 0; i < RUNNING_PHASES.length; i++) {
      if (RUNNING_PHASES[i].weeks.indexOf(week) !== -1) return RUNNING_PHASES[i];
    }
    return null;
  }

  // Descripción corta de una sesión, para las tarjetas y el calendario.
  function runningSessionSummary(s) {
    if (!s) return '';
    if (s.kind === 'intervals') {
      var set = null;
      s.blocks.forEach(function (b) { if (b.type === 'set') set = b; });
      return set ? (set.reps + '× (' + set.jog + ' min trote + ' + set.walk + ' min andando)') : '';
    }
    if (s.kind === 'continuous') return s.min + ' min de carrera continua';
    if (s.kind === 'distance') return s.km + ' km a ritmo cómodo';
    if (s.kind === 'goal') return s.km + ' km a ritmo cómodo';
    return '';
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

  // Los sustitutos elegidos en el buscador de alternativas vienen del catálogo
  // y no están en EXERCISE_DB_MAP / EXERCISE_META, que viven sólo en memoria.
  // Sin este registro su ficha saldría sin animación ni pasos.
  function registerCatalogExercise(exercise) {
    if (!exercise || !exercise.id) return;
    if (exercise.dbId) EXERCISE_DB_MAP[exercise.id] = exercise.dbId;
    if (!EXERCISE_META[exercise.id]) {
      var rec = (exercise.dbId && EXERCISE_DB.isLoaded()) ? EXERCISE_DB.get(exercise.dbId) : null;
      EXERCISE_META[exercise.id] = {
        description: rec && rec.es && rec.es.length ? rec.es.join(' ') : '',
        videoUrl: '',
        alternatives: []
      };
    }
  }

  // Se llama al arrancar y otra vez cuando termina de cargar el catálogo:
  // en la primera pasada puede que aún no hubiera dataset del que sacar pasos.
  function reregisterSwappedExercises() {
    var perm = state.permanentSwaps || {};
    Object.keys(perm).forEach(function (k) {
      if (perm[k] && perm[k].exercise) registerCatalogExercise(perm[k].exercise);
    });
    var byDate = state.swaps || {};
    Object.keys(byDate).forEach(function (d) {
      Object.keys(byDate[d] || {}).forEach(function (k) {
        registerCatalogExercise(byDate[d][k]);
      });
    });
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
  // RUNFUERZA_PHASES: programa combinado fuerza + carrera
  // =============================================
  // 5 días por semana en orden L, M, J, V, S. getRoutineSlotForDate() indexa
  // esta lista con la posición del día dentro de getTrainingDays(), así que el
  // calendario programa carrera y fuerza sin distinguirlas.
  //
  // Los ejercicios de fuerza se copian de SERGIO_PHASES por id, para conservar
  // animaciones, descripciones y el historial de pesos. Van en superseries
  // (campo `ss`) para meter cuerpo completo en unos 30 minutos: sólo el último
  // ejercicio de cada pareja lleva descanso, los demás encadenan.
  var RUNFUERZA_PHASES = (function () {

    function findIn(phaseIdx, id) {
      var days = SERGIO_PHASES[phaseIdx].days;
      for (var d = 0; d < days.length; d++) {
        for (var e = 0; e < days[d].exercises.length; e++) {
          if (days[d].exercises[e].id === id) return days[d].exercises[e];
        }
      }
      return null;
    }

    // Busca un ejercicio por id y lo clona con los campos de superserie.
    // Clonar evita que ajustar el descanso aquí modifique la rutina de Sergio,
    // que comparte los mismos objetos.
    //
    // No todos los ejercicios existen en las tres fases (el peso muerto rumano
    // y el crunch, por ejemplo, sólo están en el mes 2), así que si falta en la
    // fase pedida se coge de donde esté y se le normalizan las series a las de
    // esa fase — si no, una superserie mezclaría 3 y 4 vueltas.
    function ex(phaseIdx, id, ss, isLast) {
      var src = findIn(phaseIdx, id);
      var borrowed = false;
      if (!src) {
        for (var p = 0; p < SERGIO_PHASES.length && !src; p++) src = findIn(p, id);
        borrowed = true;
      }
      if (!src) return null;

      var copy = {};
      for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) copy[k] = src[k];
      if (borrowed) {
        var ref = findIn(phaseIdx, 'press_plano');
        if (ref) copy.series = ref.series;
      }
      copy.ss = ss;
      // Sólo se descansa al cerrar la superserie
      copy.rest = isLast ? '60 seg' : '0';
      return copy;
    }

    function strengthDay(phaseIdx, def) {
      var list = [];
      def.pairs.forEach(function (pair, pi) {
        var tag = String.fromCharCode(65 + pi);   // 'A', 'B', 'C'
        var built = [];
        pair.forEach(function (id, ei) {
          var b = ex(phaseIdx, id, tag, ei === pair.length - 1);
          if (b) built.push(b);
        });
        // Los dos ejercicios de una superserie se hacen el mismo número de
        // vueltas: si vinieran con series distintas, la cabecera del grupo
        // mentiría sobre uno de los dos.
        if (built.length) {
          var rounds = built[0].series;
          built.forEach(function (b) { b.series = rounds; });
        }
        built.forEach(function (b) { list.push(b); });
      });
      def.extras.forEach(function (spec) {
        var built = runningExtraExercise(spec.id, spec);
        if (built) list.push(built);
      });
      return { id: def.id, day: def.day, emoji: def.emoji, title: def.title, exercises: list };
    }

    // `exercises: []` no es decorativo: hay bastante código que recorre
    // day.exercises sin preguntar (las stats, findExercise, el resumen del
    // día...). Dejarlo sin definir hacía que la pestaña Stats reventase.
    function runDay(idx, day, title, emoji) {
      return { id: 'run' + idx, day: day, emoji: emoji || '🏃', title: title, type: 'running', runIdx: idx, exercises: [] };
    }

    // Fuerza A (lunes) — cuerpo completo con énfasis en empuje
    var A = [
      { pairs: [['sentadilla_goblet', 'press_plano'], ['press_militar_sentado', 'remo_maquina'], ['elevaciones_laterales', 'extension_triceps']],
        extras: [{ id: 'glute_bridge', reps: '15' }, { id: 'double_calf_raise', reps: '20' }] },
      { pairs: [['sentadilla_goblet', 'press_plano'], ['press_militar_pie', 'remo_maquina'], ['elevaciones_laterales', 'fondos_triceps']],
        extras: [{ id: 'single_leg_glute_bridge', reps: '12' }, { id: 'double_calf_raise', reps: '20' }] },
      { pairs: [['sentadilla_goblet', 'press_inclinado'], ['press_militar_pie', 'remo_maquina'], ['elevaciones_laterales', 'combo_triceps']],
        extras: [{ id: 'single_leg_squat', reps: '8' }, { id: 'single_calf_raise', reps: '15' }] }
    ];

    // Fuerza B (viernes) — cuerpo completo con énfasis en tirón
    var B = [
      { pairs: [['peso_muerto_rumano', 'remo_una_mano'], ['zancadas_estaticas', 'pajaro'], ['curl_biceps', 'crunch']],
        extras: [{ id: 'single_calf_raise', reps: '15' }, { id: 'side_plank', reps: '30 seg', isTimed: true }, { id: 'dead_bug', reps: '12' }] },
      { pairs: [['peso_muerto_rumano', 'remo_una_mano'], ['zancadas_estaticas', 'remo_menton'], ['curl_martillo', 'crunch']],
        extras: [{ id: 'single_calf_raise', reps: '15' }, { id: 'side_plank_leg_raise', reps: '30 seg', isTimed: true }, { id: 'dead_bug_isometric', reps: '30 seg', isTimed: true }] },
      { pairs: [['peso_muerto_rumano', 'remo_una_mano'], ['zancadas_caminando', 'combo_hombro'], ['curl_concentrado', 'crunch']],
        extras: [{ id: 'single_calf_raise', reps: '20' }, { id: 'copenhagen_plank', reps: '20 seg', isTimed: true }, { id: 'hip_hike', reps: '15' }] }
    ];

    return SERGIO_PHASES.map(function (srcPhase, pi) {
      A[pi].id = 'fuerzaA'; A[pi].day = 'Fuerza A'; A[pi].emoji = '💪'; A[pi].title = 'Cuerpo completo · énfasis empuje';
      B[pi].id = 'fuerzaB'; B[pi].day = 'Fuerza B'; B[pi].emoji = '🏋️'; B[pi].title = 'Cuerpo completo · énfasis tirón';
      return {
        id: srcPhase.id,
        name: srcPhase.name,
        subtitle: srcPhase.subtitle,
        days: [
          strengthDay(pi, A[pi]),                                   // Lunes
          runDay(0, 'Carrera', 'Sesión de carrera'),                // Martes
          runDay(1, 'Carrera', 'Sesión de carrera'),                // Jueves
          strengthDay(pi, B[pi]),                                   // Viernes
          runDay(2, 'Carrera larga', 'Rodaje largo de la semana')   // Sábado
        ]
      };
    });
  })();

  // =============================================
  // PROFILES
  // =============================================
  // El perfil del tutorial se registra durante el arranque, antes que el resto
  // del bloque del tutorial, así que sus constantes viven aquí: declaradas más
  // abajo llegarían sin valor a installCustomPlan().
  var CUSTOM_PROFILE_ID = 'mia';
  var CUSTOM_PLAN_KEY = 'gym_custom_plan';   // legado: sólo se lee al migrar
  var PLANS_KEY = 'gym_plans';
  var ACTIVE_PLAN_KEY = 'gym_active_plan';
  var LEGACY_ACTIVE_KEY = 'gym_active_profile';

  // Calentamiento de los planes generados por el asistente, que no traen uno
  // propio (los fijos sí: WARMUP, WARMUP_EVA, WARMUP_GELY).
  var GENERATED_WARMUP = {
    general: '🔥 5 min de movilidad articular (cuello, hombros, muñecas, cadera, tobillos)',
    approach: '➕ 1-2 series de aproximación con peso ligero en el primer ejercicio'
  };

  // Plantillas fijas. Viven en el código, así que un plan de estos que se
  // borre siempre se puede volver a crear desde el botón "+": lo único que no
  // vuelve es el progreso registrado.
  var BUILTIN_PROFILES = {
    sergio: { name: 'Sergio', initial: 'S', phases: RUNFUERZA_PHASES, warmup: WARMUP, defaultDays: [1, 2, 4, 5, 6], daysLabel: '5 días · fuerza + carrera' },
    eva:    { name: 'Eva',    initial: 'E', phases: EVA_PHASES,    warmup: WARMUP_EVA, defaultDays: [1, 4], daysLabel: '2 días por semana' },
    gely:   { name: 'Gely',   initial: 'G', phases: GELY_PHASES,   warmup: WARMUP_GELY, defaultDays: [1, 3, 5], daysLabel: '3 días tono + remo' }
  };

  // Respuestas equivalentes a cada plantilla, para poder CONVERTIRLA en una
  // rutina a medida sin empezar el cuestionario en blanco.
  //
  // Una plantilla está escrita a mano y no tiene respuestas: por eso el coach
  // no podía tocarla y el asistente, al abrirla, se iba a crear un plan nuevo
  // y te dejaba el historial atrás. Con esto el cuestionario sale relleno con
  // algo parecido a lo que ya entrenas, y lo que se genera se guarda BAJO EL
  // MISMO ID, así que pesos, sesiones y racha siguen siendo tuyos.
  //
  // Son aproximaciones, no equivalencias: el generador elige de CORE_EXERCISES
  // y no va a reproducir la plantilla ejercicio a ejercicio. Por eso convertir
  // se avisa antes y se puede deshacer (restaurarPlantilla()).
  var BUILTIN_SEEDS = {
    sergio: { goal: ['hipertrofia'], place: ['gimnasio'], days: '5', split: 'auto',
              minutes: '60', level: 'intermedio', avoid: [], running: 'si', runningPlan: 'si',
              runningDays: '3', focus: '' },
    eva:    { goal: ['tono'], place: ['gimnasio'], days: '2', split: 'auto',
              minutes: '45', level: 'principiante', avoid: [], running: '', runningPlan: '', focus: '' },
    gely:   { goal: ['tono'], place: ['gimnasio'], days: '3', split: 'auto',
              minutes: '45', level: 'principiante', avoid: [], running: '', runningPlan: '', focus: '' }
  };

  // =============================================
  // REGISTRO DE PLANES
  // =============================================
  // Antes había tres perfiles escritos a mano y UN único plan generado, así
  // que crear un plan pisaba el anterior. Ahora hay un registro con N planes
  // y PROFILES se deriva de él en cada arranque, en vez de estar fijo.
  //
  // «Perfil» significaba dos cosas a la vez: una persona (Sergio, Eva, Gely) y
  // un plan («Mi plan»). Aquí pasan a ser sólo planes; la persona es el
  // dispositivo, y más adelante será la cuenta.
  //
  //   gym_plans                  { version, plans: { <id>: entrada } }
  //   gym_active_plan            id del plan seleccionado
  //   gym_calendar_data_<id>     estado (formato de siempre, sin tocar)
  var planRegistry = null;

  // Los planes nuevos nacen con UUID, nunca con ids correlativos ('plan2').
  // Si mañana dos dispositivos suben a la misma cuenta, dos planes distintos
  // llamados 'plan2' serían la misma fila. Los fijos conservan su id legible
  // porque ya es la clave de su gym_calendar_data_<id>.
  function newPlanId() {
    try {
      if (window.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    } catch (e) {}
    return 'plan-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function loadPlanRegistry() {
    try {
      var raw = localStorage.getItem(PLANS_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      return (data && data.plans) ? data : null;
    } catch (e) { return null; }
  }

  function savePlanRegistry() {
    try { localStorage.setItem(PLANS_KEY, JSON.stringify(planRegistry)); } catch (e) {}
    marcarCambioLocal();
  }

  // Construye el registro la primera vez. NO intenta adivinar de quién es cada
  // plan: registra todos los que encuentre y ya los borrará el usuario desde
  // el modal. Es justo lo que se ve hoy en pantalla, así que al actualizar no
  // cambia nada de golpe.
  //
  // Tampoco borra las claves antiguas: si hubiera que revertir el despliegue,
  // la versión anterior las sigue encontrando intactas.
  function migratePlansRegistry() {
    var existing = loadPlanRegistry();
    if (existing) return existing;

    var now = new Date().toISOString();
    var reg = { version: 1, plans: {} };

    Object.keys(BUILTIN_PROFILES).forEach(function (id) {
      reg.plans[id] = {
        id: id,
        name: BUILTIN_PROFILES[id].name,
        initial: BUILTIN_PROFILES[id].initial,
        builtin: true,
        createdAt: now,
        updatedAt: now
      };
    });

    var legacy = null;
    try {
      var raw = localStorage.getItem(CUSTOM_PLAN_KEY);
      legacy = raw ? JSON.parse(raw) : null;
    } catch (e) {}
    if (legacy && legacy.phases) {
      // Conserva el id 'mia' a propósito: es la clave de gym_calendar_data_mia
      // y cambiarla dejaría su historial huérfano.
      reg.plans[CUSTOM_PROFILE_ID] = {
        id: CUSTOM_PROFILE_ID,
        name: 'Mi plan',
        initial: 'M',
        builtin: false,
        createdAt: legacy.createdAt || now,
        updatedAt: now,
        plan: legacy
      };
    }

    planRegistry = reg;
    savePlanRegistry();
    return reg;
  }

  // Una entrada del registro -> la forma que espera el resto de la app.
  function planEntryToProfile(entry) {
    if (!entry) return null;
    if (entry.builtin) {
      var t = BUILTIN_PROFILES[entry.id];
      if (!t) return null;   // plantilla retirada del código
      return {
        name: entry.name || t.name,
        initial: entry.initial || t.initial,
        phases: t.phases,
        warmup: t.warmup,
        defaultDays: t.defaultDays.slice(),
        daysLabel: t.daysLabel,
        builtin: true
      };
    }
    if (!entry.plan || !entry.plan.phases) return null;
    return {
      name: entry.name || 'Mi plan',
      initial: entry.initial || 'M',
      phases: entry.plan.phases,
      warmup: GENERATED_WARMUP,
      defaultDays: (entry.plan.trainingDays || [1, 3, 5]).slice(),
      daysLabel: entry.plan.daysLabel,
      generated: true
    };
  }

  // PROFILES lo consultan ~30 sitios como PROFILES[id]; se mantiene el nombre
  // y se rellena en sitio para no invalidar ninguna referencia.
  var PROFILES = {};

  function rebuildProfiles() {
    Object.keys(PROFILES).forEach(function (k) { delete PROFILES[k]; });
    Object.keys(planRegistry.plans).forEach(function (id) {
      var p = planEntryToProfile(planRegistry.plans[id]);
      if (p) PROFILES[id] = p;
    });
  }

  function getPlanEntry(id) { return planRegistry.plans[id] || null; }

  function listPlanEntries() {
    return Object.keys(planRegistry.plans).map(function (id) { return planRegistry.plans[id]; });
  }

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

  // Aquí vivía dropLegacyCustomPlan(), que borraba el «Mi plan» del tutorial
  // porque convivía con el de Sergio y «sobraba uno». Con el registro de
  // planes eso ya no es un problema: tener varios es justo lo que se busca.
  //
  // Se retira además porque se ejecutaba ANTES que migratePlansRegistry() y
  // habría borrado el plan antiguo justo antes de que el registro lo recogiera.
  // La bandera gym_custom_plan_removed se deja donde está por si hubiera que
  // revertir el despliegue.

  // Si había sesión previa hay que averiguarlo ANTES de tocar nada: la propia
  // migración escribe gym_plans y gym_active_plan, así que consultarlo después
  // haría creer que todo el mundo es un usuario existente y el onboarding no
  // saltaría jamás.
  var hadPriorSession = false;
  try {
    hadPriorSession = !!(localStorage.getItem(PLANS_KEY)
      || localStorage.getItem(ACTIVE_PLAN_KEY)
      || localStorage.getItem(LEGACY_ACTIVE_KEY)
      || localStorage.getItem(CUSTOM_PLAN_KEY));
  } catch (e) {}

  // El registro se construye antes de resolver el plan activo: si no, los
  // planes generados todavía no existirían al elegir cuál está seleccionado.
  planRegistry = migratePlansRegistry();
  rebuildProfiles();

  // activeProfile conserva el nombre porque lo leen muchos sitios, pero desde
  // el registro de planes lo que guarda es un id de plan, no una persona.
  var activeProfile = null;
  try {
    activeProfile = localStorage.getItem(ACTIVE_PLAN_KEY)
      || localStorage.getItem(LEGACY_ACTIVE_KEY);
  } catch (e) {}
  if (!activeProfile || !PROFILES[activeProfile]) {
    // Si el plan activo ya no existe (borrado), se cae al primero que haya.
    activeProfile = PROFILES.sergio ? 'sergio' : Object.keys(PROFILES)[0];
  }
  // Se fija ya la clave nueva para quien MIGRA, que si no se quedaría
  // dependiendo indefinidamente de la clave antigua.
  //
  // Sólo si ya había sesión: escribirla siempre marcaba como usuario
  // existente a cualquiera que abriese la app una vez, de modo que quien
  // abandonaba el onboarding a medias volvía a entrar y se encontraba metido
  // en un plan por defecto que nunca eligió, sin ver el asistente otra vez.
  if (hadPriorSession) {
    try { localStorage.setItem(ACTIVE_PLAN_KEY, activeProfile); } catch (e) {}
  }

  // These are updated by switchProfile()
  var PHASES = PROFILES[activeProfile].phases;
  var ACTIVE_WARMUP = PROFILES[activeProfile].warmup;

  // =============================================
  // STATE
  // =============================================
  function getStorageKey() { return 'gym_calendar_data_' + activeProfile; }

  function getDefaultState() {
    return { progress: {}, completions: {}, swaps: {}, permanentSwaps: {}, customDays: {}, finished: {}, runningDone: {}, settings: { trainingDays: PROFILES[activeProfile].defaultDays.slice() } };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(getStorageKey());
      if (raw) {
        var data = JSON.parse(raw);
        var st = { progress: data.progress || {}, completions: data.completions || {}, swaps: data.swaps || {}, permanentSwaps: data.permanentSwaps || {}, customDays: data.customDays || {}, finished: data.finished || {}, runningDone: data.runningDone || {} };
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
    marcarCambioLocal();
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
    // Terminar el entreno es EL momento en que hay algo que no se puede
    // perder, así que no se espera al agrupador: sube ya.
    subirCopiaYa();
    soltarWakeLock();
    renderCurrentDay();
    // Para que no llegue el segundo recordatorio del día habiendo entrenado ya.
    reportarEntrenoHecho();
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
    // Los planes con fecha de inicio explícita mandan: si se dedujera del
    // registro más antiguo, importar el historial de pesos de otro perfil
    // arrancaría el plan en una semana avanzada.
    if (state.settings && state.settings.planStart) return state.settings.planStart;
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

  // =============================================
  // PLAN DE CARRERA — PROGRAMACIÓN
  // =============================================
  // Los días de carrera no son un ajuste aparte: son entradas del propio plan
  // (phase.days) con type 'running'. Como getRoutineSlotForDate() indexa
  // phase.days con la posición del día dentro de getTrainingDays(), el motor
  // de calendario los programa sin saber que son distintos.
  function getDayDef(dateKey) {
    var slot = getRoutineSlotForDate(dateKey);
    if (slot === -1 || slot === null || slot === undefined) return null;
    return getPhase(dateKey).days[slot] || null;
  }

  function isRunningDay(dateKey) {
    var day = getDayDef(dateKey);
    return !!(day && day.type === 'running');
  }

  // ¿El plan activo incluye días de carrera? Decide si se pinta la leyenda de
  // carrera en el calendario y el recordatorio de semana en los ajustes.
  function profileHasRunning() {
    var days = PHASES[0] ? PHASES[0].days : [];
    for (var i = 0; i < days.length; i++) if (days[i].type === 'running') return true;
    return false;
  }

  // La semana del plan de carrera es la misma que la de fuerza: los dos van
  // sincronizados, así la semana 3 de gimnasio es la semana 3 de carrera.
  function getRunningWeek(dateKey) {
    return getWeekNumber(dateKey);
  }

  // Sesión que toca ese día, o null si no hay (fuera de las 12 semanas, o la
  // semana 12, que sólo tiene 2 sesiones para 3 días de carrera).
  function getRunningSession(dateKey) {
    var day = getDayDef(dateKey);
    if (!day || day.type !== 'running') return null;
    var week = getRunningWeek(dateKey);
    if (week < 1 || week > RUNNING_TOTAL_WEEKS) return null;
    var sessions = RUNNING_PLAN[week];
    if (!sessions) return null;
    var idx = day.runIdx;
    if (idx === undefined || idx < 0) return null;
    // La semana 12 sólo tiene 2 sesiones (la última es el día del objetivo),
    // así que un runIdx 2 se saldría de rango y el día aparecería vacío. Se
    // usa la última que haya: quien corre una sola vez por semana lleva
    // justamente el rodaje largo, y ahí eso es el día del objetivo.
    if (idx >= sessions.length) idx = sessions.length - 1;
    return { session: sessions[idx], week: week, index: idx, total: sessions.length };
  }

  // Las sesiones de carrera se registran aparte de state.completions, que está
  // indexado por id de ejercicio y alimenta el progreso de pesos y las stats
  // de fuerza. Mezclarlas ahí ensuciaría los dos.
  function isRunningDone(dateKey) {
    return !!(state.runningDone && state.runningDone[dateKey]);
  }

  function getRunningDone(dateKey) {
    return (state.runningDone && state.runningDone[dateKey]) || null;
  }

  function toggleRunningDone(dateKey) {
    if (!state.runningDone) state.runningDone = {};
    if (state.runningDone[dateKey]) {
      delete state.runningDone[dateKey];
    } else {
      var info = getRunningSession(dateKey);
      state.runningDone[dateKey] = {
        at: new Date().toISOString(),
        week: info ? info.week : null,
        summary: info ? runningSessionSummary(info.session) : ''
      };
      playCompleteSound();
      vibrate();
    }
    saveState();
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

  // Los ejercicios cambiados (swap puntual o permanente) se completan con el
  // id del sustituto, que no existe en PHASES. Para saber a qué día pertenecen
  // hay que revertir ese id al del ejercicio original que reemplazan.
  function resolveToOriginalId(exerciseId, dateKey) {
    if (findExercise(exerciseId)) return exerciseId;
    var perm = state.permanentSwaps || {};
    for (var k in perm) {
      if (perm[k] && perm[k].exercise && perm[k].exercise.id === exerciseId) return k;
    }
    var todaySwaps = (dateKey && state.swaps) ? state.swaps[dateKey] : null;
    if (todaySwaps) {
      for (var k2 in todaySwaps) {
        if (todaySwaps[k2] && todaySwaps[k2].id === exerciseId) return k2;
      }
    }
    return exerciseId;
  }

  function getRoutineForDate(dateKey) {
    var dayCompletions = state.completions[dateKey];
    if (!dayCompletions) return null;
    var numDays = PHASES[0].days.length;
    var counts = [];
    for (var ci = 0; ci < numDays; ci++) counts.push(0);
    for (var exId in dayCompletions) {
      var idx = findExerciseDay(resolveToOriginalId(exId, dateKey));
      if (idx >= 0 && idx < numDays) counts[idx]++;
    }
    var maxIdx = 0;
    for (var i = 1; i < numDays; i++) { if (counts[i] > counts[maxIdx]) maxIdx = i; }
    return counts[maxIdx] > 0 ? maxIdx : null;
  }

  // Sesión programada para una fecha, o null si ese día toca descanso.
  // renderDayDetail hace este mismo cálculo; se extrae para poder reutilizarlo
  // desde los listeners del detalle de día.
  function getDayForDateKey(dateKey) {
    if (!isTrainingDay(dateKey)) return null;
    var idx = getRoutineSlotForDate(dateKey);
    if (idx === -1 || idx === null || idx === undefined) return null;
    return getPhase(dateKey).days[idx] || null;
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
  // Al completar un ejercicio abierto se pliega y se abre el siguiente que
  // quede pendiente, para no tener que ir cerrando y abriendo fichas a mano
  // en mitad de la serie. `originalId` es la clave de expandedCards, que no
  // coincide con exerciseId cuando el ejercicio está sustituido.
  function advanceToNextPending(originalId) {
    if (!expandedCards[originalId]) return null;   // no estaba abierto: no se toca nada
    expandedCards[originalId] = false;

    var routineIdx = getTodayRoutine();
    if (routineIdx === -1) return null;
    var day = getPhase(getTodayKey()).days[routineIdx];
    if (!day || !day.exercises) return null;

    var items = getEffectiveExercises(day);
    var completions = getTodayCompletions();
    var from = -1;
    items.forEach(function (it, i) { if (it.originalId === originalId) from = i; });

    // Primero hacia abajo, y si no queda nada, se vuelve a los que saltaste
    var order = [];
    for (var i = from + 1; i < items.length; i++) order.push(items[i]);
    for (var j = 0; j < from; j++) order.push(items[j]);

    for (var k = 0; k < order.length; k++) {
      if (!completions[order[k].ex.id]) {
        expandedCards[order[k].originalId] = true;
        return order[k].originalId;
      }
    }
    return null;
  }

  function toggleCompletion(exerciseId, originalId) {
    var key = getTodayKey();
    var nextId = null;
    if (!state.completions[key]) state.completions[key] = {};
    if (state.completions[key][exerciseId]) {
      delete state.completions[key][exerciseId];
    } else {
      state.completions[key][exerciseId] = true;
      playCompleteSound();
      vibrate();
      pedirWakeLock();
      if (originalId) nextId = advanceToNextPending(originalId);
      // Check if all exercises done (Eva motivational message)
      if (activeProfile === 'eva') checkEvaWorkoutComplete();
    }
    saveState();
    renderCurrentDay();
    updateAll();

    // Tras repintar, dejar a la vista la ficha que se acaba de abrir
    if (nextId) {
      var card = document.getElementById('card-' + nextId);
      if (card && card.scrollIntoView) {
        try { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch (e) { card.scrollIntoView(); }
      }
    }
  }

  // Igual que toggleCompletion pero para el detalle de día de la pestaña
  // Inicio, donde dateKey puede ser un día pasado: antes sólo se podía
  // marcar el entrenamiento de hoy (toggleCompletion escribía siempre en
  // getTodayKey()) y no había manera de registrar uno que ya se había hecho.
  function toggleHomeCompletion(exerciseId, dateKey) {
    dateKey = dateKey || getTodayKey();
    if (!state.completions[dateKey]) state.completions[dateKey] = {};
    if (state.completions[dateKey][exerciseId]) {
      delete state.completions[dateKey][exerciseId];
    } else {
      state.completions[dateKey][exerciseId] = true;
      if (dateKey === getTodayKey()) {
        playCompleteSound();
        vibrate();
        if (activeProfile === 'eva') checkEvaWorkoutComplete();
      }
    }
    saveState();
    updateAll();
    if (dateKey === getTodayKey()) renderCurrentDay();
    refreshHomeDayDetail();
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
    // Perfil ya no tiene pestaña: sin esto, al entrar no quedaría ningún
    // control marcado y no habría forma de saber dónde estás.
    var badge = document.getElementById('profileBadge');
    if (badge) badge.classList.toggle('active', tab === 'stats');
    // Salir de Perfil apaga el modo edición de planes.
    if (tab !== 'stats') salirDeEdicionDePlanes();
    // Fuera de Rutina ya no se está entrenando: no hay por qué seguir
    // impidiendo que se apague la pantalla.
    if (tab !== 'rutina') soltarWakeLock();
    document.getElementById('homeView').style.display = tab === 'home' ? '' : 'none';
    document.getElementById('rutinaView').style.display = tab === 'rutina' ? '' : 'none';
    document.getElementById('statsView').style.display = tab === 'stats' ? '' : 'none';
    var dbView = document.getElementById('dbView');
    if (dbView) dbView.style.display = tab === 'db' ? '' : 'none';
    if (tab === 'rutina') { renderCurrentDay(); updateAll(); maybePromptBodyWeight(); maybePromptPush(); }
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

    var todayRun = getRunningSession(getTodayKey());
    if (todayRun) {
      var rs = todayRun.session;
      var rPhase = runningPhaseForWeek(todayRun.week);
      var rDone = isRunningDone(getTodayKey());
      var rHtml = '<div class="routine-status-card workout running-status" style="border-color:#f39c12;">';
      rHtml += '  <div class="routine-status-top"><div class="routine-status-emoji">'
            + (rs.kind === 'goal' ? '🏁' : '🏃') + '</div>'
            + '<div class="routine-status-text">Hoy toca: <strong>' + escapeHtml(rs.label) + '</strong></div>'
            + (rDone ? '<div class="routine-status-badge">Hecha</div>' : '') + '</div>';
      rHtml += '  <div class="routine-status-sub">' + escapeHtml(runningSessionSummary(rs)) + ' · ~' + rs.totalMin + ' min</div>';
      rHtml += '  <div class="routine-status-phase">' + (rPhase ? escapeHtml(rPhase.name) + ' · ' : '')
            + 'Semana ' + todayRun.week + ' de ' + RUNNING_TOTAL_WEEKS + '</div>';
      // Los días de carrera tienen tarjeta propia y salen antes que la de
      // fuerza, así que el gasto hay que ponerlo también aquí.
      var kcalRun = caloriasCarrera(rs, getBodyWeight());
      if (kcalRun) {
        rHtml += '  <div class="routine-status-kcal">🔥 ~' + kcalRun + ' kcal estimadas</div>';
      }
      rHtml += '</div>';
      rHtml += rachaAvisoHtml();
      container.innerHTML = rHtml;
      return;
    }

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
      // Gasto estimado de la sesión de hoy. Aquí el plan sí está guardado, así
      // que la carrera se resuelve por calendario con caloriasDeSesion().
      var kcalHoy = caloriasDeSesion(day, loadCustomPlan(), today);
      if (kcalHoy) {
        html += '  <div class="routine-status-kcal">🔥 ~' + kcalHoy + ' kcal estimadas</div>';
      }
      html += '</div>';

      var skipped = getSkippedExercisesFromLastSession();
      if (skipped) {
        var skipDate = new Date(skipped.date + 'T12:00:00');
        var skipLabel = formatDateShort(skipDate);
        html += '<div class="skipped-notice"><div class="skipped-notice-icon">📋</div><div class="skipped-notice-body"><div class="skipped-notice-title">El <strong>' + skipLabel + '</strong> (' + skipped.emoji + ' ' + skipped.routineName + ') te faltó:</div><div class="skipped-notice-list">' + skipped.missed.join(', ') + '</div><div class="skipped-notice-note">No pasa nada, hoy a darle a tu rutina 💪</div></div></div>';
      }
    }

    // Va fuera de las ramas para que salga también en día de descanso. Ahí
    // dice que la racha NO se pierde, y eso importa: es lo que evita que
    // alguien entrene en su día de descanso sólo por no romperla, que es
    // exactamente el fallo que arruina las rachas en una app de gimnasio.
    html += rachaAvisoHtml();

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

  // =============================================
  // PANTALLA ENCENDIDA MIENTRAS ENTRENAS
  // ---------------------------------------------
  // Entre serie y serie el móvil se bloquea y hay que desbloquearlo con las
  // manos ocupadas y sudadas. Se pide el bloqueo al marcar el primer ejercicio
  // o al arrancar un descanso, y se suelta al terminar el entreno o al salir
  // de la pestaña Rutina.
  //
  // El navegador revoca el bloqueo él solo al cambiar de pestaña o apagar la
  // pantalla, y no lo devuelve al volver: por eso se guarda aparte la
  // intención (`wakeLockQuerido`) y se vuelve a pedir en `visibilitychange`.
  var wakeLock = null;
  var wakeLockQuerido = false;

  function wakeLockSoportado() {
    return !!(navigator.wakeLock && navigator.wakeLock.request);
  }

  function pedirWakeLock() {
    if (!wakeLockSoportado()) return;
    wakeLockQuerido = true;
    if (wakeLock || document.visibilityState !== 'visible') return;
    navigator.wakeLock.request('screen').then(function (lock) {
      // Puede haberse soltado mientras se resolvía la promesa.
      if (!wakeLockQuerido) { try { lock.release(); } catch (e) {} return; }
      wakeLock = lock;
      lock.addEventListener('release', function () { wakeLock = null; });
    }).catch(function () {
      // Batería baja, pestaña en segundo plano o el navegador dice que no.
      // No es crítico: la app funciona igual, sólo se apaga la pantalla.
    });
  }

  function soltarWakeLock() {
    wakeLockQuerido = false;
    if (!wakeLock) return;
    var lock = wakeLock;
    wakeLock = null;
    try { lock.release(); } catch (e) {}
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && wakeLockQuerido) pedirWakeLock();
  });

  function startRestTimer(exerciseId, totalSeconds) {
    if (totalSeconds <= 0) return;
    clearActiveTimer();
    pedirWakeLock();

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
    if (chevron) chevron.classList.toggle('expanded', !!homeExpandedCards[exerciseId]);
  }

  // Precedencia: el cambio puntual de esa fecha manda sobre el permanente, y
  // el permanente sólo se aplica desde el día en que se pidió hacia adelante
  // (así el historial ya registrado sigue mostrando lo que de verdad se hizo).
  function getEffectiveExercises(day, dateKey) {
    var key = dateKey || getTodayKey();
    var todaySwaps = (state.swaps && state.swaps[key]) ? state.swaps[key] : {};
    var perm = state.permanentSwaps || {};
    return day.exercises.map(function(origEx) {
      var swapped = todaySwaps[origEx.id];
      if (swapped) return { ex: swapped, originalId: origEx.id, isSwapped: true, isPermanent: false };
      var p = perm[origEx.id];
      // Las claves son 'YYYY-MM-DD': comparar como texto es correcto y evita
      // los líos de zona horaria de convertir a Date.
      if (p && p.exercise && (!p.from || key >= p.from)) {
        return { ex: p.exercise, originalId: origEx.id, isSwapped: true, isPermanent: true };
      }
      return { ex: origEx, originalId: origEx.id, isSwapped: false, isPermanent: false };
    });
  }

  function toggleExpand(originalId) {
    expandedCards[originalId] = !expandedCards[originalId];
    var body = document.getElementById('body-' + originalId);
    var chevron = document.getElementById('chevron-' + originalId);
    if (body) body.classList.toggle('expanded', !!expandedCards[originalId]);
    if (chevron) chevron.classList.toggle('expanded', !!expandedCards[originalId]);
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
    refreshHomeDayDetail();
    showToast('Ejercicio original restaurado');
  }

  // Cambio permanente: se aplica desde hoy en adelante, así los días ya
  // registrados conservan en el historial el ejercicio que se hizo de verdad.
  function swapExercisePermanent(originalId, altExercise, reasonKey) {
    if (!state.permanentSwaps) state.permanentSwaps = {};
    registerCatalogExercise(altExercise);
    state.permanentSwaps[originalId] = {
      from: getTodayKey(),
      exercise: altExercise,
      reason: reasonKey || null
    };
    // El cambio puntual de hoy sobra: el permanente ya cubre hoy en adelante.
    if (state.swaps && state.swaps[getTodayKey()]) delete state.swaps[getTodayKey()][originalId];
    saveState();
    expandedCards[originalId] = true;
    homeExpandedCards[originalId] = true;
    renderCurrentDay();
    refreshHomeDayDetail();
    vibrate();
    showToast('📌 ' + altExercise.name + ' · cambiado en tu rutina');
  }

  function revertPermanentSwap(originalId) {
    if (state.permanentSwaps) delete state.permanentSwaps[originalId];
    saveState();
    renderCurrentDay();
    refreshHomeDayDetail();
    showToast('Ejercicio original restaurado en tu rutina');
  }

  // =============================================
  // BUSCADOR DE ALTERNATIVAS
  // =============================================

  // Motivos por los que se pide un cambio. Cada uno tira de la búsqueda en una
  // dirección distinta: no es lo mismo no tener mancuernas que no llegar al
  // ejercicio o que te moleste el hombro.
  var SWAP_REASONS = [
    { key: 'material', emoji: '🧰', label: 'No tengo el material',
      hint: 'Buscamos algo que puedas hacer con lo que tienes.' },
    { key: 'dificil', emoji: '😥', label: 'No soy capaz / muy difícil',
      hint: 'Buscamos una versión más sencilla del mismo movimiento.' },
    { key: 'dolor', emoji: '🤕', label: 'Me duele / me molesta',
      hint: 'Buscamos algo más suave que trabaje lo mismo.' },
    { key: 'variar', emoji: '🔄', label: 'Quiero variar / me aburre',
      hint: 'Buscamos otro ejercicio del mismo tipo.' },
    { key: 'otra', emoji: '💬', label: 'Otra razón',
      hint: 'Buscamos otra opción parecida.' }
  ];

  function reasonByKey(key) {
    for (var i = 0; i < SWAP_REASONS.length; i++) {
      if (SWAP_REASONS[i].key === key) return SWAP_REASONS[i];
    }
    return SWAP_REASONS[SWAP_REASONS.length - 1];
  }

  // Material considerado "guiado" o de bajo impacto para el motivo 'dolor'.
  var GENTLE_EQUIPMENT = { 'body weight': 1, 'cable': 1, 'leverage machine': 1, 'band': 1, 'resistance band': 1, 'stability ball': 1, 'roller': 1 };

  // =============================================
  // BUSCADOR DE ALTERNATIVAS
  // ---------------------------------------------
  // Las alternativas salen de CORE_EXERCISES, el mismo núcleo curado que usa el
  // generador, y NO del catálogo de 1.324. El catálogo se sigue usando como
  // último recurso, pero no como fuente principal.
  //
  // Antes era al revés, y de ahí salían las tres quejas de siempre:
  //
  //   - «Siempre el mismo orden, da igual el músculo». Si el ejercicio no
  //     estaba mapeado al catálogo, `baseRec` era null y con él se caían
  //     patrón, nivel, músculo y zona. Toda la puntuación se anulaba y la
  //     lista acababa ordenada por LONGITUD DEL NOMBRE, idéntica siempre.
  //   - «Me propone material que dije que no tengo». El filtro sólo se
  //     aplicaba si el plan venía del asistente, y encima usaba el campo `eq`
  //     del catálogo, que a veces miente.
  //   - «Me propone ejercicios avanzados en un plan de principiante». El nivel
  //     se comparaba con el del ejercicio sustituido —adivinado con regex
  //     sobre el nombre en inglés— y nunca con el nivel declarado. En los
  //     motivos «otra» y «material» ni siquiera se miraba.
  //
  // El núcleo tiene material, nivel, grupo muscular y lesiones verificados a
  // mano, así que `coreAvailable()` resuelve las tres de una vez: es la misma
  // restricción dura que impide que el generador recete «Ring dips» a un
  // principiante sin material.

  // Qué puede hacer el usuario. Con plan del asistente es lo que declaró; sin
  // él (plantillas fijas) no hay respuestas guardadas, así que se asume peso
  // corporal más el material del ejercicio que está sustituyendo: si lo tiene
  // en su rutina, ese material lo tiene. Antes, sin respuestas, no se filtraba
  // NADA, que es como acababa proponiendo barras a quien entrena en el salón.
  function contextoDeAlternativas(exercise) {
    var plan = loadCustomPlan();
    var answers = (plan && plan.answers) ? normalizeAnswers(plan.answers) : null;

    if (answers) {
      return {
        inventory: getInventory(answers),
        level: answers.level || 'principiante',
        avoid: answerList(answers, 'avoid')
      };
    }

    var inv = {};
    inv[BODYWEIGHT_EQ] = 1;
    var base = exercise && exercise.coreId ? CORE_BY_ID[exercise.coreId] : null;
    if (base) (base.mat || []).forEach(function (m) { inv[m] = 1; });
    return { inventory: inv, level: 'principiante', avoid: [] };
  }

  // Baraja en sitio. Sin esto, a igualdad de puntuación el orden es siempre el
  // mismo y «buscar otra» recorre una lista fija: la sensación es que la app
  // sugiere siempre lo mismo aunque técnicamente vaya avanzando.
  function barajar(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // Candidatos del núcleo curado. Devuelve [] si no hay nada, y entonces se
  // cae al catálogo.
  function alternativasDelNucleo(exercise, reasonKey, excluidos) {
    var base = exercise && exercise.coreId ? CORE_BY_ID[exercise.coreId] : null;
    var ctx = contextoDeAlternativas(exercise);

    // Para el motivo «me duele», además de las lesiones declaradas se evita lo
    // que carga la zona del ejercicio que molesta.
    var evitar = ctx.avoid.slice();
    if (reasonKey === 'dolor' && base && base.evitar) {
      base.evitar.forEach(function (z) { if (evitar.indexOf(z) === -1) evitar.push(z); });
    }

    var disponibles = coreAvailable(ctx.inventory, ctx.level, evitar);

    var items = [];
    disponibles.forEach(function (e) {
      if (e.id === (base && base.id)) return;
      if (excluidos['core_' + e.id]) return;

      // Mismo grupo muscular: es lo que hace que una alternativa sea una
      // alternativa y no otro ejercicio cualquiera.
      var score = 0;
      if (base) {
        if (e.grupo === base.grupo) score += 20;
        else if (e.patron === base.patron) score += 6;
        else return;   // ni el mismo músculo ni el mismo patrón: no es sustituto
        if (e.patron === base.patron) score += 5;
      } else if (exercise && exercise.muscle) {
        // Sin coreId (p. ej. una alternativa elegida antes) se compara por la
        // etiqueta de músculo que ya lleva el ejercicio.
        if ((GROUP_LABEL_G[e.grupo] || e.grupo) === exercise.muscle) score += 20;
        else return;
      }

      var rank = LEVEL_RANK[e.nivel] === undefined ? 0 : LEVEL_RANK[e.nivel];
      var rankBase = base && LEVEL_RANK[base.nivel] !== undefined ? LEVEL_RANK[base.nivel] : null;

      if (reasonKey === 'material') {
        if (!(e.mat || []).length) score += 12;          // peso corporal
        else if ((e.mat || []).length < ((base && base.mat) || []).length) score += 6;
        if (base && base.mat && base.mat.length &&
            (e.mat || []).join() === base.mat.join()) return;   // mismo material: no resuelve nada

      } else if (reasonKey === 'dificil') {
        if (base && base.facil === e.id) score += 25;    // la variante fácil declarada
        if (rankBase !== null && rank >= rankBase) return;
        score += (rankBase - rank) * 6;

      } else if (reasonKey === 'dolor') {
        if (rank === 0) score += 8;                      // principiante = más suave
        if (!(e.mat || []).length) score += 3;

      } else if (reasonKey === 'variar') {
        if (rankBase !== null && rank > rankBase) return;
        if (rankBase !== null && rank === rankBase) score += 6;

      } else {   // 'otra'
        if (rankBase !== null && rank === rankBase) score += 4;
      }

      items.push({ core: e, score: score });
    });

    // Se baraja ANTES de ordenar: así los empates salen en orden distinto cada
    // vez y deja de parecer que siempre propone lo mismo.
    barajar(items);
    items.sort(function (a, b) { return b.score - a.score; });

    return items.map(function (i) { return i.core; });
  }

  // Devuelve candidatos del catálogo para sustituir a `exercise` por el motivo
  // `reasonKey`, ya ordenados. `excludeIds` son los que ya se han descartado.
  // Nunca devuelve vacío si el catálogo tiene algo que ofrecer: si los filtros
  // estrictos no dan nada, se van relajando por pasos.
  function findAlternativeCandidates(exercise, reasonKey, excludeIds, excludeNames) {
    if (!EXERCISE_DB.isLoaded()) return [];
    excludeIds = excludeIds || [];

    var excluded = {};
    excludeIds.forEach(function (id) { excluded[id] = 1; });

    var nombresFuera = {};
    (excludeNames || []).forEach(function (n) { nombresFuera[n] = 1; });

    var baseRec = getDbRecord(exercise.id);
    if (baseRec) excluded[baseRec.id] = 1;

    var baseTags = baseRec ? (EXERCISE_TAGS.tagsFor(baseRec) || {}) : {};
    var basePattern = baseRec ? baseTags._pattern : null;
    var baseLevel = baseRec ? baseTags._level : null;
    var baseEq = baseRec ? baseRec.eq : null;
    var baseTarget = baseRec ? baseRec.tg : null;
    var basePart = baseRec ? baseRec.bp : null;

    // Material y nivel del usuario. Se usa el MISMO contexto que el buscador
    // del núcleo, así que aquí ya nunca se cae en «sin respuestas, sin
    // filtro»: antes eso era lo que dejaba pasar barras a quien entrena en el
    // salón, y ejercicios avanzados a un principiante.
    var ctx = contextoDeAlternativas(exercise);
    var inventory = ctx.inventory;
    var nivelUsuario = ctx.level;

    // Universo de partida. Sin mapeo al dataset no hay patrón ni nivel de
    // referencia: se tira de búsqueda por texto y se relajan los filtros.
    var universe = baseRec
      ? EXERCISE_DB.all()
      : EXERCISE_DB.search(exercise.muscle || exercise.name || '', { limit: 200 });

    var levelOrder = EXERCISE_TAGS.levelOrder;

    // `relax` 0 = filtros completos, 1 = sin material/nivel, 2 = sólo misma
    // zona del cuerpo, 3 = lo que dé la búsqueda por texto.
    function collect(relax) {
      var items = [];
      var names = {};
      universe.forEach(function (rec) {
        if (excluded[rec.id]) return;
        // Restricción dura, en todos los niveles de relajación: proponer algo
        // para lo que no tienes material nunca es una alternativa válida.
        if (inventory && !canPerform(rec, inventory)) return;
        var t = EXERCISE_TAGS.tagsFor(rec);
        if (!t) return;

        // Nunca por encima del nivel DECLARADO. Antes se comparaba con el
        // nivel del ejercicio sustituido —adivinado con regex sobre el nombre
        // en inglés— y en los motivos «otra» y «material» ni se miraba: por
        // ahí se colaban cosas como «Clap push up» a un principiante.
        if (relax <= 1 && levelOrder[t._level] > levelOrder[nivelUsuario]) return;

        if (relax <= 1 && basePattern && t._pattern !== basePattern) return;
        if (relax === 2 && basePart && rec.bp !== basePart) return;

        var score = 0;

        if (relax === 0) {
          if (reasonKey === "material") {
            // Con el mismo material seguiría sin poder hacerlo
            if (baseEq && rec.eq === baseEq) return;
            // Sin inventario declarado se tira a lo más seguro: peso corporal
            if (!inventory && !t.sin_material && !t.casa) return;
            if (t.sin_material) score += 8;
            else if (t.casa) score += 4;

          } else if (reasonKey === 'dificil') {
            if (baseLevel && levelOrder[t._level] > levelOrder[baseLevel]) return;
            if (baseTags._compound && t._compound) return;
            if (t._level === 'principiante') score += 10;
            if (!t._compound) score += 4;
            if (t.sin_material) score += 3;

          } else if (reasonKey === 'dolor') {
            if (t._level === 'avanzado') return;
            if (t._level === 'principiante') score += 8;
            if (t.movilidad) score += 6;
            if (GENTLE_EQUIPMENT[rec.eq || '']) score += 4;

          } else if (reasonKey === 'variar') {
            if (baseLevel && levelOrder[t._level] > levelOrder[baseLevel]) return;
            if (baseTarget && rec.tg === baseTarget) score += 8;
            if (baseLevel && t._level === baseLevel) score += 4;

          } else { // 'otra'
            if (baseTarget && rec.tg === baseTarget) score += 6;
            if (baseLevel && t._level === baseLevel) score += 3;
          }
        }

        // Puntuación común a todos los motivos.
        if (baseTarget && rec.tg === baseTarget) score += 6;
        if (basePart && rec.bp === basePart) score += 3;
        if (rec.mid) score += 2;   // con animación se entiende mejor

        items.push({ rec: rec, score: score });
      });

      items.sort(function (a, b) {
        return b.score - a.score || a.rec.n.length - b.rec.n.length || a.rec.n.localeCompare(b.rec.n);
      });

      // El dataset trae variantes ("... v. 2") que al traducir colapsan en el
      // mismo nombre visible: proponerlas sería repetirse a ojos del usuario.
      var out = [];
      items.forEach(function (i) {
        var visible = EXERCISE_DB.labelName(i.rec.n);
        if (names[visible] || nombresFuera[visible]) return;
        names[visible] = 1;
        out.push(i.rec);
      });
      return out;
    }

    for (var relax = 0; relax <= 3; relax++) {
      var found = collect(relax);
      if (found.length) return found;
    }
    return [];
  }

  // Convierte un registro del catálogo en un ejercicio de rutina, heredando el
  // esquema de series/repeticiones/descanso del que sustituye. El id es
  // estable, así que el peso registrado se asocia bien entre sesiones.
  function catalogRecToExercise(rec, baseExercise, reasonKey) {
    var t = EXERCISE_TAGS.tagsFor(rec) || {};
    return {
      id: 'alt_db_' + rec.id,
      dbId: rec.id,
      name: EXERCISE_DB.labelName(rec.n),
      muscle: EXERCISE_DB.labelTarget(rec.tg),
      series: baseExercise.series,
      reps: baseExercise.reps,
      repsMin: baseExercise.repsMin,
      repsMax: baseExercise.repsMax,
      rest: baseExercise.rest,
      isTimed: baseExercise.isTimed,
      focus: (rec.es && rec.es.length ? rec.es[0] : 'Movimiento controlado en todo el recorrido.'),
      weightHint: t.sin_material ? 'Peso corporal' : 'Ajusta el peso a tu nivel',
      reason: reasonByKey(reasonKey).label
    };
  }

  // Igual que catalogRecToExercise pero desde el núcleo curado. Conserva
  // `coreId`, así que la alternativa sigue siendo sustituible después y el
  // buscador vuelve a tener músculo, patrón y nivel de referencia.
  function coreToExercise(core, baseExercise, reasonKey) {
    var rec = EXERCISE_DB.get(core.db);
    return {
      id: 'alt_core_' + core.id,
      dbId: core.db,
      coreId: core.id,
      name: core.nombre,
      muscle: GROUP_LABEL_G[core.grupo] || core.grupo,
      series: baseExercise.series,
      reps: baseExercise.reps,
      repsMin: baseExercise.repsMin,
      repsMax: baseExercise.repsMax,
      rest: baseExercise.rest,
      isTimed: baseExercise.isTimed,
      focus: (rec && rec.es && rec.es.length ? rec.es[0] : 'Movimiento controlado en todo el recorrido.'),
      weightHint: (core.mat && core.mat.length) ? 'Ajusta el peso a tu nivel' : 'Peso corporal',
      reason: reasonByKey(reasonKey).label
    };
  }

  // Punto de entrada único. Primero el núcleo curado —material, nivel y
  // lesiones verificados— y sólo si no da nada, el catálogo completo.
  // Devuelve objetos { tipo: 'core'|'db', item }.
  // `ampliar` = el usuario ha pedido expresamente ver el catálogo completo
  // después de agotar el núcleo. No se mezclan solos a propósito: el catálogo
  // tiene el nivel adivinado por regex sobre el nombre en inglés, y colaba
  // plióticos como «Clap push up» o «Plyo push up» a un principiante. Mejor
  // decir «no hay más» que proponer algo que no debería hacer.
  function buscarAlternativas(exercise, reasonKey, excludeIds, dateKey, ampliar) {
    var excluidos = {};
    (excludeIds || []).forEach(function (id) { excluidos[id] = 1; });

    // Fuera lo que ya está en la sesión de hoy: proponer un ejercicio que el
    // usuario va a hacer de todas formas no es una alternativa, y encima le
    // duplicaría el trabajo de ese músculo.
    try {
      var day = getDayDef(dateKey || getTodayKey());
      if (day && day.exercises) {
        day.exercises.forEach(function (ex) {
          if (ex.coreId) excluidos['core_' + ex.coreId] = 1;
          if (ex.dbId) excluidos[ex.dbId] = 1;
        });
      }
    } catch (e) { /* sin día resuelto: se sigue sin esta exclusión */ }

    if (!ampliar) {
      return alternativasDelNucleo(exercise, reasonKey, excluidos)
        .map(function (c) { return { tipo: 'core', item: c }; });
    }

    // Al catálogo se le pasan los ids descartados y también los NOMBRES de los
    // del núcleo: el dataset trae variantes distintas que al traducir colapsan
    // en el mismo nombre, así que excluir sólo por id reofrecía el mismo
    // ejercicio que acababas de rechazar.
    var ids = [];
    var nombres = [];
    Object.keys(excluidos).forEach(function (id) {
      if (id.indexOf('core_') !== 0) { ids.push(id); return; }
      var core = CORE_BY_ID[id.slice(5)];
      if (core && core.nombre) nombres.push(core.nombre);
    });

    return findAlternativeCandidates(exercise, reasonKey, ids, nombres).map(function (r) {
      return { tipo: 'db', item: r };
    });
  }

  function alternativaAExercise(cand, baseExercise, reasonKey) {
    return cand.tipo === 'core'
      ? coreToExercise(cand.item, baseExercise, reasonKey)
      : catalogRecToExercise(cand.item, baseExercise, reasonKey);
  }

  // Claves con las que se recuerda un candidato rechazado. Los del núcleo
  // llevan DOS: la suya y la de su ficha en el catálogo. Sin la segunda, al
  // ampliar al catálogo reaparecía el mismo ejercicio que ya habías
  // descartado, con otro nombre y sin traducir.
  function clavesDeCandidato(cand) {
    if (cand.tipo !== 'core') return [cand.item.id];
    var claves = ['core_' + cand.item.id];
    if (cand.item.db) claves.push(cand.item.db);
    return claves;
  }

  // Modal en dos pantallas: primero el motivo, después las propuestas, que se
  // pueden ir rechazando indefinidamente con "Buscar otra".
  function showAlternativeFinderModal(originalId, exercise, dateKey, onDone) {
    var existing = document.getElementById('altFinderOverlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'altFinderOverlay';
    overlay.className = 'alt-finder-overlay';

    var modal = document.createElement('div');
    modal.className = 'alt-finder-modal';
    overlay.appendChild(modal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);

    var rejected = [];
    var candidates = [];
    var idx = 0;
    var reasonKey = null;
    // Se ha pedido salir del núcleo curado al catálogo completo.
    var ampliado = false;

    function close() { overlay.remove(); }

    function addCancel(label) {
      var btn = document.createElement('button');
      btn.className = 'alt-finder-cancel';
      btn.textContent = label || 'Cancelar';
      btn.addEventListener('click', function (e) { e.stopPropagation(); close(); });
      modal.appendChild(btn);
    }

    function renderReasons() {
      modal.innerHTML = '';
      var title = document.createElement('div');
      title.className = 'alt-finder-title';
      title.textContent = '¿Por qué quieres cambiarlo?';
      modal.appendChild(title);

      var sub = document.createElement('div');
      sub.className = 'alt-finder-subtitle';
      sub.textContent = exercise.name;
      modal.appendChild(sub);

      SWAP_REASONS.forEach(function (r) {
        var btn = document.createElement('button');
        btn.className = 'alt-finder-reason-btn';
        btn.innerHTML = '<span class="afr-emoji">' + r.emoji + '</span><span class="afr-label">' + escapeHtml(r.label) + '</span>';
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          reasonKey = r.key;
          rejected = [];
          idx = 0;
          startSearch();
        });
        modal.appendChild(btn);
      });

      addCancel();
    }

    function renderLoading(msg) {
      modal.innerHTML = '';
      var m = document.createElement('div');
      m.className = 'alt-finder-subtitle';
      m.textContent = msg;
      modal.appendChild(m);
    }

    function startSearch() {
      if (!EXERCISE_DB.isLoaded()) {
        renderLoading('Cargando catálogo…');
        EXERCISE_DB.load().then(function () {
          runSearch();
        }).catch(function () {
          renderLoading('No se pudo cargar el catálogo.');
          addCancel('Cerrar');
        });
        return;
      }
      runSearch();
    }

    function runSearch() {
      candidates = buscarAlternativas(exercise, reasonKey, rejected, dateKey, ampliado);
      idx = 0;
      renderProposal();
    }

    function renderEmpty() {
      modal.innerHTML = '';
      var title = document.createElement('div');
      title.className = 'alt-finder-title';
      title.textContent = 'No hay más alternativas';
      modal.appendChild(title);

      var sub = document.createElement('div');
      sub.className = 'alt-finder-subtitle';
      sub.textContent = ampliado
        ? 'No hemos encontrado (más) alternativas para ese motivo.'
        : 'Se han acabado las alternativas verificadas para ese motivo.';
      modal.appendChild(sub);

      // El catálogo completo se ofrece sólo si se pide, y avisando: ahí el
      // material y el nivel no están comprobados a mano, así que pueden salir
      // ejercicios que no encajen con lo que declaraste.
      if (!ampliado) {
        var mas = document.createElement('button');
        mas.className = 'alt-finder-again';
        mas.textContent = '🔍 Buscar en el catálogo completo';
        mas.addEventListener('click', function (e) {
          e.stopPropagation();
          ampliado = true;
          runSearch();
        });
        modal.appendChild(mas);

        var aviso = document.createElement('div');
        aviso.className = 'alt-finder-warning';
        aviso.textContent = 'Ahí hay 1.324 ejercicios, pero su material y su nivel no están verificados: revisa la ficha antes de aceptar.';
        modal.appendChild(aviso);
      }

      var again = document.createElement('button');
      again.className = 'alt-finder-again';
      again.textContent = '↩ Probar con otro motivo';
      again.addEventListener('click', function (e) { e.stopPropagation(); renderReasons(); });
      modal.appendChild(again);

      addCancel();
    }

    function renderProposal() {
      if (idx >= candidates.length) { renderEmpty(); return; }
      var cand = candidates[idx];
      var reason = reasonByKey(reasonKey);
      var alt = alternativaAExercise(cand, exercise, reasonKey);

      modal.innerHTML = '';

      var title = document.createElement('div');
      title.className = 'alt-finder-title';
      title.textContent = 'Prueba con esto';
      modal.appendChild(title);

      var hint = document.createElement('div');
      hint.className = 'alt-finder-hint-reason';
      hint.textContent = reason.emoji + ' ' + reason.hint;
      modal.appendChild(hint);

      var card = document.createElement('div');
      card.className = 'alt-finder-card';
      // La ficha (animación, material, pasos) sale siempre del catálogo: el
      // núcleo sólo guarda el id, y del catálogo vienen la imagen y el texto.
      var rec = cand.tipo === 'core' ? EXERCISE_DB.get(cand.item.db) : cand.item;

      var html = '';
      var gif = rec ? EXERCISE_DB.gifUrl(rec) : '';
      if (gif) {
        html += '<img class="alt-finder-card-gif" loading="lazy" alt="Animación: ' + escapeHtml(alt.name) + '" src="' + gif + '">';
      }
      html += '<div class="alt-finder-card-name">' + escapeHtml(alt.name) + '</div>';
      // El material se dice desde el núcleo cuando viene de él: el campo `eq`
      // del catálogo a veces miente, y es justo el dato que hay que acertar.
      var material = cand.tipo === 'core'
        ? ((cand.item.mat && cand.item.mat.length)
            ? cand.item.mat.map(function (m) { return EXERCISE_DB.labelEquipment(m); }).join(' + ')
            : 'Peso corporal')
        : (rec ? EXERCISE_DB.labelEquipment(rec.eq) : '');
      html += '<div class="alt-finder-card-meta">' + escapeHtml(alt.muscle) + (material ? ' · ' + escapeHtml(material) : '') + '</div>';
      html += '<div class="alt-finder-card-scheme">' + escapeHtml(String(alt.series)) + '×' + escapeHtml(String(alt.reps)) + ' · descanso ' + escapeHtml(String(alt.rest || '—')) + '</div>';
      if (rec && rec.es && rec.es.length) {
        html += '<ol class="alt-finder-steps">';
        rec.es.slice(0, 3).forEach(function (s) { html += '<li>' + escapeHtml(s) + '</li>'; });
        html += '</ol>';
      }
      card.innerHTML = html;
      modal.appendChild(card);

      var actions = document.createElement('div');
      actions.className = 'alt-finder-actions';

      var again = document.createElement('button');
      again.className = 'alt-finder-again';
      again.textContent = '🔄 Buscar otra';
      again.addEventListener('click', function (e) {
        e.stopPropagation();
        clavesDeCandidato(cand).forEach(function (k) { rejected.push(k); });
        idx++;
        // Agotada la tanda, se vuelve a buscar con los rechazados fuera: así
        // se pasa del núcleo al catálogo y siempre hay salida.
        if (idx >= candidates.length) {
          candidates = buscarAlternativas(exercise, reasonKey, rejected, dateKey);
          idx = 0;
        }
        renderProposal();
      });
      actions.appendChild(again);

      var today = document.createElement('button');
      today.className = 'alt-finder-today';
      today.textContent = '✓ Sólo por hoy';
      today.addEventListener('click', function (e) {
        e.stopPropagation();
        registerCatalogExercise(alt);
        close();
        swapExercise(originalId, alt, dateKey);
        if (onDone) onDone();
      });
      actions.appendChild(today);

      var perm = document.createElement('button');
      perm.className = 'alt-finder-perm';
      perm.textContent = '📌 Cambiarlo en mi rutina';
      perm.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
        swapExercisePermanent(originalId, alt, reasonKey);
        if (onDone) onDone();
      });
      actions.appendChild(perm);

      modal.appendChild(actions);

      var other = document.createElement('button');
      other.className = 'alt-finder-other-reason';
      other.textContent = '↩ Cambiar el motivo';
      other.addEventListener('click', function (e) { e.stopPropagation(); renderReasons(); });
      modal.appendChild(other);

      addCancel();
    }

    renderReasons();
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
  // RENDER DE LA SESIÓN DE CARRERA
  // =============================================
  // Se usa igual en la pestaña Rutina (hoy) y en el detalle de día de Inicio.
  // opts: { readOnly } — en días pasados no se ofrece marcar la sesión.
  function renderRunningSessionCard(dateKey, opts) {
    opts = opts || {};
    var info = getRunningSession(dateKey);
    if (!info) return '';

    var s = info.session;
    var phase = runningPhaseForWeek(info.week);
    var done = isRunningDone(dateKey);
    var isGoal = s.kind === 'goal';

    var html = '<div class="running-card' + (done ? ' done' : '') + (isGoal ? ' goal' : '') + '">';

    html += '  <div class="running-card-head">';
    html += '    <div class="running-card-emoji">' + (isGoal ? '🏁' : '🏃') + '</div>';
    html += '    <div class="running-card-headtext">';
    html += '      <div class="running-card-title">' + escapeHtml(s.label) + '</div>';
    html += '      <div class="running-card-sub">' + escapeHtml(runningSessionSummary(s)) + '</div>';
    html += '    </div>';
    html += '    <div class="running-card-dur">~' + s.totalMin + ' min</div>';
    html += '  </div>';

    html += '  <div class="running-card-meta">Semana ' + info.week + ' de ' + RUNNING_TOTAL_WEEKS
         + ' · Sesión ' + (info.index + 1) + ' de ' + info.total
         + (phase ? ' · ' + escapeHtml(phase.name) : '') + '</div>';

    // Desglose de la sesión
    html += '  <div class="running-blocks">';
    if (s.kind === 'intervals') {
      s.blocks.forEach(function (b) {
        if (b.type === 'walk') {
          html += '<div class="running-block walk"><span class="rb-icon">🚶</span><span class="rb-text">'
               + b.min + ' min caminando</span></div>';
        } else {
          html += '<div class="running-block set"><span class="rb-icon">🔁</span><span class="rb-text">'
               + b.reps + ' bloques de <strong>' + b.jog + ' min de trote suave</strong> + '
               + b.walk + ' min caminando</span></div>';
        }
      });
    } else if (s.kind === 'continuous') {
      html += '<div class="running-block walk"><span class="rb-icon">🚶</span><span class="rb-text">Calienta andando unos minutos</span></div>';
      html += '<div class="running-block run"><span class="rb-icon">🏃</span><span class="rb-text"><strong>'
           + s.min + ' min de carrera continua</strong> a ritmo conversado</span></div>';
    } else {
      html += '<div class="running-block walk"><span class="rb-icon">🚶</span><span class="rb-text">Calienta andando unos minutos</span></div>';
      html += '<div class="running-block run"><span class="rb-icon">' + (isGoal ? '🏁' : '🏃') + '</span><span class="rb-text"><strong>'
           + s.km + ' km</strong> a ritmo cómodo</span></div>';
    }
    html += '  </div>';

    if (phase && phase.note) {
      html += '  <div class="running-phase-note">' + escapeHtml(phase.note) + '</div>';
    }

    // Reglas de seguridad: plegadas para no repetir el mismo bloque a diario,
    // pero siempre a un toque de distancia.
    html += '  <details class="running-rules">';
    html += '    <summary>⚠️ Reglas para evitar una recaída</summary>';
    RUNNING_RULES.forEach(function (r) {
      html += '    <div class="running-rule"><span class="rr-icon">' + r.icon + '</span>'
           + '<span class="rr-body"><strong>' + escapeHtml(r.title) + '.</strong> ' + escapeHtml(r.text) + '</span></div>';
    });
    html += '  </details>';

    if (!opts.readOnly) {
      html += '  <button class="running-done-btn' + (done ? ' checked' : '') + '" data-date="' + dateKey + '">'
           + (done ? '✓ Sesión completada' : 'Marcar sesión como hecha') + '</button>';
    } else if (done) {
      html += '  <div class="running-done-note">✓ Sesión completada</div>';
    }

    html += '</div>';
    return html;
  }

  function bindRunningDoneButtons(container) {
    if (!container) return;
    container.querySelectorAll('.running-done-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleRunningDone(btn.dataset.date);
        renderRoutineStatus();
        renderCurrentDay();
        updateProgress();
        if (currentTab === 'home') renderHome();
      });
    });
  }

  // =============================================
  // RENDER TODAY'S ROUTINE
  // =============================================
  function renderCurrentDay() {
    var container = document.getElementById('dayView');
    if (!container) return;
    var phase = getPhase(getTodayKey());

    // Los días de carrera sustituyen a la sesión de fuerza
    if (isRunningDay(getTodayKey())) {
      var runHtml = renderRunningSessionCard(getTodayKey(), {});
      var head = '<div class="day-view-header"><h2>🏃 Carrera</h2><p>Plan de vuelta a correr</p></div>';
      if (runHtml) {
        container.innerHTML = head + runHtml;
        bindRunningDoneButtons(container);
      } else {
        // Sin sesión: pasadas las 12 semanas, o un día de más en la semana 12
        var rw = getRunningWeek(getTodayKey());
        container.innerHTML = head + '<div class="running-card"><div class="running-card-sub">'
          + (rw > RUNNING_TOTAL_WEEKS
              ? '¡Has terminado las 12 semanas del plan! 🎉'
              : 'Esta semana el plan sólo tiene ' + ((RUNNING_PLAN[rw] || []).length) + ' sesiones. Hoy, descanso o fuerza.')
          + '</div></div>';
      }
      return;
    }

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

    // Semana de descarga: se avisa en vez de dejar que parezca un error que
    // toquen menos series de las habituales.
    var planActual = loadCustomPlan();
    if (planActual && planActual.deloadWeeks
        && planActual.deloadWeeks.indexOf(getWeekNumber(getTodayKey())) !== -1) {
      html += '<div class="warmup-card"><div class="warmup-card-icon">🌙</div>'
           + '<div class="warmup-card-content"><div class="warmup-card-emphasis">Semana de descarga</div>'
           + '<div class="warmup-card-text">Baja el peso o quita una serie de cada ejercicio. '
           + 'Doce semanas seguidas subiendo carga acaban en estancamiento: esta semana toca recuperar.</div>'
           + '</div></div>';
    }

    // Explicación bajo demanda: durante el entrenamiento se quiere levantar,
    // no leer, así que es un botón discreto y no un bloque de texto.
    if (planActual && planActual.splitName) {
      html += '<button class="why-open-btn" id="whyOpenBtn">¿Por qué este entrenamiento?</button>';
    }

    var effectiveExercises = getEffectiveExercises(day);

    // Agrupado de superseries y del bloque de mejora de running. Sólo se activa
    // si los ejercicios traen los campos, así que los perfiles de sólo fuerza
    // siguen pintándose como una lista plana.
    var openSS = null;      // tag de la superserie abierta
    var ssCount = 0;
    var openRunBlock = false;

    effectiveExercises.forEach(function (item, idx) {
      var ex = item.ex;
      var originalId = item.originalId;
      var isSwapped = item.isSwapped;
      var isCompleted = !!completions[ex.id];
      var lastWeight = getLastWeight(ex.id);
      var meta = EXERCISE_META[ex.id] || EXERCISE_META[originalId] || {};
      var isExpanded = !!expandedCards[originalId];
      var repsLabel = ex.series + '×' + ex.reps;

      // Cierra la superserie anterior si esta ficha ya no pertenece a ella
      if (openSS && ex.ss !== openSS) { html += '</div>'; openSS = null; }

      if (ex.ss && ex.ss !== openSS) {
        ssCount++;
        html += '<div class="superset-group">';
        html += '  <div class="superset-header">▶ Superserie ' + ssCount
             + ' <span class="superset-rounds">' + ex.series + ' vueltas · sin descanso entre ejercicios</span></div>';
        openSS = ex.ss;
      }

      if (ex.group === 'running' && !openRunBlock) {
        html += '<div class="running-block-header">🏃 Mejora de running</div>';
        openRunBlock = true;
      }

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
      html += '  <span class="exercise-chevron' + (isExpanded ? ' expanded' : '') + '" id="chevron-' + originalId + '">›</span>';
      html += '</div>';

      // BODY (expandable)
      html += '<div class="exercise-body' + (isExpanded ? ' expanded' : '') + '" id="body-' + originalId + '">';

      html += '  <div class="exercise-details">';
      html += '    <div class="exercise-detail-item"><span class="icon">🔄</span><span><span class="label">Series: </span><span class="value">' + ex.series + '</span></span></div>';
      html += '    <div class="exercise-detail-item"><span class="icon">🔁</span><span><span class="label">Reps: </span><span class="value">' + ex.reps + '</span></span></div>';
      var restSecs = parseRestSeconds(ex.rest);
      // En mitad de una superserie no se descansa: se encadena con el siguiente
      if (ex.ss && restSecs === 0) {
        html += '    <div class="exercise-detail-item"><span class="icon">⛓️</span><span><span class="label">Después: </span><span class="value">encadena</span></span></div>';
      } else {
        html += '    <div class="exercise-detail-item"><span class="icon" id="timer-icon-' + originalId + '">⏱️</span><span><span class="label">Descanso: </span><span class="value">' + ex.rest + '</span></span>' + (restSecs > 0 ? '<button class="timer-start-btn" data-ex="' + originalId + '" data-secs="' + restSecs + '">Iniciar</button>' : '') + '</div>';
      }
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
          html += '    <img class="exercise-db-gif" loading="lazy" draggable="false" alt="Animación: ' + escapeHtml(dbRec.n) + '" src="' + dbGif + '">';
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

      html += '  <div class="alt-finder-block">';
      html += '    <button class="alt-finder-btn" data-orig="' + originalId + '">🔍 Buscar alternativa</button>';
      html += '    <div class="alt-finder-hint">Si no tienes el material o no puedes hacerlo, te proponemos otra opción.</div>';
      html += '  </div>';

      if (isSwapped) {
        if (item.isPermanent) {
          html += '  <div class="swap-indicator swap-indicator-perm">📌 Cambiado en tu rutina · <button class="revert-perm-btn" data-orig="' + originalId + '">Volver al original</button></div>';
        } else {
          html += '  <div class="swap-indicator">⇔ Usando alternativa sólo hoy · <button class="revert-btn" data-orig="' + originalId + '">Volver al original</button></div>';
        }
      }

      html += '</div>'; // end exercise-body
      html += '</div>'; // end exercise-card
    });

    if (openSS) html += '</div>';   // cierra la última superserie

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

    var whyBtn = container.querySelector('#whyOpenBtn');
    if (whyBtn) whyBtn.addEventListener('click', openWhyModal);

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
        toggleCompletion(btn.dataset.ex, btn.dataset.orig);
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

    container.querySelectorAll('.revert-perm-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        revertPermanentSwap(btn.dataset.orig);
      });
    });

    container.querySelectorAll('.alt-finder-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var origId = btn.dataset.orig;
        var current = null;
        getEffectiveExercises(day).forEach(function (it) {
          if (it.originalId === origId) current = it.ex;
        });
        if (current) showAlternativeFinderModal(origId, current, null, null);
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

    // En los días de carrera la barra mide la sesión, no los ejercicios
    var runToday = getRunningSession(getTodayKey());
    if (runToday) {
      var rDone = isRunningDone(getTodayKey());
      var rf = document.getElementById('progressFill');
      var rl = document.getElementById('progressLabel');
      var rt = document.getElementById('progressText');
      if (rf) rf.style.width = rDone ? '100%' : '0%';
      if (rl) rl.textContent = '🏃 Semana ' + runToday.week + ' de ' + RUNNING_TOTAL_WEEKS;
      if (rt) rt.textContent = rDone ? 'Sesión completada' : 'Sesión pendiente';
      return;
    }

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

    // En los planes que incluyen carrera, recordar por qué semana se va
    if (profileHasRunning()) {
      var curWeek = getWeekNumber(getTodayKey());
      var weekTxt = curWeek < 1 ? 'aún no has empezado'
        : curWeek > RUNNING_TOTAL_WEEKS ? 'plan completado 🎉'
        : 'semana ' + curWeek + ' de ' + RUNNING_TOTAL_WEEKS;
      html += '  <div class="plan-week-note">🏃 Plan de vuelta a correr · <strong>' + weekTxt + '</strong></div>';
    }
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

      // Los días de carrera mandan sobre el resto de estados del día
      var runCell = isRunningDay(cellDate) ? getRunningSession(cellDate) : null;
      var runCellDone = runCell && isRunningDone(cellDate);
      if (runCell) {
        cls = cls.replace(/ (routine-push|routine-pull|routine-legs|rest|missed)\b/g, '');
        cls += ' running-day';
        // Clase propia en vez de 'attended done': esa pinta la celda del verde
        // de Pierna y en la leyenda se confundiría con una sesión de fuerza.
        if (runCellDone) cls += ' running-done';
        else if (isPast) cls += ' missed';
      }

      html += '<div class="' + cls + '" data-date="' + cellDate + '">';
      if (runCell) {
        html += '<span class="cal-day-emoji">' + (runCell.session.kind === 'goal' ? '🏁' : '🏃') + '</span>';
      } else if (attended !== undefined && attended >= 0) {
        html += '<span class="cal-day-emoji">' + getPhase(cellDate).days[attended].emoji + '</span>';
      } else if (scheduled) {
        html += '<span class="cal-day-emoji">' + getPhase(cellDate).days[routineIdx].emoji + '</span>';
      } else {
        html += '<span class="cal-day-emoji rest-dot">·</span>';
      }
      html += '<span class="cal-day-num">' + day + '</span>';
      if (runCellDone || (!runCell && attended !== undefined && attended >= 0)) {
        html += '<span class="cal-day-check">✓</span>';
      }
      html += '</div>';
    }

    html += '  </div>';
    html += '  <div class="calendar-legend">';
    var legendColors = ['#e94560', '#0f3460', '#2ecc71'];
    // Los días de carrera tienen su propia entrada más abajo: aquí sólo fuerza.
    // El color se deriva del índice igual que en la celda del calendario
    // (0 = push, 1 = pull, resto = legs), o leyenda y calendario no cuadrarían.
    for (var li = 0; li < PHASES[0].days.length; li++) {
      if (PHASES[0].days[li].type === 'running') continue;
      var lc = li === 0 ? legendColors[0] : li === 1 ? legendColors[1] : legendColors[2];
      html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:' + lc + ';"></span> ' + PHASES[0].days[li].day + '</span>';
    }
    if (profileHasRunning()) {
      html += '    <span class="calendar-legend-item"><span class="legend-box" style="background:#f39c12;"></span> Carrera</span>';
    }
    html += '    <span class="calendar-legend-item"><span class="legend-box rest-box"></span> Descanso</span>';
    html += '  </div>';
    html += '</div>';

    html += '<div class="day-detail" id="dayDetail">' + renderDayDetail(selectedDate) + '</div>';
    container.innerHTML = html;

    // Weekday chip toggle (sólo los de fuerza: los de carrera van aparte)
    container.querySelectorAll('.weekday-chip[data-day]').forEach(function (chip) {
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
        // El Worker guarda los días de entreno: si no se le avisa, seguiría
        // recordando los viejos.
        resyncPush();
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

    bindRunningDoneButtons(detailEl);
    detailEl.querySelectorAll('.home-ex-header').forEach(function(header) {
      header.addEventListener('click', function(e) {
        if (e.target.closest('.home-check-btn')) return;
        var exId = header.id.replace('home-header-', '');
        toggleHomeExpand(exId);
      });
    });
    detailEl.querySelectorAll('.home-check-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleHomeCompletion(btn.dataset.ex, btn.dataset.date);
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

    detailEl.querySelectorAll('.home-revert-perm-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        revertPermanentSwap(btn.dataset.orig);
        refreshHomeDayDetail();
      });
    });

    detailEl.querySelectorAll('.home-alt-finder-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var origId = btn.dataset.orig;
        var dk = btn.dataset.date || getTodayKey();
        var day = getDayForDateKey(dk);
        if (!day) return;
        var current = null;
        getEffectiveExercises(day, dk).forEach(function (it) {
          if (it.originalId === origId) current = it.ex;
        });
        if (current) {
          showAlternativeFinderModal(origId, current, btn.dataset.date || null, function () {
            refreshHomeDayDetail();
          });
        }
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
    // Se puede marcar como hecho cualquier día con fecha (pasado, hoy o
    // futuro) salvo en las vistas explícitamente de sólo lectura.
    var isDone = !readOnly && dateKey ? !!(getCompletionsForDate(dateKey)[ex.id]) : false;
    var html = '';

    html += '<div class="day-detail-ex-item home-ex-card' + (isDone ? ' completed' : '') + '" id="home-card-' + originalId + '">';

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
    if (!readOnly && dateKey) {
      html += '  <button class="check-btn home-check-btn' + (isDone ? ' checked' : '') + '" data-ex="' + ex.id + '" data-date="' + dateKey + '">' + (isDone ? '✓' : '') + '</button>';
    }
    html += '  <span class="exercise-chevron' + (isExpanded ? ' expanded' : '') + '" id="home-chevron-' + originalId + '">›</span>';
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
        html += '    <img class="exercise-db-gif" loading="lazy" draggable="false" alt="Animación: ' + escapeHtml(dbRec.n) + '" src="' + gifSrc + '">';
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

    if (!readOnly) {
      html += '  <div class="alt-finder-block">';
      html += '    <button class="alt-finder-btn home-alt-finder-btn" data-orig="' + originalId + '" data-date="' + (dateKey || '') + '">🔍 Buscar alternativa</button>';
      html += '    <div class="alt-finder-hint">Si no tienes el material o no puedes hacerlo, te proponemos otra opción.</div>';
      html += '  </div>';
    }

    if (isSwapped && !readOnly) {
      if (opts.isPermanent) {
        html += '  <div class="swap-indicator swap-indicator-perm">📌 Cambiado en tu rutina · <button class="home-revert-perm-btn" data-orig="' + originalId + '">Volver al original</button></div>';
      } else {
        html += '  <div class="swap-indicator">⇔ Usando alternativa sólo hoy · <button class="home-revert-btn" data-orig="' + originalId + '" data-date="' + (dateKey || '') + '">Volver al original</button></div>';
      }
    }

    html += '</div>'; // end exercise-body
    html += '</div>'; // end day-detail-ex-item

    return html;
  }

  // Lista de ejercicios del detalle de día, con el mismo agrupado de
  // superseries y bloque de mejora que la pestaña Rutina.
  function renderHomeExerciseList(day, dateKey) {
    var html = '';
    var openSS = null, ssCount = 0, openRun = false;
    getEffectiveExercises(day, dateKey).forEach(function (item) {
      var ex = item.ex;
      if (openSS && ex.ss !== openSS) { html += '</div>'; openSS = null; }
      if (ex.ss && ex.ss !== openSS) {
        ssCount++;
        html += '<div class="superset-group">';
        html += '  <div class="superset-header">▶ Superserie ' + ssCount
             + ' <span class="superset-rounds">' + ex.series + ' vueltas</span></div>';
        openSS = ex.ss;
      }
      if (ex.group === 'running' && !openRun) {
        html += '<div class="running-block-header">🏃 Mejora de running</div>';
        openRun = true;
      }
      var meta = EXERCISE_META[ex.id] || EXERCISE_META[item.originalId] || {};
      html += renderExerciseDetailItemForHome(ex, meta, {
        dateKey: dateKey, originalId: item.originalId,
        isSwapped: item.isSwapped, isPermanent: item.isPermanent
      });
    });
    if (openSS) html += '</div>';
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

    // Los días de carrera tienen su propia ficha y su propio registro
    if (isRunningDay(dateKey)) {
      var runInfo = getRunningSession(dateKey);
      var runHtml = '<div class="day-detail-data">';
      runHtml += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')</div>';
      if (runInfo) {
        runHtml += '  <div class="day-detail-routine">🏃 Carrera · Semana ' + runInfo.week + ' de ' + RUNNING_TOTAL_WEEKS + '</div>';
        // Los días pasados también se pueden marcar: antes quedaban en modo
        // sólo lectura y no había forma de registrar una sesión de carrera
        // que ya se hizo, sólo la de hoy o futuras.
        runHtml += renderRunningSessionCard(dateKey, { readOnly: isFuture });
      } else {
        var rw = getRunningWeek(dateKey);
        runHtml += '  <div class="day-detail-msg">🏃 Día de carrera</div>';
        runHtml += '  <div class="day-detail-sub">'
                + (rw > RUNNING_TOTAL_WEEKS
                    ? '¡Has terminado las 12 semanas del plan! 🎉'
                    : (rw < 1
                        ? 'El plan empieza el ' + escapeHtml(getStartDate()) + '.'
                        : 'Esta semana el plan sólo tiene ' + (RUNNING_PLAN[rw] || []).length + ' sesiones. Hoy, descanso o fuerza.'))
                + '</div>';
      }
      runHtml += '</div>';
      return runHtml;
    }

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
      html += renderHomeExerciseList(day, dateKey);
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
    html += renderHomeExerciseList(day, dateKey);
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
    var day = (routineIdx !== null && phase) ? phase.days[routineIdx] : null;
    var routineName = day ? day.day : '—';
    var routineEmoji = day ? day.emoji : '🏋️';
    var phaseInfo = phase ? ' · ' + phase.name : '';
    // No sólo hoy: cualquier día sin fecha futura se puede seguir marcando.
    // Antes esta vista era de sólo lectura en cuanto había un ejercicio
    // marcado, así que no se podía completar el resto de un entreno pasado.
    var editable = day && dateKey <= getTodayKey();

    var html = '<div class="day-detail-data">';
    html += '  <div class="day-detail-date">' + formatted + ' (' + dayName + ')' + phaseInfo + '</div>';
    html += '  <div class="day-detail-routine">' + routineEmoji + ' ' + routineName + (weekNum ? ' · Semana ' + weekNum : '') + '</div>';
    html += '  <div class="day-detail-exercises">';

    if (editable) {
      html += renderHomeExerciseList(day, dateKey);
    } else {
      var dayExercises = [];
      if (day) dayExercises = day.exercises;
      else { for (var exId in completions) { var ex = findExercise(exId); if (ex) dayExercises.push(ex); } }

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
    }

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

  // =============================================
  // RACHA
  // ---------------------------------------------
  // Cuenta SESIONES PLANIFICADAS seguidas, no días naturales seguidos. Antes
  // era lo segundo, y en una app de gimnasio eso no mide nada: los días de
  // descanso forman parte del plan, así que quien entrena tres días por semana
  // rompía la racha cada martes y no pasaba nunca de 1. Marcaba 0 casi siempre.
  //
  // Reglas, caminando hacia atrás desde hoy:
  //   - día que no toca entrenar  → se salta, no cuenta ni rompe
  //   - día que toca y está hecho → suma
  //   - HOY sin hacer             → se salta: aún estás a tiempo
  //   - día que tocaba y no está  → rompe
  function diaEntrenado(key) {
    var comps = state.completions && state.completions[key];
    if (comps) { for (var k in comps) return true; }
    return !!(state.finished && state.finished[key]);
  }

  function getCurrentStreak() {
    var streak = 0;
    var hoy = getTodayKey();
    var d = new Date(hoy + 'T12:00:00');

    // Un año hacia atrás es de sobra y evita un bucle infinito si alguien se
    // queda sin ningún día de entreno marcado.
    for (var i = 0; i < 365; i++) {
      var key = getDateKey(d);
      if (isTrainingDay(key)) {
        if (diaEntrenado(key)) streak++;
        else if (key !== hoy) break;   // hoy todavía cuenta como pendiente
      }
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  // La mejor racha histórica. Es la referencia que hace que perder la actual
  // escueza: no es sólo volver a cero, es alejarse de tu récord.
  function getBestStreak() {
    var fechas = getWorkoutDates();
    if (!fechas.length) return 0;

    var mejor = 0;
    var actual = 0;
    var d = new Date(fechas[0] + 'T12:00:00');
    var fin = new Date(getTodayKey() + 'T12:00:00');

    while (d <= fin) {
      var key = getDateKey(d);
      if (isTrainingDay(key)) {
        if (diaEntrenado(key)) {
          actual++;
          if (actual > mejor) mejor = actual;
        } else if (key !== getTodayKey()) {
          actual = 0;
        }
      }
      d.setDate(d.getDate() + 1);
    }
    return mejor;
  }

  // ¿Hoy toca, no está hecho y hay racha que perder? Es el único momento en
  // que tiene sentido avisar de nada.
  function rachaEnRiesgo() {
    var hoy = getTodayKey();
    return isTrainingDay(hoy) && !diaEntrenado(hoy) && getCurrentStreak() > 0;
  }

  // Banda de racha en la pestaña Rutina, que es donde se decide entrenar.
  // Sólo aparece si hay racha: con 0 no hay nada que perder y sería ruido.
  function rachaAvisoHtml() {
    var racha = getCurrentStreak();
    if (racha < 1) return '';

    var riesgo = rachaEnRiesgo();
    var hoyHecho = diaEntrenado(getTodayKey());

    var texto;
    if (riesgo) texto = 'Llevas <strong>' + racha + '</strong> ' + (racha === 1 ? 'sesión' : 'sesiones') + ' seguidas. Hoy toca: si lo dejas, vuelve a cero.';
    else if (hoyHecho) texto = 'Racha de <strong>' + racha + '</strong> ' + (racha === 1 ? 'sesión' : 'sesiones') + '. Hoy ya está hecho 💪';
    else texto = 'Racha de <strong>' + racha + '</strong> ' + (racha === 1 ? 'sesión' : 'sesiones') + '. Hoy descansas, no se pierde.';

    return '<div class="racha-aviso' + (riesgo ? ' en-riesgo' : '') + '">'
         + '<span class="racha-aviso-icon">🔥</span>'
         + '<span class="racha-aviso-text">' + texto + '</span>'
         + '</div>';
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

    // Los planes van los primeros: es a lo que se viene cuando se pulsa el
    // botón de la cabecera, y lo que da contexto a todo lo de abajo (el
    // progreso y los ajustes son los del plan activo, no los de todos).
    var html = planSelectorHtml();

    html += '<div class="stats-section-title">📊 Tu progreso <span class="line"></span></div>';
    html += '<div class="phase-banner"><span class="phase-banner-icon">📌</span><span class="phase-banner-text">' + phase.name + '</span><span class="phase-banner-week">Semana ' + weekNum + '/12</span></div>';

    // La racha pasa a ser la tarjeta principal. En riesgo cambia de color y lo
    // dice: es el único aviso que de verdad mueve a entrenar hoy.
    var mejorRacha = getBestStreak();
    var enRiesgo = rachaEnRiesgo();
    var subRacha = '';
    if (enRiesgo) subRacha = 'Hoy toca · no la pierdas';
    else if (streak > 0 && streak >= mejorRacha) subRacha = '¡Tu mejor racha!';
    else if (mejorRacha > 0) subRacha = 'Tu récord: ' + mejorRacha;

    html += '<div class="stats-grid">';
    html += '<div class="stat-card highlight streak-card' + (enRiesgo ? ' en-riesgo' : '') + (streak > 0 ? ' viva' : '') + '">'
         + '<div class="stat-icon">' + (streak > 0 ? '🔥' : '🌱') + '</div>'
         + '<div class="stat-number">' + streak + '</div>'
         + '<div class="stat-label">Días de racha</div>'
         + (subRacha ? '<div class="stat-sub">' + subRacha + '</div>' : '')
         + '</div>';
    html += '<div class="stat-card"><div class="stat-icon">📅</div><div class="stat-number">' + totalDays + '</div><div class="stat-label">Días de gym</div></div>';
    html += '<div class="stat-card"><div class="stat-icon">✅</div><div class="stat-number">' + totalExercises + '</div><div class="stat-label">Ejercicios</div></div>';
    html += '<div class="stat-card"><div class="stat-icon">📊</div><div class="stat-number">' + weeklyPct + '%</div><div class="stat-label">Consistencia</div><div class="stat-sub">' + weeklyData.length + ' semanas</div></div>';
    html += '</div>';

    html += '<div class="stats-section-title">🗓️ Tu año <span class="line"></span></div>';
    html += heatmapHtml();

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

    html += '<div class="stats-section-title">⚖️ Tu peso corporal <span class="line"></span></div>';
    html += bodyWeightChartHtml();

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

    // Los ajustes van al final: se consultan de vez en cuando, mientras que el
    // progreso es lo que se viene a mirar.
    html += ajustesPersonalesHtml();

    container.innerHTML = html;

    if (exWithData.length > 0) {
      var select = document.getElementById('chartExerciseSelect');
      setupChart(select.value);
      select.addEventListener('change', function () { setupChart(select.value); });
    }

    setupBodyWeightChart();
    setupPlanSelector();
    setupAjustesPersonales();
  }

  // =============================================
  // MAPA DE CALOR DE ENTRENAMIENTOS
  // ---------------------------------------------
  // Una casilla por día, columnas de lunes a domingo, al estilo del de GitHub.
  // Media hoja de datos que ya teníamos (`state.completions`) y que hasta
  // ahora sólo se veía de ocho en ocho sesiones.
  //
  // 26 semanas y no 52: en un móvil de 360 px, 52 columnas dejan celdas de
  // 4 px que no se distinguen. Medio año ya cuenta la historia.
  var HEATMAP_SEMANAS = 26;

  function heatmapHtml() {
    var hoy = new Date();
    hoy.setHours(12, 0, 0, 0);
    // Lunes de esta semana. getDay() da 0 para domingo, de ahí el +6 % 7.
    var lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
    var inicio = new Date(lunes);
    inicio.setDate(lunes.getDate() - (HEATMAP_SEMANAS - 1) * 7);

    var completions = state.completions || {};
    var celdas = [];
    var maxEj = 0;
    var totalDias = 0;
    for (var s = 0; s < HEATMAP_SEMANAS; s++) {
      for (var d = 0; d < 7; d++) {
        var fecha = new Date(inicio);
        fecha.setDate(inicio.getDate() + s * 7 + d);
        var key = getDateKey(fecha);
        var n = completions[key] ? Object.keys(completions[key]).length : 0;
        if (n > maxEj) maxEj = n;
        if (n > 0) totalDias++;
        celdas.push({ semana: s, key: key, fecha: fecha, n: n, futuro: fecha > hoy });
      }
    }

    var MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var html = '<div class="heatmap-card">';

    // Etiquetas de mes: una por columna donde empieza un mes nuevo.
    html += '<div class="heatmap-meses">';
    var mesPrevio = -1;
    for (s = 0; s < HEATMAP_SEMANAS; s++) {
      var primerDia = celdas[s * 7].fecha;
      var mes = primerDia.getMonth();
      var etiqueta = (mes !== mesPrevio) ? MESES[mes] : '';
      mesPrevio = mes;
      html += '<span class="heatmap-mes">' + etiqueta + '</span>';
    }
    html += '</div>';

    html += '<div class="heatmap-grid" role="img" aria-label="Días entrenados en los últimos '
         + HEATMAP_SEMANAS + ' semanas: ' + totalDias + '">';
    celdas.forEach(function (c) {
      // El nivel es relativo al mejor día del propio usuario: comparar contra
      // un número fijo pintaría de gris a quien hace sesiones cortas.
      var nivel = 0;
      if (c.n > 0) nivel = maxEj <= 1 ? 4 : Math.min(4, Math.ceil((c.n / maxEj) * 4));
      var titulo = formatDateShort(c.fecha) + (c.n > 0 ? ' · ' + c.n + ' ejercicios' : ' · sin entrenar');
      html += '<span class="heatmap-dia n' + nivel + (c.futuro ? ' futuro' : '')
           + '" title="' + titulo + '"></span>';
    });
    html += '</div>';

    html += '<div class="heatmap-leyenda"><span>Menos</span>'
         + '<span class="heatmap-dia n0"></span><span class="heatmap-dia n1"></span>'
         + '<span class="heatmap-dia n2"></span><span class="heatmap-dia n3"></span>'
         + '<span class="heatmap-dia n4"></span><span>Más</span></div>';
    html += '</div>';
    return html;
  }

  // =============================================
  // GRÁFICA DE PESO CORPORAL
  // =============================================
  function bodyWeightChartHtml() {
    var hist = getBodyWeightHistory();
    if (hist.length < 2) {
      return '<div class="chart-container"><div class="chart-empty"><div class="icon">⚖️</div>'
           + '<p>' + (hist.length
               ? 'Con un apunte más ya verás la curva. Actualiza tu peso en Ajustes.'
               : 'Apunta tu peso en Ajustes y aquí verás cómo evoluciona.')
           + '</p></div></div>';
    }
    return '<div class="chart-container"><div class="chart-title">Peso corporal</div>'
         + '<div class="chart-canvas-wrapper"><canvas id="bodyWeightChart" width="400" height="220"></canvas></div>'
         + '<div class="chart-stats-row" id="bodyWeightStats"></div></div>';
  }

  function setupBodyWeightChart() {
    var canvas = document.getElementById('bodyWeightChart');
    if (!canvas) return;
    var hist = getBodyWeightHistory();
    if (hist.length < 2) return;
    drawWeightChart(canvas, hist);

    var statsEl = document.getElementById('bodyWeightStats');
    if (!statsEl) return;
    var primero = hist[0].weight, ultimo = hist[hist.length - 1].weight;
    var maxW = -Infinity, minW = Infinity;
    hist.forEach(function (e) { if (e.weight > maxW) maxW = e.weight; if (e.weight < minW) minW = e.weight; });
    var diff = ultimo - primero;
    // Aquí no hay flecha «buena»: bajar puede ser el objetivo o no. Se marca
    // el signo y ya, sin colorear de verde ni de rojo.
    statsEl.innerHTML = '<span class="chart-stat-item">📉 Cambio: <span class="value">'
      + (diff > 0 ? '+' : '') + diff.toFixed(1) + ' kg</span></span>'
      + '<span class="chart-stat-item">⬆️ Máx: <span class="value">' + maxW + ' kg</span></span>'
      + '<span class="chart-stat-item">⬇️ Mín: <span class="value">' + minW + ' kg</span></span>';
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
  // =============================================
  // INVENTARIO DE MATERIAL
  // =============================================
  // Única fuente de verdad sobre qué puede hacer el usuario. Antes había dos
  // respuestas solapadas ('place' y 'gear') que se filtraban por separado y con
  // criterio permisivo: marcar «gimnasio» junto a cualquier otra cosa anulaba
  // todo filtro, y no declarar material significaba «todo vale» en vez de
  // «sólo peso corporal». De ahí salían mancuernas y máquinas a quien había
  // dicho que entrenaba en casa sin nada.
  //
  // Ahora el sitio es sólo un preajuste que rellena este inventario, y el
  // inventario es una restricción DURA que se aplica en un único sitio.
  var GEAR_OPTIONS = [
    { value: 'dumbbell', label: '🏋️ Mancuernas', desc: 'Un par de mancuernas o pesas', eq: ['dumbbell'], home: true },
    { value: 'band', label: '🎗️ Bandas elásticas', desc: 'Gomas o bandas de resistencia', eq: ['band', 'resistance band'], home: true },
    { value: 'kettlebell', label: '🔔 Kettlebell', desc: 'Pesa rusa', eq: ['kettlebell'], home: true },
    { value: 'stability_ball', label: '🟣 Fitball', desc: 'Pelota grande de estabilidad', eq: ['stability ball'], home: true },
    { value: 'medicine_ball', label: '⚽ Balón medicinal', desc: 'Balón con peso', eq: ['medicine ball'], home: true },
    { value: 'wheel_roller', label: '🎡 Rueda abdominal', desc: 'Rueda de core (ab wheel)', eq: ['wheel roller'], home: true },
    { value: 'roller', label: '🧻 Foam roller', desc: 'Rodillo de espuma para masaje y movilidad', eq: ['roller'], home: true },
    { value: 'rope', label: '➰ Comba o cuerda', desc: 'Cuerda de saltar', eq: ['rope'], home: true },
    { value: 'bosu', label: '🌗 Bosu', desc: 'Media pelota de equilibrio', eq: ['bosu ball'], home: true },
    { value: 'weighted', label: '🎒 Lastre o chaleco', desc: 'Chaleco, tobilleras o mochila con peso', eq: ['weighted'], home: true },
    { value: 'barbell', label: '🏋️‍♂️ Barra y discos', desc: 'Barra olímpica, barra Z o barra hexagonal', eq: ['barbell', 'ez barbell', 'olympic barbell', 'trap bar'], home: false },
    { value: 'cable', label: '🔗 Poleas', desc: 'Torre de poleas o máquina de cables', eq: ['cable'], home: false },
    { value: 'machine', label: '⚙️ Máquinas', desc: 'Máquinas guiadas, multipower y asistidas', eq: ['leverage machine', 'smith machine', 'sled machine', 'assisted'], home: false },
    { value: 'cardio_machine', label: '🚴 Máquinas de cardio', desc: 'Bici estática, elíptica, escaladora o remo', eq: ['stationary bike', 'elliptical machine', 'stepmill machine', 'skierg machine', 'upper body ergometer'], home: false }
  ];

  // value de GEAR_OPTIONS -> valores `eq` del dataset
  var GEAR_EQUIPMENT = (function () {
    var map = {};
    GEAR_OPTIONS.forEach(function (o) { map[o.value] = o.eq; });
    return map;
  })();

  // Qué material desbloquea cada sitio al elegirlo en el asistente. Sólo
  // prerrellena el inventario: después se puede quitar y añadir a mano.
  var PLACE_PRESET = {
    gimnasio: GEAR_OPTIONS.map(function (o) { return o.value; }),
    casa: ['dumbbell', 'band'],
    sin_material: []
  };

  // El peso corporal siempre está disponible: no depende de tener nada.
  var BODYWEIGHT_EQ = 'body weight';

  // Inventario efectivo a partir de las respuestas. NUNCA devuelve null ni
  // "sin restricción": si no se ha declarado material, es sólo peso corporal.
  function getInventory(answers) {
    var set = {};
    set[BODYWEIGHT_EQ] = 1;
    answerList(answers, 'gear').forEach(function (g) {
      (GEAR_EQUIPMENT[g] || []).forEach(function (eq) { set[eq] = 1; });
    });
    // Acceso a barra de dominadas/anillas: sólo lo asumimos si hay material
    // de gimnasio declarado (barra, poleas, máquinas...), no en peso corporal puro.
    var hasGymGear = GEAR_OPTIONS.some(function (o) {
      return !o.home && answerList(answers, 'gear').indexOf(o.value) !== -1;
    });
    if (hasGymGear) set._pullUpBar = 1;
    return set;
  }

  // Restricción dura y único punto de verdad. Lo usan el generador, el bloque
  // preventivo y el buscador de alternativas: antes cada uno filtraba a su
  // manera y por eso se colaban ejercicios imposibles.
  function canPerform(rec, inventory) {
    if (!rec) return false;
    if (EXERCISE_TAGS.needsBar(rec)) return !!inventory._pullUpBar;
    return !!inventory[rec.eq || BODYWEIGHT_EQ];
  }

  // Planes guardados antes de este cambio traen 'place' y puede que ningún
  // 'gear'. Se traducen al inventario nuevo siendo conservador: si dijo
  // gimnasio, tenía todo; si no consta material, sólo peso corporal.
  function normalizeAnswers(answers) {
    if (!answers) return answers;
    if (answers.gear !== undefined && answerList(answers, 'gear').length) return answers;
    var places = answerList(answers, 'place');
    if (places.indexOf('gimnasio') !== -1) {
      answers.gear = PLACE_PRESET.gimnasio.slice();
    } else if (!answers.gear) {
      answers.gear = [];
    }
    return answers;
  }

  // =============================================
  // CORE_EXERCISES: núcleo curado
  // =============================================
  // El generador SÓLO elige de aquí. El catálogo completo (~1300) se queda para
  // la pestaña Ejercicios y para «Buscar alternativa», donde la elección la
  // hace el usuario viendo la ficha y el riesgo es bajo.
  //
  // Existe porque los datos de origen no bastan: el nivel se adivinaba con
  // expresiones regulares sobre el nombre en inglés, y el material del dataset
  // a veces miente ("Inverse leg curl (on pull-up cable machine)" viene
  // etiquetado como peso corporal). Así, a un principiante sin material se le
  // llegó a recetar "Flag" y "Ring dips".
  //
  //   db      id en el dataset, para la animación y los pasos
  //   grupo   grupo muscular canónico, para el reparto de volumen
  //   mat     material real necesario (valores `eq` del dataset)
  //   nivel   verificado a mano, no inferido
  //   facil / dificil   cadena de progresión dentro de este núcleo
  //   evitar  zonas que lo desaconsejan
  var CORE_EXERCISES = [
    // ---------- EMPUJE · peso corporal ----------
    { id: 'flex_pared', db: '0659', nombre: 'Flexiones en la pared', patron: 'empuje', grupo: 'pecho', mat: [], nivel: 'principiante', dificil: 'flex_inclinadas' },
    { id: 'flex_inclinadas', db: '0493', nombre: 'Flexiones inclinadas', patron: 'empuje', grupo: 'pecho', mat: [], nivel: 'principiante', facil: 'flex_pared', dificil: 'flex_rodillas' },
    { id: 'flex_rodillas', db: '3211', nombre: 'Flexiones de rodillas', patron: 'empuje', grupo: 'pecho', mat: [], nivel: 'principiante', facil: 'flex_inclinadas', dificil: 'flexiones' },
    { id: 'flexiones', db: '0662', nombre: 'Flexiones', patron: 'empuje', grupo: 'pecho', mat: [], nivel: 'intermedio', facil: 'flex_rodillas', dificil: 'flex_declinadas', evitar: ['muneca', 'hombro'] },
    { id: 'flex_declinadas', db: '0279', nombre: 'Flexiones con pies elevados', patron: 'empuje', grupo: 'pecho', mat: [], nivel: 'avanzado', facil: 'flexiones', evitar: ['muneca', 'hombro'] },
    { id: 'flex_diamante', db: '0283', nombre: 'Flexiones diamante', patron: 'empuje', grupo: 'triceps', mat: [], nivel: 'intermedio', facil: 'flex_rodillas', evitar: ['muneca', 'codo'] },
    { id: 'fondos_banco', db: '0129', nombre: 'Fondos de tríceps en banco', patron: 'empuje', grupo: 'triceps', mat: [], nivel: 'principiante', dificil: 'fondos_triceps_bw', evitar: ['hombro'] },
    { id: 'fondos_triceps_bw', db: '0814', nombre: 'Fondos de tríceps', patron: 'empuje', grupo: 'triceps', mat: [], nivel: 'intermedio', facil: 'fondos_banco', evitar: ['hombro'] },

    // ---------- EMPUJE · mancuernas ----------
    { id: 'press_banca_mc', db: '0289', nombre: 'Press de pecho con mancuernas', patron: 'empuje', grupo: 'pecho', mat: ['dumbbell'], nivel: 'principiante', dificil: 'press_inclinado_mc' },
    { id: 'press_inclinado_mc', db: '0314', nombre: 'Press inclinado con mancuernas', patron: 'empuje', grupo: 'pecho', mat: ['dumbbell'], nivel: 'intermedio', facil: 'press_banca_mc' },
    { id: 'aperturas_mc', db: '0308', nombre: 'Aperturas con mancuernas', patron: 'empuje', grupo: 'pecho', mat: ['dumbbell'], nivel: 'intermedio', evitar: ['hombro'] },
    { id: 'press_hombro_mc', db: '0405', nombre: 'Press de hombro sentado', patron: 'empuje', grupo: 'hombro', mat: ['dumbbell'], nivel: 'principiante', dificil: 'press_hombro_pie' },
    { id: 'press_hombro_pie', db: '0426', nombre: 'Press de hombro de pie', patron: 'empuje', grupo: 'hombro', mat: ['dumbbell'], nivel: 'intermedio', facil: 'press_hombro_mc' },
    { id: 'arnold_mc', db: '2137', nombre: 'Press Arnold', patron: 'empuje', grupo: 'hombro', mat: ['dumbbell'], nivel: 'intermedio', facil: 'press_hombro_mc', evitar: ['hombro'] },
    { id: 'elev_laterales', db: '0334', nombre: 'Elevaciones laterales', patron: 'empuje', grupo: 'hombro', mat: ['dumbbell'], nivel: 'principiante' },
    { id: 'ext_triceps_mc', db: '2188', nombre: 'Extensión de tríceps tras nuca', patron: 'empuje', grupo: 'triceps', mat: ['dumbbell'], nivel: 'principiante', evitar: ['codo', 'hombro'] },
    { id: 'patada_triceps', db: '0333', nombre: 'Patada de tríceps', patron: 'empuje', grupo: 'triceps', mat: ['dumbbell'], nivel: 'principiante' },

    // ---------- EMPUJE · bandas ----------
    { id: 'press_banda', db: '1254', nombre: 'Press de pecho con banda', patron: 'empuje', grupo: 'pecho', mat: ['band'], nivel: 'principiante' },
    { id: 'elev_frontal_banda', db: '0978', nombre: 'Elevación frontal con banda', patron: 'empuje', grupo: 'hombro', mat: ['band'], nivel: 'principiante' },

    // ---------- EMPUJE · barra, polea y máquinas ----------
    { id: 'press_banca_barra', db: '0025', nombre: 'Press de banca con barra', patron: 'empuje', grupo: 'pecho', mat: ['barbell'], nivel: 'intermedio', evitar: ['hombro'] },
    { id: 'press_militar_barra', db: '0091', nombre: 'Press militar con barra', patron: 'empuje', grupo: 'hombro', mat: ['barbell'], nivel: 'intermedio', evitar: ['hombro'] },
    { id: 'pushdown_polea', db: '0201', nombre: 'Extensión de tríceps en polea', patron: 'empuje', grupo: 'triceps', mat: ['cable'], nivel: 'principiante' },
    { id: 'elev_lat_polea', db: '0178', nombre: 'Elevación lateral en polea', patron: 'empuje', grupo: 'hombro', mat: ['cable'], nivel: 'principiante' },

    // ---------- TIRÓN · peso corporal ----------
    { id: 'remo_invertido_rod', db: '2300', nombre: 'Remo invertido con rodillas flexionadas', patron: 'tiron', grupo: 'espalda', mat: [], nivel: 'principiante', dificil: 'remo_invertido' },
    { id: 'remo_invertido', db: '0499', nombre: 'Remo invertido', patron: 'tiron', grupo: 'espalda', mat: [], nivel: 'intermedio', facil: 'remo_invertido_rod', dificil: 'dominadas_supinas' },
    { id: 'retraccion_escapular', db: '0688', nombre: 'Retracción escapular en barra', patron: 'tiron', grupo: 'espalda', mat: [], nivel: 'principiante', dificil: 'remo_invertido' },
    { id: 'dominadas_supinas', db: '1326', nombre: 'Dominadas supinas', patron: 'tiron', grupo: 'espalda', mat: [], nivel: 'avanzado', facil: 'remo_invertido', dificil: 'dominadas', evitar: ['codo', 'hombro'] },
    { id: 'dominadas', db: '0652', nombre: 'Dominadas', patron: 'tiron', grupo: 'espalda', mat: [], nivel: 'avanzado', facil: 'dominadas_supinas', evitar: ['hombro'] },

    // ---------- TIRÓN · mancuernas ----------
    { id: 'remo_mc', db: '0293', nombre: 'Remo inclinado con mancuernas', patron: 'tiron', grupo: 'espalda', mat: ['dumbbell'], nivel: 'principiante', dificil: 'remo_una_mano_mc', evitar: ['espalda_baja'] },
    { id: 'remo_una_mano_mc', db: '0292', nombre: 'Remo a una mano', patron: 'tiron', grupo: 'espalda', mat: ['dumbbell'], nivel: 'principiante', facil: 'remo_mc' },
    { id: 'pajaro_mc', db: '0380', nombre: 'Pájaro con mancuernas', patron: 'tiron', grupo: 'hombro', mat: ['dumbbell'], nivel: 'principiante' },
    { id: 'remo_menton_mc', db: '0437', nombre: 'Remo al mentón', patron: 'tiron', grupo: 'hombro', mat: ['dumbbell'], nivel: 'intermedio', evitar: ['hombro'] },
    { id: 'curl_biceps_mc', db: '0294', nombre: 'Curl de bíceps', patron: 'tiron', grupo: 'biceps', mat: ['dumbbell'], nivel: 'principiante' },
    { id: 'curl_martillo_mc', db: '0313', nombre: 'Curl martillo', patron: 'tiron', grupo: 'biceps', mat: ['dumbbell'], nivel: 'principiante' },
    { id: 'curl_concentrado_mc', db: '0297', nombre: 'Curl concentrado', patron: 'tiron', grupo: 'biceps', mat: ['dumbbell'], nivel: 'intermedio' },
    { id: 'encogimientos_mc', db: '0329', nombre: 'Encogimientos de hombros', patron: 'tiron', grupo: 'espalda', mat: ['dumbbell'], nivel: 'principiante' },

    // ---------- TIRÓN · bandas, polea, barra y máquinas ----------
    { id: 'remo_banda', db: '1003', nombre: 'Remo con banda', patron: 'tiron', grupo: 'espalda', mat: ['band'], nivel: 'principiante' },
    { id: 'y_raise_banda', db: '1017', nombre: 'Elevación en Y con banda', patron: 'tiron', grupo: 'hombro', mat: ['band'], nivel: 'principiante' },
    { id: 'jalon_polea', db: '2330', nombre: 'Jalón al pecho en polea', patron: 'tiron', grupo: 'espalda', mat: ['cable'], nivel: 'principiante' },
    { id: 'remo_maquina', db: '1350', nombre: 'Remo en máquina', patron: 'tiron', grupo: 'espalda', mat: ['leverage machine'], nivel: 'principiante' },
    { id: 'remo_barra', db: '0027', nombre: 'Remo con barra', patron: 'tiron', grupo: 'espalda', mat: ['barbell'], nivel: 'intermedio', evitar: ['espalda_baja'] },
    { id: 'peso_muerto_barra', db: '0032', nombre: 'Peso muerto con barra', patron: 'tiron', grupo: 'isquios', mat: ['barbell'], nivel: 'avanzado', evitar: ['espalda_baja'] },

    // ---------- PIERNA · peso corporal ----------
    { id: 'puente_gluteo', db: '3013', nombre: 'Puente de glúteos', patron: 'pierna', grupo: 'gluteo', mat: [], nivel: 'principiante', dificil: 'puente_gluteo_1p' },
    { id: 'puente_gluteo_1p', db: '3645', nombre: 'Puente de glúteos a una pierna', patron: 'pierna', grupo: 'gluteo', mat: [], nivel: 'intermedio', facil: 'puente_gluteo' },
    { id: 'marcha_puente', db: '3561', nombre: 'Marcha en puente de glúteos', patron: 'pierna', grupo: 'gluteo', mat: [], nivel: 'principiante' },
    { id: 'sentadilla_split', db: '2368', nombre: 'Zancada estática', patron: 'pierna', grupo: 'cuadriceps', mat: [], nivel: 'principiante', dificil: 'zancada_caminando', evitar: ['rodilla'] },
    { id: 'zancada_caminando', db: '1460', nombre: 'Zancadas caminando', patron: 'pierna', grupo: 'cuadriceps', mat: [], nivel: 'intermedio', facil: 'sentadilla_split', evitar: ['rodilla'] },
    { id: 'sentadilla_curtsey', db: '3769', nombre: 'Sentadilla curtsey', patron: 'pierna', grupo: 'gluteo', mat: [], nivel: 'intermedio', evitar: ['rodilla'] },
    { id: 'gemelos_burro', db: '0284', nombre: 'Elevación de gemelos', patron: 'pierna', grupo: 'gemelo', mat: [], nivel: 'principiante', dificil: 'gemelos_1p' },
    { id: 'gemelos_1p', db: '1387', nombre: 'Elevación de gemelos a una pierna', patron: 'pierna', grupo: 'gemelo', mat: [], nivel: 'principiante', facil: 'gemelos_burro' },
    { id: 'sentadilla_sissy', db: '1489', nombre: 'Sentadilla sissy', patron: 'pierna', grupo: 'cuadriceps', mat: [], nivel: 'avanzado', evitar: ['rodilla'] },

    // ---------- PIERNA · mancuernas y kettlebell ----------
    { id: 'sentadilla_goblet', db: '1760', nombre: 'Sentadilla goblet', patron: 'pierna', grupo: 'cuadriceps', mat: ['dumbbell'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'sentadilla_mc', db: '0413', nombre: 'Sentadilla con mancuernas', patron: 'pierna', grupo: 'cuadriceps', mat: ['dumbbell'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'peso_muerto_rum_mc', db: '1459', nombre: 'Peso muerto rumano con mancuernas', patron: 'pierna', grupo: 'isquios', mat: ['dumbbell'], nivel: 'principiante', evitar: ['espalda_baja'] },
    { id: 'zancada_mc', db: '0336', nombre: 'Zancadas con mancuernas', patron: 'pierna', grupo: 'cuadriceps', mat: ['dumbbell'], nivel: 'intermedio', evitar: ['rodilla'] },
    { id: 'step_up_mc', db: '0431', nombre: 'Subida al cajón con mancuernas', patron: 'pierna', grupo: 'gluteo', mat: ['dumbbell'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'bulgara_mc', db: '0410', nombre: 'Sentadilla búlgara con mancuernas', patron: 'pierna', grupo: 'cuadriceps', mat: ['dumbbell'], nivel: 'intermedio', evitar: ['rodilla'] },
    { id: 'goblet_kb', db: '0534', nombre: 'Sentadilla goblet con kettlebell', patron: 'pierna', grupo: 'cuadriceps', mat: ['kettlebell'], nivel: 'principiante', evitar: ['rodilla'] },

    // ---------- PIERNA · bandas, barra y máquinas ----------
    { id: 'sentadilla_banda', db: '1004', nombre: 'Sentadilla con banda', patron: 'pierna', grupo: 'cuadriceps', mat: ['band'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'hip_lift_banda', db: '1408', nombre: 'Elevación de cadera con banda', patron: 'pierna', grupo: 'gluteo', mat: ['band'], nivel: 'principiante' },
    { id: 'step_up_banda', db: '1008', nombre: 'Subida al cajón con banda', patron: 'pierna', grupo: 'gluteo', mat: ['band'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'sentadilla_barra', db: '0043', nombre: 'Sentadilla con barra', patron: 'pierna', grupo: 'cuadriceps', mat: ['barbell'], nivel: 'avanzado', evitar: ['rodilla', 'espalda_baja'] },
    { id: 'peso_muerto_rum_barra', db: '0085', nombre: 'Peso muerto rumano con barra', patron: 'pierna', grupo: 'isquios', mat: ['barbell'], nivel: 'intermedio', evitar: ['espalda_baja'] },
    { id: 'hip_thrust_barra', db: '1409', nombre: 'Hip thrust con barra', patron: 'pierna', grupo: 'gluteo', mat: ['barbell'], nivel: 'intermedio' },
    { id: 'prensa_piernas', db: '2287', nombre: 'Prensa de piernas', patron: 'pierna', grupo: 'cuadriceps', mat: ['leverage machine'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'curl_femoral', db: '0586', nombre: 'Curl femoral tumbado', patron: 'pierna', grupo: 'isquios', mat: ['leverage machine'], nivel: 'principiante' },
    { id: 'ext_cuadriceps', db: '0585', nombre: 'Extensión de cuádriceps', patron: 'pierna', grupo: 'cuadriceps', mat: ['leverage machine'], nivel: 'principiante', evitar: ['rodilla'] },
    { id: 'gemelos_maquina', db: '0594', nombre: 'Elevación de gemelos sentado', patron: 'pierna', grupo: 'gemelo', mat: ['leverage machine'], nivel: 'principiante' },

    // ---------- CORE ----------
    { id: 'plancha_rodillas', db: '3239', nombre: 'Plancha de rodillas', patron: 'core', grupo: 'core', mat: [], nivel: 'principiante', tiempo: true, dificil: 'plancha' },
    { id: 'plancha', db: '0464', nombre: 'Plancha abdominal', patron: 'core', grupo: 'core', mat: [], nivel: 'principiante', tiempo: true, facil: 'plancha_rodillas', dificil: 'plancha_lateral', evitar: ['espalda_baja'] },
    { id: 'plancha_lateral', db: '3544', nombre: 'Plancha lateral', patron: 'core', grupo: 'core', mat: [], nivel: 'intermedio', tiempo: true, facil: 'plancha' },
    { id: 'dead_bug', db: '0276', nombre: 'Dead bug', patron: 'core', grupo: 'core', mat: [], nivel: 'principiante' },
    { id: 'crunch', db: '3201', nombre: 'Crunch abdominal', patron: 'core', grupo: 'core', mat: [], nivel: 'principiante', evitar: ['cuello'] },
    { id: 'crunch_inverso', db: '0872', nombre: 'Crunch inverso', patron: 'core', grupo: 'core', mat: [], nivel: 'principiante', evitar: ['espalda_baja'] },
    { id: 'giro_ruso', db: '0687', nombre: 'Giro ruso', patron: 'core', grupo: 'core', mat: [], nivel: 'intermedio', evitar: ['espalda_baja'] },
    { id: 'elev_piernas', db: '0620', nombre: 'Elevación de piernas tumbado', patron: 'core', grupo: 'core', mat: [], nivel: 'intermedio', evitar: ['espalda_baja'] },
    { id: 'escaladores', db: '0630', nombre: 'Escaladores', patron: 'core', grupo: 'core', mat: [], nivel: 'intermedio', evitar: ['muneca'] },
    { id: 'crunch_fitball', db: '1290', nombre: 'Crunch en fitball', patron: 'core', grupo: 'core', mat: ['stability ball'], nivel: 'principiante' },
    { id: 'rueda_abdominal', db: '0876', nombre: 'Rueda abdominal', patron: 'core', grupo: 'core', mat: ['wheel roller'], nivel: 'avanzado', evitar: ['espalda_baja'] }
  ];

  var CORE_BY_ID = (function () {
    var m = {};
    CORE_EXERCISES.forEach(function (e) { m[e.id] = e; });
    return m;
  })();

  // Prioridad del ejercicio dentro de su patrón. Sin esto el orden acababa
  // siendo alfabético y una sesión de pierna salía con gemelos y glúteo pero
  // sin ninguna sentadilla: los básicos tienen que ir primero.
  //   1 = básico (patrón principal, mueve mucha masa)
  //   2 = variante o secundario
  //   3 = accesorio o aislamiento
  var CORE_PRIMARY = {
    flexiones: 1, flex_rodillas: 1, flex_inclinadas: 1, flex_pared: 1, flex_declinadas: 1,
    press_banca_mc: 1, press_inclinado_mc: 1, press_banca_barra: 1, press_banda: 1,
    press_hombro_mc: 1, press_hombro_pie: 1, press_militar_barra: 1,
    remo_invertido: 1, remo_invertido_rod: 1, remo_mc: 1, remo_una_mano_mc: 1,
    remo_barra: 1, remo_banda: 1, jalon_polea: 1, remo_maquina: 1,
    dominadas: 1, dominadas_supinas: 1,
    sentadilla_goblet: 1, sentadilla_mc: 1, sentadilla_barra: 1, sentadilla_banda: 1,
    sentadilla_split: 1, zancada_caminando: 1, zancada_mc: 1, bulgara_mc: 1, goblet_kb: 1,
    peso_muerto_rum_mc: 1, peso_muerto_rum_barra: 1, peso_muerto_barra: 1,
    prensa_piernas: 1, hip_thrust_barra: 1, puente_gluteo: 1, puente_gluteo_1p: 1,
    plancha: 1, plancha_rodillas: 1
  };
  var CORE_ACCESSORY = {
    elev_laterales: 3, elev_lat_polea: 3, elev_frontal_banda: 3, y_raise_banda: 3,
    pajaro_mc: 3, remo_menton_mc: 3, encogimientos_mc: 3,
    curl_biceps_mc: 3, curl_martillo_mc: 3, curl_concentrado_mc: 3,
    ext_triceps_mc: 3, patada_triceps: 3, pushdown_polea: 3, flex_diamante: 3,
    fondos_banco: 3, fondos_triceps_bw: 3, aperturas_mc: 3,
    gemelos_burro: 3, gemelos_1p: 3, gemelos_maquina: 3,
    curl_femoral: 3, ext_cuadriceps: 3, marcha_puente: 3, retraccion_escapular: 3,
    crunch: 3, crunch_inverso: 3, giro_ruso: 3, elev_piernas: 3, escaladores: 3,
    crunch_fitball: 3, rueda_abdominal: 3, dead_bug: 3, plancha_lateral: 3,
    sentadilla_sissy: 3, sentadilla_curtsey: 3, step_up_mc: 3, step_up_banda: 3,
    hip_lift_banda: 3
  };
  CORE_EXERCISES.forEach(function (e) {
    e.prio = CORE_PRIMARY[e.id] ? 1 : (CORE_ACCESSORY[e.id] ? 3 : 2);
  });


  // Nombre legible de cada grupo. A nivel de módulo porque lo usan tanto el
  // generador como el validador y la capa explicativa.
  var GROUP_LABEL_G = {
    pecho: 'Pecho', hombro: 'Hombro', triceps: 'Tríceps', espalda: 'Espalda',
    biceps: 'Bíceps', cuadriceps: 'Cuádriceps', isquios: 'Isquiotibiales',
    gluteo: 'Glúteo', gemelo: 'Gemelo', core: 'Core'
  };

  // Grupos musculares canónicos por patrón, para el reparto de volumen
  var GROUPS_BY_PATTERN = {
    empuje: ['pecho', 'hombro', 'triceps'],
    tiron: ['espalda', 'biceps'],
    pierna: ['cuadriceps', 'isquios', 'gluteo', 'gemelo'],
    core: ['core']
  };

  // Patrón al que pertenece cada grupo. Sirve para sustituir un grupo sin
  // ejercicios disponibles por otro del mismo tren.
  var PATTERN_BY_GROUP = (function () {
    var m = {};
    Object.keys(GROUPS_BY_PATTERN).forEach(function (p) {
      GROUPS_BY_PATTERN[p].forEach(function (g) { m[g] = p; });
    });
    return m;
  })();

  var LEVEL_RANK = { principiante: 0, intermedio: 1, avanzado: 2 };

  // Ejercicios del núcleo que encajan con el inventario, el nivel y las zonas
  // a evitar. Es el único sitio donde se decide qué puede recetarse.
  function coreAvailable(inventory, level, avoid) {
    var maxRank = LEVEL_RANK[level] === undefined ? 1 : LEVEL_RANK[level];
    avoid = avoid || [];
    return CORE_EXERCISES.filter(function (e) {
      if (LEVEL_RANK[e.nivel] > maxRank) return false;
      for (var i = 0; i < (e.mat || []).length; i++) {
        if (!inventory[e.mat[i]]) return false;
      }
      for (var j = 0; j < avoid.length; j++) {
        if ((e.evitar || []).indexOf(avoid[j]) !== -1) return false;
      }
      return true;
    });
  }


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
      key: 'place', title: '¿Dónde vas a entrenar?', multi: false,
      hint: 'Con esto marcamos el material más habitual de ese sitio. En el paso siguiente lo ajustas a lo que tengas de verdad.',
      options: [
        { value: 'gimnasio', label: '🏢 En el gimnasio', desc: 'Máquinas, barras, poleas y mancuernas' },
        { value: 'casa', label: '🏠 En casa', desc: 'Con el material que tengas' },
        { value: 'sin_material', label: '🤸 Sin material', desc: 'Sólo peso corporal' }
      ]
    },
    {
      // Se pregunta SIEMPRE. Antes se saltaba en varios caminos y quien no lo
      // contestaba acababa sin ninguna restricción de material, que es como
      // salían mancuernas y máquinas a quien entrenaba en casa sin nada.
      key: 'gear', title: '¿Qué material tienes?', multi: true, pills: true,
      hint: 'Marca sólo lo que tengas de verdad. No se elegirá ningún ejercicio que necesite algo que no esté marcado (el peso corporal siempre entra).',
      options: GEAR_OPTIONS
    },
    {
      key: 'days', title: '¿Cuántos días por semana?',
      hint: 'Con más días se reparte mejor el trabajo y cada músculo se entrena más veces.',
      options: [
        { value: '2', label: '2 días', desc: 'Dos sesiones de cuerpo completo' },
        { value: '3', label: '3 días', desc: 'Cuerpo completo o Push · Pull · Legs' },
        { value: '4', label: '4 días', desc: 'Torso · Pierna, o PPL con día extra' },
        { value: '5', label: '5 días', desc: 'PPL más torso y pierna' },
        { value: '6', label: '6 días', desc: 'Push · Pull · Legs dos veces' }
      ]
    },
    {
      // Sólo se pregunta cuando hay más de un programa razonable para esos
      // días. Con 2 o 6 sólo existe una opción, así que preguntar sería ruido.
      key: 'split', title: '¿Qué tipo de entrenamiento prefieres?',
      hint: 'Los dos funcionan. Cambian en cuántas veces por semana entrenas cada músculo y en cómo de largas son las sesiones.',
      when: function (a) { return splitsForDays(a.days).length > 1; },
      dynamicOptions: function (a) {
        var rec = recommendedSplit(a);
        return splitsForDays(a.days).map(function (s) {
          return {
            value: s.id,
            label: (rec && s.id === rec.id ? '✅ ' : '') + s.name,
            desc: s.freqLabel + ' · ' + s.desc
              + (rec && s.id === rec.id ? '\nRecomendado para lo que has contestado.' : '')
          };
        });
      },
      options: []
    },
    {
      key: 'minutes', title: '¿Cuánto tiempo tienes por sesión?',
      hint: 'La sesión se construye para que quepa en ese rato, contando los descansos.',
      options: [
        { value: '30', label: '⏱️ 30 minutos', desc: 'Sesión corta y al grano' },
        { value: '45', label: '⏱️ 45 minutos', desc: 'Lo más habitual' },
        { value: '60', label: '⏱️ 60 minutos', desc: 'Sesión completa, sin prisa' },
        { value: '90', label: '⏱️ 90 minutos', desc: 'Mucho volumen por sesión' }
      ]
    },
    {
      // Se pregunta por tiempo entrenando y no por "tu nivel": casi todo el
      // mundo se sobreestima o se infravalora al responder lo segundo.
      key: 'level', title: '¿Cuánto llevas entrenando de forma seguida?',
      hint: 'Determina la dificultad técnica de los ejercicios que se proponen.',
      options: [
        { value: 'principiante', label: '🌱 Poco o nada', desc: 'Menos de 6 meses, o vuelvo después de un parón largo' },
        { value: 'intermedio', label: '💪 Entre 6 meses y 2 años', desc: 'Entreno con regularidad y controlo los básicos' },
        { value: 'avanzado', label: '⚡ Más de 2 años', desc: 'Técnica sólida en sentadilla, press y remo' }
      ]
    },
    {
      // Exclusión, no tratamiento: se quitan los movimientos que suelen dar
      // guerra en esa zona. La app no da indicaciones médicas.
      key: 'avoid', title: '¿Alguna zona que te moleste?', multi: true, pills: true,
      hint: 'Se evitarán los ejercicios que suelen cargar esa zona. Si tienes una lesión, consúltalo antes con un profesional.',
      options: [
        { value: 'rodilla', label: '🦵 Rodilla', desc: 'Evita sentadillas profundas y zancadas' },
        { value: 'hombro', label: '🤲 Hombro', desc: 'Evita press por encima de la cabeza y aperturas' },
        { value: 'espalda_baja', label: '🔙 Espalda baja', desc: 'Evita peso muerto y flexiones de tronco' },
        { value: 'muneca', label: '✋ Muñeca', desc: 'Evita apoyos con la mano abierta' },
        { value: 'codo', label: '💪 Codo', desc: 'Evita extensiones forzadas de tríceps' },
        { value: 'cuello', label: '🧣 Cuello', desc: 'Evita crunch con tracción de cuello' }
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
      // Sólo con 2 o 3 días de fuerza cabe la semana: con 4 o 5 no queda
      // hueco para las 3 sesiones de carrera sin sacrificar el descanso.
      // Antes sólo se preguntaba con 2 o 3 días: con más no cabían las 3
      // sesiones de carrera sin dejar la semana sin descanso, así que quien
      // pedía 4 días y decía que corría no recibía plan de carrera NI aviso
      // de por qué. Ahora se ofrece siempre, compactando la fuerza.
      key: 'runningPlan', title: '¿Quieres el plan de vuelta a correr?',
      hint: '12 semanas progresivas de carrera (readaptación, base y camino a los 10 km), en días distintos a los de fuerza.',
      when: function (a) { return a.running === 'si'; },
      dynamicOptions: function (a) {
        var compacta = compactionFor(a);
        return [
          { value: '', label: '🚫 No, gracias', desc: 'Sólo el bloque preventivo en las sesiones de pierna' },
          { value: 'si', label: '🏃 Sí, incluir el plan de carrera',
            desc: compacta
              ? 'En días propios. Tu fuerza se reagrupa en '
                + compacta.diasFuerza + ' días con sesiones más largas (unos '
                + compacta.minutosEstimados + ' min) para que quepa todo y te quede un día de descanso.'
              : 'En días propios, además de tus días de fuerza.' }
        ];
      },
      options: []
    },

    {
      key: 'runningDays', title: '¿Cuántos días corres a la semana?',
      hint: 'El plan está pensado para 3, que es lo que mejor readapta. Con menos avanzas más despacio, pero te deja más días para la fuerza.',
      when: function (a) { return a.running === 'si' && a.runningPlan === 'si'; },
      options: [
        { value: '1', label: '1 día', desc: 'Sólo el rodaje largo de cada semana' },
        { value: '2', label: '2 días', desc: 'El rodaje largo y una sesión corta' },
        { value: '3', label: '3 días', desc: 'El plan completo, como está diseñado' }
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

  // =============================================
  // CATÁLOGO DE PROGRAMAS (SPLITS)
  // =============================================
  // Antes esto era un reparto de PATRONES por sesión y el generador rellenaba
  // un hueco por patrón. Eso producía rutinas incoherentes: días de pierna sin
  // cuádriceps (los huecos 'pierna' se iban a glúteo e isquios) y tríceps en
  // el día de tirón (el hueco 'brazos' caía a tríceps si el bíceps ya estaba).
  //
  // Ahora cada sesión declara GRUPOS MUSCULARES:
  //   required  tienen que aparecer sí o sí → garantiza la cobertura
  //   optional  se añaden si sobra tiempo y les falta volumen semanal
  //
  // Que un grupo no esté listado en un día es lo que impide la contaminación
  // cruzada: el tríceps sólo existe en sesiones de empuje.
  var SPLIT_CATALOG = [
    {
      id: 'fullbody2', name: 'Cuerpo completo', days: 2, freq: 2, freqLabel: '2× por músculo',
      desc: 'Cada sesión trabaja todo el cuerpo. Con dos días es lo que más estímulo da por músculo.',
      why: 'Con dos días a la semana, repartir por zonas dejaría cada músculo entrenado una sola vez. Trabajando todo el cuerpo en cada sesión, cada grupo recibe estímulo dos veces.',
      sessions: [
        { day: 'Cuerpo completo A', emoji: '🔥', required: ['cuadriceps', 'pecho', 'espalda'], optional: ['hombro', 'core', 'gluteo'] },
        { day: 'Cuerpo completo B', emoji: '💪', required: ['isquios', 'espalda', 'pecho'], optional: ['biceps', 'triceps', 'core'] }
      ]
    },
    {
      id: 'fullbody3', name: 'Cuerpo completo', days: 3, freq: 3, freqLabel: '3× por músculo',
      desc: 'Todo el cuerpo en cada sesión. Máxima frecuencia, sesiones más variadas.',
      why: 'Entrenar cada músculo tres veces por semana reparte mejor el volumen y ayuda a asentar la técnica, porque repites los mismos movimientos más a menudo.',
      sessions: [
        { day: 'Cuerpo completo A', emoji: '🔥', required: ['cuadriceps', 'pecho', 'espalda'], optional: ['hombro', 'core'] },
        { day: 'Cuerpo completo B', emoji: '💪', required: ['isquios', 'espalda', 'hombro'], optional: ['biceps', 'core'] },
        { day: 'Cuerpo completo C', emoji: '🦵', required: ['gluteo', 'pecho', 'espalda'], optional: ['triceps', 'gemelo', 'core'] }
      ]
    },
    {
      id: 'ppl', name: 'Push · Pull · Legs', days: 3, freq: 1, freqLabel: '1× por músculo',
      desc: 'Empuje, tirón y pierna en días separados. Sesiones más largas y centradas.',
      why: 'Separar empuje, tirón y pierna hace que cada grupo llegue descansado a su día y puedas cargar más. A cambio, cada músculo se entrena una vez por semana.',
      sessions: [
        { day: 'Empuje', emoji: '🔥', required: ['pecho', 'hombro'], optional: ['triceps'] },
        { day: 'Tirón', emoji: '💪', required: ['espalda'], optional: ['biceps', 'core'] },
        { day: 'Pierna', emoji: '🦵', required: ['cuadriceps', 'isquios'], optional: ['gluteo', 'gemelo', 'core'] }
      ]
    },
    {
      id: 'upper_lower', name: 'Torso · Pierna', days: 4, freq: 2, freqLabel: '2× por músculo',
      desc: 'Dos días de tren superior y dos de tren inferior.',
      why: 'Con cuatro días, alternar torso y pierna deja a cada músculo entrenado dos veces por semana con descanso de sobra entre sesiones.',
      sessions: [
        { day: 'Torso A', emoji: '🔥', required: ['pecho', 'espalda'], optional: ['hombro', 'triceps'] },
        { day: 'Pierna A', emoji: '🦵', required: ['cuadriceps', 'gluteo'], optional: ['gemelo', 'core'] },
        { day: 'Torso B', emoji: '💪', required: ['espalda', 'hombro'], optional: ['pecho', 'biceps'] },
        { day: 'Pierna B', emoji: '🦿', required: ['isquios', 'cuadriceps'], optional: ['gluteo', 'core'] }
      ]
    },
    {
      id: 'ppl_torso', name: 'Push · Pull · Legs + Torso', days: 4, freq: 1.3, freqLabel: '~1,3× por músculo',
      desc: 'El reparto clásico de tres días más una sesión extra de torso.',
      why: 'Mantiene la separación de empuje, tirón y pierna, y añade un cuarto día de torso para subir el volumen de pecho y espalda, que suelen ser la prioridad.',
      sessions: [
        { day: 'Empuje', emoji: '🔥', required: ['pecho', 'hombro'], optional: ['triceps'] },
        { day: 'Tirón', emoji: '💪', required: ['espalda'], optional: ['biceps', 'core'] },
        { day: 'Pierna', emoji: '🦵', required: ['cuadriceps', 'isquios'], optional: ['gluteo', 'gemelo'] },
        { day: 'Torso', emoji: '🎯', required: ['pecho', 'espalda'], optional: ['hombro', 'biceps', 'triceps', 'core'] }
      ]
    },
    {
      id: 'ppl_ul', name: 'Push · Pull · Legs + Torso/Pierna', days: 5, freq: 1.6, freqLabel: '~1,6× por músculo',
      desc: 'Tres días de PPL y dos más de torso y pierna.',
      why: 'Cinco días permiten volver a cada músculo casi dos veces por semana sin sesiones interminables. Es el reparto que mejor aprovecha ese número de días.',
      sessions: [
        { day: 'Empuje', emoji: '🔥', required: ['pecho', 'hombro'], optional: ['triceps'] },
        { day: 'Tirón', emoji: '💪', required: ['espalda'], optional: ['biceps', 'core'] },
        { day: 'Pierna', emoji: '🦵', required: ['cuadriceps', 'isquios'], optional: ['gluteo', 'gemelo'] },
        { day: 'Torso', emoji: '🎯', required: ['pecho', 'espalda'], optional: ['hombro', 'biceps', 'triceps'] },
        { day: 'Pierna y core', emoji: '🦿', required: ['gluteo', 'cuadriceps'], optional: ['isquios', 'gemelo', 'core'] }
      ]
    },
    {
      id: 'ppl2', name: 'Push · Pull · Legs ×2', days: 6, freq: 2, freqLabel: '2× por músculo',
      desc: 'El reparto de tres días, repetido dos veces por semana.',
      why: 'Repetir el ciclo dos veces da frecuencia doble en cada músculo manteniendo sesiones cortas. Es exigente: requiere poder entrenar seis días.',
      sessions: [
        { day: 'Empuje A', emoji: '🔥', required: ['pecho', 'hombro'], optional: ['triceps'] },
        { day: 'Tirón A', emoji: '💪', required: ['espalda'], optional: ['biceps', 'core'] },
        { day: 'Pierna A', emoji: '🦵', required: ['cuadriceps', 'isquios'], optional: ['gluteo', 'gemelo'] },
        { day: 'Empuje B', emoji: '🔥', required: ['hombro', 'pecho'], optional: ['triceps', 'core'] },
        { day: 'Tirón B', emoji: '💪', required: ['espalda'], optional: ['biceps', 'core'] },
        { day: 'Pierna B', emoji: '🦿', required: ['gluteo', 'cuadriceps'], optional: ['isquios', 'gemelo'] }
      ]
    }
  ];

  function splitsForDays(days) {
    return SPLIT_CATALOG.filter(function (s) { return String(s.days) === String(days); });
  }

  function getSplitById(id) {
    for (var i = 0; i < SPLIT_CATALOG.length; i++) {
      if (SPLIT_CATALOG[i].id === id) return SPLIT_CATALOG[i];
    }
    return null;
  }

  // Programa recomendado para unas respuestas. Regla: a más frecuencia por
  // músculo mejor, salvo en fuerza, donde interesa concentrar la carga en
  // sesiones más pesadas y con más descanso entre ellas.
  function recommendedSplit(answers) {
    var opts = splitsForDays(answers.days);
    if (!opts.length) return null;
    var goals = answerList(answers, 'goal');
    var priorizaFuerza = goals[0] === 'fuerza';
    var best = opts[0];
    opts.forEach(function (s) {
      // La frecuencia es un dato declarado en el catálogo, no algo deducido
      // contando apariciones en `required`: esa cuenta engañaba y llegó a
      // recomendar PPL+Torso (1,3×) por encima de Torso·Pierna (2×).
      //
      // Para hipertrofia y tono gana la frecuencia alta; en fuerza interesa
      // concentrar la carga en menos sesiones, más pesadas.
      var mejor = priorizaFuerza ? (s.freq < best.freq) : (s.freq > best.freq);
      if (mejor && s !== best) best = s;
    });
    return best;
  }

  // Resuelve el programa de un plan: el elegido, o el recomendado si no hay
  // elección (planes antiguos, o números de días con una sola opción).
  // El split guardado sólo vale si sigue siendo de los días que se piden ahora.
  //
  // Sin esta comprobación, cambiar los días sin tocar el split dejaba pegado el
  // anterior: pedir 5 días partiendo de un plan de 3 daba un «Cuerpo completo»
  // de 3 sesiones rotando sobre 5 días, o sea cada músculo entrenado bastante
  // más de lo que marcan los objetivos de volumen. Pasaba al ajustar desde el
  // coach, que cambia `days` y no toca `split`.
  function resolveSplit(answers) {
    var guardado = getSplitById(answers.split);
    if (guardado && String(guardado.days) === String(answers.days)) return guardado;
    return recommendedSplit(answers) || splitsForDays(answers.days)[0] || splitsForDays('3')[0];
  }

  // =============================================
  // COMPACTAR LA FUERZA PARA DEJAR SITIO A LA CARRERA
  // =============================================
  // El plan de vuelta a correr son 3 sesiones semanales en días propios. Con 3
  // días de fuerza sale justo (6 días + 1 de descanso); con 4 o más serían 7 y
  // te quedarías sin descanso, que es justo lo peor cuando vuelves de una
  // lesión.
  //
  // En vez de negar el plan de carrera, se REAGRUPA la fuerza en 3 días con
  // sesiones más largas. Como el eje del generador es el volumen SEMANAL, el
  // total de series se mantiene: sólo cambia el reparto. Lo que sí cambia es
  // la duración de cada sesión, y por eso se avisa antes de generar nada.
  // Tope de días ocupados en la semana. El séptimo es descanso, y con una
  // vuelta a correr eso no se negocia.
  var MAX_DIAS_SEMANA = 6;

  // Cuántas sesiones de carrera por semana. Era una constante escondida: el
  // plan siempre metía 3 y la única alternativa era quitarlo entero. Quien
  // pedía «1 día de running» acababa con CERO, porque el modelo sólo podía
  // elegir entre las dos únicas opciones que existían.
  function runningDaysOf(answers) {
    if (answers.running !== 'si' || answers.runningPlan !== 'si') return 0;
    var n = parseInt(answers.runningDays, 10);
    if (!n || n < 1 || n > 3) return 3;   // por defecto, el plan completo
    return n;
  }

  // Días de fuerza que caben junto a la carrera, dejando el descanso.
  function strengthCapFor(answers) {
    return Math.max(2, MAX_DIAS_SEMANA - runningDaysOf(answers));
  }

  function compactionFor(answers) {
    if (answers.running !== 'si') return null;
    var cap = strengthCapFor(answers);
    var pedidos = parseInt(answers.days, 10) || 3;
    if (pedidos <= cap) return null;

    var factor = pedidos / cap;
    var goals = answerList(answers, 'goal');
    var scheme = GOAL_SCHEME[goals[0]] || GOAL_SCHEME.hipertrofia;
    var restSec = parseRestSeconds(scheme[0].rest) || 60;
    var perExercise = exerciseMinutes(scheme[0].series, restSec);
    var minutos = parseInt(answers.minutes, 10) || 45;
    var base = Math.max(3, Math.min(9, Math.floor(Math.max(minutos - 6, 10) / perExercise)));
    var ampliado = Math.max(3, Math.min(9, Math.round(base * factor)));

    // El bloque preventivo para corredores suma 2 ejercicios cortos (2 series,
    // 45 s de descanso) a las sesiones con trabajo de pierna. Si no se cuentan,
    // la duración anunciada se queda unos 6 minutos corta.
    var preventivos = 2 * exerciseMinutes(2, 45);

    return {
      diasPedidos: pedidos,
      diasFuerza: cap,
      diasCarrera: runningDaysOf(answers),
      maxExercises: ampliado,
      minutosEstimados: Math.round(ampliado * perExercise + preventivos + 6)
    };
  }

  // Días de la semana por defecto según cuántas sesiones tenga la rutina.
  var DEFAULT_DAYS_BY_COUNT = { 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6] };

  // =============================================
  // VOLUMEN SEMANAL OBJETIVO
  // =============================================
  // El eje del generador. Antes se rellenaban N huecos y el volumen salía de
  // rebote: pecho y espalda acababan con 3 series semanales (la referencia
  // para hipertrofia son 10-20) mientras el core llegaba a 9-21 porque cada
  // sesión añadía un hueco de core automático.
  //
  // Series por grupo y semana. Los grupos grandes aguantan (y necesitan) más
  // volumen que los pequeños.
  var BIG_GROUPS = { pecho: 1, espalda: 1, cuadriceps: 1, isquios: 1, gluteo: 1 };

  var VOLUME_TARGETS = {
    hipertrofia:  { grande: { principiante: 9, intermedio: 13, avanzado: 16 },
                    pequeno: { principiante: 6, intermedio: 9, avanzado: 12 } },
    fuerza:       { grande: { principiante: 6, intermedio: 9, avanzado: 12 },
                    pequeno: { principiante: 4, intermedio: 6, avanzado: 8 } },
    tono:         { grande: { principiante: 8, intermedio: 11, avanzado: 14 },
                    pequeno: { principiante: 6, intermedio: 8, avanzado: 10 } },
    perder_peso:  { grande: { principiante: 8, intermedio: 11, avanzado: 14 },
                    pequeno: { principiante: 6, intermedio: 8, avanzado: 10 } },
    movilidad:    { grande: { principiante: 6, intermedio: 8, avanzado: 10 },
                    pequeno: { principiante: 4, intermedio: 6, avanzado: 8 } }
  };

  // El core es un grupo pequeño más y tiene su propio techo: dejó de añadirse
  // automáticamente en cada sesión, que es lo que lo convertía en el músculo
  // más entrenado del programa.
  function volumeTargetFor(grupo, answers) {
    var goals = answerList(answers, 'goal');
    var goal = goals[0] || 'hipertrofia';
    var t = VOLUME_TARGETS[goal] || VOLUME_TARGETS.hipertrofia;
    var level = answers.level || 'principiante';
    var tabla = BIG_GROUPS[grupo] ? t.grande : t.pequeno;
    return tabla[level] || tabla.principiante;
  }

  var GOAL_VOLUME_RATIONALE = {
    hipertrofia: 'Para ganar masa muscular hacen falta entre 10 y 20 series por músculo y semana. Por debajo de ese rango apenas hay estímulo para crecer.',
    fuerza: 'En fuerza importa más la carga que el volumen: menos series, más peso y descansos largos para levantar al máximo en cada una.',
    tono: 'Series algo más altas y descansos cortos: buscas trabajo continuo y resistencia muscular más que ganar tamaño.',
    perder_peso: 'Mucho trabajo con poco descanso para mantener el gasto alto, conservando el músculo mientras pierdes grasa.',
    movilidad: 'Volumen moderado y control del movimiento: el objetivo es la calidad y el rango, no acumular series.'
  };

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
  var PHASE_NAMES = [
    { name: 'Mes 1 · Adaptación', subtitle: 'Semanas 1 a 4 — Aprende la técnica', weeks: [1, 2, 3, 4] },
    { name: 'Mes 2 · Progresión', subtitle: 'Semanas 5 a 8 — Sube la carga', weeks: [5, 6, 7, 8] },
    { name: 'Mes 3 · Intensidad', subtitle: 'Semanas 9 a 12 — Máxima exigencia', weeks: [9, 10, 11, 12] }
  ];

  // Minutos estimados de un ejercicio: series × (trabajo + descanso). Sirve
  // para construir la sesión por tiempo en vez de por número de ejercicios,
  // que era lo que obligaba a cuadrar los 30 minutos a mano.
  function exerciseMinutes(series, restSec) {
    return (series * (40 + restSec)) / 60;
  }

  // Aquí vivían candidatesFor(), exerciseCountFor(), sessionMinutes(),
  // allowedEquipment(), effectivePlace() y slotCandidates(). Las cinco
  // primeras eran restos del generador anterior (el que recorría el dataset
  // completo) y no se llamaban desde ningún sitio; candidatesFor() en
  // concreto eran 45 líneas con puntuación y ordenación que parecían el
  // corazón del algoritmo. slotCandidates() sí se usaba, pero la sustituye el
  // mapa de grupos por sesión de SPLIT_CATALOG.

  // Construye la rutina completa a partir de las respuestas del tutorial.
  // Devuelve null si el núcleo no da ni para llenar una sesión.
  function generateRoutine(answers) {
    answers = normalizeAnswers(answers);
    var inventory = getInventory(answers);
    var level = answers.level || 'principiante';
    var avoid = answerList(answers, 'avoid');
    var pool = coreAvailable(inventory, level, avoid);
    if (!pool.length) return null;

    // Con el plan de carrera, la fuerza se reagrupa si no cabe junto a las
    // sesiones de carrera dejando un día de descanso (ver compactionFor). El
    // tope depende de cuántas carreras haya: con 3 caben 3 días de fuerza, con
    // 1 caben 5.
    var nRun = runningDaysOf(answers);
    var compacta = nRun ? compactionFor(answers) : null;

    // Al compactar se prefiere Push · Pull · Legs y no el de más frecuencia.
    // Con cuerpo completo habría pierna en todas las sesiones, y sumado a los
    // días de carrera el tren inferior no descansaría nunca — justo lo que hay
    // que evitar en una vuelta a correr. PPL concentra la pierna en un día.
    var splitDef;
    if (compacta) {
      var cap = compacta.diasFuerza;
      var elegido = getSplitById(answers.split);
      splitDef = (elegido && elegido.days === cap)
        ? elegido
        : (recommendedSplit({ days: String(cap), goal: answers.goal })
           || getSplitById('ppl'));
    } else {
      splitDef = resolveSplit(answers);
    }
    var split = splitDef.sessions;
    var goals = answerList(answers, 'goal');
    if (!goals.length) goals = ['hipertrofia'];
    // Con varios objetivos manda el primero que se marcó para las series y
    // repeticiones: mezclar esquemas daría un progreso incoherente.
    var scheme = GOAL_SCHEME[goals[0]] || GOAL_SCHEME.hipertrofia;
    var minutes = parseInt(answers.minutes, 10) || 45;

    var byGroup = {};
    pool.forEach(function (e) {
      (byGroup[e.grupo] = byGroup[e.grupo] || []).push(e);
    });

    // Ordena cada lista poniendo delante lo que encaja con el nivel exacto, y
    // rota con el seed para que regenerar proponga algo distinto.
    // Si ha declarado material, se prefiere lo cargado para los huecos
    // principales: quien va al gimnasio espera press de banca, no flexiones.
    var hasKit = Object.keys(inventory).length > 1;
    Object.keys(byGroup).forEach(function (g) {
      byGroup[g].sort(function (a, b) {
        // Los básicos primero: son los que sostienen la sesión
        if (a.prio !== b.prio) return a.prio - b.prio;
        if (hasKit) {
          var am = (a.mat && a.mat.length) ? 0 : 1, bm = (b.mat && b.mat.length) ? 0 : 1;
          if (am !== bm) return am - bm;
        }
        var an = a.nivel === level ? 0 : 1, bn = b.nivel === level ? 0 : 1;
        if (an !== bn) return an - bn;
        return a.nombre.localeCompare(b.nombre);
      });
      if (wizardShuffleSeed && byGroup[g].length > 1) {
        var off = wizardShuffleSeed % byGroup[g].length;
        byGroup[g] = byGroup[g].slice(off).concat(byGroup[g].slice(0, off));
      }
    });

    var usedGlobal = {};   // evita repetir el mismo ejercicio en toda la rutina
    var picks = [];
    var restSec = parseRestSeconds(scheme[0].rest) || 60;
    var seriesPorEjercicio = scheme[0].series;
    var perExercise = exerciseMinutes(seriesPorEjercicio, restSec);
    // Calentamiento y transiciones se llevan un pellizco del tiempo declarado
    var usableMinutes = Math.max(minutes - 6, 10);
    // Tope de seguridad: sin él, 90 minutos podrían generar sesiones
    // interminables si el volumen objetivo no se alcanza nunca.
    // Al compactar se amplía a propósito por encima del tiempo declarado: son
    // menos sesiones pero más largas, y se avisa antes de generar.
    var maxExercises = compacta
      ? compacta.maxExercises
      : Math.max(3, Math.min(9, Math.floor(usableMinutes / perExercise)));

    // Series acumuladas por grupo en TODA la semana. Es la variable que
    // gobierna el relleno: se prioriza siempre el grupo más lejos de su meta.
    var weeklySets = {};
    function faltaPara(grupo) {
      return volumeTargetFor(grupo, answers) - (weeklySets[grupo] || 0);
    }

    // Primer candidato disponible de un grupo, evitando lo ya usado.
    // `permitirRepetirGlobal` sólo se activa para los grupos obligatorios: es
    // preferible repetir un ejercicio entre días que dejar sin cubrir el
    // cuádriceps en el día de pierna.
    function elegir(grupo, enSesion, permitirRepetirGlobal) {
      var lista = byGroup[grupo] || [];
      var fallback = null;
      for (var i = 0; i < lista.length; i++) {
        var e = lista[i];
        if (enSesion.indexOf(e) !== -1) continue;     // nunca dos veces el mismo día
        if (usedGlobal[e.id]) { if (!fallback) fallback = e; continue; }
        return e;
      }
      return permitirRepetirGlobal ? fallback : null;
    }

    function registrar(e, chosen) {
      usedGlobal[e.id] = 1;
      weeklySets[e.grupo] = (weeklySets[e.grupo] || 0) + seriesPorEjercicio;
      chosen.push(e);
    }

    split.forEach(function (session) {
      var chosen = [];

      // a) Obligatorios: cubren los grupos que definen la sesión. Sin esto
      //    salían días de pierna sin nada de cuádriceps.
      session.required.forEach(function (grupo) {
        if (chosen.length >= maxExercises) return;
        var e = elegir(grupo, chosen, true);
        // Si ese grupo no tiene NINGÚN ejercicio posible (quien evita la
        // rodilla se queda sin cuádriceps: todos lo cargan), se sustituye por
        // otro del mismo patrón antes que perder el tren inferior entero.
        // Rodilla delicada no significa no entrenar pierna, significa
        // entrenar glúteo e isquios.
        if (!e) {
          var patron = PATTERN_BY_GROUP[grupo];
          (GROUPS_BY_PATTERN[patron] || []).some(function (alt) {
            if (alt === grupo) return false;
            var s = elegir(alt, chosen, false);
            if (s) { e = s; return true; }
            return false;
          });
        }
        if (e) registrar(e, chosen);
      });

      // b) Relleno por volumen: mientras quepa en el tiempo declarado, se
      //    añade al grupo que más lejos esté de su objetivo semanal. Esto es
      //    lo que hace que declarar 90 minutos sirva de algo — antes 45, 60 y
      //    90 producían exactamente la misma rutina.
      var candidatos = session.required.concat(session.optional || []);
      // El foco prioritario sube al grupo elegido dentro de esta sesión
      var focoGrupos = GROUPS_BY_PATTERN[answers.focus] || [];

      while (chosen.length < maxExercises) {
        var mejorGrupo = null, mejorFalta = 0;
        candidatos.forEach(function (g) {
          var falta = faltaPara(g);
          if (focoGrupos.indexOf(g) !== -1) falta += 3;   // prioriza la zona elegida
          // Se probó a desempatar por quien menos series lleva, pero empeoró
          // el reparto (más desequilibrios en el self-test, no menos): al
          // repartir por igual entre grupos con la misma falta, ninguno
          // llegaba a su objetivo. Se deja el orden de la lista como criterio.
          if (falta > mejorFalta) { mejorFalta = falta; mejorGrupo = g; }
        });
        if (!mejorGrupo) break;                 // todos han llegado a su meta

        var extra = elegir(mejorGrupo, chosen, false);
        if (!extra) {
          // Sin candidatos nuevos para ese grupo: se descarta de esta sesión
          // para no quedarse dando vueltas eligiéndolo una y otra vez.
          candidatos = candidatos.filter(function (g) { return g !== mejorGrupo; });
          if (!candidatos.length) break;
          continue;
        }
        registrar(extra, chosen);
      }

      picks.push(chosen);
    });

    if (!picks.length || !picks[0].length) return null;

    // Bloque preventivo para corredores (paso "¿Corres?"). Se añade al final
    // de las sesiones que tocan pierna, sumando: no quita nada de la sesión,
    // porque este trabajo es de prevención y no sustituye a la carga.
    var preventive = [];
    if (answers.running === 'si') {
      var rrPool = RUNNING_RECOVERY.filter(function (it) {
        if (!it.db && !it.recordId) return false;
        var rec = EXERCISE_DB.get(it.recordId || it.db);
        return rec ? canPerform(rec, inventory) : false;
      });
      var cursor = wizardShuffleSeed % (rrPool.length || 1);
      split.forEach(function (session, sIdx) {
        // Las sesiones ya no declaran patrones sino grupos musculares: se
        // considera día de pierna el que trabaje alguno del tren inferior.
        var gruposSesion = session.required.concat(session.optional || []);
        var esPierna = (GROUPS_BY_PATTERN.pierna || []).some(function (g) {
          return gruposSesion.indexOf(g) !== -1;
        });
        if (!esPierna) { preventive[sIdx] = []; return; }
        // Evita repetir el mismo ejercicio con lo ya elegido en la sesión.
        // La identidad real es el id del dataset (db/recordId): el núcleo y
        // el bloque de prevención son catálogos distintos que a veces
        // apuntan al mismo ejercicio con nombres casi iguales (p.ej.
        // "Puente de glúteos" en pierna y en prevención comparten db '3013').
        // Comparar sólo por nombre no lo detectaría de forma fiable, así que
        // se usa el id del dataset como clave y el nombre en minúsculas como
        // respaldo para las entradas sin db (foam roller, etc.).
        var used = {};
        (picks[sIdx] || []).forEach(function (e) {
          if (e.db) used['db:' + e.db] = 1;
          used['name:' + e.nombre.toLowerCase()] = 1;
        });
        var take = [];
        var tries = 0;
        while (take.length < 2 && tries < rrPool.length) {
          var candidate = rrPool[cursor % rrPool.length];
          cursor++;
          tries++;
          var dbKey = (candidate.recordId || candidate.db) ? 'db:' + (candidate.recordId || candidate.db) : null;
          var nameKey = 'name:' + candidate.name.toLowerCase();
          if ((dbKey && used[dbKey]) || used[nameKey]) continue;
          if (take.indexOf(candidate) !== -1) continue;
          if (dbKey) used[dbKey] = 1;
          used[nameKey] = 1;
          take.push(candidate);
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

    var GROUP_LABEL = GROUP_LABEL_G;

    // Plan de vuelta a correr combinado: los días de carrera no llevan
    // ejercicios propios, se resuelven en runtime contra RUNNING_PLAN por
    // semana (getRunningSession), igual que en el plan de Sergio. Por eso el
    // mismo runIdx 0/1/2 se repite en las tres fases sin cambiar nada.
    function runningDay(idx) {
      var largo = idx === 2;
      return {
        id: 'gen_run' + idx,
        day: largo ? 'Carrera larga' : 'Carrera',
        emoji: largo ? '🏃‍♂️' : '🏃',
        title: largo ? 'Rodaje largo de la semana' : 'Sesión de carrera',
        type: 'running', runIdx: idx, exercises: []
      };
    }

    // Qué sesiones del plan se quedan cuando no se corren las 3. El rodaje
    // largo (índice 2) es el que sostiene la base aeróbica, así que es el
    // último en caerse: con 1 sesión se corre ésa, con 2 se añade la primera.
    var SESIONES_CARRERA = { 1: [2], 2: [0, 2], 3: [0, 1, 2] };

    // Reparto de la semana. Antes era una tabla fija de dos entradas porque
    // las carreras siempre eran 3; ahora se calcula, que es lo que permite
    // pedir 1 o 2. Las carreras se colocan lo más separadas posible entre las
    // sesiones de fuerza, y siempre queda al menos un día de descanso.
    //
    // Con 3 días de fuerza y 3 de carrera sale S·R·S·R·S·R, que es exactamente
    // el reparto que había antes escrito a mano.
    function repartoSemanal(nStrength, nRun) {
      var total = nStrength + nRun;
      var weekdays = DEFAULT_DAYS_BY_COUNT[total];
      if (!weekdays || nRun < 1) return null;

      var esCarrera = {};
      for (var k = 0; k < nRun; k++) {
        esCarrera[Math.floor((k + 0.5) * total / nRun)] = true;
      }
      var pattern = [];
      for (var i = 0; i < total; i++) pattern.push(esCarrera[i] ? 'R' : 'S');

      // El redondeo puede dejar dos carreras en la misma posición si los
      // números no cuadran; se completa por el final para no perder ninguna.
      var faltan = nRun - pattern.filter(function (p) { return p === 'R'; }).length;
      for (var j = total - 1; j >= 0 && faltan > 0; j--) {
        if (pattern[j] === 'S') { pattern[j] = 'R'; faltan--; }
      }
      return { weekdays: weekdays.slice(), pattern: pattern };
    }

    var runningCombo = repartoSemanal(split.length, nRun);
    var idxCarrera = SESIONES_CARRERA[nRun] || SESIONES_CARRERA[3];

    function combineWithRunning(strengthDays) {
      if (!runningCombo) return strengthDays;
      var sIdx = 0, rIdx = 0;
      return runningCombo.pattern.map(function (p) {
        return p === 'S' ? strengthDays[sIdx++] : runningDay(idxCarrera[rIdx++]);
      });
    }

    // Progresión de peso corporal: quien entrena sin material no puede "subir
    // el peso", así que en las fases 2 y 3 se pasa a la variante más difícil
    // de la cadena facil/dificil (flexiones en pared → de rodillas → normales).
    // Los ejercicios con material progresan añadiendo carga, así que no se
    // tocan. Estas cadenas llevaban declaradas 29 ejercicios sin que nada las
    // leyera.
    // Ojo con el nivel: progresar a la variante difícil ES subir de nivel, así
    // que este pool NO se filtra por el nivel actual del usuario (si no, un
    // principiante nunca llegaría a «Flexiones», que son intermedio, y la
    // progresión no existiría). Material y lesiones sí se siguen respetando:
    // esas son restricciones duras, no cosas que se superen entrenando.
    var disponibles = {};
    coreAvailable(inventory, 'avanzado', avoid).forEach(function (e) { disponibles[e.id] = e; });

    function progresar(e, phaseIdx) {
      if (phaseIdx === 0) return e;
      if (e.mat && e.mat.length) return e;         // con material se sube peso
      var actual = e;
      for (var paso = 0; paso < phaseIdx; paso++) {
        var sig = actual.dificil ? disponibles[actual.dificil] : null;
        // disponibles ya está filtrado por nivel, material y lesiones: si la
        // variante dura no encaja con el usuario, se queda como está.
        if (!sig) break;
        actual = sig;
      }
      return actual;
    }

    // Título de la sesión a partir de los grupos que trabaja de verdad, en vez
    // de un texto fijo que podía no corresponderse con lo elegido.
    function tituloSesion(sIdx) {
      var vistos = [], lista = picks[sIdx] || [];
      lista.forEach(function (e) {
        var l = GROUP_LABEL[e.grupo] || e.grupo;
        if (vistos.indexOf(l) === -1) vistos.push(l);
      });
      return vistos.join(' · ') || 'Sesión';
    }

    // Una fase por bloque de 4 semanas: mismos huecos, más carga y, en peso
    // corporal, variantes más difíciles.
    var phases = PHASE_NAMES.map(function (ph, phaseIdx) {
      var sc = scheme[phaseIdx];
      var strengthDays = split.map(function (session, sIdx) {
        return {
          id: 'gen_d' + sIdx,
          day: session.day,
          emoji: session.emoji,
          title: tituloSesion(sIdx),
          exercises: (picks[sIdx] || []).map(function (base) {
            var e = progresar(base, phaseIdx);
            var rec = EXERCISE_DB.get(e.db);
            var timed = !!e.tiempo;
            return {
              id: 'gen_' + e.id,
              dbId: e.db,
              coreId: e.id,
              name: e.nombre,
              muscle: GROUP_LABEL[e.grupo] || e.grupo,
              series: sc.series,
              reps: timed ? (20 + phaseIdx * 10) + ' seg' : sc.reps,
              repsMin: timed ? 20 + phaseIdx * 10 : sc.repsMin,
              repsMax: timed ? 20 + phaseIdx * 10 : sc.repsMax,
              rest: sc.rest,
              isTimed: timed,
              focus: (rec && rec.es && rec.es.length ? rec.es[0] : 'Movimiento controlado en todo el recorrido.'),
              weightHint: (e.mat && e.mat.length) ? 'Ajusta el peso a tu nivel' : 'Peso corporal'
            };
          }).concat((preventive[sIdx] || []).map(preventiveExercise))
        };
      });
      return {
        id: 'fase' + (phaseIdx + 1),
        name: ph.name,
        subtitle: ph.subtitle,
        weeks: ph.weeks.slice(),
        days: combineWithRunning(strengthDays)
      };
    });

    // Días de la semana que va a ocupar el plan de verdad. Con carrera los
    // manda el patrón combinado (fuerza + las carreras que haya), no el número
    // de días de fuerza que se pidió.
    var diasReales = runningCombo
      ? runningCombo.weekdays
      : (DEFAULT_DAYS_BY_COUNT[answers.days] || [1, 3, 5]);

    // Objetivo semanal alcanzado por el plan, para poder explicárselo al
    // usuario sin recalcularlo en cada render.
    var volumePlan = {};
    Object.keys(weeklySets).forEach(function (g) {
      volumePlan[g] = { sets: weeklySets[g], target: volumeTargetFor(g, answers) };
    });

    return {
      version: 3,
      createdAt: getTodayKey(),
      answers: answers,
      phases: phases,
      splitId: splitDef.id,
      splitName: splitDef.name,
      splitWhy: splitDef.why,
      freqLabel: splitDef.freqLabel,
      volume: volumePlan,
      volumeWhy: GOAL_VOLUME_RATIONALE[goals[0]] || GOAL_VOLUME_RATIONALE.hipertrofia,
      compacted: compacta || null,
      // Última semana de cada fase: se baja el volumen para recuperar. Doce
      // semanas de intensidad creciente sin descarga acaban en estancamiento.
      deloadWeeks: [4, 8, 12],
      trainingDays: diasReales.slice(),
      runningDays: nRun,
      // El rótulo dice los días que hay DE VERDAD, no los que se pidieron.
      // Con el plan de carrera no coinciden: las carreras ocupan días propios
      // y la fuerza se reagrupa si hace falta. Poniendo aquí `answers.days` el
      // rótulo decía «3 días» sobre un calendario de 6, y no había quien lo
      // entendiera. Y se dice cuántas carreras son, que es justo el dato que
      // se echaba en falta.
      daysLabel: diasReales.length + ' días · '
        + goals.map(function (g) { return GOAL_LABEL[g] || ''; }).filter(Boolean).join(' + ')
        + ' · ' + minutes + ' min'
        + (runningCombo ? ' · + ' + nRun + (nRun === 1 ? ' carrera' : ' carreras') + '/sem' : '')
    };
  }

  // =============================================
  // VALIDADOR DE PLANES
  // =============================================
  // Se ejecuta antes de enseñar o guardar un plan. Existe porque el fallo del
  // material se coló en producción sin que nada lo detectara: es más barato
  // comprobar invariantes que confiar en que el generador siempre acierte.
  function validatePlan(plan, answers) {
    var problems = [];
    if (!plan || !plan.phases || !plan.phases.length) {
      return [{ tipo: 'vacio', msg: 'No se ha podido generar ninguna rutina' }];
    }
    var inventory = getInventory(answers);
    var avoid = answerList(answers, 'avoid');
    var minutes = parseInt(answers.minutes, 10) || 45;
    var setsByGroup = {};

    // Los días del plan y las sesiones del programa van en el mismo orden,
    // salvo cuando se intercalan días de carrera (que no tienen ejercicios).
    var splitDef = plan.splitId ? getSplitById(plan.splitId) : null;
    var sesionesSplit = splitDef ? splitDef.sessions.slice() : null;

    // Grupos para los que existe algún ejercicio con este material, nivel y
    // lesiones. Sin esto, exigir cobertura de cuádriceps a quien ha marcado
    // «me molesta la rodilla» marcaba como roto un plan correcto: todos los
    // ejercicios de cuádriceps para principiante llevan evitar:['rodilla'],
    // así que no hay ninguno que ofrecer y omitirlo es lo que toca.
    var gruposDisponibles = {};
    var disponiblesPorGrupo = {};
    coreAvailable(inventory, answers.level || 'principiante', avoid).forEach(function (e) {
      gruposDisponibles[e.grupo] = 1;
      disponiblesPorGrupo[e.grupo] = (disponiblesPorGrupo[e.grupo] || 0) + 1;
    });
    var usadosPorGrupo = {};   // ejercicios DISTINTOS usados de cada grupo

    plan.phases[0].days.forEach(function (day) {
      var seenNames = {};
      var mins = 0;
      var gruposDelDia = {};
      var sesion = null;
      if (sesionesSplit && day.type !== 'running') sesion = sesionesSplit.shift();

      day.exercises.forEach(function (ex) {
        var core = ex.coreId ? CORE_BY_ID[ex.coreId] : null;
        if (core) {
          gruposDelDia[core.grupo] = 1;
          (usadosPorGrupo[core.grupo] = usadosPorGrupo[core.grupo] || {})[core.id] = 1;
        }

        // Material: la invariante que originó todo esto
        if (core) {
          (core.mat || []).forEach(function (m) {
            if (!inventory[m]) {
              problems.push({ tipo: 'material', msg: ex.name + ' necesita ' + m + ' y no está en tu material' });
            }
          });
          (core.evitar || []).forEach(function (z) {
            if (avoid.indexOf(z) !== -1) {
              problems.push({ tipo: 'lesion', msg: ex.name + ' no encaja con la zona que quieres evitar (' + z + ')' });
            }
          });
          setsByGroup[core.grupo] = (setsByGroup[core.grupo] || 0) + (ex.series || 0);
        } else if (!ex.preventive) {
          problems.push({ tipo: 'sin_ficha', msg: ex.name + ' no está en el núcleo curado' });
        }

        if (seenNames[ex.name]) {
          problems.push({ tipo: 'duplicado', msg: ex.name + ' aparece dos veces en ' + day.day });
        }
        seenNames[ex.name] = 1;

        mins += exerciseMinutes(ex.series || 3, parseRestSeconds(ex.rest) || 60);
      });

      // Al compactar la fuerza para meter la carrera, las sesiones son más
      // largas A PROPÓSITO y se avisa antes de generar, así que el presupuesto
      // pasa a ser el anunciado y no el que se pidió en el asistente.
      var techoMin = (plan.compacted ? plan.compacted.minutosEstimados : minutes) + 10;
      if (mins > techoMin) {
        problems.push({ tipo: 'tiempo', msg: day.day + ' dura unos ' + Math.round(mins) + ' min y el tope era ' + techoMin });
      }

      if (sesion) {
        // Cobertura: los grupos que definen la sesión tienen que estar. Sin
        // esto salían días de pierna sin nada de cuádriceps.
        sesion.required.forEach(function (g) {
          if (!gruposDelDia[g] && gruposDisponibles[g]) {
            problems.push({ tipo: 'cobertura', msg: day.day + ' no incluye nada de ' + (GROUP_LABEL_G[g] || g) });
          }
        });
        // Coherencia: nada fuera de lo que ese día debe trabajar. Es lo que
        // impide que el tríceps (empuje) aparezca en el día de tirón.
        //
        // Se compara por PATRÓN y no por grupo exacto, porque el generador
        // puede sustituir un grupo sin ejercicios disponibles por otro del
        // mismo tren: quien evita la rodilla se queda sin cuádriceps y recibe
        // isquios o glúteo en su lugar, que es lo correcto.
        var permitidos = sesion.required.concat(sesion.optional || []);
        var patronesOk = {};
        permitidos.forEach(function (g) { patronesOk[PATTERN_BY_GROUP[g]] = 1; });
        Object.keys(gruposDelDia).forEach(function (g) {
          if (permitidos.indexOf(g) === -1 && !patronesOk[PATTERN_BY_GROUP[g]]) {
            problems.push({ tipo: 'coherencia', msg: (GROUP_LABEL_G[g] || g) + ' no pinta nada en ' + day.day });
          }
        });
      }
    });

    // Equilibrio: ningún patrón mayor puede quedarse sin nada
    ['empuje', 'tiron', 'pierna'].forEach(function (p) {
      var total = 0;
      (GROUPS_BY_PATTERN[p] || []).forEach(function (g) { total += setsByGroup[g] || 0; });
      if (total === 0) {
        problems.push({ tipo: 'equilibrio', msg: 'La rutina no entrena nada de ' + p });
      }
    });

    // NO se valida que el volumen llegue al objetivo semanal. Quedarse corto
    // casi nunca es un fallo del generador: con 3 días de 30 minutos es
    // físicamente imposible meter 13 series por músculo, y con poco material
    // tampoco hay ejercicios suficientes. Tratarlo como plan inválido hacía
    // reintentar cinco veces algo irresoluble y marcaba como rotas
    // combinaciones perfectamente correctas.
    //
    // Lo que sí es un fallo es el desequilibrio: que un grupo grande se lleve
    // el doble que otro del mismo plan significa que el reparto está mal.
    //
    // Y sólo se comprueba cuando el tiempo NO era el cuello de botella: con
    // sesiones de 3 ejercicios hay 6 huecos para cinco grupos, así que el
    // desequilibrio es aritmética, no un fallo del reparto.
    // Y se comparan sólo grupos con la MISMA frecuencia obligatoria en el
    // programa: si la espalda es required dos días y los isquios uno, que la
    // espalda tenga el doble es el diseño del split, no un reparto injusto.
    var diasFuerza = plan.phases[0].days.filter(function (d) { return d.type !== 'running'; });
    var holgura = diasFuerza.length && diasFuerza.every(function (d) { return d.exercises.length >= 5; });

    if (holgura && splitDef) {
      var vecesRequerido = {};
      splitDef.sessions.forEach(function (s) {
        s.required.forEach(function (g) { vecesRequerido[g] = (vecesRequerido[g] || 0) + 1; });
      });
      var porFrecuencia = {};
      Object.keys(BIG_GROUPS).forEach(function (g) {
        if (!gruposDisponibles[g]) return;
        var n = vecesRequerido[g] || 0;
        if (!n) return;
        (porFrecuencia[n] = porFrecuencia[n] || []).push(g);
      });
      Object.keys(porFrecuencia).forEach(function (n) {
        var lote = porFrecuencia[n];
        var mejor = 0;
        lote.forEach(function (g) { if ((setsByGroup[g] || 0) > mejor) mejor = setsByGroup[g] || 0; });
        // Umbral deliberadamente laxo: esta comprobación es un detector de
        // regresiones del reparto, no una medida de calidad del plan. Con
        // material escaso o varias lesiones marcadas, un desequilibrio
        // moderado es la única salida posible y no debe marcarse como roto.
        if (mejor < 9) return;
        lote.forEach(function (g) {
          var hechas = setsByGroup[g] || 0;
          // Un tercio: por debajo de eso el reparto está roto de verdad.
          // Justo en un tercio (3 series frente a 9) es lo que sale con dos
          // lesiones marcadas y poco material, y es correcto.
          if (hechas * 3 >= mejor) return;
          // Si se usaron todos los ejercicios que había de ese grupo, el
          // generador hizo lo que pudo: con «evito espalda baja» los isquios
          // se quedan en un único ejercicio disponible y no hay más que dar.
          var usados = Object.keys(usadosPorGrupo[g] || {}).length;
          if (usados >= (disponiblesPorGrupo[g] || 0)) return;
          problems.push({ tipo: 'volumen', msg: (GROUP_LABEL_G[g] || g) + ' se queda en ' + hechas + ' series mientras otro grupo igual de prioritario llega a ' + mejor });
        });
      });
    }

    // El core dejó de añadirse en cada sesión; si vuelve a dispararse es que
    // algo lo está metiendo por la puerta de atrás.
    var coreTarget = volumeTargetFor('core', answers);
    if ((setsByGroup.core || 0) > coreTarget * 1.6) {
      problems.push({ tipo: 'volumen', msg: 'Demasiado core: ' + setsByGroup.core + ' series semanales para un objetivo de ' + coreTarget });
    }

    return problems;
  }

  // Matriz de combinaciones de respuestas. Recorre el generador con muchas
  // combinaciones y pasa cada plan por el validador. Es la prueba automatizada
  // que el proyecto no tenía: el fallo del material llegó a producción porque
  // nada comprobaba que el plan generado fuese coherente con lo respondido.
  //
  // Se ejecuta desde la consola:  gymSelfTest()
  function gymSelfTest(verbose) {
    if (!EXERCISE_DB.isLoaded()) {
      console.warn('El catálogo aún no ha cargado. Prueba otra vez en un segundo.');
      return null;
    }
    var places = ['gimnasio', 'casa', 'sin_material'];
    var gearSets = [[], ['dumbbell'], ['band'], ['dumbbell', 'band'],
                    ['dumbbell', 'band', 'kettlebell', 'barbell', 'cable', 'machine']];
    var days = ['2', '3', '4', '5', '6'];
    var goals = [['fuerza'], ['hipertrofia'], ['tono'], ['perder_peso'], ['hipertrofia', 'fuerza']];
    var levels = ['principiante', 'intermedio', 'avanzado'];
    var minutesOpts = ['30', '45', '60'];
    var avoids = [[], ['rodilla'], ['hombro', 'espalda_baja']];
    // running y focus quedaban fuera de la matriz y así se coló el bug de
    // ejercicios duplicados del bloque de prevención para corredores: nada
    // lo ejecutaba con running:'si' antes de llegar a producción.
    var runningOpts = ['', 'si'];
    var focusOpts = ['', 'empuje', 'tiron', 'pierna'];
    // Plan combinado de carrera: sólo tiene efecto con running:'si' y 2-3
    // días, pero se recorre siempre para comprobar que con otras respuestas
    // (running:'' o 4-5 días) el generador lo ignora sin romper nada.
    var runningPlanOpts = ['', 'si'];
    // Número de carreras semanales. Entra en la matriz porque cambia el
    // reparto de la semana entero (cuántos días de fuerza caben y dónde), y
    // ese cálculo dejó de ser una tabla fija para pasar a calcularse.
    // El '' es el caso de los planes viejos, que no tienen la clave.
    var runningDaysOpts = ['', '1', '2', '3'];

    var runs = 0, failed = 0;
    var failures = [];

    places.forEach(function (place) {
      gearSets.forEach(function (gear) {
        days.forEach(function (d) {
          goals.forEach(function (goal) {
            levels.forEach(function (level) {
              minutesOpts.forEach(function (mins) {
                avoids.forEach(function (avoid) {
                  runningOpts.forEach(function (running) {
                    focusOpts.forEach(function (focus) {
                      runningPlanOpts.forEach(function (runningPlan) {
                       // El número de carreras sólo pinta algo con el plan
                       // activo; fuera de ahí sería multiplicar la matriz por
                       // cuatro sin comprobar nada nuevo.
                       var rdOpts = runningPlan === 'si' ? runningDaysOpts : [''];
                       rdOpts.forEach(function (runningDays) {
                        // Cada programa posible para esos días, más el caso
                        // "sin elegir" (planes antiguos y días con una sola
                        // opción, donde cae en el recomendado).
                        var splitIds = splitsForDays(d).map(function (s) { return s.id; });
                        splitIds.concat(['']).forEach(function (splitId) {
                          var answers = {
                            place: place, gear: gear.slice(), days: d, goal: goal.slice(),
                            level: level, minutes: mins, avoid: avoid.slice(),
                            running: running, focus: focus, runningPlan: runningPlan,
                            runningDays: runningDays, split: splitId
                          };
                          runs++;
                          var plan = null, problems = null;
                          try {
                            plan = generateRoutine(answers);
                            problems = validatePlan(plan, answers);
                          } catch (e) {
                            problems = [{ tipo: 'excepcion', msg: String(e && e.message || e) }];
                          }
                          if (problems && problems.length) {
                            failed++;
                            if (failures.length < 25) {
                              failures.push({ answers: answers, problems: problems });
                            }
                          }
                        });
                       });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    var pct = runs ? Math.round(((runs - failed) / runs) * 100) : 0;
    console.log('gymSelfTest: ' + (runs - failed) + '/' + runs + ' combinaciones válidas (' + pct + '%)');
    if (failures.length) {
      console.warn('Primeros fallos:');
      failures.forEach(function (f) {
        console.warn('  [' + f.answers.place + ' | gear=' + (f.answers.gear.join(',') || 'nada')
          + ' | ' + f.answers.days + 'd | ' + f.answers.level + ' | ' + f.answers.minutes + 'min'
          + ' | evita=' + (f.answers.avoid.join(',') || '-') + ']');
        f.problems.slice(0, 3).forEach(function (p) { console.warn('      · ' + p.tipo + ': ' + p.msg); });
      });
    }
    if (verbose) return { runs: runs, failed: failed, failures: failures };
    return { runs: runs, failed: failed };
  }

  // Se cuelgan del propio self-test para no ensuciar el ámbito global: sirven
  // para inspeccionar un plan concreto desde la consola sin tocar la interfaz.
  gymSelfTest.generate = generateRoutine;
  gymSelfTest.validate = validatePlan;
  gymSelfTest.core = CORE_EXERCISES;
  window.gymSelfTest = gymSelfTest;


  // Registra el plan como perfil: rellena PROFILES, el mapa al dataset (para
  // las animaciones) y EXERCISE_META (para la descripción paso a paso).
  // Mapea los ejercicios del plan al dataset (animación) y a EXERCISE_META
  // (instrucciones paso a paso). Se separa de la instalación del perfil
  // porque hay que repetirlo cuando termina de cargar el catálogo.
  function registerPlanExercises(plan) {
    if (!plan || !plan.phases) return;
    plan.phases.forEach(function (phase) {
      phase.days.forEach(function (day) {
        day.exercises.forEach(function (ex) {
          if (!ex.dbId) return;
          EXERCISE_DB_MAP[ex.id] = ex.dbId;
          // La descripción sale del dataset, que puede no haber cargado aún:
          // por eso se vuelven a registrar los planes cuando termine la carga.
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

  // Registra los ejercicios de todos los planes generados que haya guardados.
  function registerAllPlanExercises() {
    listPlanEntries().forEach(function (entry) {
      if (entry.plan) registerPlanExercises(entry.plan);
    });
  }

  // Da de alta (o actualiza) un plan generado en el registro y lo deja
  // disponible en PROFILES. Devuelve el id, que para un plan nuevo es el UUID
  // recién creado.
  function upsertGeneratedPlan(plan, opts) {
    opts = opts || {};
    if (!plan || !plan.phases) return null;
    var id = opts.id || newPlanId();
    var prev = planRegistry.plans[id];
    var now = new Date().toISOString();

    planRegistry.plans[id] = {
      id: id,
      name: opts.name || (prev && prev.name) || 'Mi plan',
      initial: opts.initial || (prev && prev.initial) || 'M',
      builtin: false,
      createdAt: (prev && prev.createdAt) || now,
      updatedAt: now,
      plan: plan
    };

    savePlanRegistry();
    rebuildProfiles();
    registerPlanExercises(plan);
    sincronizarDiasDeEntreno(id, plan);
    return id;
  }

  // Al REEMPLAZAR un plan hay que refrescar sus días de entreno guardados.
  //
  // Sin esto, el plan nuevo se guardaba bien pero `state.settings.trainingDays`
  // conservaba los del plan viejo, y el resultado era el peor posible: la app
  // decía «Rutina actualizada» y seguías viendo lo de antes. Pasaba tanto al
  // editar desde el asistente como al aceptar un cambio del coach.
  //
  // Y si el plan nuevo tiene MENOS sesiones que días marcados, los días
  // sobrantes se quedan sin sesión que mostrar, porque el calendario indexa
  // phase.days por la posición del día dentro de getTrainingDays().
  //
  // Sólo afecta a planes existentes: los nuevos nacen con su estado por
  // defecto, que ya toma los días del propio plan.
  function sincronizarDiasDeEntreno(id, plan) {
    var dias = plan && plan.trainingDays;
    if (!dias || !dias.length) return;

    if (id === activeProfile) {
      if (!state.settings) state.settings = {};
      state.settings.trainingDays = dias.slice();
      saveState();
      return;
    }

    // Plan que no es el activo: se escribe directamente en su clave, si ya
    // tiene estado guardado. Si no lo tiene, nacerá con los días correctos.
    try {
      var clave = 'gym_calendar_data_' + id;
      var raw = localStorage.getItem(clave);
      if (!raw) return;
      var st = JSON.parse(raw);
      if (!st.settings) st.settings = {};
      st.settings.trainingDays = dias.slice();
      localStorage.setItem(clave, JSON.stringify(st));
    } catch (e) { /* sin sincronizar: se vería el plan viejo, no se rompe */ }
  }

  // Borra un plan y su historial. Devuelve false si es el último que queda:
  // sin ningún plan la app se quedaría en una pantalla vacía sin salida.
  function deletePlan(id) {
    if (!planRegistry.plans[id]) return false;
    if (Object.keys(planRegistry.plans).length <= 1) return false;

    delete planRegistry.plans[id];
    savePlanRegistry();
    rebuildProfiles();
    try { localStorage.removeItem('gym_calendar_data_' + id); } catch (e) {}
    return true;
  }

  function renamePlan(id, name) {
    var entry = planRegistry.plans[id];
    if (!entry || !name) return;
    entry.name = name;
    entry.initial = name.trim().charAt(0).toUpperCase() || entry.initial;
    entry.updatedAt = new Date().toISOString();
    savePlanRegistry();
    rebuildProfiles();
  }

  // Nombre libre para un plan nuevo. Con varios planes generados, llamarlos
  // todos «Mi plan» los haría indistinguibles en el modal.
  function nextPlanName() {
    var used = {};
    listPlanEntries().forEach(function (e) { used[e.name] = 1; });
    if (!used['Mi plan']) return 'Mi plan';
    for (var i = 2; i < 100; i++) {
      if (!used['Mi plan ' + i]) return 'Mi plan ' + i;
    }
    return 'Mi plan';
  }

  // Cuánto historial tiene un plan. Lo usa el diálogo de borrado: un
  // «¿seguro?» a secas no da información para decidir, y en un dispositivo
  // compartido el plan que se borra puede no ser el tuyo.
  function getPlanHistoryStats(id) {
    try {
      var raw = localStorage.getItem('gym_calendar_data_' + id);
      if (!raw) return { workouts: 0, logs: 0 };
      var data = JSON.parse(raw);
      var workouts = data.completions ? Object.keys(data.completions).length : 0;
      var logs = 0;
      if (data.progress) {
        Object.keys(data.progress).forEach(function (k) {
          logs += (data.progress[k] || []).length;
        });
      }
      return { workouts: workouts, logs: logs };
    } catch (e) { return { workouts: 0, logs: 0 }; }
  }

  // El plan del asistente: hasta ahora sólo podía haber uno.
  function loadCustomPlan() {
    var entry = getPlanEntry(activeProfile);
    if (entry && entry.plan) return entry.plan;
    var found = null;
    listPlanEntries().forEach(function (e) { if (!found && e.plan) found = e.plan; });
    return found;
  }

  // El plan que el coach puede tocar: SÓLO el activo, y sólo si lo generó el
  // asistente (es decir, si tiene respuestas con las que regenerarlo).
  //
  // No vale `loadCustomPlan()` para esto. Cuando el plan activo es una
  // plantilla (Sergio, Eva, Gely) ése se cae al plan generado que encuentre
  // por ahí, que es OTRO plan: el coach acababa ajustando la configuración de
  // un plan distinto y guardando el resultado encima del que estás mirando.
  // Y si no había ninguno generado, devolvía null y el coach se callaba.
  function planAjustable() {
    var entry = getPlanEntry(activeProfile);
    if (!entry || entry.builtin || !entry.plan || !entry.plan.answers) return null;
    return entry.plan;
  }

  // Nombre del plan activo, para poder decirle al usuario cuál no se puede
  // ajustar en vez de hablarle de «tu plan» en abstracto.
  function nombrePlanActivo() {
    var entry = getPlanEntry(activeProfile);
    return (entry && entry.name) || (PROFILES[activeProfile] && PROFILES[activeProfile].name) || 'este plan';
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
      // hadPriorSession se calcula al arrancar, antes de que la migración
      // escriba sus claves; leerlas aquí daría siempre true.
      if (hadPriorSession) {
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
  // 'edit'   → rehace el plan indicado, conservando su id y su historial
  // 'create' → plan nuevo, con respuestas en blanco y UUID propio
  var wizardMode = 'edit';
  var wizardTargetId = null;
  // Se está convirtiendo una plantilla en rutina a medida. Cambia lo que se
  // avisa antes de guardar: no es «rehacer tu rutina», es sustituir un
  // programa escrito a mano por uno generado.
  var wizardConvirtiendo = false;

  function openRoutineWizard(onboarding, opts) {
    opts = opts || {};
    if (!EXERCISE_DB.isLoaded()) {
      showToast('Cargando catálogo…');
      EXERCISE_DB.load().then(function () { openRoutineWizard(onboarding, opts); }).catch(function () {
        showToast('No se pudo cargar el catálogo');
      });
      return;
    }
    wizardOnboarding = onboarding === true;
    wizardMode = opts.mode === 'create' ? 'create' : 'edit';
    wizardStep = 0;
    wizardAnswers = {};
    wizardConvirtiendo = false;

    if (wizardMode === 'edit') {
      // Rehacer un plan parte de sus respuestas: así el cuestionario sale
      // relleno y sólo hay que cambiar lo que se quiera.
      //
      // La semilla avanza en cada apertura porque, si no, rehacer el plan con
      // las mismas respuestas devolvería EXACTAMENTE la misma rutina. Al
      // haber retirado «Otros ejercicios» del resumen, esta es la única vía
      // que le queda al usuario para pedir otra propuesta.
      wizardShuffleSeed++;
      wizardTargetId = opts.planId || activeProfile;
      var entry = getPlanEntry(wizardTargetId);
      if (!entry) {
        wizardMode = 'create';
        wizardTargetId = null;
      } else if (entry.builtin) {
        // CONVERSIÓN: la plantilla pasa a ser una rutina a medida con el mismo
        // id. Antes aquí se forzaba 'create', y eso dejaba el historial
        // huérfano en la clave del plan viejo mientras el nuevo nacía a cero.
        // Se parte de la semilla para que el cuestionario salga relleno con
        // algo parecido a lo que ya entrena.
        wizardAnswers = JSON.parse(JSON.stringify(BUILTIN_SEEDS[entry.id] || {}));
        wizardConvirtiendo = true;
      } else if (entry.plan && entry.plan.answers) {
        wizardAnswers = entry.plan.answers;
      }
    } else {
      wizardTargetId = null;
    }

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
    // Algunos pasos (elegir programa) calculan sus opciones a partir de lo ya
    // contestado, así que no pueden declararlas de forma fija.
    var opciones = typeof step.dynamicOptions === 'function'
      ? step.dynamicOptions(wizardAnswers)
      : step.options;

    html += '<div class="wizard-options' + (step.pills ? ' pills' : '') + '">';
    opciones.forEach(function (opt) {
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
      html += '<button class="wizard-next" id="wizardNext"' + ((selected.length || stepAllowsEmpty(step)) ? '' : ' disabled') + '>'
        + (selected.length > 1 ? 'Continuar (' + selected.length + ') →'
           : (selected.length === 0 && stepAllowsEmpty(step) ? (step.key === "avoid" ? "Ninguna →" : "No tengo material →") : "Continuar →")) + '</button>';
    }
    html += '</div>';

    el.innerHTML = html;
    playWizardEnter(el);

    el.querySelectorAll('.wizard-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.dataset.value;
        if (!step.multi) {
          wizardAnswers[step.key] = value;
          // El sitio no filtra nada por sí mismo: sólo prerrellena el material
          // del paso siguiente, que es el que manda y se puede corregir.
          if (step.key === "place") wizardAnswers.gear = (PLACE_PRESET[value] || []).slice();
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
      if (!answerList(wizardAnswers, step.key).length && !stepAllowsEmpty(step)) return;
      wizardStep++;
      renderWizard();
    });
    var back = document.getElementById('wizardBack');
    if (back) back.addEventListener('click', function () { wizardStep--; renderWizard(); });
  }

  // Etiqueta y estado del botón "Continuar" de los pasos múltiples. Se llama
  // al marcar y desmarcar, así el paso no necesita repintarse entero.
  // El material admite cero opciones: 'no tengo nada' es una respuesta válida
  // y además la más restrictiva. El resto de pasos siguen exigiendo una.
  function stepAllowsEmpty(step) { return step.key === "gear" || step.key === "avoid"; }

  function updateWizardNext(step, selected) {
    var next = document.getElementById("wizardNext");
    if (!next || !step.multi) return;
    next.disabled = selected.length === 0 && !stepAllowsEmpty(step);
    next.textContent = selected.length > 1
      ? "Continuar (" + selected.length + ") →"
      : (selected.length === 0 && stepAllowsEmpty(step) ? (step.key === "avoid" ? "Ninguna →" : "No tengo material →") : "Continuar →");
  }

  // Genera y, si el validador encuentra algo, reintenta con otras semillas de
  // barajado antes de enseñar nada al usuario. Antes un fallo del generador
  // (p.ej. el bloque de prevención repitiendo un ejercicio del núcleo) se
  // enseñaba tal cual y el usuario se quedaba bloqueado en "Usar esta rutina"
  // sin ninguna forma de arreglarlo por su cuenta.
  function generateValidRoutine(answers) {
    var originalSeed = wizardShuffleSeed;
    var plan = generateRoutine(answers);
    var problems = validatePlan(plan, answers);
    var attempt = 0;
    while (problems.length && attempt < 5) {
      attempt++;
      wizardShuffleSeed = originalSeed + attempt * 7919;
      var candidate = generateRoutine(answers);
      var candidateProblems = validatePlan(candidate, answers);
      if (!candidateProblems.length) { plan = candidate; problems = candidateProblems; break; }
      if (candidate && (!plan || candidateProblems.length < problems.length)) { plan = candidate; problems = candidateProblems; }
    }
    wizardShuffleSeed = originalSeed;
    if (problems.length) console.warn('generateValidRoutine: no se encontró una rutina sin problemas tras reintentar', problems);
    return plan;
  }

  // =============================================
  // CAPA EXPLICATIVA: ¿POR QUÉ ESTE ENTRENAMIENTO?
  // =============================================
  // Una sola pieza de contenido con dos entradas: el resumen al crear el plan
  // y el modal bajo demanda desde Rutina. El objetivo es que nadie haga los
  // ejercicios porque sí.
  //
  // La unidad es la SEMANA, no la sesión: lo que determina el resultado son
  // las series semanales por músculo. Por eso la sesión de hoy se presenta
  // como su aportación al total, y no como un número aislado.

  // Series ya completadas esta semana, por grupo muscular. Se apoya en
  // state.completions, que está indexado por fecha e id de ejercicio.
  function weeklyVolumeProgress() {
    var out = {};
    try {
      var hoy = new Date(getTodayKey() + 'T12:00:00');
      var lunes = getMonday(hoy);
      for (var i = 0; i < 7; i++) {
        var d = new Date(lunes);
        d.setDate(d.getDate() + i);
        var key = getDateKey(d);
        var comps = state.completions[key];
        if (!comps) continue;
        var day = getDayForDateKey(key);
        if (!day) continue;
        day.exercises.forEach(function (ex) {
          if (!comps[ex.id]) return;
          var c = ex.coreId ? CORE_BY_ID[ex.coreId] : null;
          if (!c) return;
          out[c.grupo] = (out[c.grupo] || 0) + (ex.series || 0);
        });
      }
    } catch (e) {}
    return out;
  }

  // =============================================
  // CALORÍAS ESTIMADAS
  // ---------------------------------------------
  // kcal = MET × peso_kg × horas. Los MET salen del Compendium of Physical
  // Activities, que para fuerza sólo distingue por ESFUERZO, no por ejercicio:
  // no existe un valor de «curl de bíceps» distinto del de «remo». Por eso
  // esto se enseña por sesión y por semana, y nunca debajo de cada ejercicio;
  // un número ahí sería precisión inventada.
  //
  // Para fuerza el error real ronda el ±30% y no cuenta el gasto posterior a
  // la sesión. Es una orientación, no una medida, y así se etiqueta.
  //
  // Sin peso corporal no se enseña nada: las calorías escalan linealmente con
  // él, así que la misma sesión son ~250 kcal a 60 kg y ~370 a 90. Un número
  // sin ese dato no significaría nada.
  var MET_POR_OBJETIVO = {
    fuerza: 5.0,        // cargas altas y descansos largos: mucha pausa
    hipertrofia: 6.0,   // series de 8-15 con esfuerzo alto
    tono: 5.5,
    perder_peso: 7.0,   // circuitos y descanso corto
    movilidad: 3.0
  };
  var MET_FUERZA_DEFECTO = 5.0;

  // Carrera. El plan pide ritmo conversacional, así que nada de valores de
  // competición. La caminata de los intervalos cuenta aparte: en la fase 1 es
  // más de la mitad de la sesión y meterla como carrera inflaría el total.
  var MET_CAMINAR = 3.5;
  var MET_TROTE = 7.0;
  var MET_CARRERA_CONTINUA = 8.5;

  // El peso es de la PERSONA, no del plan, así que vive en su propia clave y
  // no dentro del estado de cada plan. Antes era por plan y cambiar de plan te
  // volvía a pedir el peso, que no tiene ningún sentido: los planes son
  // programas de entrenamiento, y quien los usa pesa lo mismo en todos.
  var BODY_WEIGHT_KEY = 'gym_body_weight';

  function getBodyWeight() {
    var w;
    try { w = parseFloat(localStorage.getItem(BODY_WEIGHT_KEY)); }
    catch (e) { return null; }
    return (!isNaN(w) && w > 0) ? w : null;
  }

  function setBodyWeight(kg) {
    try {
      if (typeof kg === 'number' && kg > 0) localStorage.setItem(BODY_WEIGHT_KEY, String(kg));
      else localStorage.removeItem(BODY_WEIGHT_KEY);
    } catch (e) { /* almacenamiento lleno: se pierde el ajuste, no rompemos */ }
    if (typeof kg === 'number' && kg > 0) anotarPesoCorporal(kg);
    marcarCambioLocal();
  }

  // El peso actual es un escalar, pero lo interesante es cómo se mueve. El
  // histórico se guarda aparte para no tocar `BODY_WEIGHT_KEY`, que ya lee
  // media app, y con la misma forma `{date, weight}` que usa el progreso de
  // los ejercicios: así `drawWeightChart()` sirve tal cual.
  var BODY_WEIGHT_HISTORY_KEY = 'gym_body_weight_history';
  var BODY_WEIGHT_HISTORY_MAX = 400;

  function getBodyWeightHistory() {
    var arr;
    try { arr = JSON.parse(localStorage.getItem(BODY_WEIGHT_HISTORY_KEY)); }
    catch (e) { return []; }
    if (!Array.isArray(arr)) return [];
    return arr.filter(function (e) {
      return e && typeof e.weight === 'number' && e.weight > 0 && typeof e.date === 'string';
    }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }

  // Un apunte por día: pesarse dos veces la misma mañana, o corregir un
  // dedazo, no debe dejar dos puntos en la gráfica.
  function anotarPesoCorporal(kg) {
    var hoy = getTodayKey();
    var hist = getBodyWeightHistory().filter(function (e) { return e.date !== hoy; });
    hist.push({ date: hoy, weight: kg });
    if (hist.length > BODY_WEIGHT_HISTORY_MAX) hist = hist.slice(-BODY_WEIGHT_HISTORY_MAX);
    try { localStorage.setItem(BODY_WEIGHT_HISTORY_KEY, JSON.stringify(hist)); } catch (e) {}
  }

  // Quien ya tenía un peso puesto arranca con el histórico vacío y la gráfica
  // no aparecería nunca hasta que volviera a tocarlo. Se siembra con el que
  // hay, fechado hoy: es lo único que sabemos.
  function migrarHistorialPeso() {
    if (getBodyWeightHistory().length) return;
    var actual = getBodyWeight();
    if (actual) anotarPesoCorporal(actual);
  }

  // Rescata el peso que ya estuviera guardado dentro de algún plan. Sin esto,
  // quien lo tuviera puesto se lo encontraría vacío y volvería a que se lo
  // pidieran. Se prefiere el del plan activo; si no, vale cualquiera.
  function migrarPesoCorporal() {
    if (getBodyWeight()) return;

    var candidatos = [];
    try {
      var propio = 'gym_calendar_data_' + activeProfile;
      Object.keys(localStorage).forEach(function (k) {
        if (k.indexOf('gym_calendar_data_') !== 0) return;
        var st;
        try { st = JSON.parse(localStorage.getItem(k)); } catch (e) { return; }
        var w = st && st.settings && st.settings.bodyWeight;
        if (typeof w === 'number' && w > 0) candidatos.push({ clave: k, peso: w });
      });
      var elegido = candidatos.filter(function (c) { return c.clave === propio; })[0] || candidatos[0];
      if (elegido) setBodyWeight(elegido.peso);
    } catch (e) { /* sin migración: se pedirá el peso, que no es grave */ }
  }

  // =============================================
  // COPIA DE SEGURIDAD (exportar / importar)
  // ---------------------------------------------
  // Todo vive en el localStorage de UN navegador. Borrar los datos del sitio,
  // cambiar de móvil o reinstalar se lleva por delante meses de registro sin
  // ninguna forma de recuperarlo. Esto no es sincronización: es un fichero que
  // te llevas tú y vuelves a meter donde quieras.
  //
  // Los valores se guardan como las cadenas crudas de localStorage, sin
  // parsear ni volver a serializar: cualquier clave nueva que se añada en el
  // futuro entra en la copia sola, y nada se deforma por el camino.
  var BACKUP_FORMATO = 1;

  // Cosas que son de ESTE navegador y ahora mismo, no del usuario. Restaurar
  // la cola de feedback reenviaría reportes ya enviados, y el flag de recarga
  // dejaría la app creyéndose a medio actualizar.
  // Las de sincronización tampoco viajan: el código es la identidad DE ESTE
  // dispositivo, y meterlo dentro de la copia haría que importar un fichero de
  // otro móvil te robara la suya. Los sellos de tiempo, por lo mismo: son de
  // aquí, no del contenido.
  var BACKUP_EXCLUIDAS = [
    'gym_feedback_queue', 'gym_update_recargando', 'gym_push_preguntado',
    'gym_sync_codigo', 'gym_sync_ts', 'gym_sync_subido'
  ];

  function clavesDeLaApp() {
    var claves = [];
    try {
      Object.keys(localStorage).forEach(function (k) {
        if (k.indexOf('gym') === 0 && BACKUP_EXCLUIDAS.indexOf(k) === -1) claves.push(k);
      });
    } catch (e) { /* localStorage inaccesible: no hay nada que copiar */ }
    return claves.sort();
  }

  function construirBackup() {
    var datos = {};
    clavesDeLaApp().forEach(function (k) {
      try {
        var v = localStorage.getItem(k);
        if (typeof v === 'string') datos[k] = v;
      } catch (e) {}
    });
    return {
      app: 'gym-calendar',
      formato: BACKUP_FORMATO,
      version: APP_VERSION,
      fecha: new Date().toISOString(),
      datos: datos
    };
  }

  function nombreDeBackup() {
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    return 'gym-calendar-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '.json';
  }

  function exportarDatos() {
    var backup = construirBackup();
    if (!Object.keys(backup.datos).length) {
      showToast('Todavía no hay nada que copiar');
      return;
    }
    var url = null;
    try {
      var blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = nombreDeBackup();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('✓ Copia descargada');
    } catch (e) {
      showToast('No se pudo crear la copia');
    }
    // Se revoca con retraso: revocar en el mismo tick cancela la descarga que
    // se acaba de lanzar en algunos navegadores móviles.
    if (url) setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 60000);
  }

  function importarBackup(texto) {
    var backup;
    try { backup = JSON.parse(texto); }
    catch (e) { showToast('Ese fichero no es una copia válida'); return; }

    if (!backup || backup.app !== 'gym-calendar' || !backup.datos || typeof backup.datos !== 'object') {
      showToast('Ese fichero no es una copia de Gym Calendar');
      return;
    }
    if (typeof backup.formato === 'number' && backup.formato > BACKUP_FORMATO) {
      showToast('La copia es de una versión más nueva de la app');
      return;
    }

    // Se filtra por prefijo aunque el fichero sea nuestro: una copia editada a
    // mano no debe poder escribir claves ajenas en el localStorage del sitio.
    var claves = Object.keys(backup.datos).filter(function (k) {
      return k.indexOf('gym') === 0
        && BACKUP_EXCLUIDAS.indexOf(k) === -1
        && typeof backup.datos[k] === 'string';
    });
    if (!claves.length) { showToast('La copia está vacía'); return; }

    var cuando = backup.fecha ? new Date(backup.fecha) : null;
    var deCuando = (cuando && !isNaN(cuando.getTime())) ? ' del ' + formatDateShort(cuando) : '';
    var aviso = 'Vas a sustituir TODOS tus datos por los de la copia' + deCuando + '.\n\n'
      + 'Tus planes, pesos e historial actuales se pierden. Esto no se puede deshacer.\n\n¿Seguir?';
    if (!window.confirm(aviso)) return;

    try {
      clavesDeLaApp().forEach(function (k) { localStorage.removeItem(k); });
      claves.forEach(function (k) { localStorage.setItem(k, backup.datos[k]); });
    } catch (e) {
      window.alert('No se pudo restaurar la copia entera. Se recarga la app: revisa tus datos.');
    }
    // Recargar y no repintar: el plan activo, las fases y el estado se leen al
    // arrancar y hay demasiado derivado como para rehacerlo en caliente.
    location.reload();
  }

  function pedirFicheroDeBackup() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () { importarBackup(String(reader.result)); };
      reader.onerror = function () { showToast('No se pudo leer el fichero'); };
      reader.readAsText(f);
    });
    input.click();
  }

  // =============================================
  // SINCRONIZACIÓN AUTOMÁTICA
  // ---------------------------------------------
  // La copia manual sólo salva a quien se acuerda de hacerla, que es justo
  // quien no la necesita. Esto sube los datos solo: al cambiar algo, al
  // terminar un entreno y al cerrar la app. Y al abrirla se baja lo último si
  // otro dispositivo iba por delante.
  //
  // Sin cuentas ni contraseñas: el cliente se genera un código la primera vez
  // y lo usa como identidad. Nadie teclea nada nunca, salvo que quieras
  // recuperar los datos en un móvil nuevo — ahí sí hace falta el código, y por
  // eso se enseña en Ajustes.
  //
  // Quién gana cuando hay dos versiones: la más reciente, comparando el sello
  // de tiempo del CLIENTE. No hay mezcla campo a campo. Para los datos de
  // entrenamiento de una sola persona es suficiente, y es lo que mantiene esto
  // en unas pocas líneas en vez de en un motor de fusión.
  var SYNC_CODIGO_KEY = 'gym_sync_codigo';
  var SYNC_TS_KEY = 'gym_sync_ts';        // último cambio local (ms)
  var SYNC_SUBIDO_KEY = 'gym_sync_subido'; // último ts que el servidor confirmó
  var SYNC_ESPERA_MS = 4000;

  // Sin l/o/0/1: el código acaba copiado a mano alguna vez, y esos cuatro se
  // confunden entre sí en cualquier tipografía.
  var SYNC_ALFABETO = 'abcdefghijkmnpqrstuvwxyz23456789';

  var syncTimer = null;
  var syncSubiendo = false;
  var syncCambioEstaSesion = false;
  // Hasta que no se ha hablado con el servidor, nada de lo que pase aquí
  // cuenta como cambio. Ver marcarCambioLocal().
  var syncArranqueListo = false;

  function syncDisponible() {
    return !!AI_ENDPOINT && typeof fetch === 'function';
  }

  function generarCodigo() {
    // 24 caracteres de un alfabeto de 32 son 120 bits: no se adivina.
    var bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    var out = '';
    // 256 es múltiplo exacto de 32, así que el módulo no sesga nada.
    for (var i = 0; i < 24; i++) out += SYNC_ALFABETO[bytes[i] % SYNC_ALFABETO.length];
    return out;
  }

  function syncCodigo() {
    try {
      var c = localStorage.getItem(SYNC_CODIGO_KEY);
      if (c && /^[a-z0-9]{24}$/.test(c)) return c;
      c = generarCodigo();
      localStorage.setItem(SYNC_CODIGO_KEY, c);
      return c;
    } catch (e) { return null; }   // almacenamiento inaccesible: sin sync, y ya
  }

  function syncTs() {
    var n = parseInt(localStorage.getItem(SYNC_TS_KEY), 10);
    return isNaN(n) ? 0 : n;
  }

  function syncTsSubido() {
    var n = parseInt(localStorage.getItem(SYNC_SUBIDO_KEY), 10);
    return isNaN(n) ? 0 : n;
  }

  // Todo lo que escriba en localStorage pasa por aquí. Marca la hora del
  // cambio y programa la subida.
  //
  // El `if` de arriba no es una optimización, es lo que impide perder datos.
  // Al arrancar, la app se escribe a sí misma: migraciones, y el registro de
  // planes de fábrica que se reconstruye si no está. Si eso contara como
  // cambio del usuario, un móvil recién borrado se pondría el sello de AHORA,
  // se creería más reciente que el servidor, se saltaría la restauración y
  // subiría su vacío encima de la copia buena. Probado: 890 bytes vacíos
  // machacando 41 KB de historial.
  function marcarCambioLocal() {
    if (!syncArranqueListo) return;
    syncCambioEstaSesion = true;
    try { localStorage.setItem(SYNC_TS_KEY, String(Date.now())); } catch (e) {}
    programarSubida();
  }

  // ¿Hay aquí algo que perder? Que existan claves no dice nada: un móvil
  // recién borrado se reconstruye los planes de fábrica él solo al arrancar.
  // Lo que cuenta es que haya entrenamientos marcados, pesos apuntados o algún
  // plan que no venga de serie.
  function hayDatosDeVerdad() {
    try {
      var claves = Object.keys(localStorage);
      for (var i = 0; i < claves.length; i++) {
        if (claves[i].indexOf('gym_calendar_data_') !== 0) continue;
        var st;
        try { st = JSON.parse(localStorage.getItem(claves[i])); } catch (e) { continue; }
        if (!st) continue;
        if (st.completions && Object.keys(st.completions).length) return true;
        if (st.progress && Object.keys(st.progress).length) return true;
      }
      var reg = JSON.parse(localStorage.getItem(PLANS_KEY) || 'null');
      if (reg && reg.plans) {
        var ids = Object.keys(reg.plans);
        for (var j = 0; j < ids.length; j++) {
          if (!reg.plans[ids[j]].builtin) return true;
        }
      }
    } catch (e) {}
    return false;
  }

  // Se agrupan los cambios: marcar cinco ejercicios seguidos es una subida, no
  // cinco. El servidor guarda el estado entero, así que subir cada pulsación
  // no aportaría nada.
  function programarSubida() {
    if (!syncDisponible()) return;
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(function () { syncTimer = null; subirCopia(); }, SYNC_ESPERA_MS);
  }

  function subirCopiaYa(alSalir) {
    if (syncTimer) { clearTimeout(syncTimer); syncTimer = null; }
    return subirCopia(alSalir);
  }

  function subirCopia(alSalir) {
    if (!syncDisponible() || syncSubiendo) return Promise.resolve(false);
    var codigo = syncCodigo();
    if (!codigo) return Promise.resolve(false);

    var ts = syncTs();
    if (!ts || ts <= syncTsSubido()) return Promise.resolve(false);   // nada nuevo

    syncSubiendo = true;
    var backup = construirBackup();
    var opciones = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo, ts: ts, datos: JSON.stringify(backup) })
    };
    // Al salir de la app, una petición normal muere con la pestaña. `keepalive`
    // deja que termine sola, a cambio de un tope de 64 KB de cuerpo. Si la
    // copia no cabe, se manda normal y que suene la flauta: de todas formas se
    // reintenta al volver a abrir.
    if (alSalir && opciones.body.length <= 60000) opciones.keepalive = true;

    return fetch(AI_ENDPOINT + '/copia/subir', opciones)
      .then(function (r) { return r.json(); }).then(function (r) {
      if (r && r.ok) {
        try { localStorage.setItem(SYNC_SUBIDO_KEY, String(ts)); } catch (e) {}
        return true;
      }
      return false;
    }).catch(function () {
      // Sin red o servidor caído. No se marca como subido, así que el próximo
      // cambio (o la próxima apertura) lo reintenta solo. No se avisa al
      // usuario: no ha hecho nada mal y no puede hacer nada al respecto.
      return false;
    }).then(function (ok) { syncSubiendo = false; return ok; });
  }

  // Al arrancar: si el servidor va por delante, se restaura. Sólo si aquí no
  // se ha tocado nada en esta sesión — restaurar encima de algo que el usuario
  // acaba de marcar sería borrárselo delante de las narices.
  function bajarCopiaSiProcede() {
    if (!syncDisponible()) return Promise.resolve(false);
    var codigo = syncCodigo();
    if (!codigo) return Promise.resolve(false);

    return fetch(AI_ENDPOINT + '/copia/bajar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
    }).then(function (r) { return r.json(); }).then(function (r) {
      if (!r || r.vacio || !r.datos) {
        // El servidor no tiene nada nuestro: ésta es la primera copia de este
        // dispositivo, y hay que hacerla YA.
        //
        // Sin el sello no se sube nada, y el sello sólo lo pone un cambio del
        // usuario. O sea que quien instalara la app y no tocara nada se
        // quedaba sin copia indefinidamente, con su historial entero sólo en
        // el móvil. Pasó en el primer despliegue: 1 día entrenado y ts=null.
        //
        // Poner el sello aquí es seguro justo porque el servidor está vacío:
        // no hay nada que pisar. Y se exige `hayDatosDeVerdad()` para que un
        // móvil recién borrado no se ponga el sello de ahora y luego gane un
        // desempate que no le toca.
        if (!syncTs() && hayDatosDeVerdad()) {
          try { localStorage.setItem(SYNC_TS_KEY, String(Date.now())); } catch (e) {}
        }
        if (syncTs()) programarSubida();
        return false;
      }
      // El segundo cuelgue del cinturón: un dispositivo que no tiene nada que
      // perder no gana nunca un desempate, diga lo que diga su reloj.
      if (r.ts <= syncTs() && hayDatosDeVerdad()) {
        if (syncTs() > syncTsSubido()) programarSubida();   // vamos por delante
        return false;
      }
      if (syncCambioEstaSesion) return false;

      return aplicarCopia(r.datos, r.ts);
    }).catch(function () { return false; });
  }

  // Escribe la copia del servidor encima de lo local y recarga. Igual que el
  // import manual: hay demasiado derivado del arranque (plan activo, fases,
  // estado) como para rehacerlo en caliente.
  function aplicarCopia(texto, ts) {
    var backup;
    try { backup = JSON.parse(texto); } catch (e) { return false; }
    if (!backup || backup.app !== 'gym-calendar' || !backup.datos) return false;

    var claves = Object.keys(backup.datos).filter(function (k) {
      return k.indexOf('gym') === 0
        && BACKUP_EXCLUIDAS.indexOf(k) === -1
        && typeof backup.datos[k] === 'string';
    });
    if (!claves.length) return false;

    try {
      clavesDeLaApp().forEach(function (k) { localStorage.removeItem(k); });
      claves.forEach(function (k) { localStorage.setItem(k, backup.datos[k]); });
      // El ts es el del origen, no `Date.now()`: si pusiéramos la hora de
      // ahora, este dispositivo parecería el más reciente sin haber cambiado
      // nada y ganaría todos los desempates.
      localStorage.setItem(SYNC_TS_KEY, String(ts));
      localStorage.setItem(SYNC_SUBIDO_KEY, String(ts));
    } catch (e) { return false; }

    location.reload();
    return true;
  }

  // Recuperar en un móvil nuevo: se adopta el código del viejo y se baja todo.
  // Es lo único de la sincronización que el usuario llega a tocar.
  function recuperarConCodigo(codigo) {
    codigo = String(codigo || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!/^[a-z0-9]{24}$/.test(codigo)) {
      showToast('Ese código no tiene la pinta correcta');
      return;
    }
    if (!syncDisponible()) { showToast('No hay conexión con el servidor'); return; }

    showToast('Buscando tu copia…');
    fetch(AI_ENDPOINT + '/copia/bajar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
    }).then(function (r) { return r.json(); }).then(function (r) {
      if (!r || r.vacio || !r.datos) { showToast('No hay ninguna copia con ese código'); return; }
      if (!window.confirm('Se ha encontrado una copia. Vas a sustituir TODOS los datos de este móvil por los de esa copia.\n\n¿Seguir?')) return;
      // Se adopta el código ANTES de aplicar, para que a partir de ahora este
      // móvil sincronice contra esa misma copia.
      try { localStorage.setItem(SYNC_CODIGO_KEY, codigo); } catch (e) {}
      if (!aplicarCopia(r.datos, r.ts)) showToast('La copia está dañada');
    }).catch(function () { showToast('No se ha podido conectar'); });
  }

  // Pedirle al navegador que no considere desechable nuestro almacenamiento.
  // No es una garantía —decide él— pero es la única forma de pedirlo, y sin
  // esto puede borrarlo cuando le apriete el espacio.
  function pedirAlmacenamientoPersistente() {
    try {
      if (!navigator.storage || !navigator.storage.persist) return;
      navigator.storage.persisted().then(function (ya) {
        if (!ya) navigator.storage.persist().catch(function () {});
      }).catch(function () {});
    } catch (e) {}
  }

  function metDelPlan(plan) {
    var objetivos = plan && plan.answers ? answerList(plan.answers, 'goal') : [];
    var vals = [];
    objetivos.forEach(function (g) {
      if (typeof MET_POR_OBJETIVO[g] === 'number') vals.push(MET_POR_OBJETIVO[g]);
    });
    if (!vals.length) return MET_FUERZA_DEFECTO;
    // Con varios objetivos el generador mezcla estilos, así que se promedia.
    var suma = 0;
    vals.forEach(function (v) { suma += v; });
    return suma / vals.length;
  }

  // Los 6 minutos extra son calentamiento y transiciones, el mismo margen que
  // ya usa el explicador para decir «~45 min».
  function minutosDeSesion(day) {
    if (!day || !day.exercises) return 0;
    var min = 0;
    day.exercises.forEach(function (ex) {
      min += exerciseMinutes(ex.series || 3, parseRestSeconds(ex.rest) || 60);
    });
    return min + 6;
  }

  // Carrera: se separa trote de caminata en vez de aplicar un MET único.
  function caloriasCarrera(sesion, peso) {
    if (!sesion || !peso) return null;

    if (sesion.kind === 'intervals') {
      var caminar = 10;   // 5 de calentamiento + 5 de vuelta a la calma
      var trote = 0;
      (sesion.blocks || []).forEach(function (b) {
        if (b.type === 'set') {
          trote += (b.reps || 0) * (b.jog || 0);
          caminar += (b.reps || 0) * (b.walk || 0);
        }
      });
      return Math.round(peso * ((MET_TROTE * trote + MET_CAMINAR * caminar) / 60));
    }

    var min = sesion.totalMin || 0;
    if (!min) return null;   // sin duración no hay nada que estimar
    return Math.round(MET_CARRERA_CONTINUA * peso * (min / 60));
  }

  // Devuelve null si no se sabe el peso o no hay sesión. `dateKey` sólo hace
  // falta en los días de carrera, que cambian cada semana.
  function caloriasDeSesion(day, plan, dateKey) {
    var peso = getBodyWeight();
    if (!peso || !day) return null;

    if (day.type === 'running') {
      // getRunningSession() devuelve un envoltorio { session, week, index,
      // total }, no la sesión: hay que desenvolverlo o el cálculo sale 0.
      var rs = getRunningSession(dateKey || getTodayKey());
      return caloriasCarrera(rs && rs.session, peso);
    }
    return Math.round(metDelPlan(plan) * peso * (minutosDeSesion(day) / 60));
  }

  // Array paralelo a plan.phases[0].days con las kcal de cada día, o null.
  //
  // Los días de carrera se resuelven contra RUNNING_PLAN de la semana en curso
  // y NO contra el calendario guardado: en el resumen del asistente el plan
  // todavía no está guardado, así que getRunningSession() no encuentra nada y
  // la carrera contaba cero.
  function caloriasPorDia(plan) {
    var peso = getBodyWeight();
    if (!peso || !plan || !plan.phases || !plan.phases[0]) return null;

    var semana = getWeekNumber(getTodayKey()) || 1;
    var sesiones = RUNNING_PLAN[semana] || RUNNING_PLAN[1] || [];
    var met = metDelPlan(plan);
    var iCarrera = 0;

    return plan.phases[0].days.map(function (day) {
      if (day.type === 'running') return caloriasCarrera(sesiones[iCarrera++], peso);
      return Math.round(met * peso * (minutosDeSesion(day) / 60));
    });
  }

  // Total de la semana según lo PLANIFICADO, no lo hecho: acompaña al objetivo
  // de series en el explicador, que también es un objetivo.
  function caloriasSemana(plan) {
    var porDia = caloriasPorDia(plan);
    if (!porDia) return null;
    var total = 0;
    porDia.forEach(function (c) { if (c) total += c; });
    return total || null;
  }

  // =============================================
  // NOTIFICACIONES DE ENTRENAMIENTO
  // ---------------------------------------------
  // Recordatorio los días que toca entrenar. Lo manda el Worker desde un cron
  // (ver worker/index.js): una web no puede programarse notificaciones locales
  // a futuro, así que el aviso tiene que llegar de fuera.
  //
  // Ojo con «activado por defecto»: el permiso del navegador NO se puede dar
  // por concedido, hace falta un gesto del usuario y un diálogo nativo. Lo que
  // nace activado es el ajuste de la app; el permiso se pide una vez, con
  // contexto delante, y si dice que no no se vuelve a insistir. Lanzar el
  // diálogo nativo a bocajarro al cargar es la mejor forma de que lo denieguen
  // por reflejo, y un «no» del navegador es casi irreversible.
  var PUSH_PUBLIC_KEY = 'BDmdYcdktK_30nKHZ-95A9eORHXPaKQTpRh8N6quMmgNe4kQCVtGrtfma7lOXpMCX7eQVDvAnug5eyQI-d6dDx4';
  var PUSH_HORA_DEFECTO = 18;
  var PUSH_PREGUNTADO_KEY = 'gym_push_preguntado';

  function pushSoportado() {
    return !!AI_ENDPOINT && 'serviceWorker' in navigator &&
           'PushManager' in window && 'Notification' in window;
  }

  // El ajuste de la app, que no es lo mismo que el permiso del navegador.
  // Nace activado: si el usuario concede el permiso, funciona sin más pasos.
  function pushActivado() {
    if (!state.settings || state.settings.push === undefined) return true;
    return !!state.settings.push;
  }

  function setPushActivado(v) {
    if (!state.settings) state.settings = {};
    state.settings.push = !!v;
    saveState();
  }

  function pushHora() {
    var h = state.settings && state.settings.pushHora;
    return (typeof h === 'number' && h >= 0 && h <= 23) ? h : PUSH_HORA_DEFECTO;
  }

  function setPushHora(h) {
    if (!state.settings) state.settings = {};
    state.settings.pushHora = h;
    saveState();
  }

  function urlBase64ToUint8Array(base64) {
    var padding = '='.repeat((4 - base64.length % 4) % 4);
    var b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
    var raw = atob(b64);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  // Qué se le manda al Worker: los días que entrena, el nombre de la sesión de
  // cada día, la hora local preferida y el desfase horario. Nada más: ni
  // nombre, ni pesos, ni progreso.
  function datosDeAgenda() {
    var dias = getTrainingDays();
    var nombres = {};
    try {
      var fase = PHASES[0];
      dias.forEach(function (d, i) {
        var day = fase && fase.days[i];
        if (day && day.day) nombres[String(d)] = day.day;
      });
    } catch (e) { /* sin nombres: el aviso será genérico */ }

    return {
      dias: dias,
      nombres: nombres,
      hora: pushHora(),
      offset: new Date().getTimezoneOffset(),
      // La racha va al Worker para poder nombrarla en el aviso. Se refresca al
      // abrir la app y al terminar una sesión; entre medias puede quedar algo
      // desfasada, y por eso el Worker sólo la usa si es de 2 o más.
      racha: getCurrentStreak()
    };
  }

  function pushFetch(ruta, cuerpo) {
    return fetch(AI_ENDPOINT + '/push/' + ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo)
    });
  }

  function getSuscripcion() {
    if (!pushSoportado()) return Promise.resolve(null);
    return navigator.serviceWorker.ready
      .then(function (reg) { return reg.pushManager.getSubscription(); })
      .catch(function () { return null; });
  }

  // Da de alta (o actualiza) la suscripción. Devuelve true si quedó activa.
  function suscribirPush() {
    if (!pushSoportado()) return Promise.resolve(false);
    if (Notification.permission !== 'granted') return Promise.resolve(false);

    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.pushManager.getSubscription().then(function (sub) {
        if (sub) return sub;
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUSH_PUBLIC_KEY)
        });
      });
    }).then(function (sub) {
      var agenda = datosDeAgenda();
      agenda.subscription = sub.toJSON();
      return pushFetch('subscribe', agenda);
    }).then(function (res) {
      return !!(res && res.ok);
    }).catch(function (e) {
      console.warn('No se pudo activar el recordatorio:', e);
      return false;
    });
  }

  function desuscribirPush() {
    return getSuscripcion().then(function (sub) {
      if (!sub) return true;
      var endpoint = sub.endpoint;
      return sub.unsubscribe().then(function () {
        return pushFetch('unsubscribe', { endpoint: endpoint });
      }).then(function () { return true; });
    }).catch(function () { return false; });
  }

  // Se llama al terminar una sesión para que no llegue el segundo recordatorio
  // del día. Es best-effort: si falla (sin red al acabar en el gimnasio), como
  // mucho llega un aviso de más.
  function reportarEntrenoHecho() {
    if (!pushSoportado() || !pushActivado()) return;
    getSuscripcion().then(function (sub) {
      if (!sub) return;
      pushFetch('done', {
        endpoint: sub.endpoint,
        dia: getTodayKey(),
        racha: getCurrentStreak()
      }).catch(function () {});
    }).catch(function () {});
  }

  // Resincroniza la agenda cuando cambian los días o el plan. Sin esto, el
  // Worker seguiría avisando los días viejos.
  function resyncPush() {
    if (!pushSoportado() || !pushActivado()) return;
    if (Notification.permission !== 'granted') return;
    getSuscripcion().then(function (sub) {
      if (sub) suscribirPush();
    }).catch(function () {});
  }

  // Petición previa, con contexto, antes del diálogo nativo. Se enseña una vez
  // por dispositivo: `gym_push_preguntado` no se borra ni al decir que no.
  function maybePromptPush() {
    if (!pushSoportado()) return;
    if (!pushActivado()) return;
    if (needsOnboarding()) return;
    if (Notification.permission !== 'default') return;   // ya concedido o denegado
    try { if (localStorage.getItem(PUSH_PREGUNTADO_KEY)) return; } catch (e) { return; }

    var modal = document.getElementById('pushPromptModal');
    if (!modal || !modal.classList.contains('hidden')) return;

    // No se apila sobre otro modal a pantalla completa.
    var otros = ['whatsNewModal', 'weightPromptModal', 'wizardModal'];
    for (var i = 0; i < otros.length; i++) {
      var el = document.getElementById(otros[i]);
      if (el && !el.classList.contains('hidden')) return;
    }

    try { localStorage.setItem(PUSH_PREGUNTADO_KEY, '1'); } catch (e) {}
    mostrarPushPrompt();
  }

  function mostrarPushPrompt() {
    var modal = document.getElementById('pushPromptModal');
    var overlay = document.getElementById('pushPromptOverlay');
    var si = document.getElementById('pushPromptYes');
    var no = document.getElementById('pushPromptNo');
    if (!modal || !si) return;

    modal.classList.remove('hidden');

    function close() { modal.classList.add('hidden'); }

    si.addEventListener('click', function () {
      close();
      // El diálogo nativo TIENE que salir desde el gesto del usuario.
      Notification.requestPermission().then(function (p) {
        if (p !== 'granted') {
          setPushActivado(false);
          showToast('Sin problema, no te avisaré');
          if (currentTab === 'home') renderHome();
          return;
        }
        suscribirPush().then(function (ok) {
          showToast(ok ? '🔔 Te avisaré los días que toque' : 'No se pudo activar el aviso');
          if (currentTab === 'home') renderHome();
        });
      });
    });

    no.addEventListener('click', function () {
      setPushActivado(false);
      close();
      if (currentTab === 'home') renderHome();
    });
    if (overlay) overlay.addEventListener('click', close);
  }

  // =============================================
  // AJUSTES PERSONALES (pestaña Perfil)
  // ---------------------------------------------
  // Peso y recordatorios. Viven aquí y no en el asistente porque cambian con
  // el tiempo y no deben obligar a rehacer la rutina para actualizarlos.
  // =============================================
  function ajustesPersonalesHtml() {
    var html = '';
    html += '<div class="stats-section-title">⚙️ Ajustes <span class="line"></span></div>';
    html += '<div class="ajustes-card">';

    var pesoActual = getBodyWeight();
    html += '  <div class="weight-setting weight-setting-primero">';
    html += '    <label class="weight-setting-label" for="bodyWeightInput">⚖️ Tu peso</label>';
    html += '    <div class="weight-setting-row">';
    html += '      <input id="bodyWeightInput" class="weight-setting-input" type="number" inputmode="decimal" '
         + 'min="30" max="250" step="0.5" placeholder="—" value="' + (pesoActual || '') + '">';
    html += '      <span class="weight-setting-unit">kg</span>';
    html += '    </div>';
    html += '    <div class="schedule-settings-hint">'
         + (pesoActual
             ? 'Se usa para estimar las calorías de cada sesión.'
             : 'Añádelo y verás las calorías estimadas de cada sesión.')
         + '</div>';
    html += '  </div>';

    // Recordatorios. Sólo se pinta si el navegador los admite: en una pestaña
    // de Safari en iPhone no existe PushManager, y un switch muerto sólo
    // generaría preguntas.
    if (pushSoportado()) {
      var denegado = Notification.permission === 'denied';
      var notifActivo = pushActivado() && !denegado;
      html += '  <div class="notif-setting">';
      html += '    <div class="notif-setting-row">';
      html += '      <div class="notif-setting-texto">';
      html += '        <div class="notif-setting-label">🔔 Recordatorios</div>';
      html += '        <div class="schedule-settings-hint">'
           + (denegado
               ? 'Los has bloqueado en el navegador. Se reactivan desde los ajustes del sitio.'
               : (notifActivo
                   ? 'Te aviso a las ' + pushHora() + ':00 los días que te toque entrenar.'
                   : 'Desactivados. No te avisaré de nada.'))
           + '</div>';
      html += '      </div>';
      html += '      <button class="notif-switch' + (notifActivo ? ' active' : '') + '" id="notifSwitch"'
           + (denegado ? ' disabled' : '') + ' role="switch" aria-checked="' + (notifActivo ? 'true' : 'false')
           + '" aria-label="Recordatorios de entrenamiento"><span class="notif-switch-knob"></span></button>';
      html += '    </div>';

      if (notifActivo) {
        html += '    <div class="notif-hora-row">';
        html += '      <label class="notif-hora-label" for="notifHora">A qué hora</label>';
        html += '      <select id="notifHora" class="notif-hora-select">';
        for (var nh = 6; nh <= 22; nh++) {
          html += '<option value="' + nh + '"' + (nh === pushHora() ? ' selected' : '') + '>'
               + (nh < 10 ? '0' : '') + nh + ':00</option>';
        }
        html += '      </select>';
        html += '    </div>';
      }
      html += '  </div>';
    }

    // Copia de seguridad. La copia se hace sola; aquí sólo está lo que el
    // usuario necesita para recuperarla en otro móvil, que es lo único que la
    // app no puede hacer por él.
    html += '  <div class="backup-setting">';
    html += '    <div class="backup-setting-label">☁️ Tus datos están a salvo</div>';

    if (syncDisponible() && syncCodigo()) {
      html += '    <div class="schedule-settings-hint">Se guarda una copia sola cada vez que '
           + 'entrenas. Para recuperarla en otro móvil hace falta este código: '
           + '<strong>apúntalo en algún sitio</strong>, es la única llave.</div>';
      html += '    <div class="sync-codigo" id="syncCodigo" role="button" tabindex="0" '
           + 'title="Pulsa para copiarlo">' + formatearCodigo(syncCodigo()) + '</div>';
      html += '    <div class="backup-setting-row">';
      html += '      <button class="backup-btn secundario" id="syncRecuperarBtn">📥 Traer datos de otro móvil</button>';
      html += '    </div>';
    } else {
      html += '    <div class="schedule-settings-hint">Ahora mismo no hay conexión con el '
           + 'servidor, así que la copia automática está parada. Puedes descargarte una a mano.</div>';
    }

    html += '    <div class="backup-setting-sub">';
    html += '      <div class="schedule-settings-hint">¿Prefieres un fichero tuyo? '
         + 'Esto no necesita servidor ni código.</div>';
    html += '      <div class="backup-setting-row">';
    html += '        <button class="backup-btn" id="backupExportBtn">⬇️ Exportar</button>';
    html += '        <button class="backup-btn secundario" id="backupImportBtn">⬆️ Importar</button>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    html += '</div>';
    return html;
  }

  // Los listeners van aparte del HTML porque el bloque se repinta entero cada
  // vez que cambia algo (renderStats), y hay que volver a engancharlos.
  function setupAjustesPersonales() {
    // El peso se guarda al salir del campo y no en cada tecla: escribir «75»
    // pasa por «7», y guardar eso dejaría un peso absurdo a medio teclear.
    var pesoInput = document.getElementById('bodyWeightInput');
    if (pesoInput) {
      var guardarPeso = function () {
        if (pesoInput.value.trim() === '') { setBodyWeight(null); return; }
        var v = parseFloat(pesoInput.value.replace(',', '.'));
        if (isNaN(v) || v < 30 || v > 250) {
          showToast('Pon un peso entre 30 y 250 kg');
          pesoInput.value = getBodyWeight() || '';
          return;
        }
        var previo = getBodyWeight();
        setBodyWeight(v);
        if (previo !== v) {
          showToast('✓ Peso guardado: ' + v + ' kg');
          // Sólo se repinta la gráfica, no todo Perfil: este handler salta en
          // el `blur`, y repintar la sección entera se llevaría por delante el
          // botón que el usuario acaba de pulsar antes de que llegue el click.
          setupBodyWeightChart();
        }
      };
      pesoInput.addEventListener('blur', guardarPeso);
      pesoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); pesoInput.blur(); }
      });
    }

    var notifSwitch = document.getElementById('notifSwitch');
    if (notifSwitch) notifSwitch.addEventListener('click', function () {
      if (notifSwitch.disabled) return;

      if (pushActivado()) {
        setPushActivado(false);
        desuscribirPush();
        showToast('Recordatorios desactivados');
        renderStats();
        return;
      }

      setPushActivado(true);
      if (Notification.permission === 'granted') {
        suscribirPush().then(function (ok) {
          showToast(ok ? '🔔 Te avisaré los días que toque' : 'No se pudo activar el aviso');
          renderStats();
        });
        return;
      }
      // Aún sin permiso: el diálogo nativo sale desde este mismo gesto.
      Notification.requestPermission().then(function (p) {
        if (p !== 'granted') {
          setPushActivado(false);
          showToast('El navegador no ha dado permiso');
          renderStats();
          return;
        }
        suscribirPush().then(function (ok) {
          showToast(ok ? '🔔 Te avisaré los días que toque' : 'No se pudo activar el aviso');
          renderStats();
        });
      });
    });

    var notifHora = document.getElementById('notifHora');
    if (notifHora) notifHora.addEventListener('change', function () {
      var h = parseInt(notifHora.value, 10);
      if (isNaN(h)) return;
      setPushHora(h);
      resyncPush();
      showToast('✓ Te avisaré a las ' + h + ':00');
      renderStats();
    });

    var expBtn = document.getElementById('backupExportBtn');
    if (expBtn) expBtn.addEventListener('click', exportarDatos);

    var impBtn = document.getElementById('backupImportBtn');
    if (impBtn) impBtn.addEventListener('click', pedirFicheroDeBackup);

    var codEl = document.getElementById('syncCodigo');
    if (codEl) {
      var copiar = function () {
        var c = syncCodigo();
        if (!c) return;
        // El portapapeles falla sin permiso o fuera de HTTPS. Que no se pueda
        // copiar no es grave: el código está en pantalla y se puede leer.
        try {
          navigator.clipboard.writeText(c)
            .then(function () { showToast('✓ Código copiado'); })
            .catch(function () { showToast('Cópialo a mano de la pantalla'); });
        } catch (e) { showToast('Cópialo a mano de la pantalla'); }
      };
      codEl.addEventListener('click', copiar);
      codEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copiar(); }
      });
    }

    var recBtn = document.getElementById('syncRecuperarBtn');
    if (recBtn) recBtn.addEventListener('click', function () {
      var c = window.prompt('Escribe el código del móvil donde tienes tus datos:');
      if (c) recuperarConCodigo(c);
    });
  }

  // En grupos de cuatro. Un chorro de 24 caracteres seguidos no hay quien lo
  // copie a mano sin perder el sitio.
  function formatearCodigo(c) {
    return String(c || '').replace(/(.{4})/g, '$1 ').trim();
  }

  // =============================================
  // AVISO DEL PESO CORPORAL
  // ---------------------------------------------
  // Quien ya tenía una rutina antes de la v4.26.0 nunca ve el campo de
  // Inicio si no entra ahí por su cuenta, así que las calorías se quedan
  // apagadas para siempre en silencio. Este modal se lo pide una vez por
  // sesión al entrar a la pestaña Rutina — donde va a entrenar, que es
  // adonde apunta el dato — con la explicación de por qué se pide.
  //
  // No es bloqueante: se puede posponer. «Forzar» aquí significa no dejar
  // que pase desapercibido, no impedir usar la app sin dar el peso.
  var weightPromptShown = false;

  function maybePromptBodyWeight() {
    if (weightPromptShown) return;
    if (needsOnboarding()) return;      // usuario nuevo: eso lo pide el asistente
    if (getBodyWeight()) return;

    var modal = document.getElementById('weightPromptModal');
    if (!modal || !modal.classList.contains('hidden')) return;

    // No se apila sobre otro modal a pantalla completa: se reintenta al
    // cerrar el que esté delante (ver el close() de mostrarWhatsNew()).
    var wn = document.getElementById('whatsNewModal');
    if (wn && !wn.classList.contains('hidden')) return;
    var wiz = document.getElementById('wizardModal');
    if (wiz && !wiz.classList.contains('hidden')) return;

    weightPromptShown = true;
    showBodyWeightPrompt();
  }

  function showBodyWeightPrompt() {
    var modal = document.getElementById('weightPromptModal');
    var overlay = document.getElementById('weightPromptOverlay');
    var input = document.getElementById('weightPromptInput');
    var save = document.getElementById('weightPromptSave');
    var later = document.getElementById('weightPromptLater');
    if (!modal || !input || !save) return;

    input.value = '';
    modal.classList.remove('hidden');
    setTimeout(function () { input.focus(); }, 150);

    function close() { modal.classList.add('hidden'); }

    function guardar() {
      var v = parseFloat(input.value.replace(',', '.'));
      if (isNaN(v) || v < 30 || v > 250) {
        showToast('Pon un peso entre 30 y 250 kg');
        return;
      }
      setBodyWeight(v);
      showToast('✓ Peso guardado: ' + v + ' kg');
      close();
      // Repinta lo que ya está en pantalla para que las kcal aparezcan ya,
      // sin esperar a la próxima navegación.
      renderRoutineStatus();
      if (currentTab === 'rutina') renderCurrentDay();
    }

    save.addEventListener('click', guardar);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); guardar(); }
    });
    if (later) later.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
  }

  // `progreso` opcional: si viene, se pintan barras de lo hecho esta semana.
  function planExplainerHtml(plan, progreso) {
    if (!plan) return '';
    var html = '';

    html += '<div class="why-head">';
    html += '  <div class="why-name">' + escapeHtml(plan.splitName || 'Tu rutina') + '</div>';
    html += '  <div class="why-sub">' + escapeHtml(plan.daysLabel || '')
         + (plan.freqLabel ? ' · ' + escapeHtml(plan.freqLabel) : '') + '</div>';
    html += '</div>';

    if (plan.splitWhy) {
      html += '<div class="why-block">';
      html += '  <div class="why-block-title">Por qué este reparto</div>';
      html += '  <p class="why-text">' + escapeHtml(plan.splitWhy) + '</p>';
      // Si se reagrupó la fuerza para meter la carrera, hay que decirlo: el
      // usuario pidió X días y recibe otra distribución.
      // El número de carreras ya no es fijo: hay que leerlo del plan en vez de
      // escribir «3» a mano, que era lo que había y decía «añade 3 días suyos»
      // sobre una semana con una sola carrera.
      var nCarreras = plan.runningDays || (plan.compacted && plan.compacted.diasCarrera) || 0;
      var labelCarreras = nCarreras + (nCarreras === 1 ? ' día propio' : ' días propios');

      if (plan.compacted) {
        html += '  <p class="why-text why-text-small why-text-warn">Pediste '
             + plan.compacted.diasPedidos + ' días, pero el plan de carrera necesita '
             + labelCarreras + '. Tu fuerza se ha reagrupado en ' + plan.compacted.diasFuerza
             + ' sesiones más largas (unos ' + plan.compacted.minutosEstimados + ' min) para que entre todo '
             + 'y te quede un día de descanso. El total de series semanales se mantiene.</p>';
      } else if (nCarreras && plan.trainingDays
                 && plan.trainingDays.length > (parseInt(plan.answers && plan.answers.days, 10) || 0)) {
        // Sin compactación pero con carrera: la fuerza cabe entera y las
        // carreras se suman encima. Sin decirlo, pides 5 y ves 6 sin saber
        // de dónde sale el sexto.
        html += '  <p class="why-text why-text-small why-text-warn">Pediste '
             + escapeHtml(String(plan.answers.days)) + ' días de fuerza y los tienes, pero la carrera '
             + 'añade ' + labelCarreras + ' encima: por eso la semana sale de '
             + plan.trainingDays.length + ' días.</p>';
      }
      html += '</div>';
    }

    // Cada día por GRUPOS musculares, no por nombres de ejercicio.
    html += '<div class="why-block"><div class="why-block-title">Tu semana</div>';
    var kcalDias = caloriasPorDia(plan) || [];
    plan.phases[0].days.forEach(function (day, iDia) {
      html += '<div class="why-day">';
      html += '  <span class="why-day-emoji">' + day.emoji + '</span>';
      html += '  <span class="why-day-name">' + escapeHtml(day.day) + '</span>';
      if (day.type === 'running') {
        html += '  <span class="why-day-groups">Plan de carrera · cambia cada semana</span>';
        if (kcalDias[iDia]) {
          html += '  <span class="why-day-meta">~' + kcalDias[iDia] + ' kcal</span>';
        }
      } else {
        var grupos = [], mins = 0;
        day.exercises.forEach(function (ex) {
          // Los preventivos de carrera traen su propia etiqueta de músculo
          // («Glúteos» frente a «Glúteo»), así que se dejan fuera de la lista
          // de grupos: son un bloque añadido, no lo que define la sesión.
          if (!ex.preventive && grupos.indexOf(ex.muscle) === -1) grupos.push(ex.muscle);
          mins += exerciseMinutes(ex.series || 3, parseRestSeconds(ex.rest) || 60);
        });
        html += '  <span class="why-day-groups">' + escapeHtml(grupos.join(' · ')) + '</span>';
        html += '  <span class="why-day-meta">' + day.exercises.length + ' ej · ~' + Math.round(mins + 6) + ' min'
             + (kcalDias[iDia] ? ' · ~' + kcalDias[iDia] + ' kcal' : '') + '</span>';
      }
      html += '</div>';
    });
    html += '</div>';

    // Objetivo semanal por grupo. Con progreso si lo hay.
    var vol = plan.volume || {};
    var grupos = Object.keys(vol).sort(function (a, b) { return vol[b].target - vol[a].target; });
    if (grupos.length) {
      html += '<div class="why-block">';
      html += '  <div class="why-block-title">Tu objetivo semanal'
           + (progreso ? ' <span class="why-block-note">esta semana</span>' : '') + '</div>';
      if (progreso) {
        // Con progreso: una fila por grupo, que las barras necesitan ancho.
        grupos.forEach(function (g) {
          var target = vol[g].target;
          var hechas = progreso[g] || 0;
          var pct = Math.min(100, Math.round((hechas / target) * 100));
          html += '<div class="why-vol">';
          html += '  <span class="why-vol-name">' + escapeHtml(GROUP_LABEL_G[g] || g) + '</span>';
          html += '  <span class="why-vol-bar"><span class="why-vol-fill' + (pct >= 100 ? ' done' : '') + '" style="width:' + pct + '%"></span></span>';
          html += '  <span class="why-vol-num">' + hechas + ' / ' + target + (pct >= 100 ? ' ✓' : '') + '</span>';
          html += '</div>';
        });
      } else {
        // Sin progreso (resumen del asistente): en línea, para que la
        // pantalla siga cabiendo de un vistazo en un móvil.
        html += '<p class="why-inline">' + grupos.map(function (g) {
          return '<span class="why-inline-g">' + escapeHtml(GROUP_LABEL_G[g] || g)
               + ' <strong>' + vol[g].sets + '</strong></span>';
        }).join('') + '</p>';
      }
      if (plan.volumeWhy) {
        html += '<p class="why-text why-text-small">' + escapeHtml(plan.volumeWhy) + '</p>';
      }
      // Si el tiempo declarado no da para el objetivo, se dice claramente en
      // vez de callarlo: es información accionable, no un fallo del plan.
      var cortos = grupos.filter(function (g) { return BIG_GROUPS[g] && vol[g].sets < vol[g].target * 0.7; });
      if (cortos.length) {
        html += '<p class="why-text why-text-small why-text-warn">Con ' + escapeHtml(String(plan.answers && plan.answers.minutes || ''))
             + ' min y ' + escapeHtml(String(plan.answers && plan.answers.days || '')) + ' días no da tiempo a llegar al objetivo en '
             + escapeHtml(cortos.map(function (g) { return (GROUP_LABEL_G[g] || g).toLowerCase(); }).join(', '))
             + '. Sigue siendo un buen plan; si puedes añadir días o minutos, crecerás más rápido.</p>';
      }
      html += '</div>';
    }

    // Calorías: siempre después del volumen, nunca en su lugar. Las series son
    // lo que dirige el plan; esto es un dato de contexto.
    var kcalSemana = caloriasSemana(plan);
    if (kcalSemana) {
      html += '<div class="why-block">';
      html += '  <div class="why-block-title">Gasto estimado</div>';
      html += '  <p class="why-inline"><span class="why-inline-g">Por semana <strong>~'
           + kcalSemana + ' kcal</strong></span></p>';
      html += '  <p class="why-text why-text-small">Calculado con tus ' + getBodyWeight()
           + ' kg y la duración de cada sesión. Es una orientación: en trabajo de fuerza estas '
           + 'estimaciones se mueven fácil un 30% arriba o abajo según tu ritmo y tu esfuerzo.</p>';
      html += '</div>';
    } else if (!getBodyWeight()) {
      html += '<div class="why-block">';
      html += '  <p class="why-text why-text-small">⚖️ Añade tu peso en Perfil y te digo también '
           + 'las calorías estimadas de cada sesión.</p>';
      html += '</div>';
    }

    // Cómo progresa: es lo que convierte 12 semanas sueltas en un programa.
    html += '<div class="why-block"><div class="why-block-title">Cómo progresas</div>';
    plan.phases.forEach(function (ph) {
      var ej = null;
      ph.days.some(function (d) { return d.exercises.some(function (x) { if (!x.preventive) { ej = x; return true; } }); });
      html += '<div class="why-phase"><span class="why-phase-name">' + escapeHtml(ph.name) + '</span>'
           + (ej ? '<span class="why-phase-meta">' + ej.series + '×' + escapeHtml(ej.reps) + '</span>' : '') + '</div>';
    });
    if (plan.deloadWeeks && plan.deloadWeeks.length) {
      html += '<p class="why-text why-text-small">La semana ' + plan.deloadWeeks.join(', ')
           + ' bajas series para recuperar: sin descarga, doce semanas seguidas de más carga acaban en estancamiento.</p>';
    }
    html += '</div>';

    return html;
  }

  // Abre el explicador desde la pestaña Rutina, con el progreso de la semana.
  function openWhyModal() {
    var plan = loadCustomPlan();
    var modal = document.getElementById('whyModal');
    var body = document.getElementById('whyBody');
    if (!modal || !body) return;
    if (!plan) { showToast('Este plan no tiene explicación guardada'); return; }
    body.innerHTML = planExplainerHtml(plan, weeklyVolumeProgress());
    modal.classList.remove('hidden');
  }

  function closeWhyModal() {
    var modal = document.getElementById('whyModal');
    if (modal) modal.classList.add('hidden');
  }

  function setupWhyModal() {
    var o = document.getElementById('whyModalOverlay');
    var c = document.getElementById('whyClose');
    var k = document.getElementById('whyOk');
    if (o) o.addEventListener('click', closeWhyModal);
    if (c) c.addEventListener('click', closeWhyModal);
    if (k) k.addEventListener('click', closeWhyModal);
  }

  function renderWizardSummary(el) {
    var plan = generateValidRoutine(wizardAnswers);
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

    // El resumen explica el PROGRAMA, no lo enumera. Antes volcaba todos los
    // ejercicios de cada día: costaba de leer, no daba contexto de qué era
    // cada ejercicio y no ayudaba a decidir lo único que se decide aquí, que
    // es si aceptas el plan. El detalle bueno (animación, pasos, alternativas)
    // ya está en la pestaña Rutina.
    html += '<h3 class="wizard-title">Tu rutina está lista 🎉</h3>';

    // Convertir una plantilla no es lo mismo que rehacer tu propia rutina: se
    // sustituye un programa escrito a mano por uno generado, y no van a ser
    // iguales. Hay que decirlo ANTES de que le dé a guardar.
    if (wizardConvirtiendo) {
      html += '<p class="wizard-aviso">⚠️ «' + escapeHtml(nombrePlanActivo()) + '» es una plantilla '
        + 'escrita a mano. Al guardar pasa a ser una rutina a medida que <strong>sí podrás ajustar</strong> '
        + 'desde el coach, pero no será ejercicio por ejercicio la de antes. '
        + '<strong>Tus pesos, tus sesiones y tu racha se conservan</strong>, y puedes volver a la '
        + 'plantilla original desde Perfil → Editar.</p>';
    }

    html += planExplainerHtml(plan, null);

    html += '<div class="wizard-nav wizard-nav-final">';
    html += '  <button class="wizard-back" id="wizardBack">← Atrás</button>';
    html += '  <button class="wizard-save" id="wizardSave">✅ Usar esta rutina</button>';
    html += '</div>';

    el.innerHTML = html;
    playWizardEnter(el);

    document.getElementById('wizardBack').addEventListener('click', function () { wizardStep--; renderWizard(); });

    document.getElementById("wizardSave").addEventListener("click", function () {
      // Nada se guarda sin pasar el validador: es más barato comprobar
      // invariantes que fiarse de que el generador siempre acierte.
      var problems = validatePlan(plan, wizardAnswers);
      if (problems.length) {
        console.warn("Plan rechazado por el validador:", problems);
        showToast("⚠ " + problems[0].msg);
        return;
      }
      // En modo 'edit' conserva el id, así el plan mantiene su historial.
      // En 'create' nace con UUID propio y no pisa nada.
      var isEdit = wizardMode === 'edit' && wizardTargetId && getPlanEntry(wizardTargetId);
      var convertida = wizardConvirtiendo;
      var planId = upsertGeneratedPlan(plan, isEdit ? { id: wizardTargetId } : { name: nextPlanName() });
      if (!planId) { showToast('⚠ No se ha podido guardar el plan'); return; }

      markOnboardingDone();
      finishRoutineWizard();
      renderPlanOptions();
      switchProfile(planId);
      switchTab('rutina');
      showToast(convertida ? 'Ya es tuya: ahora sí puedo ajustártela 🎉'
                           : (isEdit ? 'Rutina actualizada 🎉' : 'Rutina creada 🎉'));
    });
  }

  // Cada regeneración rota los candidatos para que salgan ejercicios distintos.
  var wizardShuffleSeed = 0;

  // ---- Selector de planes ----
  // Antes los tres perfiles estaban escritos a mano en index.html y sólo se
  // añadía «Mi plan» por JS. Ahora se pinta entero desde el registro, porque
  // el número de planes es variable.
  var planEditMode = false;

  // Cabecera y contenedor del selector, dentro de Perfil. Los planes en sí los
  // pinta renderPlanOptions() desde el registro.
  function planSelectorHtml() {
    var html = '';
    // El botón va DESPUÉS de la línea: la línea es flex:1 y, colocado antes,
    // se quedaría sin ancho.
    html += '<div class="stats-section-title">🗂️ Tus planes '
         + '<span class="line"></span>'
         + '<button id="planEditToggle" class="plan-edit-toggle">'
         + (planEditMode ? 'Hecho' : '✏️ Editar') + '</button>'
         + '</div>';
    html += '<div class="plan-selector-card">';
    html += '  <div class="profile-modal-options' + (planEditMode ? ' editing' : '') + '"></div>';
    html += '  <button id="redoWizardBtn" class="profile-modal-action">';
    html += '    <span class="profile-modal-action-icon">🎯</span>';
    html += '    <span class="profile-modal-action-text">';
    html += '      <span class="profile-modal-action-title">Cambiar mi objetivo</span>';
    html += '      <span class="profile-modal-action-desc">Vuelve a responder las preguntas y genera otra rutina</span>';
    html += '    </span>';
    html += '  </button>';
    html += '</div>';
    return html;
  }

  function setupPlanSelector() {
    var editToggle = document.getElementById('planEditToggle');
    if (editToggle) editToggle.addEventListener('click', togglePlanEditMode);

    var redoBtn = document.getElementById('redoWizardBtn');
    if (redoBtn) redoBtn.addEventListener('click', function () {
      openRoutineWizard(false, { mode: 'edit', planId: activeProfile });
    });

    renderPlanOptions();
  }

  function renderPlanOptions() {
    var wrap = document.querySelector('.profile-modal-options');
    if (!wrap) return;
    wrap.innerHTML = '';

    listPlanEntries().forEach(function (entry) {
      if (!PROFILES[entry.id]) return;
      var btn = document.createElement('button');
      btn.className = 'profile-option' + (entry.id === activeProfile ? ' active' : '');
      btn.dataset.profile = entry.id;
      btn.innerHTML = '<span class="profile-option-initial">' + escapeHtml(entry.initial || '?') + '</span>'
        + '<span class="profile-option-name">' + escapeHtml(entry.name) + '</span>';

      if (planEditMode) {
        var del = document.createElement('span');
        del.className = 'profile-option-delete';
        del.textContent = '×';
        del.setAttribute('aria-label', 'Borrar ' + entry.name);
        del.addEventListener('click', function (e) {
          e.stopPropagation();
          confirmDeletePlan(entry.id);
        });
        btn.appendChild(del);

        // Vuelta atrás de una conversión: el plan ocupa el id de una plantilla
        // que sigue existiendo en el código, así que se puede recuperar tal
        // cual era. El historial no se toca, vive en su propia clave.
        if (!entry.builtin && BUILTIN_PROFILES[entry.id]) {
          var undo = document.createElement('span');
          undo.className = 'profile-option-restore';
          undo.textContent = '↺';
          undo.title = 'Volver a la plantilla original';
          undo.setAttribute('aria-label', 'Restaurar la plantilla ' + entry.name);
          undo.addEventListener('click', function (e) {
            e.stopPropagation();
            confirmRestaurarPlantilla(entry.id);
          });
          btn.appendChild(undo);
        }

        btn.addEventListener('click', function () { promptRenamePlan(entry.id); });
      } else {
        btn.addEventListener('click', function () { switchProfile(entry.id); });
      }
      wrap.appendChild(btn);
    });

    // Círculo de «añadir», con el mismo tamaño que los planes pero en trazo
    // discontinuo para que no se lea como un plan más.
    var add = document.createElement('button');
    add.className = 'profile-option profile-option-new';
    add.innerHTML = '<span class="profile-option-initial">+</span>'
      + '<span class="profile-option-name">Nuevo plan</span>';
    add.addEventListener('click', function () {
      openRoutineWizard(false, { mode: 'create' });
    });
    wrap.appendChild(add);
  }

  // Deshace una conversión: el plan generado se descarta y vuelve la plantilla
  // escrita a mano. NO toca el historial, que vive en `gym_calendar_data_<id>`
  // y es del id, no del contenido del plan.
  function confirmRestaurarPlantilla(id) {
    var entry = getPlanEntry(id);
    var plantilla = BUILTIN_PROFILES[id];
    if (!entry || !plantilla) return;

    if (!window.confirm('¿Volver a la plantilla original «' + plantilla.name + '»?\n\n'
        + 'Se descarta la rutina generada. Tus pesos, sesiones y racha se conservan.')) return;

    planRegistry.plans[id] = {
      id: id,
      name: plantilla.name,
      initial: plantilla.initial,
      builtin: true,
      createdAt: entry.createdAt,
      updatedAt: new Date().toISOString()
    };
    savePlanRegistry();
    rebuildProfiles();

    // Los días guardados son los de la rutina generada; hay que devolverlos a
    // los de la plantilla o el calendario indexaría sesiones que ya no están.
    sincronizarDiasDeEntreno(id, { trainingDays: plantilla.defaultDays });

    renderPlanOptions();
    if (id === activeProfile) switchProfile(id);
    showToast('Plantilla «' + plantilla.name + '» restaurada');
  }

  // Borrar es la vía por la que cada uno se queda sólo con sus planes, así que
  // el aviso tiene que decir QUÉ se pierde: en un dispositivo compartido el
  // plan que se borra puede no ser el tuyo.
  function confirmDeletePlan(id) {
    var entry = getPlanEntry(id);
    if (!entry) return;

    if (Object.keys(planRegistry.plans).length <= 1) {
      showToast('No puedes quedarte sin ningún plan');
      return;
    }

    var stats = getPlanHistoryStats(id);
    var msg = '¿Borrar el plan «' + entry.name + '»?';
    if (stats.workouts || stats.logs) {
      msg += '\n\nSe perderán ' + stats.workouts + ' día(s) de entrenamiento registrados'
           + ' y ' + stats.logs + ' registro(s) de peso.';
    }
    msg += entry.builtin
      ? '\n\nAl ser una plantilla, podrás volver a crearlo desde «+», pero el progreso no se recupera.'
      : '\n\nEsta acción no se puede deshacer.';

    if (!window.confirm(msg)) return;

    var wasActive = (id === activeProfile);
    if (!deletePlan(id)) { showToast('No se ha podido borrar'); return; }

    if (wasActive) {
      switchProfile(Object.keys(PROFILES)[0]);
    } else {
      renderPlanOptions();
    }
    showToast('Plan borrado');
  }

  function promptRenamePlan(id) {
    var entry = getPlanEntry(id);
    if (!entry) return;
    var name = window.prompt('Nombre del plan', entry.name);
    if (name === null) return;
    name = name.trim();
    if (!name) return;
    renamePlan(id, name);
    renderPlanOptions();
    updateProfileUI();
  }

  function togglePlanEditMode() {
    planEditMode = !planEditMode;
    var btn = document.getElementById('planEditToggle');
    if (btn) btn.textContent = planEditMode ? 'Hecho' : '✏️ Editar';
    var wrap = document.querySelector('.profile-modal-options');
    if (wrap) wrap.classList.toggle('editing', planEditMode);
    renderPlanOptions();
  }

  // El modo edición no debe sobrevivir a salir de Perfil: al volver se espera
  // poder cambiar de plan de un toque, no borrarlo sin querer.
  function salirDeEdicionDePlanes() {
    if (planEditMode) planEditMode = false;
  }

  // Se mantiene el nombre antiguo: lo llaman varios puntos del arranque.
  function addCustomProfileOption() { renderPlanOptions(); }

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

  // El botón de la cabecera lleva a Perfil, que es donde viven los planes.
  function openProfileSelector() { switchTab('stats'); }

  // Primera vez que se entra en el plan combinado: fija la semana 1 en la
  // semana actual y arrastra los pesos ya registrados en Sergio, que comparte
  // los mismos ids de ejercicio. No se copian las sesiones completadas: son de
  // otro plan y falsearían el calendario.
  // Sergio pasa a ser el programa combinado fuerza + carrera. Los pesos ya
  // registrados se conservan solos (mismo perfil, mismos ids de ejercicio),
  // pero hay dos cosas que sí hay que tocar una única vez:
  //
  //  - Los días guardados son [1,3,5] y el plan nuevo tiene 5 sesiones; sin
  //    actualizarlos, tres días intentarían cubrir cinco entradas.
  //  - La semana se deduce del registro más antiguo, así que con historial
  //    previo se arrancaría muy por delante de la semana 12 y el plan de
  //    carrera aparecería como terminado. Una readaptación tiene que empezar
  //    por la semana 1, así que se fija el inicio a hoy.
  function initCombinedPlan() {
    if (activeProfile !== 'sergio') return;
    if (!state.settings) state.settings = {};
    if (state.settings.combinedPlan) return;   // ya migrado

    state.settings.combinedPlan = true;
    state.settings.planStart = getTodayKey();
    state.settings.trainingDays = PROFILES.sergio.defaultDays.slice();
    saveState();
  }

  function switchProfile(profileId) {
    if (!PROFILES[profileId]) return;
    activeProfile = profileId;
    try {
      localStorage.setItem(ACTIVE_PLAN_KEY, activeProfile);
      // Se sigue escribiendo la clave antigua para que revertir el despliegue
      // no deje al usuario en un plan que la versión anterior no conoce.
      localStorage.setItem(LEGACY_ACTIVE_KEY, activeProfile);
    } catch (e) {}
    PHASES = PROFILES[activeProfile].phases;
    ACTIVE_WARMUP = PROFILES[activeProfile].warmup;
    state = loadState();
    initCombinedPlan();
    // Cada perfil guarda sus propios cambios de ejercicio
    reregisterSwappedExercises();
    updateProfileUI();
    renderRoutineStatus();
    renderCurrentDay();
    updateAll();
    salirDeEdicionDePlanes();
    if (currentTab === 'home') renderHome();
    if (currentTab === 'stats') renderStats();
    showToast('Plan: ' + PROFILES[activeProfile].name);
  }

  // =============================================
  // AVISO DE VERSIÓN NUEVA
  // =============================================
  // En iOS la PWA se queda suspendida en el selector de apps y puede pasar
  // días sin volver a navegar, así que no se entera de que hay versión nueva.
  // Aquí se fuerza la comprobación al abrir y al volver del segundo plano, y
  // cuando el service worker nuevo toma el control se ofrece recargar.
  var updateBannerShown = false;

  // Si hay actualización pendiente, las novedades no se enseñan todavía: se
  // leerán después de recargar. Ver setupWhatsNew().
  var whatsNewPendiente = null;

  // Marca puesta justo antes de recargar para actualizar. Al volver a arrancar
  // es lo único que distingue «te acabas de actualizar» de una carga normal.
  var UPDATE_FLAG = 'gym_update_recargando';

  // El aviso es un único elemento con tres estados, no tres banners
  // distintos: descargando → listo → actualizada. Así no se apilan avisos ni
  // parpadea la pantalla entre uno y otro.
  var updateBar = null;

  function getUpdateBar() {
    if (updateBar && updateBar.parentNode) return updateBar;
    updateBar = document.createElement('div');
    updateBar.className = 'update-banner';
    updateBar.id = 'updateBanner';
    document.body.appendChild(updateBar);
    return updateBar;
  }

  function closeUpdateBar() {
    if (updateBar && updateBar.parentNode) updateBar.remove();
    updateBar = null;
  }

  // Progreso real de la descarga del shell, reportado por el service worker.
  // Antes esto pasaba en silencio: el catálogo son ~900 KB y con datos móviles
  // la espera se nota, pero no había nada en pantalla hasta el aviso final.
  function showUpdateProgress(hechos, total) {
    if (updateBannerShown) return;   // ya está listo, no volvemos atrás

    var bar = getUpdateBar();
    var pct = total ? Math.round((hechos / total) * 100) : 0;

    var relleno = bar.querySelector('.update-banner-fill');
    if (!relleno) {
      bar.className = 'update-banner update-banner-progress';
      bar.innerHTML = '';
      var txt = document.createElement('span');
      txt.className = 'update-banner-text';
      txt.textContent = '⬇️ Descargando actualización…';
      bar.appendChild(txt);

      var pista = document.createElement('span');
      pista.className = 'update-banner-track';
      relleno = document.createElement('span');
      relleno.className = 'update-banner-fill';
      pista.appendChild(relleno);
      bar.appendChild(pista);
    }
    relleno.style.width = pct + '%';
  }

  function showUpdateBanner() {
    if (updateBannerShown) return;
    updateBannerShown = true;

    // Cancela las novedades que estuvieran esperando: primero se actualiza y
    // luego se cuenta qué hay de nuevo, no al revés.
    whatsNewPendiente = null;

    var bar = getUpdateBar();
    bar.className = 'update-banner';   // quita el estado de progreso
    bar.innerHTML = '';

    var txt = document.createElement('span');
    txt.className = 'update-banner-text';
    txt.textContent = '✨ Nueva versión lista';
    bar.appendChild(txt);

    var btn = document.createElement('button');
    btn.className = 'update-banner-btn';
    btn.textContent = 'Actualizar';
    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = 'Actualizando…';
      // La marca sobrevive a la recarga y es lo que dispara la confirmación y
      // las novedades al volver.
      try { localStorage.setItem(UPDATE_FLAG, '1'); } catch (e) {}
      window.location.reload();
    });
    bar.appendChild(btn);

    var close = document.createElement('button');
    close.className = 'update-banner-close';
    close.setAttribute('aria-label', 'Cerrar');
    close.textContent = '✕';
    close.addEventListener('click', closeUpdateBar);
    bar.appendChild(close);
  }

  // ¿Venimos de pulsar «Actualizar»? Lo consume init() al arrancar, y lo mira
  // también setupWhatsNew() para saber si toca esperar o no.
  var acabamosDeActualizar = false;

  function consumirMarcaActualizacion() {
    var marca;
    try { marca = localStorage.getItem(UPDATE_FLAG); } catch (e) { return false; }
    if (!marca) return false;
    try { localStorage.removeItem(UPDATE_FLAG); } catch (e) {}
    updateBannerShown = true;   // no queremos que reaparezca el aviso de versión
    return true;
  }

  // Confirmación de que ya está actualizada, en barra.
  //
  // Sólo se usa cuando NO va a salir el modal de novedades. Si sale, la
  // confirmación va dentro del propio modal: el modal ocupa toda la pantalla
  // con z-index 1150 y el banner está en 1100, así que lo tapaba al segundo de
  // aparecer y la confirmación no se llegaba a leer.
  function mostrarBannerActualizada() {
    var bar = getUpdateBar();
    bar.className = 'update-banner update-banner-ok';
    bar.innerHTML = '';
    var txt = document.createElement('span');
    txt.className = 'update-banner-text';
    txt.textContent = '✅ Ya estás en la v' + APP_VERSION;
    bar.appendChild(txt);
    setTimeout(closeUpdateBar, 4000);
  }

  function setupServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    // Si ya hay un worker controlando la página, cualquier worker nuevo que
    // aparezca es una actualización. En la primera visita no lo hay, y ahí no
    // se avisa de nada: no habría de qué.
    var hadController = !!navigator.serviceWorker.controller;

    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (hadController) showUpdateBanner();
    });

    // Progreso de la instalación, que manda el propio service worker. En el
    // primer estreno no se enseña: no hay nada que «actualizar», y una barra
    // de progreso encima del onboarding sólo confunde.
    navigator.serviceWorker.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.tipo !== 'instalando' || !hadController) return;
      whatsNewPendiente = null;
      showUpdateProgress(d.hechos, d.total);
    });

    function register() {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        // Si al registrar ya hay uno instalándose o esperando, la
        // actualización está en marcha desde antes de este arranque.
        // Ojo con `hadController`: en la PRIMERA instalación también hay un
        // worker instalándose y no es ninguna actualización. Sin esa
        // condición se cancelaban las novedades en cada estreno y el modal
        // no salía nunca.
        if (hadController && (reg.installing || reg.waiting)) whatsNewPendiente = null;

        reg.addEventListener('updatefound', function () {
          var nw = reg.installing;
          if (!nw) return;

          // Las novedades se cancelan aquí y no al llegar a 'installed':
          // instalar descarga el shell entero (el catálogo son ~900 KB), así
          // que puede tardar bastante más que la espera de WHATSNEW_ESPERA y
          // el modal ya habría salido.
          if (hadController) whatsNewPendiente = null;

          nw.addEventListener('statechange', function () {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateBanner();
            }
          });
        });

        function checkForUpdate() { reg.update().catch(function () {}); }

        // Al volver del segundo plano: es el momento en que el usuario abre la
        // PWA desde el icono, que en iOS muchas veces no dispara navegación.
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === 'visible') checkForUpdate();
        });
        window.addEventListener('focus', checkForUpdate);
        checkForUpdate();
      }).catch(function () {});
    }

    // Esperar a 'load' evita competir con la carga inicial, pero si ya ha
    // pasado el evento no volverá a dispararse y el registro no ocurriría.
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register);
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    initCombinedPlan();
    // Antes de pintar nada: el peso pasó de vivir por plan a ser único, y hay
    // que rescatar el que ya estuviera guardado.
    migrarPesoCorporal();
    migrarHistorialPeso();
    reregisterSwappedExercises();
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

    // El botón de la cabecera abre Perfil. Sus controles internos (editar,
    // cambiar de plan, «Cambiar mi objetivo») se enganchan en
    // setupPlanSelector() cada vez que se pinta la vista.
    var badge = document.getElementById('profileBadge');
    if (badge) badge.addEventListener('click', openProfileSelector);

    updateProfileUI();

    var wizardOverlay = document.getElementById('wizardModalOverlay');
    if (wizardOverlay) wizardOverlay.addEventListener('click', closeRoutineWizard);
    var wizardClose = document.getElementById('wizardClose');
    if (wizardClose) wizardClose.addEventListener('click', closeRoutineWizard);

    setupServiceWorker();
    // Antes que setupWhatsNew(): decide si toca confirmar la actualización o
    // esperar por si hay una en camino.
    acabamosDeActualizar = consumirMarcaActualizacion();
    setupFeedback();
    setupAiCoach();
    setupWhyModal();
    var habraNovedades = setupWhatsNew();
    // La confirmación va dentro del modal cuando hay novedades que contar; si
    // no las hay, se saca en barra para no dejar la actualización sin cerrar.
    if (acabamosDeActualizar && !habraNovedades) mostrarBannerActualizada();
    flushFeedbackQueue();

    // La pestaña por defecto es Rutina, y ahí no pasa por switchTab(), así que
    // hace falta este gancho aparte. El retraso deja que termine primero el
    // modal de novedades (WHATSNEW_ESPERA, 2,5 s) si va a aparecer: si sigue
    // abierto al disparar esto, se reintenta desde su propio close().
    setTimeout(maybePromptBodyWeight, 3200);

    // El aviso de notificaciones va detrás del del peso: dos peticiones
    // seguidas nada más abrir se leen como acoso. Si el del peso está en
    // pantalla, éste se retrae y saldrá en la próxima visita a Rutina.
    setTimeout(maybePromptPush, 5000);

    // Si ya estaba concedido de una sesión anterior, se refresca la agenda por
    // si cambiaron los días o el plan estando la app cerrada.
    setTimeout(resyncPush, 6000);

    // Sincronización. Se pide lo persistente enseguida (es sólo una petición
    // al navegador) y la bajada va con retraso: si el servidor va por delante
    // esto acaba recargando la página, y hacerlo en el primer segundo daría la
    // sensación de que la app arranca dos veces.
    pedirAlmacenamientoPersistente();
    setTimeout(function () {
      // Sólo cuando se sabe quién va por delante se empieza a contar lo de
      // aquí como cambios. Si el servidor no contesta, el temporizador de
      // abajo lo desbloquea igualmente: quedarse sin sincronizar es malo, pero
      // quedarse además sin guardar en local sería peor.
      var listo = function () { syncArranqueListo = true; };
      bajarCopiaSiProcede().then(listo, listo);
    }, 1500);
    setTimeout(function () { syncArranqueListo = true; }, 12000);

    // Última oportunidad de subir antes de que la app se vaya a segundo plano.
    // En móvil el `beforeunload` no es fiable —el sistema mata la pestaña sin
    // avisar—, así que el gancho bueno es éste.
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') subirCopiaYa(true);
    });
    window.addEventListener('pagehide', function () { subirCopiaYa(true); });

    var pendingOnboarding = needsOnboarding();
    // Bloquea la app desde el primer frame para que no se vea el fondo
    if (pendingOnboarding) document.body.classList.add('onboarding-lock');

    // Carga el catálogo en segundo plano y repinta cuando esté listo
    EXERCISE_DB.load().then(function () {
      // Ahora sí hay dataset: los planes generados recuperan sus descripciones
      registerAllPlanExercises();
      // Los sustitutos guardados necesitan el dataset para recuperar sus pasos
      reregisterSwappedExercises();
      if (currentTab === 'rutina') renderCurrentDay();
      if (currentTab === 'db') renderExerciseBrowser();
      if (pendingOnboarding) openRoutineWizard(true);
    }).catch(function () {
      // Sin catálogo no se puede generar rutina: no bloqueamos la app
      document.body.classList.remove('onboarding-lock');
    });

    // El número de versión abre el histórico completo. Es el sitio donde
    // alguien va a buscar «qué versión tengo», así que es donde tiene sentido
    // contarle qué trajo cada una.
    var vEl = document.getElementById('appVersion');
    if (vEl) {
      vEl.textContent = 'v' + APP_VERSION;
      vEl.setAttribute('role', 'button');
      vEl.setAttribute('tabindex', '0');
      vEl.title = 'Ver historial de novedades';
      vEl.addEventListener('click', mostrarHistorialCompleto);
      vEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostrarHistorialCompleto(); }
      });
    }

    console.log('🏋️ Gym Calendar v' + APP_VERSION);
  }

  // =============================================
  // FEEDBACK: IDEAS Y ERRORES
  // ---------------------------------------------
  // El destino es un Google Apps Script publicado como Web App que escribe una
  // fila por reporte en una hoja de cálculo. Ver docs/feedback-apps-script.md.
  // Apps Script no devuelve cabeceras CORS utilizables desde el navegador, así
  // que enviamos con mode:'no-cors': la petición sale, pero la respuesta es
  // opaca. Solo detectamos fallos de red, que es lo que nos importa (sin
  // cobertura guardamos el reporte y lo reintentamos al volver a abrir la app).
  // =============================================
  var FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzq4e_9RF2bav4hhKsuKeJjNuuZAjZMez-MLTVeovhI8if2odB27kJqmNd7xYIuAnIsLQ/exec';
  var FEEDBACK_QUEUE_KEY = 'gym_feedback_queue';
  var FEEDBACK_MAX = 1000;

  function readFeedbackQueue() {
    try { return JSON.parse(localStorage.getItem(FEEDBACK_QUEUE_KEY)) || []; }
    catch (e) { return []; }
  }

  function writeFeedbackQueue(queue) {
    try { localStorage.setItem(FEEDBACK_QUEUE_KEY, JSON.stringify(queue.slice(-20))); }
    catch (e) { /* almacenamiento lleno: el reporte se pierde, no rompemos nada */ }
  }

  function postFeedback(entry) {
    if (!FEEDBACK_ENDPOINT) return Promise.reject(new Error('sin endpoint'));
    return fetch(FEEDBACK_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      // text/plain evita el preflight OPTIONS, que Apps Script no responde
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(entry)
    });
  }

  // Reintenta lo que quedó pendiente por falta de red. Silencioso a propósito.
  function flushFeedbackQueue() {
    var queue = readFeedbackQueue();
    if (!queue.length || !FEEDBACK_ENDPOINT) return;
    writeFeedbackQueue([]);
    queue.forEach(function (entry) {
      postFeedback(entry).catch(function () {
        writeFeedbackQueue(readFeedbackQueue().concat([entry]));
      });
    });
  }

  // Cuánto se espera antes de enseñar las novedades, para dar tiempo a que el
  // service worker diga si hay actualización pendiente. Si la hay,
  // showUpdateBanner() cancela la espera y las novedades no llegan a salir.
  var WHATSNEW_ESPERA = 2500;

  // Enseña el resumen de la versión actual una sola vez, comparando con la
  // última versión vista en localStorage. Nunca se enseña en onboarding (el
  // usuario nuevo no tiene nada previo con lo que comparar) ni si no hay
  // novedades que contar.
  //
  // Tampoco se enseña si hay una versión nueva esperando. El shell va a red
  // primero, así que la pestaña ya está ejecutando el código nuevo y este
  // modal se disparaba al instante, mientras el service worker seguía
  // instalándose y acababa sacando «Nueva versión disponible». Se leían las
  // novedades de una versión que, según el aviso de al lado, aún no tenías.
  // Devuelve true si va a enseñar el modal (ya o dentro de un rato). init() lo
  // necesita para decidir si la confirmación de actualización va dentro del
  // modal o hace falta sacarla en una barra aparte.
  // Compara «4.9.0» con «4.10.0» correctamente. Con strings, '4.9.0' > '4.10.0'
  // alfabéticamente, y eso dejaría novedades sin enseñar en cuanto la minor
  // pasara de 9.
  function compararVersiones(a, b) {
    var pa = String(a || '0').split('.');
    var pb = String(b || '0').split('.');
    for (var i = 0; i < 3; i++) {
      var na = parseInt(pa[i], 10) || 0;
      var nb = parseInt(pb[i], 10) || 0;
      if (na !== nb) return na < nb ? -1 : 1;
    }
    return 0;
  }

  // Todo lo publicado después de la última versión vista. Si no consta ninguna
  // (usuario que ya usaba la app antes de que existiera este registro), se
  // enseña sólo la entrada más reciente: volcarle año y medio de historia de
  // golpe sería peor que no contarle nada.
  function novedadesPendientes() {
    var seen;
    try { seen = localStorage.getItem('gym_whatsnew_seen'); } catch (e) { seen = null; }
    if (!seen) return CHANGELOG.slice(0, 1);
    return CHANGELOG.filter(function (e) { return compararVersiones(e.version, seen) > 0; });
  }

  function setupWhatsNew() {
    if (needsOnboarding()) return false;
    if (!novedadesPendientes().length) return false;

    // Si venimos de pulsar «Actualizar» no hay nada que esperar: la
    // actualización ya ha terminado y el propio modal da la confirmación.
    if (acabamosDeActualizar) {
      setTimeout(mostrarWhatsNew, 500);
      return true;
    }

    whatsNewPendiente = mostrarWhatsNew;
    setTimeout(function () {
      if (!whatsNewPendiente) return;   // cancelado por showUpdateBanner()
      var fn = whatsNewPendiente;
      whatsNewPendiente = null;
      fn();
    }, WHATSNEW_ESPERA);
    return true;
  }

  // `conCabecera` separa por versión. Con una sola entrada sobra el título:
  // la versión ya la dice el subtítulo y repetirla sólo añade ruido.
  function renderNovedadesHtml(entradas, conCabecera) {
    var html = '';
    entradas.forEach(function (entrada) {
      if (conCabecera) {
        html += '<li class="whatsnew-version">v' + escapeHtml(entrada.version) + '</li>';
      }
      entrada.items.forEach(function (it) {
        html += '<li><span class="whatsnew-item-icon">' + it.icon + '</span>'
             + '<span>' + escapeHtml(it.text) + '</span></li>';
      });
    });
    return html;
  }

  // Historial completo, a petición. Reutiliza el mismo modal, pero NO marca
  // nada como visto: abrirlo por curiosidad no debe silenciar el aviso de una
  // novedad que aún no se ha leído.
  function mostrarHistorialCompleto() {
    var modal = document.getElementById('whatsNewModal');
    var overlay = document.getElementById('whatsNewModalOverlay');
    var closeBtn = document.getElementById('whatsNewClose');
    var okBtn = document.getElementById('whatsNewOk');
    var sub = document.getElementById('whatsNewSub');
    var list = document.getElementById('whatsNewList');
    if (!modal || !list || !modal.classList.contains('hidden')) return;

    sub.textContent = 'Todo lo que ha ido cambiando, de lo más reciente a lo más antiguo:';
    list.innerHTML = renderNovedadesHtml(CHANGELOG, true);

    function close() {
      modal.classList.add('hidden');
      closeBtn.removeEventListener('click', close);
      overlay.removeEventListener('click', close);
      okBtn.removeEventListener('click', close);
    }

    modal.classList.remove('hidden');
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    okBtn.addEventListener('click', close);
  }

  function mostrarWhatsNew() {
    var modal = document.getElementById('whatsNewModal');
    var overlay = document.getElementById('whatsNewModalOverlay');
    var closeBtn = document.getElementById('whatsNewClose');
    var okBtn = document.getElementById('whatsNewOk');
    var sub = document.getElementById('whatsNewSub');
    var list = document.getElementById('whatsNewList');
    if (!modal || !list) return;

    var pendientes = novedadesPendientes();
    if (!pendientes.length) return;

    // Con varias versiones acumuladas se dice cuántas son: sin ese aviso, la
    // lista larga parece un cambio enorme de golpe en vez de un resumen de
    // varias actualizaciones.
    var varias = pendientes.length > 1;
    if (acabamosDeActualizar) {
      sub.textContent = varias
        ? '✅ Ya estás en la v' + CHANGELOG_LATEST + '. Te resumo las ' + pendientes.length + ' últimas actualizaciones:'
        : '✅ Ya estás en la v' + CHANGELOG_LATEST + '. Esto es lo que ha cambiado:';
    } else {
      sub.textContent = varias
        ? 'Te has perdido ' + pendientes.length + ' actualizaciones. Esto es todo lo nuevo:'
        : 'Esto es lo que ha cambiado en la v' + pendientes[0].version + ':';
    }

    list.innerHTML = renderNovedadesHtml(pendientes, varias);

    function close() {
      modal.classList.add('hidden');
      localStorage.setItem('gym_whatsnew_seen', CHANGELOG_LATEST);
      // Se retiran: este modal lo comparte también el historial completo, y
      // sin esto los listeners se acumularían entre aperturas.
      closeBtn.removeEventListener('click', close);
      overlay.removeEventListener('click', close);
      okBtn.removeEventListener('click', close);
      // Si este modal tapaba el aviso del peso, es el momento de sacarlo: sin
      // este gancho, alguien que no cambia de pestaña no lo vería nunca.
      maybePromptBodyWeight();
    }

    modal.classList.remove('hidden');
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    okBtn.addEventListener('click', close);
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) { close(); document.removeEventListener('keydown', onEsc); }
    });
  }

  function setupFeedback() {
    var fab = document.getElementById('feedbackFab');
    var modal = document.getElementById('feedbackModal');
    var overlay = document.getElementById('feedbackModalOverlay');
    var closeBtn = document.getElementById('feedbackClose');
    var textarea = document.getElementById('feedbackText');
    var counter = document.getElementById('feedbackCount');
    var sendBtn = document.getElementById('feedbackSend');
    if (!fab || !modal || !textarea || !sendBtn) return;

    var type = 'idea';

    function open() {
      modal.classList.remove('hidden');
      fab.style.display = 'none';
      setTimeout(function () { textarea.focus(); }, 120);
    }

    function close() {
      modal.classList.add('hidden');
      fab.style.display = '';
      textarea.value = '';
      counter.textContent = '0';
      sendBtn.disabled = true;
    }

    fab.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    modal.querySelectorAll('.feedback-type').forEach(function (btn) {
      btn.addEventListener('click', function () {
        type = btn.dataset.type;
        modal.querySelectorAll('.feedback-type').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
      });
    });

    textarea.addEventListener('input', function () {
      counter.textContent = String(textarea.value.length);
      sendBtn.disabled = textarea.value.trim().length < 3;
    });

    sendBtn.addEventListener('click', function () {
      var text = textarea.value.trim();
      if (text.length < 3) return;

      var entry = {
        date: new Date().toISOString(),
        type: type,
        text: text.slice(0, FEEDBACK_MAX),
        version: APP_VERSION,
        profile: activeProfile,
        userAgent: navigator.userAgent
      };

      sendBtn.disabled = true;
      sendBtn.textContent = 'Enviando…';

      postFeedback(entry).then(function () {
        showToast('¡Gracias! Reporte enviado 🙌');
      }).catch(function () {
        // Sin red (o sin endpoint configurado): lo guardamos y reintentamos
        writeFeedbackQueue(readFeedbackQueue().concat([entry]));
        showToast('Sin conexión: lo enviaremos más tarde');
      }).then(function () {
        sendBtn.textContent = 'Enviar';
        close();
      });
    });
  }

  // =============================================
  // COACH IA
  // ---------------------------------------------
  // Capa opcional sobre el motor determinista. Dos cosas y ninguna más:
  //
  //   1. Un chat que responde sobre TU plan. El contexto se cocina aquí
  //      (buildAiContext) y viaja como texto plano; el modelo no ve
  //      localStorage ni nada que no le pasemos.
  //   2. «Ajustar mi rutina»: texto libre → cambios sobre las respuestas del
  //      asistente. El modelo NO genera la rutina. Devuelve como mucho un
  //      puñado de claves de configuración, y el plan lo sigue construyendo
  //      generateValidRoutine() con su validatePlan(). Así el modelo no puede
  //      recetar un ejercicio imposible para el material o las molestias
  //      declaradas, que es exactamente el fallo que motivó CORE_EXERCISES.
  //
  // El endpoint es un Worker de Cloudflare (ver worker/README.md). Hace falta
  // porque Workers AI se autentica con credenciales de cuenta y esto es un
  // sitio estático: cualquier clave metida aquí sería pública.
  //
  // Si el Worker no responde —sin red, cuota diaria agotada, no desplegado— el
  // coach se apaga y la app funciona exactamente igual que sin él. Por eso no
  // hay cola de reintento como en el feedback: una respuesta que llega mañana
  // no le sirve a nadie.
  // =============================================
  var AI_ENDPOINT = 'https://gym-calendar-ai.smoralber.workers.dev';
  var AI_TIMEOUT = 30000;

  // Clave PÚBLICA de Turnstile: está pensada para ir en el cliente, a
  // diferencia del secreto, que vive sólo en el Worker. Demuestra que hay un
  // navegador real detrás de cada petición.
  var AI_SITEKEY = '0x4AAAAAAEYqlgJQcicfEhxk';
  var TURNSTILE_TIMEOUT = 25000;

  function aiEnabled() { return !!AI_ENDPOINT; }

  // Apunta un evento del coach. Es un disparo al aire: no espera respuesta, no
  // reintenta y se traga cualquier error. Lo único que se manda es el nombre
  // del evento — ni mensajes, ni plan, ni nada que identifique a nadie.
  //
  // Hace falta porque la mitad de la historia pasa aquí: el servidor sabe si
  // devolvió un cambio, pero no si el usuario llegó a aplicarlo.
  function metrica() {
    if (!AI_ENDPOINT) return;
    var eventos = Array.prototype.slice.call(arguments);
    try {
      fetch(AI_ENDPOINT + '/metricas/evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventos: eventos }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  // Error con mensaje pensado para el usuario. Todo lo demás que se escape
  // («Failed to fetch», un TypeError del stream) se enseña como un genérico:
  // el texto en inglés del navegador no le dice nada a nadie.
  function aiError(msg) {
    var e = new Error(msg);
    e.friendly = true;
    return e;
  }

  // Traduce una respuesta fallida del Worker a algo accionable. El Worker
  // distingue entre «vas muy rápido», «has gastado tu parte de hoy» y «se ha
  // agotado la cuota de todos», así que se prefiere su mensaje al genérico.
  function aiHttpError(res) {
    return res.json().catch(function () { return null; }).then(function (body) {
      if (body && typeof body.error === 'string' && body.error) return aiError(body.error);
      if (res.status === 429) return aiError('Vas muy rápido. Espera un minuto y sigue.');
      return aiError('El coach no está disponible ahora mismo.');
    });
  }

  // Resumen en texto plano de lo que el modelo necesita saber. Deliberadamente
  // corto: cabe en el tope de 8 KB del Worker y evita que el modelo se pierda.
  // No incluye nada identificativo — ni nombre de plan libre, ni user agent.
  function buildAiContext() {
    var lines = [];
    // El plan ACTIVO, no «uno cualquiera de los que haya». Con `loadCustomPlan()`
    // aquí, quien tuviera una plantilla activa y además una rutina generada le
    // estaba describiendo al modelo el plan equivocado.
    var plan = planAjustable();
    var hoy = getTodayKey();

    if (plan) {
      lines.push('Programa: ' + (plan.splitName || 'rutina a medida'));
      if (plan.daysLabel) lines.push('Frecuencia: ' + plan.daysLabel + (plan.freqLabel ? ' · ' + plan.freqLabel : ''));
      var a = plan.answers || {};
      lines.push('Objetivo: ' + (answerList(a, 'goal').join(', ') || 'sin especificar'));
      lines.push('Nivel: ' + (a.level || 'sin especificar'));
      lines.push('Material: ' + (answerList(a, 'gear').join(', ') || 'sólo peso corporal'));
      lines.push('Minutos por sesión: ' + (a.minutes || '?'));
      var avoid = answerList(a, 'avoid');
      if (avoid.length) lines.push('Zonas que le molestan: ' + avoid.join(', '));
      if (a.running === 'si') lines.push('Corre, con trabajo preventivo en las sesiones de pierna.');
    } else {
      var etiqueta = (PROFILES[activeProfile] && PROFILES[activeProfile].daysLabel) || '';
      lines.push('Programa: «' + nombrePlanActivo() + '», plantilla de la app'
        + (etiqueta ? ' (' + etiqueta + ')' : '') + '.');
      // Los cambios SÍ son aplicables: al aceptarlos, la plantilla se convierte
      // en rutina a medida conservando el historial. Lo único que no debe hacer
      // el modelo es dar el cambio por hecho: lo confirma el usuario después.
      lines.push('Si te piden cambios, se pueden aplicar: al aceptarlos la plantilla se '
        + 'convierte en una rutina a medida y se conservan pesos, sesiones y racha. '
        + 'No des el cambio por hecho ni digas que ya lo has aplicado: lo confirma el '
        + 'usuario después, viendo el plan resultante.');
      // Sin esto el modelo se inventa el detalle de la plantilla, que no ve.
      lines.push('No te inventes qué ejercicios tiene esta plantilla: no los conoces.');
    }

    var semana = getWeekNumber(hoy);
    var fase = getPhase(hoy);
    lines.push('Semana ' + semana + ' de 12' + (fase ? ', fase «' + fase.name + '»' : ''));
    if (plan && plan.deloadWeeks && plan.deloadWeeks.indexOf(semana) !== -1) {
      lines.push('Esta semana es de descarga: se bajan series a propósito.');
    }

    // Volumen semanal: objetivo contra lo hecho. Es la unidad en la que razona
    // el generador, así que es la que debe ver el modelo.
    if (plan && plan.volume) {
      var hecho = weeklyVolumeProgress();
      var vol = Object.keys(plan.volume).map(function (g) {
        return (GROUP_LABEL_G[g] || g) + ' ' + (hecho[g] || 0) + '/' + plan.volume[g].target;
      });
      if (vol.length) lines.push('Series esta semana (hechas/objetivo): ' + vol.join(', '));
    }

    // Últimos pesos, sólo de lo que tiene historial y ordenado por lo más
    // reciente. Un tope de 15 para no inflar el contexto en planes largos.
    var pesos = [];
    Object.keys(state.progress || {}).forEach(function (id) {
      var hist = state.progress[id];
      if (!hist || !hist.length) return;
      var ex = findExercise(id);
      if (!ex) return;
      var last = hist[hist.length - 1];
      pesos.push({ date: last.date, txt: ex.name + ': ' + last.weight + ' kg (' + hist.length + ' registros)' });
    });
    if (pesos.length) {
      pesos.sort(function (x, y) { return x.date < y.date ? 1 : -1; });
      lines.push('Últimos pesos registrados:');
      pesos.slice(0, 15).forEach(function (p) { lines.push('  - ' + p.txt); });
    }

    return lines.join('\n');
  }

  // ---- Turnstile ----
  // El script se carga la primera vez que se usa el coach, no al arrancar la
  // app: quien no lo abra nunca no paga la descarga, y offline no se intenta.
  var turnstileCargando = null;
  var turnstileWidget = null;
  var turnstilePendiente = null;   // control del token en curso
  // Lo pone setupAiCoach(): avisa en el chat cuando el reto pide un clic.
  var aiAvisoDesafio = null;

  function cargarTurnstile() {
    if (window.turnstile) return Promise.resolve();
    if (turnstileCargando) return turnstileCargando;

    turnstileCargando = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.onload = function () { resolve(); };
      s.onerror = function () {
        // Se olvida el intento fallido para que un segundo intento pueda
        // funcionar: si no, un corte de red deja el coach muerto para siempre.
        turnstileCargando = null;
        reject(aiError('No he podido cargar la verificación de seguridad. ¿Tienes algún bloqueador activo?'));
      };
      document.head.appendChild(s);
    });
    return turnstileCargando;
  }

  // Un token por petición: son de un solo uso.
  function aiToken() {
    if (!AI_SITEKEY) return Promise.resolve('');

    return cargarTurnstile().then(function () {
      return new Promise(function (resolve, reject) {
        var cerrado = false;
        function acabar(fn, arg) {
          if (cerrado) return;
          cerrado = true;
          turnstilePendiente = null;
          fn(arg);
        }

        // Un reto que se queda colgado no puede dejar el chat esperando: sin
        // esto, el AbortController del fetch no llega a entrar en juego porque
        // la petición ni siquiera ha salido.
        var reloj = null;
        function pararReloj() { if (reloj) { clearTimeout(reloj); reloj = null; } }
        function armarReloj() {
          pararReloj();
          reloj = setTimeout(function () {
            acabar(reject, aiError('La verificación de seguridad ha tardado demasiado. Inténtalo otra vez.'));
          }, TURNSTILE_TIMEOUT);
        }
        armarReloj();

        turnstilePendiente = {
          resolve: function (t) { pararReloj(); acabar(resolve, t); },
          reject: function (e) { pararReloj(); acabar(reject, e); },
          // Mientras el reto exige un clic, el reloj no puede seguir corriendo:
          // estaría midiendo a una persona, no a la red.
          pausar: pararReloj,
          reanudar: armarReloj
        };

        try {
          if (turnstileWidget === null) {
            // Los callbacks se fijan al renderizar y se reutilizan en cada
            // reset, por eso delegan en `turnstilePendiente` en vez de cerrar
            // sobre el resolve de esta llamada concreta.
            turnstileWidget = window.turnstile.render('#coachTurnstile', {
              sitekey: AI_SITEKEY,
              execution: 'execute',
              appearance: 'interaction-only',
              callback: function (t) {
                if (aiAvisoDesafio) aiAvisoDesafio(false);
                if (turnstilePendiente) turnstilePendiente.resolve(t);
              },
              // Cloudflare ha decidido pedir un clic. Sin avisar, el chat se
              // queda callado y el widget sale en un sitio donde nadie está
              // mirando: se agotaba el tiempo sin que el usuario supiera que
              // le tocaba hacer algo.
              'before-interactive-callback': function () {
                if (turnstilePendiente) turnstilePendiente.pausar();
                if (aiAvisoDesafio) aiAvisoDesafio(true);
              },
              'after-interactive-callback': function () {
                if (aiAvisoDesafio) aiAvisoDesafio(false);
                if (turnstilePendiente) turnstilePendiente.reanudar();
              },
              'timeout-callback': function () {
                if (aiAvisoDesafio) aiAvisoDesafio(false);
                if (turnstilePendiente) turnstilePendiente.reject(aiError('La verificación ha caducado sin completarse. Inténtalo otra vez.'));
              },
              'unsupported-callback': function () {
                if (aiAvisoDesafio) aiAvisoDesafio(false);
                if (turnstilePendiente) turnstilePendiente.reject(aiError('Tu navegador no admite la verificación de seguridad que necesita el coach.'));
              },
              'error-callback': function () {
                if (aiAvisoDesafio) aiAvisoDesafio(false);
                if (turnstilePendiente) turnstilePendiente.reject(aiError('No he podido verificar el navegador. Inténtalo otra vez.'));
              },
              'expired-callback': function () {
                if (aiAvisoDesafio) aiAvisoDesafio(false);
                if (turnstilePendiente) turnstilePendiente.reject(aiError('La verificación ha caducado. Inténtalo otra vez.'));
              }
            });
          } else {
            window.turnstile.reset(turnstileWidget);
          }
          window.turnstile.execute(turnstileWidget);
        } catch (e) {
          turnstilePendiente = null;
          pararReloj();
          if (aiAvisoDesafio) aiAvisoDesafio(false);
          reject(aiError('No he podido verificar el navegador. Recarga la página e inténtalo otra vez.'));
        }
      });
    });
  }

  function aiFetch(path, body) {
    return aiToken().then(function (token) {
      body.turnstile = token;
      return aiFetchConToken(path, body);
    });
  }

  function aiFetchConToken(path, body) {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, AI_TIMEOUT);
    return fetch(AI_ENDPOINT + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal
    }).then(function (res) {
      clearTimeout(timer);
      return res;
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  // Lee el stream SSE del Worker y va llamando a onChunk con cada trozo de
  // texto. Se resuelve con la respuesta completa.
  function aiChat(messages, onChunk) {
    return aiFetch('/chat', { messages: messages, context: buildAiContext() }).then(function (res) {
      if (!res.ok || !res.body) return aiHttpError(res).then(function (e) { throw e; });

      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      var full = '';

      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return full;
          buffer += decoder.decode(r.value, { stream: true });

          // Los eventos vienen separados por línea. El último trozo del buffer
          // puede estar cortado a medias, así que se guarda para la vuelta
          // siguiente en vez de intentar parsearlo.
          var parts = buffer.split('\n');
          buffer = parts.pop();

          parts.forEach(function (line) {
            if (line.indexOf('data:') !== 0) return;
            var data = line.slice(5).trim();
            if (!data || data === '[DONE]') return;
            try {
              var obj = JSON.parse(data);
              // Workers AI emite chunks con forma OpenAI: el texto va en
              // choices[0].delta.content. El campo `response` existe pero
              // llega vacío, así que sólo sirve de reserva.
              var trozo = '';
              if (obj.choices && obj.choices[0] && obj.choices[0].delta
                  && typeof obj.choices[0].delta.content === 'string') {
                trozo = obj.choices[0].delta.content;
              } else if (typeof obj.response === 'string') {
                trozo = obj.response;
              }
              if (trozo) { full += trozo; onChunk(trozo); }
            } catch (e) { /* evento parcial o de control: se ignora */ }
          });

          return pump();
        });
      }

      return pump();
    });
  }

  // Por qué pedir otro número de días no ha movido el calendario. Se explica
  // el caso concreto en vez de un «no ha cambiado nada» a secas: lo primero se
  // puede accionar (quitar el plan de carrera), lo segundo sólo frustra.
  //
  // No se compara el plan entero para detectar esto: el generador baraja los
  // empates, así que dos generaciones con las mismas respuestas ya salen
  // distintas y la comparación no diría nada. Lo que se compara es justo lo
  // que el usuario pidió: los días de la semana.
  // Devuelve un aviso si los días que pediste no son los que te van a quedar,
  // o si el calendario no se mueve. Vale para los dos casos porque el usuario
  // se lleva la misma sorpresa: pide 3 días y ve otra cosa.
  //
  // Compara sólo los días, no el plan entero: el generador baraja los empates,
  // así que dos generaciones con las mismas respuestas ya salen distintas y
  // comparar todo no diría nada.
  function avisoDeDias(answers, nuevo, diasAntes) {
    var conCarrera = answers.running === 'si' && answers.runningPlan === 'si';
    var total = (nuevo.trainingDays || []).length;
    var pedidos = parseInt(answers.days, 10) || 0;
    var iguales = (nuevo.trainingDays || []).join(',') === (diasAntes || []).join(',');

    if (conCarrera && pedidos && total !== pedidos) {
      return 'Ojo con los días: has pedido ' + pedidos + ' y te van a quedar ' + total + '. '
        + 'El plan de vuelta a correr necesita 3 días suyos y tu fuerza se reparte en los demás, '
        + 'así que ese número lo manda la carrera, no tú. Para entrenar menos días hay que quitar '
        + 'antes el plan de carrera.';
    }
    if (iguales) {
      return 'Los días de la semana se quedan como estaban; lo que cambia es el contenido '
        + 'de cada sesión.';
    }
    return '';
  }

  // Texto libre → respuestas del asistente → rutina validada. Devuelve
  // { plan, answers, motivo } o lanza si no hay nada aplicable.
  function aiAdjustPlan(texto) {
    var plan = planAjustable();

    // Si el plan activo es una plantilla, NO se rechaza: se convierte como
    // parte de aplicar el cambio. Pedirle algo al coach y que después te diga
    // que no puede es un callejón sin salida — la conversión es un detalle de
    // implementación, no algo que el usuario tenga que saber ni tramitar
    // aparte. Se parte de la semilla equivalente a la plantilla.
    var convirtiendo = false;
    var base, diasAntes;
    if (plan) {
      base = plan.answers;
      diasAntes = plan.trainingDays || [];
    } else {
      base = BUILTIN_SEEDS[activeProfile];
      if (!base) {
        return Promise.reject(aiError('«' + nombrePlanActivo() + '» no se puede ajustar.'));
      }
      diasAntes = (PROFILES[activeProfile] && PROFILES[activeProfile].defaultDays) || [];
      convirtiendo = true;
    }

    // Al ajustar se manda además la configuración exacta en JSON. El resumen en
    // prosa no basta: el modelo tiene que ver las listas tal cual están para
    // poder devolverlas completas en vez de pisarlas.
    var contexto = buildAiContext()
      + '\n\nConfiguración actual, en las mismas claves que debes devolver:\n'
      + JSON.stringify(base);

    return aiFetch('/adjust', {
      messages: [{ role: 'user', content: texto }],
      context: contexto
    }).then(function (res) {
      if (!res.ok) return aiHttpError(res).then(function (e) { throw e; });
      return res.json();
    }).then(function (data) {
      var cambios = data && data.answers ? data.answers : {};
      if (!Object.keys(cambios).length) {
        // No se enseña el `motivo` aquí: cuando no hay cambios el modelo a
        // veces afirma igualmente haberlos hecho, y ese texto como mensaje de
        // error se contradice con que no haya pasado nada.
        if (data && data.motivo) console.warn('Coach IA: ajuste vacío con motivo:', data.motivo);

        // Petición tan vaga que el modelo se lanzó a reescribirlo todo, y el
        // servidor lo paró. Aquí el problema no es que no entienda: es que
        // había demasiado que adivinar.
        if (data && data.vago) {
          throw aiError('Eso es demasiado abierto y me pondría a cambiarte cosas que no me has '
            + 'pedido. Dime qué quieres tocar: los días, el tiempo por sesión, el objetivo, '
            + 'el material o alguna molestia.');
        }

        // Si algo se ha descartado por el camino, el coach SÍ había entendido:
        // decir «no he sabido qué cambiar» sería mentir y no ayuda a corregirlo.
        var tirados = (data && Array.isArray(data.descartados)) ? data.descartados : [];
        if (tirados.length) {
          var nombres = tirados.map(function (k) { return AI_ANSWER_LABEL[k] || k; }).join(', ');
          throw aiError('Te he entendido, pero lo que pides no me cabe en «' + nombres + '». '
            + 'Dime un valor concreto de los que admite y te lo aplico.');
        }

        throw aiError('No he conseguido convertir eso en un cambio concreto. Pruébalo más corto '
          + 'y directo: «2 días de running», «entreno 5 días», «me molesta el hombro», '
          + '«solo tengo 30 minutos».');
      }

      // Mezcla sobre una copia: si el plan resultante no vale, el actual no se
      // ha tocado.
      var answers = normalizeAnswers(JSON.parse(JSON.stringify(base)));
      Object.keys(cambios).forEach(function (k) { answers[k] = cambios[k]; });

      var nuevo = generateValidRoutine(answers);
      if (!nuevo) throw aiError('Con esos cambios no salen suficientes ejercicios. Prueba con algo menos restrictivo.');

      var problems = validatePlan(nuevo, answers);
      if (problems.length) throw aiError(problems[0].msg);

      // Diff explícito antes/después. Sin él, que el modelo devuelva
      // avoid:["hombro"] sobre un avoid:["rodilla"] borra la rodilla y el
      // usuario no se entera: el chip enseñaría sólo el valor nuevo.
      var diff = Object.keys(cambios).map(function (k) {
        return { clave: k, antes: aiValorLegible(base[k]), despues: aiValorLegible(answers[k]) };
      }).filter(function (d) { return d.antes !== d.despues; });

      // Al convertir sí hay algo que aplicar aunque el diff salga vacío: la
      // rutina pasa de plantilla a generada, que es el cambio de verdad.
      if (!diff.length && !convirtiendo) throw aiError('Eso ya es lo que tienes configurado.');

      // Que cambie la RESPUESTA no significa que cambie la SEMANA. Con el plan
      // de carrera, pedir 3 días o pedir 5 deja el mismo calendario. Antes la
      // app enseñaba el chip «Días: 5 → 3», decía «Rutina actualizada 🎉» y
      // dejaba los mismos días: para el usuario, la app estaba rota.
      var pidioDias = diff.some(function (d) { return d.clave === 'days'; });
      var aviso = pidioDias ? avisoDeDias(answers, nuevo, diasAntes) : '';

      // Sólo se bloquea si NO hay nada que aplicar: mismo calendario, un único
      // cambio pedido y ninguna conversión de por medio.
      var mismosDias = (nuevo.trainingDays || []).join(',') === (diasAntes || []).join(',');
      if (aviso && mismosDias && diff.length === 1 && !convirtiendo) throw aiError(aviso);

      return { plan: nuevo, answers: answers, diff: diff, aviso: aviso,
               convirtiendo: convirtiendo, motivo: data.motivo || '' };
    });
  }

  // ---- UI del coach ----

  function setupAiCoach() {
    var fab = document.getElementById('coachFab');
    var modal = document.getElementById('coachModal');
    var overlay = document.getElementById('coachModalOverlay');
    var closeBtn = document.getElementById('coachClose');
    var log = document.getElementById('coachLog');
    var input = document.getElementById('coachInput');
    var sendBtn = document.getElementById('coachSend');
    if (!fab || !modal || !log || !input || !sendBtn) return;

    // Sin endpoint configurado el coach no existe: mejor eso que un botón que
    // sólo sabe dar error.
    if (!aiEnabled()) { fab.style.display = 'none'; return; }

    var messages = [];
    var busy = false;

    function bubble(role, text) {
      var el = document.createElement('div');
      el.className = 'coach-msg coach-msg-' + role;
      el.textContent = text;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
      return el;
    }

    function setBusy(v) {
      busy = v;
      sendBtn.disabled = v || input.value.trim().length < 2;
      input.disabled = v;
    }

    // ¿Suena a que quiere cambiar el plan, y no a una pregunta? No hace falta
    // acertar siempre: si no salta, el usuario sigue pudiendo pedirlo con otras
    // palabras, y el coach mismo se ofrece a aplicarlo en su respuesta.
    function pareceCambio(texto) {
      var s = texto.toLowerCase();
      // Una molestia es motivo de cambio por sí sola, sin más contexto.
      if (/(molest|duele|dolor|lesi[oó]n|me he hecho)/.test(s)) return true;
      // El vocabulario se quedaba corto y de ahí salían peticiones sin botón:
      // «sólo quiero 1 sesión de running a la semana» no casaba con nada
      // («running» y «sesión» no estaban), y «quita el plan de carrera»
      // tampoco. El usuario pedía el cambio, el coach le contestaba que
      // pulsara «Aplicar a mi rutina», y ese botón no aparecía nunca.
      var tema = /(d[ií]as?|semana|sesi[oó]n|minutos?|tiempo|objetivo|nivel|material|gimnasio|en casa|sin material|correr|carrera|running|rodaje|trote|mancuern|barra|m[aá]quina|banda|goma|entrenar|rutina|plan)/.test(s);
      var cambio = /(cambi|ajust|ahora|ya no|quiero|prefier|me gustar[ií]a|s[oó]lo tengo|solo tengo|s[oó]lo quiero|solo quiero|pasar a|subir|bajar|reducir|aumentar|quitar|quita|elimina|a[ñn]adir|mete|menos|m[aá]s)/.test(s);
      return tema && cambio;
    }

    // Red de seguridad: si el propio coach dice que lo aplique, el botón tiene
    // que estar. El filtro de palabras siempre se quedará corto ante alguna
    // forma de pedirlo, y la peor consecuencia posible es justo ésta — que el
    // modelo te mande a pulsar algo que no existe.
    function respuestaOfreceAplicar(texto) {
      var s = String(texto || '').toLowerCase();
      return /(aplicar a mi rutina|aplicarlo a tu rutina|aplicar el cambio|bot[oó]n de aplicar|puedo ajustarte|ajustar tu rutina|aplicar los cambios)/.test(s);
    }

    // El coach propone aplicar el cambio en vez de esconderlo tras un botón de
    // modo: aquel cambiaba sólo el placeholder del campo y no había forma de
    // saber en qué modo estabas.
    function ofrecerAjuste(texto) {
      var wrap = document.createElement('div');
      wrap.className = 'coach-oferta';

      // Con una plantilla activa el cambio TAMBIÉN se puede aplicar: al
      // aceptarlo, la plantilla se convierte en rutina a medida conservando su
      // id (y con él los pesos, las sesiones y la racha). Se avisa de que va a
      // pasar, pero no se le manda a hacer un trámite aparte: pedir un cambio
      // que luego no se puede aplicar es un callejón sin salida.
      var esPlantilla = !planAjustable();
      if (esPlantilla) {
        var nota = document.createElement('p');
        nota.className = 'coach-oferta-aviso';
        nota.textContent = 'ℹ️ «' + nombrePlanActivo() + '» es una plantilla. Para aplicarte esto la '
          + 'convierto en una rutina a tu medida, conservando tus pesos, tus sesiones y tu racha. '
          + 'Verás el plan resultante antes de decidir, y se puede deshacer desde Perfil → Editar.';
        wrap.appendChild(nota);
      }

      var btn = document.createElement('button');
      btn.className = 'coach-oferta-btn';
      btn.textContent = esPlantilla ? '🪄 Convertir y aplicar' : '🎯 Aplicar a mi rutina';
      btn.addEventListener('click', function () {
        if (busy) return;
        metrica('ajuste_pedido');
        wrap.remove();
        enviarAjuste(texto);
      });

      wrap.appendChild(btn);
      log.appendChild(wrap);
      log.scrollTop = log.scrollHeight;
      // Cuántas veces se llega a ofrecer el botón. Si esto sube y
      // `ajuste_pedido` no, es que el botón no se entiende o no se ve.
      metrica('boton_ofrecido');
    }

    // Ejemplos de arranque. Se pulsan, así que valen a la vez de muestra de lo
    // que entiende y de atajo: en un chat vacío lo caro es el primer mensaje.
    // El tercero es a propósito un cambio de plan, para que se descubra que el
    // coach no sólo explica, también ajusta la rutina.
    var COACH_EJEMPLOS = [
      '¿Por qué mi rutina es así?',
      '¿Cómo voy de series esta semana?',
      'Me molesta el hombro'
    ];

    function quitarSugerencias() {
      var s = log.querySelector('.coach-sugerencias');
      if (s) s.remove();
    }

    function mostrarSugerencias() {
      var wrap = document.createElement('div');
      wrap.className = 'coach-sugerencias';

      COACH_EJEMPLOS.forEach(function (texto) {
        var b = document.createElement('button');
        b.className = 'coach-sugerencia';
        b.textContent = texto;
        b.addEventListener('click', function () {
          if (busy) return;
          quitarSugerencias();
          enviarChat(texto);
        });
        wrap.appendChild(b);
      });

      log.appendChild(wrap);
      log.scrollTop = log.scrollHeight;
    }

    function open() {
      if (!navigator.onLine) { showToast('El coach necesita conexión'); return; }
      modal.classList.remove('hidden');
      fab.style.display = 'none';
      if (!messages.length) {
        bubble('assistant', '¡Hola! Soy tu entrenador. Conozco tu plan, tus series de esta semana '
          + 'y los pesos que vas registrando.\n\nPregúntame lo que quieras:');
        mostrarSugerencias();
      }
      setTimeout(function () { input.focus(); }, 120);
    }

    function close() {
      modal.classList.add('hidden');
      fab.style.display = '';
    }

    function fail(err) {
      var msg;
      if (err && err.name === 'AbortError') msg = 'He tardado demasiado. Inténtalo otra vez.';
      else if (err && err.friendly) msg = err.message;
      else if (!navigator.onLine) msg = 'Te has quedado sin conexión.';
      else msg = 'El coach no está disponible ahora mismo.';
      bubble('error', msg);
      if (err && !err.friendly) console.warn('Coach IA:', err);
    }

    function enviarChat(texto) {
      messages.push({ role: 'user', content: texto });
      bubble('user', texto);

      // Puntos animados, no un «…» quieto: la primera respuesta tarda varios
      // segundos entre la verificación y el modelo, y un carácter inmóvil se
      // lee como que la app se ha colgado.
      var out = bubble('assistant', '');
      out.classList.add('coach-typing');
      out.innerHTML = '<span></span><span></span><span></span>';
      var primero = true;

      setBusy(true);
      aiChat(messages, function (chunk) {
        if (primero) { out.classList.remove('coach-typing'); out.textContent = ''; primero = false; }
        out.textContent += chunk;
        log.scrollTop = log.scrollHeight;
      }).then(function (full) {
        if (!full) { out.remove(); throw aiError('No he sabido qué responder.'); }
        messages.push({ role: 'assistant', content: full });
        if (pareceCambio(texto) || respuestaOfreceAplicar(full)) ofrecerAjuste(texto);
      }).catch(function (err) {
        if (primero) out.remove();
        fail(err);
      }).then(function () { setBusy(false); });
    }

    // No repite el mensaje del usuario: ya está más arriba en la conversación,
    // porque el ajuste se ofrece después de que el coach le haya respondido.
    function enviarAjuste(texto) {
      var out = bubble('assistant', 'Recalculando tu rutina');
      out.classList.add('coach-pensando');

      setBusy(true);
      aiAdjustPlan(texto).then(function (r) {
        out.remove();
        proponerCambio(r);
      }).catch(function (err) {
        out.remove();
        fail(err);
      }).then(function () { setBusy(false); });
    }

    // El plan NO se guarda solo. Se enseña qué cambia y el usuario decide: un
    // plan es tres meses de trabajo, no algo que se pise en silencio.
    function proponerCambio(r) {
      var wrap = document.createElement('div');
      wrap.className = 'coach-proposal';

      var html = '';
      if (r.motivo) html += '<p class="coach-proposal-why">' + escapeHtml(r.motivo) + '</p>';
      if (r.convirtiendo) {
        html += '<p class="coach-proposal-aviso">🪄 Al aceptar, «' + escapeHtml(nombrePlanActivo())
          + '» deja de ser una plantilla y pasa a ser esta rutina. Tus pesos, tus sesiones y tu '
          + 'racha se conservan, y puedes volver atrás desde Perfil → Editar.</p>';
      }
      // El aviso va ANTES de los chips: si no, el chip «Días: 5 → 3» se lee
      // como que la semana cambia, y la aclaración llega tarde.
      if (r.aviso) html += '<p class="coach-proposal-aviso">⚠️ ' + escapeHtml(r.aviso) + '</p>';
      html += '<div class="coach-proposal-diff">' + r.diff.map(function (d) {
        return '<span class="coach-proposal-chip">' + escapeHtml(AI_ANSWER_LABEL[d.clave] || d.clave) + ': '
          + '<s>' + escapeHtml(d.antes) + '</s> → <strong>' + escapeHtml(d.despues) + '</strong></span>';
      }).join('') + '</div>';
      html += planExplainerHtml(r.plan, null);
      html += '<div class="coach-proposal-nav">'
        + '<button class="coach-proposal-cancel">Dejarlo como está</button>'
        + '<button class="coach-proposal-ok">✅ Usar esta rutina</button>'
        + '</div>';
      wrap.innerHTML = html;
      log.appendChild(wrap);
      log.scrollTop = log.scrollHeight;

      metrica('propuesta_mostrada');

      wrap.querySelector('.coach-proposal-cancel').addEventListener('click', function () {
        metrica('propuesta_rechazada');
        wrap.remove();
        bubble('assistant', 'Vale, no toco nada.');
      });

      wrap.querySelector('.coach-proposal-ok').addEventListener('click', function () {
        // Conserva el id del plan activo, así el historial de pesos y el
        // progreso siguen siendo suyos.
        var planId = upsertGeneratedPlan(r.plan, { id: activeProfile });
        if (!planId) { showToast('⚠ No se ha podido guardar el plan'); return; }
        metrica.apply(null, r.convirtiendo
          ? ['propuesta_aceptada', 'plantilla_convertida']
          : ['propuesta_aceptada']);
        renderPlanOptions();
        switchProfile(planId);
        switchTab('rutina');
        close();
        showToast(r.convirtiendo ? 'Ya es tuya y ajustada 🎉' : 'Rutina actualizada 🎉');
      });
    }

    // Cuando Turnstile pide un clic hay que decirlo: el widget aparece abajo,
    // pequeño y sin contexto, y la gente se queda mirando el chat en silencio
    // hasta que se agota el tiempo.
    var avisoEl = null;
    aiAvisoDesafio = function (activo) {
      if (activo) {
        if (avisoEl) return;
        avisoEl = bubble('aviso', '🛡️ Confirma ahí abajo que no eres un robot y sigo.');
        var caja = document.getElementById('coachTurnstile');
        if (caja && caja.scrollIntoView) caja.scrollIntoView({ block: 'nearest' });
      } else if (avisoEl) {
        avisoEl.remove();
        avisoEl = null;
      }
    };

    fab.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    input.addEventListener('input', function () {
      sendBtn.disabled = busy || input.value.trim().length < 2;
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendBtn.click(); }
    });

    sendBtn.addEventListener('click', function () {
      var texto = input.value.trim();
      if (texto.length < 2 || busy) return;
      input.value = '';
      sendBtn.disabled = true;
      quitarSugerencias();   // ya sabe qué preguntar: sobran los ejemplos
      enviarChat(texto);
    });

    // Sin red el coach no puede hacer nada. Se dice antes de pulsar, no después.
    function refreshOnline() {
      fab.classList.toggle('offline', !navigator.onLine);
      fab.title = navigator.onLine ? 'Habla con tu entrenador' : 'El coach necesita conexión';
    }
    window.addEventListener('online', refreshOnline);
    window.addEventListener('offline', refreshOnline);
    refreshOnline();
  }

  // Un valor del asistente en texto, para el diff. Las listas vacías tienen que
  // decir «ninguna» y no quedarse en blanco: un hueco no se lee como un cambio.
  function aiValorLegible(v) {
    if (Array.isArray(v)) return v.length ? v.join(', ') : 'ninguna';
    if (v === '' || v === undefined || v === null) return 'no';
    if (v === 'si') return 'sí';
    return String(v);
  }

  // Etiquetas legibles de las claves del asistente, para el resumen de cambios.
  var AI_ANSWER_LABEL = {
    goal: 'Objetivo', place: 'Dónde entrenas', days: 'Días por semana',
    minutes: 'Minutos por sesión', level: 'Nivel', avoid: 'Zonas a evitar',
    running: 'Corres', runningPlan: 'Plan de vuelta a correr',
    runningDays: 'Carreras por semana'
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
