export interface EmployeeAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface EmployeeCompany {
  department: string;
  name: string;
  title: string;
  address: EmployeeAddress;
}

export interface EmployeeHair {
  color: string;
  type: string;
}

export interface EmployeeBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface EmployeeCrypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: EmployeeHair;
  ip: string;
  address: EmployeeAddress;
  macAddress: string;
  university: string;
  bank: EmployeeBank;
  company: EmployeeCompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: EmployeeCrypto;
  role: string;
}

export interface EmployeesResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}

export type EmployeeListItem = Pick<
  Employee,
  'id' | 'firstName' | 'lastName' | 'image' | 'company'
>;
