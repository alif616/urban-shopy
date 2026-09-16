import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';

const start = async (): Promise<void> => {
  await connectDatabase();
  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log('[server] Urban Shopy API running on port ' + env.PORT + ' (' + env.NODE_ENV + ')');
  });

  const shutdown = async (signal: string): Promise<void> => {
    console.log('\n[server] Received ' + signal + '. Shutting down gracefully...');
    server.close(async () => { await disconnectDatabase(); process.exit(0); });
    setTimeout(() => { console.error('[server] Forced shutdown after timeout'); process.exit(1); }, 10000);
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', (reason: any) => console.error('[server] Unhandled Rejection:', reason));
  process.on('uncaughtException', (err) => { console.error('[server] Uncaught Exception:', err); process.exit(1); });
};

start().catch((err) => { console.error('[server] Failed to start:', err); process.exit(1); });
