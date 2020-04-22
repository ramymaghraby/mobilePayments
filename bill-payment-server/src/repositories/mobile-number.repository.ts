import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor, HasManyRepositoryFactory
} from '@loopback/repository';
import {
  MobileNumber,
  MobileNumberRelations,
  Bill,
  RatePlan,
  VodafoneAccount,
  Employee, ExtraPackage, DeptCode, AccountPaymentType, Provider} from '../models';
import { DbContextDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { RatePlanRepository } from './rate-plan.repository';
import { VodafoneAccountRepository } from './vodafone-account.repository';
import { EmployeeRepository } from './employee.repository';
import { BillRepository } from './bill.repository';
import { ExtraPackageRepository } from './extra-package.repository';
import {DeptCodeRepository} from './dept-code.repository';
import {AccountPaymentTypeRepository} from './account-payment-type.repository';
import {ProviderRepository} from './provider.repository';

export class MobileNumberRepository extends DefaultCrudRepository<
  MobileNumber,
  typeof MobileNumber.prototype.id,
  MobileNumberRelations
  > {
  public readonly bill: BelongsToAccessor<
    Bill,
    typeof MobileNumber.prototype.id
  >;

  public readonly ratePlan: BelongsToAccessor<
    RatePlan,
    typeof MobileNumber.prototype.id
  >;

  public readonly vodafoneAccount: BelongsToAccessor<
    VodafoneAccount,
    typeof MobileNumber.prototype.id
  >;

  public readonly employee: BelongsToAccessor<
    Employee,
    typeof MobileNumber.prototype.id
  >;

  public readonly bills: HasManyRepositoryFactory<Bill, typeof MobileNumber.prototype.id>;

  public readonly extraPackages: HasManyRepositoryFactory<ExtraPackage, typeof MobileNumber.prototype.id>;

  public readonly deptCode: BelongsToAccessor<DeptCode, typeof MobileNumber.prototype.id>;

  public readonly accountPaymentType: BelongsToAccessor<AccountPaymentType, typeof MobileNumber.prototype.id>;

  public readonly provider: BelongsToAccessor<Provider, typeof MobileNumber.prototype.id>;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
    @repository.getter('RatePlanRepository')
    protected ratePlanRepositoryGetter: Getter<RatePlanRepository>,
    @repository.getter('VodafoneAccountRepository')
    protected vodafoneAccountRepositoryGetter: Getter<
      VodafoneAccountRepository
    >,
    @repository.getter('EmployeeRepository')
    protected employeeRepositoryGetter: Getter<EmployeeRepository>,
    @repository.getter('BillRepository')
    protected billRepositoryGetter: Getter<BillRepository>,
    @repository.getter('ExtraPackageRepository')
    protected extraPackageRepositoryGetter: Getter<ExtraPackageRepository>, @repository.getter('DeptCodeRepository') protected deptCodeRepositoryGetter: Getter<DeptCodeRepository>, @repository.getter('AccountPaymentTypeRepository') protected accountPaymentTypeRepositoryGetter: Getter<AccountPaymentTypeRepository>, @repository.getter('ProviderRepository') protected providerRepositoryGetter: Getter<ProviderRepository>,
  ) {
    super(MobileNumber, dataSource);
    this.provider = this.createBelongsToAccessorFor('provider', providerRepositoryGetter,);
    this.registerInclusionResolver('provider', this.provider.inclusionResolver);
    this.accountPaymentType = this.createBelongsToAccessorFor('accountPaymentType', accountPaymentTypeRepositoryGetter,);
    this.registerInclusionResolver('accountPaymentType', this.accountPaymentType.inclusionResolver);
    this.deptCode = this.createBelongsToAccessorFor('deptCode', deptCodeRepositoryGetter,);
    this.registerInclusionResolver('deptCode', this.deptCode.inclusionResolver);
    this.extraPackages = this.createHasManyRepositoryFactoryFor('extraPackages', extraPackageRepositoryGetter);
    this.registerInclusionResolver('extraPackages', this.extraPackages.inclusionResolver);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billRepositoryGetter);
    this.registerInclusionResolver('bills', this.bills.inclusionResolver);
    this.employee = this.createBelongsToAccessorFor(
      'employee',
      employeeRepositoryGetter,
    );
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
    this.vodafoneAccount = this.createBelongsToAccessorFor(
      'vodafoneAccount',
      vodafoneAccountRepositoryGetter,
    );
    this.registerInclusionResolver(
      'vodafoneAccount',
      this.vodafoneAccount.inclusionResolver,
    );
    this.ratePlan = this.createBelongsToAccessorFor(
      'ratePlan',
      ratePlanRepositoryGetter,
    );
    this.registerInclusionResolver('ratePlan', this.ratePlan.inclusionResolver);
  }
}
