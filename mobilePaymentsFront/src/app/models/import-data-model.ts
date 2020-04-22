export interface ImportDataModel {
  id: string;
  month: Date;
  AccountNo: string;
  MobileNumber: string;
  RatePlan: string;
  AccessCharge: string;
  NationalCharge: string;
  InternationalCharge: number;
  RoamingCharge: number;
  VFLive: number;
  OccCharge: number;
  TotalCharge: number;
  TotalChargeAfterTax: number;
  mobileNumberId: number;
}
