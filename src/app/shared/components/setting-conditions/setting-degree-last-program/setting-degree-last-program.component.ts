import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgCondPredefinedMultiList, IProgramPredefinedvalue } from 'src/app/core/interfaces/programs-interfaces/iprog-cond-predefined-multi-list';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-setting-degree-last-program',
  templateUrl: './setting-degree-last-program.component.html',
  styleUrls: ['./setting-degree-last-program.component.scss']
})
export class SettingDegreeLastProgramComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {};
  @Input()  degreeLastProgramModel: IProgCondPredefinedMultiList = {};
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['DEGREE'];
  //selectedDegreeLastPrograms:string[]=[];
  selectedDegreeLastPrograms = Array<IProgramPredefinedvalue>();
  constructor(
    private lookupService: LookupService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.selectedDegreeLastPrograms=this.degreeLastProgramModel.value||[];
  }
  ngOnChanges(changes: any) {
    this.selectedDegreeLastPrograms=this.degreeLastProgramModel.value||[];
  }
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
     
    });
  }
  addDegreeItem(){
    this.degreeLastProgramModel.value=[];
    const exist = this.degreeLastProgramModel.value.some(el => el.id === this.degreeLastProgramModel.condSelcted)
    if (!exist) {
      if (this.collectionOfLookup.DEGREE) {
        this.selectedDegreeLastPrograms.push(
          this.collectionOfLookup.DEGREE.filter(el => el.id == this.degreeLastProgramModel.condSelcted)[0]);
          
      }
      this.selectedDegreeLastPrograms=this.selectedDegreeLastPrograms;
    }
  }
}
