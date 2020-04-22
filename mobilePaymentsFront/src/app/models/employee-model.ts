import { BranchModel } from './branch-model';

export class EmployeeModel {

  constructor() {  }

  id?: number;
  name: string;
  HrCode: string;
  deptId: number;
  branchId: number;
  branch?: BranchModel;
}
