import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { DeptCodeModel } from '@models/dept-code-model';
import { DeptCodeService } from '@services/dept-code.service';
import { AddEditDeptCodeComponent } from './add-edit-dept-code/add-edit-dept-code.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dept-code',
  templateUrl: './dept-code.component.html',
})
export class DeptCodeComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'code',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  deptCodes: DeptCodeModel [];
  dataSource: MatTableDataSource<DeptCodeModel>;
  data: any [] = [];
  filterTotal: number;
  constructor(
    public dialog: MatDialog,
    private DeptCodeSrv: DeptCodeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.deptCodes = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
    (data: DeptCodeModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllDeptCodes();
  }

  getAllDeptCodes() {
    this.DeptCodeSrv.getAllDeptCodes().subscribe((codes: DeptCodeModel []) => {
      this.deptCodes = codes;
      this.dataSource = new MatTableDataSource(this.deptCodes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
      (data: DeptCodeModel, filtersJson: string) => {
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

  addDeptCode() {
    const dialogRef = this.dialog.open(AddEditDeptCodeComponent, {
      width: '1024px',
      data: new DeptCodeModel ()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeptCodeSrv.postDeptCode(result).subscribe((depCode: DeptCodeModel) => {
          this.deptCodeUpdatedSuccessToastr(depCode.code);
          this.getAllDeptCodes();
        });
      }
    });
  }

  editDeptCode(depCode: DeptCodeModel): void {
    const dialogRef = this.dialog.open(AddEditDeptCodeComponent, {
      width: '1024px',
      data: depCode
    });

    dialogRef.afterClosed().subscribe((result: DeptCodeModel) => {
      if (result) {
        this.DeptCodeSrv.putDeptCode(result).subscribe(res => {
          if (res.status === 204) {
            this.deptCodeUpdatedSuccessToastr(result.code);
            this.getAllDeptCodes();
          }
        });
      } else {
        this.getAllDeptCodes();
      }
    });
  }

  deleteDeptCode(depCode: DeptCodeModel) {
    this.DeptCodeSrv.deleteDeptCode(depCode).subscribe(res => {
      if (res.status === 204) {
        this.deptCodeDeleteSuccessToastr(depCode.code);
        this.getAllDeptCodes();
      }
    });
  }

  deptCodeUpdatedSuccessToastr(deptCode) {
    this.toastr.success('Department Code: ' + deptCode + ' have been updated Successfully!', 'Updated');
  }

  deptCodeDeleteSuccessToastr(deptCode) {
    this.toastr.warning('Department Code: ' + deptCode + ' have been deleted Successfully!', 'Deleted');
  }

  applyFilterDeptCode(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'code',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.code), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

}
