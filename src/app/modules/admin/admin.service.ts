import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AdminModel } from './admin.model';
import { TAdmin } from './admin.interface';
import mongoose from 'mongoose';
import { UserModel } from '../users/users.model';

const getAllAdminsFromDB = async () => {
  const result = await AdminModel.find().populate('user');
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  // checking the id exist or not
  const isAdminExist = await AdminModel.findById(id);
  if (!isAdminExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This admin is not exist!');
  }

  const result = await AdminModel.findById(id).populate('user');
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  // checking the id exist or not
  const isUSerExist = await AdminModel.findById(id);
  if (!isUSerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This admin is not exist!');
  }

  const result = await AdminModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  // checking the id exist or not
  const isUSerExist = await AdminModel.findById(id);
  if (!isUSerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }
  // create a session
  const session = await mongoose.startSession();
  try {
    // start session
    session.startTransaction();
    // delete an admin
    const deleteAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete this user!');
    }
    // delete user
    const userId = deleteAdmin?.user;
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
    return deleteAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `error: ${err}`);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
