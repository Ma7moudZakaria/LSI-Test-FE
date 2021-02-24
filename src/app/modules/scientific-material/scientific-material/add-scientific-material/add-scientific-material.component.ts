import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/core/interfaces/attachments-interfaces/file-upload';
import { Lookup } from 'src/app/core/interfaces/lookup/lookup';
import { AddScientificMaterial } from 'src/app/core/interfaces/scientific-material/add-scientifimaterial';
import { ScientificMaterialDetails } from 'src/app/core/interfaces/scientific-material/scientific-material-details';
import { UpdateScientificMaterial } from 'src/app/core/interfaces/scientific-material/update-scientific-material';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-add-scientific-material',
  templateUrl: './add-scientific-material.component.html',
  styleUrls: ['./add-scientific-material.component.scss']
})
export class AddScientificMaterialComponent implements OnInit {
  materialCategoriesLookup: Lookup[] = [];
  programs: any;
  Title?: string;
  ScientificMaterialId?: string ;
  CurrentForm: FormGroup;
  attachmentIds: string[] = [];
  fileToUpload?: File;
  isSubmit = false;
  fileUploadModel :FileUpload[] =[];
  AddScientificMaterial!: AddScientificMaterial;
  UpdateScientificMaterial!: UpdateScientificMaterial;
  ScientificMaterialDetails!: ScientificMaterialDetails;
  constructor(private fb: FormBuilder, private scientifcMaterialService: ScientificMaterialService,
      private attachmentService: AttachmentsService,
      private activeroute: ActivatedRoute, private router: Router) { 
    }

  ngOnInit(): void {
    this.loadMaterialCategories();
    // this.loadPrograms();
    if (this.activeroute.snapshot.paramMap.get('id') != null) {
      this.Title = "Edit Employee";
      this.ScientificMaterialId = (this.activeroute.snapshot.paramMap.get('id') || undefined);
      // this.loadParentDetails();
    } else {
      this.Title = "Add Employee";
    }
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
        if (this.ScientificMaterialId) {
          this.loadScientificMaterialDetails();
        }

      }, error => {
        console.log(error);
      }
    );
  }
  loadScientificMaterialDetails(){
    this.scientifcMaterialService.getScientificMaterial(this.ScientificMaterialId).subscribe(
      res => {
        if (res.isSuccess) {
          this.ScientificMaterialDetails = res.data;
          this.PopulateForm();

        }
      }, error => {
        console.log(error);
      })
  }
  PopulateForm() {
    this.f.matrialTitleAr.setValue(this.ScientificMaterialDetails?.matrialTitleAr);
    this.f.matrialTitleEn.setValue(this.ScientificMaterialDetails?.matrialTitleEn);
    this.f.matrialCategory.setValue(this.ScientificMaterialDetails?.matrialCategory);
    this.f.fileLink.setValue(this.ScientificMaterialDetails?.fileLink);
    this.f.active.setValue(this.ScientificMaterialDetails?.active);
    this.f.availableForAllUsers.setValue(this.ScientificMaterialDetails?.availableForAllUsers);
     this.ScientificMaterialDetails?.matrialAttachments.forEach(element => {
      this.attachmentIds.push(element.id); 
     });
    
  }
  get f() {
    return this.CurrentForm.controls;
  }

  buildForm() {
    const arabicPattern = '^[\u0600-\u06FF\\\\()-/_]+$';
    const engPattern = '^[a-zA-Z()-\\\\/_]+$';
    this.CurrentForm = this.fb.group(
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
  RemoveFile(index:any){

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
   
    Array.from(files).forEach(element => {
       var  fileUploadObj :FileUpload = {
         containerNameIndex : 1, // need to be changed based on file type
         file : element
          
       }
      this.fileUploadModel.push(fileUploadObj)
    });
    this.UploadFiles(this.fileUploadModel);
  }

  UploadFiles(files:any) {
    if (files.length === 0) {
      return;
    }   
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        this.attachmentIds.push(res.data.id);
      }, error => {
        console.log(error);
      }
    )
  }
  Submit() {
    this.isSubmit = true;
    

      if (this.ScientificMaterialId) {
        this.UpdateScientificMaterial.matrialTitleAr = this.f.matrialTitleAr.value;
        this.UpdateScientificMaterial.matrialTitleEn = this.f.matrialTitleEn.value;
        this.UpdateScientificMaterial.matrialCategory = this.f.matrialCategory.value;
        this.UpdateScientificMaterial.fileLink = this.f.fileLink.value === '' ? null: this.f.fileLink.value;
        this.UpdateScientificMaterial.active = this.f.active.value;
        this.UpdateScientificMaterial.availableForAllUsers = this.f.availableForAllUsers.value;
        // this.UpdateScientificMaterial.programScientificMatrial = this.programs;
        this.UpdateScientificMaterial.attachmentIds = this.attachmentIds;
        this.scientifcMaterialService.UpdateScientificMaterial(this.UpdateScientificMaterial).subscribe(res => {
          //var response = Mapper.responseMapper(res);
          if (res.isSuccess) {
            this.isSubmit = false;
          }
        },
        error => {
          console.log(error);
        })
      }
      else{
        this.AddScientificMaterial.matrialTitleAr = this.f.matrialTitleAr.value;
        this.AddScientificMaterial.matrialTitleEn = this.f.matrialTitleEn.value;
        this.AddScientificMaterial.matrialCategory = this.f.matrialCategory.value;
        this.AddScientificMaterial.fileLink = this.f.fileLink.value === '' ? null: this.f.fileLink.value;
        this.AddScientificMaterial.active = this.f.active.value;
        this.AddScientificMaterial.availableForAllUsers = this.f.availableForAllUsers.value;
        // this.AddScientificMaterial.programMatrial = this.programs;
        this.AddScientificMaterial.attachmentIds = this.attachmentIds;
        this.scientifcMaterialService.addScientificMaterial(this.AddScientificMaterial).subscribe(res => {
          //var response = Mapper.responseMapper(res);
          if (res.isSuccess) {
            this.isSubmit = false;
          }
        },
        error => {
          console.log(error);
        });
      }

  }

}
