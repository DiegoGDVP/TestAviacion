export interface Question {
  id: number;
  category: string;
  question: string;
  options: [string, string, string];
  correctAnswer: 0 | 1 | 2;
  explanation: string;
}

export const categories = [
  { slug: "motores", label: "Motores", icon: "ri-temp-hot-line", description: "Principios de operación, tipos de motores, sistemas de propulsión y mantenimiento de plantas motrices." },
  { slug: "aerodinamica", label: "Aerodinámica", icon: "ri-windy-line", description: "Teoría del vuelo, fuerzas aerodinámicas, perfiles alares, performances de vuelo y estabilidad de la aeronave." },
  { slug: "electricidad", label: "Electricidad aeronáutica", icon: "ri-flashlight-line", description: "Sistemas eléctricos, generadores, baterías, cableado y protecciones eléctricas a bordo." },
  { slug: "instrumentacion", label: "Instrumentación", icon: "ri-dashboard-line", description: "Instrumentos de vuelo, sistemas de navegación, aviónica y monitoreo de sistemas." },
  { slug: "estructuras", label: "Estructuras", icon: "ri-building-line", description: "Materiales aeronáuticos, fuselaje, alas, tren de aterrizaje y sistemas de control." },
] as const;

// Preguntas extraídas del PDF "Tema 5 con respuestas" (Performances de Vuelo)
const pdfQuestionsAerodinamica: Omit<Question, 'id' | 'category'>[] = [
  {
    question: "¿Cómo varía la resistencia total de un avión en función de la velocidad de vuelo para el caso de vuelo horizontal y uniforme?",
    options: [
      "Aumenta cuando la velocidad es pequeña",
      "Disminuye cuando aumenta la velocidad inducida",
      "Aumenta o disminuye según el valor de la velocidad de vuelo",
    ],
    correctAnswer: 2,
    explanation: "La resistencia total es la suma de la resistencia parásita (que aumenta con el cuadrado de la velocidad) y la resistencia inducida (que disminuye con el cuadrado de la velocidad). Por ello, la curva de resistencia total tiene forma de U: primero disminuye hasta un mínimo y luego aumenta.",
  },
  {
    question: "¿Con qué otra característica coincide la velocidad de vuelo para la cual la resistencia parásita e inducida son iguales?",
    options: [
      "Con velocidad de mínima resistencia",
      "Con la velocidad de mínima fineza",
      "Con velocidad de mínima potencia",
    ],
    correctAnswer: 0,
    explanation: "La velocidad de mínima resistencia (VMD) se alcanza exactamente cuando la resistencia parásita y la resistencia inducida son iguales. En este punto la fineza (L/D) es máxima.",
  },
  {
    question: "¿Cuáles son las condiciones que se deben cumplir para mantener un vuelo horizontal y uniforme?",
    options: [
      "L = W y D = T",
      "Pd = L y Pn = D",
      "L = W únicamente",
    ],
    correctAnswer: 0,
    explanation: "En vuelo horizontal y uniforme (equilibrio), la sustentación debe igualar al peso (L = W) y la tracción debe igualar a la resistencia (T = D, también expresado como Pn = D en términos de potencia).",
  },
  {
    question: "¿De qué forma afecta el peso de la aeronave en la expresión que nos da la tracción necesaria?",
    options: [
      "Hace aumentar la componente parásita",
      "Disminuye la tracción necesaria total",
      "Hace aumentar la componente inducida",
    ],
    correctAnswer: 2,
    explanation: "La resistencia inducida es proporcional al cuadrado del peso (Di ∝ W²). Por tanto, al aumentar el peso, la componente inducida de la tracción necesaria aumenta significativamente.",
  },
  {
    question: "¿De qué forma afecta la velocidad en el factor de carga en una recogida cuando se pretende aterrizar?",
    options: [
      "Aumenta el factor de carga",
      "No interviene en la expresión del factor de carga",
      "Disminuye el factor de carga",
    ],
    correctAnswer: 0,
    explanation: "Durante la recogida (flare), el avión describe una trayectoria curva hacia arriba que requiere una sustentación mayor que el peso, por lo que el factor de carga aumenta ligeramente (n > 1).",
  },
  {
    question: "¿De qué forma varía la potencia disponible en función de la altura de vuelo?",
    options: [
      "Solo depende del peso",
      "Disminuye cuando aumenta la altura",
      "Es independiente de la altitud",
    ],
    correctAnswer: 1,
    explanation: "La potencia disponible de un motor de hélice disminuye con la altura porque la densidad del aire disminuye, reduciendo la masa de aire que puede procesar el motor.",
  },
  {
    question: "¿Qué condición se cumple cuando se vuela con velocidad máxima de vuelo?",
    options: [
      "Que la autonomía de vuelo que tenemos es máxima",
      "Que la potencia disponible es igual a la necesaria",
      "Que la resistencia al avance es mínima",
    ],
    correctAnswer: 1,
    explanation: "La velocidad máxima de vuelo se alcanza en el punto de intersección más alto entre las curvas de potencia disponible y potencia necesaria, donde Pd = Pn.",
  },
  {
    question: "¿Qué le ocurre a la velocidad de mínima resistencia VMD cuando aumentamos el peso?",
    options: [
      "Aumenta",
      "Disminuye",
      "Se mantiene constante",
    ],
    correctAnswer: 0,
    explanation: "La velocidad de mínima resistencia VMD es proporcional a la raíz cuadrada del peso (VMD ∝ √W). Por tanto, al aumentar el peso, aumenta la VMD.",
  },
  {
    question: "Cuando se efectúa una maniobra de viraje deberemos tener en cuenta que...",
    options: [
      "La velocidad de pérdida será mayor que en vuelo horizontal",
      "El radio de giro disminuye progresivamente con la velocidad",
      "La potencia necesaria será menor que en vuelo de crucero",
    ],
    correctAnswer: 0,
    explanation: "En un viraje coordinado, el factor de carga aumenta (n = 1/cos φ), por lo que la velocidad de pérdida aumenta según la fórmula V_stall_viraje = V_stall × √n.",
  },
  {
    question: "En el vuelo en descenso de un avión en el que PD=0 y T=0 se verifica que el ángulo de descenso:",
    options: [
      "Coincide con el valor de la fineza",
      "Coincide con el valor inverso de la fineza",
      "Depende de la fineza y la velocidad",
    ],
    correctAnswer: 1,
    explanation: "En un planeo con motor al ralentí (T≈0) y potencia disponible nula, el ángulo de descenso γ cumple que tg(γ) = 1/E, donde E es la fineza. Es decir, el ángulo de descenso es el inverso de la fineza.",
  },
  {
    question: "En el vuelo horizontal estabilizado de un avión:",
    options: [
      "La resistencia inducida aumenta al incrementarse el valor de Ve",
      "La resistencia parásita aumenta al incrementarse el valor de Ve",
      "La resistencia parásita no varía con el incremento de Ve",
    ],
    correctAnswer: 1,
    explanation: "La resistencia parásita es proporcional al cuadrado de la velocidad equivalente (Dp ∝ Ve²), por lo que aumenta al incrementarse la velocidad. La resistencia inducida, por el contrario, disminuye.",
  },
  {
    question: "En la curva de potencia necesaria para el vuelo horizontal de un avión, el punto de mínima resistencia:",
    options: [
      "Es en el que la resistencia parásita vale 0 y la resistencia inducida es máxima",
      "Es en la que Ve tiene su valor mínimo, porque la resistencia parásita es mínima",
      "Coincide con el punto en que son iguales la resistencia parásita y la resistencia inducida",
    ],
    correctAnswer: 2,
    explanation: "La velocidad de mínima resistencia (VMD) coincide exactamente con el punto donde la resistencia parásita y la resistencia inducida son iguales. A esta velocidad la fineza es máxima.",
  },
  {
    question: "Si queremos realizar un viraje coordinado, el radio de giro, empleando el valor de la velocidad verdadera (TAS):",
    options: [
      "Aumenta si incrementamos el ángulo de viraje",
      "Aumenta si disminuimos la velocidad verdadera",
      "Aumenta si incrementamos la velocidad verdadera",
    ],
    correctAnswer: 2,
    explanation: "El radio de giro sigue la fórmula R = V² / (g · tg φ). Por tanto, el radio aumenta con el cuadrado de la velocidad verdadera y disminuye al aumentar el ángulo de inclinación.",
  },
  {
    question: "En vuelo horizontal y uniforme, ¿cómo varía la resistencia inducida en función de la velocidad de vuelo?",
    options: [
      "Aumenta cuando aumenta la velocidad",
      "Aumenta o disminuye según el valor de la velocidad",
      "Disminuye cuando aumenta la velocidad",
    ],
    correctAnswer: 2,
    explanation: "La resistencia inducida es inversamente proporcional al cuadrado de la velocidad (Di ∝ W²/V²). Por tanto, disminuye cuando aumenta la velocidad de vuelo.",
  },
  {
    question: "En vuelo horizontal a velocidad alta llevamos:",
    options: [
      "Ángulo de ataque pequeño pero la deflexión del timón de profundidad es grande",
      "Ángulo de ataque pequeño y deflexión del timón de profundidad también pequeña",
      "Ángulo de ataque grande y deflexión del timón de profundidad también grande",
    ],
    correctAnswer: 0,
    explanation: "A alta velocidad se necesita menor ángulo de ataque para generar la misma sustentación. Sin embargo, la distribución de presiones en el perfil genera un momento de cabeceo que debe compensarse con una deflexión significativa del timón de profundidad.",
  },
  {
    question: "La sustentación necesaria en un viraje:",
    options: [
      "Será mayor que el peso, aumentando al aumentar el ángulo de inclinación",
      "Será mayor que el peso, disminuyendo al aumentar el ángulo de inclinación",
      "Será menor que el peso, aumentando al aumentar el ángulo de inclinación",
    ],
    correctAnswer: 0,
    explanation: "En un viraje coordinado, la sustentación debe contrarrestar el peso y proporcionar la fuerza centrípeta: L = W / cos(φ). A mayor ángulo de inclinación, mayor sustentación necesaria.",
  },
  {
    question: "En un vuelo a máximo alcance el problema se reduce a encontrar:",
    options: [
      "El mayor valor de alcance específico",
      "El menor valor de alcance específico",
      "La velocidad donde la fineza es mínima",
    ],
    correctAnswer: 0,
    explanation: "El alcance máximo se consigue maximizando el alcance específico (millas por libra de combustible), lo cual ocurre cuando la fineza (L/D) es máxima.",
  },
  {
    question: "La velocidad de vuelo para la cual se consigue autonomía máxima se corresponde con...",
    options: [
      "La velocidad donde la potencia necesaria es mínima",
      "La velocidad donde la potencia necesaria es igual a la potencia inducida",
      "La velocidad donde la resistencia es mínima",
    ],
    correctAnswer: 0,
    explanation: "En un avión de hélice, la autonomía máxima (endurance) se alcanza volando a la velocidad de mínima potencia necesaria, que es menor que la velocidad de mínima resistencia.",
  },
  {
    question: "La velocidad equivalente de pérdida Ve* de un avión incrementa cuando:",
    options: [
      "Se incrementa el coeficiente de sustentación máximo CLmax",
      "Se incrementa la carga alar",
      "Se incrementa la superficie alar",
    ],
    correctAnswer: 1,
    explanation: "La velocidad de pérdida es V_stall = √(2W / ρSCLmax). La carga alar es W/S. A mayor carga alar, mayor velocidad de pérdida. Si aumenta CLmax o S, la velocidad de pérdida disminuye.",
  },
  {
    question: "Los virajes acusados no deben realizarse en situaciones críticas debido a que...",
    options: [
      "Necesitamos más potencia para mantener la horizontalidad",
      "La sustentación necesaria disminuye con el ángulo de giro",
      "El peso hace aumentar la sustentación",
    ],
    correctAnswer: 0,
    explanation: "En virajes acusados el factor de carga aumenta drásticamente (n = 1/cos φ), lo que provoca un gran incremento de la resistencia inducida (Di ∝ n²) y, por tanto, se requiere mucha más potencia para mantener la velocidad y la altitud.",
  },
  {
    question: "¿Cuándo se obtiene la velocidad equivalente Ve de mínima resistencia?",
    options: [
      "Cuando la resistencia inducida es mayor que la resistencia parásita",
      "Cuando la resistencia inducida y la resistencia parásita son iguales",
      "Cuando la resistencia parásita es mayor que la resistencia inducida",
    ],
    correctAnswer: 1,
    explanation: "La velocidad de mínima resistencia se alcanza cuando la resistencia inducida y la parásita son exactamente iguales. A esta velocidad la resistencia total es mínima y la fineza es máxima.",
  },
  {
    question: "En la gráfica que representa la tracción necesaria (Tn) en función de velocidad equivalente de vuelo (Ve) para movimiento horizontal y uniforme. ¿Cómo varía la resistencia inducida (Di) con la velocidad?",
    options: [
      "Aumenta cuando aumenta la Ve",
      "Disminuye cuando aumenta la Ve",
      "La Di no es función de la Ve",
    ],
    correctAnswer: 1,
    explanation: "La resistencia inducida sigue una hipérbola decreciente: Di = k · W² / Ve². Por tanto, disminuye cuando aumenta la velocidad equivalente.",
  },
  {
    question: "En las actuaciones de los aviones, la velocidad a la que se presenta la mínima resistencia o L/D máxima es:",
    options: [
      "Es tanto mayor cuanto mayor es el peso del avión",
      "Es tanto menor cuando mayor es el peso del avión",
      "De un valor fijo, que se corresponde con el mismo para todas las aeronaves",
    ],
    correctAnswer: 0,
    explanation: "La velocidad de mínima resistencia VMD es proporcional a √W (la raíz cuadrada del peso). Por tanto, a mayor peso, mayor velocidad de mínima resistencia.",
  },
  {
    question: "En un viraje, ¿de qué forma varía el radio de giro?",
    options: [
      "El radio aumenta con la velocidad",
      "El radio disminuye con la altitud",
      "El radio aumenta con el ángulo de inclinación",
    ],
    correctAnswer: 0,
    explanation: "El radio de giro R = V² / (g · tg φ). Aumenta con el cuadrado de la velocidad y disminuye al aumentar el ángulo de inclinación. La altitud no afecta directamente al radio si se usa TAS.",
  },
  {
    question: "En un viraje...",
    options: [
      "La potencia necesaria será superior a la del vuelo horizontal y rectilíneo",
      "El avión se ve sometido solo a las fuerzas de sustentación L y peso W",
      "La resistencia inducida será igual que la que existiría en vuelo horizontal y rectilíneo para la misma velocidad",
    ],
    correctAnswer: 0,
    explanation: "En un viraje el factor de carga aumenta (n > 1), lo que hace que la resistencia inducida aumente proporcionalmente a n². Por tanto, la potencia necesaria es considerablemente mayor que en vuelo recto y nivelado.",
  },
  {
    question: "La máxima autonomía en un avión de hélice se alcanza:",
    options: [
      "A una velocidad verdadera fija, la de mínima resistencia",
      "A mínima potencia y a menor altitud posible",
      "A mínima potencia independientemente de la altitud a que se realice el vuelo",
    ],
    correctAnswer: 2,
    explanation: "La máxima autonomía (endurance) de un avión de hélice se consigue volando a la velocidad de mínima potencia necesaria. Esta condición es independiente de la altitud en términos de velocidad equivalente (Ve).",
  },
  {
    question: "Se demuestra que en el vuelo de un avión los esfuerzos a los que se ve sometido éste son:",
    options: [
      "Proporcionales al factor de carga n y al cuadrado de la velocidad v²",
      "Proporcionales al factor de carga y al triple de la velocidad v³",
      "Solamente proporcionales al factor de carga",
    ],
    correctAnswer: 0,
    explanation: "Los esfuerzos estructurales en las alas son proporcionales a la presión dinámica (½ρV²) y al factor de carga (n). Por tanto, los esfuerzos son proporcionales a n × V².",
  },
  {
    question: "Un avión en una maniobra que exigiera un viraje con el ángulo de inclinación de 60° (cos 60° = ½):",
    options: [
      "Las alas de ese avión estarían sometidas a unas cargas triples de las que soportarían en vuelo horizontal",
      "El piloto tendría la sensación de que su peso sería la mitad",
      "La sustentación en esas condiciones debería ser el doble del peso del avión",
    ],
    correctAnswer: 2,
    explanation: "Con 60° de inclinación, el factor de carga es n = 1/cos(60°) = 2. Por tanto, la sustentación necesaria debe ser el doble del peso (L = 2W) para mantener la trayectoria circular.",
  },
  {
    question: "En la expresión que nos da la tracción necesaria para vuelo horizontal y uniforme, ¿a qué corresponde el término 'b·(W²/Ve²)'?",
    options: [
      "Resistencia parásita",
      "Resistencia inducida",
      "Resistencia de fricción",
    ],
    correctAnswer: 1,
    explanation: "En la ecuación de tracción necesaria, el término que depende del cuadrado del peso dividido por el cuadrado de la velocidad (W²/Ve²) corresponde a la resistencia inducida, generada por la creación de sustentación.",
  },
  {
    question: "En la expresión matemática que nos da la potencia necesaria (Pn) para vuelo horizontal y sin aceleración en función de la Ve de vuelo, el peso y la densidad. ¿Cómo varía la Pn con la densidad?",
    options: [
      "La potencia necesaria aumenta cuando disminuye la densidad",
      "La potencia necesaria no depende de la densidad",
      "La Pn es constante para un vuelo horizontal y sin aceleración",
    ],
    correctAnswer: 0,
    explanation: "A medida que la densidad disminuye (mayor altitud), la velocidad verdadera aumenta para mantener la misma velocidad equivalente. Esto hace que la resistencia parásita aumente y, por tanto, la potencia necesaria aumenta cuando disminuye la densidad.",
  },
  {
    question: "En las fuerzas que actúan sobre un avión, en vuelo horizontal y sin aceleración, se deberá verificar (donde W es el peso y T la tracción de la hélice):",
    options: [
      "L = W y D = T",
      "L = W o D = T",
      "L = W y T = 0",
    ],
    correctAnswer: 0,
    explanation: "Para el equilibrio en vuelo horizontal sin aceleración, las fuerzas verticales deben equilibrarse (L = W) y las horizontales también (T = D, tracción igual a resistencia).",
  },
  {
    question: "Si queremos realizar un vuelo para obtener el máximo alcance, ¿en qué condiciones deberemos volar?",
    options: [
      "Con fineza máxima",
      "Con potencia mínima",
      "Con la resistencia parásita mínima",
    ],
    correctAnswer: 0,
    explanation: "El alcance máximo se logra volando a la velocidad de máxima fineza (L/D máximo), donde la relación entre sustentación y resistencia es óptima.",
  },
  {
    question: "En vuelo recto y nivelado, ¿qué se consigue si volamos a la velocidad donde la potencia necesaria es mínima?",
    options: [
      "La autonomía máxima",
      "El alcance máximo",
      "El alcance de crucero",
    ],
    correctAnswer: 0,
    explanation: "Volando a la velocidad de mínima potencia necesaria se consigue la máxima autonomía (endurance), es decir, el mayor tiempo posible en el aire con una cantidad dada de combustible.",
  },
  {
    question: "En las actuaciones de vuelo de traslación de ascenso:",
    options: [
      "La sustentación es menor que el peso del avión",
      "La tracción es menor que la resistencia",
      "La sustentación es mayor que el peso del avión",
    ],
    correctAnswer: 0,
    explanation: "En ascenso estable, la sustentación es L = W · cos(γ), donde γ es el ángulo de ascenso. Como cos(γ) < 1, la sustentación es menor que el peso. La tracción debe ser mayor que la resistencia para vencer la componente del peso.",
  },
  {
    question: "Un avión en vuelo vertical:",
    options: [
      "La sustentación es igual al peso del avión",
      "La sustentación será nula",
      "La sustentación es mayor que el peso del avión",
    ],
    correctAnswer: 1,
    explanation: "En un vuelo vertical rectilíneo (ascenso o descenso vertical), la trayectoria es perpendicular a la sustentación. Si el avión está alineado con la trayectoria vertical, el ángulo de ataque es aproximadamente cero y la sustentación es nula o despreciable.",
  },
  {
    question: "En un viraje, siendo 'x' el ángulo de inclinación lateral, se verifica que:",
    options: [
      "L = W / tg x",
      "L = W / cos x",
      "L = 1 / cos x",
    ],
    correctAnswer: 1,
    explanation: "En un viraje coordinado, la sustentación debe equilibrar el peso y proporcionar la fuerza centrípeta. Descomponiendo fuerzas verticales: L · cos(x) = W, por tanto L = W / cos(x).",
  },
];

