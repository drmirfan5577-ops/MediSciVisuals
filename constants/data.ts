// Medi+Sci Visuals - Mocked Data Layer

export interface Template {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  description: string;
  features: string[];
  image: string; // unsplash or local
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  languages: number;
  views: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
  image?: any;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Website' | 'Journal' | 'Organization' | 'Repository';
  url: string;
  description: string;
  icon: string;
  color: string;
  verified: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'skeletal',
    title: 'Skeletal System',
    icon: 'accessibility',
    color: '#4A90E2',
    bgColor: '#EBF4FF',
    count: 8,
  },
  {
    id: 'cardiovascular',
    title: 'Cardiovascular',
    icon: 'favorite',
    color: '#E91E63',
    bgColor: '#FCE4EC',
    count: 6,
  },
  {
    id: 'nervous',
    title: 'Nervous System',
    icon: 'psychology',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    count: 7,
  },
  {
    id: 'respiratory',
    title: 'Respiratory',
    icon: 'air',
    color: '#00BCD4',
    bgColor: '#E0F7FA',
    count: 5,
  },
  {
    id: 'digestive',
    title: 'Digestive System',
    icon: 'local-hospital',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    count: 5,
  },
  {
    id: 'muscular',
    title: 'Muscular System',
    icon: 'fitness-center',
    color: '#F44336',
    bgColor: '#FFEBEE',
    count: 6,
  },
  {
    id: 'endocrine',
    title: 'Endocrine System',
    icon: 'science',
    color: '#7ED321',
    bgColor: '#F1F8E9',
    count: 4,
  },
  {
    id: 'chemistry',
    title: 'Chemical Processes',
    icon: 'biotech',
    color: '#607D8B',
    bgColor: '#ECEFF1',
    count: 9,
  },
];

