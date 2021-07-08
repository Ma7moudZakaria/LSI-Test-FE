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
    progDtyDays?:IProgWeeklyDutyDays[];
    progIsPasJinExm?:boolean;
    proRatTyps?:IProgRatings[];
    progIsRecTimeMand?:boolean;
    progIsRecitationEna?:boolean;
    progRecType?: string;
    progRecitTimes?: IRecitationTimes[];
}

export interface IProgramType{
    progTypeId?:string;
}

export interface IProgWeeklyDutyDays{
    progWeeklyDay?:string;
}

export interface IProgRatings{
    progRatId?:string;
}

export interface IRecitationTimes{
    // id?:string;
    progRecFrom?:string;
    progRecTo?:string;
}
