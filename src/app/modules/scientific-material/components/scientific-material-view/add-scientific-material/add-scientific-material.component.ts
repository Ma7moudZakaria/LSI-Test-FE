import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IAddScientificMaterial } from 'src/app/core/interfaces/scientific-material/iadd-scientifimaterial';
import { IProgramScientificMaterial } from 'src/app/core/interfaces/scientific-material/iprogram-scientific-material';
import { IScientificMaterialDetails } from 'src/app/core/interfaces/scientific-material/iscientific-material-details';
import { IUpdateScientificMaterial } from 'src/app/core/interfaces/scientific-material/iupdate-scientific-material';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';

@Component({
  selector: 'app-add-scientific-material',
  templateUrl: './add-scientific-material.component.html',
  styleUrls: ['./add-scientific-material.component.scss']
})
export class AddScientificMaterialComponent implements OnInit {
  materialCategoriesLookup: BaseLookupModel[] = [];
  programs: IprogramsModel[] = [];
  selectedProgram: IProgramScientificMaterial[] = [];
  title?: string;
  scientificMaterialId: any;
  currentForm: FormGroup = new FormGroup({});
  attachmentIds: string[] = [];
  fileToUpload?: File;
  isSubmit = false;
  fileUploadModel: IFileUpload[] = [];
  fileList: IAttachment[] = [];
  addScientificMaterial = {} as IAddScientificMaterial;
  updateScientificMaterial = {} as IUpdateScientificMaterial;
  ScientificMaterialDetails = {} as IScientificMaterialDetails;
  disableSaveButtons = false;
  selectedProgramsList = Array<IprogramsModel>();
  programMessage: BaseMessageModel = {};

