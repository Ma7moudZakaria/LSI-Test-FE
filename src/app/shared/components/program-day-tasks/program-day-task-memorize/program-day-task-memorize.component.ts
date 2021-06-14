import { Component, Input, OnInit } from '@angular/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskMemorize } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-memorize';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';

@Component({
  selector: 'app-program-day-task-memorize',
  templateUrl: './program-day-task-memorize.component.html',
  styleUrls: ['./program-day-task-memorize.component.scss']
})
export class ProgramDayTaskMemorizeComponent implements OnInit {

  resMessage: BaseMessageModel = {};
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];
  @Input() memorizeDetailsModel: IProgramDayTaskMemorize = {}

  constructor
    (
      private attachmentService: AttachmentsService,
      private alertify: AlertifyService,


  ) { }



  ngOnInit(): void {
  }
  ngOnChanges(changes: any){
    this.fileList = this.memorizeDetailsModel?.bookAttatchments?this.memorizeDetailsModel?.bookAttatchments:[];
  }

  DeleteAttachment(index: number, id: string) {
    this.memorizeDetailsModel?.bookAttatchments?.splice(index, 1);
  }

  onFileChange(files: FileList) {

    if (files[0].size > 3, 145, 728) {
      this.alertify.error('your file size more than 3m');

    }

    else {
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
        this.memorizeDetailsModel.bookAttatchments = this.fileList;
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
}
