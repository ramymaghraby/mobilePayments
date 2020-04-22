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
import {Branch} from '../models';
import {BranchRepository} from '../repositories';

export class BranchController {
  constructor(
    @repository(BranchRepository)
    public branchRepository : BranchRepository,
  ) {}

  @post('/branches', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Branch)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Branch, {
            title: 'NewBranch',
            exclude: ['id'],
          }),
        },
      },
    })
    branch: Omit<Branch, 'id'>,
  ): Promise<Branch> {
    return this.branchRepository.create(branch);
  }

  @get('/branches/count', {
    responses: {
      '200': {
        description: 'Branch model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Branch)) where?: Where<Branch>,
  ): Promise<Count> {
    return this.branchRepository.count(where);
  }

  @get('/branches', {
    responses: {
      '200': {
        description: 'Array of Branch model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Branch)) filter?: Filter<Branch>,
  ): Promise<Branch[]> {
    return this.branchRepository.find(filter);
  }

  @patch('/branches', {
    responses: {
      '200': {
        description: 'Branch PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Branch, {partial: true}),
        },
      },
    })
    branch: Branch,
    @param.query.object('where', getWhereSchemaFor(Branch)) where?: Where<Branch>,
  ): Promise<Count> {
    return this.branchRepository.updateAll(branch, where);
  }

  @get('/branches/{id}', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Branch)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Branch> {
    return this.branchRepository.findById(id);
  }

  @patch('/branches/{id}', {
    responses: {
      '204': {
        description: 'Branch PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Branch, {partial: true}),
        },
      },
    })
    branch: Branch,
  ): Promise<void> {
    await this.branchRepository.updateById(id, branch);
  }

  @put('/branches/{id}', {
    responses: {
      '204': {
        description: 'Branch PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() branch: Branch,
  ): Promise<void> {
    await this.branchRepository.replaceById(id, branch);
  }

  @del('/branches/{id}', {
    responses: {
      '204': {
        description: 'Branch DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.branchRepository.deleteById(id);
  }
}
