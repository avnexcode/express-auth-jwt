import { NextFunction, Request, Response } from 'express';
import { ResponseLocals } from '../interfaces/ResponseLocals';

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals && res.locals.statusCode !== undefined) {
    const { statusCode = 200, message = 'Request successful', status = 'success', data } = res.locals;

    const response: ResponseLocals = {
      status: status,
      message: message,
    };

    if (data !== undefined) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  next();
};
