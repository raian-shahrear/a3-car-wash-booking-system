import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './services.validation';
import { ServiceControllers } from './services.controller';
import { SlotValidations } from '../slots/slots.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);
router.get('/', ServiceControllers.getAllServices);
router.get('/:id', ServiceControllers.getSingleService);
router.put(
  '/:id',
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService,
);
router.delete('/:id', ServiceControllers.deleteService);
router.post(
  '/slots',
  validateRequest(SlotValidations.createSlotValidationSchema),
  ServiceControllers.createSlots,
);

export const ServiceRoutes = router;
