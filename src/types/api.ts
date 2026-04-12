export interface Address {
    address: string;
    city: string;
    state: string;
    postalCode: string; // Used properly across DummyJSON
}

export interface Donor {
    id: number;
    firstName: string;
    lastName: string;
    bloodGroup: string;
    address: Address;
    image: string;
    phone: string;
    email: string;
    // Add any other attributes useful if needed, ignoring the rest for strictness/cleanliness
}

export interface UserLoginResponse extends Donor {
    token: string;
    refreshToken: string;
}

export interface ApiResponse<T> {
    users: T[];
    total: number;
    skip: number;
    limit: number;
}

export interface Hospital {
    id: number;
    name: string;
    address: Address;
    urgencyLevel: 'Normal' | 'High' | 'Critical';
    bloodTypesNeeded: string[];
    image: string;
    contact: string;
}

export interface LocalDonorAccount extends Donor {
    password?: string;
    username: string;
}
