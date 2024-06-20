import express from 'express';
import { BookingControllers } from './bookings.controller';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.get('/', auth('user'), BookingControllers.getBookingByUserId);

export const UserBookingRoutes = router;
