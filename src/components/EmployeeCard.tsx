import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useTheme, spacing } from '@/theme';
import { getFullName } from '@/utils';
import type { Employee } from '@/types';

const ACCENT = '#004282';

interface EmployeeCardProps {
  employee: Employee;
  onPress: (employee: Employee) => void;
  index?: number;
}

export function EmployeeCard({ employee, onPress, index = 0 }: EmployeeCardProps) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 320,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.975, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
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

        {/* Square avatar */}
        <Image
          source={{ uri: employee.image }}
          style={[styles.avatar, { backgroundColor: colors.surfaceSecondary }]}
          resizeMode="cover"
        />

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
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 6,
    marginRight: spacing[3],
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
