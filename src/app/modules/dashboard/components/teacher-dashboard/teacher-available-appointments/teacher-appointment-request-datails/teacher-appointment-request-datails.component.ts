import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentProgramVacationModel } from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import { LanguageEnum } from '../../../../../../core/enums/language-enum.enum';
import { ITeacherAppointmentRequestsAppointmentsDetails, ITeacherAvailableTimes } from '../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-available-times';
import { IUser } from '../../../../../../core/interfaces/auth-interfaces/iuser-model';
import { BaseMessageModel } from '../../../../../../core/ng-model/base-message-model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TeacherAppointmentService } from '../../../../../../core/services/teacher-appointment-services/teacher-appointment.service';
import { LanguageService } from '../../../../../../core/services/language-services/language.service';
import { BaseConstantModel } from '../../../../../../core/ng-model/base-constant-model';
import { ITeacherAppointmentModel } from '../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';

@Component({
  selector: 'app-teacher-appointment-request-datails',
  templateUrl: './teacher-appointment-request-datails.component.html',
  styleUrls: ['./teacher-appointment-request-datails.component.scss']
})
export class TeacherAppointmentRequestDatailsComponent implements OnInit {
  @Input() itemStuReq: ITeacherAppointmentModel = {}
  @Output() closeDetailsRequest = new EventEmitter<ITeacherAppointmentModel>();
  lang = LanguageEnum;
  RouteParams = {} as string;
  teacherAvailableTimes = [] as ITeacherAppointmentRequestsAppointmentsDetails[];
  currentUser: IUser | undefined;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  birthdate: string | undefined;
  @Output() rejectStudentVacationRequest = new EventEmitter<ITeacherAppointmentModel>();
  @Output() requestDetails = new EventEmitter<ITeacherAppointmentModel>();

  @Input() studentSubscripModel: ITeacherAppointmentModel = { totalRows: 0 }

  constructor(private router: Router,
    public translate: TranslateService,
    private teacherProfileService: TeacherAppointmentService,
    public languageService: LanguageService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.RouteParams = this.router.url;
    this.setCurrentLang();
    this.getTeacherAvailableTimesTeacherView(this.currentUser.id);
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
  }
  getTeacherAvailableTimesTeacherView(id: any) {
    this.teacherProfileService.GetTeacherAppointmentRequestAppointments(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherAvailableTimes = res.data as ITeacherAppointmentRequestsAppointmentsDetails[];

        //
        // if (!this.teacherProfileDetails?.proPic) {
        //   this.teacherProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        // }
      }
      else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  rejectedStudentReq() {
    this.rejectStudentVacationRequest.emit(this.studentSubscripModel);
  }
  appointmentRequestDetails() {
    this.requestDetails.emit(this.studentSubscripModel);
  }
  cancelRequest() {
    this.closeDetailsRequest.emit();
  }
}
