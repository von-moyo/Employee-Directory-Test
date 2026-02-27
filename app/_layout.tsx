import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, asyncStoragePersister } from '@/store/queryClient';
import { lightColors, darkColors } from '@/theme';

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 24 * 60 * 60 * 1000, 
        buster: '1',
      }}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.header,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options={{
            title: 'Employee Directory',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              color: colors.text,
            },
            headerStatusBarHeight: 56,
          } as any}
        />
        <Stack.Screen
          name="employee/[id]"
          options={{
            title: 'Profile',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </PersistQueryClientProvider>
  );
}
