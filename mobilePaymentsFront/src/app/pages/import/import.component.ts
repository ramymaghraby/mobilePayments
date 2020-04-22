import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { EditBillComponent } from './edit-bill/edit-bill.component';
import { MobileNumberDataService } from '@services/mobile-number-data.service';
import { ImportDataModel } from '../../models/import-data-model';
import { MobileNumbersModel } from '../../models/mobile-numbers-model';
import { BillsService } from '@services/bills.service';
import { BillModel } from '../../models/bill-model';
import { VodafoneAccountsService } from '@services/vodafone-accounts.service';
import { VodafoneAccountModel } from '@models/vodafone-account-model';
import { ToastrService } from 'ngx-toastr';
// tslint:disable-next-line: max-line-length
import { AddEditMobileNumberComponent } from '@masterData/mobile-numbers/add-edit-mobile-number/add-edit-mobile-number.component';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})

export class ImportComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'AccountNo',
    'MobileNumber',
    'InternationalCharge',
    'RoamingCharge',
    'TotalChargeAfterTax',
    'Actions'
  ];
  dataSource: MatTableDataSource<ImportDataModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  storeData: any;
  data: any [] = [] ;
  fileUploaded: File;
  worksheet: any;
  importData: ImportDataModel [];
  filterTotal: number;
  missingNumbersinDB: ImportDataModel [];
  date: Date = new Date();
  VodafoneAccountNumbers: VodafoneAccountModel [];
  mobileNumberAddData: MobileNumbersModel;
  bsValue: Date = new Date(this.date.getFullYear(), 0);
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  // dataSubmitted = true;


  constructor(
    public dialog: MatDialog,
    private MobileNumberService: MobileNumberDataService,
    private BillService: BillsService,
    private VodafoneAccountsSrv: VodafoneAccountsService,
    private toastr: ToastrService
    ) {
      this.bsConfig = Object.assign({}, {
        minMode : this.minMode,
        dateInputFormat : 'MMMM YYYY',
        containerClass : 'theme-red'
      });
  }

  ngOnInit() {
    this.missingNumbersinDB = [];
    // this.date = new Date();
    // this.date.setMonth(this.date.getMonth() - 1 );
    // this.date.setHours(2, 0, 0, 0);
    // this.date.setDate(1);
    this.importData = [];
    this.dataSource = new MatTableDataSource(this.importData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: ImportDataModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getVodafoneAccounts();
  }
  /**
   * Upload file to memory and read it in showed table
   */
  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    this.readExcel().then(() => {
        setTimeout(() => {
          this.readAsJson();
        }, 800);
    });
  }
  /**
   * Convert Excel sheet to ArrayBuffer
   */
  async readExcel() {
    this.importData = [];
    this.missingNumbersinDB = [];
    const readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[firstSheetName];
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }
  /**
   * converted Array Buffer from Excel to JSON
   */
  readAsJson() {
    this.importData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    this.dataSource.data = this.importData as ImportDataModel[] ;
    this.validateMobileNumbers();
  }
  /**
   * Edit Selected bill
   */
  editBill( bill: ImportDataModel ): void {
    const dialogRef = this.dialog.open(EditBillComponent, {
      width: '1024px',
      data: bill
    });

    dialogRef.afterClosed().subscribe((result: ImportDataModel) => {
      this.successToast(result.MobileNumber);
    });
  }
  /**
   * Delete selected bill
   */
  deleteBill(bill: ImportDataModel) {
    const message = confirm('Are you sure you want to delete bill for' + bill.MobileNumber + '?');
    if (message) {
    const billIndex = this.importData.indexOf(bill);
    this.importData.splice(billIndex, 1 );
    this.dataSource.data = this.importData;
  }
  }
  /**
   * Validate mobile numbers are registered in DB
   */
  validateMobileNumbers() {
    this.MobileNumberService.getMobileNumbers().subscribe((mobileNumbers: MobileNumbersModel []) => {
      const MobileNumbersFromExcel = this.importData.map( mobNum => mobNum.MobileNumber);
      const MobileNumbersFromDb = mobileNumbers.map(mobNum => mobNum.mobileNumber);
      const missing: any [] = MobileNumbersFromExcel.filter( mobNum => MobileNumbersFromDb.indexOf(mobNum) < 0);

      if (missing.length > 0) {
      this.missingNumbersinDB = [];
      this.missingNumbersinDB = this.importData.filter(mobNum => missing.indexOf(mobNum.MobileNumber) >= 0);
      this.warningToast();
      } else {
        this.missingNumbersinDB = [];
      }
      mobileNumbers.forEach(mobNum => {
        const i = this.importData.findIndex((obj => obj.MobileNumber === mobNum.mobileNumber));
        if (i >= 0) {
        this.importData[i].mobileNumberId = Number(mobNum.id);
        }
      });
    });
  }
  /**
   * add new number Data
   */
  addNewNumber(mobNum: ImportDataModel) {
    const mobileNumber = new MobileNumbersModel();
    mobileNumber.mobileNumber = mobNum.MobileNumber;
    const vfID = this.VodafoneAccountNumbers.find(accountId => accountId.accountNumber === mobNum.AccountNo);
    mobileNumber.vodafoneAccountId = vfID.id;
    const dialogRef = this.dialog.open(AddEditMobileNumberComponent, {
      width: '1024px',
      data: mobileNumber
    });

    dialogRef.afterClosed().subscribe((result: MobileNumbersModel) => {
      if (result) {
        this.MobileNumberService.postMobileNumber(result).subscribe((res: MobileNumbersModel) => {
          this.mobileNumberAddData = res ;
          this.successToast(result.mobileNumber);
        });
      }
    });
  }
    /**
     * Post Each Bill back to DB
     */
  submitBillsToDb() {
    const submittedToDb = [];
    this.importData.forEach(num => {
      const temp = new BillModel();
      temp.IntlCharge = Number(num.InternationalCharge);
      temp.RoamCharge = Number(num.RoamingCharge);
      temp.TotalAfterTax = Number(num.TotalChargeAfterTax);
      temp.mobileNumberId = Number(num.mobileNumberId);
      temp.month = this.date;
      this.BillService.postBill(temp).subscribe(reply => {
        submittedToDb.push(reply);
        if (submittedToDb.length === this.importData.length) {
          this.successSubmitToDb(submittedToDb.length);
        }
        console.log(temp);
    }, err => {
      console.log(err.message);
    });
    });
  }
  /**
   * Account Numbers Filter Function
   */
  applyFilterAccount(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'AccountNo',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.TotalChargeAfterTax), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  /**
   * Mobile Numbers Filter Function
   */
  applyFilterMobile(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'MobileNumber',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.TotalChargeAfterTax), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  onValueChange(value: Date): void {
    value.setHours(this.date.getHours());
    this.date = value;
  }

  getVodafoneAccounts() {
    this.VodafoneAccountsSrv.getVodafoneAccounts().subscribe((AccountNumbers: VodafoneAccountModel []) => {
      this.VodafoneAccountNumbers = AccountNumbers;
    });
  }

  successToast(numberData) {
    this.toastr.success('Data for ' + numberData + ' have been updated Successfully !', 'Add Successful');
  }

  warningToast() {
    this.toastr.warning('Not all numbers are registered inside the system', 'Warning');
  }
  successSubmitToDb(bills) {
    this.toastr.success(bills + ' Bills have been submitted Successfully !', 'Sucessful');
  }
}
