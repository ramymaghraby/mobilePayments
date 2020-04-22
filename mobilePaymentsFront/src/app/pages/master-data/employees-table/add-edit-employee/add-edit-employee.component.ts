import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeDataModel } from '@models/employee-data-model';
import { BranchService } from '@services/branch.service';
import { DepartmentService } from '@services/department.service';
import { DepartmentModel } from '@models/department-model';
import { BranchModel } from '@models/branch-model';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
})
export class AddEditEmployeeComponent implements OnInit {

  departments: DepartmentModel [];
  branches: BranchModel [];

  constructor(
    public dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDataModel,
    private branchSrv: BranchService,
    private deptSrv: DepartmentService

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getBranches();
    this.getDepartments();
  }

  getBranches() {
    this.branchSrv.getAllBranches().subscribe((Branches: BranchModel []) => {
      this.branches = Branches;
    });
  }

  getDepartments() {
    this.deptSrv.getAllDepartments().subscribe((Departments: DepartmentModel[]) => {
      this.departments = Departments;
    });
  }

}
