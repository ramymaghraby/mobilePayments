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
import {MobileNumber} from '../models';
import {MobileNumberRepository} from '../repositories';

export class MobileNumberController {
  constructor(
    @repository(MobileNumberRepository)
    public mobileNumberRepository: MobileNumberRepository,
  ) {}

  @post('/mobile-numbers', {
    responses: {
      '200': {
        description: 'MobileNumber model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(MobileNumber)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileNumber, {
            title: 'NewMobileNumber',
            exclude: ['id'],
          }),
        },
      },
    })
    mobileNumber: Omit<MobileNumber, 'id'>,
  ): Promise<MobileNumber> {
    return this.mobileNumberRepository.create(mobileNumber);
  }

  @get('/mobile-numbers/count', {
    responses: {
      '200': {
        description: 'MobileNumber model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(MobileNumber))
    where?: Where<MobileNumber>,
  ): Promise<Count> {
    return this.mobileNumberRepository.count(where);
  }

  @get('/mobile-numbers', {
    responses: {
      '200': {
        description: 'Array of MobileNumber model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MobileNumber)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(MobileNumber))
    filter?: Filter<MobileNumber>,
  ): Promise<MobileNumber[]> {
    return this.mobileNumberRepository.find(filter);
  }

  @get('/mobile-numbers-with-relation', {
    responses: {
      '200': {
        description: 'Array of MobileNumber model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MobileNumber)},
          },
        },
      },
    },
  })
  async findMobilesWithRelation(
    @param.query.object('filter', getFilterSchemaFor(MobileNumber))
    filter?: Filter<MobileNumber>,
  ): Promise<MobileNumber[]> {
    const filterer = {
      filter,
      include: [
        {relation: 'vodafoneAccount'},
        {relation: 'ratePlan'},
        {relation: 'employee'},
        {relation: 'deptCode'},
        {relation: 'accountPaymentType'},
        {relation: 'provider'},
      ],
    };
    return this.mobileNumberRepository.find(filterer);
  }

  @patch('/mobile-numbers', {
    responses: {
      '200': {
        description: 'MobileNumber PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileNumber, {partial: true}),
        },
      },
    })
    mobileNumber: MobileNumber,
    @param.query.object('where', getWhereSchemaFor(MobileNumber))
    where?: Where<MobileNumber>,
  ): Promise<Count> {
    return this.mobileNumberRepository.updateAll(mobileNumber, where);
  }

  @get('/mobile-numbers/{id}', {
    responses: {
      '200': {
        description: 'MobileNumber model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(MobileNumber)},
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<MobileNumber> {
    const filter = {
      include: [
        {relation: 'vodafoneAccount'},
        {relation: 'ratePlan'},
        {relation: 'employee'},
        {relation: 'deptCode'},
        {relation: 'accountPaymentType'},
        {relation: 'provider'},
      ],
    };
    return this.mobileNumberRepository.findById(id, filter);
  }

  @patch('/mobile-numbers/{id}', {
    responses: {
      '204': {
        description: 'MobileNumber PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileNumber, {partial: true}),
        },
      },
    })
    mobileNumber: MobileNumber,
  ): Promise<void> {
    await this.mobileNumberRepository.updateById(id, mobileNumber);
  }

  @put('/mobile-numbers/{id}', {
    responses: {
      '204': {
        description: 'MobileNumber PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mobileNumber: MobileNumber,
  ): Promise<void> {
    await this.mobileNumberRepository.replaceById(id, mobileNumber);
  }

  @del('/mobile-numbers/{id}', {
    responses: {
      '204': {
        description: 'MobileNumber DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mobileNumberRepository.deleteById(id);
  }
}
