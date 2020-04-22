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
  Employee,
  Bill,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeBillController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bill\'s belonging to Employee',
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
    return this.employeeRepository.bills(id).find(filter);
  }

  @post('/employees/{id}/bills', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bill)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBillInEmployee',
            exclude: ['id'],
            optional: ['mobileNumberId']
          }),
        },
      },
    }) bill: Omit<Bill, 'id'>,
  ): Promise<Bill> {
    return this.employeeRepository.bills(id).create(bill);
  }

  @patch('/employees/{id}/bills', {
    responses: {
      '200': {
        description: 'Employee.Bill PATCH success count',
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
    return this.employeeRepository.bills(id).patch(bill, where);
  }

  @del('/employees/{id}/bills', {
    responses: {
      '200': {
        description: 'Employee.Bill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.employeeRepository.bills(id).delete(where);
  }
}
