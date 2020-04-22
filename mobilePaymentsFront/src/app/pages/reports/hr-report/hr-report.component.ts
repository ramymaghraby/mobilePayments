import { Component, OnInit } from '@angular/core';
import { BillsService } from '@services/bills.service';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { BillDetailsModel } from '@models/bill-data-model';
import { MobileNumbersDataModel } from '@models/mobile-numbers-data-model';
import { BillModel } from '@models/bill-model';
import { ExcelService } from '@services/excel.service';

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

  constructor(
    private BillService: BillsService,
    private MobileNumberService: MobileNumberDataService,
    private excelService: ExcelService
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
    this.bills = [];
    this.getBillsByChoosenDate(this.date);
  }

  getBillsByChoosenDate(choosedDate: Date) {
    return this.BillService.getBillsByDate(choosedDate).subscribe((allBills: BillModel[]) => {
      let i = 0;
      allBills.forEach((billEle: BillModel) => {
        this.MobileNumberService.getMobileNumberData(billEle.mobileNumberId).subscribe( (MobileData: MobileNumbersDataModel) => {
          allBills[i].MobileData = MobileData;
          i++;
          if (i === allBills.length) {
            this.bills = allBills;
          }
        });
      });
    });
  }

  exportAsXLSX(): void {
    const excel: BillDetailsModel[] = this.bills;
    excel.forEach(bill => {
      bill.employeename = bill.MobileData.employee.name;
      bill.HrCode = bill.MobileData.employee.HrCode;
      bill.Branch = bill.MobileData.employee.branch.name;
      bill.MobileNumber = bill.MobileData.mobileNumber;
      bill.Total = bill.TotalAfterTax;
      bill.Provider = bill.MobileData.provider.name;
      // delete bill.MobileData;
      delete bill.IntlCharge;
      delete bill.RoamCharge;
      delete bill.mobileNumberId;
      delete bill.month;
      console.log(bill);
    });
    this.excelService.exportAsExcelFile(excel, 'HR_Report_');
  }

}
