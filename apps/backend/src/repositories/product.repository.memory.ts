// @ts-ignore
import type { Product } from 'demo-domain';
// @ts-ignore
import type { ProductService } from 'demo-domain';

export class ProductRepositoryMemory implements ProductService {
    private products: Product[] = [];

    async findById(id: string): Promise<Product | undefined> {
        return this.products.find((product) => product.id === id);
    }

    async findAll(): Promise<Product[]> {
        return this.products;
    }

    async findByName(name: string): Promise<Product | undefined> {
        return this.products.find((product) => product.name === name);
    }

    async findByCategory(categoryId: string): Promise<Product[]> {
        return this.products.filter((product) =>
            product.categories.some((cat: { id: string; name: string }) => cat.id === categoryId)
        );
    }

    async save(data: Product): Promise<void> {
        this.products.push(data);
    }

    async editOne(data: Product): Promise<Product> {
        const index = this.products.findIndex((product) => product.id === data.id);
        if (index !== -1) {
            this.products[index] = data;
            return data;
        }
        throw new Error('Product not found');
    }

    async updateMany(data: Product[]): Promise<Product[] | undefined> {
        // Not implemented for simplicity
        return data;
    }

    async delete(id: string): Promise<void> {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
}
