import {Entity, model, property} from '@loopback/repository';

@model()
export class Subscription extends Entity {
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
  subscriptionName: string;

  @property({
    type: 'string',
    required: true,
  })
  subscriptionType: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'date',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
  })
  startDate: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'date',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  paymentDetails: number;

  @property({
    type: 'boolean',
    required: true,
  })
  profileView: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  ProfileViews: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  profileViewss: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  unlimitedViews: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  prioritySupport: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  marriagePlanning: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  unlimitedVendorView: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  communicationSupport: boolean;


  constructor(data?: Partial<Subscription>) {
    super(data);
  }
}

export interface SubscriptionRelations {
  // Add any navigational properties here
}

export type SubscriptionWithRelations = Subscription & SubscriptionRelations;
