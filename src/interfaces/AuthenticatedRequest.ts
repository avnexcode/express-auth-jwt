import { Request } from 'express';
import JwtPayload from './JwtPayload';

export interface AuthenticatedRequest extends Request {
  data?: JwtPayload;
}
