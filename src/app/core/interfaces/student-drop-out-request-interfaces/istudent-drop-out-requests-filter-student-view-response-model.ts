export interface IStudentDropOutRequestsFilterStudentViewResponseModel {
    id?:string;
    requestDate?:string;
    usrNameAr?:string;
    usrNameEn?:string;
    progName?:string;
    batNameAr?:string;
    batNameEn?:string;
    arProgBatName?:string;
    enProgBatName?:string;
    totalRows?:number;
    checked?:boolean;
    reasonReject?:string;
    arStudentStatusName?:string;  
    enStudentStatusName?:string;  
    drpStat?: number;
    no?:number;
}
