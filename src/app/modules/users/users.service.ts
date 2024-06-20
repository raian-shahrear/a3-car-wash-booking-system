import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './users.interface';
import { UserModel } from './users.model';

const registerUserIntoDB = async (payload: TUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, 'User is already registered!');
  }

  const newUser = { ...payload };
  newUser.password = payload.password || (config.default_pass as string);
  const result = await UserModel.create(newUser);
  return result;
};

// const loginUser = async () => {};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select(['+role', '+password']);
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getAllUsersFromDB,
};
