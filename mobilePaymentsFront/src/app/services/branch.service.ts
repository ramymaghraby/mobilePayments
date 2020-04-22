import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BranchModel } from '@models/branch-model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBranches() {
    return this.http.get(environment.api + 'branches');
  }

  getBranchById(id: number) {
    return this.http.get(environment.api + 'branches/' + id);
  }

  postBranch(branch: BranchModel) {
    return this.http.post(environment.api + 'branches', branch);
  }

  putBranch(branch: BranchModel) {
    return this.http.put(environment.api + 'branches/' + branch.id, branch, {observe: 'response'});
  }

  deleteBranch(branch: BranchModel) {
    return this.http.delete(environment.api + 'branches/' + branch.id, {observe: 'response'});
  }
}
