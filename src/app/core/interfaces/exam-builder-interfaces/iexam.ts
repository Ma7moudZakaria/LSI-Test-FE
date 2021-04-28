import { IQuestion } from "./iquestion";

export interface IExam {
id?:string; 
no?:number;
 arabExamFormNam?:string;
 engExamFormNam?:string;
 examTemplate?: string;
 // examname?:string;
questions: IQuestion[];
}
