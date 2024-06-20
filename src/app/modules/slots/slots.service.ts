import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryByilder';
import AppError from '../../errors/AppError';
import { ServiceModel } from '../services/services.model';
import { SlotModel } from './slots.model';

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const newQuery = { ...query };
  if (query.serviceId) {
    delete newQuery.serviceId;
    newQuery.service = query.serviceId;
  }

  const slotQuery = new QueryBuilder(
    SlotModel.find({ isBooked: 'available' }).populate('service'),
    newQuery,
  ).filter();
  const result = await slotQuery.queryModel;
  return result;
};

const getSlotsByServiceIdFromDB = async (id: string) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }

  const result = await SlotModel.find({
    service: id,
    isBooked: 'available',
  }).populate('service');
  return result;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
  getSlotsByServiceIdFromDB,
};
