export interface IProgramBasicInfoModel {
    progName?: string;
    progIdea?: string;
    progGoal?: string;
    progMthd?:string;
    progAdva?: string;
    progPldgtxt?: string;
    progVision?: string;
    progSharedWith?: string;
    progTypes?:IProgramType[];
    progDura?:number;
    progAvableDtyTime?:string;
    progAllowedDtyDay?: number;
    progDtyDaytyp?: string;
    progCountDtyDay?: number;
    progDtyDays?:ProgWeeklyDutyDays[];
    progIsPasJinExm?:boolean;
    proRatTyps?:ProgRatings[];
    progIsRecTimeMand?:boolean;
    progIsRecitationEna?:boolean;
    progRecType?: string;
    progRecitTimes?: RecitationTimes[];
}

export interface IProgramType{
    progTypeId?:String;
}

export interface ProgWeeklyDutyDays{
    progWeeklyDay?:string;
}

export interface ProgRatings{
    progRatId?:string;
}

export interface RecitationTimes{
    progRecFrom?:string;
    progRecTo?:string;
}