import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, spacing } from '@/theme';

interface EmptyStateProps {
  searchQuery?: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  const { colors, typography } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <Text style={[typography.headingSmall, styles.title]}>No results found</Text>
      {searchQuery ? (
        <Text style={[typography.bodyMedium, styles.message]}>
          No employees match &ldquo;{searchQuery}&rdquo;
        </Text>
      ) : (
        <Text style={[typography.bodyMedium, styles.message]}>
          No employees to display.
        </Text>
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
      paddingTop: spacing[16],
      gap: spacing[2],
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
  });
}
