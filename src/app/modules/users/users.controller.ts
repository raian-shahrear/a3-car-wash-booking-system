import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './users.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is registered successfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users are retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  getAllUsers,
};
