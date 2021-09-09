export interface IStartStudentBatchRequestModel {
    batId?:string;
    studId?:string;
    progId?:string;
    dys?:IStudentSelectedDutiesDaysRequestModel[]
}

export interface IStudentSelectedDutiesDaysRequestModel {
    wekDayId?:string;
}
