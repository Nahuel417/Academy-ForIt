import { Router } from 'express';
// @ts-ignore
import { BudgetController } from '@backend/controllers/budget.controller.js';
// @ts-ignore
import { BudgetRepositoryMemory } from '@backend/repositories/budget.repository.memory.js';
// @ts-ignore
import { AuthMiddleware } from '@backend/middlewares/auth.middleware.js';

const router = Router();

const budgetRepository = new BudgetRepositoryMemory();
const budgetController = new BudgetController({ budgetService: budgetRepository });

// Protected routes - require employee role or higher
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => budgetController.create(req, res));
router.get('/', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => budgetController.getAll(req, res));

export { router as budgetRoutes };
