export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  profile: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};
