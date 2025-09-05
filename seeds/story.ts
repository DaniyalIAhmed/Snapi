import { faker } from "@faker-js/faker";

export const generateStoryData = (num: number) => {
  const stories = Array.from({ length: num }).map((_, index) => ({
    id: index,
    userName: faker.person.fullName().split(" ").join("").toLowerCase(),
    avatar: faker.image.avatar(),
    hasStory: Math.random() > 0.4,
  }));
  return stories;
};

// console.log(...generateStoryData(3));
