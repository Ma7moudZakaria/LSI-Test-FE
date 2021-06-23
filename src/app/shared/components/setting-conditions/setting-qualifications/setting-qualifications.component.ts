import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';


@Component({
  selector: 'app-setting-qualifications',
  templateUrl: './setting-qualifications.component.html',
  styleUrls: ['./setting-qualifications.component.scss']
})
export class SettingQualificationsComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {};
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = [ 'QUALIFI'];
  langEnum = LanguageEnum;
  constructor(
    private lookupService: LookupService,
    public translate: TranslateService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.getLookupByKey()
  }
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
    
    });
  }
}
