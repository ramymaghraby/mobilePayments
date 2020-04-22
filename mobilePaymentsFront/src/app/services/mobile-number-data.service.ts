import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MobileNumbersModel } from '@models/mobile-numbers-model';

@Injectable({
  providedIn: 'root'
})
export class MobileNumberDataService {

  constructor(
    private http: HttpClient
    ) { }

  getMobileNumberData(id) {
    return this.http.get(environment.api + 'mobile-numbers/' + id);
  }

  getMobileNumbers() {
    return this.http.get(environment.api + 'mobile-numbers');
  }

  postMobileNumber(mobileNumber) {
    return this.http.post(environment.api + 'mobile-numbers', mobileNumber);
  }
  getAllMobileNumbersWithData() {
    return this.http.get(environment.api + 'mobile-numbers-with-relation');
  }
  putMobileNumber(mobileNumber: MobileNumbersModel) {
    return this.http.put(environment.api + 'mobile-numbers/' + mobileNumber.id, mobileNumber, {observe: 'response'});
  }
  deleteMobileNumber(mobileNumber: MobileNumbersModel) {
    return this.http.delete(environment.api + 'mobile-numbers/' + mobileNumber.id, {observe: 'response'});
  }
}
