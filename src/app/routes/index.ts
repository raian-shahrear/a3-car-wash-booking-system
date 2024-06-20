import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { ServiceRoutes } from '../modules/services/services.route';
import { SlotRoutes } from '../modules/slots/slots.route';

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
  // {
  //   path: '/auth',
  //   route: 'AuthRoutes',
  // },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
