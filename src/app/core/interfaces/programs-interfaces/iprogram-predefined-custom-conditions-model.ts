import { StringMappingType } from "typescript";
import { CustomCondTypesEnum } from "../../enums/custom-cond-types-enum.enum";
import { IConditionModel } from "../setting/icondition-model";
import { IProgramCustomCondUI } from "./iprogram-custom-cond-ui";

export interface IprogramPredefinedCustomConditionsModel {
    id?: string;
    title?: string;
    no?: number;
    conditionType?: string;
    conditionTypeAr?: string;
    conditionTypeEn?: string;
    isCustom?: boolean;
    conditionJson?: string;
    conditionModel?: IConditionModel;
}



