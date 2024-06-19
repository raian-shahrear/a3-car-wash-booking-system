import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { GeneralUserRoutes } from '../modules/generalUser/generalUser.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/general-users',
    route: GeneralUserRoutes,
  },
  // {
  //   path: '/auth',
  //   route: 'AuthRoutes',
  // },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
