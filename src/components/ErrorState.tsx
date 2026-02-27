import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, borderRadius, spacing } from '@/theme';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  const { colors, typography } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={[typography.headingSmall, styles.title]}>Oops!</Text>
      <Text style={[typography.bodyMedium, styles.message]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
          accessibilityLabel="Retry"
          accessibilityRole="button"
        >
          <Text style={[typography.labelLarge, styles.buttonText]}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing[8],
      gap: spacing[3],
    },
    icon: {
      fontSize: 48,
    },
    title: {
      color: colors.text,
      textAlign: 'center',
    },
    message: {
      color: colors.textSecondary,
      textAlign: 'center',
    },
    button: {
      marginTop: spacing[2],
      backgroundColor: colors.primary,
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[3],
      borderRadius: borderRadius.xl,
    },
    buttonText: {
      color: '#FFFFFF',
    },
  });
}
