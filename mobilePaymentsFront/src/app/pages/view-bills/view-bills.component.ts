import { Component, OnInit } from '@angular/core';
import { BillsService } from '@services/bills.service';
import {Sort} from '@angular/material/sort';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { BillModel } from '@models/bill-model';
import { BillDetailsModel } from '@models/bill-data-model';


@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html'
})
export class ViewBillsComponent implements OnInit {

  bills: any = [] ;
  date: Date = new Date();

  constructor(
    private BillService: BillsService,
    private MobileNumberService: MobileNumberDataService
  ) {
    this.bills = this.bills.slice();
  }

  ngOnInit() {
  }
  getAllBills() {
    return this.BillService.getBills().subscribe((allBills: any[]) => {
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

  public onDateChange(event): void {
    this.date = event;
    this.getBillsByChoosenDate(this.date);
  }

  getBillsByChoosenDate(choosedDate: Date) {
    choosedDate.setDate(1);
    choosedDate.setHours(0, 0, 0, 0);
    return this.BillService.getBillsByDate(choosedDate).subscribe((allBills: any[]) => {
      console.table(allBills);
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

  sortData(sort: Sort) {
    const data = this.bills.slice();
    if (!sort.active || sort.direction === '') {
      this.bills = data;
      return;
    }

    this.bills = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'employeename': return compare(a.employeename, b.employeename, isAsc);
        case 'mobNo': return compare(a.mobilenumber, b.mobilenumber, isAsc);
        case 'acctNo': return compare(a.accountnumber, b.accountnumber, isAsc);
        case 'intCharge': return compare(a.intlcharge, b.intlcharge, isAsc);
        case 'roamCharge': return compare(a.roamcharge, b.roamcharge, isAsc);
        case 'total': return compare(a.totalaftertax, b.totalaftertax, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
