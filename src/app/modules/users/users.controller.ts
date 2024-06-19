import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './users.service';

const createGeneralUser = catchAsync(async (req, res) => {
  const { password, user } = req.body;
  const result = await UserServices.createGeneralUserIntoDB(password, user);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is created successfully!',
    data: result,
  });
});

// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin } = req.body;
//   const result = await UserServices.createAdminIntoDB(password, admin);
//   // send response
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     message: 'Admin is created successfully!',
//     data: result,
//   });
// });

export const UserControllers = {
  createGeneralUser,
  // createAdmin
};
