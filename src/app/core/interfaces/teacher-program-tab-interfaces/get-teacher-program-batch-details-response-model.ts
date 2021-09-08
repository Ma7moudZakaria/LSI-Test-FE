export interface IGetTeacherProgramBatchDetailsResponse {
    techId?:string;
    batId?:string;
    nameAr?:string;
    nameEn?:string;
    planHours?:number;
    numHours?:number;
    numApologies?:number;
    numStudents?:number;
    batchStuds?:IBatchStudents[];
}

export interface IBatchStudents {
    usrImg?:string;
    studNameAr?:string;
    studNameEn?:string;
    rte?:number;
    startDate?:string;
}

export interface IGetTeacherProgramBatchDetailsRequest {
    techId?:string;
    batId?:string;
}