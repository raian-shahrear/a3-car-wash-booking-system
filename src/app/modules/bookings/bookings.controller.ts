import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './bookings.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking is successful!',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully!',
    data: result,
  });
});

const getSingleBookingByUserId = catchAsync(async (req, res) => {
  const result = await BookingServices.getSingleBookingByUserIdFromDB();

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully!',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBookingByUserId,
};
