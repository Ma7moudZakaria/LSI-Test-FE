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
