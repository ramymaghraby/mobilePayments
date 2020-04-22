import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { RatePlansModel } from '@models/rate-plans-model';
import { AddEditRatePlanComponent } from './add-edit-rate-plan/add-edit-rate-plan.component';
import { RatePlansService } from '@services/rate-plans.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rate-plans',
  templateUrl: './rate-plans.component.html',
})
export class RatePlansComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ratePlans: RatePlansModel [];
  dataSource: MatTableDataSource<RatePlansModel>;
  data: any [] = [] ;
  filterTotal: number;

  constructor(
    public dialog: MatDialog,
    private ratePlanSrv: RatePlansService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.ratePlans = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: RatePlansModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllRatePlans();
  }

  getAllRatePlans() {
    this.ratePlanSrv.getRatePlans().subscribe((ratePlan: RatePlansModel[]) => {
      this.ratePlans = ratePlan;
      this.dataSource = new MatTableDataSource(this.ratePlans);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: RatePlansModel, filtersJson: string) => {
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

  addRatePlan() {
    const dialogRef = this.dialog.open(AddEditRatePlanComponent, {
      width: '512px',
      data: new RatePlansModel ()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ratePlanSrv.postRatePlan(result).subscribe((ratePlan: RatePlansModel) => {
        this.successToast(ratePlan.name);
        this.getAllRatePlans();
      });
    });
  }

  editRatePlan(ratePlan: RatePlansModel): void {
    if (confirm('Are you sure you want to edit ' + ratePlan.name + ' ?')) {
      const dialogRef = this.dialog.open(AddEditRatePlanComponent, {
        width: '512px',
        data: ratePlan
      });

      dialogRef.afterClosed().subscribe((result: RatePlansModel) => {
        if (result) {
          this.ratePlanSrv.putRatePlan(result).subscribe(resp => {
            if (resp.status === 204) {
              this.successToast(result.name);
              this.getAllRatePlans();
            }
          });
        }
      });
    }
  }

  deleteRatePlan(ratePlan: RatePlansModel) {
    this.ratePlanSrv.deleteRatePlan(ratePlan).subscribe(res => {
      if (res.status === 204) {
        this.ratePlanDeleteSuccessToastr(ratePlan.name);
        this.getAllRatePlans();
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
  ratePlanDeleteSuccessToastr(ratePlan) {
    this.toastr.warning('Rate Plan: ' + ratePlan + ' have been deleted Successfully !!', 'Deleted');
  }

}
