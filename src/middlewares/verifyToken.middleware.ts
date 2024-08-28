import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import JwtPayload from '../interfaces/JwtPayload';
import { verify } from 'jsonwebtoken';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookie = req.cookies.jwt;

  if (!process.env.SECRET_JWT) {
    res.status(500);
    throw new Error('Internal server error');
  }

  if (!cookie) {
    res.status(401);
    throw new Error('Tidak ada user login');
  }

  if (!token) {
    res.status(401);
    throw new Error('Access denied. No token provided');
  }

  if (token !== cookie) {
    res.status(401);
    throw new Error('Access denied. Token invalidate');
  }

  try {
    const decoded = verify(token, process.env.SECRET_JWT) as JwtPayload;
    req.data = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
