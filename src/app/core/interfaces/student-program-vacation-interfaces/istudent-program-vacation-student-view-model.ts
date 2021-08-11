export interface IStudentProgramVacationStudentViewModel {
  id?: string;
  requestDate?: Date;
  progName?: string;
  totalRows?: number;
  vacStartDate?: string;
  vacEndDate?: string;
  statusReq?:string;
  statusEnum?:number;
  IsCancel?:boolean;
  IsTerminate?:boolean;
  rejReason?: string;
  arNameBatch?: string;
  enNameBatch?: string;
  arProgBatchName?:string;
  enProgBatchName?:string;
}
