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
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// hide soft-deleted data before showing
serviceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
serviceSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ServiceModel = model<TService>('Service', serviceSchema);
