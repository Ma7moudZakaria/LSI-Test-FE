import { RoleEnum } from "../../enums/role-enum.enum";

export interface IFeelingOrderModel {
    usrTp?:RoleEnum;
    orderList?:number[];
}
