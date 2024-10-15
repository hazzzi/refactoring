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

const generatedPosts = (count) => {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: i + 1,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      userId: faker.number.int({ min: 1, max: count }),
    });
  }
  return posts;
};

const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: i + 1,
      content: faker.lorem.sentence(),
      postId: faker.number.int({ min: 1, max: count }),
      userId: faker.number.int({ min: 1, max: count }),
    });
  }
  return comments;
};

const data = {
  users: generateUsers(100),
  posts: generatedPosts(10),
  comments: generateComments(10),
};

fs.writeFileSync('server/mock/db.json', JSON.stringify(data, null, 2));
console.log('Mock data has been generated in db.json');
