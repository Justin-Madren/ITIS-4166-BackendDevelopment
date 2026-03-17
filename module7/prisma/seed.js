import 'dotenv/config';
import prisma from '../src/config/db.js';
console.log('Clearing database and resetting IDs...');
await prisma.$queryRaw`TRUNCATE "comments", "posts" RESTART IDENTITY CASCADE;`;
console.log('Database cleared!');
const posts = [
{
title: 'Welcome to the Blog',
content: 'This is the first post in our blog.',
},
{
title: 'Node.js and PostgreSQL',
content: 'Integrating PostgreSQL with Node.js is fun!',
},
{
title: 'Layered Architecture',
content: 'We are learning about layered API design.',
},
{
title: 'Async/Await in Node',
content: 'Understanding async/await is crucial for modern APIs.',
},
{ title: 'SQL Basics', content: 'Learn how to write basic SQL queries.' },
{
title: 'Database Indexes',
content: 'Indexes improve query performance.',
},
{ title: 'RESTful APIs', content: 'Designing RESTful APIs step by step.' },
{
title: 'Error Handling',
content: 'Handling errors properly in your API.',
},
{
title: 'Testing with Jest',
content: 'Writing tests for your Node.js APIs.',
},
{
title: 'Deployment Tips',
content: 'Best practices for deploying Node apps.',
},
];
await prisma.post.createMany({
data: posts,
skipDuplicates: true,
});
const comments = [
{ postId: 1, content: 'Great first post!' },
{ postId: 1, content: 'Looking forward to more content.' },
{ postId: 2, content: 'Thanks for explaining pg!' },
{ postId: 2, content: 'Helpful, clear examples.' },
{ postId: 3, content: 'Very helpful, thanks!' },
{ postId: 3, content: 'I love layered architecture!' },
{ postId: 4, content: 'Async makes everything easier.' },
{ postId: 4, content: 'This cleared up my confusion.' },
{ postId: 5, content: 'SQL basics are crucial for beginners.' },
{ postId: 5, content: 'Nice explanation!' },
{ postId: 6, content: 'Indexes save a lot of time.' },
{ postId: 7, content: 'RESTful APIs are easier to understand now.' },
{ postId: 7, content: 'Thanks for the guide.' },
{ postId: 8, content: 'Error handling is often overlooked.' },
{ postId: 9, content: 'Testing is important.' },
{ postId: 10, content: 'Good deployment tips.' },
];
await prisma.comment.createMany({
data: comments,
skipDuplicates: true,
});
console.log('Database seeded with 10 posts and 16 comments!');
await prisma.$disconnect();
