import type { Budget } from '../entities/budget.js';
import type { Service } from '../utils/types/service.js';

export interface BudgetService extends Service<Budget> {
    findByClientName(name: string): Promise<Budget[]>;
}
