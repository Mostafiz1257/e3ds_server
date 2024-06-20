import { IUser } from './user.interface';
import { User } from './user.model';

//create a normal user or admin
const createUserIntoDb = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};


export const UserService ={
    createUserIntoDb
}