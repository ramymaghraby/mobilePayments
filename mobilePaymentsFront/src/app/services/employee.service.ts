import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from '@models/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployee(id) {
    return this.http.get(environment.api + 'employees/' + id );
  }
  getAllEmployees() {
    return this.http.get(environment.api + 'employees');
  }
  postEmployee(employee: EmployeeModel) {
    return this.http.post(environment.api + 'employees', employee);
  }
  putEmployee(employee: EmployeeModel) {
    return this.http.put(environment.api + 'employees/' + employee.id, employee, {observe: 'response'});
  }
  deleteEmployee(employee: EmployeeModel) {
    return this.http.delete(environment.api + 'employees/' + employee.id, {observe: 'response'});
  }
  getAllEmployeesWithRelatedModels() {
    return this.http.get(environment.api + 'employees-with-relation');
  }
}
