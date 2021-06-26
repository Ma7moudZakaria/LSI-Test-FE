import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramsListComponent } from './programs-list/programs-list.component';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {
  
  @ViewChild(ProgramsListComponent) progListChild:ProgramsListComponent | undefined;
  showTap: string = 'USERS';

  programModel : IprogramsModel | undefined;

  constructor(
    public languageService: LanguageService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('GENERAL.MY_PROGRAM'));
  }

  selectedProgramCallBack(event:IprogramsModel){
    this.programModel = event;
    console.log("programModel ===========>", this.programModel);
  }

  refreshProgList(){
    this.progListChild?.loadProgramsbyAdvancedFilter();
  }
}
