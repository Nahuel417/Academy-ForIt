import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface GetProductByIdDeps {
    productService: ProductService;
}

interface GetProductByIdPayload {
    id: string;
}

export async function getProductById({ productService }: GetProductByIdDeps, { id }: GetProductByIdPayload): Promise<Product | Error> {
    const product: Product | undefined = await productService.findById(id);

    if (!product) return new Error('Product not found');
    return product;
}
