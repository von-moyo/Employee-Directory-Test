import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Platform,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEmployees, usePagination } from '@/hooks';
import { Pagination } from '@/components/Pagination';
import {
  EmployeeCard,
  SearchBar,
  LoadingState,
  ErrorState,
  EmptyState,
} from '@/components';
import { useTheme, spacing } from '@/theme';
import { filterEmployeesByName } from '@/utils';
import type { Employee } from '@/types';

const PAGE_SIZE = 20;

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { data: employees, isLoading, isError, error, refetch } = useEmployees();

  const filteredEmployees = useMemo(
    () => filterEmployeesByName(employees ?? [], searchQuery),
    [employees, searchQuery],
  );

  const {
    currentPage,
    totalPages,
    paginatedItems,
    startIndex,
    endIndex,
    hasPrev,
    hasNext,
    goToPage,
  } = usePagination(filteredEmployees, PAGE_SIZE);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handleEmployeePress = useCallback(
    (employee: Employee) => {
      router.push(`/employee/${employee.id}`);
    },
    [router],
  );

  // Animate page transitions: fade out → scroll to top → fade in
  const handlePageChange = useCallback(
    (page: number) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }).start(() => {
        goToPage(page);
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    },
    [fadeAnim, goToPage],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Employee; index: number }) => (
      <EmployeeCard employee={item} onPress={handleEmployeePress} index={index} />
    ),
    [handleEmployeePress],
  );

  const keyExtractor = useCallback((item: Employee) => item.id.toString(), []);

  const styles = makeStyles(colors);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <LoadingState />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load employees. Please try again.'
          }
          onRetry={refetch}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scrollable list — sits above the fixed pagination bar */}
      <Animated.View style={[styles.listWrapper, { opacity: fadeAnim }]}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        {employees && filteredEmployees.length > 0 && (
          <Text style={styles.count}>
            {filteredEmployees.length}{' '}
            {filteredEmployees.length !== 1 ? 'EMPLOYEES' : 'EMPLOYEE'}
          </Text>
        )}
        <FlatList
          ref={flatListRef}
          data={paginatedItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyState searchQuery={searchQuery} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
          initialNumToRender={PAGE_SIZE}
          maxToRenderPerBatch={PAGE_SIZE}
          windowSize={5}
        />
      </Animated.View>

      {/* Fixed pagination bar — always visible at the bottom */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredEmployees.length}
        startIndex={startIndex}
        endIndex={endIndex}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPageChange={handlePageChange}
      />
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listWrapper: {
      flex: 1,
    },
    listContent: {
      paddingBottom: spacing[4],
      flexGrow: 1,
    },
    count: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 1,
      color: colors.primary,
      marginHorizontal: spacing[4],
      marginBottom: spacing[2],
    },
  });
}
