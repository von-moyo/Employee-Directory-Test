import { useQuery } from '@tanstack/react-query';
import { employeesApi } from '@/api';
import { queryKeys } from './queryKeys';

export function useEmployees() {
  return useQuery({
    queryKey: queryKeys.employees.list(),
    queryFn: employeesApi.getAll,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,   
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
