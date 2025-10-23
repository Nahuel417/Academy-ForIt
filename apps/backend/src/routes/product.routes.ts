import { Router } from 'express';
// @ts-ignore
import { ProductController } from '@backend/controllers/product.controller.js';
// @ts-ignore
import { ProductRepositoryMemory } from '@backend/repositories/product.repository.memory.js';
// @ts-ignore
import { AuthMiddleware } from '@backend/middlewares/auth.middleware.js';

const router = Router();

const productRepository = new ProductRepositoryMemory();
const productController = new ProductController({ productService: productRepository });

// Protected routes - require employee role or higher
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => productController.create(req, res));
router.get('/', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => productController.getAll(req, res));
router.get('/:id', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => productController.getById(req, res));
router.patch('/:id', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => productController.update(req, res));
router.delete('/:id', AuthMiddleware.authenticate, AuthMiddleware.requireEmployee, (req, res) => productController.delete(req, res));

export { router as productRoutes };
