export interface ITeacherAppointmentModel {
  avatarLink?: string;
  id?: string;
  usrId?:string;
  requestDate?: Date;
  usrNameAr?: string;
  usrNameEn?: string;
  progName?: string;
  totalRows?: number;
  rejReason?: string;
  arNameBatch?: string;
  enNameBatch?: string;
  checked?:boolean;
  arProgBatchName?:string;
  enProgBatchName?:string;
}
