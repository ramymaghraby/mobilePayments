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
  RatePlan,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberRatePlanController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumbersRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/rate-plan', {
    responses: {
      '200': {
        description: 'RatePlan belonging to MobileNumbers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RatePlan)},
          },
        },
      },
    },
  })
  async getRatePlan(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
  ): Promise<RatePlan> {
    return this.mobileNumbersRepository.ratePlan(id);
  }
}
