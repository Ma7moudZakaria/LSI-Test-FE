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



export interface Base{
    title?:string;
    condId?:string;
    condNo?:number;
}
export interface multi extends Base{
    condSelcted?:string;
    value?:IProgramPredefinedvalue[];
}

export interface single extends Base{
    value?:number;
}

