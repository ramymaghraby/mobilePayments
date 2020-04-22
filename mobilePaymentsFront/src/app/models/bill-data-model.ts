import { MobileNumbersDataModel } from './mobile-numbers-data-model';

export class BillDetailsModel {
  constructor() {
  }
id?: any;
employeename?: string;
MobileNumber?: string;
acctNo?: string;
MobileData?: MobileNumbersDataModel;
HrCode?: string;
Branch?: string;
Provider?: string;
IntlCharge?: number;
RoamCharge?: number;
TotalAfterTax?: number;
mobileNumberId?: number;
month?: Date;
Total?: number;
}
