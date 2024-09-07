import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  del, get, getModelSchemaRef,
  HttpErrors,
  param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Vendor} from '../models';
import {VendorRepository} from '../repositories';

export class VendorController {
  constructor(
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
  ) { }

  @post('/vendors')
  @response(200, {
    description: 'Vendor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vendor)}},
  })
  async create(@requestBody() vendor: Vendor): Promise<Vendor> {
    return this.vendorRepository.create(vendor);
  }

  @get('/vendors/count')
  @response(200, {
    description: 'Vendor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Vendor) where?: Where<Vendor>): Promise<Count[]> {
    const result = await this.vendorRepository.count(where);
    const res = [{count: result.count}];
    return res;
  }





  @get('/vendors')
  @response(200, {
    description: 'Array of Vendor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vendor, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Vendor) filter?: Filter<Vendor>): Promise<Vendor[]> {
    return this.vendorRepository.find(filter);
  }

  @put('/vendors')
  @response(200, {
    description: 'Vendor PUT success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody() vendor: Vendor,
    @param.where(Vendor) where?: Where<Vendor>,
  ): Promise<Count> {
    return this.vendorRepository.updateAll(vendor, where);
  }

  @get('/vendors/{id}')
  @response(200, {
    description: 'Vendor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vendor, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new HttpErrors.NotFound('Vendor not found');
    }
    return vendor;
  }

  @patch('/vendors/{id}')
  @response(204, {description: 'Vendor PATCH success'})
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.updateById(id, vendor);
  }

  @put('/vendors/{id}')
  @response(204, {description: 'Vendor PUT success'})
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.replaceById(id, vendor);
  }

  @del('/vendors/{id}')
  @response(204, {description: 'Vendor DELETE success'})
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorRepository.deleteById(id);
  }
}
