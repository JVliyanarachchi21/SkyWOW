import { PrismaClient } from '@prisma/client'; // Model: SystemState added
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  prismaSalt: string;
};

const getPrismaClient = () => {
  // Force refresh if model is missing
  if (globalForPrisma.prisma && (globalForPrisma.prisma as any).systemState) {
    return globalForPrisma.prisma;
  }

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
    globalForPrisma.prismaSalt = Date.now().toString();
  }
  
  return prisma;
};

export const prisma = getPrismaClient();
