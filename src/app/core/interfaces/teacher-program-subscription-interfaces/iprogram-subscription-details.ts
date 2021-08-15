export interface IProgramSubscriptionDetails {
    id: string;
    batId: string;
    prgName?: string;
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
