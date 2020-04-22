import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {ExtraPackage, MobileNumber} from '../models';
import {ExtraPackageRepository} from '../repositories';

export class ExtraPackageMobileNumbersController {
  constructor(
    @repository(ExtraPackageRepository)
    public extraPackageRepository: ExtraPackageRepository,
  ) {}

  @get('/extra-packages/{id}/mobile-number', {
    responses: {
      '200': {
        description: 'MobileNumber belonging to ExtraPackage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MobileNumber)},
          },
        },
      },
    },
  })
  async getMobileNumbers(
    @param.path.number('id') id: typeof ExtraPackage.prototype.id,
  ): Promise<MobileNumber> {
    return this.extraPackageRepository.mobileNumber(id);
  }
}
