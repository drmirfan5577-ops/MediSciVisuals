// Medi+Sci Visuals Generator - Design Tokens
// Luminous Professional Theme - Zero Dark Mode

export const Colors = {
  // Brand
  primary: '#4A90E2',       // Medical Blue
  primaryLight: '#EBF4FF',
  primaryDark: '#2C6FBF',
  secondary: '#7ED321',     // Science Green
  secondaryLight: '#F0FBE0',
  secondaryDark: '#5A9A18',

  // Backgrounds (all bright/light)
  background: '#F0F8FF',    // Alice Blue
  surface: '#FFFFFF',
  surfaceAlt: '#F8FBFF',
  cardBg: '#FFFFFF',

  // Text
  textPrimary: '#1A237E',   // Deep Indigo
  textSecondary: '#546E7A',
  textMuted: '#90A4AE',
  textOnPrimary: '#FFFFFF',

  // Semantic
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#E53935',
  info: '#29B6F6',

  // Accents
  accent1: '#E91E63',       // Pink
  accent2: '#9C27B0',       // Purple
  accent3: '#FF5722',       // Deep Orange

  // Borders & Dividers
  border: '#E0ECFF',
  divider: '#F0F0F0',

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#4A90E2', '#2196F3'] as const,
  gradientSecondary: ['#7ED321', '#4CAF50'] as const,
  gradientHero: ['#E8F4FD', '#F0FBE0'] as const,
  gradientCard: ['#FFFFFF', '#F0F8FF'] as const,
};

export const Typography = {
  // Sizes
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 22,
  xxl: 26,
  xxxl: 32,

  // Weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,

  // Line Heights
  tight: 1.3,
  normal: 1.5,
  relaxed: 1.7,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const Shadows = {
  card: {
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  strong: {
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
};
