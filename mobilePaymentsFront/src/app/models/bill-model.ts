import { DeptCodeModel } from './dept-code-model';
import { MobileNumbersDataModel } from './mobile-numbers-data-model';
import { MobileNumbersModel } from './mobile-numbers-model';

export class BillModel {
  constructor() {
  }
  id?: number;
  month: Date;
  IntlCharge: number;
  RoamCharge: number;
  TotalAfterTax: number;
  mobileNumberId: number;
  mobileNumber: MobileNumbersDataModel;
}
