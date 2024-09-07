import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  response
} from '@loopback/rest';
import {MarriageAspirantsView} from '../models';
import {MarriageAspirantsViewRepository} from '../repositories';

export class MarriageAspirantsViewController {
  constructor(
    @repository(MarriageAspirantsViewRepository)
    public marriageAspirantsViewRepository : MarriageAspirantsViewRepository,
  ) {}

  @get('/marriage-aspirants/search/count')
  @response(200, {
    description: 'MarriageAspirantsView model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MarriageAspirantsView) where?: Where<MarriageAspirantsView>,
  ): Promise<Count> {
    return this.marriageAspirantsViewRepository.count(where);
  }

  @get('/marriage-aspirants/search')
  @response(200, {
    description: 'Array of MarriageAspirantsView model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MarriageAspirantsView, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MarriageAspirantsView) filter?: Filter<MarriageAspirantsView>,
  ): Promise<MarriageAspirantsView[]> {
    return this.marriageAspirantsViewRepository.find(filter);
  }

  @get('/marriage-aspirants/search/{id}')
  @response(200, {
    description: 'MarriageAspirantsView model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MarriageAspirantsView, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MarriageAspirantsView, {exclude: 'where'}) filter?: FilterExcludingWhere<MarriageAspirantsView>
  ): Promise<MarriageAspirantsView> {
    return this.marriageAspirantsViewRepository.findById(id, filter);
  }
}
