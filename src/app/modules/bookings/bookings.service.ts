import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ServiceModel } from '../services/services.model';
import { TBooking } from './bookings.interface';
import { BookingModel } from './bookings.model';
import { SlotModel } from '../slots/slots.model';
import { UserModel } from '../users/users.model';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryByilder';
import { initialPayment } from '../payment/payment.utils';

const createBookingIntoDB = async (
  payload: TBooking,
  user: Record<string, unknown>,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  const { service, slot } = payload;
  const modifiedPayload = { ...payload };

  // checking the serviceId exist or not
  const isServiceExist = await ServiceModel.findById(service);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }
  // checking service is deleted or not
  const isDeleted = isServiceExist.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This service is deleted!');
  }
  // checking the slotId exist or not
  const isSlotExist = await SlotModel.findById(slot);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This slot is not exist!');
  }
  // checking slot status
  const isBooked = isSlotExist.isBooked;
  if (isBooked === 'booked') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This slot is booked, please try another one!',
    );
  }

  if (loggedInUser) {
    modifiedPayload.customer = loggedInUser._id;
    const TX_ID = `TXID-${Math.random().toString(16).slice(2)}`;
    modifiedPayload.transactionId = TX_ID;

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      // update slot status
      const updateSlotStatus = await SlotModel.findByIdAndUpdate(
        slot,
        { isBooked: 'booked' },
        { new: true, session },
      );
      if (!updateSlotStatus) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book a slot!');
      }

      // create booking
      const result = await BookingModel.create([modifiedPayload], { session });
      if (!result.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book a slot!');
      }

      await session.commitTransaction();
      await session.endSession();

      const booking = await BookingModel.findById(result[0]._id)
        .populate({ path: 'customer', select: '-createdAt -updatedAt' })
        .populate({ path: 'service', select: '-createdAt -updatedAt' })
        .populate({ path: 'slot', select: '-createdAt -updatedAt' });

      const paymentInfo = {
        transactionId: TX_ID,
        price: isServiceExist?.price,
        customerName: loggedInUser?.name,
        customerEmail: loggedInUser?.email,
        customerAddress: loggedInUser?.address,
        customerPhone: loggedInUser?.phone,
      };
      const paymentSession = await initialPayment(paymentInfo);

      return {
        booking,
        paymentSession,
      };
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.BAD_REQUEST, `error: ${err}`);
    }
  }
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(
    BookingModel.find()
      .populate({ path: 'customer', select: '-createdAt -updatedAt' })
      .populate({ path: 'service', select: '-createdAt -updatedAt' })
      .populate({ path: 'slot', select: '-createdAt -updatedAt' }),
    query,
  )
    .filter()
    .sort()
    .paginate();
  const result = await serviceQuery.queryModel;
  const meta = await serviceQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getExpiredBookingByUserIdFromDB = async (
  user: Record<string, unknown>,
  query: Record<string, unknown>,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (loggedInUser) {
    const currentDate = new Date();
    const bookings = await BookingModel.find({ customer: loggedInUser?._id });

    // Check if the slot is expired based on slot date and time
    for (const booking of bookings) {
      const slot = await SlotModel.findById(booking.slot);
      const slotDate = new Date(`${slot?.date}T${slot?.startTime}:00`);
      if (slotDate < currentDate) {
        await BookingModel.findByIdAndUpdate(
          booking._id,
          { isExpired: true },
          { new: true },
        );
      }
    }
    const serviceQuery = new QueryBuilder(
      BookingModel.find({ customer: loggedInUser?._id, isExpired: true })
        .populate({ path: 'service', select: '-createdAt -updatedAt' })
        .populate({ path: 'slot', select: '-createdAt -updatedAt' })
        .select(['-customer']),
      query,
    )
      .filter()
      .paginate();
    const result = await serviceQuery.queryModel;
    const meta = await serviceQuery.countTotal();

    return {
      meta,
      result,
    };
  }
};

const getUpcomingBookingByUserIdFromDB = async (
  user: Record<string, unknown>,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (loggedInUser) {
    const currentDate = new Date();
    const bookings = await BookingModel.find({ customer: loggedInUser?._id });

    // Check if the slot is expired based on slot date and time
    for (const booking of bookings) {
      const slot = await SlotModel.findById(booking.slot);
      const slotDate = new Date(`${slot?.date}T${slot?.startTime}:00`);
      if (slotDate < currentDate) {
        await BookingModel.findByIdAndUpdate(
          booking._id,
          { isExpired: true },
          { new: true },
        );
      }
    }
    const result = await BookingModel.find({
      customer: loggedInUser?._id,
      isExpired: false,
    })
      .populate({ path: 'service', select: '-createdAt -updatedAt' })
      .populate({ path: 'slot', select: '-createdAt -updatedAt' })
      .select(['-customer']);

    return result;
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getExpiredBookingByUserIdFromDB,
  getUpcomingBookingByUserIdFromDB,
};
