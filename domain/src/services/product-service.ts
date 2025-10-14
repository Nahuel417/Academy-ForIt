import type { Product } from '../entities/product.js';
import type { Service } from '../utils/types/service.js';

export interface ProductService extends Service<Product> {
    findByName(name: string): Promise<Product | undefined>;
    findByCategory(categoryId: string): Promise<Product[]>;
}
