export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface UserRegistration extends UserCredentials {
    name: string;
    phone?: string;
}
