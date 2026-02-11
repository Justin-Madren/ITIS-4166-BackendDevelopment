export const categories = [
    {
        id:1,
        name: 'Technology',
    },
    {
        id:2,
        name: 'Food',
    },
    {
        id:3,
        name: 'Math',
    },
]


let nextId = categories.length;
export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  categories.length = 0;
  nextId = categories.length;
}