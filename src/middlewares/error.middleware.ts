import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../interfaces/ErrorResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let errorMessage = err.message || 'An unknown error occurred';

  // Jika error adalah instance dari Error tetapi memiliki properti statusCode
  if ('statusCode' in err && typeof (err as any).statusCode === 'number') {
    statusCode = (err as any).statusCode;
  }

  res.status(statusCode);
  res.json({
    status: 'Error',
    message: errorMessage,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
