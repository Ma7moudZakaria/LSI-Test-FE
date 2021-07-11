import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramDayTaskReview } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-review';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-task-review',
  templateUrl: './program-day-task-review.component.html',
  styleUrls: ['./program-day-task-review.component.scss']
})
export class ProgramDayTaskReviewComponent implements OnInit {
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];
  fileToUpload?: File;
  resMessage: BaseMessageModel = {};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel = {};
  resultMessage: BaseMessageModel = {};
  @Input() reviewDetailsModel: IProgramDayTaskReview = {};
  @Input() isView: boolean = false;

  constructor(
    private programDayTasksService: ProgramDayTasksService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService,
    private attachmentService: AttachmentsService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.fileList = this.reviewDetailsModel?.bookAttatchments ? this.reviewDetailsModel?.bookAttatchments : [];
  }

  DeleteAttachment(index: number, id: string) {
    this.reviewDetailsModel?.bookAttatchments?.splice(index, 1);
  }
  closeResult: string | undefined;

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  listExt = ["jpg", "png", "jpeg", "gif", "bmp", "tif", "tiff", "pdf"]

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
        this.reviewDetailsModel.bookAttatchments = this.fileList;
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
