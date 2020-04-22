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
import {VodafoneAccount} from '../models';
import {VodafoneAccountRepository} from '../repositories';

export class VodafoneAccountController {
  constructor(
    @repository(VodafoneAccountRepository)
    public vodafoneAccountRepository : VodafoneAccountRepository,
  ) {}

  @post('/vodafone-accounts', {
    responses: {
      '200': {
        description: 'VodafoneAccount model instance',
        content: {'application/json': {schema: getModelSchemaRef(VodafoneAccount)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VodafoneAccount, {
            title: 'NewVodafoneAccount',
            exclude: ['id'],
          }),
        },
      },
    })
    vodafoneAccount: Omit<VodafoneAccount, 'id'>,
  ): Promise<VodafoneAccount> {
    return this.vodafoneAccountRepository.create(vodafoneAccount);
  }

  @get('/vodafone-accounts/count', {
    responses: {
      '200': {
        description: 'VodafoneAccount model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(VodafoneAccount)) where?: Where<VodafoneAccount>,
  ): Promise<Count> {
    return this.vodafoneAccountRepository.count(where);
  }

  @get('/vodafone-accounts', {
    responses: {
      '200': {
        description: 'Array of VodafoneAccount model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VodafoneAccount)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(VodafoneAccount)) filter?: Filter<VodafoneAccount>,
  ): Promise<VodafoneAccount[]> {
    return this.vodafoneAccountRepository.find(filter);
  }

  @patch('/vodafone-accounts', {
    responses: {
      '200': {
        description: 'VodafoneAccount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VodafoneAccount, {partial: true}),
        },
      },
    })
    vodafoneAccount: VodafoneAccount,
    @param.query.object('where', getWhereSchemaFor(VodafoneAccount)) where?: Where<VodafoneAccount>,
  ): Promise<Count> {
    return this.vodafoneAccountRepository.updateAll(vodafoneAccount, where);
  }

  @get('/vodafone-accounts/{id}', {
    responses: {
      '200': {
        description: 'VodafoneAccount model instance',
        content: {'application/json': {schema: getModelSchemaRef(VodafoneAccount)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<VodafoneAccount> {
    return this.vodafoneAccountRepository.findById(id);
  }

  @patch('/vodafone-accounts/{id}', {
    responses: {
      '204': {
        description: 'VodafoneAccount PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VodafoneAccount, {partial: true}),
        },
      },
    })
    vodafoneAccount: VodafoneAccount,
  ): Promise<void> {
    await this.vodafoneAccountRepository.updateById(id, vodafoneAccount);
  }

  @put('/vodafone-accounts/{id}', {
    responses: {
      '204': {
        description: 'VodafoneAccount PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vodafoneAccount: VodafoneAccount,
  ): Promise<void> {
    await this.vodafoneAccountRepository.replaceById(id, vodafoneAccount);
  }

  @del('/vodafone-accounts/{id}', {
    responses: {
      '204': {
        description: 'VodafoneAccount DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vodafoneAccountRepository.deleteById(id);
  }
}
