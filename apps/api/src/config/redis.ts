import Redis from 'ioredis';
import { env } from './env';

class RedisClient {
  private static instance: Redis;
  private static isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      const isTls = env.REDIS_URL.startsWith('rediss://');
      RedisClient.instance = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        family: 0, // Enable dual-stack IPv4/IPv6 DNS lookup
        ...(isTls && {
          tls: {
            rejectUnauthorized: false, // Prevent issues with root certificate authority inside container
          },
        }),
        retryStrategy(times: number) {
          const delay = Math.min(times * 50, 2000);
          if (times > 10) {
            console.error('❌ Redis connection failed after 10 retries');
            return null; // Stop retrying
          }
          return delay;
        },
        reconnectOnError(err: Error) {
          const targetError = 'READONLY';
          if (err.message.includes(targetError)) {
            return true; // Reconnect on READONLY error
          }
          return false;
        },
        lazyConnect: true,
      });

      // Event handlers
      RedisClient.instance.on('connect', () => {
        RedisClient.isConnected = true;
        console.log('📦 Redis connected successfully');
      });

      RedisClient.instance.on('error', (error: Error) => {
        console.error('❌ Redis error:', error.message);
      });

      RedisClient.instance.on('close', () => {
        RedisClient.isConnected = false;
      });
    }

    return RedisClient.instance;
  }

  // public static async connect(): Promise<void> {
  //   const redis = RedisClient.getInstance();
    
  //   if (!RedisClient.isConnected) {
  //     try {
  //       await redis.connect();
  //     } catch (error) {
  //       console.error('❌ Redis connection failed:', error);
  //       throw error;
  //     }
  //   }
  // }

public static async connect(): Promise<void> {
  const redis = RedisClient.getInstance();
  if (!RedisClient.isConnected) {
    try {
      await redis.connect();
    } catch (error) {
      console.error('❌ Redis connection failed:', error);
      // Do NOT throw — caller handles gracefully
    }
  }
}

public static isHealthy(): boolean {
  return RedisClient.isConnected;
}

  public static async disconnect(): Promise<void> {
    const redis = RedisClient.getInstance();
    
    if (RedisClient.isConnected) {
      await redis.quit();
      RedisClient.isConnected = false;
      console.log('📦 Redis disconnected');
    }
  }

  // Cache helpers
  public static async get(key: string): Promise<string | null> {
    if (!RedisClient.isConnected) return null;
    try {
      return await RedisClient.getInstance().get(key);
    } catch (error) {
      console.warn(`⚠️ Redis get error for key ${key}:`, (error as Error).message);
      return null;
    }
  }

  public static async set(key: string, value: string, ttl?: number): Promise<'OK' | null> {
    if (!RedisClient.isConnected) return null;
    try {
      if (ttl) {
        return await RedisClient.getInstance().set(key, value, 'EX', ttl);
      }
      return await RedisClient.getInstance().set(key, value);
    } catch (error) {
      console.warn(`⚠️ Redis set error for key ${key}:`, (error as Error).message);
      return null;
    }
  }

  public static async del(key: string): Promise<number> {
    if (!RedisClient.isConnected) return 0;
    try {
      return await RedisClient.getInstance().del(key);
    } catch (error) {
      console.warn(`⚠️ Redis del error for key ${key}:`, (error as Error).message);
      return 0;
    }
  }

  public static async delByPattern(pattern: string): Promise<void> {
    if (!RedisClient.isConnected) return;
    try {
      const redis = RedisClient.getInstance();
      const keys = await redis.keys(pattern);
      
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.warn(`⚠️ Redis delByPattern error for pattern ${pattern}:`, (error as Error).message);
    }
  }

  public static async exists(key: string): Promise<boolean> {
    if (!RedisClient.isConnected) return false;
    try {
      const result = await RedisClient.getInstance().exists(key);
      return result === 1;
    } catch (error) {
      console.warn(`⚠️ Redis exists error for key ${key}:`, (error as Error).message);
      return false;
    }
  }

  public static async incr(key: string): Promise<number> {
    if (!RedisClient.isConnected) return 0;
    try {
      return await RedisClient.getInstance().incr(key);
    } catch (error) {
      console.warn(`⚠️ Redis incr error for key ${key}:`, (error as Error).message);
      return 0;
    }
  }

  public static async expire(key: string, seconds: number): Promise<number> {
    if (!RedisClient.isConnected) return 0;
    try {
      return await RedisClient.getInstance().expire(key, seconds);
    } catch (error) {
      console.warn(`⚠️ Redis expire error for key ${key}:`, (error as Error).message);
      return 0;
    }
  }

  public static async healthCheck(): Promise<boolean> {
    if (!RedisClient.isConnected) return false;
    try {
      const redis = RedisClient.getInstance();
      const result = await redis.ping();
      return result === 'PONG';
    } catch {
      return false;
    }
  }
}

export default RedisClient;