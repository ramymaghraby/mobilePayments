import {DefaultCrudRepository} from '@loopback/repository';
import {AccountPaymentType, AccountPaymentTypeRelations} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AccountPaymentTypeRepository extends DefaultCrudRepository<
  AccountPaymentType,
  typeof AccountPaymentType.prototype.id,
  AccountPaymentTypeRelations
> {
  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
  ) {
    super(AccountPaymentType, dataSource);
  }
}
