import { Types } from 'mongoose';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  isDeleted: boolean;
};
