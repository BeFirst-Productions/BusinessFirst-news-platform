import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

export class Database {
  private static instance: PrismaClient;
  private static isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      const pool = new Pool({ connectionString: env.DATABASE_URL });
      const adapter = new PrismaPg(pool);

      Database.instance = new PrismaClient({
        adapter,
        log: env.NODE_ENV === 'development' 
          ? ['error', 'warn']
          : ['error'],
      });

      // Extension for query logging in development
      if (env.NODE_ENV === 'development') {
        Database.instance = Database.instance.$extends({
          query: {
            $allModels: {
              async $allOperations({ model, operation, args, query }) {
                const before = Date.now();
                const result = await query(args);
                const after = Date.now();
                
                if (after - before > 100) { 
                  console.warn(`⚠ Slow query (${after - before}ms): ${model}.${operation}`);
                }
                
                return result;
              },
            },
          },
        }) as unknown as PrismaClient;
      }
    }

    return Database.instance;
  }

  public static async connect(): Promise<void> {
    const prisma = Database.getInstance();
    
    if (!Database.isConnected) {
      try {
        await prisma.$connect();
        Database.isConnected = true;
        console.log('📦 Database connected successfully');
      } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
      }
    }
  }

  public static async disconnect(): Promise<void> {
    const prisma = Database.getInstance();
    
    if (Database.isConnected) {
      await prisma.$disconnect();
      Database.isConnected = false;
      console.log('📦 Database disconnected');
    }
  }

  public static async healthCheck(): Promise<boolean> {
    try {
      const prisma = Database.getInstance();
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}

export const prisma = Database.getInstance();