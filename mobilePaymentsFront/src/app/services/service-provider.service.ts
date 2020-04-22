import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServiceProviderModel } from '@models/service-provider-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor(
    private http: HttpClient
  ) {  }

  getServiceProviders() {
    return this.http.get(environment.api + 'providers');
  }

  postServiceProvider(serviceProvider: ServiceProviderModel) {
    return this.http.post(environment.api + 'providers', serviceProvider);
  }

  putServiceProvider(serviceProvider: ServiceProviderModel) {
    return this.http.put(environment.api + 'providers', serviceProvider);
  }

  deleteServiceProvider(serviceProvider: ServiceProviderModel) {
    return this.http.delete(environment.api + 'providers/' + serviceProvider.id, {observe: 'response'});
  }
}
