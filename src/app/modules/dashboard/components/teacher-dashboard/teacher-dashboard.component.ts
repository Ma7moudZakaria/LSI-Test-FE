import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  constructor( private languageService: LanguageService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }
  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.DASHBORD'));
  }
}
