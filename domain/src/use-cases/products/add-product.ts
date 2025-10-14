import type { Product } from '../../entities/product.js';
import type { ProductService } from '../../services/product-service.js';

interface AddProductDeps {
    productService: ProductService;
}

interface AddProductPayload {
    name: string;
    price: number;
    stock: number;
    categories: { id: string; name: string }[];
    createdAt: Date;
}

export async function addProduct({ productService }: AddProductDeps, { name, price, stock, categories }: AddProductPayload) {
    const existing: Product | undefined = await productService.findByName(name);
    if (existing) return new Error('Product already exists');

    const newProduct: Product = {
        id: crypto.randomUUID(),
        name,
        price,
        stock,
        categories,
        createdAt: new Date(),
    };

    await productService.save(newProduct);
}
