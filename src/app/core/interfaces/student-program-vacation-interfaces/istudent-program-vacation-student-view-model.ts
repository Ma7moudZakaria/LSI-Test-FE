export interface IStudentProgramVacationStudentViewModel {
  id?: string;
  requestDate?: Date;
  progName?: string;
  totalRows?: number;
  vacStartDate?: string;
  vacEndDate?: string;
  statusReq?:string;
  statusEnum?:number;
  isCancel?:boolean;
  isTerminate?:boolean;
  rejReason?: string;
  arNameBatch?: string;
  enNameBatch?: string;
  arProgBatchName?:string;
  enProgBatchName?:string;
  arNameVacationStatus?:string;
  enNameVacationStatus?:string;
}
