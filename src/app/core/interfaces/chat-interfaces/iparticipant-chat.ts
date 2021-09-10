import { IGroupChat } from "./igroup-chat";

export interface IParticipantChat {
    key:string;
    id:string;
    gender:string;
    hoffazId:string;
    role:number;
    groups:string[];
}
