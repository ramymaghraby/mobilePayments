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
  Dept,
  Employee,
} from '../models';
import {DeptRepository} from '../repositories';

export class DeptEmployeeController {
  constructor(
    @repository(DeptRepository) protected deptRepository: DeptRepository,
  ) { }

  @get('/depts/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Employee\'s belonging to Dept',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.deptRepository.employees(id).find(filter);
  }

  @post('/depts/{id}/employees', {
    responses: {
      '200': {
        description: 'Dept model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Dept.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInDept',
            exclude: ['id'],
            optional: ['deptId']
          }),
        },
      },
    }) employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.deptRepository.employees(id).create(employee);
  }

  @patch('/depts/{id}/employees', {
    responses: {
      '200': {
        description: 'Dept.Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Partial<Employee>,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.deptRepository.employees(id).patch(employee, where);
  }

  @del('/depts/{id}/employees', {
    responses: {
      '200': {
        description: 'Dept.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.deptRepository.employees(id).delete(where);
  }
}
