import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { EmployeeModel } from '@models/employee-model';
import { EmployeeService } from '@services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeDataModel } from '@models/employee-data-model';


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
})
export class EmployeesTableComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'HrCode',
    'department',
    'branch',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  employees: EmployeeDataModel [];
  dataSource: MatTableDataSource<EmployeeDataModel>;
  data: any [] = [] ;
  filterTotal: number;

  constructor(
    public dialog: MatDialog,
    private employeesSrv: EmployeeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.employees = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: EmployeeDataModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeesSrv.getAllEmployeesWithRelatedModels().subscribe((employee: EmployeeDataModel[]) => {
      this.employees = employee;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: EmployeeDataModel, filtersJson: string) => {
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

  addEmployee() {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      width: '1024px',
      data: new EmployeeDataModel ()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesSrv.postEmployee(result).subscribe((employee: EmployeeDataModel) => {
          this.successToast(employee.name);
          this.getAllEmployees();
        });
      } else {
        this.getAllEmployees();
      }
    });
  }

  editEmployee(employee: EmployeeDataModel): void {
    if (confirm('Are you sure you want to edit ' + employee.name + ' ?')) {
      const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
        width: '1024px',
        data: employee
      });

      dialogRef.afterClosed().subscribe((result: EmployeeModel) => {
        console.log(result);
        if (result) {
          this.employeesSrv.putEmployee(result).subscribe(resp => {
            if (resp.status === 204) {
              this.successToast(result.name);
              this.getAllEmployees();
            }
          });
        }
      });
    }
  }

  deleteEmployee(employee: EmployeeModel) {
    this.employeesSrv.deleteEmployee(employee).subscribe(res => {
      if (res.status === 204) {
        this.deleteSuccessToastr(employee.name);
        this.getAllEmployees();
      }
    });
  }

  /**
   * Employee Filter Function
   */
  applyFilterEmployee(filterValue: string) {
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
  deleteSuccessToastr(employee) {
    this.toastr.warning('Rate Plan: ' + employee + ' have been deleted Successfully !!', 'Deleted');
  }

}
