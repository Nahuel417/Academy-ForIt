import type { Product, ProductService } from "demo-domain";
import { type Database } from "better-sqlite3";

interface ProductSQL {
  id: string;
  name: string;
  price: number;
}

export class ProductServiceImplementation implements ProductService {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async findById(id: string) {
    const product = this.db
      .prepare<any, ProductSQL>("SELECT * FROM products WHERE id = ?")
      .get(id);

    return product;
  }

  async findAll() {
    const products = this.db
      .prepare<unknown[], ProductSQL>("SELECT * FROM products")
      .all();

    return products;
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

  async save() {
    return;
  }

  async updateMany() {
    return [];
  }
}
