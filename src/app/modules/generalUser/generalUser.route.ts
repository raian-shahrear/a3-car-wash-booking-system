import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { GeneralUserControllers } from './generalUser.controller';
import { GeneralUserValidations } from './generalUser.validation';

const router = express.Router();

router.get('/', GeneralUserControllers.getAllGeneralUsers);
router.get('/:id', GeneralUserControllers.getSingleGeneralUser);
router.patch(
  '/:id',
  validateRequest(GeneralUserValidations.updateGeneralUserValidationSchema),
  GeneralUserControllers.updateGeneralUser,
);
router.delete('/:id', GeneralUserControllers.deleteGeneralUser);

export const GeneralUserRoutes = router;
