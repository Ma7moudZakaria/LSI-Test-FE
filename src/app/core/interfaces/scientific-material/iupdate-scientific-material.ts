import { IProgramScientificMaterial } from "./iprogram-scientific-material";

export interface IUpdateScientificMaterial{
    id:string;
    huffazId:number;
    matrialTitleAr:string;
    matrialTitleEn:string;
    matrialCategory:string;
    fileLink:string;
    active:boolean;
    availableForAllUsers:boolean;
    programIds:string[];
    attachmentIds:string[];
    attachmentPath:string;
    programScientificMatrial:IProgramScientificMaterial[];
}