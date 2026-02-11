export const posts = [
  {
    id: 1,
    title: 'My First Blog',
    content: 'This is my first blog',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'My Second Blog',
    content: 'This is my second blog',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'What is for Dinner',
    content: 'I had a turkey and pepperjack cheese sandwich with a side of chips',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Problems with Module 4',
    content: 'Having issues with 2 test for PUT/api/posts/:id and PUT/api/categories/:id',
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Last Blog',
    content: 'This is my last blog post for now',
    createdAt: new Date().toISOString(),
  },
];
let nextId = posts.length;

export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  posts.length = 0;
  nextId = posts.length;
}
