import express from 'express';
import { BookingControllers } from './bookings.controller';
import auth from '../../middlewares/user.auth';

const router = express.Router();

router.get(
  '/expired',
  auth('user'),
  BookingControllers.getExpiredBookingByUserId,
);
router.get(
  '/upcoming',
  auth('user'),
  BookingControllers.getUpcomingBookingByUserId,
);

export const UserBookingRoutes = router;
