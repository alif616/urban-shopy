import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { env, isDevelopment } from './config/env';

export const createApp = (): Application => {
  const app = express();
  app.set('trust proxy', 1);

  const allowedOrigins = env.ALLOWED_ORIGINS.length ? env.ALLOWED_ORIGINS : [env.CLIENT_URL];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS blocked for origin: ' + origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  if (isDevelopment) app.use(morgan('dev'));
  else app.use(morgan('combined'));

  app.get('/', (_req, res) => {
    res.json({ name: 'Urban Shopy API', tagline: 'Style for Everyday Life.', status: 'ok' });
  });

  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};
export default createApp;
