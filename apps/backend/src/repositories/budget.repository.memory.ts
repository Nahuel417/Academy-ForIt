// @ts-ignore
import type { Budget } from 'demo-domain';
// @ts-ignore
import type { BudgetService } from 'demo-domain';

export class BudgetRepositoryMemory implements BudgetService {
    private budgets: Budget[] = [];

    async findById(id: string): Promise<Budget | undefined> {
        return this.budgets.find((budget) => budget.id === id);
    }

    async findAll(): Promise<Budget[]> {
        return this.budgets;
    }

    async findByClientName(name: string): Promise<Budget[]> {
        return this.budgets.filter((budget) =>
            budget.clientName.toLowerCase().includes(name.toLowerCase())
        );
    }

    async save(data: Budget): Promise<void> {
        this.budgets.push(data);
    }

    async editOne(data: Budget): Promise<Budget> {
        const index = this.budgets.findIndex((budget) => budget.id === data.id);
        if (index !== -1) {
            this.budgets[index] = data;
            return data;
        }
        throw new Error('Budget not found');
    }

    async updateMany(data: Budget[]): Promise<Budget[] | undefined> {
        // Not implemented for simplicity
        return data;
    }

    async delete(id: string): Promise<void> {
        const index = this.budgets.findIndex((budget) => budget.id === id);
        if (index !== -1) {
            this.budgets.splice(index, 1);
        }
    }
}
