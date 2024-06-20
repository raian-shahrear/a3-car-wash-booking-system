import express from 'express';
import { SlotControllers } from './slots.controller';

const router = express.Router();

router.get('/availability', SlotControllers.getAvailableSlots);
router.get('/:serviceId', SlotControllers.getSlotsByServiceId);

export const SlotRoutes = router;
