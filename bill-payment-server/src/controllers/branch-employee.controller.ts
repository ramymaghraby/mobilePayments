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
  Branch,
  Employee,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchEmployeeController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Employee\'s belonging to Branch',
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
    return this.branchRepository.employees(id).find(filter);
  }

  @post('/branches/{id}/employees', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInBranch',
            exclude: ['id'],
            optional: ['branchId']
          }),
        },
      },
    }) employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.branchRepository.employees(id).create(employee);
  }

  @patch('/branches/{id}/employees', {
    responses: {
      '200': {
        description: 'Branch.Employee PATCH success count',
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
    return this.branchRepository.employees(id).patch(employee, where);
  }

  @del('/branches/{id}/employees', {
    responses: {
      '200': {
        description: 'Branch.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.branchRepository.employees(id).delete(where);
  }
}
