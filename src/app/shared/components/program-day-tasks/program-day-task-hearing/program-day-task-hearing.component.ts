import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-program-day-task-hearing',
  templateUrl: './program-day-task-hearing.component.html',
  styleUrls: ['./program-day-task-hearing.component.scss']
})
export class ProgramDayTaskHearingComponent implements OnInit {
  @Input() isView: boolean = false;

  resMessage: BaseMessageModel = {};
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];
  @Input() hearingTaskDetailsModel: IProgramDayTaskHearing = {};
  constructor(
    public translate: TranslateService,
    private attachmentService: AttachmentsService,
    private alertify: AlertifyService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.fileList = this.hearingTaskDetailsModel.hearingAttachments ? this.hearingTaskDetailsModel.hearingAttachments : [];
  }

  DeleteAttachment(index: number, id: string) {
    this.hearingTaskDetailsModel?.hearingAttachments?.splice(index, 1);
  }

  closeResult: string | undefined;
  openVerticallyCentered(content: any) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { size: 'lg' });
  }
  listExt = ["MP3", "MP4", "FLP", "PEK", "m4a"]

  onFileChange(files: FileList) {
    if (files.length > 0) {

      if (files[0].size >= 5242880) {
        this.alertify.error(this.translate.instant('GENERAL.FILE_SIZE'));
        return;
      }
      if (!this.attachmentService.checkFileExtention(files[0], this.listExt)) {
        this.alertify.error(this.translate.instant('GENERAL.EXTENTION_FILE'));
        return;
      }

      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element
        }
        this.fileUploadModel?.push(fileUploadObj)
      });
      this.UploadFiles(this.fileUploadModel);
    } else {
      return;
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
        this.hearingTaskDetailsModel.hearingAttachments = this.fileList;
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
