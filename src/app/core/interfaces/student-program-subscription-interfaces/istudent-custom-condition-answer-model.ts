export interface IStudentCustomConditionAnswerModel {
    jsonAnswer?:ICustomConditionJsonAnswerModel[];
    ProgramSubscriptionId?:string;

}
interface ICustomConditionJsonAnswerModel{
    title?:string;
    answerType?:string;
    answerList?:ICustomConditionAnsModel[];
    studAnsValues?:ICustomConditionAnsModel[];
    studTxtAns?:string;
    studBoolAns:boolean;
}
interface ICustomConditionAnsModel{
    id?:string;
    text?:string;
}