// Preguntas genéricas para las demás categorías
const genericMotores: Omit<Question, 'id' | 'category'>[] = [
  {
    question: "¿Cuál es el ciclo termodinámico base de un motor de pistones de aviación?",
    options: ["Ciclo Rankine", "Ciclo Otto", "Ciclo Brayton"],
    correctAnswer: 1,
    explanation: "Los motores de pistones de aviación funcionan basándose en el ciclo Otto (cuatro tiempos: admisión, compresión, combustión/expansión y escape).",
  },
  {
    question: "En un motor turbofan, ¿qué componente comprime el aire antes de la cámara de combustión?",
    options: ["La turbina", "El compresor", "El inyector de combustible"],
    correctAnswer: 1,
    explanation: "El compresor es el encargado de comprimir el aire antes de que entre en la cámara de combustión, aumentando su presión y temperatura.",
  },
  {
    question: "¿Qué significa el término TBO en mantenimiento de motores aeronáuticos?",
    options: ["Tiempo Base de Operación", "Time Between Overhauls", "Temperatura de Bloqueo Operativo"],
    correctAnswer: 1,
    explanation: "TBO (Time Between Overhauls) es el tiempo recomendado por el fabricante entre revisiones generales del motor, generalmente medido en horas de vuelo.",
  },
  {
    question: "¿Cuál es la función principal del sistema de ignición en un motor de pistones?",
    options: ["Enfriar las bujías", "Generar la chispa para la combustión", "Controlar el flujo de combustible"],
    correctAnswer: 1,
    explanation: "El sistema de ignición genera la chispa eléctrica en las bujías para iniciar la combustión de la mezcla aire-combustible en la cámara de combustión.",
  },
  {
    question: "¿Qué tipo de combustible utiliza habitualmente un motor turbofan de aviación comercial?",
    options: ["Gasolina de aviación 100LL", "Queroseno de aviación Jet-A", "Diesel aeronáutico"],
    correctAnswer: 1,
    explanation: "Los motores turbofan utilizan queroseno de aviación Jet-A (o Jet-A1), un combustible de alto punto de inflamación diseñado para reactores.",
  },
];

