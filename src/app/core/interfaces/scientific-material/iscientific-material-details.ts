import { IAttachment } from "../attachments-interfaces/iattachment";

export interface IScientificMaterialDetails {

    id:string;
    huffazId:number;
    matrialTitleAr:string;
    matrialTitleEn:string;
    matrialCategory:string;
    fileLink:string;
    active:boolean;
    availableForAllUsers:boolean;
    matrialAttachments:IAttachment[];
    matrialPrograms?:any;

}