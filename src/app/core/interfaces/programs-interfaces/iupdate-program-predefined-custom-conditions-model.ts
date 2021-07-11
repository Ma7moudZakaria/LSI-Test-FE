import { IProgramCustomCondUI } from "./iprogram-custom-cond-ui";

export interface IUpdateProgramPredefinedCustomConditionsModel {
    id?: string;
    title?: string;
    no?: number;
    conditionType?: string;
    isCustom?: boolean;
    conditionJson?: IProgramCustomCondUI;
}