const genericElectricidad: Omit<Question, 'id' | 'category'>[] = [
  {
    question: "¿Cuál es la frecuencia estándar de la corriente alterna en los sistemas eléctricos de aviación?",
    options: ["50 Hz", "60 Hz", "400 Hz"],
    correctAnswer: 2,
    explanation: "La aviación utiliza 400 Hz como frecuencia estándar porque permite reducir el tamaño y peso de transformadores y motores eléctricos a bordo.",
  },
  {
    question: "¿Qué componente transforma la energía mecánica del motor en energía eléctrica en un sistema de generación aeronáutico?",
    options: ["El inversor", "El generador o alternador", "La batería"],
    correctAnswer: 1,
    explanation: "El generador o alternador es el componente que convierte la energía mecánica del motor (a través de un accionamiento) en energía eléctrica para alimentar los sistemas de la aeronave.",
  },
  {
    question: "¿Qué función cumple el relé de corte (cutout relay) en el sistema eléctrico de una aeronave?",
    options: ["Regular el voltaje de salida", "Desconectar el generador cuando la velocidad del motor es insuficiente", "Distribuir la carga entre generadores"],
    correctAnswer: 1,
    explanation: "El relé de corte desconecta el generador de la red eléctrica cuando la velocidad del motor es insuficiente para evitar que la batería descargue a través del generador.",
  },
  {
    question: "En aviación, las baterías de níquel-cadmio (Ni-Cd) se prefieren sobre las de plomo-ácido principalmente por:",
    options: ["Menor coste", "Mayor capacidad de descarga y menor peso", "Mayor voltaje por celda"],
    correctAnswer: 1,
    explanation: "Las baterías Ni-Cd ofrecen mayor capacidad de descarga, mejor rendimiento en temperaturas extremas y menor peso comparado con las de plomo-ácido, siendo ideales para aviación.",
  },
  {
    question: "¿Qué dispositivo convierte corriente continua (DC) en corriente alterna (AC) en sistemas aeronáuticos modernos?",
    options: ["Rectificador", "Inversor", "Transformador"],
    correctAnswer: 1,
    explanation: "El inversor convierte corriente continua (DC) en corriente alterna (AC), permitiendo alimentar equipos que requieren AC desde una fuente DC como las baterías.",
  },
];

