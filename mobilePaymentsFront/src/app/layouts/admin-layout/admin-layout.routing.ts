import { Routes } from '@angular/router';

import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { DeptCodeComponent } from '@masterData/dept-code/dept-code.component';
import { VodafoneAccountsComponent } from '@masterData/vodafone-accounts/vodafone-accounts.component';
import { BranchComponent } from '@masterData/branch/branch.component';
import { EmployeesTableComponent } from '@masterData/employees-table/employees-table.component';
import { MobileNumbersComponent } from '@masterData/mobile-numbers/mobile-numbers.component';
import { DepartmentComponent } from '@masterData/department/department.component';
import { RatePlansComponent } from '@masterData/rate-plans/rate-plans.component';
import { MasterDataComponent } from '@masterData/master-data.component';
import { ViewBillsComponent } from '@pages/view-bills/view-bills.component';
import { ImportComponent } from '@pages/import/import.component';
import { ReportsComponent } from '@pages/reports/reports.component';
import { HrReportComponent } from '@pages/reports/hr-report/hr-report.component';
import { AccountsReportComponent } from '@pages/reports/accounts-report/accounts-report.component';
import { ServiceProvidersComponent } from '@masterData/service-providers/service-providers.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'import', component: ImportComponent },
  { path: 'view-bills', component: ViewBillsComponent },
  { path: 'reports',
  component: ReportsComponent,
  children: [
    {path: '', redirectTo: 'hr-report', pathMatch: 'full'},
    {path: 'hr-report', component: HrReportComponent},
    {path: 'accounts-report', component: AccountsReportComponent},
    { path: '**', redirectTo: 'hr-report', pathMatch: 'full'}

  ] },
  { path: 'master-data',
  component: MasterDataComponent,
  children: [
    { path: '', redirectTo: 'mobile-numbers', pathMatch: 'full'},
    { path: 'mobile-numbers', component: MobileNumbersComponent  },
    { path: 'department', component: DepartmentComponent  },
    { path: 'branch', component: BranchComponent  },
    { path: 'employees-table', component: EmployeesTableComponent  },
    { path: 'vodafone-accounts', component: VodafoneAccountsComponent },
    { path: 'rate-plans', component: RatePlansComponent },
    { path: 'dept-codes', component: DeptCodeComponent },
    { path: 'service-providers', component: ServiceProvidersComponent },
    { path: '**', redirectTo: 'mobile-numbers', pathMatch: 'full'}
  ]
}

];
