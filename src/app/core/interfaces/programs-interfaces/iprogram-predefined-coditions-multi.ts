import { IProgramPredefinedCoditionsBase } from "./iprogram-predefined-coditions-base";

export interface IProgramPredefinedCoditionsMulti extends IProgramPredefinedCoditionsBase{
    condSelcted?:string;
    value?:IProgramPredefinedvalue[];
}
export interface IProgramPredefinedvalue {
    id?:string;
    nameAr?:string;
    nameEn?:string;
}
