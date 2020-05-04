import { Component, OnInit } from '@angular/core';
import { BillsService } from '@services/bills.service';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { BillDetailsModel } from '@models/bill-data-model';
import { MobileNumbersDataModel } from '@models/mobile-numbers-data-model';
import { BillModel } from '@models/bill-model';

import { DxDataGridHrReportModel } from '@models/dx-datagrid-hr-report-mode';

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
})
export class HrReportComponent implements OnInit {

  bills: BillDetailsModel[] = [new BillDetailsModel()] ;
  date: Date = new Date();
  bsValue: Date = new Date(this.date.getFullYear(), 0);
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  DxDsHr: DxDataGridHrReportModel[];
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
          i++;
          const TempDs = new DxDataGridHrReportModel();
          TempDs.HrCode = MobileData.employee.HrCode;
          TempDs.Location = MobileData.employee.branch.name;
          TempDs.amount = billEle.TotalAfterTax;
          TempDs.employeeName = MobileData.employee.name;
          TempDs.mobileNumber = MobileData.mobileNumber;
          TempDs.provider = MobileData.provider.name;
          TempDsArray.push(TempDs);
          if (i === allBills.length) {
            this.DxDsHr = TempDsArray;
          }
        });
      });
    });
  }
}
