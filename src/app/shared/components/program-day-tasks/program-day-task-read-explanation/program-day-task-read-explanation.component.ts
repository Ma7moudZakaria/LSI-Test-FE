import { Component, Input, OnInit } from '@angular/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IProgramDayTaskReadExplanation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-read-explanation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-program-day-task-read-explanation',
  templateUrl: './program-day-task-read-explanation.component.html',
  styleUrls: ['./program-day-task-read-explanation.component.scss']
})
export class ProgramDayTaskReadExplanationComponent implements OnInit {

  @Input() readExplanationDetailsModel: IProgramDayTaskReadExplanation = {};

  resMessage: BaseMessageModel = {};
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];

  constructor(
    public translate: TranslateService,
    private attachmentService: AttachmentsService

  ) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: any){
    this.fileList = this.readExplanationDetailsModel.bookAttatchments;
  }

  DeleteAttachment(index: number, id: string) {
    this.readExplanationDetailsModel?.bookAttatchments?.splice(index, 1);
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
        this.readExplanationDetailsModel.bookAttatchments=this.fileList;
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
