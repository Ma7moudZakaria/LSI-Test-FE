import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ICrateTeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/icreate-teacher-drop-out-request-model';
import { ITeacherDropOutRequestAdvFilterTeacherViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-adv-filter-teacher-view-request-model';
import { ITeacherMyProgramsListModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-list-model';
import { ITeacherMyProgramsRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { TeacherDropOutRequestService } from 'src/app/core/services/teacher-drop-out-request-services/teacher-drop-out-request.service';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-add-drop-out-request',
  templateUrl: './add-drop-out-request.component.html',
  styleUrls: ['./add-drop-out-request.component.scss']
})
export class AddDropOutRequestComponent implements OnInit {

  @Output() closeCreateDropOutOverlay = new EventEmitter<ICrateTeacherDropOutRequestModel>();
  @Input() createDropOut = {} as ICrateTeacherDropOutRequestModel;
  resultMessage: BaseMessageModel = {};
  programsList: ITeacherMyProgramsListModel[] = [];
  programsbyAdvancedFilter: ITeacherMyProgramsRequestModel = {};
  currentUser: IUser | undefined;
  langEnum = LanguageEnum;
  dropOutForm: FormGroup = new FormGroup({});
  isSubmit = false;
  
  constructor(
    private programSubscriptionService: TeacherProgramSubscriptionServicesService, 
    private fb: FormBuilder,
    private teacherDropOutRequestService: TeacherDropOutRequestService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.createDropOut = {}
    this.getAllProgram();
  }

  closeCreateTeacherDropOutRequest() {
    this.createDropOut.usrId = this.currentUser?.id;
    this.createDropOut.batId = undefined;
    this.createDropOut.dropOutReason = undefined;
    this.closeCreateDropOutOverlay.emit();
  }

  sendDropOutRequest(value: string) {
    this.isSubmit = true;
    // if((this.createDropOut.batId === null || this.createDropOut.batId === '' || this.createDropOut.batId === undefined) &&  (this.createDropOut.dropOutReason === null || this.createDropOut.dropOutReason === '' || this.createDropOut.dropOutReason === undefined)){
    //   this.resultMessage = {
    //     message:  this.translate.currentLang === LanguageEnum.ar ? 'برجاء اكمال البيانات' : "Please complete the missing information",
    //     type: BaseConstantModel.DANGER_TYPE
    //   }

    //   return;
    // }

    if (this.dropOutForm.valid){
      this.resultMessage= {};
      if (this.createDropOut.dropOutReason && this.createDropOut.dropOutReason?.length > 256){
          this.resultMessage = {
            message: this.translate.instant('GENERAL_DROP_OUT_REQUEST.REJECT_REASON_LENGHT'),
            type: BaseConstantModel.DANGER_TYPE
          }

          return;
      }

      this.createDropOut.usrId = this.currentUser?.id;
      this.teacherDropOutRequestService.createTeacherDropOutRequest(this.createDropOut || {}).subscribe(res => {
        if (res.isSuccess) {
          this.closeCreateTeacherDropOutRequest();
          this.isSubmit = false;
        }
        else{
          this.isSubmit = false;
          this.resultMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
        
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    }

    
  }

  getAllProgram() {
    this.programsbyAdvancedFilter = { teacherId : this.currentUser?.id };
    this.teacherDropOutRequestService.teacherDropOutAvailableProgram(this.programsbyAdvancedFilter || {}).subscribe(res => {

      console.log("res =====> ", res)
      if (res.isSuccess) {
        this.programsList = res.data;

      }
      else {

      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  get f() {
    return this.dropOutForm.controls;
  }

  buildForm() {
    this.dropOutForm = this.fb.group(
      {
        batch: ['', [Validators.required]],
        dropOutReason: ['', [Validators.required]]
      }
    )
  }
}
