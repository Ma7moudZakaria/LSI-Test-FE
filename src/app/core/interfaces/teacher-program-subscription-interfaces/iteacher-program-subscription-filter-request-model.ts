export interface ITeacherProgramSubscriptionFilterRequestModel {
    usrName?:string;
    progName?:string;
    numberRequest?:number;
    fromDate?:Date;
    toDate?:Date;
    skip?:number;
    take?:number;
    sortField?:string;
    sortOrder?:number;
    statusNum?:number;
}
