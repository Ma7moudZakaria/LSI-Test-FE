import { IProgramCustomCondUI } from "./iprogram-custom-cond-ui";

export interface IUpdateProgramPredefinedCustomConditionsModel {
    // id?:string;
    // title?:string;
    // conditionType?:string;
    // isCustom?:boolean;
    // conditionJson?:string;


    id?: string;
    title?: string;
    no?: number;
    conditionType?: string;
    // conditionTypeAr?: string;
    // conditionTypeEn?: string;
    isCustom?: boolean;
    conditionJson?: IProgramCustomCondUI;
}
