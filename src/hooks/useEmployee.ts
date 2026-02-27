import { useQuery } from '@tanstack/react-query';
import { employeesApi } from '@/api';
import { queryKeys } from './queryKeys';

export function useEmployee(id: number) {
  return useQuery({
    queryKey: queryKeys.employees.detail(id),
    queryFn: () => employeesApi.getById(id),
    staleTime: 5 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,  
    retry: 2,
    enabled: id > 0,
  });
}
