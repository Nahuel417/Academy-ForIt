import type { User } from '../entities/user.js';
import type { Service } from '../utils/types/service.js';

export interface UserService extends Service<User> {
    findByEmail: (email: string) => Promise<User | undefined>;
}