export const TEMPLATES: Template[] = [
  {
    id: 't1',
    title: 'Human Heart: 4-Chamber View',
    subtitle: 'Cardiovascular System',
    category: 'cardiovascular',
    categoryColor: '#E91E63',
    description: 'A complete 3D interactive visualization of the human heart showing all four chambers, valve mechanisms, and blood circulation pathways with animated cardiac cycle.',
    features: [
      '4-chamber 360° rotation',
      'Cardiac cycle animation',
      'Blood flow pathways (red/blue)',
      'Valve opening/closing mechanics',
      'ECG synchronization overlay',
    ],
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=300&fit=crop',
    duration: '12 min',
    difficulty: 'Intermediate',
    languages: 12,
    views: '24.5K',
    isFeatured: true,
  },
  {
    id: 't2',
    title: 'Brain Mapping: Lobes & Functions',
    subtitle: 'Nervous System',
    category: 'nervous',
    categoryColor: '#9C27B0',
    description: 'Detailed 3D mapping of all brain lobes with their associated functions, neural pathways, and interactive region highlighting for educational presentations.',
    features: [
      'All lobe regions labeled',
      'Neural pathway animations',
      'Functional area highlighting',
      'Neuron firing simulations',
      'Memory/cognition sequences',
    ],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    duration: '18 min',
    difficulty: 'Advanced',
    languages: 12,
    views: '31.2K',
    isFeatured: true,
  },
  {
    id: 't3',
    title: 'Full Skeletal System (206 Bones)',
    subtitle: 'Skeletal System',
    category: 'skeletal',
    categoryColor: '#4A90E2',
    description: 'Complete human skeleton with all 206 bones individually labeled, joint articulation animations, fracture healing processes, and age-related structural changes.',
    features: [
      '206 bones individually labeled',
      'Joint articulation mechanics',
      'Fracture & healing process',
      'Age progression visualization',
      'Bone density comparison',
    ],
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop',
    duration: '22 min',
    difficulty: 'Intermediate',
    languages: 12,
    views: '18.7K',
    isFeatured: true,
  },
  {
    id: 't4',
    title: 'Lung Mechanics & Gas Exchange',
    subtitle: 'Respiratory System',
    category: 'respiratory',
    categoryColor: '#00BCD4',
    description: 'Animated visualization of lung expansion/contraction, alveoli gas exchange at molecular level, and complete airway tree structure from trachea to alveoli.',
    features: [
      'Lung expansion animation',
      'Alveolar gas exchange (O2/CO2)',
      'Complete airway tree',
      'Breathing mechanics (inhalation/exhalation)',
      'Pulmonary circulation',
    ],
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=300&fit=crop',
    duration: '14 min',
    difficulty: 'Beginner',
    languages: 8,
    views: '15.3K',
  },
  {
    id: 't5',
    title: 'DNA Replication & Protein Synthesis',
    subtitle: 'Molecular Biology',
    category: 'chemistry',
    categoryColor: '#607D8B',
    description: 'Molecular-level visualization of DNA double helix replication, mRNA transcription, and ribosomal protein synthesis with step-by-step animated sequences.',
    features: [
      'DNA double helix unwinding',
      'Replication fork mechanics',
      'mRNA transcription process',
      'tRNA/ribosome translation',
      'Protein folding sequence',
    ],
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=300&fit=crop',
    duration: '20 min',
    difficulty: 'Advanced',
    languages: 10,
    views: '42.1K',
    isFeatured: true,
  },
  {
    id: 't6',
    title: 'Complete GI Tract Journey',
    subtitle: 'Digestive System',
    category: 'digestive',
    categoryColor: '#FF9800',
    description: 'Follow a meal from ingestion through the complete gastrointestinal tract, showing enzyme action, nutrient absorption, and organ cross-sections in real-time animation.',
    features: [
      'Oral cavity to rectum journey',
      'Enzyme action visualization',
      'Nutrient absorption sites',
      'Peristalsis mechanics',
      'Organ cross-sections',
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    duration: '16 min',
    difficulty: 'Beginner',
    languages: 8,
    views: '12.8K',
  },
  {
    id: 't7',
    title: 'Muscular Contraction Cycle',
    subtitle: 'Muscular System',
    category: 'muscular',
    categoryColor: '#F44336',
    description: 'Detailed animation of sarcomere contraction at molecular level, showing actin-myosin cross-bridge cycling, ATP energy mechanics, and full muscle fiber activation.',
    features: [
      '600+ muscles layered view',
      'Sarcomere molecular zoom',
      'Actin-myosin cross-bridge',
      'ATP energy visualization',
      'Neuromuscular junction',
    ],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    duration: '15 min',
    difficulty: 'Advanced',
    languages: 10,
    views: '9.4K',
  },
  {
    id: 't8',
    title: 'Hormone Pathways & Feedback',
    subtitle: 'Endocrine System',
    category: 'endocrine',
    categoryColor: '#7ED321',
    description: 'Interactive visualization of major endocrine glands, hormone synthesis pathways, blood-borne transport, and negative feedback loop mechanisms.',
    features: [
      'All gland locations',
      'Hormone synthesis pathways',
      'Blood transport animation',
      'Feedback loop diagrams',
      'Metabolic effects overview',
    ],
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=300&fit=crop',
    duration: '17 min',
    difficulty: 'Intermediate',
    languages: 8,
    views: '7.6K',
  },
];

export const RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'PubMed Central',
    type: 'Website',
    url: 'https://www.pubmed.gov',
    description: 'The primary medical research database with millions of peer-reviewed biomedical literature citations.',
    icon: 'library-books',
    color: '#4A90E2',
    verified: true,
  },
  {
    id: 'r2',
    title: 'World Health Organization',
    type: 'Organization',
    url: 'https://www.who.int',
    description: 'Global health authority providing authoritative guidelines, statistics, and health information worldwide.',
    icon: 'public',
    color: '#0077B6',
    verified: true,
  },
  {
    id: 'r3',
    title: 'NIH - National Institutes of Health',
    type: 'Website',
    url: 'https://www.nih.gov',
    description: 'US medical research agency conducting and supporting research to improve health and well-being.',
    icon: 'biotech',
    color: '#7ED321',
    verified: true,
  },
  {
    id: 'r4',
    title: 'The Lancet',
    type: 'Journal',
    url: 'https://www.thelancet.com',
    description: 'One of the oldest and most prestigious peer-reviewed general medical journals in the world.',
    icon: 'menu-book',
    color: '#E91E63',
    verified: true,
  },
  {
    id: 'r5',
    title: 'Nature Medicine',
    type: 'Journal',
    url: 'https://www.nature.com',
    description: 'Leading scientific journal publishing the most significant research across all fields of science.',
    icon: 'science',
    color: '#9C27B0',
    verified: true,
  },
  {
    id: 'r6',
    title: 'CDC - Disease Control',
    type: 'Organization',
    url: 'https://www.cdc.gov',
    description: 'US agency dedicated to protecting public health and safety through disease control and prevention.',
    icon: 'health-and-safety',
    color: '#00BCD4',
    verified: true,
  },
  {
    id: 'r7',
    title: 'Wellcome Collection',
    type: 'Repository',
    url: 'https://wellcomecollection.org',
    description: 'Public domain repository of medical and scientific images, manuscripts, and cultural artifacts.',
    icon: 'collections',
    color: '#FF9800',
    verified: true,
  },
  {
    id: 'r8',
    title: 'Science Direct',
    type: 'Website',
    url: 'https://www.sciencedirect.com',
    description: 'Elsevier platform providing access to thousands of scientific journals and book chapters.',
    icon: 'auto-stories',
    color: '#F44336',
    verified: true,
  },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', flag: '🇮🇷' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文', flag: '🇨🇳' },
  { code: 'bal', name: 'Balochi', nativeName: 'بلوچی', flag: '🏳️' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', flag: '🏳️' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

export const STATS = [
  { label: 'Templates', value: '200+', icon: 'view-module', color: '#4A90E2' },
  { label: 'Languages', value: '12', icon: 'translate', color: '#7ED321' },
  { label: 'Educators', value: '50K+', icon: 'school', color: '#E91E63' },
  { label: 'Verified Sources', value: '100+', icon: 'verified', color: '#FF9800' },
];
