import {inject} from '@loopback/core';
import {Count, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {SuccessStories, SuccessStoriesRelations} from '../models';

export class SuccessStoriesRepository extends DefaultCrudRepository<
  SuccessStories,
  typeof SuccessStories.prototype.id,
  SuccessStoriesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SuccessStories, dataSource);
  }


  //* count method added
  async countTotal(): Promise<number> {
    const result: Count = await this.count();
    return result.count;
  }
}
