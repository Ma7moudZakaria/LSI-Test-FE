import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ICrateStudentDropOutRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/icreate-student-drop-out-request-model';
import { IStudentMyProgramsListModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-my-programs-list-model';
import { IStudentMyProgramsRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentDropOutRequestService } from 'src/app/core/services/student-drop-out-request-services/student-drop-out-request.service';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-add-student-drop-out-request',
  templateUrl: './add-student-drop-out-request.component.html',
  styleUrls: ['./add-student-drop-out-request.component.scss']
})
export class AddStudentDropOutRequestComponent implements OnInit {

  @Output() closeCreateDropOutOverlay = new EventEmitter<ICrateStudentDropOutRequestModel>();
  @Input() createDropOut = {} as ICrateStudentDropOutRequestModel;
  resultMessage: BaseMessageModel = {};
  programsList: IStudentMyProgramsListModel[] = [];
  programsbyAdvancedFilter: IStudentMyProgramsRequestModel = {};
  currentUser: IUser | undefined;
  langEnum=LanguageEnum;
  dropOutForm: FormGroup = new FormGroup({});
  isSubmit = false;
  
  constructor(
    private programSubscriptionService: StudentProgramSubscriptionServicesService, 
    private studentDropOutRequestService: StudentDropOutRequestService,
    private fb: FormBuilder,
    private alertify: AlertifyService , 
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.createDropOut = {}
    this.getAllProgram();
  }

  closeCreateStudentDropOutRequest() {
    this.createDropOut.usrId = this.currentUser?.id;
    this.createDropOut.batId = undefined;
    this.createDropOut.dropOutReason = undefined;
    this.closeCreateDropOutOverlay.emit();
  }

  sendDropOutRequest(value: string) {
    this.isSubmit = true;
    if (this.dropOutForm.valid){
      this.createDropOut.usrId = this.currentUser?.id;
      this.studentDropOutRequestService.createStudentDropOutRequest(this.createDropOut || {}).subscribe(res => {
        if (res.isSuccess) {
          this.closeCreateStudentDropOutRequest();
          this.isSubmit = false;
          this.alertify.success(res.message || '');
        }
        else {
          this.alertify.error(res.message || '');     
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
      });
    }
  }

  getAllProgram() {
    this.programsbyAdvancedFilter = { usrId : this.currentUser?.id };
    this.studentDropOutRequestService.studentDropOutAvailableProgram(this.programsbyAdvancedFilter).subscribe(res => {
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
        batch: ['', [Validators.required, Validators.maxLength(256)]],
        dropOutReason: ['', [Validators.required, Validators.maxLength(256)]]
      }
    )
  }
}
