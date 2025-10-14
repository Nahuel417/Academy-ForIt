import { describe, expect, test, beforeEach } from 'vitest';
import { updateUserRole } from './update-user-role.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';
import { UserRole } from '../../entities/user.js';

describe('updateUserRole use-case', () => {
    let userService: MockedUserService;

    beforeEach(() => {
        userService = new MockedUserService([userMock({ id: '1', email: 'user@gmail.com', password: 'pass123', role: UserRole.EMPLOYEE })]);
    });

    test('should update role if user exists', async () => {
        const result = await updateUserRole({ userService }, { userId: '1', role: UserRole.ADMIN });

        if (!(result instanceof Error)) {
            expect(result).toBeDefined();
            expect(result?.role).toBe(UserRole.ADMIN);
        } else {
            throw new Error('Expected result to be a role object, but got an Error');
        }
    });

    test('should return error if user not found', async () => {
        const result = await updateUserRole({ userService }, { userId: '2', role: UserRole.ADMIN });
        expect(result).toBeInstanceOf(Error);
        expect((result as Error)?.message).toBe('User not found');
    });
});
