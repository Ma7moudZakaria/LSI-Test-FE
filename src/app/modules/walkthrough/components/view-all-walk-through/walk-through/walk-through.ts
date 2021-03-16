import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IWalkThrough } from 'src/app/core/interfaces/walkthrough-interfaces/iwalkthrough';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { WalkThroughService } from 'src/app/core/services/walk-through-services/walk-through-services';

@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.html',
  styleUrls: ['./walk-through.scss']
})

export class WalkThroughComponent implements OnInit {

  currentForm: FormGroup = new FormGroup({});
  walkThrough = {} as IWalkThrough;
  createWalkThrough = false;
  updateWalkThrough = false;

  walkThroughId!: string;
  routeParams: any;
  isSubmit = false;
  @Input() selectedWalkThroughPageId: any;
  attachmentIds: string[] = [];
  fileUploadModel: IFileUpload[] = [];
  fileList: IAttachment[] = [];
  disableSaveButtons = false;
  resMessage: BaseMessageModel = {};
  constructor(
    private route: ActivatedRoute, private fb: FormBuilder,
    private attachmentService: AttachmentsService, public translate: TranslateService,
    private walkThroughService: WalkThroughService) {
  }

  ngOnInit() {
    // this.walkThroughId = this.route.snapshot.params.id;

    // if (this.routeParams === '/walk-through/create-walk-through' && this.walkThroughId == null) {
    //     this.createWalkThrough = true;
    //     this.updateWalkThrough = false;
    // } else if (this.routeParams.includes('/user/update-walk-through') && this.walkThroughId != null) {
    //     this.walkThroughService.getWalkThroughById(this.walkThroughId).subscribe(res => {
    //       this.walkThrough = res.data;
    //     })
    //     this.createWalkThrough = false;
    //     this.updateWalkThrough = true;
    // }
    this.buildForm();
  }

  ngOnChanges(changes: any) {
    console.log(changes);
    this.loadWalkThrough(changes.selectedWalkThroughPageId.currentValue);
  }
  loadWalkThrough(selectedPageId: any) {
    this.currentForm.reset();
    this.walkThrough = {};
    this.fileList = [];
    this.attachmentIds = [];
    this.fileUploadModel = [];

    if (selectedPageId) {
      this.walkThroughService.getWalkThroughByPageId(selectedPageId).subscribe(res => {
        if (res.data) {
          this.walkThrough = res.data;
          this.populateForm();
        }
        // else {
        //   this.currentForm.reset();
        //   this.walkThrough = {};
        //   this.fileList = [];
        //   this.attachmentIds = [];
        //   this.fileUploadModel = [];
        // }

      });
    }
    // else {
    //   this.currentForm.reset();
    //   this.walkThrough = {};
    //   this.fileList = [];
    //   this.attachmentIds = [];
    //   this.fileUploadModel = [];
    // }
  }
  deleteAttachment(index: number, id: string) {
    this.fileList.splice(index, 1);
    this.attachmentIds = this.attachmentIds.filter(a => a !== id);
  }

  submit() {
    this.isSubmit = true;
    this.resMessage = {};
    if (this.currentForm.valid) {
      if (this.attachmentIds.length ==0) {
        return;
      }
      this.mappModel();

      if (this.walkThrough.id) {
        this.walkThroughService.updateWalkThrough(this.walkThrough).subscribe(
          res => {
            if (res.isSuccess) {
              this.isSubmit = false;
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.SUCCESS_TYPE
              }
              this.clearMessage();
            }
            else {
              this.isSubmit = false;
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.DANGER_TYPE
              }
              this.clearMessage();
            }
          },
          error => {
            console.log(error);
            this.resMessage = {
              message: error.message,
              type: BaseConstantModel.DANGER_TYPE
            }
            this.clearMessage();
          }
        );
      }
      else {
        this.walkThroughService.createWalkThrough(this.walkThrough).subscribe(
          res => {
            if (res.isSuccess) {
              this.isSubmit = false;
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.SUCCESS_TYPE
              }
              this.clearMessage();
            }
            else {
              this.isSubmit = false;
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.DANGER_TYPE
              }
              this.clearMessage();
            }

          },
          error => {
            console.log(error);
            this.resMessage = {
              message: error.message,
              type: BaseConstantModel.DANGER_TYPE
            }
            this.clearMessage();
          });
      }
    }
    else {
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  mappModel() {
    // if (this.walkThrough.id) {  
    //   this.walkThrough.id =  this.f.id.value;  
    // }
    this.walkThrough.textAr = this.f.textAr.value;
    this.walkThrough.textEn = this.f.textEn.value;;
    this.walkThrough.pageId = this.selectedWalkThroughPageId;
    this.walkThrough.attachmentId = this.attachmentIds[0];
  }

  get f() {
    return this.currentForm.controls;
  }

  buildForm() {
    const arabicPattern = "^[\u0621-\u064A\u0660-\u0669 ]+$";
    const englishPattern = "^[a-zA-Z''-'\s]{1,40}$";
    this.currentForm = this.fb.group(
      {
        textAr: ['', [Validators.required, Validators.pattern(arabicPattern)]],
        textEn: ['', [Validators.required, Validators.pattern(englishPattern)]]
      }
    )
  }

  populateForm() {
    this.f.textAr.setValue(this.walkThrough.textAr);
    this.f.textEn.setValue(this.walkThrough.textEn);
    if (this.walkThrough.attachmentId) {
      this.attachmentIds.push(this.walkThrough.attachmentId);
      let attchment: IAttachment = {
        id: this.walkThrough.attachmentId,
        content: "",
        contentType: "",
        fileName: this.walkThrough.fileName != null ? this.walkThrough.fileName : '',
        url:
          this.walkThrough.fileUrl != null ? this.walkThrough.fileUrl : ''
      }
      this.fileList.push(attchment);
    }

  }
  onFileChange(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element

        }
        this.fileUploadModel.push(fileUploadObj)
      });
      this.uploadFiles(this.fileUploadModel);
    }

  }

  uploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.attachmentIds.push(elm.id);
          this.fileList.push(elm);

        })
        this.fileUploadModel = [];
      }, error => {
        console.log(error);
        this.fileUploadModel = [];
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
        this.clearMessage();
      }
    )
  }
  clearMessage() {
    setTimeout(() => {
      this.resMessage = {};
    }, 2000);
  }
}