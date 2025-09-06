import { faker } from "@faker-js/faker";

export const generateChatData = (num: number) => {
  const chats = Array.from({ length: num }).map((_, index) => ({
    _id: index.toString(),
    // _id: faker.lorem.text(),
    userName: faker.person.fullName(),
    avatar: faker.image.avatar(),
    lastMessage: faker.lorem.sentence(),
    lastMessageTime: faker.date.recent(),
  }));
  return chats;
};

// console.log(...generateStoryData(3));
