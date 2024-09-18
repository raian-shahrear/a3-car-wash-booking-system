import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryByilder';
import AppError from '../../errors/AppError';
import { ServiceModel } from '../services/services.model';
import { SlotModel } from './slots.model';
import { TSlot } from './slots.interface';

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const slotQuery = new QueryBuilder(
    SlotModel.find({ isBooked: 'available' }).populate('service'),
    query,
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
  }).populate('service');
  return result;
};

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  const slotQuery = new QueryBuilder(
    SlotModel.find().populate('service'),
    query,
  )
    .filter()
    .paginate();
  const result = await slotQuery.queryModel;
  const meta = await slotQuery.countTotal();
  return {
    meta,
    result,
  };
};

const updateSlotStatusIntoDB = async (id: string, payload: Partial<TSlot>) => {
  // checking the slotId exist or not
  const isSlotExist = await SlotModel.findById(id);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This slot is not exist!');
  }
  // checking slot status
  const isBooked = isSlotExist.isBooked;
  if (isBooked === 'booked') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This slot is booked, can not update!',
    );
  }

  const result = await SlotModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
  getSlotsByServiceIdFromDB,
  getAllSlotsFromDB,
  updateSlotStatusIntoDB,
};
