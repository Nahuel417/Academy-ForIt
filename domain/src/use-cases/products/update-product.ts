import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface UpdateProductDeps {
    productService: ProductService;
}

interface UpdateProductPayload {
    id: string;
    name?: string;
    price?: number;
    stock?: number;
    categories?: { id: string; name: string }[];
    updatedAt: Date;
}

export async function updateProduct({ productService }: UpdateProductDeps, payload: UpdateProductPayload) {
    const product: Product | undefined = await productService.findById(payload.id);
    if (!product) return new Error('Product not found');

    Object.assign(product, payload);
    await productService.editOne(product);
}
