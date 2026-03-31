export interface Address {
  address: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Company {
  title: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  bloodGroup: string;
  height: number;
  university: string;
  address: Address;
  company: Company;
  pass?: string; // Kept tentatively for local dummy storage
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface APIResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
