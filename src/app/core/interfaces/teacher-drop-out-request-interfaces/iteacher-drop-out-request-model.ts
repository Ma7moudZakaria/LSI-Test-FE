
export interface ITeacherDropOutRequestModel {
    id?:string;
    no?:number;
    teacherNameAr?:number;
    teacherNameEn?:number;
    batchAr?:string;
    batchEn?:string;
    progName?:string;
    arProgBatName?:string;
    enProgBatName?:string;
    interviewiHijri?:string;
    interviewGregorian?:string;
    avatarLink?:string;
    checked?:boolean;
    reasonReject?:string;
    totalRows?: number;
    requestDate?:string;   
    arTechStatusName?:string;  
    enTechStatusName?:string;  
    drpStat?: number;
    canCancel?:boolean;
}
