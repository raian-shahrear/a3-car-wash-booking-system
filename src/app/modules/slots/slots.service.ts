import QueryBuilder from '../../builder/QueryByilder';
import { SlotModel } from './slots.model';

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const newQuery = { ...query };
  if (query.serviceId) {
    delete newQuery.serviceId;
    newQuery.service = query.serviceId;
  }

  const slotQuery = new QueryBuilder(
    SlotModel.find({ isBooked: 'available' }),
    newQuery,
  ).filter();
  const result = await slotQuery.queryModel;
  return result;
};

const getSlotsByServiceIdFromDB = async (id: string) => {
  const result = await SlotModel.find({ service: id, isBooked: 'available' });
  return result;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
  getSlotsByServiceIdFromDB,
};
