import { BaseLookupModel } from "../../ng-model/base-lookup-model";

export interface IProgramNotificationDetails {
    id?: string;
    progId?: string;
    noDuties?: number;
    no?: number
    notifyName?: string;
    notifyType?: string;
    msgAr?: string;
    msgEn?: string;
    notifyTypeLookup?:BaseLookupModel;


}
