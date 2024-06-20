import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ServiceModel } from '../services/services.model';
import { TBooking } from './bookings.interface';
import { BookingModel } from './bookings.model';
import { SlotModel } from '../slots/slots.model';
import { ObjectId } from 'mongodb';

const createBookingIntoDB = async (payload: TBooking) => {
  const { serviceId, slotId } = payload;
  // checking the serviceId exist or not
  const isServiceExist = await ServiceModel.findById(serviceId);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }
  // checking service is deleted or not
  const isDeleted = isServiceExist.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This service is deleted!');
  }
  // checking the slotId exist or not
  const isSlotExist = await SlotModel.findById(slotId);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This slot is not exist!');
  }
  const isBooked = isSlotExist.isBooked;
  if (isBooked === 'booked') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This slot is booked, please try another!',
    );
  }

  const modifiedPayload = { ...payload };
  modifiedPayload.customer = new ObjectId('667475d8562464b5610a8e7b');

  // update slot status
  await SlotModel.findByIdAndUpdate(
    slotId,
    { isBooked: 'booked' },
    { new: true },
  );
  // create booking
  const result = await BookingModel.create(modifiedPayload);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find()
    .populate('customer')
    .populate('serviceId')
    .populate('slotId');
  return result;
};

const getSingleBookingByUserIdFromDB = async () => {
  const userId = new ObjectId('667475d8562464b5610a8e7b');
  const result = await BookingModel.find({ customer: userId })
    .populate('customer')
    .populate('serviceId')
    .populate('slotId');
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingByUserIdFromDB,
};
