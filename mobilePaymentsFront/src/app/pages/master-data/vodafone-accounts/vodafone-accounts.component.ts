import { Component, OnInit, ViewChild } from '@angular/core';
import { VodafoneAccountModel } from '@models/vodafone-account-model';
import { VodafoneAccountsService } from '@services/vodafone-accounts.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AddEditVodafoneAccountComponent } from './add-edit-vodafone-account/add-edit-vodafone-account.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vodafone-accounts',
  templateUrl: './vodafone-accounts.component.html',
})
export class VodafoneAccountsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'accountNumber',
    'accountDesc',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  vodafoneAccounts: VodafoneAccountModel [];
  dataSource: MatTableDataSource<VodafoneAccountModel>;
  data: any [] = [] ;
  filterTotal: number;


  constructor(
    public dialog: MatDialog,
    private VodafoneAccountSrv: VodafoneAccountsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.vodafoneAccounts = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: VodafoneAccountModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllVodafoneAccounts();
  }

  getAllVodafoneAccounts() {
    this.VodafoneAccountSrv.getVodafoneAccounts().subscribe((vodafoneAccount: VodafoneAccountModel[]) => {
      this.vodafoneAccounts = vodafoneAccount;
      this.dataSource = new MatTableDataSource(this.vodafoneAccounts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: VodafoneAccountModel, filtersJson: string) => {
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

  addVodafoneAccount() {
    const dialogRef = this.dialog.open(AddEditVodafoneAccountComponent, {
      width: '1024px',
      data: new VodafoneAccountModel()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.VodafoneAccountSrv.postVodafoneAccount(result).subscribe((VfAccount: VodafoneAccountModel) => {
          this.vfAccountPutSucceedToastr( VfAccount.accountNumber);
          this.getAllVodafoneAccounts();
        });
      } else {
        this.getAllVodafoneAccounts();
      }
    });
   }

  editVodafoneAccount(accountNumber: VodafoneAccountModel): void {
    const dialogRef = this.dialog.open(AddEditVodafoneAccountComponent, {
      width: '1024px',
      data: accountNumber
    });

    dialogRef.afterClosed().subscribe((result: VodafoneAccountModel ) => {
      if (result) {
        this.VodafoneAccountSrv.putVodafoneAccount(result).subscribe(res => {
          if (res.status === 204) {
            this.vfAccountPutSucceedToastr(result.accountNumber);
            this.getAllVodafoneAccounts();
          }
        });
      } else {
        this.getAllVodafoneAccounts();
      }
    });
  }

  deleteVodafoneAccount(accountNumber: VodafoneAccountModel) {
    this.VodafoneAccountSrv.deleteVodafoneAccount(accountNumber).subscribe(res => {
      if (res.status === 204) {
        this.vfAccountDeleteSucceedToastr(accountNumber.accountNumber);
        this.getAllVodafoneAccounts();
      }
    });
  }

  /**
   * Account Numbers Filter Function
   */
  applyFilterVodafoneAccount(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'accountNumber',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.accountDesc), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  /**
   * Mobile Numbers Filter Function
   */
  applyFilterAccountDescription(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'accountDesc',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.accountDesc), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  vfAccountPutSucceedToastr(accountNumber) {
    this.toastr.success('Data for ' + accountNumber + ' have been updated Successfully ', 'Updated');
  }

  vfAccountDeleteSucceedToastr(accountNumber) {
    this.toastr.warning('Account number: ' + accountNumber + ' Data have been deleted Successfully !!', 'Deleted');
  }
}
