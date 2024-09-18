import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './services.validation';
import { ServiceControllers } from './services.controller';
import { SlotValidations } from '../slots/slots.validation';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);
router.get('/', ServiceControllers.getAllServices);
router.get('/featured', ServiceControllers.getFeaturedServices);
router.get('/service-list', ServiceControllers.getServiceNameList);
router.get('/:id', ServiceControllers.getSingleService);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService,
);
router.delete('/:id', auth('admin'), ServiceControllers.deleteService);
router.post(
  '/slots',
  auth('admin'),
  validateRequest(SlotValidations.createSlotValidationSchema),
  ServiceControllers.createSlots,
);

export const ServiceRoutes = router;
