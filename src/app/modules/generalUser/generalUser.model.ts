import { Schema, model } from 'mongoose';
import { TGeneralUser } from './generalUser.interface';

const generalUserSchema = new Schema<TGeneralUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// hide deleted:soft data before showing
generalUserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
generalUserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const GeneralUserModel = model<TGeneralUser>(
  'GeneralUser',
  generalUserSchema,
);
