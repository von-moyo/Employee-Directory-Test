import { apiClient } from './client';
import type { Employee, EmployeesResponse } from '@/types';

const EMPLOYEES_LIMIT = 100;

export const employeesApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get<EmployeesResponse>('/users', {
      params: { limit: EMPLOYEES_LIMIT },
    });
    return response.data.users;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await apiClient.get<Employee>(`/users/${id}`);
    return response.data;
  },
};
