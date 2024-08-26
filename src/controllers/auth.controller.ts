import { Request, Response } from 'express';
import { createUser } from '../services/user.service';
import { loginService } from '../services/auth.service';

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json({
      status: 'success',
      message: 'success register user',
      data: user,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data = await loginService(email, password);
    res.status(200).json({
      status: 'success',
      message: 'Login Success',
      data,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};
