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
      // const tempDsArray: any = [];
      // const tempDs = new DxDataGridHrReportModel();
      // console.log(allBills);
      //   allBills.map((billsData, i) => {
      //     if (billsData.mobileNumber.accountPaymentTypeId !== 1) {
      //       console.log(i)
      //       tempDs.HrCode = billsData.mobileNumber.employee.HrCode;
      //       tempDs.Location = billsData.mobileNumber.employee.branch.name;
      //       tempDs.amount = billsData.TotalAfterTax;
      //       tempDs.employeeName = billsData.mobileNumber.employee.name;
      //       tempDs.mobileNumber = billsData.mobileNumber.mobileNumber;
      //       tempDs.provider = billsData.mobileNumber.provider.name;
      //       tempDsArray.push(tempDs);
      //     } else {
      //       console.log ('no');
      //     }
      //     this.DxDsHr.push(tempDsArray);
      //   })

      // allBills.map(billsData => {
      //   if (billsData.mobileNumber.accountPaymentType) {
      //     console.log("IF")
      //     this.DxDsHr.map(dxData => {
      //       dxData.HrCode = billsData.mobileNumber.employee.HrCode;
      //       dxData.Location = billsData.mobileNumber.employee.branch.name;
      //       dxData.amount = billsData.TotalAfterTax;
      //       dxData.employeeName = billsData.mobileNumber.employee.name;
      //       dxData.mobileNumber = billsData.mobileNumber.mobileNumber;
      //       dxData.provider = billsData.mobileNumber.provider.name
      //       })
      //   } else {
      //     console.log('a7a');

      //   }
      // })



      let i = 0;
      const tempDsArray: any = [];
      allBills.forEach((billEle: BillModel) => {
        i++;
        if (billEle.mobileNumber.accountPaymentTypeId === 2) {
          const TempDs = new DxDataGridHrReportModel();
          TempDs.HrCode = billEle.mobileNumber.employee.HrCode;
          TempDs.Location = billEle.mobileNumber.employee.branch.name;
          TempDs.amount = billEle.TotalAfterTax;
          TempDs.employeeName = billEle.mobileNumber.employee.name;
          TempDs.mobileNumber = billEle.mobileNumber.mobileNumber;
          TempDs.provider = billEle.mobileNumber.provider.name;
          tempDsArray.push(TempDs);
        } else {
          if (billEle.mobileNumber.accountPaymentTypeId === 3) {
            const TempDs = new DxDataGridHrReportModel();
            TempDs.HrCode = billEle.mobileNumber.employee.HrCode;
            TempDs.Location = billEle.mobileNumber.employee.branch.name;
            TempDs.amount = billEle.TotalAfterTax - 60.00;
            TempDs.amount.toPrecision(2);
            // console.log( billEle.TotalAfterTax - 6);
            TempDs.employeeName = billEle.mobileNumber.employee.name;
            TempDs.mobileNumber = billEle.mobileNumber.mobileNumber;
            TempDs.provider = billEle.mobileNumber.provider.name;
            tempDsArray.push(TempDs);
          }
        }

          if (i === allBills.length) {
            this.DxDsHr = tempDsArray;
          }
        this.MobileNumberService.getMobileNumberData(billEle.mobileNumberId).subscribe( (MobileData: MobileNumbersDataModel) => {

        });
      });
    });
  }
}
