export interface ITeacherDropOutRequestAdvFilterTeacherViewRequestModel {
    name?:string;
    teacherId?:string;
    progId?:string;
    requestNum?:number;
    statusNum?:number;
    requestDate?:string;
    skip:number;
    take:number;
    from?:number;
    to?:number;
    sortField?:string;
    sortOrder?:number;
    page:number;
}