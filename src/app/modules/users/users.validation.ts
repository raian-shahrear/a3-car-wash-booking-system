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
    address: z.string(),
    profile: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile: z.string().optional(),
  }),
});

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.string().optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateUserRoleValidationSchema,
  loginValidationSchema,
};
