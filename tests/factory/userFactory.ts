import { faker } from "@faker-js/faker/locale/pt_BR";
import prisma from "../../src/dbStrategy/postgres";
import { UserData } from "../../src/repositories/userRepository";

export function createRandomUser() {
  return prisma.user.create({
    data: {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })
};

export function generateValidUser(): UserData {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};
