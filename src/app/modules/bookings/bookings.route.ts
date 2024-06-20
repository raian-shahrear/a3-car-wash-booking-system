import express from 'express';
import { BookingControllers } from './bookings.controller';

const router = express.Router();

router.post('/', BookingControllers.createBooking);
router.get('/', BookingControllers.getAllBookings);
router.get('/', BookingControllers.getSingleBookingByUserId);

export const BookingRoutes = router;
