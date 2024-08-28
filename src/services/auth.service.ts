import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { createUser, getUserByEmail } from './user.service';
import JwtPayload from '../interfaces/JwtPayload';
import { User } from '../@types';

export const registerService = async (registerData: User) => {
  const user = await createUser(registerData);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginService = async (email: string, password: string) => {
  if (!(email && password)) {
    throw new Error('Email and password required');
  }

  const user = await getUserByEmail(email);

  if (!user.password) {
    throw new Error('Password not set');
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const payload: JwtPayload = {
    id: user.id,
  };

  const secret = process.env.SECRET_JWT!;
  const expiresIn = 60;
  // const expiresIn = 60 * 60 * 24;

  const token = sign(payload, secret, { expiresIn });

  return {
    accessToken: token,
    user_id: user.id,
  };
};
