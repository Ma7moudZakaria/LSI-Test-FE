export interface ITeacherSystemSubscriptionFilterRequest {
    name?:string;   
    programTypesFilter?:string;    
    duration?:number;     
    isPeriodicExam?:boolean;   
    isAdmissionTest?:boolean;   
    skip?:number;   
    take?:number;   
    teachersCount?:number;   
    studentsCount?:number;   
}