import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { IAttachment } from "../attachments-interfaces/iattachment";
import { ILookupCollection } from "../lookup/ilookup-collection";

export interface IviewTeacherProfile {

    firstAr?: string;
    firstEn?: string;
    middleAr?: string;
    middleEn?: string;
    familyAr?: string;
    familyEn?: string;
    birthdate?: string;
    gender?: string;
    mobile?: string;
    nationality?: string;
    countryCode?: string;
    countryid?: string;
    city?: string;
    day?: string;
    time?: string;
    academicEducation?: string;
    qualification?: string;
    specialization?: string;
    agencyName?: string;
    eduYears?: string;
    entity?: string;
    isHasQuranExperience?: boolean;
    isHasTeachSunnaExperience?: boolean;
    isHasInternetTeachExperience?: boolean;
    isHasTeachForeignerExperience?: boolean;
    isHasEjazaHafz?: boolean;
    isHasEjazaTelawa?: boolean;
    anyLanguageReading?: string;
    languageId?: string;
    workingPlatForm?: string;
    bankName?: string;
    bankNumber?: string;
    dayAndTime?: string;
    from?: string;
    to?: string;
    ejazaIds?: IAttachment[];
    programIds?: BaseLookupModel[];
    degreeIds?: BaseLookupModel[];
    eduLevels?: IAttachment[];


}
