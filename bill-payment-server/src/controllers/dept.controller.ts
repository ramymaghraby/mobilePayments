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
import {Dept} from '../models';
import {DeptRepository} from '../repositories';

export class DeptController {
  constructor(
    @repository(DeptRepository)
    public deptRepository : DeptRepository,
  ) {}

  @post('/depts', {
    responses: {
      '200': {
        description: 'Dept model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dept)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dept, {
            title: 'NewDept',
            exclude: ['id'],
          }),
        },
      },
    })
    dept: Omit<Dept, 'id'>,
  ): Promise<Dept> {
    return this.deptRepository.create(dept);
  }

  @get('/depts/count', {
    responses: {
      '200': {
        description: 'Dept model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Dept)) where?: Where<Dept>,
  ): Promise<Count> {
    return this.deptRepository.count(where);
  }

  @get('/depts', {
    responses: {
      '200': {
        description: 'Array of Dept model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dept)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Dept)) filter?: Filter<Dept>,
  ): Promise<Dept[]> {
    return this.deptRepository.find(filter);
  }

  @patch('/depts', {
    responses: {
      '200': {
        description: 'Dept PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dept, {partial: true}),
        },
      },
    })
    dept: Dept,
    @param.query.object('where', getWhereSchemaFor(Dept)) where?: Where<Dept>,
  ): Promise<Count> {
    return this.deptRepository.updateAll(dept, where);
  }

  @get('/depts/{id}', {
    responses: {
      '200': {
        description: 'Dept model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dept)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Dept> {
    return this.deptRepository.findById(id);
  }

  @patch('/depts/{id}', {
    responses: {
      '204': {
        description: 'Dept PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dept, {partial: true}),
        },
      },
    })
    dept: Dept,
  ): Promise<void> {
    await this.deptRepository.updateById(id, dept);
  }

  @put('/depts/{id}', {
    responses: {
      '204': {
        description: 'Dept PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dept: Dept,
  ): Promise<void> {
    await this.deptRepository.replaceById(id, dept);
  }

  @del('/depts/{id}', {
    responses: {
      '204': {
        description: 'Dept DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deptRepository.deleteById(id);
  }
}
