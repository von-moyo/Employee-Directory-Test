# Employee Directory App

A production-quality React Native mobile application built with **Expo** and **TypeScript**. Browse, search, and explore employee profiles with a clean, modern UI that adapts to light and dark mode.

---

## Screenshots

| Employee List | Search | Employee Detail |
|---|---|---|
| Skeleton loading → FlatList with cards | Real-time client-side filtering | Animated profile with sections |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) (SDK 54) + React Native 0.81 |
| Language | TypeScript (strict mode) |
| Navigation | [Expo Router](https://expo.github.io/router) v6 (file-based) |
| Data Fetching | [@tanstack/react-query](https://tanstack.com/query) v5 |
| HTTP Client | [Axios](https://axios-http.com) v1 |
| Offline Cache | React Query Persist + AsyncStorage |
| Testing | Jest v29 + React Native Testing Library |
| Animations | React Native `Animated` API |
| Dark Mode | System-based via `useColorScheme` |

---

## Features

### Core
- **Employee List** — FlatList with pull-to-refresh, skeleton loading, and error retry
- **Search** — Real-time client-side filtering by first name, last name, or full name
- **Employee Details** — Profile photo, contact info, work details, and personal section
- **Navigation** — Expo Router file-based routing with smooth animated transitions

### Bonus
- **Offline Caching** — React Query data persisted to AsyncStorage (24-hour TTL)
- **Dark Mode** — Automatic system-based theme with full color token support
- **Animations** — Fade-in list items (staggered), scale press feedback, slide-up details
- **Unit Tests** — 24 tests across components, hooks, and utility functions

---

## Project Structure

```
employee-directory/
├── app/                        # Expo Router screens (file-based routing)
│   ├── _layout.tsx             # Root layout — QueryClientProvider + Stack navigator
│   ├── index.tsx               # Home screen — Employee list with search
│   └── employee/
│       └── [id].tsx            # Dynamic route — Employee detail screen
│
├── src/
│   ├── api/
│   │   ├── client.ts           # Axios instance with interceptors
│   │   ├── employees.ts        # Employee API methods (getAll, getById)
│   │   └── index.ts
│   │
│   ├── components/
│   │   ├── EmployeeCard.tsx    # List card with fade-in animation
│   │   ├── SearchBar.tsx       # Search input with animated clear button
│   │   ├── LoadingState.tsx    # Animated skeleton loader
│   │   ├── ErrorState.tsx      # Error display with retry button
│   │   ├── EmptyState.tsx      # Empty search results display
│   │   ├── DetailRow.tsx       # Reusable detail info row
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── queryKeys.ts        # Centralized React Query key factory
│   │   ├── useEmployees.ts     # Fetch all employees
│   │   ├── useEmployee.ts      # Fetch single employee by ID
│   │   └── index.ts
│   │
│   ├── store/
│   │   └── queryClient.ts      # QueryClient + AsyncStorage persister
│   │
│   ├── theme/
│   │   ├── colors.ts           # Light & dark color tokens
│   │   ├── typography.ts       # Font sizes, weights, and text styles
│   │   ├── spacing.ts          # Spacing scale and border radii
│   │   └── index.ts            # useTheme() hook
│   │
│   ├── types/
│   │   ├── employee.ts         # Full Employee interface (matches DummyJSON API)
│   │   └── index.ts
│   │
│   └── utils/
│       ├── formatters.ts       # getFullName, getInitials, filterEmployeesByName
│       └── index.ts
│
├── __tests__/
│   ├── components/
│   │   ├── EmployeeCard.test.tsx
│   │   └── SearchBar.test.tsx
│   ├── hooks/
│   │   └── useEmployees.test.ts
│   └── utils/
│       └── formatters.test.ts
│
├── assets/                     # Icons and splash screen
├── app.json                    # Expo configuration
├── babel.config.js             # Babel + module-resolver for path aliases
├── jest.setup.js               # Jest global mocks (expo-router, AsyncStorage)
├── tsconfig.json               # TypeScript config with @/ path alias
└── package.json
```

---

## Architecture Decisions

### 1. Expo Router (File-based Routing)
Routes are derived from the file system under `/app`. This gives typed routes, deep linking support, and removes boilerplate navigation code. The `_layout.tsx` at the root wraps the entire app with `QueryClientProvider`.

### 2. React Query v5 with Persistence
- **5-minute stale time** — data is fresh for 5 minutes before a background refetch
- **30-minute GC time** — unused queries stay in cache for 30 minutes
- **AsyncStorage persistence** — cached data survives app restarts (24-hour TTL)
- **Query key factory** — centralized `queryKeys` object prevents key collisions

### 3. Axios API Layer
A single `apiClient` instance with base URL, timeout, and response interceptors. All API calls go through `employeesApi` which returns typed responses. Error messages from the server are normalized into `Error` objects.

### 4. Theme System
The `useTheme()` hook reads `useColorScheme()` and returns the appropriate color set (light/dark), plus typography, spacing, and border radius tokens. Components call `makeStyles(colors)` inside the component body so styles react to theme changes without re-renders.

### 5. TypeScript Path Aliases
`@/` maps to `./src/` via both `tsconfig.json` (for type checking) and `babel-plugin-module-resolver` (for runtime). Tests use `moduleNameMapper` in Jest config.

### 6. FlatList Optimization
- `removeClippedSubviews` on Android
- `initialNumToRender={12}`, `maxToRenderPerBatch={10}`, `windowSize={10}`
- `getItemLayout` for fixed card heights (eliminates layout measurement overhead)
- `useCallback` for `renderItem` and `keyExtractor`

---

## API Reference

**Base URL:** `https://dummyjson.com`

| Endpoint | Description |
|---|---|
| `GET /users?limit=100` | Fetch up to 100 employees |
| `GET /users/:id` | Fetch single employee by ID |

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app on your iOS/Android device (or a simulator)

### Steps

```bash
# 1. Clone or navigate to the project
cd employee-directory

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

Then:
- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with **Expo Go** on your physical device

---

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Summary
| Suite | Tests |
|---|---|
| `formatters.test.ts` | 10 tests — string formatting + filtering |
| `EmployeeCard.test.tsx` | 5 tests — render, press, accessibility |
| `SearchBar.test.tsx` | 6 tests — input, clear button, callbacks |
| `useEmployees.test.ts` | 3 tests — loading, success, error states |
| **Total** | **24 tests** |

---

## Type Checking

```bash
npm run type-check
```

---

## Environment

The app uses `https://dummyjson.com` as the API. No environment variables are required for development.

To change the API base URL, edit [src/api/client.ts](src/api/client.ts):

```ts
const BASE_URL = 'https://your-api.com';
```

---

## Scaling

This project is structured to scale:

1. **Add new screens** — drop a file in `/app/`
2. **Add new API endpoints** — add a method to `src/api/employees.ts`
3. **Add new hooks** — create in `src/hooks/`, export from `src/hooks/index.ts`
4. **Add new components** — create in `src/components/`, export from index
5. **Extend the theme** — add tokens to `src/theme/colors.ts`

---

## License

MIT
