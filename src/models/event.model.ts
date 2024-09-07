import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Event extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  eventName?: string;

  @property({
    type: 'string',
  })
  eventDate?: string;

  @property({
    type: 'string',
  })
  eventTime?: string;

  @property({
    type: 'string',
  })
  eventLocation?: string;

  @property({
    type: 'string',
  })
  eventDescription?: string;

  @property({
    type: 'string',
  })
  organizer?: string;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
