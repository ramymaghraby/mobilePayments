import {DefaultCrudRepository} from '@loopback/repository';
import {DeptCode, DeptCodeRelations} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DeptCodeRepository extends DefaultCrudRepository<
  DeptCode,
  typeof DeptCode.prototype.id,
  DeptCodeRelations
> {
  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
  ) {
    super(DeptCode, dataSource);
  }
}
