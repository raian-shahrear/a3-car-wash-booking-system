import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GeneralUserServices } from './generalUser.service';

const getAllGeneralUsers = catchAsync(async (req, res) => {
  const result = await GeneralUserServices.getAllGeneralUsersFromDB();
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users are retrieved successfully!',
    data: result,
  });
});

const getSingleGeneralUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GeneralUserServices.getSingleGeneralUserFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is retrieved successfully!',
    data: result,
  });
});

const updateGeneralUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GeneralUserServices.updateGeneralUserIntoDB(
    id,
    req.body,
  );
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is updated successfully!',
    data: result,
  });
});

const deleteGeneralUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GeneralUserServices.deleteGeneralUserFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is deleted successfully!',
    data: result,
  });
});

export const GeneralUserControllers = {
  getAllGeneralUsers,
  getSingleGeneralUser,
  updateGeneralUser,
  deleteGeneralUser,
};
