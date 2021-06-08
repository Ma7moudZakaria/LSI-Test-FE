import { IAttachment } from "../../attachments-interfaces/iattachment";

export interface IProgramDayTaskHearing {
    isMndatory?:boolean;
    degree?:number;
    hearingAttachments?:IAttachment[];
    questionToStudent?:string;
    attachmentIds?:string[];
}
