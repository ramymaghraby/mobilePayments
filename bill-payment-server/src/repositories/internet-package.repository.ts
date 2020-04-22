import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InternetPackage, InternetPackageRelations, ExtraPackage} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ExtraPackageRepository} from './extra-package.repository';

export class InternetPackageRepository extends DefaultCrudRepository<
  InternetPackage,
  typeof InternetPackage.prototype.id,
  InternetPackageRelations
> {

  public readonly extraPackages: HasManyRepositoryFactory<ExtraPackage, typeof InternetPackage.prototype.id>;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource, @repository.getter('ExtraPackageRepository') protected extraPackageRepositoryGetter: Getter<ExtraPackageRepository>,
  ) {
    super(InternetPackage, dataSource);
    this.extraPackages = this.createHasManyRepositoryFactoryFor('extraPackages', extraPackageRepositoryGetter,);
    this.registerInclusionResolver('extraPackages', this.extraPackages.inclusionResolver);
  }
}
