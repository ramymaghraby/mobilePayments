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
  MobileNumber,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeMobileNumberController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Array of MobileNumber\'s belonging to Employee',
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
    return this.employeeRepository.mobileNumbers(id).find(filter);
  }

  @post('/employees/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(MobileNumber)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileNumber, {
            title: 'NewMobileNumberInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) mobileNumber: Omit<MobileNumber, 'id'>,
  ): Promise<MobileNumber> {
    return this.employeeRepository.mobileNumbers(id).create(mobileNumber);
  }

  @patch('/employees/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Employee.MobileNumber PATCH success count',
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
    return this.employeeRepository.mobileNumbers(id).patch(mobileNumber, where);
  }

  @del('/employees/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'Employee.MobileNumber DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MobileNumber)) where?: Where<MobileNumber>,
  ): Promise<Count> {
    return this.employeeRepository.mobileNumbers(id).delete(where);
  }
}
