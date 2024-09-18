import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slots.service';

const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAvailableSlotsFromDB(req.query);

  // send response
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'Available slots are retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

const getSlotsByServiceId = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const result = await SlotServices.getSlotsByServiceIdFromDB(serviceId);

  // send response
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'Available slots for specific service are retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'All slots are retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

const updateSlotStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.updateSlotStatusIntoDB(id, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot status is updated successfully!',
    data: result,
  });
});

export const SlotControllers = {
  getAvailableSlots,
  getSlotsByServiceId,
  getAllSlots,
  updateSlotStatus,
};
