import { z } from 'zod';

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isBooked: z.enum(['available', 'booked']),
  }),
});

export const SlotValidations = {
  createSlotValidationSchema,
};
