import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IContentManagementCreat } from 'src/app/core/interfaces/content-management-interfaces/icontent-management-creat';
import { IContentManagementUpdate } from 'src/app/core/interfaces/content-management-interfaces/icontent-management-update';
import { IContentManagement } from 'src/app/core/interfaces/content-management-interfaces/icontentmanagement';
import { IContentManagementDetails } from 'src/app/core/interfaces/content-management-interfaces/icontentmanagementdetails';
import { IContentManagementFilter } from 'src/app/core/interfaces/content-management-interfaces/icontentmanagementfilter';
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
  contentmanagementsystem: IContentManagement={};
  createCMS = false;
  updateCMS = false;
  errorMessage:any;
  contentManagementId!: string;
  routeParams: any;
  // cmsType!: IContentManagementFilter;
  isSubmit = false;
  @Input() selectedcmsTypeId?: string;
  currentForm: FormGroup=new FormGroup({});
  resultMessage:BaseMessageModel = {};
  disableSaveButtons = false;
  valueLang = "nameAr";
  cmsId?:string='';
  isAdd:boolean=true;
  typeId?:string='';
  contentmanagementsystemUpdate: IContentManagementUpdate={};
  contentmanagementCreat:IContentManagementCreat={};
  constructor(
    private route: ActivatedRoute, private fb: FormBuilder,
    private contentmanagementService:ContentManagementService,
    public translate: TranslateService) {
      this.valueLang = this.translate.currentLang == 'en-US' ? 'nameEn' : 'nameAr';
  }

  ngOnInit(){    

    this.currentForm.reset();
    this.disableSaveButtons = false;
    this.resultMessage = {
      message:'',
      type: ''
    }
 // this.selectedcmsTypeId||undefined;
      if (this.selectedcmsTypeId!== undefined) {
        this.isAdd=false;
        this.loadContentManagementSystemByType()
      }
       else  {
        this.isAdd=true;
        this.currentForm.reset();
      }
      this.buildForm();
  }
  ngOnChanges(changes: any) {
    this.currentForm.reset();
    //this.cmsType.typeId=this.selectedcmsTypeId||"";
    if (this.selectedcmsTypeId!== "") {
      this.isAdd=false;
      this.loadContentManagementSystemByType()
    }
     else  {
      this.isAdd=true;
      this.currentForm.reset();
    }
   this.disableSaveButtons = false;
   this.resultMessage = {
     message:'',
     type: ''
   }
  }



  get f() {
    return this.currentForm?.controls;
  }
  buildForm() {
    this.currentForm = this.fb.group(
      {
        shortDescriptionAr: ['', Validators.required],
        shortDescriptionEn: ['', Validators.required],
        longDescriptionAr: ['', Validators.required],
        longDescriptionEn: ['', Validators.required],
        typeId: ['', Validators.required]
      }
    )
  }
  
  loadContentManagementSystemByType() {
    if(this.selectedcmsTypeId!==undefined){
      this.cmsId="";
      this.contentmanagementsystem={};
      this.contentmanagementService.getContentManagementSystemByTypeCms(this.selectedcmsTypeId).subscribe(res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.contentmanagementsystem  = response.data;
          if(response.data!==null){
            this.cmsId=this.contentmanagementsystem.id;
            if(this.cmsId!=''){this.isAdd=false;}else{this.isAdd=true;}
            this.f.shortDescriptionAr.setValue(this.contentmanagementsystem.shortDesAr);
            this.f.shortDescriptionEn.setValue(this.contentmanagementsystem.shortDesEn);
            this.f.longDescriptionAr.setValue(this.contentmanagementsystem.longDesAr);
            this.f.longDescriptionEn.setValue(this.contentmanagementsystem.longDesEn);

          }
         
         // this.f.typeId.setValue(this.contentmanagementsystem.typeId);
          this.disableSaveButtons = false;
          this.resultMessage = {
            message:'',
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
      message:'',
    }
    // if (this.cmsId) {   
    //   this.contentmanagementsystemUpdate.id=this.cmsId;
    //   this.contentmanagementsystemUpdate.no=this.contentmanagementsystem.no;
    //   this.contentmanagementsystemUpdate.shortDesAr=this.f.shortDescriptionAr.value;
    //   this.contentmanagementsystemUpdate.shortDesEn=this.f.shortDescriptionEn.value; 
    //   this.contentmanagementsystemUpdate.longDesAr=this.f.longDescriptionAr.value;
    //   this.contentmanagementsystemUpdate.longDesEn=this.f.longDescriptionEn.value;
    //   this.contentmanagementsystemUpdate.cmsType=this.selectedcmsTypeId;
   
    //   this.contentmanagementService.updateContentManagementSystem(this.contentmanagementsystemUpdate).subscribe(res => {
    //     if (res.isSuccess) {
    //       this.isSubmit = false;
    //       this.disableSaveButtons = true;
    //       this.resultMessage = {
    //         message:res.message||"",
    //         type: 'success'
    //       }
    //     }
    //     else {
    //       this.disableSaveButtons = false;
    //       this.resultMessage = {
    //         message:res.message||"",
    //         type: 'danger'
    //       }
    //     }
        
    //   },
    //     error => {
          
    //     })
    // }
    // else {
      this.contentmanagementCreat.shortDesAr=this.f.shortDescriptionAr.value;
      this.contentmanagementCreat.shortDesEn=this.f.shortDescriptionEn.value; 
      this.contentmanagementCreat.longDesAr=this.f.longDescriptionAr.value;
      this.contentmanagementCreat.longDesEn=this.f.longDescriptionEn.value;
      this.contentmanagementCreat.cmsType=this.selectedcmsTypeId;
      this.contentmanagementService.createContentManagementSystem(this.contentmanagementCreat).subscribe(res => {
        this.isSubmit = false;
        if (res.isSuccess) {
          this.disableSaveButtons = true;
          this.resultMessage = {
            message:res.message||"",
            type: BaseConstantModel.SUCCESS_TYPE
          }
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
 // }


}