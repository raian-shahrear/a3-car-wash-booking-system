import express from 'express';
import { BookingControllers } from './bookings.controller';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.post('/', auth('user'), BookingControllers.createBooking);
router.get('/', auth('admin'), BookingControllers.getAllBookings);

export const BookingRoutes = router;
