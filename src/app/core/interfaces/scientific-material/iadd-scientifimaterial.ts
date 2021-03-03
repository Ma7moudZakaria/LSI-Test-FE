import { IProgramScientificMaterial } from "./iprogram-scientific-material";

export interface IAddScientificMaterial {
    matrialTitleAr?:string;
    matrialTitleEn?:string;
    matrialCategory?:string;
    attachmentIds?:string[];
    fileLink?:string;
    active?:boolean;
    availableForAllUsers?:boolean;
   programMatrial?:IProgramScientificMaterial[];

}
