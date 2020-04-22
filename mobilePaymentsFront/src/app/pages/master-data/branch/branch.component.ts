import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { BranchModel } from '@models/branch-model';
import { BranchService } from '@services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { AddEditBranchComponent } from './add-edit-branch/add-edit-branch.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'Actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  branches: BranchModel [];
  dataSource: MatTableDataSource<BranchModel>;
  data: any [] = [] ;
  filterTotal: number;

  constructor(
    public dialog: MatDialog,
    private branchSrv: BranchService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.branches = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
     (data: BranchModel, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.getAllBranches();
  }

  getAllBranches() {
    this.branchSrv.getAllBranches().subscribe((branches: BranchModel[]) => {
      this.branches = branches;
      this.dataSource = new MatTableDataSource(this.branches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
     (data: BranchModel, filtersJson: string) => {
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

  addBranch() {
    const dialogRef = this.dialog.open(AddEditBranchComponent, {
      width: '512px',
      data: new BranchModel ()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.branchSrv.postBranch(result).subscribe((branch: BranchModel) => {
          this.successToast(branch.name);
          this.getAllBranches();
        });
      }
    });
  }

  editBranch(branch: BranchModel): void {
    if (confirm('Are you sure you want to edit ' + branch.name + ' ?')) {
      const dialogRef = this.dialog.open(AddEditBranchComponent, {
        width: '512px',
        data: branch
      });

      dialogRef.afterClosed().subscribe((result: BranchModel) => {
        if (result) {
          this.branchSrv.putBranch(result).subscribe(resp => {
            if (resp.status === 204) {
              this.successToast(result.name);
              this.getAllBranches();
            }
          });
        }
      });
    }
  }

  deleteBranch(branch: BranchModel) {
    this.branchSrv.deleteBranch(branch).subscribe(res => {
      if (res.status === 204) {
        this.branchDeleteSuccessToastr(branch.name);
        this.getAllBranches();
      }
    });
  }

  /**
   * Branch Filter Function
   */
  applyFilterBranch(filterValue: string) {
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
  branchDeleteSuccessToastr(branch) {
    this.toastr.warning('Rate Plan: ' + branch + ' have been deleted Successfully !!', 'Deleted');
  }

}

