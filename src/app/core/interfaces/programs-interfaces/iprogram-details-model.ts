export interface IProgramDetailsModel {
    id?:string;
    programDays?:IProgramDutyDaysModel[];
}

export interface IProgramDutyDaysModel {
    id?:string;
    programId?:string;
    dayOrder?:Number;
}