import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IGetTeacherProgramBatchDetailsRequest, IGetTeacherProgramBatchDetailsResponse } from 'src/app/core/interfaces/teacher-program-tab-interfaces/get-teacher-program-batch-details-response-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { TeacherProgramTabService } from 'src/app/core/services/teacher-program-tab-services/teacher-program-tab-services.service';

@Component({
  selector: 'app-admin-teacher-program-details',
  templateUrl: './admin-teacher-program-details.component.html',
  styleUrls: ['./admin-teacher-program-details.component.scss']
})
export class AdminTeacherProgramDetailsComponent implements OnInit {
  @Input() teacherInfoDetails: ITeacherStudentViewModel | undefined;
  starsSelected=3.5;
  selectedIndex = 0;
  resMessage: BaseMessageModel = {};
  getTeacherProgramBatchDetailsResponse:IGetTeacherProgramBatchDetailsResponse | undefined;
  setTeacherProgramBatchDetailsRequest:IGetTeacherProgramBatchDetailsRequest | undefined;
  langEnum = LanguageEnum;
  
  loadProgramMaterial() { }
  constructor(private teacherProgramTabService: TeacherProgramTabService,public translate : TranslateService) { }

  ngOnInit(): void {
    console.log("getTeacherProgramBatchDetailsResponse : " , this.getTeacherProgramBatchDetailsResponse)
  }

  getTeacherProgramBatchDetails(/*batchId? :string*/){
    this.setTeacherProgramBatchDetailsRequest = {
      techId :this.teacherInfoDetails?.usrId,
      batId : this.teacherInfoDetails?.batchId
    };
    this.teacherProgramTabService.getTeacherProgramDetails(this.setTeacherProgramBatchDetailsRequest).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.getTeacherProgramBatchDetailsResponse = res.data as IGetTeacherProgramBatchDetailsResponse;        
      }
      else {
        this.getTeacherProgramBatchDetailsResponse
        this.resMessage = {
          message: response.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },
    error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }
}
