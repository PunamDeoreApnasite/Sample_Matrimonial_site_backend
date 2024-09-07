import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {VendorView, VendorViewRelations} from '../models';

export class VendorViewRepository extends DefaultCrudRepository<
  VendorView,
  typeof VendorView.prototype.id,
  VendorViewRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(VendorView, dataSource);
  }
}
