import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceProviderModel } from '@models/service-provider-model';

@Component({
  selector: 'app-add-edit-service-provider',
  templateUrl: './add-edit-service-provider.component.html',
})
export class AddEditServiceProviderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditServiceProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceProviderModel

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
