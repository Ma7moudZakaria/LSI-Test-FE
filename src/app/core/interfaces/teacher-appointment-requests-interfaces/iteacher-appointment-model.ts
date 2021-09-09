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
  newFromTime?:string;
  newToTime?:string;
  oldDayAr?:string;
  oldDayEn?:string;
  newDayAr?:string;
  newDayEn?:string;
  oldFromTime?:string;
  oldToTime?:string;
}

    export interface ITeachersAppointmentRequestsModel
    {
         reqId?:string;
         usrId?:string;
         usrNameAr?:string;
         usrNameEn?:string;
         checked?:boolean;
         reqDate?:string
         rejReason:string
         availableTimeRequests?: IAvailableTimeRequests;
         teacherAvailableTimes?: IAvailableTimeRequests;
    }
    export interface IAvailableTimeRequests
    {
         from?:string;
         to?:string;
         dayNameAr?:string;
         dayNameEn?:string;
    }
