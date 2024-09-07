import {inject} from '@loopback/core';
import {Count, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MarriageAspirants, MarriageAspirantsRelations} from '../models';

export class MarriageAspirantsRepository extends DefaultCrudRepository<
  MarriageAspirants,
  typeof MarriageAspirants.prototype.id,
  MarriageAspirantsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MarriageAspirants, dataSource);
  }

  // Updated method return type to `number`
async countByGender(gender: string): Promise<number> {
  const result: Count = await this.count({gender});
  return result.count; // Return the `count` property
}

// Implemented the countTotal method
async countTotal(): Promise<number> {
  const result: Count = await this.count();
  return result.count; // Return the `count` property
}

}
