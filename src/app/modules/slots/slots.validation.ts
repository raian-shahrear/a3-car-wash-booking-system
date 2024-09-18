import { z } from 'zod';

const timeFormatSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  { message: "Invalid time formate! Expected 'HH:MM' in 24 hours formate." },
);

const dateFormatSchema = z.string().refine(
  (date) => {
    const regex =
      /^(?:\d{4})-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))$/;
    return regex.test(date);
  },
  {
    message:
      "Invalid date formate! Expected 'YYYY-MM-DD' in right day/month formate.",
  },
);

const createSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string(),
      date: dateFormatSchema,
      startTime: timeFormatSchema,
      endTime: timeFormatSchema,
    })
    .refine(
      (body) => {
        // endTime must be bigger than statTime
        const start = new Date(`1971-01-01T${body.startTime}:00`);
        const end = new Date(`1971-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: 'End Time must be bigger than Stat Time!' },
    ),
});

const updateSlotStatusValidationSchema = z.object({
  body: z.object({
    isBooked: z.enum(['available', 'booked', 'cancelled']),
  }),
});

export const SlotValidations = {
  createSlotValidationSchema,
  updateSlotStatusValidationSchema,
};
