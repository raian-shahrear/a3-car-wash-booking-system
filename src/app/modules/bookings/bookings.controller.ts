import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './bookings.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking is successful!',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  // send response
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'All bookings retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

const getBookingByUserId = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingByUserIdFromDB(req.user);

  // send response
  sendResponse(res, {
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? 'User bookings retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getBookingByUserId,
};
