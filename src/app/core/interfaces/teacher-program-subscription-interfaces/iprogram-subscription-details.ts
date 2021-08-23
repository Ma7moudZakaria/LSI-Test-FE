export interface IProgramSubscriptionDetails {
    id: string;
    prgName?: string;
    batId: string;
    arBatName?: string;
    enBatName?: string;
    arProgBatName?: string;
    enProgBatName?: string;

    prgDura?: number;
    parts?: number;

    prgGoal?: string;
    prgIda?: string;
    prgMeth?: string;
    prgAdvan?: string;
    prgPledgTxt?: string;
    prgVisi?: string;
    prgAllowDutyDays?: number;
    prgNoDutyDays?: number;

    customCondsCount?: number;
    isContainCustomCondition?: boolean;
    isContainExam?: boolean
}
