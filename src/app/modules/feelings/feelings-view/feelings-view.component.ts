import { Role } from './../../../core/interfaces/role-management-interfaces/role-management';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-feelings-view',
  templateUrl: './feelings-view.component.html',
  styleUrls: ['./feelings-view.component.scss']
})
export class FeelingsViewComponent implements OnInit {
  showTap: string = 'student';
  roleEnum: RoleEnum = RoleEnum.Student;
  constructor(public languageService: LanguageService,
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
    this.languageService.headerPageNameEvent.emit(this.translate.instant('GENERAL.FEELING'));
  }

  // getTabType() {
  //   return this.showTap === 'student' ? RoleEnum.Student : RoleEnum.Teacher;
  // }

  studentTab() {
    this.showTap = 'student';
    this.roleEnum = RoleEnum.Student;
  }

  teacherTab() {
    this.showTap = 'teacher';
    this.roleEnum = RoleEnum.Teacher;
  }

}
