import { IAnswer } from "./ianswer";
import {AnswerTypeEnum} from "../../enums/exam-builder-enums/answer-type-enum.enum";
import {QuestionTypeEnum} from "../../enums/exam-builder-enums/question-type-enum.enum";

export interface IQuestion {
questionId?:string;
questionNo?:number;
text?:string;
voiceUrl?:string;
title?:string;
time?:number;
degree?:number;
questionType? :QuestionTypeEnum ;//enum
answerType?:AnswerTypeEnum;//enum
answers :IAnswer [];
correctAnswersByAnswerNumbers?: number [];
correctAnswersByAnswerNumber?: string;

studentAnswersByAnswerNumbers?: number [];
studentAnswersByAnswerNumber?: string;
}


