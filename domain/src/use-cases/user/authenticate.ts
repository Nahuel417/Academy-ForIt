import type { UserService } from '../../services/user-service.js';
import type { User } from '../../entities/user.js';

interface AuthenticateDeps {
    userService: UserService;
}

interface AuthenticatePayload {
    email: string;
    password: string;
}

export async function authenticate({ userService }: AuthenticateDeps, { email, password }: AuthenticatePayload) {
    const user: User | undefined = await userService.findByEmail(email);
    if (!user) return new Error('User not found');

    if (user.password !== password) return new Error('Invalid password');

    // Para simplicidad, devolvemos el user sin password como "token"
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
