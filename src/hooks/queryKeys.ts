export const queryKeys = {
  employees: {
    all: ['employees'] as const,
    lists: () => [...queryKeys.employees.all, 'list'] as const,
    list: () => [...queryKeys.employees.lists()] as const,
    details: () => [...queryKeys.employees.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.employees.details(), id] as const,
  },
} as const;
