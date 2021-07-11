import { Component, Input, OnInit } from '@angular/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IProgramDayTaskLinking } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-linking';
import { ProgramDayTaskLinkingType } from 'src/app/core/enums/program-day-task-linking-type.enum';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { IProgramLastFiveWorkToLinkAuto } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-last-five-work-to-link-auto';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-program-day-task-linking',
  templateUrl: './program-day-task-linking.component.html',
  styleUrls: ['./program-day-task-linking.component.scss']
})
export class ProgramDayTaskLinkingComponent implements OnInit {
  @Input() isView: boolean = false;
  @Input() linkingDetailsModel: IProgramDayTaskLinking = {};
  TaskLinkingTypeEnum = ProgramDayTaskLinkingType;
  lastFiveHomeWorkAutolst: IAttachment[] = [];
  programLastFiveWorkToLinkAuto: IProgramLastFiveWorkToLinkAuto = {};
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];
  resMessage: BaseMessageModel = {};
  attatchmentsAuto?: IAttachment[] = [];

  constructor(
    private programDayTasksService: ProgramDayTasksService,
    private attachmentService: AttachmentsService,
    private alertify: AlertifyService,
    public translate: TranslateService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: any) {
    this.fileList = this.linkingDetailsModel?.bookAttatchments ? this.linkingDetailsModel?.bookAttatchments : [];
  }

  DeleteAttachment(index: number, id: string) {
    this.linkingDetailsModel?.bookAttatchments?.splice(index, 1);
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
        this.linkingDetailsModel.bookAttatchments = this.fileList;
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

  getLastFiveHomeWorkAuto() {
    this.linkingDetailsModel.bookAttatchments = [];
    this.fileList = [];
    this.programLastFiveWorkToLinkAuto.progId = this.linkingDetailsModel.progId || '';
    this.programLastFiveWorkToLinkAuto.progDayOrder = this.linkingDetailsModel.progDayOrder;
    this.programDayTasksService.GetProgramLastFiveHomeWorkToLinkAuto(this.programLastFiveWorkToLinkAuto).subscribe(
      (res: any) => {
        res.data as IProgramDayTasksModel
        Array.from(res.data).forEach((elm: any) => {
          let lstBookAttatchments = JSON.parse(elm.detailsTask).bookAttatchments
          if (lstBookAttatchments.length > 0) {
            Array.from(lstBookAttatchments).forEach((item: any) => { this.fileList?.push(item as IAttachment); })
          }
          else { this.fileList?.push(elm as IAttachment); }
        })
        this.linkingDetailsModel.bookAttatchments = this.fileList;
      }
      , error => {
        this.linkingDetailsModel.bookAttatchments = [];
      }
    );
  }

  HomeWorkeManeual() {
    this.fileList = [];
    this.linkingDetailsModel.bookAttatchments = [];
  }


}
