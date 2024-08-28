import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import JwtPayload from '../interfaces/JwtPayload';
import { verify } from 'jsonwebtoken';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!process.env.SECRET_JWT) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = verify(token, process.env.SECRET_JWT) as JwtPayload;
    req.data = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
