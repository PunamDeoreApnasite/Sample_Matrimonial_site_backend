import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Marriage} from '../models';
import {MarriageRepository} from '../repositories';

export class MarriageController {
  constructor(
    @repository(MarriageRepository)
    public marriageRepository : MarriageRepository,
  ) {}

  @post('/marriages')
  @response(200, {
    description: 'Marriage model instance',
    content: {'application/json': {schema: getModelSchemaRef(Marriage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marriage, {
            title: 'NewMarriage',
            exclude: ['id'],
          }),
        },
      },
    })
    marriage: Omit<Marriage, 'id'>,
  ): Promise<Marriage> {
    return this.marriageRepository.create(marriage);
  }

  @get('/marriages/count')
  @response(200, {
    description: 'Marriage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Marriage) where?: Where<Marriage>,
  ): Promise<Count> {
    return this.marriageRepository.count(where);
  }

  @get('/marriages')
  @response(200, {
    description: 'Array of Marriage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Marriage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Marriage) filter?: Filter<Marriage>,
  ): Promise<Marriage[]> {
    return this.marriageRepository.find(filter);
  }

  @patch('/marriages')
  @response(200, {
    description: 'Marriage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marriage, {partial: true}),
        },
      },
    })
    marriage: Marriage,
    @param.where(Marriage) where?: Where<Marriage>,
  ): Promise<Count> {
    return this.marriageRepository.updateAll(marriage, where);
  }

  @get('/marriages/{id}')
  @response(200, {
    description: 'Marriage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Marriage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Marriage, {exclude: 'where'}) filter?: FilterExcludingWhere<Marriage>
  ): Promise<Marriage> {
    return this.marriageRepository.findById(id, filter);
  }

  @patch('/marriages/{id}')
  @response(204, {
    description: 'Marriage PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marriage, {partial: true}),
        },
      },
    })
    marriage: Marriage,
  ): Promise<void> {
    await this.marriageRepository.updateById(id, marriage);
  }

  @put('/marriages/{id}')
  @response(204, {
    description: 'Marriage PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() marriage: Marriage,
  ): Promise<void> {
    await this.marriageRepository.replaceById(id, marriage);
  }

  @del('/marriages/{id}')
  @response(204, {
    description: 'Marriage DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.marriageRepository.deleteById(id);
  }
}
