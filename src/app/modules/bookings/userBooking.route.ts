import express from 'express';
import { BookingControllers } from './bookings.controller';

const router = express.Router();

router.get('/', BookingControllers.getSingleBookingByUserId);

export const UserBookingRoutes = router;
