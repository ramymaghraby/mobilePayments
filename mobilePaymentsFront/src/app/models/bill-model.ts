import { MobileNumbersDataModel } from './mobile-numbers-data-model';

export class BillModel {
  constructor() {
  }
  id?: number;
  month: Date;
  IntlCharge: number;
  RoamCharge: number;
  TotalAfterTax: number;
  mobileNumberId: number;
  MobileData: MobileNumbersDataModel;
}
