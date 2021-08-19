export interface IStudentDropOutRequestsFilterAdminViewRequestModel {
    usrName?:string;
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
    arProgBatName?:string;
    enProgBatName?:string;
}