import { Component, Input, OnInit } from '@angular/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IProgramDayTaskReadExplanation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-read-explanation';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
@Component({
  selector: 'app-program-day-task-read-explanation',
  templateUrl: './program-day-task-read-explanation.component.html',
  styleUrls: ['./program-day-task-read-explanation.component.scss']
})
export class ProgramDayTaskReadExplanationComponent implements OnInit {
  @Input() isView: boolean = false;
  @Input() readExplanationDetailsModel: IProgramDayTaskReadExplanation = {};
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum=ProgramDutyDaysTaskViewMoodEnum;
  resMessage: BaseMessageModel = {};
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  attachmentIds: string[] = [];

  constructor(
    public translate: TranslateService,
    private attachmentService: AttachmentsService,
    private modalService: NgbModal,
    private alertify: AlertifyService,


  ) { }

  ngOnInit(): void {

  }


  ngOnChanges(changes: any) {
    this.fileList = this.readExplanationDetailsModel?.bookAttatchments ? this.readExplanationDetailsModel?.bookAttatchments : [];
  }

  DeleteAttachment(index: number, id: string) {
    this.readExplanationDetailsModel?.bookAttatchments?.splice(index, 1);
  }

  closeResult: string | undefined;

  openVerticallyCentered(content: any) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { size: 'lg' });
  }

  listExt = ["jpg", "png", "jpeg", "gif", "bmp", "tif", "tiff"]

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
        this.readExplanationDetailsModel.bookAttatchments = this.fileList;
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
