import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Event} from '../models';
import {EventRepository, MarriageAspirantsRepository, MarriageRepository, SuccessStoriesRepository} from '../repositories';


export class EventController {
  constructor(
    @repository(EventRepository)
    public eventRepository: EventRepository,

    @repository(MarriageAspirantsRepository)
    public marriageAspirantsRepository: MarriageAspirantsRepository,

    @repository(MarriageRepository)
    public marriageRepository: MarriageRepository,

    @repository(SuccessStoriesRepository)
    public successStoriesRepository: SuccessStoriesRepository,
  ) { }
  @post('/events')
  @response(200, {
    description: 'Event model instance',
    content: {'application/json': {schema: getModelSchemaRef(Event)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {
            title: 'NewEvent',
            exclude: ['id'],
          }),
        },
      },
    })
    event: Omit<Event, 'id'>,
  ): Promise<Event> {
    return this.eventRepository.create(event);
  }


  //* New API Endpoint to get Counts of Events, Upcoming Events, and Successfull Events
  @get('/events/counts')
  @response(200, {
    description: 'Counts of Events, Upcoming Events, and Successfull Events',
    content: {'application/json': {schema: {type: 'array', items: {type: 'object'}}}},
  })
  async getCounts(): Promise<{heading: string, count: number}[]> {
    const totalMarriage = await this.marriageRepository.countTotal();
    const totalUpcomingEvents = await this.eventRepository.countTotal();
    const totalUpcomingMarriage = await this.marriageRepository.countTotal();
    const totalMarriageDone = await this.successStoriesRepository.countTotal();

    return [
      {heading: 'Total Marriage', count: totalMarriage},
      {heading: 'Upcoming Events', count: totalUpcomingEvents},
      {heading: 'Upcoming Marriages', count: totalUpcomingMarriage},
      {heading: 'Successful Marriages', count: totalMarriageDone},
    ];
  }




  @get('/events/count')
  @response(200, {
    description: 'Event model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Event) where?: Where<Event>,
  ): Promise<Count> {
    return this.eventRepository.count(where);
  }

  @get('/events')
  @response(200, {
    description: 'Array of Event model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Event, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Event) filter?: Filter<Event>,
  ): Promise<Event[]> {
    return this.eventRepository.find(filter);
  }

  @patch('/events')
  @response(200, {
    description: 'Event PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {partial: true}),
        },
      },
    })
    event: Event,
    @param.where(Event) where?: Where<Event>,
  ): Promise<Count> {
    return this.eventRepository.updateAll(event, where);
  }

  @get('/events/{id}')
  @response(200, {
    description: 'Event model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Event, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Event, {exclude: 'where'}) filter?: FilterExcludingWhere<Event>
  ): Promise<Event> {
    return this.eventRepository.findById(id, filter);
  }

  @patch('/events/{id}')
  @response(204, {
    description: 'Event PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {partial: true}),
        },
      },
    })
    event: Event,
  ): Promise<void> {
    await this.eventRepository.updateById(id, event);
  }

  @put('/events/{id}')
  @response(204, {
    description: 'Event PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() event: Event,
  ): Promise<void> {
    await this.eventRepository.replaceById(id, event);
  }

  @del('/events/{id}')
  @response(204, {
    description: 'Event DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventRepository.deleteById(id);
  }
}
