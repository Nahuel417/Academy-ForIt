import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface GetProductsListDeps {
    productService: ProductService;
}

export async function getProductsList({ productService }: GetProductsListDeps): Promise<Product[]> {
    return await productService.findAll();
}
