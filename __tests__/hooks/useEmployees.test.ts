import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useEmployees } from '../../src/hooks/useEmployees';
import { employeesApi } from '../../src/api/employees';

jest.mock('../../src/api/employees');

const mockedGetAll = employeesApi.getAll as jest.MockedFunction<
  typeof employeesApi.getAll
>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe('useEmployees', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    mockedGetAll.mockResolvedValue([]);
    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns employees on success', async () => {
    const mockEmployees = [
      { id: 1, firstName: 'Emily', lastName: 'Johnson' },
    ] as any[];
    mockedGetAll.mockResolvedValue(mockEmployees);

    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockEmployees);
  });

  it('returns error state on failure', async () => {
    mockedGetAll.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => expect(result.current.isError).toBe(true),
      { timeout: 5000 },
    );
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
