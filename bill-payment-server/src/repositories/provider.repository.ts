import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Provider, ProviderRelations, MobileNumber} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MobileNumberRepository} from './mobile-number.repository';

export class ProviderRepository extends DefaultCrudRepository<
  Provider,
  typeof Provider.prototype.id,
  ProviderRelations
> {

  public readonly mobileNumbers: HasManyRepositoryFactory<MobileNumber, typeof Provider.prototype.id>;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource, @repository.getter('MobileNumberRepository') protected mobileNumberRepositoryGetter: Getter<MobileNumberRepository>,
  ) {
    super(Provider, dataSource);
    this.mobileNumbers = this.createHasManyRepositoryFactoryFor('mobileNumbers', mobileNumberRepositoryGetter,);
    this.registerInclusionResolver('mobileNumbers', this.mobileNumbers.inclusionResolver);
  }
}
