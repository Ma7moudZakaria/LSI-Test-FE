import { ITeacherProgramSubscriptionFilterRequestModel } from "./iteacher-program-subscription-filter-request-model";

export interface ITeacherAdvancedSearchModel {
    isSearch?:boolean;
    teacherFilter ?:ITeacherProgramSubscriptionFilterRequestModel;

}
