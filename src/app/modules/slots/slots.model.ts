import { Schema, model } from 'mongoose';
import { TSlot } from './slots.interface';

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'cancelled', 'expired'],
      default: 'available',
    },
  },
  { timestamps: true },
);

export const SlotModel = model<TSlot>('Slots', slotSchema);
