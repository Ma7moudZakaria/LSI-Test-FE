import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IContentManagementCreat } from 'src/app/core/interfaces/content-management-interfaces/icontent-management-creat';
import { IContentManagementUpdate } from 'src/app/core/interfaces/content-management-interfaces/icontent-management-update';
import { IContentManagement } from 'src/app/core/interfaces/content-management-interfaces/icontentmanagement';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-content-management-system',
  templateUrl: './content-management-system.html',
  styleUrls: ['./content-management-system.scss']
})

export class ContentManagementSystemComponent implements OnInit {
  contentmanagementsystem: IContentManagement = {};
  createCMS = false;
  updateCMS = false;
  errorMessage: any;
  contentManagementId!: string;
  routeParams: any;
  isSubmit = false;
  @Input() selectedcmsTypeId = { id: '', nameAr: '', nameEn: '' };
  currentForm: FormGroup = new FormGroup({});
  resultMessage: BaseMessageModel = {};
  disableSaveButtons = false;
  cmsId?: string = '';
  isAdd: boolean = true;
  typeId?: string = '';
  contentmanagementsystemUpdate: IContentManagementUpdate = {};
  contentmanagementCreat: IContentManagementCreat = {};
  langEnum = LanguageEnum;
  temp: IContentManagement = {};
  constructor(
    private route: ActivatedRoute, private fb: FormBuilder,
    private contentmanagementService: ContentManagementService,
    public translate: TranslateService) {
  }

  ngOnInit() {

    this.currentForm.reset();
    this.disableSaveButtons = false;
    this.resultMessage = {
      message: '',
      type: ''
    }
    if (this.selectedcmsTypeId.id !== undefined) {
      this.isAdd = false;
      this.loadContentManagementSystemByType()
    }
    else {
      this.isAdd = true;
      this.currentForm.reset();
    }
    this.buildForm();
  }

  ngOnChanges(changes: any) {
    this.currentForm.reset();
    //this.cmsType.typeId=this.selectedcmsTypeId||"";
    if (this.selectedcmsTypeId.id !== "") {
      this.isAdd = false;
      this.loadContentManagementSystemByType()
    }
    else {
      this.isAdd = true;
      this.currentForm.reset();
    }
    this.disableSaveButtons = false;
    this.resultMessage = {
      message: '',
      type: ''
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  public onPageUnload($event: BeforeUnloadEvent) {
    $event.returnValue=this.isChangeData();

  }
  isChangeData(){
    if (this.temp.longDesAr != this.contentmanagementsystem.longDesAr
      || this.temp.longDesEn != this.contentmanagementsystem.longDesEn
      || this.temp.shortDesAr != this.contentmanagementsystem.shortDesAr
      || this.temp.shortDesEn != this.contentmanagementsystem.shortDesEn) {
      return true;
    }
    else
     return false;

  }
  get f() {
    { return this.currentForm?.controls; }
  }

  buildForm() {
    // const arabicWordPattern = "^[\u0621-\u064A\u0660-\u0669 0-9]+$";
    // const englishWordPattern ="^[a-zA-Z0-9' '-'\s]{1,40}$";

    // const ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}\u0621-\u064A\u0660-\u0669 0-9_@./#&+\\-~؛)(÷*/'/!/$]+$";
    // const ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}A-Za-z 0-9_@./#&+-~؛)(÷*/'/!/$]*$";
    // const ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[\u0621-\u064A\u0660-\u0669 0-9_@./#&+-~؛)(÷*/'/!/$]+$";
    // const ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITH_EMOJI = "^[ A-Za-z0-9_@./#&+-~؛)(÷*/'/!/$]*$";

    this.currentForm = this.fb.group(
      {
        shortDescriptionAr: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(BaseConstantModel.TEXT_AREA_ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        shortDescriptionEn: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(BaseConstantModel.TEXT_AREA_ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        longDescriptionAr: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern(BaseConstantModel.TEXT_AREA_ARABIC_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        longDescriptionEn: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern(BaseConstantModel.TEXT_AREA_ENGLISH_LETTERS_WITH_SPECIAL_CHAR_WITHOUT_EMOJI)]],
        //typeId: ['', Validators.required]
      }
    )
  }

  loadContentManagementSystemByType() {
    if (this.selectedcmsTypeId.id !== undefined && this.selectedcmsTypeId.id !== "") {
      this.cmsId = "";
      this.contentmanagementsystem = {};
      this.contentmanagementService.getContentManagementSystemByTypeCms(this.selectedcmsTypeId.id).subscribe(res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.contentmanagementsystem = response.data;
          if (response.data !== null) {
            this.cmsId = this.contentmanagementsystem.id;
            if (this.cmsId != '') { this.isAdd = false; } else { this.isAdd = true; }
            this.f.shortDescriptionAr.setValue(this.contentmanagementsystem.shortDesAr);
            this.f.shortDescriptionEn.setValue(this.contentmanagementsystem.shortDesEn);
            this.f.longDescriptionAr.setValue(this.contentmanagementsystem.longDesAr);
            this.f.longDescriptionEn.setValue(this.contentmanagementsystem.longDesEn);

          }

          // this.f.typeId.setValue(this.contentmanagementsystem.typeId);
          this.disableSaveButtons = false;
          this.resultMessage = {
            message: '',
            type: ''
          }
        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
    }

  }
  Submit() {
    this.isSubmit = true;
    this.resultMessage = {
      message: '',
    }
    if (this.currentForm.valid) {
      this.contentmanagementCreat.shortDesAr = this.f.shortDescriptionAr.value;
      this.contentmanagementCreat.shortDesEn = this.f.shortDescriptionEn.value;
      this.contentmanagementCreat.longDesAr = this.f.longDescriptionAr.value;
      this.contentmanagementCreat.longDesEn = this.f.longDescriptionEn.value;
      this.contentmanagementCreat.cmsType = this.selectedcmsTypeId.id;
      this.contentmanagementService.createContentManagementSystem(this.contentmanagementCreat).subscribe(res => {
        this.isSubmit = false;
        if (res.isSuccess) {
          this.disableSaveButtons = true;
          this.resultMessage = {
            message: res.message || "",
            type: BaseConstantModel.SUCCESS_TYPE
          }
          this.loadContentManagementSystemByType();
        }
        else {
          this.disableSaveButtons = false;
          this.resultMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }

      },
        error => {
          this.resultMessage = {
            message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
            type: BaseConstantModel.DANGER_TYPE
          }
        })
    }

  }
  reset() {
    this.currentForm.reset();
  }
}