  @Input() selectedMaterialId: any;
  @Output() submitSuccess = new EventEmitter<boolean>();
  @Output() refreshMaterialId =  new EventEmitter<string>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};

  constructor(private fb: FormBuilder, private scientifcMaterialService: ScientificMaterialService,
    private attachmentService: AttachmentsService, public translate: TranslateService,
    private activeroute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.loadMaterialCategories();
    this.loadPrograms();
    if (this.activeroute.snapshot.paramMap.get('id') != null) {
      this.title = "Edit Scientific Material";
      this.scientificMaterialId = (this.activeroute.snapshot.paramMap.get('id') || undefined);
      // this.loadParentDetails();
    } else {
      this.title = "Add Scientific Material";
    }
    this.buildForm();

  }
  ngOnChanges(changes: any) {
    console.log(changes);
    this.loadScientificMaterialDetails(changes.selectedMaterialId.currentValue);
  }
  loadPrograms() {
    this.scientifcMaterialService.getProgramsLookup().subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IprogramsModel[];

      }, error => {
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  loadMaterialCategories() {
    this.scientifcMaterialService.GetScientificMatrialCategoriesLookup().subscribe(
      (res: BaseResponseModel) => {
        this.materialCategoriesLookup = res.data as BaseLookupModel[];
        // if (this.scientificMaterialId) {
        //   this.loadScientificMaterialDetails(this.scientificMaterialId);
        // }

      }, error => {
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  loadScientificMaterialDetails(selectedId: any) {
    if (selectedId) {
      this.scientifcMaterialService.getScientificMaterial(selectedId).subscribe(
        res => {
          if (res.isSuccess) {
            this.ScientificMaterialDetails = res.data;
            this.scientificMaterialId = this.ScientificMaterialDetails.id;
            this.populateForm();

          }
        }, error => {
          this.resMessage = {
            message: error.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        })
    }
    else {
      this.currentForm.reset();
      this.scientificMaterialId = null;
      this.ScientificMaterialDetails = {} as IScientificMaterialDetails;
      this.fileList = [];
      this.selectedProgram = [];
      this.attachmentIds = [];
      this.fileUploadModel = [];
      this.resMessage = {};

    }

  }
  deleteAttachment(index: number, id: string) {
    this.fileList.splice(index, 1);
    this.attachmentIds = this.attachmentIds.filter(a => a !== id);
  }
  populateForm() {
    this.f.matrialTitleAr.setValue(this.ScientificMaterialDetails?.matrialTitleAr);
    this.f.matrialTitleEn.setValue(this.ScientificMaterialDetails?.matrialTitleEn);
    this.f.matrialCategory.setValue(this.ScientificMaterialDetails?.matrialCategory);
    this.f.fileLink.setValue(this.ScientificMaterialDetails?.fileLink);
    this.f.active.setValue(this.ScientificMaterialDetails?.active);
    this.f.availableForAllUsers.setValue(this.ScientificMaterialDetails?.availableForAllUsers);
    this.fileList = this.ScientificMaterialDetails?.matrialAttachments;
    this.ScientificMaterialDetails?.matrialAttachments.forEach(element => {
      this.attachmentIds.push(element.id);
    });
    if (!this.selectedProgram) {
      this.selectedProgram = [];
    }
    this.selectedProgramsList = this.ScientificMaterialDetails?.matrialPrograms;
    this.ScientificMaterialDetails?.matrialPrograms.forEach((pr: any) => {
      this.selectedProgram.push({
        programId: pr.id
      });
    });

    this.updateScientificMaterial.id = this.ScientificMaterialDetails.id;
  }
  get f() {
    return this.currentForm.controls;
  }

  buildForm() {
    // const engPattern ="^[a-zA-Z ()/\\\\_-]+$";
    // const arabicPattern = "^[\u0621-\u064A\u0660-\u0669 ()/\\\\_-]+$";

    // const Scientific_Material_Arabic_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}\u0621-\u064A\u0660-\u0669 0-9()/\\\\_-]+$";
    // const Scientific_Material_English_WITHOUT_EMOJI = "^[\u{1F600}\u{1F6FF}a-zA-Z 0-9()/\\\\_-]+$";

    this.currentForm = this.fb.group(
      {
        matrialTitleAr: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.Scientific_Material_Arabic_WITHOUT_EMOJI)]],
        matrialTitleEn: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(BaseConstantModel.Scientific_Material_English_WITHOUT_EMOJI)]],
        matrialCategory: ['', Validators.required],
        fileLink: [''],
        active: [false],
        availableForAllUsers: [false],
        programMatrial: [null, Validators.minLength(1)]

      });
  }
  RemoveFile(index: number) {

    this.attachmentIds.splice(index);
    //call this if we will remove the attachment from db
    // this.attachmentService.removeFile(fileId).subscribe(
    //   res=>{
    //     console.log("After Delete==>",res);
    //   },error=>{
    //     console.log(error);
    //   }
    // )
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
  selectProgram(e: any) {
    this.ScientificMaterialDetails.matrialPrograms = null;
    this.selectedProgram = [];
    var programMatrialIds = this.currentForm.get('programMatrial')?.value
    Array.from(programMatrialIds).forEach((id: any) => {
      this.selectedProgram.push({
        programId: id
      });

    });
  }
  uploadFiles(files: IFileUpload[]) {
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
        this.fileUploadModel = [];
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }
  Submit() {
    this.isSubmit = true;
    if (this.currentForm.valid) {
      if (this.selectedProgramsList.length == 0) {
        return;
      }
      this.resMessage = {};
      if (this.selectedProgramsList.length) {
        this.updateScientificMaterial.programScientificMatrial = [];
        this.addScientificMaterial.programMatrial = [];
        Array.from(this.selectedProgramsList).forEach((elm: IprogramsModel) => {

          if (this.scientificMaterialId) {
            if (this.updateScientificMaterial.programScientificMatrial) {
              this.updateScientificMaterial.programScientificMatrial.push({
                programId: elm.id
              });
            }
          }
          else {
            if (this.addScientificMaterial.programMatrial) {
              this.addScientificMaterial.programMatrial.push({
                programId: elm.id
              });
            }

          }

        });
      }
      if (this.scientificMaterialId) {
        this.updateScientificMaterial.matrialTitleAr = this.f.matrialTitleAr.value;
        this.updateScientificMaterial.matrialTitleEn = this.f.matrialTitleEn.value;
        this.updateScientificMaterial.matrialCategory = this.f.matrialCategory.value;
        this.updateScientificMaterial.fileLink = this.f.fileLink.value === '' ? null : this.f.fileLink.value;
        this.updateScientificMaterial.active = this.f.active.value;
        this.updateScientificMaterial.availableForAllUsers = this.f.availableForAllUsers.value;
        // this.updateScientificMaterial.programScientificMatrial = this.selectedProgram;
        this.updateScientificMaterial.attachmentIds = this.attachmentIds;
        this.scientifcMaterialService.UpdateScientificMaterial(this.updateScientificMaterial).subscribe(res => {
          //var response = Mapper.responseMapper(res);
          if (res.isSuccess) {
            this.isSubmit = false;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.SUCCESS_TYPE
            }
            this.refreshMaterialId.emit(Date.now().toString());
            //this.closeForm();
            this.submitSuccess?.emit(true);//close form after submitSuccess
          }
          else {
            this.isSubmit = false;

            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        },
          error => {
            console.log(error);
            this.resMessage = {
              message: error.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          })
      }
      else {

        this.addScientificMaterial.matrialTitleAr = this.f.matrialTitleAr.value;
        this.addScientificMaterial.matrialTitleEn = this.f.matrialTitleEn.value;
        this.addScientificMaterial.matrialCategory = this.f.matrialCategory.value;
        this.addScientificMaterial.fileLink = this.f.fileLink.value === '' ? null : this.f.fileLink.value;
        this.addScientificMaterial.active = this.f.active.value;
        this.addScientificMaterial.availableForAllUsers = this.f.availableForAllUsers.value;
        // this.addScientificMaterial.programMatrial = this.selectedProgram;
        this.addScientificMaterial.attachmentIds = this.attachmentIds;
        this.scientifcMaterialService.addScientificMaterial(this.addScientificMaterial).subscribe(res => {
          //var response = Mapper.responseMapper(res);
          if (res.isSuccess) {
            this.isSubmit = false;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.SUCCESS_TYPE
            }
            this.refreshMaterialId.emit(Date.now().toString());
            //this.closeForm();
            this.submitSuccess?.emit(true);//close form after submitSuccess
          }
          else {
            this.isSubmit = false;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        },
          error => {
            console.log(error);
            this.resMessage = {
              message: error.message,
              type: BaseConstantModel.DANGER_TYPE
            }
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
  addProgram() {
    if (!this.currentForm.value.programMatrial) {
        this.programMessage = {
          message: this.translate.instant('SCIENTIFIC_MATERIAL.Select_Program'),
          type: BaseConstantModel.DANGER_TYPE
        }      
      return;
    }
    this.programMessage = {};

    const exist = this.selectedProgramsList.some(el => el.id === this.currentForm.value.programMatrial)
    if (!exist) {
      if (this.programs) {
        this.selectedProgramsList.push(
          this.programs.filter(el => el.id == this.currentForm.value.programMatrial)[0]);
      }
    }
  }
  removeItemFromSelectedPrograms(item: any) {
    let index = this.selectedProgramsList.indexOf(item);
    this.selectedProgramsList.splice(index, 1);
  }

  closeForm() {
    this.submitSuccess?.emit(true);
    // setTimeout(() => {
    //   this.submitSuccess?.emit(true);
    // }, 2000);
  }
}
