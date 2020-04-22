import { Component, OnInit, Input, HostListener } from '@angular/core';
import { RouteInfo } from '@models/route-info-model';
import { FormGroup } from '@angular/forms';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: '/dashboard',
  //   title: 'Dashboard',
  //   rtlTitle: 'لوحة القيادة',
  //   icon: 'icon-chart-pie-36',
  //   class: ''
  // },
  {
    path: '/import',
    title: 'import',
    rtlTitle: 'Import',
    icon: 'icon-attach-87',
    class: ''
  },
  {
    path: '/view-bills',
    title: 'View Bills',
    rtlTitle: 'View Bills',
    icon: 'icon-paper',
    class: ''
  },
  {
    path: '/master-data',
    title: 'Master Tables',
    rtlTitle: 'Master Tables',
    icon: 'icon-app',
    class: '',
    submenu: [
      {
        path: '/master-data/mobile-numbers',
        title: 'Mobile Numbers',
        rtlTitle: 'Mobile Numbers',
        icon: 'icon-mobile',
        class: ''
      },
      {
        path: '/master-data/department',
        title: 'Department',
        rtlTitle: 'Department',
        icon: 'icon-badge',
        class: ''
      },
      {
        path: '/master-data/branch',
        title: 'Branch',
        rtlTitle: 'Branch',
        icon: 'icon-app',
        class: ''
      },
      {
        path: '/master-data/employees-table',
        title: 'Employees Table',
        rtlTitle: 'Employees Table',
        icon: 'icon-single-02',
        class: ''
      },
      {
        path: '/master-data/vodafone-accounts',
        title: 'Vodafone Accounts',
        rtlTitle: 'Vodafone Accounts',
        icon: 'icon-notes',
        class: ''
      },
      {
        path: '/master-data/rate-plans',
        title: 'Rate Plans',
        rtlTitle: 'Rate Plans',
        icon: 'icon-book-bookmark',
        class: ''
      },
      {
        path: '/master-data/dept-codes',
        title: 'Department Codes',
        rtlTitle: 'Department Codes',
        icon: 'icon-puzzle-10',
        class: ''
      }
    ]
  },
  {
    path: '/reports',
    title: 'Reports',
    rtlTitle: 'Reports',
    icon: 'icon-single-copy-04',
    class: '',
    submenu: [
      {
        path: '/reports/hr-report',
        title: 'HR Reports',
        rtlTitle: 'HR Reports',
        icon: 'icon-mobile',
        class: ''
      },
      {
        path: '/reports/accounts-report',
        title: 'Accounts Report',
        rtlTitle: 'Accounts Report',
        icon: 'icon-badge',
        class: ''
      }
    ]
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: RouteInfo[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
