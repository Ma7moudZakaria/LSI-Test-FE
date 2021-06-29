import { CustomCondTypesEnum } from "../../enums/custom-cond-types-enum.enum";

export interface IProgramCustomCondUI {

    conditionType: CustomCondTypesEnum;
    values: string[];
}
