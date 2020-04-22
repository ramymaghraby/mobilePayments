import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VodafoneAccountModel } from '@models/vodafone-account-model';

@Component({
  selector: 'app-add-edit-vodafone-account',
  templateUrl: './add-edit-vodafone-account.component.html',
})
export class AddEditVodafoneAccountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditVodafoneAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VodafoneAccountModel
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
