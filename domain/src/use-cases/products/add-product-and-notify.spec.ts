import { describe, expect, test, vi } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service.js";
import { addProductAndNotify } from "./add-product-and-notify.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";

describe("Add product and notify", async () => {
  const productService = new MockedProductService([]);

  const userService = new MockedUserService([
    userMock(),
    userMock(),
    userMock(),
  ]);

  let emailsNotified: string[] = [];

  const emailService = {
    notifyNewProduct: async (name: string, emails: string[]) => {
      console.log(name);
      emailsNotified = emails;
    },
  };

  const spyOnNotifyNewProduct = vi.spyOn(emailService, "notifyNewProduct");

  test("When receive information about a product,should save it and once saved you should notify users.", async () => {
    await addProductAndNotify(
      { productService, emailService, userService },
      {
        name: "test",
        price: 100,
      }
    );

    expect(productService.products).toHaveLength(1);

    expect(emailsNotified).toHaveLength(3);
    expect(emailService.notifyNewProduct).toHaveBeenCalledTimes(1);
  });
});
