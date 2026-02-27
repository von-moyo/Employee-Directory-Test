export const palette = {
  // Brand — corporate navy
  primary: '#004282',
  primaryLight: '#1A6BB5',
  primaryDark: '#002D5A',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Semantic
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Dark mode surfaces
  dark100: '#1C1C1E',
  dark200: '#2C2C2E',
  dark300: '#3A3A3C',
} as const;

export const lightColors = {
  background: '#EEF2F7',
  surface: palette.white,
  surfaceSecondary: '#E3EAF3',
  border: '#C8D8E8',
  text: palette.gray900,
  textSecondary: palette.gray500,
  textTertiary: palette.gray400,
  primary: '#004282',
  primaryLight: '#1A6BB5',
  error: palette.error,
  success: palette.success,
  warning: palette.warning,
  placeholder: palette.gray400,
  shadow: palette.black,
  icon: palette.gray600,
  cardBackground: palette.white,
  tabBar: palette.white,
  header: palette.white,
  searchBar: '#E3EAF3',
} as const;

export const darkColors = {
  background: palette.dark100,
  surface: palette.dark200,
  surfaceSecondary: palette.dark300,
  border: '#3A3A3C',
  text: palette.white,
  textSecondary: palette.gray400,
  textTertiary: palette.gray500,
  primary: '#5B9BD5',
  primaryLight: '#004282',
  error: '#FF6B6B',
  success: '#34D399',
  warning: '#FCD34D',
  placeholder: palette.gray500,
  shadow: palette.black,
  icon: palette.gray400,
  cardBackground: palette.dark200,
  tabBar: palette.dark200,
  header: palette.dark200,
  searchBar: palette.dark300,
} as const;

export type ColorScheme = typeof lightColors;
