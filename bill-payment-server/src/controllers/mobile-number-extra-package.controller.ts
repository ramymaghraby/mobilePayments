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
  MobileNumber,
  ExtraPackage,
} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberExtraPackageController {
  constructor(
    @repository(MobileNumberRepository) protected mobileNumberRepository: MobileNumberRepository,
  ) { }

  @get('/mobile-numbers/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'Array of ExtraPackage\'s belonging to MobileNumber',
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
    return this.mobileNumberRepository.extraPackages(id).find(filter);
  }

  @post('/mobile-numbers/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'MobileNumber model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExtraPackage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MobileNumber.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraPackage, {
            title: 'NewExtraPackageInMobileNumber',
            exclude: ['id'],
            optional: ['mobileNumberId']
          }),
        },
      },
    }) extraPackage: Omit<ExtraPackage, 'id'>,
  ): Promise<ExtraPackage> {
    return this.mobileNumberRepository.extraPackages(id).create(extraPackage);
  }

  @patch('/mobile-numbers/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'MobileNumber.ExtraPackage PATCH success count',
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
    return this.mobileNumberRepository.extraPackages(id).patch(extraPackage, where);
  }

  @del('/mobile-numbers/{id}/extra-packages', {
    responses: {
      '200': {
        description: 'MobileNumber.ExtraPackage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExtraPackage)) where?: Where<ExtraPackage>,
  ): Promise<Count> {
    return this.mobileNumberRepository.extraPackages(id).delete(where);
  }
}
