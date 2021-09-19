import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentTabsDetailsComponent } from './admin-student-tabs-details/admin-student-tabs-details.component';
import { LanguageService } from 'src/app/core/services/language-services/language.service';


@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent implements OnInit {
  @ViewChild(AdminStudentTabsDetailsComponent) adminStuTabDetailsChild: AdminStudentTabsDetailsComponent | undefined;
  studentIdOutput: ITeacherStudentViewModel | undefined;
  constructor(public translate: TranslateService,
    private languageService: LanguageService) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }
  getUserId($event: ITeacherStudentViewModel) {
    this.studentIdOutput = $event;
    console.log("studentIdOutput", this.studentIdOutput.usrId)
    if (this.adminStuTabDetailsChild) {
      // set id in click 
      this.adminStuTabDetailsChild.studentIdOutput = this.studentIdOutput
      this.adminStuTabDetailsChild.viewSwitching();
    }

  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.STUDENT'));
  }
}
