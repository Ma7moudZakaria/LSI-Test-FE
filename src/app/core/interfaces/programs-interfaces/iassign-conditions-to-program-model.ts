export interface IassignConditionsToProgramModel {
    progId?:string;
    conditions?:ConditionsForm[]
}
export interface ConditionsForm {
    condId?:string;
    condValue?:string;
    required?:boolean;
}