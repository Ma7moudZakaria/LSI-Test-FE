import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-task-video',
  templateUrl: './program-day-task-video.component.html',
  styleUrls: ['./program-day-task-video.component.scss']
})
export class ProgramDayTaskVideoComponent implements OnInit {
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  fileToUpload?: File;
  resMessage: BaseMessageModel = {};
  resultMessage: BaseMessageModel = {};
  @Input() videoDetailsModel: IProgramDayTaskVideo = {};
  @Input() isView: boolean = false;

  constructor(
    public translate: TranslateService,
    private attachmentService: AttachmentsService,
    private alertify: AlertifyService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.fileList = this.videoDetailsModel?.videoAttatchments ? this.videoDetailsModel?.videoAttatchments : [];
  }

  DeleteAttachment(index: number, id: string) {
    this.videoDetailsModel?.videoAttatchments?.splice(index, 1);
  }

  closeResult: string | undefined;
  openVerticallyCentered(content: any) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { size: 'lg' });
  }

  listExt = ["mp4", "x-m4v", "psv", "sed", "webm"]

  onFileChange(files: FileList) {
    if (files.length > 0) {

      if (files[0].size >= 3145728) {
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
        this.videoDetailsModel.videoAttatchments = this.fileList;
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
  onDragOver(event: any) {
    event.preventDefault();
  }

// From drag and drop
  onDropSuccess(event: any) {
    event.preventDefault();

    this.onFileChange(event.dataTransfer.files);
  }

// From attachment link
  onChange(event: any) {
    this.onFileChange(event.target.files);
  }
}