const genericInstrumentacion: Omit<Question, 'id' | 'category'>[] = [
  {
    question: "¿Qué instrumento indica la altitud de la aeronave respecto al nivel medio del mar?",
    options: ["Variometro", "Altímetro", "Indicador de rumbo"],
    correctAnswer: 1,
    explanation: "El altímetro mide la presión atmosférica y la convierte en una indicación de altitud, generalmente respecto al nivel medio del mar (altitud de presión).",
  },
  {
    question: "El sistema pitot-estática proporciona información a qué conjunto de instrumentos de vuelo?",
    options: ["Altímetro, velocímetro y variómetro", "Indicador de rumbo, giróscopo y ADF", "Radioaltímetro, transpondedor y DME"],
    correctAnswer: 0,
    explanation: "El sistema pitot-estática alimenta tres instrumentos básicos: altímetro (presión estática), velocímetro (presión dinámica pitot) y variómetro (variación de presión estática).",
  },
  {
    question: "¿Qué instrumento muestra la velocidad vertical de ascenso o descenso de la aeronave?",
    options: ["Velocímetro", "Variometro (VSI)", "Indicador de ángulo de ataque"],
    correctAnswer: 1,
    explanation: "El variómetro o Indicador de Velocidad Vertical (VSI) muestra la tasa de cambio de altitud, indicando si la aeronave asciende o desciende y a qué velocidad.",
  },
  {
    question: "¿Qué sistema de navegación utiliza satélites para determinar la posición precisa de la aeronave?",
    options: ["VOR/DME", "GPS (GNSS)", "NDB/ADF"],
    correctAnswer: 1,
    explanation: "El GPS (Sistema de Posicionamiento Global) forma parte del GNSS y utiliza una constelación de satélites para determinar la posición tridimensional de la aeronave con gran precisión.",
  },
  {
    question: "En un sistema EFIS (Electronic Flight Instrument System), ¿dónde se muestra normalmente la información de navegación?",
    options: ["En el PFD (Primary Flight Display)", "En el ND (Navigation Display)", "En el ECAM/EICAS"],
    correctAnswer: 1,
    explanation: "En un sistema EFIS, la información de navegación (mapa, waypoints, ruta planificada) se muestra en el ND (Navigation Display), mientras que el PFD muestra los parámetros de vuelo básicos.",
  },
];

