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
import {SuccessStories} from '../models';
import {SuccessStoriesRepository} from '../repositories';

export class SuccessStoriesController {
  constructor(
    @repository(SuccessStoriesRepository)
    public successStoriesRepository : SuccessStoriesRepository,
  ) {}

  @post('/success-stories')
  @response(200, {
    description: 'SuccessStories model instance',
    content: {'application/json': {schema: getModelSchemaRef(SuccessStories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SuccessStories, {
            title: 'NewSuccessStories',
            exclude: ['id'],
          }),
        },
      },
    })
    successStories: Omit<SuccessStories, 'id'>,
  ): Promise<SuccessStories> {
    return this.successStoriesRepository.create(successStories);
  }

  @get('/success-stories/count')
  @response(200, {
    description: 'SuccessStories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SuccessStories) where?: Where<SuccessStories>,
  ): Promise<Count> {
    return this.successStoriesRepository.count(where);
  }

  @get('/success-stories')
  @response(200, {
    description: 'Array of SuccessStories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SuccessStories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SuccessStories) filter?: Filter<SuccessStories>,
  ): Promise<SuccessStories[]> {
    return this.successStoriesRepository.find(filter);
  }

  @patch('/success-stories')
  @response(200, {
    description: 'SuccessStories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SuccessStories, {partial: true}),
        },
      },
    })
    successStories: SuccessStories,
    @param.where(SuccessStories) where?: Where<SuccessStories>,
  ): Promise<Count> {
    return this.successStoriesRepository.updateAll(successStories, where);
  }

  @get('/success-stories/{id}')
  @response(200, {
    description: 'SuccessStories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SuccessStories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SuccessStories, {exclude: 'where'}) filter?: FilterExcludingWhere<SuccessStories>
  ): Promise<SuccessStories> {
    return this.successStoriesRepository.findById(id, filter);
  }

  @patch('/success-stories/{id}')
  @response(204, {
    description: 'SuccessStories PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SuccessStories, {partial: true}),
        },
      },
    })
    successStories: SuccessStories,
  ): Promise<void> {
    await this.successStoriesRepository.updateById(id, successStories);
  }

  @put('/success-stories/{id}')
  @response(204, {
    description: 'SuccessStories PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() successStories: SuccessStories,
  ): Promise<void> {
    await this.successStoriesRepository.replaceById(id, successStories);
  }

  @del('/success-stories/{id}')
  @response(204, {
    description: 'SuccessStories DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.successStoriesRepository.deleteById(id);
  }
}
