import { Component, OnInit } from '@angular/core';
import { BillsService } from '@services/bills.service';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { BillDetailsModel } from '@models/bill-data-model';
import { MobileNumbersDataModel } from '@models/mobile-numbers-data-model';
import { BranchService } from '@services/branch.service';
import { BranchModel } from '@models/branch-model';
import { BillModel } from '@models/bill-model';

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
})
export class HrReportComponent implements OnInit {

  bills: BillDetailsModel[] = [] ;
  date: Date = new Date();
  bsValue: Date = new Date(this.date.getFullYear(), 0);
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private BillService: BillsService,
    private MobileNumberService: MobileNumberDataService,
    private BranchSrv: BranchService
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
    console.log('ValueChange');
    this.getBillsByChoosenDate(this.date);
  }

  getBillsByChoosenDate(choosedDate: Date) {
    return this.BillService.getBillsByDate(choosedDate).subscribe((allBills: any[]) => {
      console.log(allBills);
      let i = 0;
      allBills.forEach((billEle: BillModel) => {
        this.MobileNumberService.getMobileNumberData(billEle.mobileNumberId).subscribe((MobileData: MobileNumbersDataModel) => {
          allBills[i].MobileData = MobileData;
          allBills[i].MobileData;
          i++;
          if (i === allBills.length) {
            this.bills = allBills;
          }
        });
      });
    });
  }

}
