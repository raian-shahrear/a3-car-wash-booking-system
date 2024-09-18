import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number(),
    review: z.string(),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number().optional(),
    review: z.string().optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
