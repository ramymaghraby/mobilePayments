import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Employee, EmployeeRelations, Dept, Branch, Bill, MobileNumber} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DeptRepository} from './dept.repository';
import {BranchRepository} from './branch.repository';
import {BillRepository} from './bill.repository';
import {MobileNumberRepository} from './mobile-number.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly dept: BelongsToAccessor<Dept, typeof Employee.prototype.id>;

  public readonly branch: BelongsToAccessor<Branch, typeof Employee.prototype.id>;

  public readonly bills: HasManyRepositoryFactory<Bill, typeof Employee.prototype.id>;

  public readonly mobileNumbers: HasManyRepositoryFactory<MobileNumber, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource,
    @repository.getter('DeptRepository') protected deptRepositoryGetter: Getter<DeptRepository>,
    @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>, @repository.getter('MobileNumberRepository') protected mobileNumberRepositoryGetter: Getter<MobileNumberRepository>,
  ) {
    super(Employee, dataSource);
    this.mobileNumbers = this.createHasManyRepositoryFactoryFor('mobileNumbers', mobileNumberRepositoryGetter,);
    this.registerInclusionResolver('mobileNumbers', this.mobileNumbers.inclusionResolver);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billRepositoryGetter,);
    this.registerInclusionResolver('bills', this.bills.inclusionResolver);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
    this.registerInclusionResolver('branch', this.branch.inclusionResolver);
    this.dept = this.createBelongsToAccessorFor('dept', deptRepositoryGetter,);
    this.registerInclusionResolver('dept', this.dept.inclusionResolver);
  }
}
