export interface ITeacherSystemSubscriptionFilterRequest {
    name?:string;   
    requestNum?:string;    
    skip:number;   
    take:number;   
    from?:number;   
    to?:number;   
    sortField?:string;
    sortOrder?:number;
    statusNum?:number;
    page:number;
}