import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-scientific-material',
  templateUrl: './add-scientific-material.component.html',
  styleUrls: ['./add-scientific-material.component.scss']
})
export class AddScientificMaterialComponent implements OnInit {
  materialCategoriesLookup: BaseLookupModel[] = [];
  programs: any;
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
  successMessage: any;
  errorMessage: any;
  disableSaveButtons = false;
  @Input() selectedMaterialId: any;
  constructor(private fb: FormBuilder, private scientifcMaterialService: ScientificMaterialService,
    private attachmentService: AttachmentsService,public translate : TranslateService,
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
      (res: any) => {
        this.programs = res.data as any[];

      }, error => {
        console.log(error);
      }
    );
  }
  loadMaterialCategories() {
    this.scientifcMaterialService.GetScientificMatrialCategoriesLookup().subscribe(
      (res: any) => {
        this.materialCategoriesLookup = res.data as any[];
        if (this.scientificMaterialId) {
          this.loadScientificMaterialDetails(this.scientificMaterialId);
        }

      }, error => {
        console.log(error);
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
            this.PopulateForm();

          }
        }, error => {
          console.log(error);
        })
    }
    else{
      this.currentForm.reset();
      this.scientificMaterialId= null;
      this.ScientificMaterialDetails = {} as IScientificMaterialDetails;
      this.fileList = [];      
      this.selectedProgram = [];

    }

  }
  DeleteAttachment(index: number, id: string) {
    this.fileList.splice(index, 1);
    this.attachmentIds = this.attachmentIds.filter(a => a !== id);
  }
  PopulateForm() {
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
    this.selectedProgram = this.ScientificMaterialDetails?.matrialPrograms.forEach((pr: any) => {
      this.selectedProgram.push(pr.id);
    });
    this.updateScientificMaterial.id = this.ScientificMaterialDetails.id;
  }
  get f() {
    return this.currentForm.controls;
  }

  buildForm() {
    const arabicPattern = '^[\u0600-\u06FF\\\\()-/_]+$';
    const engPattern = '^[a-zA-Z()-\\\\/_]+$';
    this.currentForm = this.fb.group(
      {
        matrialTitleAr: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(arabicPattern)]],
        matrialTitleEn: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(engPattern)]],
        matrialCategory: ['', Validators.required],
        fileLink: [''],
        active: [false],
        availableForAllUsers: [false],
        programMatrial: []

      });
  }
  RemoveFile(index: any) {

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

  onFileChange(files?: FileList) {
    if (files) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1, // need to be changed based on file type
          file: element

        }
        this.fileUploadModel.push(fileUploadObj)
      });
      this.UploadFiles(this.fileUploadModel);
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
  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.attachmentIds.push(elm.id);
          this.fileList.push(elm);

        })
      }, error => {
        console.log(error);
      }
    )
  }
  Submit() {
    this.isSubmit = true;


    if (this.scientificMaterialId) {
      this.updateScientificMaterial.matrialTitleAr = this.f.matrialTitleAr.value;
      this.updateScientificMaterial.matrialTitleEn = this.f.matrialTitleEn.value;
      this.updateScientificMaterial.matrialCategory = this.f.matrialCategory.value;
      this.updateScientificMaterial.fileLink = this.f.fileLink.value === '' ? null : this.f.fileLink.value;
      this.updateScientificMaterial.active = this.f.active.value;
      this.updateScientificMaterial.availableForAllUsers = this.f.availableForAllUsers.value;
      this.updateScientificMaterial.programScientificMatrial = this.selectedProgram;
      this.updateScientificMaterial.attachmentIds = this.attachmentIds;
      this.scientifcMaterialService.UpdateScientificMaterial(this.updateScientificMaterial).subscribe(res => {
        //var response = Mapper.responseMapper(res);
        if (res.isSuccess) {
          this.isSubmit = false;
          this.successMessage={
            message:res.message,
            type:'success'
          }
        }
      },
        error => {
          console.log(error);
          this.errorMessage={
            message:error.message,
            type:'danger'
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
      this.addScientificMaterial.programMatrial = this.selectedProgram;
      this.addScientificMaterial.attachmentIds = this.attachmentIds;
      this.scientifcMaterialService.addScientificMaterial(this.addScientificMaterial).subscribe(res => {
        //var response = Mapper.responseMapper(res);
        if (res.isSuccess) {
          this.isSubmit = false;
          this.successMessage={
            message:res.message,
            type:'success'
          }
        }
      },
        error => {
          console.log(error);
          this.errorMessage={
            message:error.message,
            type:'danger'
          }
        });
    }

  }

}
