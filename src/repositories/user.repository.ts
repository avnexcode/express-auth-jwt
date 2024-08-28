import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import { User } from '../@types';

export const findAllUser = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const insertUser = async (newUserData: User) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUserData.password, salt);

  const user = await prisma.user.create({
    data: {
      name: newUserData.name,
      email: newUserData.email,
      password: hashedPassword,
    },
  });
  return user;
};

export const updateUser = async (id: string, userData: User): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = await prisma.user.update({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
    where: { id },
  });
  return user;
};

export const destroyUser = async (id: string): Promise<User> => {
  const user = await prisma.user.delete({ where: { id } });
  return user;
};