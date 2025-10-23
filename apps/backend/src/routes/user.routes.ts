import { Router } from 'express';
// @ts-ignore
import { UserController } from '@backend/controllers/user.controller.js';
// @ts-ignore
import { UserRepositoryMemory } from '@backend/repositories/user.repository.memory.js';

const router = Router();

const userRepository = new UserRepositoryMemory();
const userController = new UserController({ userService: userRepository });

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.patch('/:id/role', (req, res) => userController.updateRole(req, res));

export { router as userRoutes };
