import { UserModel } from './users.model';

// Create user ID
const findLastUserId = async () => {
  const lastUser = await UserModel.findOne({ role: 'user' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  //   User-0001
  return lastUser?.id ? lastUser.id : undefined;
};
export const generatedUserId = async () => {
  let currentId = (0).toString(); // 0000
  const lastUserId = await findLastUserId();
  if (lastUserId) {
    currentId = lastUserId.substring(6); // 0001
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `User-${incrementId}`;
  return incrementId;
};

// Create Admin ID
const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    { role: 'admin' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  //   A-0001
  return lastAdmin?.id ? lastAdmin.id : undefined;
};
export const generatedAdminId = async () => {
  let currentId = (0).toString(); // 0000
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentId = lastAdminId.substring(2); // 0001
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};
