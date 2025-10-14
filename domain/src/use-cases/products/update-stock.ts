import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface UpdateStockDeps {
    productService: ProductService;
}

interface UpdateStockPayload {
    id: string;
    delta: number;
}

export async function updateStock({ productService }: UpdateStockDeps, { id, delta }: UpdateStockPayload) {
    const product: Product | undefined = await productService.findById(id);
    if (!product) return new Error('Product not found');

    product.stock += delta;
    await productService.editOne(product);
}
