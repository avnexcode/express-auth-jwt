import { NextFunction, Request, Response } from 'express';
import { deleteProfile, editProfile, getProfile } from '../services/profile.service';

export const getProfileController = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  try {
    const data = await getProfile(token);
    const result = {
      statusCode: 200,
      message: 'Berhasil mendapatkan profile',
      data,
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const putProfileController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(401).json({
      status: 'error',
      message: 'required fields are missing',
    });
  }
  const token = req.cookies.jwt;
  try {
    const data = await editProfile(token, req.body);
    const result = {
      statusCode: 200,
      message: 'Berhasil memperbarui profile',
      data,
    };
    res.locals = result;
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const patchProfileController = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  try {
    const data = await editProfile(token, req.body);
    const result = {
      statusCode: 200,
      message: 'Berhasil memperbarui profile',
      data,
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteProfileController = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  try {
    await deleteProfile(token);
    res.cookie('jwt', '', { maxAge: 0 });
    const result = {
      statusCode: 200,
      message: 'Berhasil menghapus profile',
    };
    res.locals = result;
    next();
  } catch (error) {
    next(error);
  }
};
