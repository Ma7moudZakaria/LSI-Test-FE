export interface IStudentDropOutRequestsFilterStudentViewRequestModel {
    progName?:string;
    usrId?:string;
    progId?:string;
    batId?:string;
    numberRequest?:number;
    fromDate?:string;
    toDate?:string;
    skip:number;
    take:number;
    sortField?:string;
    sortOrder?:number;
    statusNum?:number;
    page:number;
}