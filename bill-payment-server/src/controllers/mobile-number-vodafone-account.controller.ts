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
  VodafoneAccount,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumbersVodafoneAccountController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumbersRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/vodafone-account', {
    responses: {
      '200': {
        description: 'VodafoneAccount belonging to MobileNumbers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VodafoneAccount)},
          },
        },
      },
    },
  })
  async getVodafoneAccount(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
  ): Promise<VodafoneAccount> {
    return this.mobileNumbersRepository.vodafoneAccount(id);
  }
}
