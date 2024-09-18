import express from 'express';
import { SlotControllers } from './slots.controller';
import auth from '../../middlewares/user.auth';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slots.validation';

const router = express.Router();

router.get('/', SlotControllers.getAllSlots);
router.get('/availability', SlotControllers.getAvailableSlots);
router.get('/:serviceId', SlotControllers.getSlotsByServiceId);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(SlotValidations.updateSlotStatusValidationSchema),
  SlotControllers.updateSlotStatus,
);

export const SlotRoutes = router;
