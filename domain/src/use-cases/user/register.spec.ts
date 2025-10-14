import { describe, expect, test, beforeEach } from 'vitest';
import { register } from './register.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';
import { UserRole } from '../../entities/user.js';

describe('register use-case', () => {
    let userService: MockedUserService;

    beforeEach(() => {
        userService = new MockedUserService([userMock({ id: '1', email: 'existing@gmail.com', password: 'pass1234', role: UserRole.EMPLOYEE })]);
    });

    test('should save a new user if email is not taken', async () => {
        const payload = { email: 'new@gmail.com', password: '1234', role: UserRole.ADMIN };

        const result = await register({ userService }, payload);

        // No debe devolver error
        expect(result).toBeUndefined();

        // Debe haber dos usuarios
        expect(userService.users).toHaveLength(2);

        // Tomamos el usuario recién agregado
        const newUser = userService.users[1];
        expect(newUser).toBeDefined();

        // Verificaciones de propiedades
        expect(newUser?.id).toEqual(expect.any(String));
        expect(newUser?.createdAt).toBeInstanceOf(Date);
        expect(newUser?.email).toBe('new@gmail.com');
        expect(newUser?.password).toBe('1234');
        expect(newUser?.role).toBe(UserRole.ADMIN);
    });

    test('should return an error if email already exists', async () => {
        const payload = { email: 'existing@gmail.com', password: '1234' };

        const result = await register({ userService }, payload);

        expect(result).toBeInstanceOf(Error);
        expect(result?.message).toBe('User already exists');

        // No se agrega un nuevo usuario
        expect(userService.users).toHaveLength(1);
    });

    test('should default role to EMPLOYEE if not provided', async () => {
        const payload = { email: 'another@gmail.com', password: 'abcd' };

        const result = await register({ userService }, payload);

        expect(result).toBeUndefined();

        const newUser = userService.users[1];
        expect(newUser).toBeDefined();
        expect(newUser?.role).toBe(UserRole.EMPLOYEE);
    });
});
