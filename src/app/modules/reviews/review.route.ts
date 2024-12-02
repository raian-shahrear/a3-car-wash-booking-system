import express from 'express';
import auth from '../../middlewares/user.auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './reviews.validation';
import { ReviewControllers } from './reviews.controller';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);
router.get('/', ReviewControllers.getAllReviews);
router.get('/my-reviews', auth('user'), ReviewControllers.getReviewsByUserId);
router.patch(
  '/:id',
  auth('user'),
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewControllers.updateProduct,
);
router.delete('/:id', auth('admin', 'user'), ReviewControllers.deleteReview);

export const ReviewRoutes = router;
