import {Entity, model, property} from '@loopback/repository';

@model()
export class Marriage extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  brideName?: string;

  @property({
    type: 'string',
    required: true,
  })
  groomName?: string;

  @property({
    type: 'string',
    required: true,
  })
  marriageDate?: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
    required: true,
  })
  marriageType: string;

  @property({
    type: 'string',
    required: true,
  })
  witness1: string;

  @property({
    type: 'string',
    required: true,
  })
  witness2: string;

  constructor(data?: Partial<Marriage>) {
    super(data);
  }
}

export interface MarriageRelations {
  // describe navigational properties here
}

export type MarriageWithRelations = Marriage & MarriageRelations;
