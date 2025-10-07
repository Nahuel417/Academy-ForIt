import type { Product } from "../entities/product.js";
import type { Service } from "../utils/types/service.js";

export interface ProductService extends Service<Product> {
  getProductsWithDiscount: () => Promise<Product[]>;
  applyDiscount: (id: string, discount: number) => Promise<Product>;
}
