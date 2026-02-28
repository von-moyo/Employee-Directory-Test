import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme, spacing } from '@/theme';
import { getFullName, getInitials } from '@/utils';
import type { Employee } from '@/types';

const ACCENT = '#004282';

interface EmployeeCardProps {
  employee: Employee;
  onPress: (employee: Employee) => void;
  index?: number;
}

export function EmployeeCard({ employee, onPress, index = 0 }: EmployeeCardProps) {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    const delay = index * 80;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 40 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 40 }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
        onPress={() => onPress(employee)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityLabel={`View profile of ${getFullName(employee)}`}
      >
        {/* Left accent stripe */}
        <View style={styles.stripe} />

        {/* Square avatar with initials fallback */}
        {imageError ? (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarInitials}>{getInitials(employee)}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: employee.image }}
            style={[styles.avatar, { backgroundColor: colors.surfaceSecondary }]}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}

        {/* Info */}
        <View style={styles.info}>
          <Text style={[styles.dept, { color: colors.primary }]}>
            {employee.company.department.toUpperCase()}
          </Text>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {getFullName(employee)}
          </Text>
          <Text style={[styles.title, { color: colors.textSecondary }]} numberOfLines={1}>
            {employee.company.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[2],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    paddingRight: spacing[4],
    paddingVertical: 10,
  },
  stripe: {
    width: 4,
    alignSelf: 'stretch',
    backgroundColor: ACCENT,
    marginRight: spacing[3],
    marginVertical: -10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 6,
    marginRight: spacing[3],
  },
  avatarFallback: {
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  dept: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
  },
});
