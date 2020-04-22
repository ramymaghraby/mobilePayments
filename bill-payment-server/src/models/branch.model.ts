import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee, EmployeeWithRelations} from './employee.model';

@model()
export class Branch extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      "columnName": "id",
      "dataType": "INT",
      "dataLength": 3
    }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      "columnName": "name",
      "dataType": "VARCHAR",
      "dataLength": 100
    }
  })
  name: string;

  @hasMany(() => Employee)
  employees: Employee[];

  constructor(data?: Partial<Branch>) {
    super(data);
  }
}

export interface BranchRelations {
  // describe navigational properties here
  Employee?: EmployeeWithRelations[];
}

export type BranchWithRelations = Branch & BranchRelations;
