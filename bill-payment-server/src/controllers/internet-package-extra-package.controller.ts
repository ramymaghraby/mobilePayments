import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  InternetPackage,
  ExtraPackage,
} from '../models';
import {InternetPackageRepository} from '../repositories';

export class InternetPackageExtraPackageController {
  constructor(
    @repository(InternetPackageRepository) protected internetPackageRepository: InternetPackageRepository,
  ) { }

  @get('/internet-packages/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'Array of ExtraPackage\'s belonging to InternetPackage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExtraPackage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ExtraPackage>,
  ): Promise<ExtraPackage[]> {
    return this.internetPackageRepository.extraPackages(id).find(filter);
  }

  @post('/internet-packages/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'InternetPackage model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExtraPackage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InternetPackage.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraPackage, {
            title: 'NewExtraPackageInInternetPackage',
            exclude: ['id'],
            optional: ['internetPackageId']
          }),
        },
      },
    }) extraPackage: Omit<ExtraPackage, 'id'>,
  ): Promise<ExtraPackage> {
    return this.internetPackageRepository.extraPackages(id).create(extraPackage);
  }

  @patch('/internet-packages/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'InternetPackage.ExtraPackage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraPackage, {partial: true}),
        },
      },
    })
    extraPackage: Partial<ExtraPackage>,
    @param.query.object('where', getWhereSchemaFor(ExtraPackage)) where?: Where<ExtraPackage>,
  ): Promise<Count> {
    return this.internetPackageRepository.extraPackages(id).patch(extraPackage, where);
  }

  @del('/internet-packages/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'InternetPackage.ExtraPackage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExtraPackage)) where?: Where<ExtraPackage>,
  ): Promise<Count> {
    return this.internetPackageRepository.extraPackages(id).delete(where);
  }
}
