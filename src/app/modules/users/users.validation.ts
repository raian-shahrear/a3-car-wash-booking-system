import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .max(18, { message: "Password can't be more than 18 characters" })
      .min(6, { message: 'Password must be at least 6 characters' })
      .optional(),
    phone: z.string(),
    role: z.enum(['admin', 'user']),
    address: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
