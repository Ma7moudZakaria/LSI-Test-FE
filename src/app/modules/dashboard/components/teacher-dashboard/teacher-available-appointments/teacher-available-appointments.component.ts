import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../../../../../core/enums/language-enum.enum';
import {ITeacherProfile} from '../../../../../core/interfaces/teacher-interfaces/iteacher-profile';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {TeacherProfileService} from '../../../../../core/services/teacher-profile/teacher-profile.service';
import {IUser} from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {Router} from '@angular/router';
import {LanguageService} from '../../../../../core/services/language-services/language.service';
import {TeacherAppointmentService} from '../../../../../core/services/teacher-appointment-services/teacher-appointment.service';
import {ITeacherAvailableTimes} from '../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-available-times';
import {IStudentProgramVacationModel} from '../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import {IAddTeacherAppointmentRequest} from '../../../../../core/interfaces/teacher-appointment-requests-interfaces/iadd-teacher-appointment-request';
import {ITeacherAppointmentModel} from '../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';

@Component({
  selector: 'app-teacher-available-appointments',
  templateUrl: './teacher-available-appointments.component.html',
  styleUrls: ['./teacher-available-appointments.component.scss']
})
export class TeacherAvailableAppointmentsComponent implements OnInit {
  lang = LanguageEnum;
  RouteParams = {} as string;
  teacherAvailableTimes = {} as ITeacherAvailableTimes;
  currentUser: IUser | undefined;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  birthdate: string | undefined;
  @Output() itemStuReq = new EventEmitter<ITeacherAppointmentModel>();
  @Output() AddTeacherRequest = new EventEmitter<ITeacherAppointmentModel>();
  @Output() requestDetails = new EventEmitter<ITeacherAppointmentModel>();
  openAddRequestOverlay: boolean = false;
  openTeacherRequestDetailsOverlay: boolean = false;
  @Input() studentSubscripModel: ITeacherAppointmentModel = { totalRows: 0 }
  itemStuReq1: ITeacherAppointmentModel = {};

  constructor(   private router: Router,
                 public translate: TranslateService ,
                 private teacherProfileService: TeacherAppointmentService,
                 public languageService: LanguageService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.RouteParams = this.router.url;
    this.setCurrentLang();
    this.getTeacherAvailableTimesTeacherView();
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
  getTeacherAvailableTimesTeacherView() {
    this.teacherProfileService.getTeacherAvailableTimesTeacherView(this.currentUser?.id).subscribe(res => {
      if (res.isSuccess) {
        this.teacherAvailableTimes = res.data as ITeacherAvailableTimes;
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

  AddTeacherAppointmentRequest() {
    this.openAddRequestOverlay = !this.openAddRequestOverlay;

  }
  appointmentRequestDetails() {
    this.openTeacherRequestDetailsOverlay = !this.openTeacherRequestDetailsOverlay;

  }
  closeAddRequestOverlayRequest() {
    this.openAddRequestOverlay = !this.openAddRequestOverlay;
    this.getTeacherAvailableTimesTeacherView();
  }
  closeRequestDetails() {
    this.openTeacherRequestDetailsOverlay = !this.openTeacherRequestDetailsOverlay;
    this.getTeacherAvailableTimesTeacherView();

  }
}
