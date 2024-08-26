import prisma from '../db/db';
import bcrypt from 'bcrypt';
import { User } from '../types';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const insertUser = async (newUserData: User) => {
  const passwordHashed = await bcrypt.hash(newUserData.password, 10);

  const user = await prisma.user.create({
    data: {
      name: newUserData.name,
      email: newUserData.email,
      password: passwordHashed,
    },
  });
  return user;
};
