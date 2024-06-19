import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admins',
    route: 'AdminRoutes',
  },
  {
    path: '/users',
    route: 'UserRoutes',
  },
  {
    path: '/auth',
    route: 'AuthRoutes',
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
