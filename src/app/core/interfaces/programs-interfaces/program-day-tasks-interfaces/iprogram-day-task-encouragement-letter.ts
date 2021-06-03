import { ProgramDayTaskEncouragementLetterType } from "src/app/core/enums/program-day-task-encouragement-letter-type.enum";

export interface IProgramDayTaskEncouragementLetter {
 letterType? :ProgramDayTaskEncouragementLetterType ;
text?:string;
voiceUrl?:string;

}
