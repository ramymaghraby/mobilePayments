import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

import {
  MatDialogModule,
  MatSortModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
 } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { ImportComponent } from '@pages/import/import.component';
import { ViewBillsComponent } from '@pages/view-bills/view-bills.component';
import { EditBillComponent } from '@pages/import/edit-bill/edit-bill.component';
import { MasterDataComponent } from '@masterData/master-data.component';
import { EmployeesTableComponent } from '@masterData/employees-table/employees-table.component';
import { VodafoneAccountsComponent } from '@masterData/vodafone-accounts/vodafone-accounts.component';
import { RatePlansComponent } from '@masterData/rate-plans/rate-plans.component';
import { MobileNumbersComponent } from '@masterData/mobile-numbers/mobile-numbers.component';
import { DepartmentComponent } from '@masterData/department/department.component';
import { BranchComponent } from '@masterData/branch/branch.component';
// tslint:disable-next-line: max-line-length
import { AddEditVodafoneAccountComponent } from '@masterData/vodafone-accounts/add-edit-vodafone-account/add-edit-vodafone-account.component';
import { AddEditRatePlanComponent } from '@masterData/rate-plans/add-edit-rate-plan/add-edit-rate-plan.component';
import { AddEditMobileNumberComponent } from '@masterData/mobile-numbers/add-edit-mobile-number/add-edit-mobile-number.component';
import { DeptCodeComponent } from '@masterData/dept-code/dept-code.component';
import { AddEditDeptCodeComponent } from '@masterData/dept-code/add-edit-dept-code/add-edit-dept-code.component';
import { AddEditBranchComponent } from '@masterData/branch/add-edit-branch/add-edit-branch.component';
import { AddEditDepartmentComponent } from '@masterData/department/add-edit-department/add-edit-department.component';
import { AddEditEmployeeComponent } from '@masterData/employees-table/add-edit-employee/add-edit-employee.component';
import { ReportsComponent } from '@pages/reports/reports.component';
import { HrReportComponent } from '@pages/reports/hr-report/hr-report.component';
import { AccountsReportComponent } from '@pages/reports/accounts-report/accounts-report.component';
import { ServiceProvidersComponent } from '@masterData/service-providers/service-providers.component';
// tslint:disable-next-line: max-line-length
import { AddEditServiceProviderComponent } from '@masterData/service-providers/add-edit-service-provider/add-edit-service-provider.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTableModule,
    MatPaginatorModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    ImportComponent,
    ViewBillsComponent,
    EditBillComponent,
    MasterDataComponent,
    EmployeesTableComponent,
    VodafoneAccountsComponent,
    RatePlansComponent,
    MobileNumbersComponent,
    DepartmentComponent,
    BranchComponent,
    AddEditVodafoneAccountComponent,
    AddEditRatePlanComponent,
    AddEditDepartmentComponent,
    AddEditEmployeeComponent,
    AddEditMobileNumberComponent,
    AddEditServiceProviderComponent,
    DeptCodeComponent,
    AddEditDeptCodeComponent,
    AddEditBranchComponent,
    ReportsComponent,
    HrReportComponent,
    AccountsReportComponent,
    ServiceProvidersComponent
    ],
    entryComponents: [
    EditBillComponent,
    AddEditVodafoneAccountComponent,
    AddEditRatePlanComponent,
    AddEditDepartmentComponent,
    AddEditEmployeeComponent,
    AddEditMobileNumberComponent,
    AddEditDeptCodeComponent,
    AddEditBranchComponent,
    AddEditServiceProviderComponent
  ]
})
export class AdminLayoutModule {}
