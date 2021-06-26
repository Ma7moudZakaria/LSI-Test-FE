import { BaseLookupModel } from "../../ng-model/base-lookup-model";

export interface ILookupCollection {
    GENDER?: BaseLookupModel[];
    CONTENT_MANAG_TYPE?: BaseLookupModel[];
    EDU_LEVEL?: BaseLookupModel[];
    MEDIA_TYPES?: BaseLookupModel[];
    SOC_MED_TYPES?: BaseLookupModel[];
    MATERIAL_CATEG?: BaseLookupModel[];
    NATIONALITY?: BaseLookupModel[];
    COUNTRY?: BaseLookupModel[];
    SCIENTIFIC_ARCHIVES?: BaseLookupModel[];
    TRAINING_COURSES?: BaseLookupModel[];
    SYSTEM_SHEIKHS?: BaseLookupModel[];
    WALKTHROUGHPAGES?: BaseLookupModel[];
    CITY?: BaseLookupModel[];
    DEGREE?: BaseLookupModel[];
    EDU_DATE?: BaseLookupModel[];
    DAYS?: BaseLookupModel[];
    LANG?: BaseLookupModel[];
    QUALIFI?: BaseLookupModel[];
    SPECIAL?: BaseLookupModel[];
    REWAYAT?: BaseLookupModel[];
    AGENCY?: BaseLookupModel[];
    WORKING_PLATFORM?: BaseLookupModel[];//جهه العمل
    PROG_COND_TYPES?: BaseLookupModel[];
    PROG_NOTIF_TYPES?: BaseLookupModel[];
    TASKS?: BaseLookupModel[];
    SARD_TYPES?: BaseLookupModel[];
    SHARED_TYPES?: BaseLookupModel[];
    DUTY_TYPES?: BaseLookupModel[];
    PROGRAM_CONDTION?: BaseLookupModel[];
    PROG_TYPES?: BaseLookupModel[];
    Tasks?: BaseLookupModel[];
    RATING?:BaseLookupModel[];
}