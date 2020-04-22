import { Component, OnInit, Inject } from '@angular/core';
import { DepartmentModel } from '@models/department-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
})
export class AddEditDepartmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepartmentModel

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
