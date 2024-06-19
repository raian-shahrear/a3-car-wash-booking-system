import mongoose from 'mongoose';
import config from '../../config';
import { TGeneralUser } from '../generalUser/generalUser.interface';
import { TUser } from './users.interface';
import { generatedUserId } from './user.utils';
import { UserModel } from './users.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { GeneralUserModel } from '../generalUser/generalUser.model';

const createGeneralUserIntoDB = async (
  password: string,
  payload: TGeneralUser,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'user';
  // create session
  const session = await mongoose.startSession();
  try {
    // start session
    session.startTransaction();

    userData.id = await generatedUserId();
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create a new user!',
      );
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newGeneralUser = await GeneralUserModel.create([payload], {
      session,
    });
    if (!newGeneralUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create a new user!',
      );
    }

    // end the session
    await session.commitTransaction();
    await session.endSession();

    return newGeneralUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `error: ${err}`);
  }
};

// const createAdminIntoDB = async (password: string, payload) => {
//     return {}
// }

export const UserServices = {
  createGeneralUserIntoDB,
  // createAdminIntoDB
};
