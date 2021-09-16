import {IProgCategory, IProgRatings, IProgWeeklyDutyDays, IRecitationTimes} from './iprogram-basic-info-model';

export interface IProgramBasicInfoUpdateModel {
    progId?:string;
    progIdea?: string;
    progGoal?: string;
    progMthd?:string;
    progAdva?: string;
    progPldgtxt?: string;
    progVision?: string;
    progSharedWith?: string;
    progAvableDtyTime?:string;
    progAllowedDtyDay?: number;
    progIsPasJinExm?:boolean;
    proRatTyps?:IProgRatings[];
    progCats?:IProgCategory[];
    progIsRecTimeMand?:boolean;
    progRecType?: string;
    progRecitTimes?: IRecitationTimes[];
    prgDura?:number;
    progDtyDays?:IProgWeeklyDutyDays[];
}
