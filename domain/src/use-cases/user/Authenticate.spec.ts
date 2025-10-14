import { describe, expect, test, beforeEach } from 'vitest';
import { authenticate } from './authenticate.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';

describe('authenticate use-case', () => {
    let userService: MockedUserService;

    beforeEach(() => {
        userService = new MockedUserService([userMock({ id: '1', email: 'user@gmail.com', password: 'pass123', role: 'EMPLOYEE' })]);
    });

    test('should return user without password if credentials are correct', async () => {
        const result = await authenticate({ userService }, { email: 'user@gmail.com', password: 'pass123' });

        if (!(result instanceof Error)) {
            expect(result).toBeDefined();
            expect(result).not.toHaveProperty('password');
            expect(result.email).toBe('user@gmail.com');
        } else {
            throw new Error('Expected result to be a user object, but got an Error');
        }
    });

    test('should return error if user not found', async () => {
        const result = await authenticate({ userService }, { email: 'notfound@gmail.com', password: '123' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error)?.message).toBe('User not found');
    });

    test('should return error if password is invalid', async () => {
        const result = await authenticate({ userService }, { email: 'user@gmail.com', password: 'wrongpass' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error)?.message).toBe('Invalid password');
    });
});
