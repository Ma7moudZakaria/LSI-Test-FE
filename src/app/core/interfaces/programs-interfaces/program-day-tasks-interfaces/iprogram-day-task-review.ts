import { IAttachment } from "../../attachments-interfaces/iattachment";
export interface IProgramDayTaskReview {
    bookAttatchments?:IAttachment[];
    fromPage?:string;
    toPage?:string;
    degree?:number;
    attachmentIds?:string[];
    questionToStudent?:string;
}

