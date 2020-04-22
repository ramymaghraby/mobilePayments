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
import {RatePlan} from '../models';
import {RatePlanRepository} from '../repositories';

export class RatePlanController {
  constructor(
    @repository(RatePlanRepository)
    public ratePlanRepository: RatePlanRepository,
  ) {}

  @post('/rate-plans', {
    responses: {
      '200': {
        description: 'RatePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(RatePlan)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RatePlan, {
            title: 'NewRatePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    ratePlan: Omit<RatePlan, 'id'>,
  ): Promise<RatePlan> {
    return this.ratePlanRepository.create(ratePlan);
  }

  @get('/rate-plans/count', {
    responses: {
      '200': {
        description: 'RatePlan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(RatePlan))
    where?: Where<RatePlan>,
  ): Promise<Count> {
    return this.ratePlanRepository.count(where);
  }

  @get('/rate-plans', {
    responses: {
      '200': {
        description: 'Array of RatePlan model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RatePlan)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RatePlan))
    filter?: Filter<RatePlan>,
  ): Promise<RatePlan[]> {
    return this.ratePlanRepository.find(filter);
  }

  @patch('/rate-plans', {
    responses: {
      '200': {
        description: 'RatePlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RatePlan, {partial: true}),
        },
      },
    })
    ratePlan: RatePlan,
    @param.query.object('where', getWhereSchemaFor(RatePlan))
    where?: Where<RatePlan>,
  ): Promise<Count> {
    return this.ratePlanRepository.updateAll(ratePlan, where);
  }

  @get('/rate-plans/{id}', {
    responses: {
      '200': {
        description: 'RatePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(RatePlan)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<RatePlan> {
    return this.ratePlanRepository.findById(id);
  }

  @patch('/rate-plans/{id}', {
    responses: {
      '204': {
        description: 'RatePlan PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RatePlan, {partial: true}),
        },
      },
    })
    ratePlan: RatePlan,
  ): Promise<void> {
    await this.ratePlanRepository.updateById(id, ratePlan);
  }

  @put('/rate-plans/{id}', {
    responses: {
      '204': {
        description: 'RatePlan PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ratePlan: RatePlan,
  ): Promise<void> {
    await this.ratePlanRepository.replaceById(id, ratePlan);
  }

  @del('/rate-plans/{id}', {
    responses: {
      '204': {
        description: 'RatePlan DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ratePlanRepository.deleteById(id);
  }
}
