import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employee,
  Branch,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeBranchController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof Employee.prototype.id,
  ): Promise<Branch> {
    return this.employeeRepository.branch(id);
  }
}
