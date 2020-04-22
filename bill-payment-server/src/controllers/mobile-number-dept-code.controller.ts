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
  DeptCode,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberDeptCodeController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumberRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/dept-code', {
    responses: {
      '200': {
        description: 'DeptCode belonging to MobileNumber',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DeptCode)},
          },
        },
      },
    },
  })
  async getDeptCode(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
  ): Promise<DeptCode> {
    return this.mobileNumberRepository.deptCode(id);
  }
}
