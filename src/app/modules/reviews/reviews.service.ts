import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../users/users.model';
import { TReview } from './reviews.interface';
import { ReviewModel } from './reviews.model';
import QueryBuilder from '../../builder/QueryByilder';

const createReviewIntoDB = async (
  payload: TReview,
  user: Record<string, unknown>,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  const modifiedPayload = { ...payload };

  if (loggedInUser) {
    modifiedPayload.user = loggedInUser._id;
    const result = await ReviewModel.create(modifiedPayload);
    return result;
  }
};

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(
    ReviewModel.find().populate('user'),
    query,
  )
    .sort()
    .paginate();
  const result = await serviceQuery.queryModel;
  const meta = await serviceQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getReviewsByUserIdFromDB = async (
  query: Record<string, unknown>,
  payload: Record<string, unknown>,
) => {
  const loggedInUser = await UserModel.findOne({ email: payload.userEmail });
  if (loggedInUser) {
    const serviceQuery = new QueryBuilder(
      ReviewModel.find({ user: loggedInUser?._id }).populate('user'),
      query,
    )
      .sort()
      .paginate();
    const result = await serviceQuery.queryModel;
    const meta = await serviceQuery.countTotal();
    return {
      meta,
      result,
    };
  }
};

const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
  // checking the id exist or not
  const isReviewExist = await ReviewModel.findById(id);
  if (!isReviewExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This review is not exist!');
  }

  const result = await ReviewModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  // checking the id exist or not
  const isReviewExist = await ReviewModel.findById(id);
  if (!isReviewExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This review is not exist!');
  }

  const result = await ReviewModel.findByIdAndDelete(id);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getReviewsByUserIdFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
};
