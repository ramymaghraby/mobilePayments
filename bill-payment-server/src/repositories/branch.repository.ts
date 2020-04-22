import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Branch, BranchRelations, Employee} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';

export class BranchRepository extends DefaultCrudRepository<
  Branch,
  typeof Branch.prototype.id,
  BranchRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Branch.prototype.id>;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Branch, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
