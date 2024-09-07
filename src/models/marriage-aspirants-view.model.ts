import {model, property} from '@loopback/repository';
import {MarriageAspirants} from './marriage-aspirants.model';

@model({settings: {strict: false}})
export class MarriageAspirantsView extends MarriageAspirants {
  @property({
    type: 'string',
  })
  extra?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MarriageAspirantsView>) {
    super(data);
  }
}

export interface MarriageAspirantsViewRelations {
  // describe navigational properties here
}

export type MarriageAspirantsViewWithRelations = MarriageAspirantsView & MarriageAspirantsViewRelations;
