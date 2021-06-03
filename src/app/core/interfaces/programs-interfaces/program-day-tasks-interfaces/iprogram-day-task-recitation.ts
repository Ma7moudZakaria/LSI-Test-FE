import { Time } from "@angular/common";
import { ProgramDayTaskRecitationType } from "src/app/core/enums/program-day-task-recitation-type.enum";

export interface IProgramDayTaskRecitation {
    periodType? :ProgramDayTaskRecitationType ;
    period:period[];
}
export interface period {
    fromTime?:Time;
    toTime?:Time;
}
