import {Component, Input, OnInit} from '@angular/core';
import {ProgramDutyDaysTaskViewMoodEnum} from '../../../../core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import {IFileUpload} from '../../../../core/interfaces/attachments-interfaces/ifile-upload';
import {IAttachment} from '../../../../core/interfaces/attachments-interfaces/iattachment';
import {BaseMessageModel} from '../../../../core/ng-model/base-message-model';
import {TranslateService} from '@ngx-translate/core';
import {AttachmentsService} from '../../../../core/services/attachments-services/attachments.service';
import {AlertifyService} from '../../../../core/services/alertify-services/alertify.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseConstantModel} from '../../../../core/ng-model/base-constant-model';
import {IProgramDayTaskExplanation} from '../../../../core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-explanation';

@Component({
  selector: 'app-program-day-task-explanation',
  templateUrl: './program-day-task-explanation.component.html',
  styleUrls: ['./program-day-task-explanation.component.scss']
})
export class ProgramDayTaskExplanationComponent implements OnInit {
  @Input() explanationDetailsModel: IProgramDayTaskExplanation = {};
  @Input() isView: boolean = false;
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum=ProgramDutyDaysTaskViewMoodEnum;
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];
  fileToUpload?: File;
  resMessage: BaseMessageModel = {};
  resultMessage: BaseMessageModel = {};

  constructor(
    public translate: TranslateService,
    private attachmentService: AttachmentsService,
    private alertify: AlertifyService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.fileList = this.explanationDetailsModel?.videoAttatchments ? this.explanationDetailsModel?.videoAttatchments : [];
  }

  DeleteAttachment(index: number, id: string) {
    this.explanationDetailsModel?.videoAttatchments?.splice(index, 1);
  }

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
        this.explanationDetailsModel.videoAttatchments = this.fileList;
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
