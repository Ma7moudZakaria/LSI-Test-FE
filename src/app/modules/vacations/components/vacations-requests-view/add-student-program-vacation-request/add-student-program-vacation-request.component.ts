import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {BaseSelectedDateModel} from '../../../../../core/ng-model/base-selected-date-model';
import {StudentProgramSubscriptionServicesService} from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {TranslateService} from '@ngx-translate/core';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {StudentProgramVacationServicesService} from '../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';
import {IAddNewStudentVacationRequest} from '../../../../../core/interfaces/student-program-vacation-interfaces/iadd-new-student-vacation-request';
import {AlertifyService} from '../../../../../core/services/alertify-services/alertify.service';
import {IUser} from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import {IStudentMyProgramsRequestModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import {BaseResponseModel} from '../../../../../core/ng-model/base-response-model';
import {IStudentPrograms} from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {IStudentSubscriptionFilterRequestModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-student-program-vacation-request',
  templateUrl: './add-student-program-vacation-request.component.html',
  styleUrls: ['./add-student-program-vacation-request.component.scss']
})
export class AddStudentProgramVacationRequestComponent implements OnInit {
  resultMessage: BaseMessageModel = {};
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  typeDateBinding: any
  datafromBinding: any
  dataToBinding: any
  hijri: boolean = false;
  milady: boolean = false;
  addStudentVacationRequestModel: IAddNewStudentVacationRequest ={};
  selectedIndex=-1;
  currentUser: IUser | undefined;
  programFilter: IStudentMyProgramsRequestModel = { take :2147483647 };
  programs: IStudentPrograms[] | undefined;
  @Output() closeAddVacationRequest = new EventEmitter<IAddNewStudentVacationRequest>();
  maxGregDate: NgbDateStruct | undefined;

  langEnum=LanguageEnum
  isSubmit = false;
  currentForm: FormGroup = new FormGroup({});
  disableSaveButtons = false;


  constructor(
              private dateFormatterService: DateFormatterService,
              public translate: TranslateService,
               public studentProgramVacationService: StudentProgramVacationServicesService,
              private alertfyService: AlertifyService,
              private studentProgramSubscriptionService: StudentProgramSubscriptionServicesService,private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.addStudentVacationRequestModel.userId = this.currentUser.id;
    this.programFilter.usrId = this.currentUser.id;
    this.maxGregDate = this.dateFormatterService.GetTodayGregorian()
    this.getAllProgram()
    this.currentForm.reset();
    this.buildForm();
    this.disableSaveButtons = false;
    this.resultMessage = {
      message: '',
      type: ''
    }

  }



  SendDatafrom(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.datafromBinding = data.selectedDateValue
    this.addStudentVacationRequestModel.vacationStartDate = this.datafromBinding
    this.selectedDateType = data.selectedDateType;
  }

  SendDataTo(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.dataToBinding = data.selectedDateValue
    this.addStudentVacationRequestModel.vacationEndDate = this.dataToBinding
    this.selectedDateType = data.selectedDateType;
  }


  closeAddStudentVacation() {
    this.addStudentVacationRequestModel.vacationStartDate = ' ';
    this.addStudentVacationRequestModel.vacationEndDate = '';
    this.addStudentVacationRequestModel.vacationReason = '';
    this.addStudentVacationRequestModel.batchId = '';
    this.addStudentVacationRequestModel.userId = '';
    this.closeAddVacationRequest.emit(this.addStudentVacationRequestModel)
  }

  Submit() {
    this.isSubmit = true;
    this.resultMessage = {};

    if (this.addStudentVacationRequestModel.batchId &&  this.addStudentVacationRequestModel.vacationReason) {

      this.studentProgramVacationService.addStudentProgramVacation(this.addStudentVacationRequestModel).subscribe(
        res => {
          if (res.isSuccess) {
            this.isSubmit = false;
            this.disableSaveButtons = true;
            this.alertfyService.success(res.message || "");
            this.closeAddStudentVacation();
          }
          else {
            this.disableSaveButtons = true;

            this.resultMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        },
        error => {
          this.resultMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        })
    }
  }

  getAllProgram() {
    this.programFilter.skip = 0;
    this.programFilter.take = 2147483647;
    this.studentProgramSubscriptionService.getStudentPrograms(this.programFilter).subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IStudentPrograms[];
        this.selectedIndex = -1;
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  get f() {
    return this.currentForm.controls;
  }
  buildForm() {
    this.currentForm = this.fb.group(
      {
        vacationReason: ['', [Validators.required]],
        batchId: ['', Validators.required],
        dateFrom :['', Validators.required],
        dateTo:['', Validators.required]
      });
  }
}









