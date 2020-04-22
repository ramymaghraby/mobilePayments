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
import {AccountPaymentType} from '../models';
import {AccountPaymentTypeRepository} from '../repositories';

export class AccountPaymentTypeController {
  constructor(
    @repository(AccountPaymentTypeRepository)
    public accountPaymentTypeRepository : AccountPaymentTypeRepository,
  ) {}

  @post('/account-payment-types', {
    responses: {
      '200': {
        description: 'AccountPaymentType model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccountPaymentType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccountPaymentType, {
            title: 'NewAccountPaymentType',
            exclude: ['id'],
          }),
        },
      },
    })
    accountPaymentType: Omit<AccountPaymentType, 'id'>,
  ): Promise<AccountPaymentType> {
    return this.accountPaymentTypeRepository.create(accountPaymentType);
  }

  @get('/account-payment-types/count', {
    responses: {
      '200': {
        description: 'AccountPaymentType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(AccountPaymentType)) where?: Where<AccountPaymentType>,
  ): Promise<Count> {
    return this.accountPaymentTypeRepository.count(where);
  }

  @get('/account-payment-types', {
    responses: {
      '200': {
        description: 'Array of AccountPaymentType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AccountPaymentType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(AccountPaymentType)) filter?: Filter<AccountPaymentType>,
  ): Promise<AccountPaymentType[]> {
    return this.accountPaymentTypeRepository.find(filter);
  }

  @patch('/account-payment-types', {
    responses: {
      '200': {
        description: 'AccountPaymentType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccountPaymentType, {partial: true}),
        },
      },
    })
    accountPaymentType: AccountPaymentType,
    @param.query.object('where', getWhereSchemaFor(AccountPaymentType)) where?: Where<AccountPaymentType>,
  ): Promise<Count> {
    return this.accountPaymentTypeRepository.updateAll(accountPaymentType, where);
  }

  @get('/account-payment-types/{id}', {
    responses: {
      '200': {
        description: 'AccountPaymentType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AccountPaymentType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(AccountPaymentType)) filter?: Filter<AccountPaymentType>
  ): Promise<AccountPaymentType> {
    return this.accountPaymentTypeRepository.findById(id, filter);
  }

  @patch('/account-payment-types/{id}', {
    responses: {
      '204': {
        description: 'AccountPaymentType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccountPaymentType, {partial: true}),
        },
      },
    })
    accountPaymentType: AccountPaymentType,
  ): Promise<void> {
    await this.accountPaymentTypeRepository.updateById(id, accountPaymentType);
  }

  @put('/account-payment-types/{id}', {
    responses: {
      '204': {
        description: 'AccountPaymentType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() accountPaymentType: AccountPaymentType,
  ): Promise<void> {
    await this.accountPaymentTypeRepository.replaceById(id, accountPaymentType);
  }

  @del('/account-payment-types/{id}', {
    responses: {
      '204': {
        description: 'AccountPaymentType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.accountPaymentTypeRepository.deleteById(id);
  }
}
