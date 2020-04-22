import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { DepartmentModel } from '@models/department-model';
import { DepartmentService } from '@services/department.service';
import { ToastrService } from 'ngx-toastr';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  departments: DepartmentModel [];
  dataSource: MatTableDataSource<DepartmentModel>;
  data: any [] = [] ;
  filterTotal: number;

  constructor(
    public dialog: MatDialog,
    private deptSrv: DepartmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.departments = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: DepartmentModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.deptSrv.getAllDepartments().subscribe((departments: DepartmentModel[]) => {
      this.departments = departments;
      this.dataSource = new MatTableDataSource(this.departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: DepartmentModel, filtersJson: string) => {
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

  addDepartment() {
    const dialogRef = this.dialog.open(AddEditDepartmentComponent, {
      width: '512px',
      data: new DepartmentModel ()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deptSrv.postDepartment(result).subscribe((department: DepartmentModel) => {
          this.successToast(department.name);
          this.getAllDepartments();
        });
      }
    });
  }

  editDepartment(department: DepartmentModel): void {
    if (confirm('Are you sure you want to edit ' + department.name + ' ?')) {
      const dialogRef = this.dialog.open(AddEditDepartmentComponent, {
        width: '512px',
        data: department
      });

      dialogRef.afterClosed().subscribe((result: DepartmentModel) => {
        console.log(result);
        if (result) {
          this.deptSrv.putDepartment(result).subscribe(resp => {
            if (resp.status === 204) {
              this.successToast(result.name);
              this.getAllDepartments();
            }
          });
        }
      });
    }
  }

  deleteDepartment(department: DepartmentModel) {
    this.deptSrv.deleteDepartment(department).subscribe(res => {
      if (res.status === 204) {
        this.departmentDeleteSuccessToastr(department.name);
        this.getAllDepartments();
      }
    });
  }

  /**
   * Department Filter Function
   */
  applyFilterDepartment(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'name',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue) {
      this.filterTotal = this.dataSource.filteredData.reduce((total, cur) =>
      total + Number(cur.name), 0 );
    } else {
      this.filterTotal = 0;
    }
  }

  successToast(message) {
    this.toastr.success(message + ' have been updated Successfully', 'Updated');
  }
  departmentDeleteSuccessToastr(branch) {
    this.toastr.warning('Rate Plan: ' + branch + ' have been deleted Successfully !!', 'Deleted');
  }

}

