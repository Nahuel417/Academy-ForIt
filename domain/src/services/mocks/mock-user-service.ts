import type { User } from '../../entities/user.js';
import type { UserService } from '../user-service.js';

export class MockedUserService implements UserService {
    users: User[] = [];

    constructor(initialUsers: User[] = []) {
        this.users = initialUsers;
    }

    // Métodos del Service genérico
    save = async (data: User): Promise<void> => {
        this.users.push(data);
    };

    findAll = async (): Promise<User[]> => {
        return this.users;
    };

    findById = async (id: string): Promise<User | undefined> => {
        return this.users.find((u) => u.id === id);
    };

    editOne = async (data: User): Promise<User> => {
        const index = this.users.findIndex((u) => u.id === data.id);
        if (index === -1) throw new Error('User not found');
        this.users[index] = data;
        return this.users[index];
    };

    updateMany = async (data: User[]): Promise<User[] | undefined> => {
        data.forEach((d) => {
            const index = this.users.findIndex((u) => u.id === d.id);
            if (index !== -1) this.users[index] = d;
        });
        return data;
    };

    delete = async (id: string): Promise<void> => {
        this.users = this.users.filter((u) => u.id !== id);
    };

    // Métodos específicos de UserService
    findByEmail = async (email: string): Promise<User | undefined> => {
        return this.users.find((u) => u.email === email);
    };
}
