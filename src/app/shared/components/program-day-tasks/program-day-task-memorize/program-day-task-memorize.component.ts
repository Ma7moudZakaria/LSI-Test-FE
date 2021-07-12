import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskMemorize } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-memorize';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare const Buffer:any;

@Component({
  selector: 'app-program-day-task-memorize',
  templateUrl: './program-day-task-memorize.component.html',
  styleUrls: ['./program-day-task-memorize.component.scss']
})
export class ProgramDayTaskMemorizeComponent implements OnInit {
  // isView: boolean = false;
  resMessage: BaseMessageModel = {};
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];
  @Input() memorizeDetailsModel: IProgramDayTaskMemorize = {};
  @Input() isView: boolean = false;

  attachmentId : string[] = [];
  pdfSrc : any;

  constructor
    (
      private attachmentService: AttachmentsService,
      private alertify: AlertifyService,
      public translate: TranslateService,
      private modalService: NgbModal
    ) { }


  ngOnInit(): void {

  }
  ngOnChanges(changes: any) {
    this.fileList = this.memorizeDetailsModel?.bookAttatchments ? this.memorizeDetailsModel?.bookAttatchments : [];
  }
  closeResult: string | undefined;

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  DeleteAttachment(index: number, id: string) {
    this.memorizeDetailsModel?.bookAttatchments?.splice(index, 1);
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


          this.pdfSrc = elm.url;
        })
        this.memorizeDetailsModel.bookAttatchments = this.fileList;

        this.fileUploadModel = [];
        this.alertify.success(res.message || '');
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
