import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from './user.service';

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

  const payload = {
    id: user.id,
  };

  const secret = process.env.SECRET_JWT!;
  const expiresIn = 60 * 60 * 24;
  const token = jwt.sign(payload, secret, { expiresIn });

  return {
    user: {
      id: user.id,
    },
    token,
  };
};
