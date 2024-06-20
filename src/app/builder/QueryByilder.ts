import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // filter query
  filter() {
    const queryObj = { ...this.query };
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
