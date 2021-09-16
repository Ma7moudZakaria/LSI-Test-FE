import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { ScientificProblemsComponent } from '../../admin-messaging/components/scientific-problems-view/scientific-problems/scientific-problems.component';
import { AdminTeacherTabsDetailsComponent } from './admin-teacher-tabs-details/admin-teacher-tabs-details.component';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-admin-teacher-tab',
  templateUrl: './admin-teacher-tab.component.html',
  styleUrls: ['./admin-teacher-tab.component.scss']
})
export class AdminTeacherTabComponent implements OnInit {

  @ViewChild(AdminTeacherTabsDetailsComponent) adminTechTabDetailsChild: AdminTeacherTabsDetailsComponent | undefined;
  teacherIdOutput: ITeacherStudentViewModel | undefined;

  constructor(public translate: TranslateService,
    private languageService: LanguageService) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }


  getUserId($event: ITeacherStudentViewModel) {
    this.teacherIdOutput = $event;
    if (this.adminTechTabDetailsChild) {
      // set id in click 
      this.adminTechTabDetailsChild.teacherIdOutput = this.teacherIdOutput
      this.adminTechTabDetailsChild.viewSwitching();
    }
  }
  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.TEACHER'));
  }

}
