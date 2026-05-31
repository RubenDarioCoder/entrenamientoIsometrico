const exerciseLibrary = [
  {
    id: "squat",
    name: "Sentadilla con Barra",
    type: "Compuesto",
    targetMuscles: ["cuádriceps", "glúteos", "core"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "barra",
    isActiveRecovery: false,
    description: "La sentadilla es el rey de los ejercicios de pierna. Activa cuádriceps, glúteos e isquiotibiales simultáneamente. La fase excéntrica controlada maximiza el tiempo bajo tensión isométrico, lo que según Hettinger y Muller (1953) genera adaptaciones de fuerza superiores al trabajo dinámico puro.",
    phaseInstructions: {
      eccentric: "Desciende lento con control total. Rodillas alineadas con los pies. Inhala.",
      isometric: "Mantén la posición en el punto más bajo. Tensión máxima en cuádriceps y glúteos.",
      concentric: "Empuja el suelo. Exhala al subir. Extiende caderas y rodillas juntas."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 4,
    repsDefault: 6,
    caloriesPerMinute: 9,
    rehab: {
      injury: "Rodilla",
      protocol: "Rango parcial sin dolor. Mantén isométrico largo.",
      phases: { eccentric: 4, isometric: 3, concentric: 3, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Evitar flexión mayor a 60°. Cargas muy bajas. Protocolo isométrico para tendinopatía rotuliana recomendado: 5x45s según Rio et al. (2017).",
    },
  },
  {
    id: "deadlift",
    name: "Peso Muerto Convencional",
    type: "Compuesto",
    targetMuscles: ["isquiotibiales", "glúteos", "espalda baja"],
    gender: "both",
    difficulty: "avanzado",
    equipment: "barra",
    isActiveRecovery: false,
    description: "El peso muerto trabaja la cadena posterior completa. El entrenamiento isométrico de los extensores lumbares con contracción sostenida reduce el síndrome de dolor lumbar y mejora la estabilidad raquídea (Lisón et al.). La fase excéntrica lenta aumenta hasta un 43% la tasa de desarrollo de fuerza (Bogdanis et al., 2018).",
    phaseInstructions: {
      eccentric: "Desciende controlando el descenso de la barra con caderas hacia atrás. Espalda neutra.",
      isometric: "Barra en el suelo o a media altura. Tensión máxima en toda la cadena posterior.",
      concentric: "Empuja el suelo, extiende caderas al mismo ritmo que las rodillas. Exhala."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 120 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 105 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 120 },
    },
    seriesDefault: 4,
    repsDefault: 5,
    caloriesPerMinute: 10,
    rehab: {
      injury: "Lumbar",
      protocol: "Peso mínimo. Hinge controlado. Core activado.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 150 },
      series: 3,
      reps: 6,
      notes: "Nunca con dolor. Parar ante sensación de pinzamiento. Dead Bug como fase previa obligatoria.",
    },
  },
  {
    id: "bench_press",
    name: "Press de Banca",
    type: "Compuesto",
    targetMuscles: ["pecho", "hombros", "tríceps"],
    gender: "male",
    difficulty: "intermedio",
    equipment: "barra+banco",
    isActiveRecovery: false,
    description: "El press de banca desarrolla fuerza máxima en el tren superior. La pausa isométrica en el pecho elimina el impulso elástico y maximiza la activación del pectoral mayor. La investigación de Hettinger establece que contracciones isométricas de 5-12 segundos al 50-70% de la fuerza máxima producen ganancias semanales del 5%.",
    phaseInstructions: {
      eccentric: "Baja la barra con codos a 45°. Control total, toca el pecho suavemente.",
      isometric: "Barra en contacto con el pecho. Tensión máxima. No rebotes.",
      concentric: "Empuja explosivo hacia arriba y ligeramente hacia los pies. Exhala."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 4,
    repsDefault: 6,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Hombro",
      protocol: "Arco neutro. Sin llevar barra al pecho completo.",
      phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Usar mancuernas al inicio. Evitar rotación interna forzada.",
    },
  },
  {
    id: "hip_thrust",
    name: "Elevación de Cadera",
    type: "Compuesto",
    targetMuscles: ["glúteos", "isquiotibiales"],
    gender: "female",
    difficulty: "principiante",
    equipment: "barra+banco",
    isActiveRecovery: false,
    description: "El hip thrust es el ejercicio más efectivo para la activación del glúteo mayor. La fase isométrica en extensión completa maximiza la contracción glútea. Estudios de Gonçalves et al. (2021) demuestran que el entrenamiento de fuerza isométrica de aductores y abductores mejora el rendimiento en sprint y la altura del salto.",
    phaseInstructions: {
      eccentric: "Desciende controlando hasta que los muslos queden paralelos al suelo.",
      isometric: "Caderas arriba al máximo. Aprieta glúteos con máxima intensidad. Espalda neutra.",
      concentric: "Sube empujando con talones. Activa el glúteo antes de extender."
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 4,
    repsDefault: 10,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Cadera",
      protocol: "Rango reducido. Isométrico en posición media.",
      phases: { eccentric: 3, isometric: 3, concentric: 3, rest: 90 },
      series: 3,
      reps: 10,
      notes: "Apoyo lumbar firme. Sin hiperextensión lumbar.",
    },
  },
  {
    id: "pull_up",
    name: "Dominadas",
    type: "Compuesto",
    targetMuscles: ["espalda", "bíceps", "core"],
    gender: "both",
    difficulty: "avanzado",
    equipment: "barra dominadas",
    isActiveRecovery: false,
    alternative: "dumbbell_row",
    description: "Las dominadas desarrollan la espalda y bíceps con el peso corporal. La fase excéntrica lenta produce daño mecánico mínimo comparado con el trabajo concéntrico (IST vs TST). El entrenamiento isométrico en rango parcial mejora la fuerza en ese ángulo articular ±20° según investigaciones de González y Gorostiaga.",
    phaseInstructions: {
      concentric: "Tira con los codos hacia abajo. Piensa en llevar los codos a las caderas. Exhala.",
      isometric: "Barbilla sobre la barra. Contrae dorsales y bíceps al máximo.",
      eccentric: "Baja con control total. 3 segundos hasta extensión completa. Escápulas deprimidas.",
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 4,
    repsDefault: 5,
    caloriesPerMinute: 9,
    rehab: {
      injury: "Hombro/Codo",
      protocol: "Asistida con banda. Rango parcial. Excéntrico lento.",
      phases: { eccentric: 5, isometric: 1, concentric: 3, rest: 120 },
      series: 3,
      reps: 5,
      notes: "Solo excéntrico si hay dolor en concéntrico.",
    },
  },
  {
    id: "overhead_press",
    name: "Press Militar",
    type: "Compuesto",
    targetMuscles: ["hombros", "tríceps", "core"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "barra o mancuernas",
    isActiveRecovery: false,
    description: "El press militar desarrolla los tres haces del deltoides y estabiliza el core. El método de Hoffman utilizaba press isométrico a múltiples ángulos de 45°, 90° y 135° para máxima activación de unidades motoras. El IST produce una rápida producción de fuerza con alto reclutamiento de unidades motoras de alto umbral.",
    phaseInstructions: {
      eccentric: "Baja la barra por delante hasta la altura de la clavícula. Codos ligeramente adelantados.",
      isometric: "Barra a nivel del mentón. Tensión máxima en todo el tren superior.",
      concentric: "Empuja vertical hacia arriba. Bloquea escápulas arriba al final."
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 4,
    repsDefault: 6,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Hombro",
      protocol: "Mancuernas neutras. No bloquear codo arriba.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Si hay impingement, usar press en Y o Arnold.",
    },
  },
  {
    id: "plank",
    name: "Plancha Isométrica",
    type: "Core",
    targetMuscles: ["core", "hombros", "glúteos"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: false,
    description: "La plancha isométrica es el ejercicio de estabilización lumbar por excelencia. Una sesión semanal de 1 serie de 8-10 repeticiones máximas en distintas posiciones angulares de 1-2 segundos es suficiente para prevenir alteraciones raquídeas (Lisón, Monfort y Sarti). El transverso abdominal y el multífido se activan de forma profunda y sostenida.",
    phaseInstructions: {
      isometric: "Cuerpo recto como tabla. Core contraído. Respira con diafragma. Glúteos apretados. Lumbar neutral."
    },
    phases: { eccentric: 0, isometric: 30, concentric: 0, rest: 60 },
    genderPhases: {
      female: { eccentric: 0, isometric: 31, concentric: 0, rest: 45 },
      male:   { eccentric: 0, isometric: 30, concentric: 0, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 1,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Lumbar",
      protocol: "Plancha sobre rodillas si hay dolor. Respiración controlada.",
      phases: { eccentric: 0, isometric: 15, concentric: 0, rest: 60 },
      series: 3,
      reps: 1,
      notes: "No permitir hundimiento lumbar en ningún caso. Dead Bug como ejercicio previo.",
    },
  },
  {
    id: "bicep_curl",
    name: "Curl de Bíceps",
    type: "Aislamiento",
    targetMuscles: ["bíceps"],
    gender: "both",
    difficulty: "principiante",
    equipment: "mancuernas o barra",
    isActiveRecovery: false,
    description: "El curl de bíceps con fase isométrica en el punto de máxima tensión (90°) maximiza el reclutamiento de unidades motoras. Zou et al. (2023) demostraron que un programa isométrico de 9 semanas incrementó tanto el tamaño muscular como la fuerza máxima en flexores del codo, especialmente con combinación de alta y baja intensidad.",
    phaseInstructions: {
      concentric: "Sube con control hacia el hombro. Exhala. Gira la muñeca al final.",
      isometric: "Codo a 90°. Contraer bíceps al máximo. Muñeca neutra.",
      eccentric: "Baja con control total hasta extensión completa del codo. No balancees.",
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 6,
    rehab: {
      injury: "Codo/Bíceps",
      protocol: "Peso muy ligero. Excéntrico super lento.",
      phases: { eccentric: 5, isometric: 1, concentric: 2, rest: 90 },
      series: 3,
      reps: 8,
      notes: "Evitar supinación forzada si hay dolor en tendón distal.",
    },
  },
  {
    id: "romanian_deadlift",
    name: "Peso Muerto Rumano",
    type: "Compuesto",
    targetMuscles: ["isquiotibiales", "glúteos", "espalda baja"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "barra o mancuernas",
    isActiveRecovery: false,
    description: "El peso muerto rumano estira y fortalece los isquiotibiales con carga excéntrica controlada. La pausa isométrica en el punto de máxima tensión de los isquiotibiales genera adaptaciones específicas de fuerza y resistencia. Fundamental para prevención de roturas musculares según el protocolo Oslo.",
    phaseInstructions: {
      eccentric: "Caderas hacia atrás. Barra pegada a las piernas. Espalda neutra. Inhala.",
      isometric: "Pausa en el punto de máxima tensión de isquiotibiales, sin dolor.",
      concentric: "Activa glúteos, extiende caderas. Exhala al subir."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 8,
    caloriesPerMinute: 9,
    rehab: {
      injury: "Isquiotibiales",
      protocol: "Rango limitado por tensión, no por dolor.",
      phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Isométrico en punto de máxima tensión sin dolor.",
    },
  },
  {
    id: "triceps_pushdown",
    name: "Extensión de Tríceps Polea",
    type: "Aislamiento",
    targetMuscles: ["tríceps"],
    gender: "both",
    difficulty: "principiante",
    equipment: "polea",
    isActiveRecovery: false,
    description: "La extensión de tríceps en polea permite aislar el tríceps con carga constante. La contracción isométrica en extensión completa es altamente efectiva para la tendinopatía tricipital, reduciendo el dolor con analgesia inmediata similar a lo descrito por Rio et al. (2017) para contracciones isométricas vs isotónicas.",
    phaseInstructions: {
      eccentric: "Codo se flexiona lentamente. Control total. Codos pegados al cuerpo.",
      isometric: "Extensión completa del codo. Tríceps contraído al máximo.",
      concentric: "Extiende el codo con fuerza. Codos inmóviles durante todo el movimiento."
    },
    phases: { eccentric: 2, isometric: 1, concentric: 1, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 1, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 1, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 6,
    rehab: {
      injury: "Codo/Tríceps",
      protocol: "Cuerda o barra recta. Peso mínimo. Sin bloquear.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Útil en tendinopatía tricipital como carga isométrica.",
    },
  },
  {
    id: "bent_over_row",
    name: "Remo con Barra",
    type: "Compuesto",
    targetMuscles: ["espalda", "bíceps", "core"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "barra",
    isActiveRecovery: false,
    description: "El remo con barra desarrolla la espalda media y gruesa con alta carga. La pausa isométrica con escápulas retraídas activa romboides y trapecio medio con máxima intensidad. El trabajo de los extensores lumbares en posición inclinada refuerza la estabilidad raquídea isométricamente.",
    phaseInstructions: {
      concentric: "Jala con los codos hacia atrás. Piensa en apretar un lápiz entre los omóplatos. Exhala.",
      isometric: "Barra pegada al abdomen. Escápulas totalmente retraídas y deprimidas.",
      eccentric: "Extiende los codos controlado hacia abajo. Espalda neutra, torso inclinado 45°.",
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 4,
    repsDefault: 8,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Lumbar",
      protocol: "Apoyar en banco inclinado si hay dolor.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Remo en polea sentado como alternativa segura.",
    },
  },
  {
    id: "bulgarian_split_squat",
    name: "Sentadilla Búlgara",
    type: "Compuesto",
    targetMuscles: ["cuádriceps", "glúteos", "equilibrio"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "banco+mancuernas",
    isActiveRecovery: false,
    description: "La sentadilla búlgara es el mejor ejercicio unilateral para cuádriceps y glúteos. Elimina las compensaciones bilaterales. La pausa isométrica en el punto más bajo activa unidades motoras de alto umbral en el cuádriceps anterior, especialmente efectiva para rehabilitación unilateral de rodilla.",
    phaseInstructions: {
      eccentric: "Desciende lento, rodilla delantera no pasa los dedos del pie. Torso ligeramente inclinado.",
      isometric: "Rodilla a 90° o menos. Máxima tensión en cuádriceps y glúteo.",
      concentric: "Empuja con el talón delantero. Activa glúteo. Extiende completamente."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 8,
    unilateral: true,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Rodilla/Cadera",
      protocol: "Sin peso. Rango muy limitado. Foco en estabilidad.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 120 },
      series: 3,
      reps: 6,
      notes: "Excelente para rehabilitación unilateral de rodilla.",
    },
  },
  {
    id: "goblet_squat",
    name: "Sentadilla Copa",
    type: "Compuesto",
    targetMuscles: ["cuádriceps", "glúteos", "core"],
    gender: "both",
    difficulty: "principiante",
    equipment: "mancuerna o kettlebell",
    isActiveRecovery: false,
    description: "La sentadilla copa es ideal para principiantes y rehabilitación. El contrapeso mejora la postura y permite mayor profundidad. La pausa isométrica en el fondo activa el core profundo y los glúteos simultáneamente. Es el ejercicio base del protocolo de rehabilitación de cadera y rodilla.",
    phaseInstructions: {
      eccentric: "Desciende lento con codos hacia adentro de las rodillas. Talones en el suelo.",
      isometric: "Posición más baja posible con comodidad. Core contraído. Pecho arriba.",
      concentric: "Empuja el suelo. Extiende rodillas y caderas. Exhala al subir."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Rodilla/Cadera",
      protocol: "Sentadilla correctiva. Ideal para movilidad.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 90 },
      series: 3,
      reps: 10,
      notes: "Usar como ejercicio correctivo base en rehab de cadera.",
    },
  },
  {
    id: "push_up",
    name: "Flexiones",
    type: "Compuesto",
    targetMuscles: ["pecho", "hombros", "tríceps", "core"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: false,
    description: "Las flexiones son el ejercicio de empuje más accesible. La pausa isométrica en la parte baja activa pectoral mayor y estabilizadores de escápula al máximo. La investigación de Lum et al. (2021) confirma que el entrenamiento isométrico mejora tanto la fuerza explosiva como la tasa de desarrollo de fuerza.",
    phaseInstructions: {
      eccentric: "Codos a 45° del cuerpo. Pecho casi toca el suelo. Cuerpo rígido.",
      isometric: "Pecho a 1-2cm del suelo. Tensión máxima. Escápulas deprimidas.",
      concentric: "Empuja el suelo, extiende completamente. Core firme durante todo el movimiento."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Hombro",
      protocol: "Sobre rodillas o inclinado. Core firme.",
      phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 8,
      notes: "Mantener escápulas deprimidas durante todo el movimiento.",
    },
  },
  {
    id: "seated_cable_row",
    name: "Remo en Polea Sentado",
    type: "Compuesto",
    targetMuscles: ["espalda media", "bíceps", "romboides"],
    gender: "both",
    difficulty: "principiante",
    equipment: "polea",
    isActiveRecovery: false,
    description: "El remo en polea sentado permite trabajar la espalda media sin carga lumbar. La pausa isométrica con escápulas retraídas al máximo activa romboides y trapecio medio con carga constante durante toda la fase. Ideal como progresión en rehabilitación de hombro según los protocolos de Cook y Rio.",
    phaseInstructions: {
      concentric: "Jala con codos a los lados del cuerpo. Piensa en llevar los codos a las caderas.",
      isometric: "Mango contra el abdomen. Escápulas completamente retraídas y deprimidas.",
      eccentric: "Extiende los codos hacia adelante lento. Torso erecto durante todo el movimiento.",
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Hombro/Lumbar",
      protocol: "Torso erecto. Sin extensión lumbar. Codos pegados.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Ideal postoperatorio de hombro con carga controlada.",
    },
  },
  {
    id: "lunges",
    name: "Zancadas",
    type: "Compuesto",
    targetMuscles: ["cuádriceps", "glúteos", "equilibrio"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo o mancuernas",
    isActiveRecovery: false,
    description: "Las zancadas desarrollan fuerza funcional unilateral de pierna. Mejoran el equilibrio, la propiocepción y la estabilidad de rodilla. La fase excéntrica controlada durante el descenso es equivalente al protocolo de carga excéntrica para rehabilitación de rodilla descrito por Bonilla et al. (2001).",
    phaseInstructions: {
      eccentric: "Desciende lento con la rodilla trasera hacia el suelo. Torso erecto.",
      isometric: "Rodilla delantera a 90°. Rodilla trasera a pocos centímetros del suelo.",
      concentric: "Empuja con el talón delantero. Extiende completamente. Paso adelante."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    unilateral: true,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Rodilla",
      protocol: "Estáticas primero. Rango parcial. Sin dolor patelar.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 90 },
      series: 3,
      reps: 8,
      notes: "Empezar estáticas, luego dinámicas cuando no hay dolor.",
    },
  },
  {
    id: "cable_kickback",
    name: "Patada Glúteo en Polea",
    type: "Aislamiento",
    targetMuscles: ["glúteos"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "polea baja",
    isActiveRecovery: false,
    description: "El cable kickback aísla el glúteo mayor en extensión de cadera. La pausa isométrica en extensión máxima activa el 70-80% del glúteo mayor de forma selectiva. Fundamental en protocolos de activación glútea previos a ejercicios compuestos para mejorar la conexión neuromuscular.",
    phaseInstructions: {
      eccentric: "Flexiona la cadera hacia adelante controlado. Core activo. Espalda neutra.",
      isometric: "Extensión máxima de cadera hacia atrás. Aprieta el glúteo con toda la fuerza.",
      concentric: "Lleva la pierna atrás con fuerza. Activa el glúteo desde el inicio."
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    unilateral: true,
    caloriesPerMinute: 6,
    rehab: {
      injury: "Cadera",
      protocol: "Sin carga. Isométrico en extensión de cadera.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Activar glúteo antes de movimientos más complejos.",
    },
  },
  {
    id: "abductor_machine",
    name: "Máquina Abductora",
    type: "Aislamiento",
    targetMuscles: ["glúteos", "abductores", "TFL"],
    gender: "both",
    difficulty: "principiante",
    equipment: "máquina",
    isActiveRecovery: false,
    description: "La máquina abductora trabaja el glúteo medio y los abductores de cadera con carga aislada. La fuerza isométrica de abductores correlaciona con la capacidad de sprint repetido en mujeres futbolistas (Gonçalves et al., 2021). Reduce el riesgo de lesiones de rodilla valga y síndrome de cadera chasqueante.",
    phaseInstructions: {
      eccentric: "Cierra las piernas lentamente con control. Espalda apoyada en el respaldo.",
      isometric: "Máxima apertura posible. Tensión en glúteo medio y TFL.",
      concentric: "Abre con fuerza. Mantén la postura erguida en el asiento."
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Cadera/Rodilla",
      protocol: "Rango reducido. Control total del movimiento.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Útil en rehabilitación de lesiones de cadera y rodilla valga.",
    },
  },
  {
    id: "chin_up",
    name: "Dominadas Supinas",
    type: "Compuesto",
    targetMuscles: ["bíceps", "espalda", "core"],
    gender: "both",
    difficulty: "avanzado",
    equipment: "barra dominadas",
    isActiveRecovery: false,
    alternative: "bicep_curl",
    description: "Las dominadas supinas priorizan el bíceps sobre el dorsal comparado con las dominadas pronadas. La fase excéntrica lenta de 5-6 segundos es el estímulo más eficaz para el bíceps distal y el tendón. El protocolo excéntrico de Alfredson adaptado se utiliza en recuperación de ruptura parcial del tendón distal del bíceps.",
    phaseInstructions: {
      concentric: "Sube tirando con los codos. Supinación activa durante el movimiento. Exhala.",
      isometric: "Barbilla sobre la barra. Bíceps completamente contraído. Aprieta con fuerza.",
      eccentric: "Baja con control absoluto. 5 segundos hasta extensión completa. Gira las muñecas.",
    },
    phases: { eccentric: 5, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 5, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 5, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 6,
    caloriesPerMinute: 9,
    rehab: {
      injury: "Bíceps distal",
      protocol: "Solo excéntrico asistido. Sin supinación forzada.",
      phases: { eccentric: 5, isometric: 1, concentric: 4, rest: 120 },
      series: 3,
      reps: 5,
      notes: "Recuperación de ruptura parcial tendón distal bíceps.",
    },
  },
  {
    id: "leg_raise",
    name: "Elevación de Piernas",
    type: "Core",
    targetMuscles: ["core", "flexores cadera"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "suelo o barra",
    isActiveRecovery: false,
    description: "La elevación de piernas activa el recto abdominal inferior y los flexores de cadera. La pausa isométrica con piernas a 90° genera alta presión intradiscal controlada que fortalece el core profundo. Fundamental para la estabilidad lumbar cuando se combina con respiración diafragmática.",
    phaseInstructions: {
      eccentric: "Baja las piernas lento. Lumbar pegada al suelo o a la barra.",
      isometric: "Piernas a 90°. Tensión máxima en abdomen. Respira normalmente.",
      concentric: "Sube las piernas con control. Evita usar el impulso."
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Lumbar/Core",
      protocol: "Rodillas dobladas. Sin arquear lumbar. Lento.",
      phases: { eccentric: 3, isometric: 2, concentric: 3, rest: 90 },
      series: 3,
      reps: 8,
      notes: "Si hay dolor lumbar, sustituir por Dead Bug.",
    },
  },
  {
    id: "lat_pulldown",
    name: "Jalón al Pecho",
    type: "Compuesto",
    targetMuscles: ["espalda", "bíceps", "romboides"],
    gender: "both",
    difficulty: "principiante",
    equipment: "polea alta",
    isActiveRecovery: false,
    description: "El jalón al pecho desarrolla el dorsal ancho con carga controlada. Es la alternativa a las dominadas para principiantes y en rehabilitación. La pausa isométrica con el mango cerca del pecho activa el gran dorsal y romboides con máxima contracción. El IST produce menor daño mecánico que el TST equivalente.",
    phaseInstructions: {
      concentric: "Jala hacia el pecho llevando los codos hacia las caderas. Exhala.",
      isometric: "Mango a nivel del mentón o pecho. Codos bajos. Escápulas juntas y bajas.",
      eccentric: "Extiende los codos hacia arriba lento. Mantén la postura erguida.",
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Hombro",
      protocol: "Agarre neutro o supino. Sin llevar barra detrás.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Alternativa a dominadas en rehabilitación de hombro.",
    },
  },
  {
    id: "face_pull",
    name: "Face Pull en Polea",
    type: "Aislamiento",
    targetMuscles: ["deltoides posterior", "manguito rotador", "romboides"],
    gender: "both",
    difficulty: "principiante",
    equipment: "polea con cuerda",
    isActiveRecovery: false,
    description: "El face pull es el ejercicio preventivo más importante para la salud del hombro. La pausa isométrica con rotación externa máxima activa el infraespinoso y el redondo menor, músculos claves del manguito rotador. Según Cook y Rio, es ejercicio base de todo protocolo de rehabilitación y prevención de hombro.",
    phaseInstructions: {
      concentric: "Tira hacia la cara con codos altos. Piensa en separar la cuerda al llegar.",
      isometric: "Manos a nivel de la cara. Máxima rotación externa. Codos al frente.",
      eccentric: "Extiende los brazos hacia la polea lentamente. Codos a la altura de los hombros.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 4,
    repsDefault: 15,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Hombro",
      protocol: "Base de toda rehabilitación de hombro. Carga ligera.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 4,
      reps: 15,
      notes: "Esencial para equilibrio muscular anterior/posterior de hombro.",
    },
  },
  {
    id: "leg_press",
    name: "Prensa de Piernas",
    type: "Compuesto",
    targetMuscles: ["cuádriceps", "glúteos", "isquiotibiales"],
    gender: "both",
    difficulty: "principiante",
    equipment: "máquina",
    isActiveRecovery: false,
    description: "La prensa de piernas permite carga elevada con menor riesgo lumbar que la sentadilla. La fase excéntrica lenta a diferentes ángulos de rodilla produce ganancias de fuerza específicas por ángulo ±20° (Bogdanis et al., 2018). Es el primer ejercicio de carga en protocolos de rehabilitación postoperatoria de rodilla.",
    phaseInstructions: {
      eccentric: "Rodillas se flexionan hasta 90°. Control total. Espalda apoyada.",
      isometric: "Rodillas a 90°. Tensión máxima en cuádriceps y glúteos. Sin que las rodillas colapsen.",
      concentric: "Empuja el peso extendiendo rodillas y caderas. No bloquees las rodillas al final."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Rodilla",
      protocol: "Rango 0-60°. Pies altos para glúteo. Carga baja.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 120 },
      series: 3,
      reps: 12,
      notes: "Primer ejercicio de carga en rehab postoperatoria de rodilla.",
    },
  },
  {
    id: "calf_raise",
    name: "Elevación de Talones",
    type: "Aislamiento",
    targetMuscles: ["gemelos", "sóleo"],
    gender: "both",
    difficulty: "principiante",
    equipment: "máquina o escalón",
    isActiveRecovery: false,
    description: "La elevación de talones trabaja gemelos y sóleo. El protocolo excéntrico de Alfredson (3x15 dos veces al día durante 12 semanas) es el gold standard para tendinopatía de Aquiles. Los estudios de Branislav et al. (2013) muestran mejoras significativas en la tasa de desarrollo de fuerza (RFD) de gemelos con entrenamiento isométrico de alta intensidad.",
    phaseInstructions: {
      eccentric: "Baja el talón por debajo del escalón lentamente. Máximo estiramiento del gemelo.",
      isometric: "Punta del pie al máximo. Gemelos completamente contraídos.",
      concentric: "Sube en punta de pies con fuerza. Extiende el tobillo por completo."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Tobillo/Aquiles",
      protocol: "Excéntrico lento. Protocolo Alfredson para tendinopatía.",
      phases: { eccentric: 5, isometric: 1, concentric: 2, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Protocolo excéntrico de Alfredson: 3x15 dos veces al día.",
    },
  },
  {
    id: "glute_bridge",
    name: "Puente de Glúteos",
    type: "Compuesto",
    targetMuscles: ["glúteos", "core", "isquiotibiales"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    description: "El puente de glúteos es el primer ejercicio en protocolos de lumbalgia aguda. Activa el glúteo mayor sin carga axial lumbar. La pausa isométrica en extensión máxima de cadera activa el transverso abdominal y el multífido simultáneamente, estabilizando la columna lumbar de forma profunda y segura.",
    phaseInstructions: {
      eccentric: "Baja la cadera lentamente hasta casi tocar el suelo. Mantén la tensión.",
      isometric: "Cadera arriba. Glúteos apretados al máximo. Lumbar neutra. Rodillas a 90°.",
      concentric: "Sube empujando talones. Activa el glúteo al máximo desde el inicio."
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Lumbar/Cadera",
      protocol: "Activación glútea sin carga axial. Ideal post-lumbar.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Primer ejercicio en protocolo de lumbalgia aguda.",
    },
  },
  {
    id: "side_plank",
    name: "Plancha Lateral",
    type: "Core",
    targetMuscles: ["oblicuos", "glúteo medio", "core"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "suelo",
    isActiveRecovery: false,
    description: "La plancha lateral es fundamental para la estabilidad lumbar lateral y la prevención de recaídas. Activa el cuadrado lumbar y los oblicuos de forma isométrica pura. Una sesión semanal de 1 serie de 8-10 repeticiones en distintas posiciones angulares de 1-2 segundos aislando correctamente la musculatura lumbar es suficiente (Lisón et al.).",
    phaseInstructions: {
      isometric: "Cuerpo recto lateral. Cadera arriba alineada. Core lateral contraído. Respira con diafragma."
    },
    phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 60 },
    genderPhases: {
      female: { eccentric: 0, isometric: 21, concentric: 0, rest: 45 },
      male:   { eccentric: 0, isometric: 20, concentric: 0, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 1,
    unilateral: true,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Lumbar lateral/Cadera",
      protocol: "Sobre rodilla primero. Progresión controlada.",
      phases: { eccentric: 0, isometric: 10, concentric: 0, rest: 60 },
      series: 3,
      reps: 1,
      notes: "Fundamental para estabilidad lumbar y prevención de recaídas.",
    },
  },
  {
    id: "cable_fly",
    name: "Aperturas en Polea",
    type: "Aislamiento",
    targetMuscles: ["pecho", "deltoides anterior"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "poleas cruzadas",
    isActiveRecovery: false,
    description: "Las aperturas en polea trabajan el pecho con tensión constante en todo el rango. La pausa isométrica en el cruce máximo activa el pectoral con máxima contracción. El IST ofrece menor daño mecánico que el TST, por lo que es preferible en fases tempranas de rehabilitación de hombro con buen control del rango.",
    phaseInstructions: {
      eccentric: "Abre los brazos lentamente con codos semiflexionados. Pecho abierto.",
      isometric: "Manos cruzadas al frente. Pectoral completamente contraído.",
      concentric: "Cierra los brazos como un abrazo. Exhala al juntar."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 6,
    rehab: {
      injury: "Hombro/Pecho",
      protocol: "Rango reducido. Codos semiflexionados. Carga mínima.",
      phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Alternativa a press en fases tempranas de rehab de hombro.",
    },
  },
  {
    id: "reverse_fly",
    name: "Aperturas Inversas",
    type: "Aislamiento",
    targetMuscles: ["deltoides posterior", "romboides", "trapecio"],
    gender: "both",
    difficulty: "principiante",
    equipment: "mancuernas o polea",
    isActiveRecovery: false,
    description: "Las aperturas inversas son esenciales para el equilibrio muscular anterior/posterior del hombro. Activan el deltoides posterior y los retractores de escápula. Son base de cualquier protocolo de hombro y postura. La pausa isométrica en máxima apertura activa romboides y trapecio medio de forma sostenida.",
    phaseInstructions: {
      concentric: "Abre los brazos hacia atrás y arriba. Lleva los codos hacia atrás.",
      isometric: "Brazos en T. Escápulas completamente retraídas. Codos ligeramente flexionados.",
      eccentric: "Cierra los brazos lento hacia el frente. Torso inclinado 45°.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Hombro",
      protocol: "Mancuernas muy ligeras. Isométrico en posición abierta.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Esencial para manguito rotador y postura.",
    },
  },
  {
    id: "nordic_curl",
    name: "Curl Nórdico",
    type: "Compuesto",
    targetMuscles: ["isquiotibiales"],
    gender: "both",
    difficulty: "avanzado",
    equipment: "suelo+banco",
    isActiveRecovery: false,
    description: "El curl nórdico es el ejercicio más efectivo para prevenir roturas de isquiotibiales. El protocolo de Oslo con carga excéntrica progresiva durante 10 semanas reduce hasta un 65% la incidencia de lesiones. La carga excéntrica de 6 segundos activa unidades motoras de alto umbral más que cualquier ejercicio isotónico equivalente.",
    phaseInstructions: {
      eccentric: "Cae hacia adelante MUY lento controlando con los isquiotibiales. 5-6 segundos.",
      isometric: "Pausa momentánea al inicio del movimiento. Tensión máxima en isquiotibiales.",
      concentric: "Usa los brazos para empujarte y volver a la posición inicial."
    },
    phases: { eccentric: 5, isometric: 1, concentric: 3, rest: 120 },
    genderPhases: {
      female: { eccentric: 5, isometric: 2, concentric: 3, rest: 105 },
      male:   { eccentric: 5, isometric: 1, concentric: 3, rest: 120 },
    },
    seriesDefault: 3,
    repsDefault: 6,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Isquiotibiales",
      protocol: "Solo excéntrico al inicio. El mejor preventivo de rotura.",
      phases: { eccentric: 6, isometric: 1, concentric: 3, rest: 150 },
      series: 3,
      reps: 5,
      notes: "Protocolo Oslo: excéntrico progresivo durante 10 semanas.",
    },
  },
  {
    id: "step_up",
    name: "Subida al Cajón",
    type: "Compuesto",
    targetMuscles: ["cuádriceps", "glúteos", "equilibrio"],
    gender: "both",
    difficulty: "principiante",
    equipment: "cajón o banco",
    isActiveRecovery: false,
    description: "La subida al cajón es un ejercicio funcional unilateral excelente en todas las fases de rehabilitación. La fase excéntrica controlada en el descenso genera carga excéntrica específica en el cuádriceps. Bonilla et al. (2001) demostraron que la recuperación con ejercicios de resistencia progresiva unilateral es más rápida que el programa tradicional.",
    phaseInstructions: {
      eccentric: "Baja lentamente con el pie que está en el cajón. Rodilla alineada.",
      isometric: "Un pie en el cajón, rodilla a 90°. Tensión en cuádriceps y glúteo.",
      concentric: "Sube empujando con el talón del pie en el cajón. Activa el glúteo."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    unilateral: true,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Rodilla/Cadera",
      protocol: "Altura baja. Control excéntrico clave. Sin apoyo.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 90 },
      series: 3,
      reps: 8,
      notes: "Excelente ejercicio funcional en todas las fases de rehab.",
    },
  },
  {
    id: "wall_sit",
    name: "Sentadilla en Pared",
    type: "Isométrico",
    targetMuscles: ["cuádriceps", "glúteos"],
    gender: "both",
    difficulty: "principiante",
    equipment: "pared",
    isActiveRecovery: false,
    description: "La sentadilla en pared es el protocolo isométrico de referencia para la tendinopatía rotuliana. El protocolo científico validado es 5x45s con el 70% de la RM. Wiles et al. (2017) demostraron reducciones significativas de tensión arterial sistólica (-4mmHg) y diastólica (-3mmHg) con solo 4x2 minutos, 3 veces por semana durante 4 semanas.",
    phaseInstructions: {
      isometric: "Espalda pegada a la pared. Rodillas exactamente a 90°. Talones debajo de las rodillas. Respira con diafragma."
    },
    phases: { eccentric: 0, isometric: 45, concentric: 0, rest: 90 },
    genderPhases: {
      female: { eccentric: 0, isometric: 46, concentric: 0, rest: 75 },
      male:   { eccentric: 0, isometric: 45, concentric: 0, rest: 90 },
    },
    seriesDefault: 5,
    repsDefault: 1,
    caloriesPerMinute: 4,
    rehab: {
      injury: "Rodilla",
      protocol: "Ángulo 90°. Isométrico puro. Sin dolor.",
      phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 90 },
      series: 3,
      reps: 1,
      notes: "Protocolo isométrico para tendinopatía patelar: 5x45s.",
    },
  },
  {
    id: "shoulder_external_rotation",
    name: "Rotación Externa Hombro",
    type: "Corrección",
    targetMuscles: ["manguito rotador", "infraespinoso"],
    gender: "both",
    difficulty: "principiante",
    equipment: "banda elástica",
    isActiveRecovery: true,
    description: "La rotación externa de hombro activa el infraespinoso y el redondo menor, músculos protectores de la articulación glenohumeral. La pausa isométrica en máxima rotación externa activa el manguito rotador de forma sostenida. Es el ejercicio más efectivo en la fase aguda del protocolo de hombro (semanas 1-3).",
    phaseInstructions: {
      concentric: "Rota el antebrazo hacia afuera del cuerpo. Movimiento limpio y controlado.",
      isometric: "Rotación externa máxima. Muñeca neutra. Codo a 90°.",
      eccentric: "Regresa lento hacia el abdomen. Codo pegado al cuerpo a 90°.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 4,
    repsDefault: 15,
    unilateral: true,
    caloriesPerMinute: 3,
    rehab: {
      injury: "Hombro/Manguito",
      protocol: "Codo a 90°. Movimiento puro de rotación. Sin dolor.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 4,
      reps: 15,
      notes: "Fundamental en cualquier protocolo de hombro.",
    },
  },
  {
    id: "good_morning",
    name: "Buenos Días",
    type: "Compuesto",
    targetMuscles: ["isquiotibiales", "glúteos", "espalda baja"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "barra",
    isActiveRecovery: false,
    description: "El ejercicio Buenos Días fortalece los extensores lumbares e isquiotibiales con carga controlada. Los extensores lumbares isométricos reducen el síndrome de dolor lumbar y mejoran la estabilidad raquídea. El entrenamiento lumbar isométrico una vez por semana produce los mismos incrementos de fuerza que dos o tres sesiones (Graves et al.).",
    phaseInstructions: {
      eccentric: "Inclina el torso hacia adelante desde la cadera. Espalda neutra. Rodillas semiflexionadas.",
      isometric: "Torso paralelo al suelo. Tensión máxima en isquiotibiales y extensores lumbares.",
      concentric: "Extiende la cadera. Activa glúteos y extensores lumbares juntos. Exhala."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 8,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Lumbar/Isquiotibiales",
      protocol: "Sin carga. Solo peso corporal. Hinge controlado.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Usar como movilidad de cadera en rehab lumbar.",
    },
  },
  {
    id: "incline_press",
    name: "Press Inclinado",
    type: "Compuesto",
    targetMuscles: ["pecho superior", "hombros", "tríceps"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "banco inclinado+barra",
    isActiveRecovery: false,
    description: "El press inclinado activa el pectoral superior y el deltoides anterior. El ángulo de 30° reduce el impingement de hombro comparado con el press plano, siendo mejor tolerado en patologías de hombro. La pausa isométrica con la barra cerca del pecho maximiza la activación del pectoral clavicular.",
    phaseInstructions: {
      eccentric: "Baja la barra hacia la parte superior del pecho lentamente.",
      isometric: "Barra cerca del pecho superior. Tensión máxima en pectoral clavicular.",
      concentric: "Empuja hacia arriba y ligeramente hacia los pies. Exhala."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 8,
    caloriesPerMinute: 8,
    rehab: {
      injury: "Hombro",
      protocol: "Ángulo 30°. Menos impingement. Carga ligera.",
      phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Mejor tolerado que press plano en hombro lesionado.",
    },
  },
  {
    id: "leg_extension",
    name: "Extensión de Piernas",
    type: "Aislamiento",
    targetMuscles: ["cuádriceps"],
    gender: "both",
    difficulty: "principiante",
    equipment: "máquina",
    isActiveRecovery: false,
    description: "La extensión de piernas aísla el cuádriceps con carga variable. La pausa isométrica en extensión completa es el protocolo más efectivo para tendinopatía rotuliana (protocolo de Rio et al.: 5x45s al 70% RM). Contracciones isométricas producen analgesia inmediata significativamente mayor que las isotónicas durante cuatro semanas de evaluación.",
    phaseInstructions: {
      eccentric: "Baja la pierna lentamente. Control total del cuádriceps durante todo el descenso.",
      isometric: "Extensión completa de rodilla. Cuádriceps contraído al máximo.",
      concentric: "Extiende la rodilla con fuerza. Sin impulso. Exhala."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Rodilla",
      protocol: "Rango 90-45°. Isométrico en extensión completa.",
      phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Controversia en LCA: consultar fisio antes de usar.",
    },
  },
  {
    id: "leg_curl",
    name: "Curl de Piernas",
    type: "Aislamiento",
    targetMuscles: ["isquiotibiales"],
    gender: "both",
    difficulty: "principiante",
    equipment: "máquina",
    isActiveRecovery: false,
    description: "El curl de piernas trabaja los isquiotibiales con carga aislada. La fase excéntrica lenta de 5 segundos es el mejor protocolo para el fortalecimiento isquiotibial en rehabilitación. Complementar con Nordic Curl en fase avanzada para máxima protección contra roturas musculares.",
    phaseInstructions: {
      eccentric: "Extiende la rodilla lentamente con control absoluto. 4-5 segundos.",
      isometric: "Rodilla en flexión máxima. Isquiotibial completamente contraído.",
      concentric: "Flexiona la rodilla hacia el glúteo. Sin balancear las caderas."
    },
    phases: { eccentric: 4, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 4, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Isquiotibiales",
      protocol: "Excéntrico muy lento. Peso mínimo. Sin dolor.",
      phases: { eccentric: 5, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 8,
      notes: "Complementar con Nordic Curl en fase avanzada.",
    },
  },
  {
    id: "dumbbell_row",
    name: "Remo con Mancuerna",
    type: "Compuesto",
    targetMuscles: ["espalda", "bíceps", "romboides"],
    gender: "both",
    difficulty: "principiante",
    equipment: "banco+mancuerna",
    isActiveRecovery: false,
    description: "El remo con mancuerna trabaja la espalda unilateralmente sin carga axial lumbar. Es la alternativa más accesible al remo con barra y a las dominadas. La pausa isométrica con escápula completamente retraída activa el gran dorsal y romboides con máxima contracción. Accesible en casa con una botella de agua.",
    phaseInstructions: {
      concentric: "Jala el codo hacia el techo. Mantén el torso paralelo al suelo.",
      isometric: "Mancuerna a nivel del abdomen. Codo atrás. Escápula completamente retraída.",
      eccentric: "Extiende el codo hacia el suelo lento. Escápula hacia adelante controlado.",
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 12,
    unilateral: true,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Hombro/Lumbar",
      protocol: "Apoyo en banco. Escápula retraída. Sin rotación.",
      phases: { eccentric: 3, isometric: 2, concentric: 2, rest: 90 },
      series: 3,
      reps: 12,
      notes: "Alternativa a remo barra sin carga axial lumbar.",
    },
  },
  {
    id: "arnold_press",
    name: "Press Arnold",
    type: "Compuesto",
    targetMuscles: ["deltoides", "tríceps", "manguito"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "mancuernas",
    isActiveRecovery: false,
    description: "El press Arnold combina rotación y press, activando los tres haces del deltoides en un solo movimiento. Permite mayor activación que el press militar convencional con menor carga. La fase isométrica en el punto de máxima rotación externa activa el manguito rotador y estabilizadores escapulares.",
    phaseInstructions: {
      eccentric: "Baja las mancuernas rotando hacia adentro al mismo tiempo. Codos hacia adelante abajo.",
      isometric: "Mancuernas frente a los hombros en rotación interna. Tensión en deltoides.",
      concentric: "Sube y rota hacia afuera simultáneamente. Extiende los brazos arriba."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Hombro",
      protocol: "Rango limitado. Sin llevar a impingement.",
      phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Activación completa del deltoides con menor carga.",
    },
  },
  {
    id: "box_jump",
    name: "Salto al Cajón",
    type: "Explosivo",
    targetMuscles: ["cuádriceps", "glúteos", "gemelos"],
    gender: "both",
    difficulty: "avanzado",
    equipment: "cajón pliométrico",
    isActiveRecovery: false,
    description: "El salto al cajón desarrolla potencia explosiva de tren inferior. Lum et al. (2021 y 2022) encontraron que el entrenamiento isométrico combinado con pliometría mejora la altura del salto de contramovimiento (CMJ) de forma similar. Es el ejercicio final de fase de rehabilitación de tobillo y rodilla.",
    phaseInstructions: {
      eccentric: "Aterriza en el cajón absorbiendo el impacto con rodillas semiflexionadas.",
      isometric: "Posición de aterrizaje estable. Rodillas alineadas. Absorber la carga.",
      concentric: "Impulso explosivo desde la flexión de rodillas. Brazos hacia arriba."
    },
    phases: { eccentric: 2, isometric: 1, concentric: 1, rest: 120 },
    genderPhases: {
      female: { eccentric: 2, isometric: 1, concentric: 1, rest: 105 },
      male:   { eccentric: 2, isometric: 1, concentric: 1, rest: 120 },
    },
    seriesDefault: 3,
    repsDefault: 6,
    caloriesPerMinute: 12,
    rehab: {
      injury: "Tobillo/Rodilla",
      protocol: "Solo bajada (excéntrico). Sin salto. Aterrizaje suave.",
      phases: { eccentric: 3, isometric: 1, concentric: 0, rest: 120 },
      series: 3,
      reps: 5,
      notes: "Fase final de rehabilitación. Aprobación médica necesaria.",
    },
  },
  {
    id: "dead_bug",
    name: "Dead Bug",
    type: "Core",
    targetMuscles: ["core", "transverso abdominal", "multífido"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    description: "El Dead Bug es el ejercicio más seguro para el core profundo. Activa el transverso abdominal y el multífido con la columna lumbar en posición neutra y sin carga compresiva. Es el primer ejercicio en el protocolo de lumbalgia aguda según la evidencia clínica. La respiración diafragmática durante la ejecución potencia la activación del core profundo.",
    phaseInstructions: {
      eccentric: "Baja el brazo y la pierna contrarios lentamente hacia el suelo. Lumbar PEGADA al suelo en todo momento. Inhala.",
      isometric: "Pausa en el punto más bajo. Lumbar en contacto total con el suelo. Core activado al máximo.",
      concentric: "Devuelve brazo y pierna a la posición inicial con control total. Exhala. No pierdas el contacto lumbar.",
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 1, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 8,
    unilateral: true,
    caloriesPerMinute: 4,
    rehab: {
      injury: "Lumbar",
      protocol: "Lumbar pegada al suelo. Respiración diafragmática.",
      phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 60 },
      series: 3,
      reps: 8,
      notes: "Primer ejercicio en protocolo lumbar agudo. Muy seguro.",
    },
  },
  {
    id: "pallof_press",
    name: "Pallof Press",
    type: "Core",
    targetMuscles: ["core", "oblicuos", "estabilizadores"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "polea",
    isActiveRecovery: true,
    description: "El Pallof Press es el ejercicio antirotación más efectivo para la estabilidad lumbopélvica. La carga antirotación activa oblicuos y multífido de forma profunda. Excelente para estabilidad lumbo-pélvica en rehabilitación según los protocolos de McGill. La pausa isométrica con brazos extendidos maximiza el torque antirotacional sobre el core.",
    phaseInstructions: {
      eccentric: "Lleva las manos hacia el pecho controlado. Cuerpo completamente estable.",
      isometric: "Brazos extendidos. Resistiendo la rotación. Core en máxima tensión. Respira.",
      concentric: "Extiende los brazos hacia adelante sin rotar ni moverse. Control absoluto."
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 10,
    unilateral: true,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Lumbar/Core",
      protocol: "Carga antirotación. Ideal para estabilización lumbar.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 10,
      notes: "Excelente para estabilidad lumbo-pélvica en rehab.",
    },
  },
  {
    id: "hip_abduction",
    name: "Abducción de Cadera",
    type: "Aislamiento",
    targetMuscles: ["glúteo medio", "TFL", "abductores"],
    gender: "both",
    difficulty: "principiante",
    equipment: "banda o máquina",
    isActiveRecovery: true,
    description: "La abducción de cadera fortalece el glúteo medio, clave para la estabilidad pélvica y la prevención de rodilla valga. La fuerza isométrica de abductores correlaciona directamente con la capacidad de repetir sprints (Gonçalves et al., 2021) y la estabilidad en el aterrizaje. Clave en síndrome de cadera chasqueante.",
    phaseInstructions: {
      eccentric: "Baja la pierna lentamente hasta la posición neutral. Control total.",
      isometric: "Pierna elevada en máxima abducción. Glúteo medio contraído al máximo.",
      concentric: "Eleva la pierna hacia el lado. Sin inclinar el tronco. Core activado."
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    unilateral: true,
    caloriesPerMinute: 4,
    rehab: {
      injury: "Cadera/Rodilla",
      protocol: "Decúbito lateral. Control total. Sin compensaciones.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Clave en síndrome de cadera chasqueante y rodilla valga.",
    },
  },
  {
    id: "rear_delt_fly",
    name: "Deltoides Posterior Mancuernas",
    type: "Aislamiento",
    targetMuscles: ["deltoides posterior", "romboides"],
    gender: "both",
    difficulty: "principiante",
    equipment: "mancuernas",
    isActiveRecovery: false,
    description: "Las aperturas de deltoides posterior corrigen el desequilibrio muscular anterior/posterior del hombro. Son equivalentes al face pull pero sin necesidad de polea. La pausa isométrica con brazos en T activa romboides y trapecio medio de forma sostenida. Esenciales en protocolos de postura y prevención de lesiones de hombro.",
    phaseInstructions: {
      concentric: "Sube los brazos hacia atrás. Piensa en llevar los codos hacia atrás y arriba.",
      isometric: "Brazos en T. Escápulas retraídas. Codos ligeramente flexionados. Tensión máxima.",
      eccentric: "Baja los brazos hacia el frente con codos semiflexionados. Torso 45°.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Hombro",
      protocol: "Mancuernas muy ligeras. Codos semiflexionados.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Igual que face pull pero con mancuernas.",
    },
  },
  {
    id: "single_leg_rdl",
    name: "Peso Muerto Unilateral",
    type: "Compuesto",
    targetMuscles: ["isquiotibiales", "glúteos", "equilibrio"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "mancuerna",
    isActiveRecovery: false,
    description: "El peso muerto unilateral es clave en rehabilitación de esguince de tobillo y propiocepción. Activa isquiotibiales y glúteo mayor en un solo plano de movimiento con alto desafío de equilibrio. La pausa isométrica en el punto de máxima tensión de isquiotibiales mejora la estabilidad del tobillo y la propiocepción.",
    phaseInstructions: {
      eccentric: "Baja el torso hacia adelante con la pierna trasera subiendo. Espalda neutra.",
      isometric: "Torso paralelo. Tensión en isquiotibial de la pierna en suelo. Equilibrio activo.",
      concentric: "Activa glúteo. Extiende la cadera hacia adelante. Vuelve a erguirte."
    },
    phases: { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    genderPhases: {
      female: { eccentric: 3, isometric: 2, concentric: 2, rest: 75 },
      male:   { eccentric: 3, isometric: 1, concentric: 2, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 8,
    unilateral: true,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Tobillo/Isquiotibiales",
      protocol: "Sin carga. Foco en equilibrio y propiocepción.",
      phases: { eccentric: 4, isometric: 2, concentric: 3, rest: 120 },
      series: 3,
      reps: 8,
      notes: "Clave en rehabilitación de esguince de tobillo funcional.",
    },
  },
  {
    id: "farmer_walk",
    name: "Farmer Walk",
    type: "Funcional",
    targetMuscles: ["core", "trapecios", "antebrazos", "espalda"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "mancuernas o kettlebells",
    isActiveRecovery: false,
    description: "El Farmer Walk es el ejercicio funcional más completo para el core en movimiento. La carga compresiva controlada mientras se camina activa el transverso abdominal, cuadrado lumbar y trapecios de forma isométrica sostenida. El IST en posición de pie con carga bilateral es de las formas más funcionales de entrenamiento de estabilidad.",
    phaseInstructions: {
      isometric: "Mancuernas a los lados. Postura perfecta. Core activado. Hombros deprimidos. Camina controlado."
    },
    phases: { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
    genderPhases: {
      female: { eccentric: 0, isometric: 11, concentric: 0, rest: 75 },
      male:   { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 1,
    caloriesPerMinute: 9,
    rehab: {
      injury: "Lumbar",
      protocol: "Peso mínimo. Postura perfecta. Distancia corta.",
      phases: { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
      series: 3,
      reps: 1,
      notes: "Carga compresiva controlada. Fortalecer core en movimiento.",
    },
  },
  {
    id: "band_pull_apart",
    name: "Separación de Banda",
    type: "Corrección",
    targetMuscles: ["deltoides posterior", "romboides", "manguito"],
    gender: "both",
    difficulty: "principiante",
    equipment: "banda elástica",
    isActiveRecovery: true,
    description: "La separación de banda es el ejercicio de calentamiento y corrección postural más efectivo para el hombro. Activa deltoides posterior, romboides y trapecio medio en cada repetición. La pausa isométrica con la banda completamente estirada activa los retractores de escápula de forma máxima. Parte del calentamiento diario obligatorio.",
    phaseInstructions: {
      concentric: "Separa las manos hacia los lados. Codos extendidos. Exhala.",
      isometric: "Banda completamente estirada. Escápulas juntas. Máxima retracción.",
      eccentric: "Junta las manos hacia el frente controlado. Mantén los codos extendidos.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 4,
    repsDefault: 20,
    caloriesPerMinute: 3,
    rehab: {
      injury: "Hombro",
      protocol: "Codo extendido. Tirar hasta tensión. Controlado.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 60 },
      series: 4,
      reps: 20,
      notes: "Parte de calentamiento y protocolo de hombro diario.",
    },
  },
  {
    id: "copenhagen_plank",
    name: "Plancha Copenhagen",
    type: "Core",
    targetMuscles: ["aductores", "core", "oblicuos"],
    gender: "both",
    difficulty: "avanzado",
    equipment: "banco",
    isActiveRecovery: false,
    description: "La plancha Copenhagen es el protocolo estándar de rehabilitación de pubalgia deportiva. La carga isométrica de aductores durante 12 semanas progresivas reduce significativamente el riesgo de pubalgia. Activación bilateral de aductores y core lateral simultáneamente. Progresión: rodilla apoyada → tobillo apoyado.",
    phaseInstructions: {
      isometric: "Pie o rodilla en el banco. Cadera alineada. Aductores contraídos. Core lateral activado. Respira."
    },
    phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 90 },
    genderPhases: {
      female: { eccentric: 0, isometric: 21, concentric: 0, rest: 75 },
      male:   { eccentric: 0, isometric: 20, concentric: 0, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 1,
    unilateral: true,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Ingle/Aductores",
      protocol: "Rodilla apoyada primero. Progresión muy lenta.",
      phases: { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
      series: 3,
      reps: 1,
      notes: "Protocolo de rehab de pubalgia deportiva. 12 semanas.",
    },
  },
  {
    id: "heel_drop",
    name: "Bajada de Talón (Excéntrico)",
    type: "Aislamiento",
    targetMuscles: ["gemelos", "sóleo", "tendón Aquiles"],
    gender: "both",
    difficulty: "principiante",
    equipment: "escalón",
    isActiveRecovery: false,
    description: "La bajada de talón excéntrica es el gold standard para tendinopatía de Aquiles. El protocolo de Alfredson (3x15 dos veces al día, 12 semanas) produce regeneración del tendón y elimina el dolor en el 90% de los casos. La carga excéntrica lenta de 5-6 segundos activa fibras musculares de alto umbral específicas del tendón.",
    phaseInstructions: {
      eccentric: "Baja el talón por debajo del nivel del escalón MUY lento. 5-6 segundos. Siente el tendón.",
      isometric: "Pausa en el punto más bajo del movimiento. Tendón en máximo estiramiento.",
      concentric: "Usa el otro pie para subir. NO subas con el pie que trabajas en esta fase."
    },
    phases: { eccentric: 5, isometric: 1, concentric: 0, rest: 60 },
    genderPhases: {
      female: { eccentric: 5, isometric: 2, concentric: 0, rest: 45 },
      male:   { eccentric: 5, isometric: 1, concentric: 0, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    unilateral: true,
    caloriesPerMinute: 4,
    rehab: {
      injury: "Aquiles/Tobillo",
      protocol: "Protocolo Alfredson. Solo excéntrico. Con peso si tolera.",
      phases: { eccentric: 6, isometric: 1, concentric: 0, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Gold standard en tendinopatía de Aquiles. 12 semanas.",
    },
  },
  {
    id: "seated_row_band",
    name: "Remo con Banda Sentado",
    type: "Compuesto",
    targetMuscles: ["espalda", "bíceps", "romboides"],
    gender: "both",
    difficulty: "principiante",
    equipment: "banda elástica",
    isActiveRecovery: true,
    description: "El remo con banda es la primera opción en postoperatorio temprano de hombro. No genera carga axial lumbar y permite control exacto del rango. La pausa isométrica con escápulas retraídas al máximo activa romboides de forma segura. Accesible en casa, en cualquier lugar, sin necesidad de equipo de gym.",
    phaseInstructions: {
      concentric: "Jala los codos hacia atrás. Codos pegados al cuerpo.",
      isometric: "Manos al abdomen. Escápulas completamente retraídas y deprimidas.",
      eccentric: "Extiende los brazos hacia adelante lentamente. Torso erecto.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    genderPhases: {
      female: { eccentric: 2, isometric: 3, concentric: 2, rest: 45 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 60 },
    },
    seriesDefault: 3,
    repsDefault: 15,
    caloriesPerMinute: 5,
    rehab: {
      injury: "Hombro/Cervical",
      protocol: "Sin carga axial. Control escápular. Ideal en casa.",
      phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 },
      series: 3,
      reps: 15,
      notes: "Primera opción en postoperatorio temprano de hombro.",
    },
  },
  {
    id: "suitcase_carry",
    name: "Carry Maletín Unilateral",
    type: "Funcional",
    targetMuscles: ["core lateral", "oblicuos", "cuadrado lumbar"],
    gender: "both",
    difficulty: "intermedio",
    equipment: "mancuerna o kettlebell",
    isActiveRecovery: false,
    description: "El carry maletín unilateral activa el cuadrado lumbar y los oblicuos en la función más natural posible: llevar peso de un lado. La carga unilateral genera un torque lateral que el core debe resistir isométricamente. Ideal para rehabilitación lumbar lateral ya que activa el cuadrado lumbar sin carga compresiva excesiva.",
    phaseInstructions: {
      isometric: "Peso a un lado. Postura completamente vertical. Core lateral activado resistiendo la inclinación. Camina."
    },
    phases: { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
    genderPhases: {
      female: { eccentric: 0, isometric: 11, concentric: 0, rest: 75 },
      male:   { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
    },
    seriesDefault: 3,
    repsDefault: 1,
    unilateral: true,
    caloriesPerMinute: 7,
    rehab: {
      injury: "Lumbar lateral/Cuadrado lumbar",
      protocol: "Peso muy ligero. Marcha lenta. Postura neutral.",
      phases: { eccentric: 0, isometric: 10, concentric: 0, rest: 90 },
      series: 3,
      reps: 1,
      notes: "Activa quadratus lumborum sin carga compresiva excesiva.",
    },
  },

  {
    id: "cat_cow",
    name: "Cat-Cow (Movilidad Lumbar)",
    type: "Movilidad",
    targetMuscles: ["columna", "core", "flexores cadera"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 25 },
      male:   { eccentric: 2, isometric: 2, concentric: 2, rest: 30 },
    },
    description: "Movilización de la columna vertebral en flexión y extensión. Kellmann et al. (2018): ejercicios de movilidad articular de baja intensidad aumentan el flujo sanguíneo local hasta un 30% sin generar fatiga neuromuscular, acelerando la recuperación. McGill: cat-cow es el primer ejercicio de cualquier protocolo matutino de columna.",
    phaseInstructions: {
      eccentric: "En cuatro patas. Arquea la espalda hacia abajo (posición Cow). Cabeza arriba. Inhala profundo.",
      isometric: "Mantén la posición en el punto extremo del movimiento. Sin forzar. Respira.",
      concentric: "Redondea la espalda hacia arriba (posición Cat). Cabeza hacia abajo. Exhala.",
    },
    phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 30 },
    seriesDefault: 2,
    repsDefault: 10,
    caloriesPerMinute: 2,
    rehab: {
      injury: "Lumbar/Cervical",
      protocol: "Movimiento fluido. Sin dolor. Primera mañana.",
      phases: { eccentric: 2, isometric: 2, concentric: 2, rest: 30 },
      series: 2, reps: 10,
      notes: "Primera opción de movilización en lumbalgia aguda.",
    },
  },
  {
    id: "bird_dog",
    name: "Bird Dog",
    type: "Core",
    targetMuscles: ["core", "glúteos", "estabilizadores espinales"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 0, isometric: 6, concentric: 0, rest: 40 },
      male:   { eccentric: 0, isometric: 5, concentric: 0, rest: 45 },
    },
    description: "Variante dinámica del Dead Bug en cuadrúpeda. McGill: es la base del protocolo de estabilización lumbar para dolor crónico. Kellmann et al. (2018): Bird Dog es el ejercicio de recuperación activa más efectivo para mantener el patrón motor espinal sin fatigarlo.",
    phaseInstructions: {
      isometric: "En cuatro patas. Extiende brazo opuesto y pierna opuesta simultáneamente. Columna Neutra. Mantén 5s.",
    },
    phases: { eccentric: 0, isometric: 5, concentric: 0, rest: 45 },
    seriesDefault: 3,
    repsDefault: 8,
    caloriesPerMinute: 3,
    rehab: {
      injury: "Lumbar",
      protocol: "Movimiento muy controlado. Sin extensión lumbar.",
      phases: { eccentric: 0, isometric: 5, concentric: 0, rest: 60 },
      series: 3, reps: 8,
      notes: "Ideal para activación neuromuscular lumbar sin carga.",
    },
  },
  {
    id: "hip_flexor_stretch_iso",
    name: "Estiramiento Isométrico Psoas",
    type: "Movilidad",
    targetMuscles: ["psoas", "recto femoral", "flexores cadera"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    unilateral: true,
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 0, isometric: 25, concentric: 0, rest: 25 },
      male:   { eccentric: 0, isometric: 20, concentric: 0, rest: 30 },
    },
    description: "Activación isométrica del psoas en posición alargada combinada con contracción del glúteo opuesto. Técnica FNP isométrica. Kellmann et al. (2018): el estiramiento isométrico de flexores de cadera es el método más efectivo para reducir la rigidez post-entrenamiento sin comprometer la fuerza del día siguiente.",
    phaseInstructions: {
      isometric: "Zancada larga. Rodilla trasera en el suelo. Contrae el glúteo trasero. Mantén 20s. Respira profundo.",
    },
    phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 30 },
    seriesDefault: 2,
    repsDefault: 3,
    caloriesPerMinute: 2,
    rehab: {
      injury: "Cadera/Psoas",
      protocol: "Sin dolor. Contracción glútea activa. Progresión lenta.",
      phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 30 },
      series: 2, reps: 3,
      notes: "Restaurar rango de extensión de cadera post-lumbalgia.",
    },
  },
  {
    id: "thoracic_rotation",
    name: "Rotación Torácica",
    type: "Movilidad",
    targetMuscles: ["columna torácica", "oblicuos", "rotadores"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 2, isometric: 2, concentric: 2, rest: 25 },
      male:   { eccentric: 2, isometric: 1, concentric: 2, rest: 30 },
    },
    description: "Movilización de la columna torácica en rotación. La rigidez torácica es la causa más frecuente de dolor cervical y lumbar (McGill). Kellmann et al. (2018): la movilidad torácica activa aumenta el rango de movimiento articular sin fatiga muscular, siendo clave para deportes de lanzamiento, natación y remo.",
    phaseInstructions: {
      eccentric: "Tumbado de lado, rodillas dobladas. Rota lentamente la parte superior llevando el brazo hacia atrás. Controla el movimiento.",
      isometric: "Mantén la rotación máxima. Abre el pecho sin forzar. Respira profundo.",
      concentric: "Regresa a la posición inicial de forma controlada. Sin perder la alineación de caderas.",
    },
    phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 30 },
    seriesDefault: 2,
    repsDefault: 10,
    caloriesPerMinute: 2,
    rehab: {
      injury: "Lumbar/Cervical",
      protocol: "Rotación lenta y controlada. Sin dolor.",
      phases: { eccentric: 2, isometric: 1, concentric: 2, rest: 30 },
      series: 2, reps: 10,
      notes: "Moviliza la torácica antes de entrenar espalda o hombro.",
    },
  },
  {
    id: "ankle_circles_iso",
    name: "Movilidad de Tobillo",
    type: "Movilidad",
    targetMuscles: ["tobillo", "gemelos", "tibial anterior"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    unilateral: true,
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 1, isometric: 2, concentric: 1, rest: 20 },
      male:   { eccentric: 1, isometric: 2, concentric: 1, rest: 20 },
    },
    description: "Movilización activa del tobillo con componente isométrico en el punto final del rango. Kellmann et al. (2018): la movilidad de tobillo activa mejora el reclutamiento neuromuscular de gemelos y tibial anterior para el día siguiente, reduciendo el riesgo de esguince recurrente hasta un 40% cuando se realiza sistemáticamente en días de recuperación.",
    phaseInstructions: {
      eccentric: "Sentado. Lleva el pie hacia la dorsiflexión máxima lentamente (hacia arriba). Siente el estiramiento del gemelo.",
      isometric: "Mantén en el punto de máxima dorsiflexión. Tobillo en tensión. Respira.",
      concentric: "Completa el círculo pasando por la plantiflexión. Movimiento fluido y controlado.",
    },
    phases: { eccentric: 1, isometric: 2, concentric: 1, rest: 20 },
    seriesDefault: 2,
    repsDefault: 10,
    caloriesPerMinute: 1,
    rehab: {
      injury: "Tobillo/Aquiles",
      protocol: "Sin dolor. Rango completo. Cada dirección.",
      phases: { eccentric: 1, isometric: 2, concentric: 1, rest: 20 },
      series: 2, reps: 10,
      notes: "Primero en protocolo de rehabilitación de esguince.",
    },
  },
  {
    id: "prone_shoulder_retraction",
    name: "Retracción Escapular en Prono",
    type: "Corrección",
    targetMuscles: ["romboides", "trapecio medio", "deltoides posterior"],
    gender: "both",
    difficulty: "principiante",
    equipment: "suelo",
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 0, isometric: 6, concentric: 0, rest: 25 },
      male:   { eccentric: 0, isometric: 5, concentric: 0, rest: 30 },
    },
    description: "Activación de los retractores de escápula en posición prona. Sin carga ni equipo. Kellmann et al. (2018): la retracción escapular isométrica en prono es el ejercicio de recuperación activa de mayor transferencia para nadadores y voleibolistas, restaurando el patrón de activación del manguito rotador después de sesiones de empuje intensas.",
    phaseInstructions: {
      isometric: "Boca abajo, brazos en Y/T/W. Levanta los brazos apretando las escápulas. Mantén 3-5s. Respira.",
    },
    phases: { eccentric: 0, isometric: 5, concentric: 0, rest: 30 },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 2,
    rehab: {
      injury: "Hombro/Cervical",
      protocol: "Sin dolor. Escápulas retraídas y deprimidas.",
      phases: { eccentric: 0, isometric: 5, concentric: 0, rest: 30 },
      series: 3, reps: 10,
      notes: "Restaura el patrón de activación del manguito rotador.",
    },
  },
  {
    id: "wall_angel",
    name: "Wall Angel",
    type: "Corrección",
    targetMuscles: ["trapecio medio", "romboides", "deltoides", "serrato"],
    gender: "both",
    difficulty: "principiante",
    equipment: "pared",
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 0, isometric: 3, concentric: 0, rest: 25 },
      male:   { eccentric: 0, isometric: 2, concentric: 0, rest: 30 },
    },
    description: "Movilidad y activación del complejo escapular con la espalda apoyada en la pared. Activa serratos y trapecios mientras restaura la movilidad glenohumeral. Kellmann et al. (2018): wall angel es el ejercicio de recuperación activa más accesible para deportistas con rigidez torácica post-entrenamiento, realizable en cualquier lugar.",
    phaseInstructions: {
      isometric: "Espalda y cabeza en la pared. Codos a 90°. Sube los brazos por la pared sin separar la espalda. Mantén 2s arriba.",
    },
    phases: { eccentric: 0, isometric: 2, concentric: 0, rest: 30 },
    seriesDefault: 3,
    repsDefault: 10,
    caloriesPerMinute: 2,
    rehab: {
      injury: "Hombro/Postural",
      protocol: "Espalda en contacto total con la pared. Sin dolor.",
      phases: { eccentric: 0, isometric: 2, concentric: 0, rest: 30 },
      series: 3, reps: 10,
      notes: "Restaura movilidad glenohumeral. Ideal post-empuje.",
    },
  },
  {
    id: "foam_roll_iso",
    name: "Rodillo Isométrico de Presión",
    type: "Recuperación",
    targetMuscles: ["fascia", "músculos superficiales"],
    gender: "both",
    difficulty: "principiante",
    equipment: "foam roller",
    isActiveRecovery: true,
    genderPhases: {
      female: { eccentric: 0, isometric: 25, concentric: 0, rest: 20 },
      male:   { eccentric: 0, isometric: 20, concentric: 0, rest: 20 },
    },
    description: "Liberación miofascial con componente isométrico de presión sostenida. Kellmann et al. (2018): presión sostenida 20-30s en un punto trigger es más efectiva que el rodado continuo. Schoenfeld (2024): liberación miofascial sistemática reduce el DOMS hasta un 35% cuando se realiza inmediatamente después del entrenamiento.",
    phaseInstructions: {
      isometric: "Posiciona el rodillo bajo el músculo tenso. Mantén la presión sin moverte 20-30s. Respira profundo. Sin bloquear la respiración.",
    },
    phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 20 },
    seriesDefault: 2,
    repsDefault: 4,
    caloriesPerMinute: 1,
    rehab: {
      injury: "General",
      protocol: "Sin dolor agudo. Solo sensación de presión tolerable.",
      phases: { eccentric: 0, isometric: 20, concentric: 0, rest: 20 },
      series: 2, reps: 4,
      notes: "Nunca sobre articulaciones o huesos. Solo en tejido muscular.",
    },
  },
  
  { id: "tube_band_chest_press", name: "Press de Pecho con Banda Tubular", type: "Compuesto", targetMuscles: ["pecho", "hombros", "tríceps"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Ancla la banda a la altura del pecho (puerta, poste o pisándola con ambos pies). La banda tubular genera resistencia ascendente continua: a diferencia del peso libre, la tensión se incrementa en la fase concéntrica final (máxima extensión del codo), lo que coincide con la zona de menor ventaja mecánica del pectoral. Esto fuerza un reclutamiento adicional de unidades motoras en el rango de extensión completa. La pausa isométrica a codos a 90° —punto de máxima tensión isométrica del pectoral mayor clavicular— cumple el principio de Hettinger: 1 contracción sostenida al 65% genera adaptaciones de fuerza del 5% semanal. La excéntrica lenta de 3-4s amplifica el daño mecánico controlado y favorece la síntesis proteica (Schoenfeld, 2012).", phaseInstructions: { eccentric: "Deja que la banda lleve los codos hacia atrás con control total. 4 segundos. Pecho abierto, escápulas retraídas.", isometric: "Codos a 90°. Pausa completa. Máxima tensión isométrica en pectoral. No rebotes.", concentric: "Empuja hacia adelante hasta extensión casi completa. Exhala. Mantén escápulas deprimidas." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 6, rehab: { injury: "Hombro", protocol: "Banda de tensión mínima. Rango parcial sin dolor.", phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Ideal en postoperatorio de hombro: la resistencia variable permite progresar sin sobrecargar la articulación glenohumeral.", }, }, { id: "tube_band_row_one_arm", name: "Remo Unilateral con Banda Tubular", type: "Compuesto", targetMuscles: ["espalda media", "bíceps", "romboides", "core"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, unilateral: true, description: "Ancla la banda frente a ti a la altura del pecho. El trabajo unilateral elimina las compensaciones de dominancia lateral documentadas por Youdas et al. (2010): el lado dominante suele generar 8-12% más fuerza, enmascarando déficits en el lado no dominante. La excéntrica lenta de 3-4s en el remo unilateral produce una tensión isométrica estabilizadora en el core contralateral (cuadrado lumbar, oblicuo externo), entrenando la antirotación lumbar sin carga axial. La pausa isométrica con escápula completamente retraída activa el romboides mayor y trapecio medio según el protocolo de activación de Cook (2010).", phaseInstructions: { concentric: "Jala el codo hacia atrás y arriba. Retrae la escápula antes que el codo. Exhala.", isometric: "Mango al costado del pecho. Escápula completamente retraída. Pausa completa.", eccentric: "Extiende el codo lento hacia adelante. 4 segundos. Mantén torso rígido sin rotar." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 10, caloriesPerMinute: 6, rehab: { injury: "Lumbar", protocol: "Torso apoyado en banco inclinado. Elimina carga lumbar.", phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "El trabajo unilateral con soporte permite rehabilitar el romboides sin comprometer la columna.", }, }, { id: "tube_band_shoulder_press", name: "Press de Hombros con Banda Tubular", type: "Compuesto", targetMuscles: ["hombros", "tríceps", "core"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda con ambos pies al ancho de los hombros. La curva ascendente de resistencia de la banda tubular genera máxima tensión en la extensión final del codo, justo donde el peso libre tiene mínima resistencia. Esto activa el trapecio superior y el deltoides medial en el rango de máxima elevación, que el press con barra no alcanza. El método de Hoffman (multiangle IST a 45°, 90° y 135°) es la base científica: cada ángulo articular desarrolla fuerza específica ±20° (González y Gorostiaga). La pausa isométrica a 90° de codo activa las fibras del deltoides anterior con mayor tiempo bajo tensión que el movimiento dinámico puro.", phaseInstructions: { eccentric: "Baja las manijas hacia los hombros con control. 4 segundos. Codos ligeramente adelantados.", isometric: "Manijas a la altura de los hombros. Pausa completa. Tensión máxima en deltoides.", concentric: "Empuja hacia arriba hasta casi extender los codos. No bloquees. Exhala." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 6, rehab: { injury: "Hombro", protocol: "Banda mínima. Rango parcial hasta 90°. Sin elevación completa.", phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Evitar elevación completa en impingement subacromial. Rango libre de dolor.", }, }, { id: "tube_band_bicep_curl", name: "Curl de Bíceps con Banda Tubular", type: "Aislamiento", targetMuscles: ["bíceps", "braquial", "braquiorradial"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda con ambos pies. La resistencia variable de la banda genera la máxima tensión en el punto de máxima tensión del bíceps (90° de flexión de codo), que coincide con la pausa isométrica de este protocolo. Esto corrige una limitación del curl con peso libre, donde la resistencia es máxima a 90° pero el músculo es más fuerte a 60-70°. Zou et al. (2023) demostraron que el entrenamiento isométrico de 9 semanas de los flexores del codo incrementa tanto el CSA (área de sección transversal) como la fuerza máxima, especialmente con la combinación de alta intensidad (70-100% MVIC) y pausa de 2-3 segundos.", phaseInstructions: { concentric: "Sube las manijas hacia los hombros con control. Exhala. Codos fijos al cuerpo.", isometric: "Codos a 90°. Máxima contracción de bíceps. Muñecas neutras. Pausa completa.", eccentric: "Baja con control total hacia extensión completa. 4 segundos. Sin balanceo de torso." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 5, rehab: { injury: "Codo/Bíceps", protocol: "Banda mínima. Excéntrico super lento 5s. Sin supinación forzada.", phases: { eccentric: 5, isometric: 2, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Carga isométrica subumbral efectiva para tendinopatía distal del bíceps según Rio et al. (2017).", }, }, { id: "tube_band_tricep_extension", name: "Extensión de Tríceps con Banda Tubular", type: "Aislamiento", targetMuscles: ["tríceps"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Ancla la banda sobre la cabeza (puerta, barra alta) o pisa la banda y trabaja con extensión sobre la cabeza. La extensión de tríceps con banda sobre la cabeza estira la cabeza larga del tríceps braquial en su posición de máxima elongación (hombro en flexión completa), lo que según Maeo et al. (2021) produce hipertrofia hasta 40% superior en la cabeza larga comparado con ejercicios con el hombro en posición neutral. La pausa isométrica en extensión completa —punto de máxima tensión de la banda— anula el reflejo de estiramiento y maximiza la activación neural isométrica pura del tríceps.", phaseInstructions: { eccentric: "Flexiona los codos lentamente hacia atrás y arriba. 4 segundos. Codos apuntando al techo.", isometric: "Codos flexionados al máximo. Tríceps en máximo estiramiento. Pausa completa.", concentric: "Extiende los codos hacia arriba. Bloquea suavemente. Exhala al extender." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 5, rehab: { injury: "Codo/Tríceps", protocol: "Banda mínima. Sin bloqueo completo del codo. Rango parcial sin dolor.", phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Isométrico en rango medio para tendinopatía tricipital: analgesia inmediata (Rio et al., 2017).", }, }, { id: "tube_band_lateral_raise", name: "Elevación Lateral con Banda Tubular", type: "Aislamiento", targetMuscles: ["deltoides medial", "trapecio superior"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda con un pie o ambos pies. La curva de resistencia de la banda tubular replica perfectamente la curva de fuerza del deltoides medial: la resistencia aumenta conforme el brazo sube, coincidiendo con la mayor producción de fuerza del músculo (60-90° de abducción). Esto genera un estímulo de tensión constante superior al de la mancuerna, que tiene máxima resistencia sólo a 90° por la palanca gravitacional. La pausa isométrica a 90° de abducción corresponde al ángulo de máxima activación del deltoides medial según estudios electromiográficos (Reinold et al., 2007).", phaseInstructions: { concentric: "Sube los brazos lateralmente hasta la altura de los hombros. Codos ligeramente flexionados. Exhala.", isometric: "Brazos paralelos al suelo. Deltoides medial en contracción máxima. Pausa completa.", eccentric: "Baja los brazos con control total. 4 segundos. Resistencia continua hasta abajo." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 5, rehab: { injury: "Hombro", protocol: "Banda mínima. Rango 0-60°. Sin elevar sobre la horizontal.", phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 90 }, series: 3, reps: 12, notes: "Excelente para activación del manguito rotador en rehabilitación postoperatoria.", }, }, { id: "tube_band_squat", name: "Sentadilla con Banda Tubular", type: "Compuesto", targetMuscles: ["cuádriceps", "glúteos", "core"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda con ambos pies al ancho de los hombros, manijas a la altura de los hombros. La banda añade resistencia ascendente que es máxima en la extensión de rodilla —zona de mayor ventaja mecánica del cuádriceps—, lo opuesto al patrón del peso libre. Esto produce activación del cuádriceps en todo el rango articular con pico de tensión en extensión completa, efecto conocido como 'variable resistance training' (VRT). Heffernan et al. (2019) demostraron que el VRT con banda produce mayor activación EMG del vasto lateral y recto femoral en los últimos 30° de extensión comparado con la sentadilla con barra sola.", phaseInstructions: { eccentric: "Desciende lento con control. Rodillas sobre los pies. Pecho arriba. 4 segundos.", isometric: "Muslos paralelos al suelo o más abajo. Tensión máxima en cuádriceps y glúteos.", concentric: "Empuja el suelo, extiende caderas y rodillas juntas. Exhala. Tensión de banda al máximo arriba." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 7, rehab: { injury: "Rodilla", protocol: "Rango parcial sin dolor. Isométrico prolongado en posición media.", phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Sentadilla parcial isométrica con banda: protocolo de carga para tendinopatía rotuliana (Rio et al., 2017).", }, }, { id: "tube_band_romanian_deadlift", name: "Peso Muerto Rumano con Banda Tubular", type: "Compuesto", targetMuscles: ["isquiotibiales", "glúteos", "espalda baja"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda en el centro con ambos pies. La banda genera máxima resistencia en la extensión de cadera completa —posición erecta—, donde el glúteo mayor tiene la mayor capacidad de producir fuerza. Esto supera la limitación del peso libre, cuya resistencia es máxima durante el hinge (posición inclinada). La excéntrica lenta de 4 segundos estira los isquiotibiales con carga progresiva, replicando el estímulo del protocolo Oslo para la prevención de roturas musculares (Petersen et al., 2011). La pausa isométrica en el punto de máxima tensión de los isquiotibiales activa unidades motoras de alto umbral sin el riesgo de rotura propio de la sobrecarga excéntrica pura.", phaseInstructions: { eccentric: "Caderas hacia atrás. Espalda neutra. Siente el estiramiento progresivo de los isquiotibiales. 4 segundos.", isometric: "Pausa en el punto de máxima tensión. Sin dolor, solo tensión. Espalda plana.", concentric: "Activa glúteos primero, luego extiende caderas. La banda tira hacia abajo: resiste. Exhala." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 10, caloriesPerMinute: 7, rehab: { injury: "Isquiotibiales", protocol: "Rango limitado por tensión sin dolor. Excéntrico progresivo.", phases: { eccentric: 5, isometric: 2, concentric: 2, rest: 120 }, series: 3, reps: 8, notes: "Protocolo Oslo adaptado a banda: carga excéntrica progresiva sin riesgo de sobrecarga aguda.", }, }, { id: "tube_band_hip_thrust", name: "Empuje de Cadera con Banda Tubular", type: "Compuesto", targetMuscles: ["glúteos", "isquiotibiales", "core"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda con ambos pies y pasa las manijas sobre los muslos o caderas. La banda genera resistencia en el plano horizontal en la extensión de cadera completa, que es el ángulo donde el glúteo mayor produce su máxima fuerza. Hip thrust estudios de Contreras et al. (2011) muestran activación del glúteo mayor hasta 172% del MVIC —el más alto de todos los ejercicios de glúteo estudiados—. Con banda, esta activación se mantiene elevada durante toda la fase isométrica superior por la tensión continua, superando el hip thrust con barra sola donde la resistencia gravitacional cae a cero en extensión completa.", phaseInstructions: { eccentric: "Desciende las caderas controlado. La banda mantiene tensión en todo el rango. 3 segundos.", isometric: "Caderas completamente extendidas. Aprieta glúteos al máximo. Espalda neutra. Pausa completa.", concentric: "Sube empujando con talones. Activa glúteo antes de extender. La banda resiste arriba. Exhala." }, phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 3, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 3, isometric: 2, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 12, caloriesPerMinute: 6, rehab: { injury: "Cadera", protocol: "Banda mínima. Sin extensión lumbar compensatoria.", phases: { eccentric: 3, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Activación glútea sin carga axial: ideal en rehabilitación postquirúrgica de cadera.", }, }, { id: "tube_band_face_pull", name: "Face Pull con Banda Tubular", type: "Compuesto", targetMuscles: ["deltoides posterior", "manguito rotador", "trapecio medio"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Ancla la banda a la altura de los ojos. El face pull con banda tubular es el ejercicio de mayor activación del deltoides posterior y del manguito rotador externo (infraespinoso y redondo menor). La pausa isométrica con codos elevados y escápulas completamente retraídas activa el trapecio medio y los romboides en su posición de máxima tensión, corrigiendo la cifosis torácica y el síndrome cruzado superior. Cook (2010) lo incluye como ejercicio mandatorio en todos los protocolos de corrección postural y rehabilitación de hombro. La resistencia variable de la banda genera tensión máxima en retracción completa, donde la activación EMG del deltoides posterior es máxima.", phaseInstructions: { concentric: "Jala hacia la cara con codos elevados por encima de los hombros. Exhala. Manos hacia las orejas.", isometric: "Manos a nivel de las orejas. Codos altos. Escápulas completamente retraídas. Pausa completa.", eccentric: "Extiende los brazos hacia adelante con control total. 4 segundos. Sin protracción brusca." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 15, caloriesPerMinute: 5, rehab: { injury: "Hombro", protocol: "Banda mínima. Codos elevados. Sin dolor en retracción.", phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 15, notes: "Ejercicio base en rehabilitación de manguito rotador: activa los rotadores externos con carga controlada.", }, }, { id: "tube_band_woodchop_high", name: "Leñador Alto con Banda Tubular", type: "Compuesto", targetMuscles: ["oblicuos", "core", "hombros", "caderas"], gender: "both", difficulty: "intermedio", equipment: "banda con manijas", isActiveRecovery: false, description: "Ancla la banda en un punto alto (arriba de la puerta). El leñador diagonal de alto a bajo con banda entrena la musculatura antirotacional del core en patrones diagonales funcionales —los mismos utilizados en deportes de raqueta, lanzamiento y cambios de dirección. La pausa isométrica en el punto de máxima rotación obliga a los oblicuos y el multífido a generar fuerza isométrica contra la resistencia de la banda. McGill (2010) establece que el entrenamiento antirotacional isométrico es superior al rotacional dinámico para la estabilidad raquídea sin riesgo de cizallamiento discal.", phaseInstructions: { concentric: "Jala la banda en diagonal de arriba hacia abajo y al lado contrario. Exhala. Gira el torso.", isometric: "Punto de máxima rotación diagonal. Core contraído. Pausa completa. Resistencia máxima.", eccentric: "Regresa a la posición inicial con control total. 4 segundos. Resiste el tirón de la banda." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 10, unilateral: true, caloriesPerMinute: 6, rehab: { injury: "Lumbar", protocol: "Banda mínima. Rango de rotación reducido. Sin dolor.", phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 90 }, series: 3, reps: 8, notes: "Solo en fase 3 de rehabilitación lumbar. Evitar en fase aguda.", }, }, { id: "tube_band_pallof_press_band", name: "Pallof Press con Banda Tubular", type: "Core", targetMuscles: ["core", "oblicuos", "transverso abdominal"], gender: "both", difficulty: "principiante", equipment: "banda con manijas", isActiveRecovery: false, description: "Ancla la banda lateralmente a la altura del pecho. El Pallof press con banda tubular es el ejercicio antirotacional isométrico por excelencia. La tensión lateral constante de la banda genera un momento de rotación que el core debe resistir de forma isométrica durante todo el movimiento. Esto activa el transverso abdominal, los oblicuos y el cuadrado lumbar en su función principal: estabilización y antirotación, no flexión. Contreras y Schoenfeld (2011) lo describen como superior a los crunches para la función real del core, ya que replica las demandas del movimiento funcional y deportivo. La pausa isométrica en extensión completa de brazos maximiza el brazo de palanca de la resistencia.", phaseInstructions: { concentric: "Extiende los brazos hacia adelante en línea recta. Exhala. No dejes que la banda te rote.", isometric: "Brazos completamente extendidos. Core en máxima contracción antirotacional. Pausa completa.", eccentric: "Regresa las manos al pecho con control. 4 segundos. Mantén el cuerpo perpendicular a la banda." }, phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 30 }, male: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, }, seriesDefault: 3, repsDefault: 10, unilateral: true, caloriesPerMinute: 5, rehab: { injury: "Lumbar", protocol: "Banda mínima. Posición segura para la columna. Sin rotación del torso.", phases: { eccentric: 4, isometric: 3, concentric: 2, rest: 90 }, series: 3, reps: 10, notes: "Primer ejercicio de carga en rehabilitación lumbar: estabilización antirotacional sin cizallamiento discal.", }, }, { id: "tube_band_good_morning", name: "Buenos Días con Banda Tubular", type: "Compuesto", targetMuscles: ["isquiotibiales", "glúteos", "espalda baja"], gender: "both", difficulty: "intermedio", equipment: "banda con manijas", isActiveRecovery: false, description: "Pisa la banda con ambos pies y pasa las manijas sobre los hombros detrás del cuello. La posición de la banda replica exactamente la carga del buenos días con barra pero con resistencia variable: máxima tensión en extensión completa (posición erecta) donde los extensores lumbares trabajan isométricamente para mantener la columna neutra. La excéntrica lenta de 4 segundos genera la mayor tensión en el punto de máximo estiramiento de los isquiotibiales, acumulando el estrés mecánico que estimula la síntesis de colágeno del tendón. Protocolo de Alfredson adaptado: carga excéntrica progresiva para tendinopatía de isquiotibiales proximal.", phaseInstructions: { eccentric: "Inclina el torso hacia adelante con caderas hacia atrás. Espalda plana. 4 segundos. Isquiotibiales en tensión.", isometric: "Torso paralelo al suelo o según flexibilidad. Máxima tensión en isquiotibiales. Pausa sin dolor.", concentric: "Activa glúteos y extiende caderas. Sube erguido. La banda tira hacia abajo: resiste. Exhala." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 10, caloriesPerMinute: 6, rehab: { injury: "Isquiotibiales", protocol: "Rango según flexibilidad. Sin dolor en inserción proximal.", phases: { eccentric: 5, isometric: 2, concentric: 2, rest: 120 }, series: 3, reps: 8, notes: "Carga excéntrica para tendinopatía isquiotibial proximal: progresión del protocolo Oslo.", }, }, { id: "tube_band_lunge", name: "Zancada con Banda Tubular", type: "Compuesto", targetMuscles: ["cuádriceps", "glúteos", "equilibrio"], gender: "both", difficulty: "intermedio", equipment: "banda con manijas", isActiveRecovery: false, unilateral: true, description: "Pisa la banda con el pie delantero y sostén las manijas a la altura de los hombros. La banda añade resistencia al cuádriceps en la extensión de rodilla y genera un componente de estabilidad lateral en la rodilla delantera, activando el glúteo medio y los estabilizadores de tobillo. La zancada con banda es superior a la zancada con mancuernas para la estabilidad de rodilla en el plano frontal: el vector de resistencia diagonal activa el TFL y el glúteo medio simultáneamente (Youdas et al., 2010). La excéntrica lenta de 4 segundos maximiza la activación del cuádriceps en la fase de descenso, que corresponde al protocolo de carga excéntrica para tendinopatía rotuliana.", phaseInstructions: { eccentric: "Desciende lento. Rodilla delantera no pasa los dedos. Torso erecto. 4 segundos.", isometric: "Rodilla delantera a 90°. Máxima tensión bilateral. Pausa completa. La banda resiste.", concentric: "Empuja el suelo con talón delantero. Sube con control. Exhala. Extiende completamente." }, phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, genderPhases: { female: { eccentric: 4, isometric: 3, concentric: 2, rest: 45 }, male: { eccentric: 4, isometric: 2, concentric: 2, rest: 60 }, }, seriesDefault: 3, repsDefault: 10, caloriesPerMinute: 7, rehab: { injury: "Rodilla", protocol: "Banda mínima. Rango parcial. Apoyo en pared si necesario.", phases: { eccentric: 4, isometric: 2, concentric: 2, rest: 90 }, series: 3, reps: 8, notes: "Carga excéntrica unilateral: excelente para rehabilitación de rodilla y propiocepción.", }, },

];

const rehabProtocols = [
  {
    id: "rehab_knee",
    name: "🦵 Rodilla - Protocolo Completo",
    injury: "Rodilla",
    duration: "8-12 semanas",
    phase: "Aguda → Funcional",
    exercises: [
      "wall_sit",
      "leg_press",
      "goblet_squat",
      "step_up",
      "bulgarian_split_squat",
      "leg_extension",
      "nordic_curl",
    ],
    description:
      "Protocolo progresivo para lesiones de rodilla: LCA, menisco, tendinopatía rotuliana. Basado en los protocolos de Rio et al. (2017) con contracciones isométricas sostenidas para analgesia inmediata y recuperación funcional.",
    scientificBasis: "Rio et al. (2017): contracciones isométricas producen analgesia inmediata mayor que isotónicas. Protocolo 5x45s al 70%RM. Bonilla et al. (2001): recuperación con resistencia progresiva es más rápida que programa tradicional.",
    phases: [
      {
        name: "Fase 1 - Aguda (sem 1-2)",
        exercises: ["wall_sit", "glute_bridge", "leg_raise"],
      },
      {
        name: "Fase 2 - Subaguda (sem 3-6)",
        exercises: ["leg_press", "step_up", "goblet_squat"],
      },
      {
        name: "Fase 3 - Funcional (sem 7-12)",
        exercises: ["bulgarian_split_squat", "nordic_curl", "box_jump"],
      },
    ],
  },
  {
    id: "rehab_shoulder",
    name: "🫱 Hombro - Protocolo Completo",
    injury: "Hombro",
    duration: "10-16 semanas",
    phase: "Aguda → Deportiva",
    exercises: [
      "band_pull_apart",
      "shoulder_external_rotation",
      "face_pull",
      "reverse_fly",
      "seated_cable_row",
      "lat_pulldown",
      "overhead_press",
    ],
    description:
      "Rehabilitación integral de hombro: manguito rotador, impingement, inestabilidad. Progresión desde activación del manguito hasta prensa completa.",
    scientificBasis: "Cook y Rio: protocolos isométricos de manguito rotador. El IST produce menor daño mecánico y permite alta frecuencia de entrenamiento. Fase 1 obligatoria antes de cualquier carga dinámica.",
    phases: [
      {
        name: "Fase 1 - Control dolor (sem 1-3)",
        exercises: [
          "band_pull_apart",
          "shoulder_external_rotation",
          "rear_delt_fly",
        ],
      },
      {
        name: "Fase 2 - Fuerza (sem 4-8)",
        exercises: [
          "face_pull",
          "seated_row_band",
          "reverse_fly",
          "lat_pulldown",
        ],
      },
      {
        name: "Fase 3 - Funcional (sem 9-16)",
        exercises: ["overhead_press", "push_up", "pull_up", "arnold_press"],
      },
    ],
  },
  {
    id: "rehab_lumbar",
    name: "💆 Lumbar - Protocolo Completo",
    injury: "Espalda Baja",
    duration: "6-10 semanas",
    phase: "Aguda → Fuerza",
    exercises: [
      "dead_bug",
      "glute_bridge",
      "plank",
      "side_plank",
      "pallof_press",
      "suitcase_carry",
      "romanian_deadlift",
    ],
    description:
      "Estabilización lumbar y retorno a fuerza: hernias, lumbalgias, ciática. Basado en la investigación de Lisón, Monfort y Sarti sobre entrenamiento isométrico de musculatura lumbar.",
    scientificBasis: "Lisón et al.: entrenamiento lumbar isométrico 1x/semana produce mismas ganancias que 2-3x/semana. McGill: Dead Bug y Plank como ejercicios base de estabilización lumbar. Graves et al.: mantenimiento de fuerza lumbar con 1x/mes.",
    phases: [
      {
        name: "Fase 1 - Estabilización (sem 1-2)",
        exercises: ["dead_bug", "glute_bridge", "side_plank"],
      },
      {
        name: "Fase 2 - Control motor (sem 3-5)",
        exercises: ["plank", "pallof_press", "farmer_walk"],
      },
      {
        name: "Fase 3 - Carga progresiva (sem 6-10)",
        exercises: ["goblet_squat", "romanian_deadlift", "bent_over_row"],
      },
    ],
  },
  {
    id: "rehab_hamstring",
    name: "🏃 Isquiotibiales - Protocolo",
    injury: "Isquiotibiales",
    duration: "8-12 semanas",
    phase: "Aguda → Deportiva",
    exercises: [
      "glute_bridge",
      "leg_curl",
      "romanian_deadlift",
      "nordic_curl",
      "single_leg_rdl",
      "good_morning",
    ],
    description:
      "Rotura y distensión de isquiotibiales. Protocolo Oslo progresivo. El nordic curl es el mejor preventivo de rotura isquiotibial con reducción del 65% de incidencia.",
    scientificBasis: "Protocolo Oslo: excéntrico progresivo 10 semanas. Eccéntrico de 4-6 segundos activa unidades motoras de alto umbral. Gonçalves et al. (2021): fuerza isométrica de isquiotibiales correlaciona con capacidad de sprint repetido.",
    phases: [
      {
        name: "Fase 1 - Reposo activo (sem 1-2)",
        exercises: ["glute_bridge", "dead_bug"],
      },
      {
        name: "Fase 2 - Carga excéntrica (sem 3-6)",
        exercises: ["leg_curl", "romanian_deadlift", "single_leg_rdl"],
      },
      {
        name: "Fase 3 - Fuerza total (sem 7-12)",
        exercises: ["nordic_curl", "good_morning", "box_jump"],
      },
    ],
  },
  {
    id: "rehab_achilles",
    name: "🦶 Tendón Aquiles - Protocolo",
    injury: "Tendón Aquiles",
    duration: "12-16 semanas",
    phase: "Tendinopatía → Funcional",
    exercises: [
      "heel_drop",
      "calf_raise",
      "single_leg_rdl",
      "step_up",
    ],
    description:
      "Tendinopatía y rotura parcial de Aquiles. Protocolo Alfredson de carga excéntrica. Gold standard con 90% de efectividad en tendinopatía crónica.",
    scientificBasis: "Protocolo Alfredson: 3x15 excéntricos dos veces al día. Carga excéntrica lenta genera remodelación del tejido colágeno del tendón. Rio et al. (2017): isométrico reduce dolor inmediato.",
    phases: [
      {
        name: "Fase 1 - Control dolor (sem 1-4)",
        exercises: ["heel_drop", "calf_raise"],
      },
      {
        name: "Fase 2 - Carga progresiva (sem 5-10)",
        exercises: ["calf_raise", "single_leg_rdl"],
      },
      {
        name: "Fase 3 - Funcional (sem 11-16)",
        exercises: ["step_up", "box_jump"],
      },
    ],
  },
  {
    id: "rehab_hip",
    name: "🍑 Cadera - Protocolo",
    injury: "Cadera",
    duration: "8-12 semanas",
    phase: "Aguda → Funcional",
    exercises: [
      "glute_bridge",
      "hip_abduction",
      "copenhagen_plank",
      "cable_kickback",
      "hip_thrust",
      "goblet_squat",
    ],
    description:
      "Rehabilitación de cadera: pubalgia, cadera chasqueante, bursitis. Protocolo basado en activación progresiva del glúteo medio y mayor con cargas isométricas.",
    scientificBasis: "Gonçalves et al. (2021): fuerza isométrica de abductores correlaciona con rendimiento en sprint. Protocolo Copenhagen para pubalgia: 12 semanas de isométrico progresivo.",
    phases: [
      {
        name: "Fase 1 - Activación (sem 1-3)",
        exercises: ["glute_bridge", "hip_abduction"],
      },
      {
        name: "Fase 2 - Fuerza isométrica (sem 4-8)",
        exercises: ["copenhagen_plank", "cable_kickback"],
      },
      {
        name: "Fase 3 - Funcional (sem 9-12)",
        exercises: ["hip_thrust", "goblet_squat"],
      },
    ],
  },
  {
    id: "rehab_patella",
    name: "🦵 Tendinopatía Rotuliana",
    injury: "Rodilla",
    duration: "8-12 semanas",
    phase: "Dolor → Sin dolor",
    exercises: [
      "wall_sit",
      "leg_extension",
      "goblet_squat",
      "step_up",
      "leg_press",
    ],
    description:
      "Protocolo específico para tendinopatía rotuliana. Contracciones isométricas sostenidas de 45 segundos producen analgesia inmediata mayor que el entrenamiento dinámico (Rio et al., 2017).",
    scientificBasis: "Rio et al. (2017): isométrico 5x45s al 70%RM reduce dolor inmediatamente. La respuesta analgésica en semana 1 predice la mejora funcional a 4 semanas.",
    phases: [
      {
        name: "Fase 1 - Analgesia (sem 1-2)",
        exercises: ["wall_sit", "leg_extension"],
      },
      {
        name: "Fase 2 - Carga progresiva (sem 3-6)",
        exercises: ["goblet_squat", "leg_press"],
      },
      {
        name: "Fase 3 - Funcional (sem 7-12)",
        exercises: ["step_up", "bulgarian_split_squat"],
      },
    ],
  },
];

const maleRoutines = [
  {
    id: "male_strength_4days",
    name: "💪 Fuerza Máxima 4 días",
    gender: "male",
    daysPerWeek: 4,
    difficulty: "avanzado",
    category: "fuerza",
    description: "Rutina de fuerza máxima con tiempos isométricos científicos. Basada en el método de Hettinger y Muller (5% de ganancia semanal).",
    exercises: [
      "squat",
      "deadlift",
      "bench_press",
      "overhead_press",
      "pull_up",
      "bent_over_row",
    ],
    seriesPerEx: 4,
    repsPerEx: 6,
  },
  {
    id: "male_hypertrophy_5days",
    name: "🔥 Hipertrofia 5 días",
    gender: "male",
    daysPerWeek: 5,
    difficulty: "avanzado",
    category: "hipertrofia",
    description: "Volumen alto con pausa isométrica para máxima activación muscular. Zou et al. (2023) confirman el incremento de masa muscular con IST.",
    exercises: [
      "squat",
      "bench_press",
      "pull_up",
      "overhead_press",
      "romanian_deadlift",
      "bicep_curl",
      "triceps_pushdown",
      "leg_press",
    ],
    seriesPerEx: 4,
    repsPerEx: 10,
  },
  {
    id: "male_fullbody_3days",
    name: "⚡ Full Body 3 días",
    gender: "male",
    daysPerWeek: 3,
    difficulty: "intermedio",
    category: "fuerza",
    description: "Entrenamiento de cuerpo completo con los movimientos fundamentales y pausa isométrica en cada repetición.",
    exercises: [
      "squat",
      "deadlift",
      "bench_press",
      "bent_over_row",
      "overhead_press",
      "plank",
    ],
    seriesPerEx: 3,
    repsPerEx: 8,
  },
  {
    id: "male_upper_lower_4days",
    name: "🏋️ Upper/Lower 4 días",
    gender: "male",
    daysPerWeek: 4,
    difficulty: "intermedio",
    category: "hipertrofia",
    description: "División superior/inferior con énfasis en tiempos de fase isométrica para maximizar la tensión muscular.",
    exercises: [
      "squat",
      "leg_press",
      "romanian_deadlift",
      "bench_press",
      "pull_up",
      "overhead_press",
      "bicep_curl",
      "triceps_pushdown",
    ],
    seriesPerEx: 4,
    repsPerEx: 8,
  },
  {
    id: "male_home_3days",
    name: "🏠 Casa sin Equipo 3 días",
    gender: "male",
    daysPerWeek: 3,
    difficulty: "principiante",
    category: "calistenia",
    description: "Entrenamiento completo en casa. Solo necesitas suelo y una superficie elevada. Basado en el método de tensión dinámica con isométrico.",
    exercises: [
      "push_up",
      "lunges",
      "plank",
      "dead_bug",
      "glute_bridge",
      "side_plank",
    ],
    seriesPerEx: 3,
    repsPerEx: 10,
  },
];

const femaleRoutines = [
  {
    id: "female_glute_4days",
    name: "🍑 Glúteos + Piernas 4 días",
    gender: "female",
    daysPerWeek: 4,
    difficulty: "intermedio",
    category: "glúteos",
    description: "Rutina especializada en glúteos con tiempos isométricos científicos. La pausa en extensión máxima maximiza la activación del glúteo mayor.",
    exercises: [
      "hip_thrust",
      "goblet_squat",
      "push_up",
      "seated_cable_row",
      "lunges",
      "plank",
      "face_pull",
    ],
    seriesPerEx: 3,
    repsPerEx: 12,
  },
  {
    id: "female_glute_5days",
    name: "⭐ Glute Focus 5 días",
    gender: "female",
    daysPerWeek: 5,
    difficulty: "avanzado",
    category: "glúteos",
    description: "Rutina intensiva especializada en glúteos con isométrico prolongado en cada fase. Gonçalves et al. confirman mejoras en sprint y salto.",
    exercises: [
      "hip_thrust",
      "bulgarian_split_squat",
      "romanian_deadlift",
      "cable_kickback",
      "abductor_machine",
      "hip_abduction",
      "single_leg_rdl",
      "glute_bridge",
    ],
    seriesPerEx: 4,
    repsPerEx: 12,
  },
  {
    id: "female_tone_3days",
    name: "✨ Tonificación 3 días",
    gender: "female",
    daysPerWeek: 3,
    difficulty: "principiante",
    category: "tonificación",
    description: "Definición muscular con cargas moderadas. Pausa isométrica en cada ejercicio para maximizar el tiempo bajo tensión.",
    exercises: [
      "goblet_squat",
      "push_up",
      "seated_cable_row",
      "glute_bridge",
      "leg_raise",
      "plank",
      "side_plank",
    ],
    seriesPerEx: 3,
    repsPerEx: 15,
  },
  {
    id: "female_strength_4days",
    name: "🔱 Fuerza Femenina 4 días",
    gender: "female",
    daysPerWeek: 4,
    difficulty: "avanzado",
    category: "fuerza",
    description: "Levantamientos principales con tiempos isométricos de fuerza máxima. Kyung Lee et al. (2017) confirman aumento de masa magra con IST.",
    exercises: [
      "squat",
      "deadlift",
      "bench_press",
      "pull_up",
      "hip_thrust",
      "overhead_press",
      "plank",
    ],
    seriesPerEx: 4,
    repsPerEx: 6,
  },
  {
    id: "female_home_3days",
    name: "🏠 Casa sin Equipo 3 días",
    gender: "female",
    daysPerWeek: 3,
    difficulty: "principiante",
    category: "calistenia",
    description: "Glúteos y tono sin material en casa. Todo se puede hacer con suelo y una botella de agua.",
    exercises: [
      "glute_bridge",
      "hip_abduction",
      "push_up",
      "lunges",
      "plank",
      "side_plank",
      "dead_bug",
    ],
    seriesPerEx: 3,
    repsPerEx: 15,
  },
];

const unisexRoutines = [
  {
    id: "beginner_fullbody_3days",
    name: "🌱 Principiante 3 días",
    gender: "unisex",
    daysPerWeek: 3,
    difficulty: "principiante",
    category: "principiante",
    description: "Perfecta para empezar. Aprende los movimientos fundamentales con tiempos de fase controlados desde el inicio.",
    exercises: [
      "goblet_squat",
      "push_up",
      "seated_cable_row",
      "lunges",
      "plank",
      "glute_bridge",
    ],
    seriesPerEx: 3,
    repsPerEx: 10,
  },
  {
    id: "calisthenics_4days",
    name: "🤸 Calistenia 4 días",
    gender: "unisex",
    daysPerWeek: 4,
    difficulty: "intermedio",
    category: "calistenia",
    description: "Entrenamiento con peso corporal. La fase excéntrica controlada genera alta tensión muscular sin cargas externas.",
    exercises: [
      "push_up",
      "chin_up",
      "lunges",
      "plank",
      "leg_raise",
      "side_plank",
      "dead_bug",
      "step_up",
    ],
    seriesPerEx: 3,
    repsPerEx: 10,
  },
  {
    id: "functional_3days",
    name: "⚙️ Funcional 3 días",
    gender: "unisex",
    daysPerWeek: 3,
    difficulty: "intermedio",
    category: "funcional",
    description: "Movimientos funcionales para la vida real. Isométricos en posiciones angulares específicas para máxima transferencia.",
    exercises: [
      "goblet_squat",
      "dumbbell_row",
      "step_up",
      "farmer_walk",
      "pallof_press",
      "plank",
      "glute_bridge",
    ],
    seriesPerEx: 3,
    repsPerEx: 12,
  },
  {
    id: "core_specialist",
    name: "🎯 Core Especialista",
    gender: "unisex",
    daysPerWeek: 3,
    difficulty: "intermedio",
    category: "core",
    description: "Abdomen y estabilidad profunda. Isométricos de core basados en el protocolo lumbar de Lisón, Monfort y Sarti.",
    exercises: [
      "plank",
      "side_plank",
      "dead_bug",
      "leg_raise",
      "pallof_press",
      "copenhagen_plank",
      "glute_bridge",
    ],
    seriesPerEx: 3,
    repsPerEx: 1,
  },
  {
    id: "posture_correction",
    name: "🧍 Corrección Postural",
    gender: "unisex",
    daysPerWeek: 3,
    difficulty: "principiante",
    category: "corrección",
    description: "Ejercicios para mejorar postura y prevenir lesiones. Basado en el equilibrio muscular anterior/posterior del hombro.",
    exercises: [
      "band_pull_apart",
      "face_pull",
      "reverse_fly",
      "seated_row_band",
      "glute_bridge",
      "dead_bug",
      "side_plank",
    ],
    seriesPerEx: 3,
    repsPerEx: 15,
  },
  {
    id: "isometric_pure_3days",
    name: "⏸️ Isométrico Puro 3 días",
    gender: "unisex",
    daysPerWeek: 3,
    difficulty: "intermedio",
    category: "fuerza",
    description: "Entrenamiento 100% isométrico. Basado en el método de Hettinger y Muller (1953): 1 contracción diaria de 6s al 65% produce 5% de ganancia semanal de fuerza.",
    exercises: [
      "wall_sit",
      "plank",
      "side_plank",
      "dead_bug",
      "copenhagen_plank",
      "farmer_walk",
    ],
    seriesPerEx: 5,
    repsPerEx: 1,
  },
  {
    id: "hypertension_control",
    name: "❤️ Control Presión Arterial",
    gender: "unisex",
    daysPerWeek: 3,
    difficulty: "principiante",
    category: "funcional",
    description: "Basado en los protocolos de Wiles et al. (2017) y Smart et al. (2020): 3 sesiones/semana de isométrico reducen la TAS en 6-7mmHg, equivalente al 13% menos riesgo de infarto.",
    exercises: [
      "wall_sit",
      "plank",
      "glute_bridge",
      "dead_bug",
      "seated_row_band",
      "side_plank",
    ],
    seriesPerEx: 4,
    repsPerEx: 1,
  },
  
  { id: "band_fullbody_beginner", name: "🪢 Full Body Adaptación — Bandas", gender: "unisex", daysPerWeek: 3, difficulty: "principiante", category: "bandas", description: "Introducción al entrenamiento con bandas tubulares. La resistencia variable de la banda genera una curva de tensión que coincide con la curva de fuerza muscular, permitiendo mayor tiempo bajo tensión con riesgo articular mínimo. Ideal para iniciación, personas mayores y retorno al entrenamiento. Basado en los principios de VRT (Variable Resistance Training) de Heffernan et al. (2019) y el método isométrico de Hettinger: excéntrica 4s + pausa 2-3s produce adaptaciones neuronales desde la semana 1.", exercises: [ "tube_band_squat", "tube_band_chest_press", "tube_band_row_one_arm", "tube_band_hip_thrust", "tube_band_bicep_curl", "plank", "dead_bug", ], seriesPerEx: 3, repsPerEx: 12, }, { id: "band_upper_hypertrophy", name: "🪢 Upper Body Hipertrofia — Bandas", gender: "unisex", daysPerWeek: 4, difficulty: "intermedio", category: "bandas", description: "Hipertrofia del tren superior con bandas tubulares. La resistencia variable de la banda asegura tensión continua en todo el rango articular, eliminando los 'puntos muertos' del peso libre. Maeo et al. (2021): el entrenamiento en longitud muscular máxima (fase excéntrica profunda con banda) produce 40% más hipertrofia en la cabeza larga de bíceps y tríceps comparado con rango parcial. El protocolo utiliza excéntricas de 4s + isométricas de 2-3s para maximizar el tiempo bajo tensión en cada repetición.", exercises: [ "tube_band_chest_press", "tube_band_row_one_arm", "tube_band_shoulder_press", "tube_band_bicep_curl", "tube_band_tricep_extension", "tube_band_lateral_raise", "tube_band_face_pull", "side_plank", ], seriesPerEx: 4, repsPerEx: 12, }, { id: "band_lower_core", name: "🪢 Lower Body & Core — Bandas", gender: "unisex", daysPerWeek: 3, difficulty: "intermedio", category: "bandas", description: "Tren inferior y core funcional con bandas tubulares. La banda genera máxima resistencia en extensión de cadera y rodilla completa, activando el glúteo mayor y el cuádriceps en sus rangos de mayor producción de fuerza. Heffernan et al. (2019): VRT con banda produce mayor activación EMG del vasto lateral en los últimos 30° de extensión. Se combina con ejercicios antirotacionales isométricos de core (Pallof, Dead Bug) para una estabilización raquídea completa durante los patrones de carga del tren inferior.", exercises: [ "tube_band_squat", "tube_band_romanian_deadlift", "tube_band_hip_thrust", "tube_band_lunge", "tube_band_pallof_press_band", "dead_bug", "plank", "side_plank", ], seriesPerEx: 3, repsPerEx: 12, }, { id: "band_fullbody_advanced", name: "🪢 Full Body Tensión Continua — Bandas", gender: "unisex", daysPerWeek: 4, difficulty: "avanzado", category: "bandas", description: "Entrenamiento avanzado de cuerpo completo con tensión continua. La banda genera tensión en los dos extremos del rango articular —flexión y extensión—, eliminando los puntos de reposo y creando un estímulo de 'tensión continua' que maximiza el tiempo bajo tensión por serie. Schoenfeld (2012): el tiempo bajo tensión es una de las tres variables mecánicas primarias de la hipertrofia. Este protocolo combina patrones de empuje, jale, bisagra y rotación con excéntricas de 4s + isométricas de 2-3s para un estímulo de tensión total superior a cualquier modalidad de peso libre.", exercises: [ "tube_band_chest_press", "tube_band_row_one_arm", "tube_band_squat", "tube_band_shoulder_press", "tube_band_romanian_deadlift", "tube_band_woodchop_high", "tube_band_face_pull", "tube_band_pallof_press_band", "plank", "dead_bug", ], seriesPerEx: 4, repsPerEx: 10, }, { id: "band_strength_stability", name: "🪢 Fuerza Máxima y Estabilidad — Bandas", gender: "unisex", daysPerWeek: 4, difficulty: "avanzado", category: "bandas", description: "Protocolo avanzado de fuerza e integración neuromuscular con bandas. La resistencia variable de la banda recluta unidades motoras de alto umbral en el rango de extensión completa —zona inaccesible con peso libre sin ayuda de spotters—. Se incluye el leñador diagonal para la integración diagonal del core, el good morning para la cadena posterior y el Pallof press para antirotación máxima. Basado en el método de entrenamiento a múltiples ángulos articulares de González y Gorostiaga: cada ángulo desarrolla fuerza específica ±20°. Las isométricas de 2-3s generan adaptaciones neurales superiores a cualquier protocolo dinámico puro (Hettinger y Muller, 1953).", exercises: [ "tube_band_squat", "tube_band_good_morning", "tube_band_chest_press", "tube_band_row_one_arm", "tube_band_shoulder_press", "tube_band_woodchop_high", "tube_band_pallof_press_band", "tube_band_face_pull", "side_plank", "dead_bug", ], seriesPerEx: 4, repsPerEx: 8, },
];


// ─── RUTINAS DE RECUPERACIÓN ACTIVA ─────────────────────────────────────
// Kellmann et al. (2018): recuperación activa acelera recuperación hasta 30%
// comparado con reposo pasivo. Se devuelven cuando isFatigued === true.

const recoveryRoutines = [
  {
    id: "recovery_male",
    name: "🔄 Recuperación Activa — Hombre",
    gender: "male",
    daysPerWeek: 2,
    difficulty: "principiante",
    category: "Recovery",
    description: "Protocolo de recuperación activa para hombres. Kellmann et al. (2018): ejercicios de flujo sanguíneo y movilidad de baja intensidad aceleran la recuperación muscular hasta un 30% comparado con reposo pasivo. Recomendado después de 3 sesiones intensas consecutivas.",
    exercises: ["cat_cow","bird_dog","hip_flexor_stretch_iso","thoracic_rotation","wall_angel","prone_shoulder_retraction","band_pull_apart","hip_abduction","ankle_circles_iso","foam_roll_iso","dead_bug","glute_bridge"],
    seriesPerEx: 2,
    repsPerEx: 10,
  },
  {
    id: "recovery_female",
    name: "🔄 Recuperación Activa — Mujer",
    gender: "female",
    daysPerWeek: 2,
    difficulty: "principiante",
    category: "Recovery",
    description: "Recuperación activa adaptada para mujeres. Wilmore & Costill (2012): mayor proporción de fibras tipo I en mujeres hace la recuperación más rápida con flujo sanguíneo activo de baja intensidad. Kellmann et al. (2018): movilidad activa es especialmente efectiva en mujeres atletas.",
    exercises: ["cat_cow","bird_dog","hip_flexor_stretch_iso","thoracic_rotation","wall_angel","prone_shoulder_retraction","band_pull_apart","hip_abduction","ankle_circles_iso","foam_roll_iso","glute_bridge","dead_bug"],
    seriesPerEx: 2,
    repsPerEx: 10,
  },
  {
    id: "recovery_unisex",
    name: "🔄 Recuperación Activa — General",
    gender: "unisex",
    daysPerWeek: 2,
    difficulty: "principiante",
    category: "Recovery",
    description: "Rutina de recuperación activa general. Schoenfeld (2024): liberación miofascial + movilidad activa + activación neural de baja intensidad = protocolo de recuperación con mayor evidencia. Wiles et al. (2017) y Smart et al. (2020): wall sit isométrico durante la recuperación activa mantiene los beneficios cardiovasculares.",
    exercises: ["cat_cow","bird_dog","foam_roll_iso","thoracic_rotation","wall_angel","hip_flexor_stretch_iso","ankle_circles_iso","prone_shoulder_retraction","dead_bug","glute_bridge","band_pull_apart","wall_sit"],
    seriesPerEx: 2,
    repsPerEx: 10,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES DE FILTRADO POR FATIGA Y SUGERENCIA
// Tarea 2: getFilteredRoutines y suggestRecoveryAfterIntenseSessions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * getFilteredRoutines(gender, isFatigued)
 * Si isFatigued === true → devuelve SOLO rutinas de category: "Recovery"
 * Si isFatigued === false → devuelve todas las rutinas excepto Recovery
 * @param {string} gender - "male" | "female" | "both"
 * @param {boolean} isFatigued - estado de fatiga del usuario
 * @returns {Array} array de rutinas filtradas
 */
function getFilteredRoutines(gender, isFatigued) {
  const all = getAllAvailableRoutines(gender).concat(recoveryRoutines);
  if (isFatigued) {
    const recovery = all.filter(function(r) { return r.category === "Recovery"; });
    return recovery.length > 0 ? recovery : all.filter(function(r) { return r.difficulty === "principiante"; });
  }
  return all.filter(function(r) { return r.category !== "Recovery"; });
}

/**
 * suggestRecoveryAfterIntenseSessions()
 * Analiza el historial y recomienda recuperación tras 3 sesiones intensas
 * @returns {Object|null} rutina de recuperación sugerida o null
 */
function suggestRecoveryAfterIntenseSessions() {
  var history = [];
  try {
    var stored = localStorage.getItem("workoutStats");
    if (stored) {
      var stats = JSON.parse(stored);
      history = stats.history || [];
    }
  } catch (e) {
    return null;
  }
  if (history.length < 3) return null;
  var last3 = history.slice(0, 3);
  var last3Ids = last3.map(function(h) { return h.routineId || h.routineName || ""; });
  var allR = getAllAvailableRoutines("both");
  var intensiveCategories = ["Fuerza", "Hipertrofia"];
  var intensiveCount = last3Ids.filter(function(id) {
    var routine = allR.find(function(r) { return r.id === id || r.name === id; });
    return routine && intensiveCategories.indexOf(routine.category) !== -1;
  }).length;
  if (intensiveCount >= 3) {
    return recoveryRoutines[2]; // recovery_unisex como fallback general
  }
  return null;
}

/**
 * getSuggestedRoutine(gender)
 * Primero verifica si hay sugerencia de recuperación.
 * Si no, devuelve la primera rutina de entrenamiento disponible.
 * @param {string} gender
 * @returns {Object|null}
 */
function getSuggestedRoutine(gender) {
  var recoverySuggestion = suggestRecoveryAfterIntenseSessions();
  if (recoverySuggestion) return recoverySuggestion;
  var routines = getFilteredRoutines(gender, false);
  return routines.length > 0 ? routines[0] : null;
}

let customRoutines = [];

try {
  const s = localStorage.getItem("user_custom_routines");
  if (s) customRoutines = JSON.parse(s);
} catch (e) {
  customRoutines = [];
}

function saveCustomRoutine(r) {
  if (!r.id || !r.name || !r.exercises || !r.exercises.length) return false;
  if (customRoutines.some((x) => x.id === r.id)) return false;
  customRoutines.push(r);
  try {
    localStorage.setItem("user_custom_routines", JSON.stringify(customRoutines));
    window.customRoutines = customRoutines;
    return true;
  } catch (e) {
    return false;
  }
}

function deleteCustomRoutine(id) {
  const l = customRoutines.length;
  customRoutines = customRoutines.filter((r) => r.id !== id);
  if (customRoutines.length !== l) {
    try {
      localStorage.setItem("user_custom_routines", JSON.stringify(customRoutines));
      window.customRoutines = customRoutines;
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

function updateCustomRoutine(id, r) {
  const i = customRoutines.findIndex((x) => x.id === id);
  if (i !== -1) {
    customRoutines[i] = { ...r, id };
    try {
      localStorage.setItem("user_custom_routines", JSON.stringify(customRoutines));
      window.customRoutines = customRoutines;
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

function getAllAvailableRoutines(gender) {
  let base = [];
  if (gender === "male") base = [...maleRoutines];
  else if (gender === "female") base = [...femaleRoutines];
  return [...base, ...unisexRoutines, ...customRoutines];
}

function getExerciseDetails(id) {
  return exerciseLibrary.find((e) => e.id === id);
}

function isValidExercise(id) {
  return exerciseLibrary.some((e) => e.id === id);
}

function getRoutineById(id, gender) {
  return (
    getAllAvailableRoutines(gender).find((r) => r.id === id) ||
    customRoutines.find((r) => r.id === id)
  );
}

window.exerciseLibrary = exerciseLibrary;
window.rehabProtocols = rehabProtocols;
window.customRoutines = customRoutines;
window.getAllAvailableRoutines = getAllAvailableRoutines;
window.saveCustomRoutine = saveCustomRoutine;
window.deleteCustomRoutine = deleteCustomRoutine;
window.updateCustomRoutine = updateCustomRoutine;
window.getExerciseDetails = getExerciseDetails;
window.isValidExercise = isValidExercise;
window.getRoutineById = getRoutineById;
window.maleRoutines = maleRoutines;
window.femaleRoutines = femaleRoutines;
window.unisexRoutines = unisexRoutines;
// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES COMPATIBLES CON getAllAvailableRoutines
// ═══════════════════════════════════════════════════════════════════════════

// Parchear getAllAvailableRoutines para incluir Recovery
(function() {
  var _orig = window.getAllAvailableRoutines;
  window.getAllAvailableRoutines = function(gender) {
    var base = _orig(gender);
    var rec  = (window.recoveryRoutines || []).filter(function(r) {
      return r.gender === "unisex" || r.gender === gender;
    });
    // Evitar duplicados
    var ids = base.map(function(r) { return r.id; });
    rec = rec.filter(function(r) { return ids.indexOf(r.id) === -1; });
    return base.concat(rec);
  };
})();
 