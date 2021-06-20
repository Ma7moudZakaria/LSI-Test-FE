import { CustomCondTypesEnum } from "../../enums/custom-cond-types-enum.enum";

export interface IprogramPredefinedCustomConditionsModel {
    id?: string;
    title?: string;
    no?: number;
    conditionType?: string;
    conditionTypeAr?: string;
    conditionTypeEn?: string;
    isCustom?: boolean;
    conditionJson?: IProgramCustomCondUI;
}

export interface IProgramCustomCondUI {
    conditionType: CustomCondTypesEnum;
    values: string[];
}
