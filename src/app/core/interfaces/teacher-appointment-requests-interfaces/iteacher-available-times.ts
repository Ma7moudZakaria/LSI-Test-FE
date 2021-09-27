export interface ITeacherAvailableTimes {
  isView? : boolean;
  teacherAvailableTimes?: ITeacherAvailableTimesResponseModel[];

}

export interface ITeacherAvailableTimesResponseModel {
  idAvailableDay?: string;
  id?: string;
  timeFrom?: string;
  timeTo?: string;
  dayAr?: string;
  dayEn?: string;

}
export interface ITeacherAppointmentRequestsAppointmentsDetails {
  appointmentRequestDetailsList?: ITeacherAppointmentRequestDetails [];
  reqId?: string;
}

export interface ITeacherAppointmentRequestDetails {
  id?: string;
  no?: string;
  from?: string;
  to?: string;
  dayAr?: string;
  dayEn?: string;
}
