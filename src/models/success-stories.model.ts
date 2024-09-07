import {model, property} from '@loopback/repository';
import {User} from './user.model'; // Assuming this is the correct import

@model()
export class SuccessStories extends User {
  @property({
    type: 'string',
    required: true,
  })
  storyTitle: string;

  @property({
    type: 'string',
    required: true,
  })
  storyDescription: string;

  @property({
    type: 'string',
    required: true,
  })
  dateOfSuccess: string;

  @property({
    type: 'string',
    required: true,
  })
  profilePhoto: string;


  constructor(data?: Partial<SuccessStories>) {
    super(data);
  }
}

export interface SuccessStoriesRelations {
  // describe navigational properties here
}

export type SuccessStoriesWithRelations = SuccessStories & SuccessStoriesRelations;
