import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmployeeCard } from '../../src/components/EmployeeCard';
import type { Employee } from '../../src/types';

const mockEmployee: Employee = {
  id: 1,
  firstName: 'Emily',
  lastName: 'Johnson',
  maidenName: 'Smith',
  age: 29,
  gender: 'female',
  email: 'emily@test.com',
  phone: '+1 555-0000',
  username: 'emilys',
  password: 'pass',
  birthDate: '1996-05-30',
  image: 'https://dummyjson.com/icon/emilys/128',
  bloodGroup: 'O-',
  height: 170,
  weight: 60,
  eyeColor: 'Blue',
  hair: { color: 'Brown', type: 'Straight' },
  ip: '0.0.0.0',
  address: {
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    stateCode: 'IL',
    postalCode: '62701',
    coordinates: { lat: 0, lng: 0 },
    country: 'United States',
  },
  macAddress: '00:00:00:00:00:00',
  university: 'Test University',
  bank: {
    cardExpire: '01/25',
    cardNumber: '1234',
    cardType: 'Visa',
    currency: 'USD',
    iban: 'US00',
  },
  company: {
    department: 'Engineering',
    name: 'Test Corp',
    title: 'Software Engineer',
    address: {
      address: '456 Corp Ave',
      city: 'San Francisco',
      state: 'CA',
      stateCode: 'CA',
      postalCode: '94105',
      coordinates: { lat: 0, lng: 0 },
      country: 'United States',
    },
  },
  ein: '00-0000',
  ssn: '000-00-0000',
  userAgent: 'test',
  crypto: { coin: 'Bitcoin', wallet: '0x0', network: 'ETH' },
  role: 'user',
};

describe('EmployeeCard', () => {
  it('renders employee full name', () => {
    const { getByText } = render(
      <EmployeeCard employee={mockEmployee} onPress={jest.fn()} />,
    );
    expect(getByText('Emily Johnson')).toBeTruthy();
  });

  it('renders job title', () => {
    const { getByText } = render(
      <EmployeeCard employee={mockEmployee} onPress={jest.fn()} />,
    );
    expect(getByText('Software Engineer')).toBeTruthy();
  });

  it('renders department badge', () => {
    const { getByText } = render(
      <EmployeeCard employee={mockEmployee} onPress={jest.fn()} />,
    );
    expect(getByText('ENGINEERING')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <EmployeeCard employee={mockEmployee} onPress={onPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledWith(mockEmployee);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility label', () => {
    const { getByLabelText } = render(
      <EmployeeCard employee={mockEmployee} onPress={jest.fn()} />,
    );
    expect(getByLabelText('View profile of Emily Johnson')).toBeTruthy();
  });
});
