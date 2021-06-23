import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-setting-degree-last-program',
  templateUrl: './setting-degree-last-program.component.html',
  styleUrls: ['./setting-degree-last-program.component.scss']
})
export class SettingDegreeLastProgramComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['DEGREE'];
  constructor(
    private lookupService: LookupService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
  }
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
     
    });
  }
}
