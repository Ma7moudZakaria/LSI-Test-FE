import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ISharedProgramResponse } from 'src/app/core/interfaces/programs-interfaces/ishared-program-response';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IAddTeacherToSharedProgramRequest } from 'src/app/core/interfaces/teacher-program-tab-interfaces/add-teacher-to-shared-program-request-model';
import { ITeacherMyProgramsList, ITeacherMyProgramsRequest } from 'src/app/core/interfaces/teacher-program-tab-interfaces/teacher-my-programs-list-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { TeacherProgramTabService } from 'src/app/core/services/teacher-program-tab-services/teacher-program-tab-services.service';
import { IStudentSubscriptionPredefinedConditionResponse } from '../../../../../../core/interfaces/student-program-subscription-interfaces/ipredefined-condtion-subscription-model';

@Component({
  selector: 'app-admin-teacher-add-program',
  templateUrl: './admin-teacher-add-program.component.html',
  styleUrls: ['./admin-teacher-add-program.component.scss']
})
export class AdminTeacherAddProgramComponent implements OnInit {

  @Input() predefinedCondition: IStudentSubscriptionPredefinedConditionResponse | undefined;
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Input() teacherInfoDetails: ITeacherStudentViewModel | undefined;

  resultMessage: BaseMessageModel = {};
  teacherMyProgramsRequest: ITeacherMyProgramsRequest = { skip: 0, take: 9, sortField: '', sortOrder: 1 };
  AddTeacherToSharedProgramRequest:IAddTeacherToSharedProgramRequest | undefined;
  selectedBatchId:string | undefined;
  teacherMyProgramsList:ISharedProgramResponse [] = [];
  langEnum=LanguageEnum;

  constructor(    
    private teacherProgramTabService: TeacherProgramTabService,
    private programService: ProgramService,
    private alertify: AlertifyService , 
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.getTeacherPrograms();
  }

  addTeacherToSharedProgram() {
    if (this.selectedBatchId != null || this.selectedBatchId != ''){
      this.AddTeacherToSharedProgramRequest = {
        techId :this.teacherInfoDetails?.usrId,
        batId : this.selectedBatchId
      };
      this.teacherProgramTabService.AddTeacherToSharedProgram(this.AddTeacherToSharedProgramRequest || {}).subscribe(res => {
        if (res.isSuccess) {
          this.alertify.success(res.message || '');
          this.closeForm();
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
    else{
      this.resultMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.TITLE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  closeForm(){
    this.closeOverlay.emit(false);
  }

  getTeacherPrograms(){
    this.programService.getAllSharedPrograms().subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.teacherMyProgramsList = res.data as ISharedProgramResponse[];        
      }
      else {
        this.resultMessage = {
          message: response.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
    error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

}
