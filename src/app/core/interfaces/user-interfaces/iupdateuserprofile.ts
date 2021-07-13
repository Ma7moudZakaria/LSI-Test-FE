import { IUserSheikhs } from "./iuser-sheikhs";
import { IUserTrainingCourses } from "./iuser-training-courses";
import { IUserScientificArchives } from "./iuserscientificarchives";

export interface IUpdateUserProfile {
    usrId?: string;
    firstAr?: string;
    firstEn?: string;
    middleAr?: string;
    middleEn?: string;
    familyAr?: string;
    familyEn?: string;
    birthdate?: Date;
    gender?: string;
    mobile?: string;
    countryCode?: string;
    city?:string;
    nationality?: string;
    eduLevel?: string;
    occupation?: string;
    address?: string;
    quraanMemorizeAmount?:number;
    ejazaIds?:string[];
    scientificArchives?:IUserScientificArchives[];
    sheikhs?:IUserSheikhs[];
    courses?:IUserTrainingCourses[];
    birthGregorian?: Date;
    dateEnum?:number;
}




