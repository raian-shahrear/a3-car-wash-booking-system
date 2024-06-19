import express from 'express';
import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.registerUser,
);
router.get('/users', UserControllers.getAllUsers);

export const UserRoutes = router;
