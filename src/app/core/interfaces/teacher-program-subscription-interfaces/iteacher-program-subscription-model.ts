export interface ITeacherProgramSubscriptionModel {
    id?: string;
    usrId?: string;
    requestDate?: Date;
    usrNameAr?: string;
    usrNameEn?: string;
    progName?: string;
    checked?: boolean;
    programStaNum?: number;
    timeDegree?: number;
    avatarLink?: string;
    totalRows: number;
    rejReas?: string;
    arBatName?: string;
    enBatName?: string;
    arProgBatName?: string;
    enProgBatName?: string;
    interviewTime?: Date;
    no?: string;
    arStatName?: string;
    statusNum?: number;
    enStatName?: string;
}
