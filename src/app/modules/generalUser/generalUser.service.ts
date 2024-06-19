import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../users/users.model';
import { TGeneralUser } from './generalUser.interface';
import { GeneralUserModel } from './generalUser.model';
import mongoose from 'mongoose';

const getAllGeneralUsersFromDB = async () => {
  const result = await GeneralUserModel.find().populate('user');
  return result;
};

const getSingleGeneralUserFromDB = async (id: string) => {
  // checking the id exist or not
  const isUSerExist = await GeneralUserModel.findById(id);
  if (!isUSerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }

  const result = await GeneralUserModel.findById(id).populate('user');
  return result;
};

const updateGeneralUserIntoDB = async (
  id: string,
  payload: Partial<TGeneralUser>,
) => {
  // checking the id exist or not
  const isUSerExist = await GeneralUserModel.findById(id);
  if (!isUSerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }

  const result = await GeneralUserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteGeneralUserFromDB = async (id: string) => {
  // checking the id exist or not
  const isUSerExist = await GeneralUserModel.findById(id);
  if (!isUSerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }
  // create a session
  const session = await mongoose.startSession();
  try {
    // start session
    session.startTransaction();
    // delete general user
    const deleteGeneralUser = await GeneralUserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteGeneralUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete this user!');
    }
    // delete user
    const userId = deleteGeneralUser?.user;
    const deleteUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete this user!');
    }

    // end session
    await session.commitTransaction();
    await session.endSession();
    return deleteGeneralUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `error: ${err}`);
  }
};

export const GeneralUserServices = {
  getAllGeneralUsersFromDB,
  getSingleGeneralUserFromDB,
  updateGeneralUserIntoDB,
  deleteGeneralUserFromDB,
};
