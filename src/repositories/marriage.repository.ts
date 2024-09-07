import {inject} from '@loopback/core';
import {Count, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Marriage, MarriageRelations} from '../models';

export class MarriageRepository extends DefaultCrudRepository<
  Marriage,
  typeof Marriage.prototype.id,
  MarriageRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Marriage, dataSource);
  }

  //* count method added
  async countTotal(): Promise<number> {
    const result: Count = await this.count();
    return result.count;
  }
}
