import { IQuestion } from "./iquestion";

export interface IExam {
 examid?:string; 
examname?:string;
questions: IQuestion[];
}
