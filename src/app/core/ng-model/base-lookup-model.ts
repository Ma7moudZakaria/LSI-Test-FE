import { TranslateService } from "@ngx-translate/core";
import { LanguageEnum } from "../enums/language-enum.enum";

export class BaseLookupModel {
    id?: string;
    huffazId?: Number;
    nameAr?:string;
    nameEn?: string;

    constructor(private translate: TranslateService){ }

    getNameLocalized(){
        return this.translate.currentLang == LanguageEnum.ar ? this.nameAr : this.nameEn;
    }
}
