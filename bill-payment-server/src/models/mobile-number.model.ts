import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import {RatePlan, RatePlanWithRelations} from './rate-plan.model';
import {
  VodafoneAccount,
  VodafoneAccountWithRelations,
} from './vodafone-account.model';
import {Employee} from './employee.model';
import {Bill, BillWithRelations} from './bill.model';
import {ExtraPackage, ExtraPackageWithRelations} from './extra-package.model';
import {DeptCode} from './dept-code.model';
import {AccountPaymentType} from './account-payment-type.model';
import {Provider} from './provider.model';

// import {Provider} from './provider.model';

@model({
  settings: {
    foreignKeys: {
      fkReviewVfAccountsId: {
        name: 'fkReviewVfAccountsId',
        entity: 'VodafoneAccount',
        entityKey: 'id',
        foreignKey: 'vodafoneAccountId',
      },
      fkReviewRatePlansId: {
        name: 'fkReviewRatePlansId',
        entity: 'RatePlan',
        entityKey: 'id',
        foreignKey: 'ratePlanId',
      },
      fkReviewEmployeeId: {
        name: 'fkReviewEmployeeId',
        entity: 'Employee',
        entityKey: 'id',
        foreignKey: 'employeeId',
      },
      fkReviewDeptCodeId: {
        name: 'fkReviewDeptCpdeId',
        entity: 'DeptCode',
        entityKey: 'id',
        foreignKey: 'deptCodeId',
      },
      fkReviewAccountPaymentTypeId: {
        name: 'fkReviewAccountPaymentTypeId',
        entity: 'AccountPaymentType',
        entityKey: 'id',
        foreignKey: 'accountPaymentTypeId',
      },
      fkReviewProviderId: {
        name: 'fkReviewProviderId',
        entity: 'Provider',
        entityKey: 'id',
        foreignKey: 'providerId',
      },
    },
  },
})
export class MobileNumber extends Entity {
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
      columnName: 'mobileNumber',
      dataType: 'VARCHAR',
      dataLength: 15,
      nullable: 'N',
    },
  })
  mobileNumber: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'simCardNumber',
      dataType: 'VARCHAR',
      dataLength: 30,
      nullable: 'N',
    },
  })
  simCardNumber: string;

  @belongsTo(() => RatePlan)
  ratePlanId: number;

  @belongsTo(() => VodafoneAccount)
  vodafoneAccountId: number;

  @belongsTo(() => Employee)
  employeeId: number;

  @hasMany(() => Bill)
  bills: Bill[];

  @hasMany(() => ExtraPackage)
  extraPackages: ExtraPackage[];

  @belongsTo(() => DeptCode)
  deptCodeId: number;

  @belongsTo(() => AccountPaymentType)
  accountPaymentTypeId: number;

  @belongsTo(() => Provider)
  providerId: number;

  constructor(data?: Partial<MobileNumber>) {
    super(data);
  }
}

export interface MobileNumberRelations {
  // describe navigational properties here
  RatePlan?: RatePlanWithRelations;
  VodafoneAccount?: VodafoneAccountWithRelations;
  Bill?: BillWithRelations[];
  ExtraPackage?: ExtraPackageWithRelations[];
}

export type MobileNumberWithRelations = MobileNumber & MobileNumberRelations;
