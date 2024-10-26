import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Single shared client: creating a PrismaClient per controller opens a
// separate connection pool for every file, slowing every request.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
