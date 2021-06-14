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
  fileToUpload?: File;
  resMessage: BaseMessageModel = {};
  resultMessage: BaseMessageModel = {};
  @Input() videoDetailsModel: IProgramDayTaskVideo = {};
  constructor(
    public translate: TranslateService,
    private attachmentService: AttachmentsService, 
  ) { }

  ngOnInit(): void {
  }
  DeleteAttachment(index: number, id: string) {
    this.videoDetailsModel?.vidio?.splice(index, 1);
  }

  onFileChange(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element

        }
        this.fileUploadModel?.push(fileUploadObj)
      });
      this.UploadFiles(this.fileUploadModel);
    }

  }

  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.fileList?.push(elm as IAttachment);

        })
        this.videoDetailsModel.vidio=this.fileList;
        this.fileUploadModel = [];
        this.fileList = [];
      }, error => {
        console.log(error);
        this.fileUploadModel = [];
        this.resMessage =
        {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }
}
