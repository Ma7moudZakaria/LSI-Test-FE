import { TranslateService } from "@ngx-translate/core";
import { LanguageEnum } from "../enums/language-enum.enum";

export class BaseLookupModel {
    id?: string;
    huffazId?: Number;
    nameAr?:string;
    nameEn?: string;
    localNam?:string;

    constructor(private translate: TranslateService){ 
        // this.id = this.getNameLocalized();
    }

    public getNameLocalized(){
        return this.translate.currentLang == LanguageEnum.ar ? this.nameAr : this.nameEn;
    }
}