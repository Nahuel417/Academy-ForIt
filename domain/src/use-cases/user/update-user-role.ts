import type { UserService } from '../../services/user-service.js';
import { type User, type UserRoleType } from '../../entities/user.js';

interface UpdateUserRoleDeps {
    userService: UserService;
}

interface UpdateUserRolePayload {
    userId: string;
    role: UserRoleType;
}

export async function updateUserRole({ userService }: UpdateUserRoleDeps, { userId, role }: UpdateUserRolePayload) {
    const user: User | undefined = await userService.findById(userId);
    if (!user) return new Error('User not found');

    user.role = role;
    await userService.editOne(user);
    return user;
}
