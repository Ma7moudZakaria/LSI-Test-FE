import { IAttachment } from "../attachments-interfaces/iattachment";

export interface IUserProfile {    
    fnameAr?:string;
    mnameAr?:string;
    fanameAr?:string;
    fnameEn?:string;
    mnameEn?:string;
    faNameEn?:string;
    birthdate?:string;
    gender?:string;
    arbGenderName?:string;
    engGenderName?:string;
    mobile?:string;
    countryCode?:string;
    arbCountryName?:string;
    engCountryName?:string;
    nationality?:string;
    arbNatName?:string;
    engNatName?:string;
    eduLevel?:string;
    arbEduLevelName?:string;
    engEduLevelName?:String;
    occupation?:string;
    ejazaIds?:string;
    address?:string;
    usrEmail?:string;
    proPic?:string;
    quraanMemorizeAmount?:number;
    ejazaAttachments:IAttachment[];

    usrScientificArchives?:[];
    usrSheikhs?:[];
    usrCourses?:[];
}