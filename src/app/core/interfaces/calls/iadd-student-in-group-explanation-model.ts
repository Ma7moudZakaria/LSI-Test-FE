import { IStudentsModel } from "./istudents-model";

export interface IAddStudentInGroupExplanationModel {
    batId?: string;
    groupExplanationId?: string;
    groupMembers?: IStudentsModel[];

    // groupMembers?: IStudentsModel[]


}


