export interface ITeacherMyProgramsList {
    id?:string;
    batId?:string;
    progName?:string;
    arBatName?:string;
    enBatName?:string;
    arProgBatchName?:string;
    enProgBatchName?:string;
}

export interface ITeacherMyProgramsRequest {
    teacherId?:string;
    sortField:string;
    sortOrder:number;
    skip:number;
    take:number;
}
