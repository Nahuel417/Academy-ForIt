import type { Entity } from '../utils/types/entity.js';

export const UserRole = {
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface User extends Entity {
    email: string;
    password: string;
    role: UserRoleType;
    createdAt: Date;
}

export type SecureUser = Omit<User, 'password'>;