const genericEstructuras: Omit<Question, 'id' | 'category'>[] = [
  {
    question: "¿Qué material aeronáutico ofrece la mejor relación resistencia/peso para estructuras primarias modernas?",
    options: ["Acero al carbono", "Aleaciones de aluminio", "Materiales compuestos (CFRP)"],
    correctAnswer: 2,
    explanation: "Los materiales compuestos de fibra de carbono (CFRP) ofrecen la mejor relación resistencia/peso, permitiendo estructuras más ligeras y resistentes que el aluminio o el acero.",
  },
  {
    question: "¿Qué tipo de tren de aterrizaje permite que la aeronave gire sobre sí misma en el suelo con las ruedas delanteras?",
    options: ["Tren de cola", "Tren triciclo", "Tren convencional"],
    correctAnswer: 1,
    explanation: "El tren triciclo tiene la rueda de morro orientable, lo que permite a la aeronave girar sobre sí misma en el suelo y ofrece mejor visibilidad durante el rodaje.",
  },
  {
    question: "¿Qué sistema permite al piloto controlar el movimiento de cabeceo (pitch) de la aeronave?",
    options: ["Los alerones", "Los elevadores", "El timón de dirección"],
    correctAnswer: 1,
    explanation: "Los elevadores, situados en la superficie posterior del estabilizador horizontal, controlan el cabeceo (pitch) de la aeronave, permitiendo ascender o descender.",
  },
  {
    question: "¿Qué fenómeno puede producir grietas en las alas debido a ciclos repetidos de presurización y depresurización?",
    options: ["Corrosión galvánica", "Fatiga por vibración", "Fatiga por ciclos de carga"],
    correctAnswer: 2,
    explanation: "La fatiga por ciclos de carga (fatiga estructural) ocurre cuando una estructura se somete a tensiones repetidas, como los ciclos de presurización en vuelo, provocando grietas microscópicas que pueden propagarse.",
  },
  {
    question: "En una aeronave con control hidráulico de vuelo, ¿qué componente convierte la presión hidráulica en movimiento mecánico de las superficies de control?",
    options: ["La bomba hidráulica", "El actuador o servo", "El acumulador"],
    correctAnswer: 1,
    explanation: "El actuador o servo hidráulico convierte la energía de presión del fluido hidráulico en movimiento mecánico lineal o rotativo para accionar las superficies de control.",
  },
];

// Asignar IDs y categorías
let idCounter = 1;

export const questions: Question[] = [
  ...pdfQuestionsAerodinamica.map((q) => ({ ...q, id: idCounter++, category: "aerodinamica" })),
  ...genericMotores.map((q) => ({ ...q, id: idCounter++, category: "motores" })),
  ...genericElectricidad.map((q) => ({ ...q, id: idCounter++, category: "electricidad" })),
  ...genericInstrumentacion.map((q) => ({ ...q, id: idCounter++, category: "instrumentacion" })),
  ...genericEstructuras.map((q) => ({ ...q, id: idCounter++, category: "estructuras" })),
];

export function getQuestionsByCategory(categorySlug: string): Question[] {
  return questions.filter((q) => q.category === categorySlug);
}

export function getRandomQuestionsByCategory(categorySlug: string, maxQuestions = 20): Question[] {
  const all = questions.filter((q) => q.category === categorySlug);
  if (all.length <= maxQuestions) return all;
  // Fisher-Yates shuffle + slice
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, maxQuestions);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}