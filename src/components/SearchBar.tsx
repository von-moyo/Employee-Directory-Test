import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, spacing, fontSize } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search employees...',
}: SearchBarProps) {
  const { colors } = useTheme();
  const clearAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(clearAnim, {
      toValue: value.length > 0 ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value, clearAnim]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      <Ionicons name="search" size={18} color={colors.textTertiary} style={styles.searchIcon} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Search employees"
        accessibilityHint="Type to filter employees by name"
      />
      {value.length > 0 && (
        <Animated.View style={{ opacity: clearAnim }}>
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={styles.clearButton}
            accessibilityLabel="Clear search"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: spacing[4],
    marginVertical: spacing[3],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  searchIcon: {
    marginRight: spacing[2],
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    padding: 0,
  },
  clearButton: {
    marginLeft: spacing[2],
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#004282',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
