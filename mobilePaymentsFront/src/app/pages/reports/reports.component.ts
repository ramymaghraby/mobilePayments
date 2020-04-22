import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '@models/route-info-model';


export const reportsROUTES: RouteInfo[] = [
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
];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {

  menuItems: any[];


  constructor() { }

  ngOnInit() {
    this.menuItems = reportsROUTES.filter(menuItem => menuItem);

  }

}
