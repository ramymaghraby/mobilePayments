import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountPaymentTypeModel } from '@models/account-payment-type-model';

@Injectable({
  providedIn: 'root'
})
export class AccountPaymentTypeService {

  constructor(
    private http: HttpClient,
  ) { }
  getAllTypes() {
    return this.http.get(environment.api + 'account-payment-types');
  }
  postType(accountPaymentType: AccountPaymentTypeModel) {
    return this.http.post(environment.api + 'account-payment-types', accountPaymentType);
  }
  deleteType(accountPaymentType: AccountPaymentTypeModel) {
    return this.http.delete(environment.api + 'account-payment-types/' + accountPaymentType.id, {observe: 'response'});
  }
  putType(accountPaymentType: AccountPaymentTypeModel) {
    return this.http.put(environment.api + 'account-payment-types/' + accountPaymentType.id, accountPaymentType, {observe: 'response'});
  }
}
