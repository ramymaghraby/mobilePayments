import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '@models/route-info-model';


export const MasterROUTES: RouteInfo[] = [
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
  },
  {
    path: '/master-data/service-providers',
    title: 'Service Providers',
    rtlTitle: 'Service Providers',
    icon: 'icon-puzzle-10',
    class: ''
  }
];

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html'
})
export class MasterDataComponent implements OnInit {
  menuItems: any[];

  constructor(
  ) {}

  ngOnInit() {
    this.menuItems = MasterROUTES.filter(menuItem => menuItem);
  }
}
