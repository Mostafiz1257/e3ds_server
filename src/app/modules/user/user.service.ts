import config from '../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';

// const createUserIntoDb = async (user: IUser) => {
//   const result = await User.create(user);
//   return result;
// };

const createUserIntoDb = async (user: IUser) => {
  const newUser = await User.create(user);
console.log("new user",newUser);
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    address: newUser.address,
  };

  const accessToken =  jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    success: true,
    statusCode: 200,
    message: 'User is created successfully',
    data: jwtPayload,
    token: accessToken,
  };
};


const getAllUsersFromDb = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

const updateUserRole = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  
  user.role = user.role === 'user' ? 'admin' : 'user';
  await user.save();
  return user;
};

export const UserService ={
    createUserIntoDb,
    getAllUsersFromDb,
    updateUserRole
}