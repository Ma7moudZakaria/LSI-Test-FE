export interface IProgCondPredefinedMultiList {
    title?:string;
    condId?:string;
    condNo?:number;
    condSelcted?:string;
    value?:IProgramPredefinedvalue[];
}
export interface IProgramPredefinedvalue {
    id?:string;
    nameAr?:string;
    nameEn?:string;
}