// Mock Expo Router for tests
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
  useLocalSearchParams: () => ({}),
  useNavigation: () => ({
    setOptions: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  Stack: {
    Screen: ({ children }) => children ?? null,
  },
  Link: ({ children }) => children,
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Silence specific warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      args[0]?.includes?.('react-native-screens') ||
      args[0]?.includes?.('useNativeDriver')
    ) {
      return;
    }
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
