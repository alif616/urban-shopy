import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== 'production',
      serverSelectionTimeoutMS: 10000,
    });
    console.log('[database] MongoDB connected: ' + connection.connection.host + '/' + connection.connection.name);
    mongoose.connection.on('error', (err) => console.error('[database] MongoDB error:', err.message));
    mongoose.connection.on('disconnected', () => console.warn('[database] MongoDB disconnected'));
  } catch (error: any) {
    console.error('[database] Failed to connect:', error.message);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('[database] MongoDB disconnected gracefully');
  } catch (error: any) {
    console.error('[database] Disconnect error:', error.message);
  }
};
export default connectDatabase;
