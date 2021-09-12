export interface IAddTeacherAppointmentRequest {
  id?: string;
  usrId?: string;
  listOfDays:IAddChangeTeacherAvailableTimesRequestModel[]
}

export interface IAddChangeTeacherAvailableTimesRequestModel
{
  timeFrom?:string,
  timeTo?:string,
  idAvailableDay?:string,
  reqsId?:string,
  usrId?:string

}
