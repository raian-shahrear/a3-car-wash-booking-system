import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './services.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service is created successfully!',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDB();

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Services are retrieved successfully!',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service is retrieved successfully!',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceIntoDB(id, req.body);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service is updated successfully!',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service is deleted successfully!',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};