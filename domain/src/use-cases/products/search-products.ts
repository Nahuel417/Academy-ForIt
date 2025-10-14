import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface SearchProductsDeps {
    productService: ProductService;
}

interface SearchProductsPayload {
    name?: string;
    categoryId?: string;
}

export async function searchProducts({ productService }: SearchProductsDeps, { name, categoryId }: SearchProductsPayload): Promise<Product[]> {
    if (name) {
        const product: Product | undefined = await productService.findByName(name);
        return product ? [product] : [];
    }

    if (categoryId) {
        return await productService.findByCategory(categoryId);
    }

    return await productService.findAll();
}
