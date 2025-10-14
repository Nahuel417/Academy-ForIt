import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface DeleteProductDeps {
    productService: ProductService;
}

interface DeleteProductPayload {
    id: string;
}

export async function deleteProduct({ productService }: DeleteProductDeps, { id }: DeleteProductPayload) {
    const existing: Product | undefined = await productService.findById(id);
    if (!existing) return new Error('Product not found');

    await productService.delete(id);
}
