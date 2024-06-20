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
router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);
router.get('/users', auth('admin'), UserControllers.getAllUsers);

export const UserRoutes = router;
