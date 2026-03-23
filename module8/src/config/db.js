import { createRequire } from 'module';
import { PrismaPg } from '@prisma/adapter-pg';

const require = createRequire(import.meta.url);
const { PrismaClient } = require('../generated/prisma/index.js');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
