import { IStudentExamAnswerResponseModel } from "./istudent-exam-answer-response-model";
import { IStudentSubscriptionModel } from "./istudent-subscription-model";

export interface IStuViewExamAnswProgSub {
    stuProgSub?:IStudentSubscriptionModel;
    studentExamAnswer?:IStudentExamAnswerResponseModel;
}


