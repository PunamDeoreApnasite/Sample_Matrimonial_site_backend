import {model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class MarriageAspirants extends User {
  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: false,
  })
  img: string;

  @property({
    type: 'string',
    required: true,
  })
  maritalStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  iAm: string;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'string',
    required: true,
  })
  dateOfBirth: number;

  @property({
    type: 'string',
    required: true,
  })
  motherTongue: string;

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

  //* location
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
    required: true,
  })
  pinCode: string;

  @property({
    type: 'number',
    required: true,
  })
  mobileNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  emailAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  qualification: string;

  @property({
    type: 'string',
    required: true,
  })
  work: string;

  @property({
    type: 'string',
    required: true,
  })
  as: string;

  @property({
    type: 'number',
    required: true,
  })
  income: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'string',
    required: true,
  })
  bodyType: string;

  @property({
    type: 'string',
    required: true,
  })
  complexion: string;

  @property({
    type: 'string',
    required: true,
  })

  eyeColor: string;




  @property({
    type: 'string',
    required: true,
  })
  hairColor: string;

  @property({
    type: 'string',
    required: true,
  })
  healthStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  physicalDisabilities: string;

  @property({
    type: 'string',
    required: true,
  })
  fathersName: string;

  @property({
    type: 'string',
    required: true,
  })
  fathersStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  mothersName: string;

  @property({
    type: 'string',
    required: true,
  })
  mothersStatus: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      type: 'number'
    }
  })
  numberOfBrothers: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      type: 'number'
    }
  })
  numberOfBrothersMarried: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      type: 'number'
    }
  })
  numberOfSisters: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      type: 'number'
    }


  })





  numberOfSistersMarried: number;

  constructor(data?: Partial<MarriageAspirants>) {
    super(data);
  }
}

export interface MarriageAspirantsRelations {
  // describe navigational properties here
}

export type MarriageAspirantsWithRelations = MarriageAspirants & MarriageAspirantsRelations;
