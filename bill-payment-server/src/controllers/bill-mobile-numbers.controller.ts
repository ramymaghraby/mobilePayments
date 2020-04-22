import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Bill, MobileNumber} from '../models';
import {BillRepository} from '../repositories';

export class BillMobileNumbersController {
  constructor(
    @repository(BillRepository)
    public billRepository: BillRepository,
  ) {}

  @get('/bills/{id}/mobile-numbers', {
    responses: {
      '200': {
        description: 'MobileNumbers belonging to Bill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MobileNumber)},
          },
        },
      },
    },
  })
  async getMobileNumbers(
    @param.path.number('id') id: typeof Bill.prototype.id,
  ): Promise<MobileNumber> {
    return this.billRepository.mobileNumber(id);
  }
}
