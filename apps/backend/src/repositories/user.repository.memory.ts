// @ts-ignore
import type { User } from 'demo-domain';
// @ts-ignore
import type { UserService } from 'demo-domain';

export class UserRepositoryMemory implements UserService {
    private users: User[] = [];

    async findById(id: string): Promise<User | undefined> {
        return this.users.find((user) => user.id === id);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }

    async save(data: User): Promise<void> {
        this.users.push(data);
    }

    async editOne(data: User): Promise<User> {
        const index = this.users.findIndex((user) => user.id === data.id);
        if (index !== -1) {
            this.users[index] = data;
            return data;
        }
        throw new Error('User not found');
    }

    async updateMany(data: User[]): Promise<User[] | undefined> {
        // Not implemented for simplicity
        return data;
    }

    async delete(id: string): Promise<void> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
