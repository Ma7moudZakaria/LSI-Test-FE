import { RoleEnum } from "../../enums/role-enum.enum";

export interface IFeelingsFilter {
    usrRe?:RoleEnum;
    skip?:number;
    take?:number;
}
