import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './users.interface';
import { UserModel } from './users.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import { crateToken } from './users.util';
import QueryBuilder from '../../builder/QueryByilder';

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

const updateUserIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TUser>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (loggedInUser?._id.toString() !== id) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  // checking the id exist or not
  const isUserExist = await UserModel.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const updateUserRoleIntoDB = async (id: string, payload: Partial<TUser>) => {
  // checking the id exist or not
  const isUserExist = await UserModel.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).select(['+role']);
  return result;
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

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(
    UserModel.find().select(['+role']),
    query,
  )
    .sort()
    .paginate();
  const result = await serviceQuery.queryModel;
  const meta = await serviceQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const UserServices = {
  registerUserIntoDB,
  updateUserIntoDB,
  updateUserRoleIntoDB,
  loginUser,
  getAllUsersFromDB,
};
