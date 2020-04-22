import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DepartmentModel } from '@models/department-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  getAllDepartments() {
    return this.http.get(environment.api + 'depts');
  }

  getDepartmentById(id: number) {
    return this.http.get(environment.api + 'depts/' + id);
  }

  postDepartment(department: DepartmentModel) {
    return this.http.post(environment.api + 'depts', department);
  }

  putDepartment(department: DepartmentModel) {
    return this.http.put(environment.api + 'depts/' + department.id, department, {observe: 'response'});
  }

  deleteDepartment(department: DepartmentModel) {
    return this.http.delete(environment.api + 'depts/' + department.id, {observe: 'response'});
  }
}
