import { IAttachment } from "../../attachments-interfaces/iattachment";

export interface IProgramDayTaskTasmea {
    isMndatory?:boolean;
    degree?:number;
    questionToStudent?:string;
    bookAttatchments?:IAttachment[];
    progId?:string;
    progDayOrder?:Number;
}
