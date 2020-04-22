import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { ExtraPackage } from '../models';
import { ExtraPackageRepository } from '../repositories';

export class ExtraPackageController {
  constructor(
    @repository(ExtraPackageRepository)
    public extraPackageRepository: ExtraPackageRepository,
  ) { }

  @post('/extra-packages', {
    responses: {
      '200': {
        description: 'ExtraPackage model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ExtraPackage) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraPackage, {
            title: 'NewExtraPackage',
            exclude: ['id'],
          }),
        },
      },
    })
    extraPackage: Omit<ExtraPackage, 'id'>,
  ): Promise<ExtraPackage> {
    return this.extraPackageRepository.create(extraPackage);
  }

  @get('/extra-packages/count', {
    responses: {
      '200': {
        description: 'ExtraPackage model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ExtraPackage)) where?: Where<ExtraPackage>,
  ): Promise<Count> {
    return this.extraPackageRepository.count(where);
  }

  @get('/extra-packages', {
    responses: {
      '200': {
        description: 'Array of ExtraPackage model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ExtraPackage) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ExtraPackage)) filter?: Filter<ExtraPackage>,
  ): Promise<ExtraPackage[]> {
    return this.extraPackageRepository.find(filter);
  }

  @get('/extra-packages', {
    responses: {
      '200': {
        description: 'Array of ExtraPackage model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ExtraPackage) },
          },
        },
      },
    },
  })
  async findExtraPackageWithRelation(
    @param.query.object('filter', getFilterSchemaFor(ExtraPackage)) filter?: Filter<ExtraPackage>,
  ): Promise<ExtraPackage[]> {
    const filterer = {
      filter,
      include: [{ relation: 'MobileNumber' }, { relation: 'InternetPackage' }],
    };
    return this.extraPackageRepository.find(filterer);
  }

  @patch('/extra-packages', {
    responses: {
      '200': {
        description: 'ExtraPackage PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraPackage, { partial: true }),
        },
      },
    })
    extraPackage: ExtraPackage,
    @param.query.object('where', getWhereSchemaFor(ExtraPackage)) where?: Where<ExtraPackage>,
  ): Promise<Count> {
    return this.extraPackageRepository.updateAll(extraPackage, where);
  }

  @get('/extra-packages/{id}', {
    responses: {
      '200': {
        description: 'ExtraPackage model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ExtraPackage) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ExtraPackage> {
    return this.extraPackageRepository.findById(id);
  }

  @patch('/extra-packages/{id}', {
    responses: {
      '204': {
        description: 'ExtraPackage PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraPackage, { partial: true }),
        },
      },
    })
    extraPackage: ExtraPackage,
  ): Promise<void> {
    await this.extraPackageRepository.updateById(id, extraPackage);
  }

  @put('/extra-packages/{id}', {
    responses: {
      '204': {
        description: 'ExtraPackage PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() extraPackage: ExtraPackage,
  ): Promise<void> {
    await this.extraPackageRepository.replaceById(id, extraPackage);
  }

  @del('/extra-packages/{id}', {
    responses: {
      '204': {
        description: 'ExtraPackage DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.extraPackageRepository.deleteById(id);
  }
}
