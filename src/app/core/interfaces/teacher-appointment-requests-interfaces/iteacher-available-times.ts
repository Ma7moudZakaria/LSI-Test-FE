export interface ITeacherAvailableTimes {
  isView? : boolean;
  teacherAvailableTimes?: ITeacherAvailableTimesResponseModel[];

}

export interface ITeacherAvailableTimesResponseModel {
  id?: string;
  timeFrom?: string;
  timeTo?: string;
  dayAr?: string;
  dayEn?: string;

}
export interface ITeacherAppointmentRequestsAppointmentsDetails {
  id?: string;
  no?: string;
  from?: string;
  to?: string;
  dayAr?: string;
  dayEn?: string;
  reqId?: string;
}
