import { faker } from '@faker-js/faker';
import { UserRole, type User, type UserRoleType } from '../user.js';

export function userMock(opts?: Partial<User>): User {
    return {
        id: crypto.randomUUID(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(Object.values(UserRole)) as UserRoleType,
        createdAt: new Date(),
        ...opts,
    };
}
