import type { Product } from "../../entities/product.js";
import type { ProductService } from "../product-service.js";

export class MockedProductService implements ProductService {
  products: Product[] = [];

  constructor(products: Product[]) {
    this.products = products;
  }

  async findById(id: string) {
    return this.products.find((p) => p.id == id);
  }

  async findAll() {
    return this.products;
  }

  async applyDiscount() {
    return { id: "", name: "", price: 1 };
  }

  async editOne() {
    return { id: "", name: "", price: 1 };
  }

  async getProductsWithDiscount() {
    return [{ id: "", name: "", price: 1 }];
  }

  async save(item: Product) {
    this.products.push(item);
  }

  async updateMany() {
    return [];
  }
}
