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
import {DeptCode} from '../models';
import {DeptCodeRepository} from '../repositories';

export class DeptCodeController {
  constructor(
    @repository(DeptCodeRepository)
    public deptCodeRepository : DeptCodeRepository,
  ) {}

  @post('/dept-codes', {
    responses: {
      '200': {
        description: 'DeptCode model instance',
        content: {'application/json': {schema: getModelSchemaRef(DeptCode)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeptCode, {
            title: 'NewDeptCode',
            exclude: ['id'],
          }),
        },
      },
    })
    deptCode: Omit<DeptCode, 'id'>,
  ): Promise<DeptCode> {
    return this.deptCodeRepository.create(deptCode);
  }

  @get('/dept-codes/count', {
    responses: {
      '200': {
        description: 'DeptCode model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DeptCode)) where?: Where<DeptCode>,
  ): Promise<Count> {
    return this.deptCodeRepository.count(where);
  }

  @get('/dept-codes', {
    responses: {
      '200': {
        description: 'Array of DeptCode model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DeptCode, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DeptCode)) filter?: Filter<DeptCode>,
  ): Promise<DeptCode[]> {
    return this.deptCodeRepository.find(filter);
  }

  @patch('/dept-codes', {
    responses: {
      '200': {
        description: 'DeptCode PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeptCode, {partial: true}),
        },
      },
    })
    deptCode: DeptCode,
    @param.query.object('where', getWhereSchemaFor(DeptCode)) where?: Where<DeptCode>,
  ): Promise<Count> {
    return this.deptCodeRepository.updateAll(deptCode, where);
  }

  @get('/dept-codes/{id}', {
    responses: {
      '200': {
        description: 'DeptCode model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DeptCode, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(DeptCode)) filter?: Filter<DeptCode>
  ): Promise<DeptCode> {
    return this.deptCodeRepository.findById(id, filter);
  }

  @patch('/dept-codes/{id}', {
    responses: {
      '204': {
        description: 'DeptCode PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeptCode, {partial: true}),
        },
      },
    })
    deptCode: DeptCode,
  ): Promise<void> {
    await this.deptCodeRepository.updateById(id, deptCode);
  }

  @put('/dept-codes/{id}', {
    responses: {
      '204': {
        description: 'DeptCode PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deptCode: DeptCode,
  ): Promise<void> {
    await this.deptCodeRepository.replaceById(id, deptCode);
  }

  @del('/dept-codes/{id}', {
    responses: {
      '204': {
        description: 'DeptCode DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deptCodeRepository.deleteById(id);
  }
}
