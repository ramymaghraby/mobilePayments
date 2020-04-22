import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ExtraPackage,
  InternetPackage,
} from '../models';
import {ExtraPackageRepository} from '../repositories';

export class ExtraPackageInternetPackageController {
  constructor(
    @repository(ExtraPackageRepository)
    public extraPackageRepository: ExtraPackageRepository,
  ) { }

  @get('/extra-packages/{id}/internet-package', {
    responses: {
      '200': {
        description: 'InternetPackage belonging to ExtraPackage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InternetPackage)},
          },
        },
      },
    },
  })
  async getInternetPackage(
    @param.path.number('id') id: typeof ExtraPackage.prototype.id,
  ): Promise<InternetPackage> {
    return this.extraPackageRepository.internetPackage(id);
  }
}
