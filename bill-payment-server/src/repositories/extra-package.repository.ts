import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  ExtraPackage,
  ExtraPackageRelations,
  MobileNumber,
  InternetPackage,
} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MobileNumberRepository} from './mobile-number.repository';
import {InternetPackageRepository} from './internet-package.repository';

export class ExtraPackageRepository extends DefaultCrudRepository<
  ExtraPackage,
  typeof ExtraPackage.prototype.id,
  ExtraPackageRelations
> {
  public readonly mobileNumber: BelongsToAccessor<
    MobileNumber,
    typeof ExtraPackage.prototype.id
  >;

  public readonly internetPackage: BelongsToAccessor<
    InternetPackage,
    typeof ExtraPackage.prototype.id
  >;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
    @repository.getter('MobileNumbersRepository')
    protected mobileNumberRepositoryGetter: Getter<MobileNumberRepository>,
    @repository.getter('InternetPackageRepository')
    protected internetPackageRepositoryGetter: Getter<
      InternetPackageRepository
    >,
  ) {
    super(ExtraPackage, dataSource);
    this.internetPackage = this.createBelongsToAccessorFor(
      'internetPackage',
      internetPackageRepositoryGetter,
    );
    this.registerInclusionResolver(
      'internetPackage',
      this.internetPackage.inclusionResolver,
    );
    this.mobileNumber = this.createBelongsToAccessorFor(
      'mobileNumber',
      mobileNumberRepositoryGetter,
    );
    this.registerInclusionResolver(
      'mobileNumber',
      this.mobileNumber.inclusionResolver,
    );
  }
}
