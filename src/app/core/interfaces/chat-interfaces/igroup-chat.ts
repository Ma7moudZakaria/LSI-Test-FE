import { IMessageChat } from "./imessage-chat";
import { IParticipantChat } from "./iparticipant-chat";

export interface IGroupChat {
    key?:string;
    group_name?:string;
    last_date?:any;
    last_message?:string;
    messages?:IMessageChat[];    
    participants?:IParticipantChat[] ;
    allowed?:boolean;
}
// messages:IMessageChat[];
// participants:IParticipantChat[];
//  participants?:{ [Id: string]: IParticipantChat; } ;
// messages?:{ [Id: string]: IMessageChat; } ;