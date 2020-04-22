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
  MobileNumber,
  Bill,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberBillController {
  constructor(
    @repository(MobileNumberRepository) protected mobileNumberRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bill\'s belonging to MobileNumber',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bill)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bill>,
  ): Promise<Bill[]> {
    return this.mobileNumberRepository.bills(id).find(filter);
  }

  @post('/mobile-numbers/{id}/bills', {
    responses: {
      '200': {
        description: 'MobileNumber model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bill)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBillInMobileNumber',
            exclude: ['id'],
            optional: ['mobileNumberId']
          }),
        },
      },
    }) bill: Omit<Bill, 'id'>,
  ): Promise<Bill> {
    return this.mobileNumberRepository.bills(id).create(bill);
  }

  @patch('/mobile-numbers/{id}/bills', {
    responses: {
      '200': {
        description: 'MobileNumber.Bill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {partial: true}),
        },
      },
    })
    bill: Partial<Bill>,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.mobileNumberRepository.bills(id).patch(bill, where);
  }

  @del('/mobile-numbers/{id}/bills', {
    responses: {
      '200': {
        description: 'MobileNumber.Bill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.mobileNumberRepository.bills(id).delete(where);
  }
}
