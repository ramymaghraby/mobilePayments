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
import { Employee } from '../models';
import { EmployeeRepository } from '../repositories';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @post('/employees', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Employee) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployee',
            exclude: ['id'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.employeeRepository.create(employee);
  }

  @get('/employees/count', {
    responses: {
      '200': {
        description: 'Employee model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Employee))
    where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.count(where);
  }

  @get('/employees-with-relation', {
    responses: {
      '200': {
        description: 'Array of Employee model instances including Relations',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Employee) },
          },
        },
      },
    },
  })
  async findEmployeesWithRelation(
    @param.query.object('filter', getFilterSchemaFor(Employee))
    filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    const filterer = {
      filter,
      include: [{ relation: 'branch' }, { relation: 'dept' }],
    };
    return this.employeeRepository.find(filterer);
  }

  @get('/employees', {
    responses: {
      '200': {
        description: 'Array of Employee model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Employee) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Employee))
    filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find(filter);
  }

  @patch('/employees', {
    responses: {
      '200': {
        description: 'Employee PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, { partial: true }),
        },
      },
    })
    employee: Employee,
    @param.query.object('where', getWhereSchemaFor(Employee))
    where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.updateAll(employee, where);
  }

  @get('/employees/{id}', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Employee) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Employee> {
    const filter = {
      include: [{ relation: 'branch' }, { relation: 'dept' }],
    };
    return this.employeeRepository.findById(id, filter);
  }

  @patch('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, { partial: true }),
        },
      },
    })
    employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.updateById(id, employee);
  }

  @put('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.replaceById(id, employee);
  }

  @del('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }
}
