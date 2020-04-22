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
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Provider} from '../models';
import {ProviderRepository} from '../repositories';

export class ProviderController {
  constructor(
    @repository(ProviderRepository)
    public providerRepository : ProviderRepository,
  ) {}

  @post('/providers', {
    responses: {
      '200': {
        description: 'Provider model instance',
        content: {'application/json': {schema: getModelSchemaRef(Provider)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Provider, {
            title: 'NewProvider',
            exclude: ['id'],
          }),
        },
      },
    })
    provider: Omit<Provider, 'id'>,
  ): Promise<Provider> {
    return this.providerRepository.create(provider);
  }

  @get('/providers/count', {
    responses: {
      '200': {
        description: 'Provider model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Provider) where?: Where<Provider>,
  ): Promise<Count> {
    return this.providerRepository.count(where);
  }

  @get('/providers', {
    responses: {
      '200': {
        description: 'Array of Provider model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Provider, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Provider) filter?: Filter<Provider>,
  ): Promise<Provider[]> {
    return this.providerRepository.find(filter);
  }

  @patch('/providers', {
    responses: {
      '200': {
        description: 'Provider PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Provider, {partial: true}),
        },
      },
    })
    provider: Provider,
    @param.where(Provider) where?: Where<Provider>,
  ): Promise<Count> {
    return this.providerRepository.updateAll(provider, where);
  }

  @get('/providers/{id}', {
    responses: {
      '200': {
        description: 'Provider model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Provider, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Provider, {exclude: 'where'}) filter?: FilterExcludingWhere<Provider>
  ): Promise<Provider> {
    return this.providerRepository.findById(id, filter);
  }

  @patch('/providers/{id}', {
    responses: {
      '204': {
        description: 'Provider PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Provider, {partial: true}),
        },
      },
    })
    provider: Provider,
  ): Promise<void> {
    await this.providerRepository.updateById(id, provider);
  }

  @put('/providers/{id}', {
    responses: {
      '204': {
        description: 'Provider PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() provider: Provider,
  ): Promise<void> {
    await this.providerRepository.replaceById(id, provider);
  }

  @del('/providers/{id}', {
    responses: {
      '204': {
        description: 'Provider DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.providerRepository.deleteById(id);
  }
}
