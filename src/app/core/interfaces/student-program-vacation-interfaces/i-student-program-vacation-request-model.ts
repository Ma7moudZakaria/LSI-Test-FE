export interface IStudentProgramVacationRequestModel {
  usrName?: string;
  progId?: string;
  numberRequest?: number;
  fromDate?: Date;
  toDate?: Date;
  skip: number;
  take: number;
  sortField?: string;
  sortOrder?: number;
  statusNum?: number;
  page: number;
  stdId?:string;
}
