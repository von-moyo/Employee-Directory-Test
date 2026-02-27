import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme, spacing } from '@/theme';

const ACCENT = '#004282';

interface SkeletonItemProps {
  colors: ReturnType<typeof useTheme>['colors'];
  animValue: Animated.Value;
}

function SkeletonItem({ colors, animValue }: SkeletonItemProps) {
  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surfaceSecondary, colors.border],
  });

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      {/* Left accent stripe */}
      <View style={styles.stripe} />

      {/* Square avatar placeholder */}
      <Animated.View style={[styles.avatar, { backgroundColor }]} />

      {/* Text placeholders */}
      <View style={styles.info}>
        <Animated.View style={[styles.lineDept, { backgroundColor }]} />
        <Animated.View style={[styles.lineName, { backgroundColor }]} />
        <Animated.View style={[styles.lineTitle, { backgroundColor }]} />
      </View>
    </View>
  );
}

const SKELETON_COUNT = 8;

export function LoadingState() {
  const { colors } = useTheme();
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, { toValue: 1, duration: 800, useNativeDriver: false }),
        Animated.timing(animValue, { toValue: 0, duration: 800, useNativeDriver: false }),
      ]),
    ).start();
  }, [animValue]);

  return (
    <View>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonItem key={i} colors={colors} animValue={animValue} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginHorizontal: spacing[4],
    marginBottom: spacing[2],
    paddingRight: spacing[4],
    paddingVertical: 10,
  },
  stripe: {
    width: 4,
    alignSelf: 'stretch',
    backgroundColor: ACCENT,
    opacity: 0.3,
    marginRight: spacing[3],
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 6,
    marginRight: spacing[3],
  },
  info: {
    flex: 1,
    gap: 6,
  },
  lineDept: {
    height: 9,
    borderRadius: 4,
    width: '25%',
  },
  lineName: {
    height: 14,
    borderRadius: 4,
    width: '55%',
  },
  lineTitle: {
    height: 11,
    borderRadius: 4,
    width: '40%',
  },
});
