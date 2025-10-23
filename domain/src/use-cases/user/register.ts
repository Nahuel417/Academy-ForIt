import { UserRole, type User, type UserRoleType } from '../../entities/user.js';
import type { UserService } from '../../services/user-service.js';

interface RegisterDeps {
    userService: UserService;
}

interface RegisterPayload {
    email: string;
    password: string;
    role?: UserRoleType;
}

export async function register({ userService }: RegisterDeps, { email, password, role }: RegisterPayload) {
    const foundUser = await userService.findByEmail(email);
    if (foundUser) return new Error('User already exists');

    const newUser: User = {
        id: crypto.randomUUID(),
        email,
        password,
        role: role ?? UserRole.EMPLOYEE,
        createdAt: new Date(),
    };

    await userService.save(newUser);
    return newUser;
}
