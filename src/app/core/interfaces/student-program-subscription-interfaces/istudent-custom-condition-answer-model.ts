import { IConditionModel } from "../setting/icondition-model";

export interface IStudentCustomConditionAnswerModel {
    jsonAnswer?: IConditionModel[];
    ProgramSubscriptionId?: string;

}
interface ICustomConditionJsonAnswerModel {
    title?: string;
    answerType?: string;
    answerList?: ICustomConditionAnsModel[];
    studAnsValues?: ICustomConditionAnsModel[];
    studTxtAns?: string;
    studBoolAns: boolean;
}
interface ICustomConditionAnsModel {
    id?: string;
    text?: string;
}
