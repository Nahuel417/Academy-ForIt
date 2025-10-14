import type { Budget } from '../../entities/budget.js';
import type { BudgetService } from '../budget-service.js';

export class MockedBudgetService implements BudgetService {
    budgets: Budget[] = [];

    constructor(initialBudgets: Budget[] = []) {
        this.budgets = initialBudgets;
    }

    save = async (data: Budget): Promise<void> => {
        this.budgets.push(data);
    };

    findAll = async (): Promise<Budget[]> => this.budgets;

    findById = async (id: string): Promise<Budget | undefined> => this.budgets.find((b) => b.id === id);

    editOne = async (data: Budget): Promise<Budget> => {
        const index = this.budgets.findIndex((b) => b.id === data.id);
        if (index === -1) throw new Error('Budget not found');
        this.budgets[index] = data;
        return this.budgets[index];
    };

    updateMany = async (data: Budget[]): Promise<Budget[] | undefined> => {
        data.forEach((d) => {
            const index = this.budgets.findIndex((b) => b.id === d.id);
            if (index !== -1) this.budgets[index] = d;
        });
        return data;
    };

    delete = async (id: string): Promise<void> => {
        this.budgets = this.budgets.filter((b) => b.id !== id);
    };

    findByClientName = async (name: string): Promise<Budget[]> => this.budgets.filter((b) => b.clientName === name);
}
