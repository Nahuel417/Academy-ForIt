import type { Product } from '../../entities/product.js';
import type { ProductService } from '../product-service.js';

export class MockedProductService implements ProductService {
    products: Product[] = [];

    constructor(products: Product[]) {
        this.products = products;
    }

    save = async (data: Product): Promise<void> => {
        this.products.push(data);
    };

    findAll = async (): Promise<Product[]> => this.products;

    findById = async (id: string): Promise<Product | undefined> => this.products.find((p) => p.id === id);

    editOne = async (data: Product): Promise<Product> => {
        const index = this.products.findIndex((p) => p.id === data.id);
        if (index === -1) throw new Error('Product not found');
        this.products[index] = data;
        return this.products[index];
    };

    updateMany = async (data: Product[]): Promise<Product[] | undefined> => {
        data.forEach((d) => {
            const index = this.products.findIndex((p) => p.id === d.id);
            if (index !== -1) this.products[index] = d;
        });
        return data;
    };

    delete = async (id: string): Promise<void> => {
        this.products = this.products.filter((p) => p.id !== id);
    };

    findByName = async (name: string): Promise<Product | undefined> => this.products.find((p) => p.name === name);

    findByCategory = async (categoryId: string): Promise<Product[]> => this.products.filter((p) => p.categories.some((c) => c.id === categoryId));
}
