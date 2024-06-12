import { faker } from "@faker-js/faker";

export function getRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
  };
}
