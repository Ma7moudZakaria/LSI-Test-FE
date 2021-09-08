import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentProgramVacationModel } from '../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import { IRejectStudentProgramVacationModel } from '../../../../../../core/interfaces/student-program-vacation-interfaces/ireject-student-program-vacation-model';
import { BaseConstantModel } from '../../../../../../core/ng-model/base-constant-model';
import { StudentProgramVacationServicesService } from '../../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';
import { AlertifyService } from '../../../../../../core/services/alertify-services/alertify.service';
import { BaseMessageModel } from '../../../../../../core/ng-model/base-message-model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '../../../../../../core/enums/language-enum.enum';
import { ILookupCollection } from '../../../../../../core/interfaces/lookup/ilookup-collection';
import { LookupService } from '../../../../../../core/services/lookup-services/lookup.service';
import { ITeacherProfileAvailabilityLookup } from '../../../../../../core/interfaces/teacher-interfaces/iteacher-availability-lookup';
import { ITeacherAppointmentModel } from '../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-model';
import { TeacherAppointmentService } from 'src/app/core/services/teacher-appointment-services/teacher-appointment.service';
import { IAddChangeTeacherAvailableTimesRequestModel, IAddTeacherAppointmentRequest } from 'src/app/core/interfaces/teacher-appointment-requests-interfaces/iadd-teacher-appointment-request';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';

@Component({
  selector: 'app-add-teacher-appointment-request',
  templateUrl: './add-teacher-appointment-request.component.html',
  styleUrls: ['./add-teacher-appointment-request.component.scss']
})
export class AddTeacherAppointmentRequestComponent implements OnInit {
  @Input() itemStuReq: ITeacherAppointmentModel = {}
  @Output() openAddRequestOverlayRequest = new EventEmitter<ITeacherAppointmentModel>();
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['DAYS'];
  resMessage: BaseMessageModel = {};
  selectedAvailabilityDaysList = Array<ITeacherProfileAvailabilityLookup>();
  availabilityDaysMessage: BaseMessageModel = {};
  availabilityDaysModel: ITeacherProfileAvailabilityLookup = {};
  datepicker1: any;
  currentUser: IUser | undefined;


  constructor(private teacherAppointmentService: TeacherAppointmentService
    , private alertify: AlertifyService
    , public translate: TranslateService,
    private lookupService: LookupService,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getLookupByKey();
  }

  closeRejectRequest() {
    this.openAddRequestOverlayRequest.emit();

  }
  saveRejectRequest() {
    let listOfDays: IAddChangeTeacherAvailableTimesRequestModel[] = [];
    this.selectedAvailabilityDaysList.forEach(x =>
      listOfDays.push(
        {
          timeFrom: x.fromTime,
          timeTo: x.toTime,
          usrId: this.currentUser?.id,
          idAvailableDay: x.id
        }));

    let model: IAddTeacherAppointmentRequest = {
      usrId: this.currentUser?.id,
      listOfDays: listOfDays
    }
    this.teacherAppointmentService.AddChangeTeacherAvailableTimesRequest(model).subscribe(res => {

      if (res.isSuccess) {
        this.closeRejectRequest();
        this.alertify.success(res.message || '');

      } else {
        this.alertify.error(res.message || '');
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })


  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
      if (res.isSuccess) {
        // this.getTeacherProfile(this.currentUser?.id)
      }
      else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }

  addAvailabilityDays() {
    this.availabilityDaysMessage = {
      message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_TEACHER_AVAILABILITY'),
      type: BaseConstantModel.DANGER_TYPE
    }

    this.availabilityDaysMessage = {};
    this.availabilityDaysModel.nameAr = this.collectionOfLookup.DAYS?.find(a => a.id == this.availabilityDaysModel.id)?.nameAr;
    this.availabilityDaysModel.nameEn = this.collectionOfLookup.DAYS?.find(a => a.id == this.availabilityDaysModel.id)?.nameEn

    this.selectedAvailabilityDaysList.push(this.availabilityDaysModel);
    this.availabilityDaysModel = {};
  }


  removeItemFromSelectedAvailabilityDays(item: any) {
    let index = this.selectedAvailabilityDaysList.indexOf(item);
    this.selectedAvailabilityDaysList.splice(index, 1);
  }
}
