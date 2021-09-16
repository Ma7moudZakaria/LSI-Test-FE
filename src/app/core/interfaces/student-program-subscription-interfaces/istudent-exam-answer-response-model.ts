import { IQuestion } from "../exam-builder-interfaces/iquestion";

export interface IStudentExamAnswerResponseModel {
    examId?:string;
    stuProgSubId?:string;
    answ?:string;
    answList?:IQuestion[];
}
