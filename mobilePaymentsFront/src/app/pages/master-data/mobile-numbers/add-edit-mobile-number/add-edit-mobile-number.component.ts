import { Component, OnInit, Inject, Input } from '@angular/core';
import { EmployeeModel } from '@models/employee-model';
import { RatePlansModel } from '@models/rate-plans-model';
import { VodafoneAccountModel } from '@models/vodafone-account-model';
import { DeptCodeModel } from '@models/dept-code-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MobileNumbersModel } from '@models/mobile-numbers-model';
import { RatePlansService } from '@services/rate-plans.service';
import { EmployeeService } from '@services/employee.service';
import { VodafoneAccountsService } from '@services/vodafone-accounts.service';
import { DeptCodeService } from '@services/dept-code.service';
import { AccountPaymentTypeService } from '@services/account-payment-type.service';
import { AccountPaymentTypeModel } from '@models/account-payment-type-model';
import { ServiceProviderModel } from '@models/service-provider-model';
import { ServiceProviderService } from '@services/service-provider.service';

@Component({
  selector: 'app-add-edit-mobile-number',
  templateUrl: './add-edit-mobile-number.component.html',
})
export class AddEditMobileNumberComponent implements OnInit {

  ratePlans: RatePlansModel[];
  employeesData: EmployeeModel [];
  VodafoneAccountNumbers: VodafoneAccountModel [];
  deptCodes: DeptCodeModel[];
  numberEditMode: boolean;
  AccountPaymentTypes: AccountPaymentTypeModel [];
  serviceProviders: ServiceProviderModel [];


  constructor(
    public dialogRef: MatDialogRef<AddEditMobileNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MobileNumbersModel,
    private RatePlansSrv: RatePlansService,
    private EmployeeSrv: EmployeeService,
    private VodafoneAccountsSrv: VodafoneAccountsService,
    private DeptCodeSrv: DeptCodeService,
    private AccountPaymentTypeSrv: AccountPaymentTypeService,
    private serviceProvidersSrv: ServiceProviderService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getPlans();
    this.getEmployees();
    this.getVodafoneAccounts();
    this.getPaymentTypes();
    this.getServiceProviders();
    this.getDeptCodes();
    if (this.data.mobileNumber != null) {
      this.numberEditMode = true;
    } else {
      this.numberEditMode = false;
    }
  }

  getPlans() {
    this.RatePlansSrv.getRatePlans().subscribe((rates: RatePlansModel[] ) => {
      this.ratePlans = rates;
    });
  }

  getDeptCodes() {
    this.DeptCodeSrv.getAllDeptCodes().subscribe((codes: DeptCodeModel[]) => {
      this.deptCodes = codes;
    });
  }
  getEmployees() {
    this.EmployeeSrv.getAllEmployees().subscribe((employees: EmployeeModel[]) => {
      console.log(employees);
      this.employeesData = employees;
    });
  }
  getVodafoneAccounts() {
    this.VodafoneAccountsSrv.getVodafoneAccounts().subscribe((AccountNumbers: VodafoneAccountModel []) => {
      this.VodafoneAccountNumbers = AccountNumbers;
    });
  }
  getPaymentTypes() {
    this.AccountPaymentTypeSrv.getAllTypes().subscribe((AccountPaymentTypes: AccountPaymentTypeModel[]) => {
      this.AccountPaymentTypes = AccountPaymentTypes;
    });
  }
  getServiceProviders() {
    this.serviceProvidersSrv.getServiceProviders().subscribe((serviceProv: ServiceProviderModel[]) => {
      this.serviceProviders = serviceProv;
    });
  }
}
