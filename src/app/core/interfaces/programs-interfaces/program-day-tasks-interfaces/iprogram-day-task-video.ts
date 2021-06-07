import { IAttachment } from "../../attachments-interfaces/iattachment";

export interface IProgramDayTaskVideo {
    videoName?:string;
    vidio?:IAttachment;
    attachmentIds?:string[];
    videoLink?:string;
}
