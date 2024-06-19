export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
  passwordChangedAt?: Date;
  isDeleted: boolean;
};
