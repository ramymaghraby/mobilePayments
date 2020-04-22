import {DefaultCrudRepository} from '@loopback/repository';
import {RatePlan, RatePlanRelations} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RatePlanRepository extends DefaultCrudRepository<
  RatePlan,
  typeof RatePlan.prototype.id,
  RatePlanRelations
> {
  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
  ) {
    super(RatePlan, dataSource);
  }
}
