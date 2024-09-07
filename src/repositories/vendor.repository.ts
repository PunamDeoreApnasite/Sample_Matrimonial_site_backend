import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Vendor, VendorRelations } from '../models';

export class VendorRepository extends DefaultCrudRepository<
  Vendor,
  typeof Vendor.prototype.id,
  VendorRelations
> {
  constructor(
    @inject('datasources.db') dataSource: juggler.DataSource,
  ) {
    super(Vendor, dataSource);
  }
}
