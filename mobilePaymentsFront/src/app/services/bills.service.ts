import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BillModel } from '@models/bill-model';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(
    private http: HttpClient,
    ) { }

  getBills() {
    return this.http.get(environment.api + 'bills');
  }
  postBill(bill: BillModel) {
    return this.http.post(environment.api + 'bills', bill);
  }
  getBillsByDate(date: Date) {
    return this.http.get(environment.api + '/bills-with-mobile-numbers-data?filter[where][month]=' + date);
  }
  getBillsforHRByDate(date: Date){
    return this.http.get(environment.api + 'bills?filter[where][and][0][month]='+date+'&filter[where][and][1][content]=Hello')
  }
}
