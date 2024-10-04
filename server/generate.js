import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['admin', 'user']),
      lastLogin: faker.date.recent(7).toISOString(),
    });
  }
  return users;
};

const data = {
  users: generateUsers(100),
};

fs.writeFileSync('server/mock/db.json', JSON.stringify(data, null, 2));
console.log('Mock data has been generated in db.json');
