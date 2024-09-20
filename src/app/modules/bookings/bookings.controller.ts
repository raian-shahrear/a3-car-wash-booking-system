import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './bookings.service';
import { TBooking } from './bookings.interface';

const createBooking = catchAsync(async (req, res) => {
  const newBooking: TBooking = {
    service: req.body.serviceId,
    slot: req.body.slotId,
    vehicleType: req.body.vehicleType,
    vehicleBrand: req.body.vehicleBrand,
    vehicleModel: req.body.vehicleModel,
    manufacturingYear: req.body.manufacturingYear,
    registrationPlate: req.body.registrationPlate,
  };
  const result = await BookingServices.createBookingIntoDB(
    newBooking,
    req.user,
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking is successful!',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req.query);

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'All bookings retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

const getExpiredBookingByUserId = catchAsync(async (req, res) => {
  const result = await BookingServices.getExpiredBookingByUserIdFromDB(
    req.user,
    req.query,
  );

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'Your bookings retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

const getUpcomingBookingByUserId = catchAsync(async (req, res) => {
  const result = await BookingServices.getUpcomingBookingByUserIdFromDB(
    req.user,
  );

  // send response
  sendResponse(res, {
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? 'Your bookings retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getExpiredBookingByUserId,
  getUpcomingBookingByUserId,
};
