import {
  getFullName,
  getInitials,
  filterEmployeesByName,
} from '../../src/utils/formatters';
import type { Employee } from '../../src/types';

const mockEmployee: Employee = {
  id: 1,
  firstName: 'Emily',
  lastName: 'Johnson',
  maidenName: 'Smith',
  age: 29,
  gender: 'female',
  email: 'emily.johnson@x.dummyjson.com',
  phone: '+81 965-431-3024',
  username: 'emilys',
  password: 'emilyspass',
  birthDate: '1996-5-30',
  image: 'https://dummyjson.com/icon/emilys/128',
  bloodGroup: 'O-',
  height: 193.24,
  weight: 63.16,
  eyeColor: 'Green',
  hair: { color: 'Brown', type: 'Curly' },
  ip: '42.48.100.32',
  address: {
    address: '626 Main Street',
    city: 'Phoenix',
    state: 'Mississippi',
    stateCode: 'MS',
    postalCode: '29112',
    coordinates: { lat: -77.16213, lng: -92.084824 },
    country: 'United States',
  },
  macAddress: '47:fa:41:18:ec:eb',
  university: 'University of Wisconsin--Madison',
  bank: {
    cardExpire: '05/28',
    cardNumber: '3693233511855044',
    cardType: 'Diners Club International',
    currency: 'GBP',
    iban: 'GB74MH2UZLR9TRPHYNU8F8',
  },
  company: {
    department: 'Engineering',
    name: 'Dooley, Kozey and Cronin',
    title: 'Sales Manager',
    address: {
      address: '263 Tenth Street',
      city: 'San Francisco',
      state: 'Wisconsin',
      stateCode: 'WI',
      postalCode: '37657',
      coordinates: { lat: 71.814525, lng: -161.150263 },
      country: 'United States',
    },
  },
  ein: '977-175',
  ssn: '900-590-289',
  userAgent: 'Mozilla/5.0',
  crypto: {
    coin: 'Bitcoin',
    wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
    network: 'Ethereum (ERC20)',
  },
  role: 'admin',
};

describe('formatters', () => {
  describe('getFullName', () => {
    it('returns full name with first and last name', () => {
      expect(getFullName(mockEmployee)).toBe('Emily Johnson');
    });

    it('handles extra whitespace trimming', () => {
      expect(getFullName({ firstName: '  Jane ', lastName: '  Doe  ' })).toBe(
        'Jane    Doe',
      );
    });
  });

  describe('getInitials', () => {
    it('returns uppercase initials', () => {
      expect(getInitials(mockEmployee)).toBe('EJ');
    });

    it('returns initials for lowercase names', () => {
      expect(getInitials({ firstName: 'alice', lastName: 'bob' })).toBe('AB');
    });
  });

  describe('filterEmployeesByName', () => {
    const employees = [
      mockEmployee,
      { ...mockEmployee, id: 2, firstName: 'John', lastName: 'Smith' },
      { ...mockEmployee, id: 3, firstName: 'Jane', lastName: 'Doe' },
    ];

    it('returns all employees when query is empty', () => {
      expect(filterEmployeesByName(employees, '')).toHaveLength(3);
    });

    it('filters by first name (case insensitive)', () => {
      const result = filterEmployeesByName(employees, 'emily');
      expect(result).toHaveLength(1);
      expect(result[0].firstName).toBe('Emily');
    });

    it('filters by last name', () => {
      const result = filterEmployeesByName(employees, 'smith');
      expect(result).toHaveLength(1);
      expect(result[0].lastName).toBe('Smith');
    });

    it('filters by full name', () => {
      const result = filterEmployeesByName(employees, 'jane doe');
      expect(result).toHaveLength(1);
      expect(result[0].firstName).toBe('Jane');
    });

    it('returns empty array when no match', () => {
      expect(filterEmployeesByName(employees, 'zzz')).toHaveLength(0);
    });

    it('trims whitespace from query', () => {
      const result = filterEmployeesByName(employees, '  john smith  ');
      expect(result).toHaveLength(1);
      expect(result[0].firstName).toBe('John');
    });
  });
});
