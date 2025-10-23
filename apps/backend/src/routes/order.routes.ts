import { Router } from 'express';
// @ts-ignore
import { OrderController } from '@backend/controllers/order.controller.js';
// @ts-ignore
import { OrderRepositoryMemory } from '@backend/repositories/order.repository.memory.js';

const router = Router();

const orderRepository = new OrderRepositoryMemory();
const orderController = new OrderController({ orderService: orderRepository });

router.post('/', (req, res) => orderController.create(req, res));
router.get('/', (req, res) => orderController.getAll(req, res));
router.patch('/:id/status', (req, res) => orderController.updateStatus(req, res));

export { router as orderRoutes };
