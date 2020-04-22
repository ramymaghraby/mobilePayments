import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VodafoneAccountModel } from '@models/vodafone-account-model';


@Injectable({
  providedIn: 'root'
})
export class VodafoneAccountsService {

  constructor(
    private http: HttpClient
  ) { }

  getVodafoneAccounts() {
    return this.http.get(environment.api + 'vodafone-accounts');
  }
  getVodafoneAccountByID(VfId) {
    return this.http.get(environment.api + 'vodafone-accounts/' + VfId);
  }
  postVodafoneAccount(vodafoneAccount: VodafoneAccountModel) {
    return this.http.post(environment.api + 'vodafone-accounts', vodafoneAccount);
  }
  deleteVodafoneAccount(vodafoneAccount: VodafoneAccountModel) {
    return this.http.delete(environment.api + 'vodafone-accounts/' + vodafoneAccount.id, {observe: 'response'});
  }
  putVodafoneAccount(vodafoneAccount: VodafoneAccountModel) {
    return this.http.put(environment.api + 'vodafone-accounts/' + vodafoneAccount.id, vodafoneAccount, {observe: 'response'});
  }
}
