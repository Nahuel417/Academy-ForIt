import { Router } from 'express';
// @ts-ignore
import { OrderController } from '@backend/controllers/order.controller.js';
// @ts-ignore
import { OrderRepositoryMemory } from '@backend/repositories/order.repository.memory.js';
// @ts-ignore
import { AuthMiddleware } from '@backend/middlewares/auth.middleware.js';

const router = Router();

const orderRepository = new OrderRepositoryMemory();
const orderController = new OrderController({ orderService: orderRepository });

// Protected routes - require employee role or higher
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => orderController.create(req, res));
router.get('/', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => orderController.getAll(req, res));
router.patch('/:id/status', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => orderController.updateStatus(req, res));

export { router as orderRoutes };
