import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MarriageAspirantsView, MarriageAspirantsViewRelations} from '../models';

export class MarriageAspirantsViewRepository extends DefaultCrudRepository<
  MarriageAspirantsView,
  typeof MarriageAspirantsView.prototype.id,
  MarriageAspirantsViewRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MarriageAspirantsView, dataSource);
  }
}
