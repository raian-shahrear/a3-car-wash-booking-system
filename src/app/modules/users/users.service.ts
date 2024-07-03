import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './users.interface';
import { UserModel } from './users.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import { crateToken } from './users.util';

const registerUserIntoDB = async (payload: TUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, 'User is already registered!');
  }

  const result = await UserModel.create(payload);
  const newUser = await UserModel.findById(result._id).select([
    '-password',
    '+role',
  ]);
  return newUser;
};

const loginUser = async (payload: TLoginUser) => {
  // checking user existed or not
  const isUserExist = await UserModel.findOne({ email: payload.email }).select([
    '+role',
    '+password',
  ]);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking password matched or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched!');
  }

  // create access_token and sent to the user
  const jwtPayload = {
    userEmail: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = crateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  const loggedInUser = await UserModel.findOne({ email: payload.email }).select(
    ['+role'],
  );

  return {
    token: accessToken,
    data: loggedInUser,
  };
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select(['+role']);
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  loginUser,
  getAllUsersFromDB,
};
