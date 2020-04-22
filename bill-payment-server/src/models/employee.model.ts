import { BillWithRelations } from './bill.model';
/* eslint-disable @typescript-eslint/camelcase */
import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { Dept, DeptWithRelations } from './dept.model';
import { Branch, BranchWithRelations } from './branch.model';
import { Bill } from './bill.model';
import { MobileNumber, MobileNumberWithRelations } from './mobile-number.model';

@model({
  settings: {
    foreignKeys: {
      fk_employee_deptId: {
        name: 'fk_employee_deptId',
        entity: 'Dept',
        entityKey: 'id',
        foreignKey: 'deptId',
      },
      fk_employee_branchId: {
        name: 'fk_employee_branchId',
        entity: 'Branch',
        entityKey: 'id',
        foreignKey: 'branchId',
      },
    },
  },
})
export class Employee extends Entity {
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
      "dataLength": 70
    }
  })
  name: string;

  @property({
    type: 'string',
    mysql: {
      "columnName": "HrCode",
      "dataType": "VARCHAR",
      "dataLength": 5
    }
  })
  HrCode?: string;

  @belongsTo(() => Dept)
  deptId: number;

  @belongsTo(() => Branch)
  branchId: number;

  @hasMany(() => Bill, { keyTo: 'mobileNumberId' })
  bills: Bill[];

  @hasMany(() => MobileNumber)
  mobileNumbers: MobileNumber[];

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
  Dept?: DeptWithRelations;
  Branch?: BranchWithRelations;
  Bill?: BillWithRelations[];
  MobileNumber?: MobileNumberWithRelations[];
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
