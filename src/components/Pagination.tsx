import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { useTheme, fontSize, fontWeight } from '@/theme';

const ACCENT = '#004282';
const BTN_H = 28;
const PILL_SIZE = 28;

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

// ─── Page window algorithm ────────────────────────────────────────────────────
type PageSlot = number | 'left-dots' | 'right-dots';

function getPageSlots(current: number, total: number): PageSlot[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'right-dots', total];
  }
  if (current >= total - 3) {
    return [1, 'left-dots', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, 'left-dots', current - 1, current, current + 1, 'right-dots', total];
}

// ─── Page number pill ─────────────────────────────────────────────────────────
interface PagePillProps {
  page: number;
  isActive: boolean;
  onPress: (page: number) => void;
}

function PagePill({ page, isActive, onPress }: PagePillProps) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.82, duration: 75, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 60, bounciness: 8 }),
    ]).start();
    onPress(page);
  }, [scaleAnim, onPress, page]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.pill,
          isActive
            ? { backgroundColor: ACCENT, borderColor: ACCENT }
            : { backgroundColor: 'transparent', borderColor: colors.border },
        ]}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={`Go to page ${page}`}
        accessibilityState={{ selected: isActive }}
      >
        <Text style={[styles.pillLabel, { color: isActive ? '#FFFFFF' : colors.textSecondary }]}>
          {page}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Nav arrow button ─────────────────────────────────────────────────────────
interface NavButtonProps {
  label: string;
  arrow: string;
  side: 'left' | 'right';
  disabled: boolean;
  onPress: () => void;
}

function NavButton({ label, arrow, side, disabled, onPress }: NavButtonProps) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = useCallback(() => {
    if (disabled) return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 70, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 60 }),
    ]).start();
    onPress();
  }, [disabled, scaleAnim, onPress]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.navBtn,
          {
            backgroundColor: colors.surfaceSecondary,
            borderColor: colors.border,
            opacity: disabled ? 0.35 : 1,
          },
        ]}
        disabled={disabled}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
      >
        {side === 'left' && <Text style={styles.navArrow}>{arrow}</Text>}
        <Text style={[styles.navLabel, { color: colors.text }]}>{label}</Text>
        {side === 'right' && <Text style={styles.navArrow}>{arrow}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Main Pagination component ────────────────────────────────────────────────
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  hasPrev,
  hasNext,
  onPageChange,
}: PaginationProps) {
  const { colors } = useTheme();

  if (totalPages <= 1) return null;

  const slots = getPageSlots(currentPage, totalPages);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderTopColor: colors.border },
      ]}
    >
      {/* ── Row 1: range label ── */}
      <Text style={[styles.rangeText, { color: colors.textTertiary }]}>
        {startIndex}
        <Text style={styles.rangeSep}> – </Text>
        <Text>{endIndex}</Text>
        <Text> of </Text>
        <Text style={[styles.rangeTotal, { color: colors.text }]}>{totalItems}</Text>
        <Text> employees</Text>
      </Text>

      {/* ── Row 2: Prev · pills · Next ── */}
      <View style={styles.controlsRow}>
        <NavButton
          label="Prev"
          arrow="‹"
          side="left"
          disabled={!hasPrev}
          onPress={() => onPageChange(currentPage - 1)}
        />

        <View style={styles.pillsRow}>
          {slots.map((slot, i) => {
            if (slot === 'left-dots' || slot === 'right-dots') {
              return (
                <Text key={`dots-${i}`} style={[styles.dots, { color: colors.textTertiary }]}>
                  ···
                </Text>
              );
            }
            return (
              <PagePill
                key={slot}
                page={slot}
                isActive={slot === currentPage}
                onPress={onPageChange}
              />
            );
          })}
        </View>

        <NavButton
          label="Next"
          arrow="›"
          side="right"
          disabled={!hasNext}
          onPress={() => onPageChange(currentPage + 1)}
        />
      </View>

      {/* ── Progress bar ── */}
      <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${(currentPage / totalPages) * 100}%` as any },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    }),
  },
  rangeText: {
    fontSize: fontSize.xs,
    marginBottom: 8,
  },
  rangeSep: {
    color: ACCENT,
    fontWeight: '600',
  },
  rangeTotal: {
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  pill: {
    width: PILL_SIZE,
    height: PILL_SIZE,
    borderRadius: PILL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  pillLabel: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    height: BTN_H,
    borderRadius: BTN_H / 2,
    borderWidth: 1.5,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: fontWeight.semibold,
  },
  navArrow: {
    fontSize: 14,
    fontWeight: fontWeight.bold,
    color: ACCENT,
    lineHeight: 16,
  },
  dots: {
    width: 20,
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 1,
  },
  progressTrack: {
    height: 2,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
    backgroundColor: ACCENT,
  },
});
