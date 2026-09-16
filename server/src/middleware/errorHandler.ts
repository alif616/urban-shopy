import { Request, Response, NextFunction } from 'express';
import { isProduction } from '../config/env';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors: Record<string, string> | undefined = err.errors;

  if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = 'Validation failed';
    errors = {};
    Object.keys(err.errors).forEach((key) => { errors![key] = err.errors[key].message; });
  }
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = 'Duplicate value for ' + field;
  }
  if (err.name === 'CastError') { statusCode = 400; message = 'Invalid ' + err.path + ': ' + err.value; }
  if (err.name === 'JsonWebTokenError') { statusCode = 401; message = 'Invalid authentication token'; }
  if (err.name === 'TokenExpiredError') { statusCode = 401; message = 'Authentication token has expired'; }

  if (!isProduction) {
    console.error('[error] ' + statusCode + ' - ' + message);
    if (err.stack) console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
export default errorHandler;
