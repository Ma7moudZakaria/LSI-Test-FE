import { IAnswer } from "./ianswer";

export interface IQuestion {
questionId?:string;
text?:string;
title?:string;
time?:string;
degree?:string;
type? :string ;//enum
answertype?:string;//enum
answers? :IAnswer [];
}


