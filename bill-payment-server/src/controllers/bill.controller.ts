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
import { Bill, BillQuery } from '../models';
import { BillRepository } from '../repositories';

export class BillController {
  constructor(
    @repository(BillRepository)
    public billRepository: BillRepository,
  ) { }

  @post('/bills', {
    responses: {
      '200': {
        description: 'Bill model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Bill) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBill',
            exclude: ['id'],
          }),
        },
      },
    })
    bill: Omit<Bill, 'id'>,
  ): Promise<Bill> {
    var date = new Date(bill.month);
    date.setHours(2,0,0)
    bill.month = date;
    return this.billRepository.create(bill);
  }

  @get('/bills/count', {
    responses: {
      '200': {
        description: 'Bill model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.billRepository.count(where);
  }

  @get('/bills', {
    responses: {
      '200': {
        description: 'Array of Bill model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Bill) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Bill)) filter?: Filter<Bill>,
  ): Promise<Bill[]> {    
    return this.billRepository.find(filter);
  }

  @get('/bills-with-mobile-numbers-data', {
    responses: {
      '200': {
        description: 'Array of Bill model instances With Mobile Number Data',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Bill) },
          },
        },
      },
    },
  })

  // async findBillsWithParamQuery(
  //   @param.query.object('filter', getWhereSchemaFor(Bill)) filter?: BillQuery,
  // ): Promise<Bill[]> {
  //   let Bills: Bill[] = [];
  //   console.log(filter?.month);
  //   console.log(filter);
    
   
  //   const result =  await this.billRepository.execute(
  //     `SELECT e.name,e.HrCode, br.name,m.mobileNumber, b.totalAfterTax FROM vodafonetest.bill b 
  //   join vodafonetest.mobilenumber m on m.id = b.mobileNumberId 
  //   join vodafonetest.employee e on e.id = m.employeeId
  //   join vodafonetest.branch br on e.branchId = br.id
  //   where m.accountPaymentTypeId = ? and b.month = ?`, [filter?.type,filter?.month],);
    
  //   console.log(result);
  //   return Bills;
  //   // return this.billRepository.find(filter);
  // }

  // Original

  async findBillsWithAllRelation(
    @param.query.object('filter', getFilterSchemaFor(Bill)) filter?: Filter<Bill>,
  ): Promise<Bill[]> { 
    filter =  {
      where: filter?.where,
      include: [
        { 
          relation: 'mobileNumber',
          scope: {
            include: [
              {relation: 'accountPaymentType'},
              {
                relation: 'employee',
              scope: {
                include: [
                  {relation: 'branch'}
                ]
              }},
              {relation: 'provider'}
            ]
          }
        }
      ],
    };    
    return this.billRepository.find(filter);
  }
  @patch('/bills', {
    responses: {
      '200': {
        description: 'Bill PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, { partial: true }),
        },
      },
    })
    bill: Bill,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.billRepository.updateAll(bill, where);
  }

  @get('/bills/{id}', {
    responses: {
      '200': {
        description: 'Bill model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Bill) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Bill> {
    return this.billRepository.findById(id);
  }

  @patch('/bills/{id}', {
    responses: {
      '204': {
        description: 'Bill PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, { partial: true }),
        },
      },
    })
    bill: Bill,
  ): Promise<void> {
    await this.billRepository.updateById(id, bill);
  }

  @put('/bills/{id}', {
    responses: {
      '204': {
        description: 'Bill PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bill: Bill,
  ): Promise<void> {
    await this.billRepository.replaceById(id, bill);
  }

  @del('/bills/{id}', {
    responses: {
      '204': {
        description: 'Bill DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.billRepository.deleteById(id);
  }
}
