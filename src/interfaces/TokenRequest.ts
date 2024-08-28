import { Request } from 'express';

export default interface TokenRequest extends Request {
  data?: { token: string };
}


