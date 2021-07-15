export interface ITeacherSystemSubscription {
    id?:string;   
    huffazNumber?:number;    
    teacherNameAr?:string;     
    teacherNameEn?:string;   
    requestDate?:string;   
    interviewiHijri?:string;   
    interviewGregorian?:string;   
    checked?:boolean;
    avatarLink?: string;
    totalRows: number;
}