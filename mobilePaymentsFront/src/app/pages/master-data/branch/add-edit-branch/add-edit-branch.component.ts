import { Component, OnInit, Inject } from '@angular/core';
import { BranchModel } from '@models/branch-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-edit-branch',
  templateUrl: './add-edit-branch.component.html',
})
export class AddEditBranchComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BranchModel

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
