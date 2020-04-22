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
  AccountPaymentType,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberAccountPaymentTypeController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumberRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/account-payment-type', {
    responses: {
      '200': {
        description: 'AccountPaymentType belonging to MobileNumber',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AccountPaymentType)},
          },
        },
      },
    },
  })
  async getAccountPaymentType(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
  ): Promise<AccountPaymentType> {
    return this.mobileNumberRepository.accountPaymentType(id);
  }
}
