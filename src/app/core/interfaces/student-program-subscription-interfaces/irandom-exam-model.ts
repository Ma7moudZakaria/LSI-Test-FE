import { IQuestion } from "../exam-builder-interfaces/iquestion";

export interface IRandomExamModel {
    exId?:string;
    templateExam?:string;
    exaNameAr?:string;
    exaNameEn?:string; 
    questions?: IQuestion[];
    scorePass?:number;
    scoreTotal?:number;



}
