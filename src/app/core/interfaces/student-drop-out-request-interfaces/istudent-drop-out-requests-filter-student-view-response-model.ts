export interface IStudentDropOutRequestsFilterStudentViewResponseModel {
    id?:string;
    requestDate?:string;
    usrNameAr?:string;
    usrNameEn?:string;
    progName?:string;
    batNameAr?:string;
    batNameEn?:string;
    arProgBatchName?:string;
    enProgBatchName?:string;
    totalRows?:number;
    checked?:boolean;
    reasonReject?:string;
    arStudentStatusName?:string;  
    enStudentStatusName?:string;  
    drpStat?: number;
    no?:number;
}
