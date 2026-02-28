import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme, spacing, borderRadius } from '@/theme';

const HERO_COLOR = '#004282';

export function DetailSkeleton() {
  const { colors } = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 800, useNativeDriver: false }),
        Animated.timing(shimmer, { toValue: 0, duration: 800, useNativeDriver: false }),
      ]),
    ).start();
  }, [shimmer]);

  const bgColor = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surfaceSecondary, colors.border],
  });

  const heroBg = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Hero skeleton */}
      <View style={styles.hero}>
        <Animated.View style={[styles.avatar, { backgroundColor: heroBg }]} />
        <Animated.View style={[styles.nameLine, { backgroundColor: heroBg }]} />
        <Animated.View style={[styles.titleLine, { backgroundColor: heroBg }]} />
        <Animated.View style={[styles.badge, { backgroundColor: heroBg }]} />
      </View>

      {/* Sections skeleton */}
      <View style={styles.sections}>
        <Animated.View style={[styles.sectionLabel, { backgroundColor: bgColor }]} />
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <RowSkeleton bgColor={bgColor} borderColor={colors.border} />
          <RowSkeleton bgColor={bgColor} borderColor={colors.border} isLast />
        </View>

        <Animated.View style={[styles.sectionLabel, { backgroundColor: bgColor }]} />
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <RowSkeleton bgColor={bgColor} borderColor={colors.border} />
          <RowSkeleton bgColor={bgColor} borderColor={colors.border} />
          <RowSkeleton bgColor={bgColor} borderColor={colors.border} />
          <RowSkeleton bgColor={bgColor} borderColor={colors.border} isLast />
        </View>
      </View>
    </View>
  );
}

function RowSkeleton({
  bgColor,
  borderColor,
  isLast,
}: {
  bgColor: Animated.AnimatedInterpolation<string>;
  borderColor: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: borderColor }]}>
      <Animated.View style={[styles.rowIcon, { backgroundColor: bgColor }]} />
      <View style={styles.rowContent}>
        <Animated.View style={[styles.rowLabel, { backgroundColor: bgColor }]} />
        <Animated.View style={[styles.rowValue, { backgroundColor: bgColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    backgroundColor: HERO_COLOR,
    alignItems: 'center',
    paddingTop: spacing[8],
    paddingBottom: spacing[7],
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginBottom: spacing[2],
  },
  nameLine: {
    width: 160,
    height: 22,
    borderRadius: 6,
  },
  titleLine: {
    width: 120,
    height: 16,
    borderRadius: 4,
  },
  badge: {
    width: 100,
    height: 28,
    borderRadius: borderRadius.full,
    marginTop: spacing[1],
  },
  sections: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
  },
  sectionLabel: {
    width: 70,
    height: 12,
    borderRadius: 4,
    marginBottom: spacing[2],
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    marginBottom: spacing[5],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
  },
  rowContent: {
    flex: 1,
    gap: 6,
  },
  rowLabel: {
    width: '30%',
    height: 10,
    borderRadius: 4,
  },
  rowValue: {
    width: '60%',
    height: 14,
    borderRadius: 4,
  },
});
