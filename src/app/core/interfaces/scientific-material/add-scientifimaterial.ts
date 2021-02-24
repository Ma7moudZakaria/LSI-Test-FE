import { ProgramScientificMaterial } from "./program-scientific-material";

export interface AddScientificMaterial {
    matrialTitleAr:string;
    matrialTitleEn:string;
    matrialCategory:string;
    attachmentIds:string[];
    fileLink:string;
    active:boolean;
    availableForAllUsers:boolean;
    programMatrial:ProgramScientificMaterial[];

}
