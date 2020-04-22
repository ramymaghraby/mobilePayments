import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeptCodeModel } from '@models/dept-code-model';

@Component({
  selector: 'app-add-edit-dept-code',
  templateUrl: './add-edit-dept-code.component.html',
})
export class AddEditDeptCodeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditDeptCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeptCodeModel

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
