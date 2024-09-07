import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Vendor extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  //* community name
  @property({
    type: 'string',
  })
  communityName?: string;

  //* vendor name
  @property({
    type: 'string',
  })
  vendorName?: string;

  //* establish date
  @property({
    type: 'string',
    required: true,
  })
  establishDate: string;

  //* email address
  @property({
    type: 'string',
    required: true,
  })
  emailAddress: string;

  //* mobile number
  @property({
    type: 'string',
    required: true,
  })
  mobileNumber: string;

  //*image
  @property({
    type: 'string',
    required: true,
  })
  image: string;


  //* address line 1
  @property({
    type: 'string',
    required: true,
  })
  addressLine1: string;

  //* address line 2
  @property({
    type: 'string',
  })
  addressLine2?: string;

  //* address line 3
  @property({
    type: 'string',
  })
  addressLine3?: string;

  //* area
  @property({
    type: 'string',
    required: true,
  })
  area: string;

  //* old location to loc bcz of autocomplete field
  @property({
    type: 'string',
    required: true,
  })
  loc: string;

  //* location for autocomplete
  @property({
    type: 'string',
    required: true,
  })
  location: string;

  //* city
  @property({
    type: 'string',
    required: true,
  })
  city: string;

  //* state
  @property({
    type: 'string',
    required: true,
  })
  state: string;

  //* country
  @property({
    type: 'string',
    required: true,
  })
  country: string;

  //* pin code
  @property({
    type: 'string',
  })
  pinCode?: string;

  constructor(data?: Partial<Vendor>) {
    super(data);
  }
}

export interface VendorRelations {
  // define navigational properties here
}

export type VendorWithRelations = Vendor & VendorRelations;

// hjahjsvchjsv
