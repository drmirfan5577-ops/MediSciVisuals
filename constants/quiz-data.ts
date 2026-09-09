// Quiz & Assessment Data

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuizCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'cardiovascular',
    title: 'Cardiovascular',
    icon: 'favorite',
    color: '#E91E63',
    bgColor: '#FCE4EC',
    totalQuestions: 5,
    questions: [
      {
        id: 'cv1',
        question: 'How many chambers does the human heart have?',
        options: ['2 chambers', '3 chambers', '4 chambers', '5 chambers'],
        correct: 2,
        explanation: 'The human heart has 4 chambers: right atrium, right ventricle, left atrium, and left ventricle.',
        difficulty: 'Beginner',
      },
      {
        id: 'cv2',
        question: 'Which valve separates the left atrium from the left ventricle?',
        options: ['Tricuspid valve', 'Aortic valve', 'Pulmonary valve', 'Mitral (bicuspid) valve'],
        correct: 3,
        explanation: 'The mitral (bicuspid) valve separates the left atrium from the left ventricle.',
        difficulty: 'Intermediate',
      },
      {
        id: 'cv3',
        question: 'What is the normal resting heart rate for adults?',
        options: ['40–60 bpm', '60–100 bpm', '100–120 bpm', '120–140 bpm'],
        correct: 1,
        explanation: 'A normal resting heart rate for adults ranges from 60 to 100 beats per minute (bpm).',
        difficulty: 'Beginner',
      },
      {
        id: 'cv4',
        question: 'Which blood vessel carries oxygenated blood from the lungs to the heart?',
        options: ['Pulmonary artery', 'Aorta', 'Pulmonary vein', 'Superior vena cava'],
        correct: 2,
        explanation: 'The pulmonary veins carry oxygenated blood from the lungs back to the left atrium of the heart.',
        difficulty: 'Intermediate',
      },
      {
        id: 'cv5',
        question: 'What is the SA node often referred to as?',
        options: ['Pacemaker of the heart', 'Heart valve regulator', 'Blood pressure controller', 'Cardiac buffer'],
        correct: 0,
        explanation: 'The sinoatrial (SA) node is called the natural pacemaker of the heart as it initiates each heartbeat.',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'nervous',
    title: 'Nervous System',
    icon: 'psychology',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    totalQuestions: 5,
    questions: [
      {
        id: 'ns1',
        question: 'Which lobe of the brain controls voluntary movement?',
        options: ['Temporal lobe', 'Occipital lobe', 'Parietal lobe', 'Frontal lobe'],
        correct: 3,
        explanation: 'The frontal lobe contains the primary motor cortex, which controls voluntary movement.',
        difficulty: 'Beginner',
      },
      {
        id: 'ns2',
        question: 'What is the basic functional unit of the nervous system?',
        options: ['Synapse', 'Neuron', 'Axon', 'Dendrite'],
        correct: 1,
        explanation: 'The neuron is the basic structural and functional unit of the nervous system.',
        difficulty: 'Beginner',
      },
      {
        id: 'ns3',
        question: 'Which neurotransmitter is associated with the fight-or-flight response?',
        options: ['Serotonin', 'Dopamine', 'Norepinephrine', 'GABA'],
        correct: 2,
        explanation: 'Norepinephrine (noradrenaline) plays a key role in the fight-or-flight stress response.',
        difficulty: 'Advanced',
      },
      {
        id: 'ns4',
        question: 'The myelin sheath around axons is produced by which cells?',
        options: ['Astrocytes', 'Microglia', 'Schwann cells', 'Ependymal cells'],
        correct: 2,
        explanation: 'In the peripheral nervous system, Schwann cells produce the myelin sheath that insulates axons.',
        difficulty: 'Advanced',
      },
      {
        id: 'ns5',
        question: 'How many pairs of cranial nerves does the human brain have?',
        options: ['10 pairs', '12 pairs', '14 pairs', '8 pairs'],
        correct: 1,
        explanation: 'The human brain has 12 pairs of cranial nerves that emerge from the brain stem.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'skeletal',
    title: 'Skeletal System',
    icon: 'accessibility',
    color: '#4A90E2',
    bgColor: '#EBF4FF',
    totalQuestions: 5,
    questions: [
      {
        id: 'sk1',
        question: 'How many bones are in the adult human body?',
        options: ['196', '206', '216', '186'],
        correct: 1,
        explanation: 'The adult human body has 206 bones. Infants are born with around 270–300 bones that fuse over time.',
        difficulty: 'Beginner',
      },
      {
        id: 'sk2',
        question: 'What is the longest bone in the human body?',
        options: ['Tibia', 'Humerus', 'Femur', 'Fibula'],
        correct: 2,
        explanation: 'The femur (thigh bone) is the longest and strongest bone in the human body.',
        difficulty: 'Beginner',
      },
      {
        id: 'sk3',
        question: 'Which cells are responsible for breaking down bone tissue?',
        options: ['Osteoblasts', 'Osteocytes', 'Chondrocytes', 'Osteoclasts'],
        correct: 3,
        explanation: 'Osteoclasts are specialized cells responsible for resorbing (breaking down) bone tissue during remodeling.',
        difficulty: 'Advanced',
      },
      {
        id: 'sk4',
        question: 'What type of joint is the hip joint?',
        options: ['Hinge joint', 'Pivot joint', 'Ball-and-socket joint', 'Saddle joint'],
        correct: 2,
        explanation: 'The hip joint is a ball-and-socket joint, allowing for a wide range of motion in multiple directions.',
        difficulty: 'Intermediate',
      },
      {
        id: 'sk5',
        question: 'What is the medical term for the kneecap?',
        options: ['Calcaneus', 'Talus', 'Patella', 'Fibula'],
        correct: 2,
        explanation: 'The patella (kneecap) is a small, flat, triangular bone that protects the front of the knee joint.',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 'respiratory',
    title: 'Respiratory',
    icon: 'air',
    color: '#00BCD4',
    bgColor: '#E0F7FA',
    totalQuestions: 5,
    questions: [
      {
        id: 'rs1',
        question: 'Where does gas exchange primarily occur in the lungs?',
        options: ['Bronchi', 'Trachea', 'Alveoli', 'Bronchioles'],
        correct: 2,
        explanation: 'Gas exchange (O2/CO2) occurs in the alveoli — tiny air sacs at the end of bronchioles.',
        difficulty: 'Beginner',
      },
      {
        id: 'rs2',
        question: 'What is the normal respiratory rate for adults at rest?',
        options: ['8–10 breaths/min', '12–20 breaths/min', '20–30 breaths/min', '5–8 breaths/min'],
        correct: 1,
        explanation: 'Normal adult respiratory rate at rest is 12–20 breaths per minute.',
        difficulty: 'Beginner',
      },
      {
        id: 'rs3',
        question: 'Which muscle is primarily responsible for breathing?',
        options: ['Intercostal muscles', 'Diaphragm', 'Pectoralis major', 'Serratus anterior'],
        correct: 1,
        explanation: 'The diaphragm is the primary muscle of respiration, contracting to expand the thoracic cavity.',
        difficulty: 'Intermediate',
      },
      {
        id: 'rs4',
        question: 'What is the approximate total lung capacity in an average adult?',
        options: ['2–3 liters', '4–5 liters', '6–7 liters', '8–9 liters'],
        correct: 2,
        explanation: 'Total lung capacity in an average adult is approximately 6 liters (range: 4–6+ liters).',
        difficulty: 'Intermediate',
      },
      {
        id: 'rs5',
        question: 'The epiglottis primarily prevents food from entering which structure?',
        options: ['Esophagus', 'Trachea', 'Pharynx', 'Larynx'],
        correct: 1,
        explanation: 'The epiglottis is a flap of cartilage that covers the trachea during swallowing to prevent aspiration.',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'chemistry',
    title: 'Molecular Biology',
    icon: 'biotech',
    color: '#607D8B',
    bgColor: '#ECEFF1',
    totalQuestions: 5,
    questions: [
      {
        id: 'mb1',
        question: 'DNA is composed of which type of sugar?',
        options: ['Ribose', 'Fructose', 'Deoxyribose', 'Glucose'],
        correct: 2,
        explanation: 'DNA contains deoxyribose sugar, while RNA contains ribose sugar (hence their respective names).',
        difficulty: 'Intermediate',
      },
      {
        id: 'mb2',
        question: 'Which base pairs with Adenine in DNA?',
        options: ['Cytosine', 'Uracil', 'Guanine', 'Thymine'],
        correct: 3,
        explanation: 'In DNA, Adenine (A) pairs with Thymine (T) via two hydrogen bonds.',
        difficulty: 'Beginner',
      },
      {
        id: 'mb3',
        question: 'Where does translation (protein synthesis) occur?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correct: 2,
        explanation: 'Translation occurs at ribosomes, where mRNA is decoded to synthesize a specific protein.',
        difficulty: 'Intermediate',
      },
      {
        id: 'mb4',
        question: 'What enzyme synthesizes new DNA strands during replication?',
        options: ['RNA polymerase', 'Helicase', 'DNA polymerase', 'Ligase'],
        correct: 2,
        explanation: 'DNA polymerase synthesizes new DNA strands by reading the template strand in the 3\' to 5\' direction.',
        difficulty: 'Advanced',
      },
      {
        id: 'mb5',
        question: 'What is the central dogma of molecular biology?',
        options: ['Protein → RNA → DNA', 'DNA → Protein → RNA', 'DNA → RNA → Protein', 'RNA → DNA → Protein'],
        correct: 2,
        explanation: 'The central dogma: DNA is transcribed to RNA, which is then translated into protein.',
        difficulty: 'Beginner',
      },
    ],
  },
];
