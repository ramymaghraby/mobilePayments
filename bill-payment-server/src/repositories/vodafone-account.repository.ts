import {DefaultCrudRepository} from '@loopback/repository';
import {VodafoneAccount, VodafoneAccountRelations} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VodafoneAccountRepository extends DefaultCrudRepository<
  VodafoneAccount,
  typeof VodafoneAccount.prototype.id,
  VodafoneAccountRelations
> {
  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
  ) {
    super(VodafoneAccount, dataSource);
  }
}
