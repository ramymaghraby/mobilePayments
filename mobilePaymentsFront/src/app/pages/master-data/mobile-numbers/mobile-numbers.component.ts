import { Component, OnInit, ViewChild } from '@angular/core';
import { MobileNumbersDataModel } from '@models/mobile-numbers-data-model';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { AddEditMobileNumberComponent } from './add-edit-mobile-number/add-edit-mobile-number.component';
import { MobileNumbersModel } from '@models/mobile-numbers-model';
import { ExcelService } from '@services/excel.service';

@Component({
  selector: 'app-mobile-numbers',
  templateUrl: './mobile-numbers.component.html',
})
export class MobileNumbersComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'mobileNumber',
    'simCardNumber',
    'accountPaymentType',
    'ratePlan',
    'vodafoneAccount',
    'employee',
    'deptCode',
    'provider',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  mobileNumbers: MobileNumbersDataModel [];
  dataSource: MatTableDataSource<MobileNumbersDataModel>;
  data: any [] = [] ;
  filterTotal: number;


  constructor(
    public dialog: MatDialog,
    private mobileNumbersSrv: MobileNumberDataService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.mobileNumbers = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: MobileNumbersDataModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllMobileNumbers();
  }

  getAllMobileNumbers() {
    this.mobileNumbersSrv.getAllMobileNumbersWithData().subscribe((mobileNumbers: MobileNumbersDataModel[]) => {
      this.mobileNumbers = mobileNumbers;
      this.dataSource = new MatTableDataSource(this.mobileNumbers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: MobileNumbersDataModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    });
  }

  addMobileNumber() {
    const dialogRef = this.dialog.open(AddEditMobileNumberComponent, {
      width: '1024px',
      data: new MobileNumbersDataModel()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.mobileNumbersSrv.postMobileNumber(result).subscribe((mobileNumber: MobileNumbersModel) => {
          this.putSucceedToastr( mobileNumber.mobileNumber);
          this.getAllMobileNumbers();
        });
      } else {
        this.getAllMobileNumbers();
      }
    });
   }

  editMobileNumber(mobileNumber: MobileNumbersDataModel): void {
    const dialogRef = this.dialog.open(AddEditMobileNumberComponent, {
      width: '1024px',
      data: mobileNumber
    });

    dialogRef.afterClosed().subscribe((result: MobileNumbersModel ) => {
      if (result) {
        this.mobileNumbersSrv.putMobileNumber(result).subscribe(res => {
          if (res.status === 204) {
            this.putSucceedToastr(result.mobileNumber);
            this.getAllMobileNumbers();
          }
        });
      } else {
        this.getAllMobileNumbers();
      }
    });
  }

  deleteMobileNumber(mobileNumber: MobileNumbersDataModel) {
    this.mobileNumbersSrv.deleteMobileNumber(mobileNumber).subscribe(res => {
      if (res.status === 204) {
        this.deleteSucceedToastr(mobileNumber.mobileNumber);
        this.getAllMobileNumbers();
      }
    });
  }

  /**
   * Mobile Numbers Filter Function
   */
  applyFilterMobileNumber(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'mobileNumber',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.mobileNumber), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  /**
   * Employee Filter Function
   */
  applyFilterEmployee(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'employee',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.employee), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  /**
   * Export to excel
   */

  exportAsXLSX(): void {
    const excel = this.dataSource.data;
    excel.forEach(ele => {
      ele.RatePlan = ele.ratePlan.name;
      ele.VodafoneAccount = ele.vodafoneAccount.accountNumber;
      ele.Employee = ele.employee.name;
      ele.DeptCode = ele.deptCode.code;
      ele.AccountPaymentType = ele.accountPaymentType.type;
      delete ele.deptCodeId;
      delete ele.ratePlanId;
      delete ele.employeeId;
      delete ele.vodafoneAccountId;
      delete ele.accountPaymentTypeId;
      delete ele.ratePlan;
      delete ele.vodafoneAccount;
      delete ele.employee;
      delete ele.deptCode;
      delete ele.accountPaymentType;
    });
    this.excelService.exportAsExcelFile(excel, 'Mobile_Numbers_Data');
  }

  /**
   * Succeess toaster
   */
  putSucceedToastr(accountNumber) {
    this.toastr.success('Data for ' + accountNumber + ' have been updated Successfully ', 'Updated');
  }

  /**
   * Delete Succeess toaster
   */

  deleteSucceedToastr(accountNumber) {
    this.toastr.warning('Account number: ' + accountNumber + ' Data have been deleted Successfully !!', 'Deleted');
  }
}
