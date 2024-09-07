import {inject} from '@loopback/core';
import {Count, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Event, EventRelations} from '../models';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Event, dataSource);
  }
  //* count method added
  async countTotal(): Promise<number> {
    const result: Count = await this.count();
    return result.count;
  }
}
