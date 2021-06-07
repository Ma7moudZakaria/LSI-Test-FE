import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramDayTaskVideo } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-video';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-task-video',
  templateUrl: './program-day-task-video.component.html',
  styleUrls: ['./program-day-task-video.component.scss']
})
export class ProgramDayTaskVideoComponent implements OnInit {
  fileUploadModel: IFileUpload[] = [];
  fileList: IAttachment[] = [];
  attachmentIds: string[] = [];
  fileToUpload?: File;
  resMessage: BaseMessageModel = {};
  programDayTaskVideoObj: IProgramDayTaskVideo={};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel={};
  resultMessage: BaseMessageModel = {};
  @Input() selectedTaskId:string|undefined;
  constructor(
    private programDayTasksService:ProgramDayTasksService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService,
    private attachmentService: AttachmentsService, 
     private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  onFileChange(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element

        }
        this.fileUploadModel.push(fileUploadObj)
      });
      this.uploadFiles(this.fileUploadModel);
    }

  }

  uploadFiles(files: IFileUpload[]) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.attachmentIds.push(elm.id);
          this.fileList.push(elm);
        })
        this.fileUploadModel = [];
      }, error => {
        this.fileUploadModel = [];
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }
  deleteAttachment(index: number, id: string) {
    this.fileList.splice(index, 1);
    this.attachmentIds = this.attachmentIds.filter(a => a !== id);
  }
  saveVideoTaskToProgram() {
    this.programDayTaskDetails.programDayTask = this.selectedTaskId;
    this.programDayTaskVideoObj.attachmentIds=this.attachmentIds;
    this.programDayTaskDetails.detailsTask = JSON.stringify(this.programDayTaskVideoObj);
    this.resultMessage = {};
       this.programDayTasksService.SaveProgramDayTaskDetails(this.programDayTaskDetails).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }
      
      }
      else {
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
      }
    )
 
  }
}
