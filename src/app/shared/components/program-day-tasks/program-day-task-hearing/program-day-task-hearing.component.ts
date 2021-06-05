import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { Component, OnInit } from '@angular/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';

@Component({
  selector: 'app-program-day-task-hearing',
  templateUrl: './program-day-task-hearing.component.html',
  styleUrls: ['./program-day-task-hearing.component.scss']
})
export class ProgramDayTaskHearingComponent implements OnInit {
  resMessage: BaseMessageModel = {};

  constructor(
    private attachmentService: AttachmentsService

  ) { }


  dayTaskHearingModel: IProgramDayTaskHearing = { hearingAttachments: [] };

  ngOnInit(): void {
  }



  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];

  DeleteAttachment(index: number, id: string) {
    this.fileList?.splice(index, 1);
    this.attachmentIds = this.attachmentIds.filter(a => a !== id);
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
          this.attachmentIds.push(elm.id);
          this.fileList?.push(elm);

        })
        this.fileUploadModel = [];
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

  saveUpload() {
    let hearingModel = JSON.stringify(this.dayTaskHearingModel);
  }


}
