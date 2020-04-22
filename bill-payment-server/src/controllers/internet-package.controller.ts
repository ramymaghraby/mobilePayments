import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {InternetPackage} from '../models';
import {InternetPackageRepository} from '../repositories';

export class InternetPackageController {
  constructor(
    @repository(InternetPackageRepository)
    public internetPackageRepository : InternetPackageRepository,
  ) {}

  @post('/internet-packages', {
    responses: {
      '200': {
        description: 'InternetPackage model instance',
        content: {'application/json': {schema: getModelSchemaRef(InternetPackage)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternetPackage, {
            title: 'NewInternetPackage',
            exclude: ['id'],
          }),
        },
      },
    })
    internetPackage: Omit<InternetPackage, 'id'>,
  ): Promise<InternetPackage> {
    return this.internetPackageRepository.create(internetPackage);
  }

  @get('/internet-packages/count', {
    responses: {
      '200': {
        description: 'InternetPackage model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(InternetPackage)) where?: Where<InternetPackage>,
  ): Promise<Count> {
    return this.internetPackageRepository.count(where);
  }

  @get('/internet-packages', {
    responses: {
      '200': {
        description: 'Array of InternetPackage model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InternetPackage)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(InternetPackage)) filter?: Filter<InternetPackage>,
  ): Promise<InternetPackage[]> {
    return this.internetPackageRepository.find(filter);
  }

  @patch('/internet-packages', {
    responses: {
      '200': {
        description: 'InternetPackage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternetPackage, {partial: true}),
        },
      },
    })
    internetPackage: InternetPackage,
    @param.query.object('where', getWhereSchemaFor(InternetPackage)) where?: Where<InternetPackage>,
  ): Promise<Count> {
    return this.internetPackageRepository.updateAll(internetPackage, where);
  }

  @get('/internet-packages/{id}', {
    responses: {
      '200': {
        description: 'InternetPackage model instance',
        content: {'application/json': {schema: getModelSchemaRef(InternetPackage)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<InternetPackage> {
    return this.internetPackageRepository.findById(id);
  }

  @patch('/internet-packages/{id}', {
    responses: {
      '204': {
        description: 'InternetPackage PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternetPackage, {partial: true}),
        },
      },
    })
    internetPackage: InternetPackage,
  ): Promise<void> {
    await this.internetPackageRepository.updateById(id, internetPackage);
  }

  @put('/internet-packages/{id}', {
    responses: {
      '204': {
        description: 'InternetPackage PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() internetPackage: InternetPackage,
  ): Promise<void> {
    await this.internetPackageRepository.replaceById(id, internetPackage);
  }

  @del('/internet-packages/{id}', {
    responses: {
      '204': {
        description: 'InternetPackage DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.internetPackageRepository.deleteById(id);
  }
}
