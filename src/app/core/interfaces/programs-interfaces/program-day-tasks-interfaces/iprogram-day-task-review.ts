import { IAttachment } from "../../attachments-interfaces/iattachment";
export interface IProgramDayTaskReview {
    bookAttatchments?:IAttachment[];
    frmoPage?:string;
    toPage?:string;
    degree?:number;
}

