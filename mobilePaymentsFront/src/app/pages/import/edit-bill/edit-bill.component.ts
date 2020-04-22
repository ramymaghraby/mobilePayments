import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImportDataModel } from '@models/import-data-model';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
})
export class EditBillComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EditBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportDataModel
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
