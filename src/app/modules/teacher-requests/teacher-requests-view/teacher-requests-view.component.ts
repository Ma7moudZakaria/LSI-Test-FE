import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';
import { LanguageService } from 'src/app/core/services/language-services/language.service';





@Component({
  selector: 'app-teacher-requests-view',
  templateUrl: './teacher-requests-view.component.html',
  styleUrls: ['./teacher-requests-view.component.scss']
})
export class TeacherRequestsViewComponent implements OnInit {

  selectedTeatcherRequest:TeacherRequestEnum=TeacherRequestEnum.JoinRequest;

  constructor(public translate: TranslateService,
    private languageService: LanguageService) { }

  ngOnInit(): void {
    this.setCurrentLang();
    

  }

  sendTeatcherRequest(teatcherRequestItem:TeacherRequestEnum){
   this.selectedTeatcherRequest=teatcherRequestItem;
  }
  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.REQUEST'));
  }

}
