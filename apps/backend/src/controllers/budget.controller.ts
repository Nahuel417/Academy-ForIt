// @ts-ignore
import type { Request, Response } from 'express';
// @ts-ignore
import { createBudget, getBudgetsList } from 'demo-domain';
// @ts-ignore
import type { BudgetService } from 'demo-domain';

interface BudgetControllerDeps {
  budgetService: BudgetService;
}

export class BudgetController {
  constructor(private deps: BudgetControllerDeps) {}

  async create(req: Request, res: Response) {
    try {
      const { clientName, items } = req.body;

      const result = await createBudget(this.deps, { clientName, items });

      if (result instanceof Error) {
        return res.status(400).json({ error: result.message });
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const budgets = await getBudgetsList(this.deps);
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
