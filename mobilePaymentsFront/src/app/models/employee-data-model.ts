import { DepartmentModel } from './department-model';
import { BranchModel } from './branch-model';

export class EmployeeDataModel {

  constructor() {  }

  id: number;
  name: string;
  HrCode: string;
  deptId: number;
  branchId: number;
  dept: DepartmentModel;
  branch: BranchModel;
}
