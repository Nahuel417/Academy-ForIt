import { Router } from 'express';
// @ts-ignore
import { UserController } from '@backend/controllers/user.controller.js';
// @ts-ignore
import { UserRepositoryMemory } from '@backend/repositories/user.repository.memory.js';
// @ts-ignore
import { AuthMiddleware } from '@backend/middlewares/auth.middleware.js';

const router = Router();

const userRepository = new UserRepositoryMemory();
const userController = new UserController({ userService: userRepository });

// Public routes
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));

// Protected routes - require admin role
router.patch('/:id/role', AuthMiddleware.authenticate, AuthMiddleware.requireAdmin, (req, res) => userController.updateRole(req, res));

export { router as userRoutes };
