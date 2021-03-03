export interface ScientificMaterialFilter{
    scientificMatrialId:string;
    titleAr:string;
    titleEn:string;
    categoryId:string;
    isActive:boolean;
    isAvailableForAll :boolean;
    programs?:string;
    programNameAr:string;
    programNameEn:string;
    skip:number;
    take:number;
    sortField:string;
    sortOrder:number;    
}