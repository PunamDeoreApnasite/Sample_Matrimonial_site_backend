import {model, property} from '@loopback/repository';
import {Vendor} from './vendor.model';

@model({settings: {strict: false}})
export class VendorView extends Vendor {
  @property({
    type: 'string',
  })
  extra?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VendorView>) {
    super(data);
  }
}

export interface VendorViewRelations {
  // describe navigational properties here
}

export type VendorViewWithRelations = VendorView & VendorViewRelations;
