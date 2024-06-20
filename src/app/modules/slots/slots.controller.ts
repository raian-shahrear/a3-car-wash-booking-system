import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slots.service';

const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAvailableSlotsFromDB(req.query);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Available slots are retrieved successfully!',
    data: result,
  });
});

const getSlotsByServiceId = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const result = await SlotServices.getSlotsByServiceIdFromDB(serviceId);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Available slots for specific service are retrieved successfully!',
    data: result,
  });
});

export const SlotControllers = {
  getAvailableSlots,
  getSlotsByServiceId,
};
