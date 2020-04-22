import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MobileNumber,
  Employee,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberEmployeeController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumbersRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to MobileNumbers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
  ): Promise<Employee> {
    return this.mobileNumbersRepository.employee(id);
  }
}
