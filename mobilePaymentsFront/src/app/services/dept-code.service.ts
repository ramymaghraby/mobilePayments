import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeptCodeModel } from '@models/dept-code-model';

@Injectable({
  providedIn: 'root'
})
export class DeptCodeService {

  constructor(
    private http: HttpClient
    ) { }

    getAllDeptCodes() {
      return this.http.get(environment.api + 'dept-codes');
    }

    getDeptCode(id: number) {
      return this.http.get(environment.api + 'dept-codes/' + id);
    }

    postDeptCode(deptCode: DeptCodeModel) {
      return this.http.post(environment.api + 'dept-codes', deptCode);
    }

    putDeptCode(deptCode: DeptCodeModel) {
      return this.http.put(environment.api + 'dept-codes/' + deptCode.id, deptCode, {observe: 'response'});
    }

    deleteDeptCode(deptCode: DeptCodeModel) {
      return this.http.delete(environment.api + 'dept-codes/' + deptCode.id, {observe: 'response'});
    }
}
