import { IAttachment } from "../../attachments-interfaces/iattachment";
import { IRecitationTimes } from "../iprogram-basic-info-model";

export interface IProgramDayTaskTasmea {
    isMndatory?:boolean;
    degree?:number;
    questionToStudent?:string;
    bookAttatchments?:IAttachment[];
    progId?:string;
    progDayOrder?:Number;
    prgRecitType?:string;
    progRecitationTimes?: IRecitationTimes[];
    dutyDay?:string;
}
