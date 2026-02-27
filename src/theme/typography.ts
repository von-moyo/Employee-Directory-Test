import { Platform } from 'react-native';

export const fontFamily = {
  regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  medium: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const lineHeight = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const typography = {
  displayLarge: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize['4xl'] * lineHeight.tight,
  },
  displayMedium: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize['3xl'] * lineHeight.tight,
  },
  headingLarge: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize['2xl'] * lineHeight.snug,
  },
  headingMedium: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.xl * lineHeight.snug,
  },
  headingSmall: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.lg * lineHeight.snug,
  },
  bodyLarge: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  bodyMedium: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  labelLarge: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  labelMedium: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  labelSmall: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.xs * lineHeight.normal,
  },
} as const;
