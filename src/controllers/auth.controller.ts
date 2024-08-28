import { NextFunction, Request, Response } from 'express';
import { loginService, registerService } from '../services/auth.service';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await registerService(req.body);
    const result = {
      statusCode: 201,
      message: 'Berhasil mendaftar',
      data,
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const data = await loginService(email, password);
    res.cookie('jwt', data.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const result = {
      statusCode: 200,
      message: 'Berhasil login',
      data,
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return res.status(400).json({
      status: 'error',
      message: 'Tidak ada user login.',
    });
  }
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    const result = {
      statusCode: 200,
      message: 'Berhasil logout profile',
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};
