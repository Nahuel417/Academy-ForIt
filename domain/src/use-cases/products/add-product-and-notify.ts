import type { EmailService } from "../../services/email-service.js";
import type { ProductService } from "../../services/product-service.js";
import type { UserService } from "../../services/user-service.js";

export interface AddProductAndNotifyDeps {
  productService: ProductService;
  emailService: EmailService;
  userService: UserService;
}

export interface AddProductAndNotifyPayload {
  name: string;
  price: number;
}

export async function addProductAndNotify(
  { productService, emailService, userService }: AddProductAndNotifyDeps,
  { name, price }: AddProductAndNotifyPayload
) {
  await productService.save({ id: crypto.randomUUID(), name, price });

  const allUsers = await userService.findAll();

  await emailService.notifyNewProduct(
    name,
    allUsers.map((user) => user.email)
  );
}
