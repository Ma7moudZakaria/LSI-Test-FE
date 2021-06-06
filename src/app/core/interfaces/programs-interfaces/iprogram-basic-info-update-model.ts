import { IProgRatings, IRecitationTimes } from "./iprogram-basic-info-model";

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
    progIsRecTimeMand?:boolean;
    progRecType?: string;
    progRecitTimes?: IRecitationTimes[];
}
