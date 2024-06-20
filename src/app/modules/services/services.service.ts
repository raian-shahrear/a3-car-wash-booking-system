import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TService } from './services.interface';
import { ServiceModel } from './services.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }

  return isServiceExist;
};

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }
  // checking service is deleted or not
  const isDeleted = isServiceExist.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is deleted!');
  }

  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    upsert: true,
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }

  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
