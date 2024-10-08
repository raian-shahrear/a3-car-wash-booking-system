import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { ServiceRoutes } from '../modules/services/services.route';
import { SlotRoutes } from '../modules/slots/slots.route';
import { BookingRoutes } from '../modules/bookings/bookings.route';
import { UserBookingRoutes } from '../modules/bookings/userBooking.route';
import { ReviewRoutes } from '../modules/reviews/review.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: UserBookingRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
