import { IStudentsModel } from './istudents-model';
export interface IAddGroupExplanationModel {
    techId?: string;
    groupNameAr?: string;
    groupNameEn?: string;
    groupMembers?: IStudentsModel[]
}
