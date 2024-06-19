import { z } from 'zod';

const createGeneralUserValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .max(18, { message: "Password can't be more than 18 characters" })
      .min(6, { message: 'Password must be at least 6 characters' }),
    user: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      address: z.string(),
    }),
  }),
});

const updateGeneralUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const GeneralUserValidations = {
  createGeneralUserValidationSchema,
  updateGeneralUserValidationSchema,
};
