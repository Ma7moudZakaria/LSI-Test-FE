import { IQuestion } from "../exam-builder-interfaces/iquestion";

export interface ISubmitStudentDutyDayTaskModel {
    progtaskId?:string;
    studId?:string;
    isAnsw?:boolean;
    questionsExam?: IQuestion[];
    examScore?:number;
}
