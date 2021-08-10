export interface IStudentMyProgramsRequestModel {
  take?: number;
  skip?: number;
  name?: string;
  usrId?:string;
  sortField?:string;
  sortOrder?:number;
}
