import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Provider,
  MobileNumber,
} from '../models';
import {ProviderRepository} from '../repositories';

export class ProviderMobileNumberController {
  constructor(
    @repository(ProviderRepository) protected providerRepository: ProviderRepository,
  ) { }

  @get('/providers/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Array of Provider has many MobileNumber',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MobileNumber)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MobileNumber>,
  ): Promise<MobileNumber[]> {
    return this.providerRepository.mobileNumbers(id).find(filter);
  }

  @post('/providers/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Provider model instance',
        content: {'application/json': {schema: getModelSchemaRef(MobileNumber)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Provider.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileNumber, {
            title: 'NewMobileNumberInProvider',
            exclude: ['id'],
            optional: ['providerId']
          }),
        },
      },
    }) mobileNumber: Omit<MobileNumber, 'id'>,
  ): Promise<MobileNumber> {
    return this.providerRepository.mobileNumbers(id).create(mobileNumber);
  }

  @patch('/providers/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Provider.MobileNumber PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileNumber, {partial: true}),
        },
      },
    })
    mobileNumber: Partial<MobileNumber>,
    @param.query.object('where', getWhereSchemaFor(MobileNumber)) where?: Where<MobileNumber>,
  ): Promise<Count> {
    return this.providerRepository.mobileNumbers(id).patch(mobileNumber, where);
  }

  @del('/providers/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Provider.MobileNumber DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MobileNumber)) where?: Where<MobileNumber>,
  ): Promise<Count> {
    return this.providerRepository.mobileNumbers(id).delete(where);
  }
}
