import { Router } from 'express';
// @ts-ignore
import { ProductController } from '@backend/controllers/product.controller.js';
// @ts-ignore
import { ProductRepositoryMemory } from '@backend/repositories/product.repository.memory.js';

const router = Router();

const productRepository = new ProductRepositoryMemory();
const productController = new ProductController({ productService: productRepository });

router.post('/', (req, res) => productController.create(req, res));
router.get('/', (req, res) => productController.getAll(req, res));
router.get('/:id', (req, res) => productController.getById(req, res));
router.patch('/:id', (req, res) => productController.update(req, res));
router.delete('/:id', (req, res) => productController.delete(req, res));

export { router as productRoutes };
