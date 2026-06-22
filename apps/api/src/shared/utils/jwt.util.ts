import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { env } from '../../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  type?: string;
}

export class JwtUtil {
  private static readonly ACCESS_TOKEN_OPTIONS: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRY as SignOptions['expiresIn'],
    issuer: 'businessfirst-api',
    algorithm: 'HS256',
  };

  private static readonly REFRESH_TOKEN_OPTIONS: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRY as SignOptions['expiresIn'],
    issuer: 'businessfirst-api',
    algorithm: 'HS256',
  };

  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, this.ACCESS_TOKEN_OPTIONS);
  }

  static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, this.REFRESH_TOKEN_OPTIONS);
  }

  static verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, {
        issuer: 'businessfirst-api',
      }) as JwtPayload;
      
      return {
        userId: decoded.userId as string,
        email: decoded.email as string,
        role: decoded.role as string,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw error;
    }
  }

  static verifyRefreshToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
        issuer: 'businessfirst-api',
      }) as JwtPayload;
      
      return {
        userId: decoded.userId as string,
        email: decoded.email as string,
        role: decoded.role as string,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded) return null;
      
      return {
        userId: decoded.userId as string,
        email: decoded.email as string,
        role: decoded.role as string,
      };
    } catch {
      return null;
    }
  }
}