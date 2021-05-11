export interface IScientificMaterialFilter{
    scientificMatrialId?:string;
    titleAr?:string;
    titleEn?:string;
    categoryIds?:string;
    isActive?:boolean;
    isAvailableForAll?:boolean;
    programs?:string;
    programNameAr?:string;
    programNameEn?:string;
    skip?:number;
    take?:number;
    sortField?:string;
    sortOrder?:number;  
    text?:string;  
}