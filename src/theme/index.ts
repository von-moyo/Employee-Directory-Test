import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';
import { typography, fontSize, fontWeight } from './typography';
import { spacing, borderRadius } from './spacing';

export { lightColors, darkColors, palette } from './colors';
export { typography, fontSize, fontWeight, lineHeight, fontFamily } from './typography';
export { spacing, borderRadius } from './spacing';
export type { ColorScheme } from './colors';

export function useTheme() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? darkColors : lightColors;

  return {
    colors,
    typography,
    fontSize,
    fontWeight,
    spacing,
    borderRadius,
    isDark: scheme === 'dark',
    colorScheme: scheme ?? 'light',
  };
}
