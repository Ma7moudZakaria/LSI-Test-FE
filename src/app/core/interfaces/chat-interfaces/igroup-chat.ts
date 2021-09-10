import { IMessageChat } from "./imessage-chat";
import { IParticipantChat } from "./iparticipant-chat";

export interface IGroupChat {
    key?:string;
    group_name?:string;
    last_date?:string;
    last_message?:string;
    messages?:{ [Id: string]: IMessageChat; } ;
    // messages:IMessageChat[];
    // participants:IParticipantChat[];
    participants?:{ [Id: string]: IParticipantChat; } ;
    allowed?:boolean;
}