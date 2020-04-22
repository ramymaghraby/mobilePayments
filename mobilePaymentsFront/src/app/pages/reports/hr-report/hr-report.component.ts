import { Component, OnInit } from '@angular/core';
import { BillsService } from '@services/bills.service';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/public_api';
import { BillDetailsModel } from '@models/bill-data-model';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

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

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'HRReport', // the id of html/table element
  };

  constructor(
    private BillService: BillsService,
    private MobileNumberService: MobileNumberDataService,
    private exportAsService: ExportAsService
  ) {
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat : 'MMMM YYYY',
      containerClass : 'theme-red'
    });
  }

  ngOnInit() {
  }

  export() {
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'Mobiles-HR').subscribe(() => {
      // save started
    });
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
      allBills.forEach(billEle => {
        const mobileid = billEle.mobileNumberId;
        this.MobileNumberService.getMobileNumberData(mobileid).subscribe(MobileData => {
          allBills[i].MobileData = MobileData;
          i++;
          if (i === allBills.length) {
            this.bills = allBills;
          }
        });
      });
    });
  }

}
