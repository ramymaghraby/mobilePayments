import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceProviderModel } from '@models/service-provider-model';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from '@services/service-provider.service';
import { HttpResponseBase } from '@angular/common/http';
import { AddEditServiceProviderComponent } from './add-edit-service-provider/add-edit-service-provider.component';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
})
export class ServiceProvidersComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'Actions'
  ];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  serviceProviders: ServiceProviderModel [];
  dataSource: MatTableDataSource<ServiceProviderModel>;
  data: any [] = [] ;
  filterTotal: number;

  constructor(
    public dialog: MatDialog,
    private serviceProvidersSrv: ServiceProviderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.serviceProviders = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: ServiceProviderModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllServiceProviders();
  }

  getAllServiceProviders() {
    this.serviceProvidersSrv.getServiceProviders().subscribe((serviceProvider: ServiceProviderModel[]) => {
      this.serviceProviders = serviceProvider;
      this.dataSource = new MatTableDataSource(this.serviceProviders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: ServiceProviderModel, filtersJson: string) => {
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

  addServiceProvider() {
    const dialogRef = this.dialog.open(AddEditServiceProviderComponent, {
      width: '512px',
      data: new ServiceProviderModel ()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.serviceProvidersSrv.postServiceProvider(result).subscribe((serviceProvider: ServiceProviderModel) => {
        this.successToast(serviceProvider.name);
        this.getAllServiceProviders();
      });
    });
  }

  editServiceProvider(serviceProvider: ServiceProviderModel): void {
    if (confirm('Are you sure you want to edit ' + serviceProvider.name + ' ?')) {
      const dialogRef = this.dialog.open(AddEditServiceProviderComponent, {
        width: '512px',
        data: serviceProvider
      });

      dialogRef.afterClosed().subscribe((result: ServiceProviderModel) => {
        if (result) {
          this.serviceProvidersSrv.putServiceProvider(result).subscribe((resp: HttpResponseBase) => {
            if (resp.status === 204) {
              this.successToast(result.name);
              this.getAllServiceProviders();
            }
          });
        }
      });
    }
  }

  deleteServiceProvider(serviceProvider: ServiceProviderModel) {
    this.serviceProvidersSrv.deleteServiceProvider(serviceProvider).subscribe(res => {
      if (res.status === 204) {
        this.deleteSuccessToastr(serviceProvider.name);
        this.getAllServiceProviders();
      }
    });
  }

  /**
   * Rate Plans Filter Function
   */
  applyFilterRatePlan(filterValue: string) {
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
  deleteSuccessToastr(serviceProvider) {
    this.toastr.warning('Rate Plan: ' + serviceProvider + ' have been deleted Successfully !!', 'Deleted');
  }

}
