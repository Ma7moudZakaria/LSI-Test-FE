import { IAttachment } from "../../attachments-interfaces/iattachment";

export interface IProgramDayTaskVideo {
    videoName?:string;
    videoAttatchments?:IAttachment[];
    videoLink?:string;
}
