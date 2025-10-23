// @ts-ignore
import type { Request, Response } from 'express';
// @ts-ignore
import { addProduct, getProductById, getProductsList, updateProduct, deleteProduct } from 'demo-domain';
// @ts-ignore
import type { ProductService } from 'demo-domain';

interface ProductControllerDeps {
  productService: ProductService;
}

export class ProductController {
  constructor(private deps: ProductControllerDeps) {}

  async create(req: Request, res: Response) {
    try {
      const { name, price, stock, categories } = req.body;

      const result = await addProduct(this.deps, { name, price, stock, categories, createdAt: new Date() });

      if (result instanceof Error) {
        return res.status(400).json({ error: result.message });
      }

      // Since addProduct returns undefined, get the product by name
      const product = await this.deps.productService.findByName(name);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await getProductsList(this.deps);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await getProductById(this.deps, { id });

      if (result instanceof Error) {
        return res.status(404).json({ error: result.message });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await updateProduct(this.deps, { id, ...updateData, updatedAt: new Date() });

      if (result instanceof Error) {
        return res.status(404).json({ error: result.message });
      }

      // Get updated product
      const product = await this.deps.productService.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await deleteProduct(this.deps, { id });

      if (result instanceof Error) {
        return res.status(404).json({ error: result.message });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
