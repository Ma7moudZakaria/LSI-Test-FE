export interface ITeacherProgramSubscriptionModel {
    id?:string;
    requestDate?:Date;
    usrNameAr?:string;
    usrNameEn?:string;
    progName?:string;
    checked?:boolean;
    programStaNum?: number;
    timeDegree?: number;
    avatarLink?: string;
    totalRows: number;
    reasonReject?:string;
}
