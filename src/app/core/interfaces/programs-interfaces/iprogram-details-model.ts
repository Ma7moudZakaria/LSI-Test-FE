export interface IProgramDetailsModel {
    id?:string;
    programDutyDays?:IProgramDutyDaysModel[];
}

export interface IProgramDutyDaysModel {
    id?:string;
    programId?:string;
    dayOrder?:Number;
}