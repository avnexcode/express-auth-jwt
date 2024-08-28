import { findAllUser, findUserByEmail, findUserById, insertUser, updateUser } from '../repositories/user.repository';
import { User } from '../@types';

export const getAllUsers = async (): Promise<User[]> => {
  const users = await findAllUser();
  return users;
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await findUserById(id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  return user;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  return user;
};

export const createUser = async (newUserData: User) => {
  const duplicateUserEmail = await findUserByEmail(newUserData.email);

  if (duplicateUserEmail) {
    throw new Error('Email already used');
  }

  const user = await insertUser(newUserData);

  return user;
};

export const editUser = async (id: string, userData: User): Promise<User> => {
  const duplicateUserEmail = await getUserByEmail(userData.email);
  
  if (duplicateUserEmail) {
    throw new Error('Email already used');
  }

  const user = await updateUser(id, userData);
  
  return user;
};