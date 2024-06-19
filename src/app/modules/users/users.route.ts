import express from 'express';
import { UserControllers } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { GeneralUserValidations } from '../generalUser/generalUser.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(GeneralUserValidations.createGeneralUserValidationSchema),
  UserControllers.createGeneralUser,
);

// router.post(
//   '/create-admin',
//   UserControllers.createAdmin,
// );

export const UserRoutes = router;
