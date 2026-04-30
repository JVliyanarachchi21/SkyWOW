import { PrismaClient } from '../generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const getPrismaClient = () => {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // Setup the driver adapter factory for Prisma 7
  // Note: Using absolute path for consistency
  const adapterFactory = new PrismaBetterSqlite3({ 
    url: 'C:/Users/USER/.gemini/antigravity/scratch/skywow-app/dev.db' 
  });
  
  // @ts-ignore
  const prisma = new PrismaClient({ adapter: adapterFactory });
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
  
  return prisma;
};

export const prisma = getPrismaClient();
