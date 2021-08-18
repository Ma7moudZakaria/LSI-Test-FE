export interface IBatchModel {
    teacherBatchs?:ITeacherBatchModel[];
    studentBatchs?:IStudentBatchModel[];
}
 
export interface ITeacherBatchModel {
    id?:string;
    number?:number;
    usrId?:string;
    teacherNameAr?:string;
    teacherNameEn?:string;
}
 
export interface IStudentBatchModel {
    id?:string;
    number?:number;
    usrId?:string;
    studentNameAr?:string;
    studentNameEn?:string;
}