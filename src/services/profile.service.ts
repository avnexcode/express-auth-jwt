import { destroyUser, findUserByEmail, updateUser } from '../repositories/user.repository';
import { User } from '../@types';
import { getUserById } from './user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getProfile = async (token: string) => {
  if (!token) {
    throw new Error('Unauthorized');
  }

  const secret = process.env.SECRET_JWT!;
  const claims = jwt.verify(token, secret) as JwtPayload;

  const user = await getUserById(claims.id);

  const { password, ...data } = user;

  return data;
};

export const editProfile = async (token: string, userData: User) => {
  const { id } = await getProfile(token);
  const user = await getUserById(id);
  const duplicatedEmail = await findUserByEmail(user.email);
  
  if (duplicatedEmail) {
    if (userData.email && user.email !== userData.email) {
      throw new Error('Email already used');
    }
  }

  const data = await updateUser(id, userData);

  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
};

export const deleteProfile = async (token: string) => {
  const { id } = await getProfile(token);
  const user = await destroyUser(id);
  return user;
};
