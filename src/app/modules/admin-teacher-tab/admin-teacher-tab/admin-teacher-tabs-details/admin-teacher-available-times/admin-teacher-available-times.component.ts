import {Component, Input, OnInit} from '@angular/core';
import {ITeacherStudentViewModel} from '../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import {TranslateService} from '@ngx-translate/core';
import {TeacherAppointmentService} from '../../../../../core/services/teacher-appointment-services/teacher-appointment.service';
import {LanguageService} from '../../../../../core/services/language-services/language.service';
import {ITeacherAvailableTimes} from '../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-available-times';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {LanguageEnum} from '../../../../../core/enums/language-enum.enum';

@Component({
  selector: 'app-admin-teacher-available-times',
  templateUrl: './admin-teacher-available-times.component.html',
  styleUrls: ['./admin-teacher-available-times.component.scss']
})
export class AdminTeacherAvailableTimesComponent implements OnInit {
  @Input()  teacherIdOutput:ITeacherStudentViewModel | undefined;
  resMessage: BaseMessageModel = {};
  teacherAvailableTimes: ITeacherAvailableTimes | undefined;
  lang = LanguageEnum;

  constructor( public translate: TranslateService ,
               private teacherAppointmentService: TeacherAppointmentService,
               public languageService: LanguageService) { }

  ngOnInit(): void {
    this.getTeacherAvailableTimesTeacherView();
  }

  getTeacherAvailableTimesTeacherView() {
    this.teacherAppointmentService.getTeacherAvailableTimesTeacherView(this.teacherIdOutput?.usrId).subscribe(res => {
      if (res.isSuccess) {
        this.teacherAvailableTimes = res.data as ITeacherAvailableTimes;
      }

    });
  }

}
