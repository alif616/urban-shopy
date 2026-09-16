import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CLIENT_URL: string;
  ALLOWED_ORIGINS: string[];
}

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value || value.trim() === '') throw new Error('Missing required environment variable: ' + key);
  return value;
};

const buildConfig = (): EnvConfig => {
  const nodeEnv = (process.env.NODE_ENV || 'development') as EnvConfig['NODE_ENV'];
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || '').split(',').map((s) => s.trim()).filter(Boolean);
  return {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: nodeEnv,
    MONGODB_URI: requireEnv('MONGODB_URI'),
    JWT_SECRET: requireEnv('JWT_SECRET'),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    ALLOWED_ORIGINS: allowedOrigins,
  };
};

export const env = buildConfig();
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
