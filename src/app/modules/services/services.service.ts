import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TService } from './services.interface';
import { ServiceModel } from './services.model';
import { TSlot } from '../slots/slots.interface';
import { SlotModel } from '../slots/slots.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }

  return isServiceExist;
};

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }
  // checking service is deleted or not
  const isDeleted = isServiceExist.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is deleted!');
  }

  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    upsert: true,
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  // checking the id exist or not
  const isServiceExist = await ServiceModel.findById(id);
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not exist!');
  }

  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

const createSlotsIntoDB = async (payload: TSlot) => {
  const { service, startTime, endTime } = payload;

  // Function to convert time to minutes
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  // Convert start and end times to minutes
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  // Calculate total duration in minutes
  const totalDuration = endMinutes - startMinutes;
  // Calculate the number of slots
  const isServiceExist = await ServiceModel.findById(service);
  const slotDuration = isServiceExist?.duration;
  const numberOfSlots = totalDuration / (slotDuration as number);

  // Generate slots
  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * (slotDuration as number);
    const slotEndMinutes = slotStartMinutes + (slotDuration as number);

    const formatTime = (minutes: number) => {
      const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
      const mins = String(minutes % 60).padStart(2, '0');
      return `${hours}:${mins}`;
    };

    const newSlot = { ...payload };
    newSlot.startTime = formatTime(slotStartMinutes);
    newSlot.endTime = formatTime(slotEndMinutes);
    slots.push(newSlot);
  }

  const result = await SlotModel.create(slots);
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  createSlotsIntoDB,
};
