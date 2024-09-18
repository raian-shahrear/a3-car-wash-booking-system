import express from 'express';
import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.registerUser,
);
router.patch(
  '/user/:id',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);
router.patch(
  '/user-role/:id',
  auth('admin'),
  validateRequest(UserValidation.updateUserRoleValidationSchema),
  UserControllers.updateUserRole,
);
router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);
router.get('/users', auth('admin', 'user'), UserControllers.getAllUsers);

export const UserRoutes = router;
