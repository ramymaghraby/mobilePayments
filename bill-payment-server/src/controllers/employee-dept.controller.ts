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
  Dept,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeDeptController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/dept', {
    responses: {
      '200': {
        description: 'Dept belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dept)},
          },
        },
      },
    },
  })
  async getDept(
    @param.path.number('id') id: typeof Employee.prototype.id,
  ): Promise<Dept> {
    return this.employeeRepository.dept(id);
  }
}
