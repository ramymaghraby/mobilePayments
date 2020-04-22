import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee, EmployeeWithRelations} from './employee.model';

@model()
export class Dept extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'INT',
      dataLength: 3,
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'name',
      dataType: 'VARCHAR',
      dataLength: 100,
    },
  })
  name: string;

  @hasMany(() => Employee)
  employees: Employee[];

  constructor(data?: Partial<Dept>) {
    super(data);
  }
}

export interface DeptRelations {
  // describe navigational properties here
  Employee?: EmployeeWithRelations[];
}

export type DeptWithRelations = Dept & DeptRelations;
