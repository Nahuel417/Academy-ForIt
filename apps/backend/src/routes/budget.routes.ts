import { Router } from 'express';
// @ts-ignore
import { BudgetController } from '@backend/controllers/budget.controller.js';
// @ts-ignore
import { BudgetRepositoryMemory } from '@backend/repositories/budget.repository.memory.js';

const router = Router();

const budgetRepository = new BudgetRepositoryMemory();
const budgetController = new BudgetController({ budgetService: budgetRepository });

router.post('/', (req, res) => budgetController.create(req, res));
router.get('/', (req, res) => budgetController.getAll(req, res));

export { router as budgetRoutes };
