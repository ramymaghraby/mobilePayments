import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RatePlansModel } from '@models/rate-plans-model';

@Component({
  selector: 'app-add-edit-rate-plan',
  templateUrl: './add-edit-rate-plan.component.html',
})
export class AddEditRatePlanComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditRatePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RatePlansModel

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
