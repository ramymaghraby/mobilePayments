import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Dept, DeptRelations, Employee} from '../models';
import {DbContextDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';

export class DeptRepository extends DefaultCrudRepository<
  Dept,
  typeof Dept.prototype.id,
  DeptRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Dept.prototype.id>;

  constructor(
    @inject('datasources.dbContext') dataSource: DbContextDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Dept, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
