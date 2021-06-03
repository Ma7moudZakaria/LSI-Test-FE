import { IAttachment } from "../../attachments-interfaces/iattachment";
export interface IProgramDayTaskReadExplanation {
    isMndatory?:boolean;
    bookAttatchments?:IAttachment[];
    frmoPage?:string;
    toPage?:string;
    degree?:number;
}

