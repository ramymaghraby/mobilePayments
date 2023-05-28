import { Component, OnInit } from '@angular/core';
import { BillDetailsModel } from '@models/bill-data-model';
import { BillModel } from '@models/bill-model';
import { DxDataGridAccountsReportModel } from '@models/dx-datagrid-accounts-report-model';
import { MobileNumbersDataModel } from '@models/mobile-numbers-data-model';
import { BillsService } from '@services/bills.service';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-accounts-report',
  templateUrl: './accounts-report.component.html',
})
export class AccountsReportComponent implements OnInit {
  bills: BillDetailsModel[] = [new BillDetailsModel()] ;
  date: Date = new Date();
  bsValue: Date = new Date(this.date.getFullYear(), 0);
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  DxDsAccounts: DxDataGridAccountsReportModel[];
  constructor(
    private BillService: BillsService,
    private MobileNumberService: MobileNumberDataService
  ) {
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat : 'MMMM YYYY',
      containerClass : 'theme-red'
    });
  }

  ngOnInit() {
  }

  onValueChange(value: Date): void {
    this.date = value;
    this.getBillsByChoosenDate(this.date);
  }

  getBillsByChoosenDate(choosedDate: Date) {
    return this.BillService.getBillsByDate(choosedDate).subscribe((allBills: BillModel[]) => {
      let i = 0;
      const TempDsArray: any = [];
      allBills.forEach((billEle: BillModel) => {
        this.MobileNumberService.getMobileNumberData(billEle.mobileNumberId).subscribe( (MobileData: MobileNumbersDataModel) => {
          // allBills[i].MobileData = MobileData;
          i++;
          // tslint:disable-next-line: one-variable-per-declaration
          const TempDs = new DxDataGridAccountsReportModel();
          TempDs.HrCode = MobileData.employee.HrCode;
          TempDs.Location = MobileData.employee.branch.name;
          TempDs.amount = billEle.TotalAfterTax;
          TempDs.deptCode = MobileData.deptCode.code;
          TempDs.employeeName = MobileData.employee.name;
          TempDs.mobileNumber = MobileData.mobileNumber;
          TempDs.provider = MobileData.provider.name;
          TempDsArray.push(TempDs);
          if (i === allBills.length) {
            // this.bills = allBills;
            this.DxDsAccounts = TempDsArray;
          }
        });
      });
    });
  }
}
