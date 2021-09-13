export interface IStartStudentBatchRequestModel {
    batId?:string;
    studId?:string;
    progId?:string;
    dys?:IStudentSelectedDutiesDaysRequestModel[];
    noofDutyDays?:number;
}

export interface IStudentSelectedDutiesDaysRequestModel {
    wekDayId?:string;
}
