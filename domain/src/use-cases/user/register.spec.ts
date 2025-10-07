import { describe, expect, test } from "vitest";
import type { UserService } from "../../services/user-service.js";
import { UserStatus, type User } from "../../entities/user.js";
import { register } from "./register.js";
import { MockedUserService } from "../../services/mocks/mock-user-service.js";
import { userMock } from "../../entities/mocks/user-mock.js";

describe("register", async () => {
  const userService = new MockedUserService([
    userMock({
      id: crypto.randomUUID(),
      name: "user",
      email: "user@gmail.com",
      password: "user1234",
      status: UserStatus.ACTIVE,
    }),
  ]);

  test("When registering a user you should save the user", async () => {
    const result = await register(
      { userService },
      { name: "Angel", email: "angel@gmail.com", password: "User@1234" }
    );

    expect(result).toBeUndefined();
    expect(userService.users).toHaveLength(2);
    expect(userService.users[1]).toStrictEqual({
      id: expect.any(String),
      name: "Angel",
      email: "angel@gmail.com",
      password: "User@1234",
      status: "ACTIVE",
    });
  });

  test("If the email is already registered it should return an error.", async () => {
    const result = await register(
      { userService },
      { name: "Angel", email: "user@gmail.com", password: "User@1234" }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
