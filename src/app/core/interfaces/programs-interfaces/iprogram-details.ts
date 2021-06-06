export interface IProgramDetails {
    id?:string;
    progBaseInfo?:IProgramBasicInfoDetails
    progCond?:IProgramConditionsDetails[];
    progJoiExa?:IProgramExamFormsDetails[];
    progNotif?:IProgramNotificationsDetails[];
    progDays?:IProgramDutyDays[];
}

export interface IProgramBasicInfoDetails{
    id?:string;
    huffno?:number;
    prgName?:string;
    prgAllowDutyDays?:number;
    prgAdvan?:string;
    prgAvailaDutyTime?:string;
    prgDura?:number;
    prgGoal?:string;
    prgIda?:string;
    prgIsConExa?:boolean;
    prgIsPassExaRequ?:boolean;
    prgIsPubli?:boolean;
    prgIsRecitRequ?:boolean;
    prgIsRecitTimeMand?:boolean;
    prgIsSard?:boolean;
    prgMeth?:string;
    prgNoDutyDays?:number;
    prgPasuDate?:string;
    prgPledgTxt?:string;
    prgPubliDate?:string;
    prgVisi?:string;
    prgSharType?:string;
    prgArSharTypeName?:string;
    prgEnSharTypeName?:string;
    prgDutiDayType?:string;
    prgArDutiDayTypeName?:string;
    prgEnDutiDayTypeName?:string;
    prgRecitType?:string;
    prgArRecitTypeName?:string;
    prgEnRecitTypeName?:string;
    prgRats?:IProgramRatingTypesDetails[];
    prgWeekDutiDas?:IProgramStudentWeeklyDutiesDaysDetails[];
    prgRecitTms?:IProgramRecitationTimesDetails[];
    prgTps?:IProgramRatingTypesDetails[];

}

export interface IProgramRatingTypesDetails{
    id?:string;
    huffno?:number;
    arRatTypeName?:string;
    enRatTypeName?:string;
    checked?:true;
}

export interface IProgramStudentWeeklyDutiesDaysDetails{
    id?:string;
    huffno?:number;
    arDaName?:string;
    enDaName?:string;
}

export interface IProgramRecitationTimesDetails{
    id?:string;
    huffno?:number;
    arRecitName?:string;
    enRecitName?:string;
    recitFrom?:string;
    recitTo?:string;
}

export interface IProgramTypesDetails{
    id?:string;
    huffno?:number;
    arPrgTpeName?:string;
    enPrgTpeName?:string;
}

export interface IProgramConditionsDetails{
    id?:string;
    prgCondMeasJsVal?:string;
    prgIsCondRequ?:string;
    condId?:string;
    condNo?:number;
    condTitl?:string;
    condUIJs?:string;
    condIsCust?:string;
}

export interface IProgramExamFormsDetails{
    id?:string;
    huffno?:number;
    arExaName?:string;
    enExaName?:string;
    exaTemp?:string;
}

export interface IProgramDutyDays {
    id?:string;
    dayOrder?:Number;
}

export interface IProgramNotificationsDetails{
    id?:string;
    huffno?:number;
    noDuties?:number;
    msgAr?:string;
    msgEn?:string;
    notifyName?:string;
    notifyType?:string;
    arNotifName?:string;
    enNotifName?:string;
}