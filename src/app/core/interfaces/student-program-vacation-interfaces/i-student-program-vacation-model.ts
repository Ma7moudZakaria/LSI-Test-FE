export interface IStudentProgramVacationModel {
  avatarLink?: string;
  id?: string;
  requestDate?: Date;
  usrNameAr?: string;
  usrNameEn?: string;
  progName?: string;
  totalRows?: number;
  vacStartDate?: string;
  vacEndDate?: string;
  vacReason?: string;
  rejReason?: string;
  arNameBatch?: string;
  enNameBatch?: string;
  checked?:boolean;
}
