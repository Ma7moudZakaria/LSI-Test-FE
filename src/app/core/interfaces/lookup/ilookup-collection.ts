import { BaseLookupModel } from "../../ng-model/base-lookup-model";

export interface ILookupCollection{
    GENDER?:BaseLookupModel[];
    CONTENT_MANAG_TYPE?:BaseLookupModel[];
    EDU_LEVEL?:BaseLookupModel[];
    MEDIA_TYPES?:BaseLookupModel[];
    SOC_MED_TYPES?:BaseLookupModel[];
    MATERIAL_CATEG?:BaseLookupModel[];
    NATIONALITY?:BaseLookupModel[];
    COUNTRY?:BaseLookupModel[];
}