export interface IPredefinedCondtionSubscriptionModel {
    usrId: string;
    progId?: string;
    batId?: string;
    // verifyCondtions?: verifyPredefinedCondtions[]

}

export interface IStudentSubscriptionPredefinedConditionResponse {
    requestId?: string;
    verifyPredefinedCondtions?: verifyPredefinedCondtions[];
}

export interface verifyPredefinedCondtions {
    programPredefinedCondtionsName?: string;
    programPredefinedCondtion?: string;

}