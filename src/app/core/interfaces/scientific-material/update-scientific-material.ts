export interface UpdateScientificMaterial{
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
    programScientificMatrial:any;
}