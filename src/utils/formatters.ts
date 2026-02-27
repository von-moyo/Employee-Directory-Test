import type { Employee } from '@/types';

export function getFullName(employee: Pick<Employee, 'firstName' | 'lastName'>): string {
  return `${employee.firstName} ${employee.lastName}`.trim();
}

export function getInitials(employee: Pick<Employee, 'firstName' | 'lastName'>): string {
  const first = employee.firstName.charAt(0).toUpperCase();
  const last = employee.lastName.charAt(0).toUpperCase();
  return `${first}${last}`;
}

export function formatPhoneNumber(phone: string): string {
  return phone;
}

export function filterEmployeesByName(employees: Employee[], query: string): Employee[] {
  if (!query.trim()) return employees;
  const lower = query.toLowerCase().trim();
  return employees.filter((emp) => {
    const fullName = getFullName(emp).toLowerCase();
    return (
      fullName.includes(lower) ||
      emp.firstName.toLowerCase().includes(lower) ||
      emp.lastName.toLowerCase().includes(lower)
    );
  });
}
