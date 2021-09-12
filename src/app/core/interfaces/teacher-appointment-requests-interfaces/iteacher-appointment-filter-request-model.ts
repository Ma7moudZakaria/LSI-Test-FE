export interface ITeacherAppointmentFilterRequestModel {
  usrName?: string;
  numberRequest?: number;
  fromDate?: Date;
  toDate?: Date;
  skip: number;
  take: number;
  sortField?: string;
  sortOrder?: number;
  statusNum?: number;
  page: number;
}
