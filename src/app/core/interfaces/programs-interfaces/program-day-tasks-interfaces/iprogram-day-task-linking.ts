import { ProgramDayTaskLinkingType } from "src/app/core/enums/program-day-task-linking-type.enum";
import { IAttachment } from "../../attachments-interfaces/iattachment";

export interface IProgramDayTaskLinking {
    isMndatory?:boolean;
    degree?:number;
    questionToStudent?:string;
    bookAttatchments?:IAttachment[];
    linkingType? :ProgramDayTaskLinkingType ;
}
