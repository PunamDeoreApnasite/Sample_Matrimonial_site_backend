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
import {VendorView} from '../models';
import {VendorViewRepository} from '../repositories';

export class VendorViewController {
  constructor(
    @repository(VendorViewRepository)
    public vendorViewRepository : VendorViewRepository,
  ) {}

 

  @get('/vendors/search/count')
  @response(200, {
    description: 'VendorView model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VendorView) where?: Where<VendorView>,
  ): Promise<Count> {
    return this.vendorViewRepository.count(where);
  }

  @get('/vendors/search')
  @response(200, {
    description: 'Array of VendorView model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VendorView, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VendorView) filter?: Filter<VendorView>,
  ): Promise<VendorView[]> {
    return this.vendorViewRepository.find(filter);
  }


  @get('/vendors/search/{id}')
  @response(200, {
    description: 'VendorView model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VendorView, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VendorView, {exclude: 'where'}) filter?: FilterExcludingWhere<VendorView>
  ): Promise<VendorView> {
    return this.vendorViewRepository.findById(id, filter);
  }

}
