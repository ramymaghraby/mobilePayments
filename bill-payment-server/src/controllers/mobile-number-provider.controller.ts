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
  Provider,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberProviderController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumberRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/provider', {
    responses: {
      '200': {
        description: 'Provider belonging to MobileNumber',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Provider)},
          },
        },
      },
    },
  })
  async getProvider(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
  ): Promise<Provider> {
    return this.mobileNumberRepository.provider(id);
  }
}
