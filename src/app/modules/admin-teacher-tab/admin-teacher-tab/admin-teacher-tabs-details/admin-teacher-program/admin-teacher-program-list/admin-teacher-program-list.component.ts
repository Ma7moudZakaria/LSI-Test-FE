import {Component, OnInit,EventEmitter, Output, Input} from '@angular/core';
import {IprogramsModel} from '../../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseMessageModel} from '../../../../../../core/ng-model/base-message-model';
import {LanguageEnum} from '../../../../../../core/enums/language-enum.enum';
import {IProgramFilterByNameRequest} from '../../../../../../core/interfaces/programs-interfaces/iprogram-filter-requests';
import {TranslateService} from '@ngx-translate/core';
import { TeacherProgramTabService } from 'src/app/core/services/teacher-program-tab-services/teacher-program-tab-services.service';
import { ITeacherMyProgramsList, ITeacherMyProgramsRequest } from 'src/app/core/interfaces/teacher-program-tab-interfaces/teacher-my-programs-list-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-admin-teacher-program-list',
  templateUrl: './admin-teacher-program-list.component.html',
  styleUrls: ['./admin-teacher-program-list.component.scss']
})
export class AdminTeacherProgramListComponent implements OnInit {
  programs: any;
  @Output() selectedProgram =  new EventEmitter<IprogramsModel>();
  @Output() showAddProgram = new EventEmitter<boolean>();
  @Input() teacherInfoDetails: ITeacherStudentViewModel | undefined;
  @Output() batchIdEvent = new EventEmitter<ITeacherStudentViewModel>();

  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  programFilterByName: IProgramFilterByNameRequest = {};
  selectedIndex=0;
  teacherMyProgramsRequest: ITeacherMyProgramsRequest = { skip: 0, take: 9, sortField: '', sortOrder: 1 };
  teacherMyProgramsList:ITeacherMyProgramsList [] = [];
  teacherBatchs:ITeacherMyProgramsList [] = [];


  constructor(private teacherProgramTabService: TeacherProgramTabService,public translate : TranslateService,
    private alertfy:AlertifyService) { }

  ngOnInit(): void {
    this.getTeacherPrograms();
  }

  showOverlay(){
    this.showAddProgram.emit(true);
  }

  getBatchId(event?:string) {
    if(event === null || event === ''){
      event = this.teacherMyProgramsList[0].id;
    }

    if (this.teacherInfoDetails){
      this.teacherInfoDetails.batchId = event; 
      this.batchIdEvent.emit(this.teacherInfoDetails);
    }
  }

  getTeacherPrograms(){
    this.resMessage = {}
    this.teacherMyProgramsRequest.teacherId = this.teacherInfoDetails?.usrId;
    this.teacherProgramTabService.getAllTeacherPrograms(this.teacherMyProgramsRequest).subscribe(res => {
      // if (res.isSuccess) {
      //   this.teacherMyProgramsList = res.data as ITeacherMyProgramsList[];

      //   if (this.teacherMyProgramsList && this.teacherMyProgramsList.length > 0){
      //     let firstId = this.teacherMyProgramsList[0].id;
      //     let UserModel: ITeacherStudentViewModel = { progName: '', usrId: firstId };
      //     this.userId.emit(UserModel);
      //   }
      //   else{
      //     this.resMessage = {
      //       message: this.translate.instant('GENERAL.NO_DATA'),
      //       type: BaseConstantModel.SUCCESS_TYPE
      //     }
      //     this.userId.emit({});
      //   }
      // }
      // else {
      //   this.alertfy.error(res.message || '');
      // }

      // var response = <BaseResponseModel>res;
      if (res.isSuccess) {
        this.teacherMyProgramsList = res.data as ITeacherMyProgramsList[]; 

        if (this.teacherMyProgramsList && this.teacherMyProgramsList.length > 0 && this.teacherInfoDetails){
          this.teacherInfoDetails.batchId = this.teacherMyProgramsList[0].batId;
          this.batchIdEvent.emit(this.teacherInfoDetails);       
        }
        else{
          this.resMessage = {
            message: this.translate.instant('GENERAL.NO_DATA'),
            type: BaseConstantModel.SUCCESS_TYPE
          }
          this.batchIdEvent.emit(this.teacherInfoDetails);
        }
      }
      else {
        this.alertfy.error(res.message || '');
      }
    },
    error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  searchTeacherBatch(text?:string){
    this.teacherBatchs=[];
    this.teacherMyProgramsRequest.progName = text;
    this.getTeacherPrograms();   
  }
}
