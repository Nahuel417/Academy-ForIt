import { UserStatus, type User } from "../user.js";
import { faker } from "@faker-js/faker";

export function userMock(opts?: Partial<User>): User {
  return {
    id: crypto.randomUUID(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(Object.values(UserStatus)),
    ...opts,
  };
}
