import { findUserByEmail, insertUser } from '../repositories/user.repository';
import { User } from '../types';

export const getUserByEmail = async (email: string): Promise<User> =>  {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  return user;
};

export const createUser = async (newUserData: User) => {
  const user = await insertUser(newUserData);
  return user;
};
