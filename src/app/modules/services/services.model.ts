import { Schema, model } from 'mongoose';
import { TService } from './services.interface';

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const ServiceModel = model<TService>('Service', serviceSchema);
