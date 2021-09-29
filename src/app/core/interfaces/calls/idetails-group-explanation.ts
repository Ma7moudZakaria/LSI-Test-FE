import { IGroupExplanationsJoinResponse } from "./igroup-explanations-join-response";
import { IGroupMembers } from "./igroup-members";

export interface IDetailsGroupExplanation {
    batId?: string;
    groupId?: string;
    groupNameAr?: string;
    groupNameEn?: string;
    groupMembers?: IGroupMembers[];
    groupRequests?: IGroupExplanationsJoinResponse[]

}
