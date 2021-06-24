import { IConditionModel } from "../setting/icondition-model";
import { IProgramCustomCondUI } from "./iprogram-custom-cond-ui";

export interface IDetailsProgramPredefinedCustomConditionsModel {


    id?: string;
    title?: string;
    // no?: number;
    // conditionType?: string;
    // conditionTypeAr?: string;
    // conditionTypeEn?: string;
    isCustom?: boolean;
    conditionJson?: string;
    conditinoModel?:IProgramCustomCondUI;
}
