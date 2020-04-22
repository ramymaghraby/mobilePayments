import { RatePlansModel } from './rate-plans-model';
import { VodafoneAccountModel } from './vodafone-account-model';
import { EmployeeModel } from './employee-model';
import { DeptCodeModel } from './dept-code-model';
import {AccountPaymentTypeModel} from './account-payment-type-model';
import { ServiceProviderModel } from './service-provider-model';

export class MobileNumbersDataModel {

  constructor() {}

  id: number;
  mobileNumber: string;
  simCardNumber: string;
  companyAccount: boolean;
  personalAccount: boolean;
  splitAccount: boolean;
  ratePlanId: number;
  vodafoneAccountId: number;
  employeeId: number;
  deptCodeId: number;
  RatePlan: string;
  ratePlan: RatePlansModel;
  VodafoneAccount: string;
  vodafoneAccount: VodafoneAccountModel;
  Employee: string;
  employee: EmployeeModel;
  DeptCode: string;
  deptCode: DeptCodeModel;
  accountPaymentTypeId: number;
  AccountPaymentType: string;
  accountPaymentType: AccountPaymentTypeModel;
  providerId: number;
  ServiceProvider: string;
  provider: ServiceProviderModel;
}

