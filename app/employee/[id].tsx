import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEmployee } from '@/hooks';
import { ErrorState, DetailRow, DetailSkeleton } from '@/components';
import { useTheme, spacing, borderRadius } from '@/theme';
import { getFullName, getInitials } from '@/utils';

const HERO_COLOR = '#004282';

export default function EmployeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { colors, typography } = useTheme();

  const [imageError, setImageError] = useState(false);
  const employeeId = parseInt(id ?? '0', 10);
  const { data: employee, isLoading, isError, error, refetch } = useEmployee(employeeId);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const sectionFade = useRef(new Animated.Value(0)).current;
  const sectionSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (employee) {
      navigation.setOptions({ title: getFullName(employee) });
      // Hero animates in first, sections follow with a stagger
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 4 }),
      ]).start();
      Animated.parallel([
        Animated.timing(sectionFade, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }),
        Animated.timing(sectionSlide, { toValue: 0, duration: 400, delay: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [employee, navigation, fadeAnim, slideAnim, sectionFade, sectionSlide]);

  const styles = makeStyles(colors);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !employee) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : 'Failed to load employee profile.'
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Navy hero header ── */}
      <Animated.View
        style={[styles.hero, { transform: [{ translateY: slideAnim }] }]}
      >
        {imageError ? (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarInitials}>{getInitials(employee)}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: employee.image }}
            style={styles.avatar}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
        <Text style={[typography.headingLarge, styles.name]}>
          {getFullName(employee)}
        </Text>
        <Text style={[typography.bodyLarge, styles.jobTitle]}>
          {employee.company.title}
        </Text>
        <View style={styles.departmentBadge}>
          <Text style={[typography.labelMedium, styles.departmentText]}>
            {employee.company.department.toUpperCase()}
          </Text>
        </View>
      </Animated.View>

      {/* ── Sections ── */}
      <Animated.View
        style={[
          styles.sections,
          { opacity: sectionFade, transform: [{ translateY: sectionSlide }] },
        ]}
      >
        <Text style={[typography.labelLarge, styles.sectionTitle]}>Contact</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <DetailRow
            icon="✉️"
            label="Email"
            value={employee.email}
            onPress={() => Linking.openURL(`mailto:${employee.email}`)}
          />
          <DetailRow
            icon="📞"
            label="Phone"
            value={employee.phone}
            onPress={() => Linking.openURL(`tel:${employee.phone}`)}
          />
        </View>

        <Text style={[typography.labelLarge, styles.sectionTitle]}>Work</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <DetailRow icon="💼" label="Job Title" value={employee.company.title} />
          <DetailRow icon="🏢" label="Department" value={employee.company.department} />
          <DetailRow icon="🏭" label="Company" value={employee.company.name} />
          <DetailRow
            icon="📍"
            label="Office Location"
            value={`${employee.company.address.city}, ${employee.company.address.state}`}
          />
        </View>

        <Text style={[typography.labelLarge, styles.sectionTitle]}>Personal</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <DetailRow icon="🎓" label="University" value={employee.university} />
          <DetailRow icon="📅" label="Birth Date" value={employee.birthDate} />
          <DetailRow
            icon="🌍"
            label="Address"
            value={`${employee.address.city}, ${employee.address.state}`}
          />
        </View>
      </Animated.View>
    </Animated.ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingBottom: spacing[12],
    },
    // ── Hero ──────────────────────────────────────────────────────────────
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
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.9)',
      marginBottom: spacing[2],
    },
    avatarFallback: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarInitials: {
      color: '#FFFFFF',
      fontSize: 32,
      fontWeight: '700',
    },
    name: {
      color: '#FFFFFF',
      textAlign: 'center',
    },
    jobTitle: {
      color: 'rgba(255,255,255,0.72)',
      textAlign: 'center',
    },
    departmentBadge: {
      marginTop: spacing[1],
      backgroundColor: 'rgba(255,255,255,0.14)',
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[1],
    },
    departmentText: {
      color: '#FFFFFF',
      letterSpacing: 1,
    },
    // ── Sections ──────────────────────────────────────────────────────────
    sections: {
      paddingHorizontal: spacing[4],
      paddingTop: spacing[5],
    },
    sectionTitle: {
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: spacing[2],
    },
    card: {
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: spacing[4],
      marginBottom: spacing[5],
    },
  });
}
