import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, spacing, borderRadius } from '@/theme';

interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
}

export function DetailRow({ icon, label, value }: DetailRowProps) {
  const { colors, typography } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[typography.labelSmall, styles.label]}>{label}</Text>
        <Text style={[typography.bodyMedium, styles.value]} numberOfLines={2}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: spacing[3],
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      gap: spacing[3],
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: borderRadius.lg,
      backgroundColor: colors.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 18,
    },
    content: {
      flex: 1,
      gap: 2,
    },
    label: {
      color: colors.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    value: {
      color: colors.text,
    },
  });
}
