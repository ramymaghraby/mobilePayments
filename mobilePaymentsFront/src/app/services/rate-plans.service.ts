import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RatePlansModel } from '@models/rate-plans-model';



@Injectable({
  providedIn: 'root'
})
export class RatePlansService {

  constructor(private http: HttpClient) { }

  getRatePlans() {
    return this.http.get(environment.api + 'rate-plans');
  }

  postRatePlan(ratePlan: RatePlansModel) {
    return this.http.post(environment.api + 'rate-plans', ratePlan);
  }

  putRatePlan(ratePlan: RatePlansModel) {
    return this.http.put(environment.api + 'rate-plans/' + ratePlan.id, ratePlan, {observe: 'response'});
  }

  deleteRatePlan(ratePlan: RatePlansModel) {
    return this.http.delete(environment.api + 'rate-plans/' + ratePlan.id, {observe: 'response'});
  }
}
