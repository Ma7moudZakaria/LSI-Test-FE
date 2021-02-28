import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IContentManagement } from 'src/app/core/interfaces/content-management-interfaces/icontentmanagement';
import { IContentManagementFilter } from 'src/app/core/interfaces/content-management-interfaces/icontentmanagementfilter';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-content-management-system',
  templateUrl: './content-management-system.html',
  styleUrls: ['./content-management-system.scss']
})

export class ContentManagementSystemComponent implements OnInit {
  ContentManagementSystemForm!: FormGroup;
  contentmanagementsystem!: IContentManagement;
  createCMS = false;
  updateCMS = false;
  errorMessage:any;
  contentManagementId!: string;
  RouteParams: any;
  CMSType!: IContentManagementFilter;
  isSubmit = false;

  constructor(
    private route: ActivatedRoute, private fb: FormBuilder,
    private contentmanagementService:ContentManagementService) {
  }

  ngOnInit(){      
      // Send Type Id as a parameter
      this.CMSType.typeId = this.route.snapshot.params.id;

      if (this.RouteParams === '/content-management/create-content-management-system') {
          this.createCMS = true;
          this.updateCMS = false;
      } else if (this.RouteParams.includes('/user/update-content-management-system') && this.CMSType) {
          this.contentmanagementService.getContentManagementSystemByType(this.CMSType).subscribe(cms => {
            this.contentmanagementsystem = cms.data;
          })
          this.createCMS = false;
          this.updateCMS = true;
      }
  }

  onSubmit(form: NgForm) {
    this.isSubmit = true;
    this.mappModel(form);

    if (this.updateCMS) {
      this.contentmanagementService.updateContentManagementSystem(this.contentmanagementsystem).subscribe(
        cms => {
            this.isSubmit = true;
        }
      );
    }
    else {
      this.contentmanagementService.createContentManagementSystem(this.contentmanagementsystem).subscribe(
        cms => {
            this.isSubmit = true;
        }
      );
    }
  }

  mappModel(form: NgForm) {
    this.contentmanagementsystem.shortDescriptionAr = form.value.shortDescriptionAr;
    this.contentmanagementsystem.shortDescriptionEn = form.value.shortDescriptionEn;
    this.contentmanagementsystem.longDescriptionAr = form.value.longDescriptionAr;
    this.contentmanagementsystem.longDescriptionEn = form.value.longDescriptionEn;
    this.contentmanagementsystem.typeId = form.value.typeId;
  }

  get f() {
    return this.ContentManagementSystemForm.controls;
  }

  buildForm() {
    this.ContentManagementSystemForm = this.fb.group(
      {
        shortDescriptionAr: ['', Validators.required],
        shortDescriptionEn: ['', Validators.required],
        longDescriptionAr: ['', Validators.required],
        longDescriptionEn: ['', Validators.required],
        typeId: ['', Validators.required]
      }
    )
  }

  PopulateForm() {
    this.f.shortDescriptionAr.setValue(this.contentmanagementsystem.shortDescriptionAr);
    this.f.shortDescriptionEn.setValue(this.contentmanagementsystem.shortDescriptionEn);
    this.f.longDescriptionAr.setValue(this.contentmanagementsystem.longDescriptionAr);
    this.f.longDescriptionEn.setValue(this.contentmanagementsystem.longDescriptionEn);
    this.f.typeId.setValue(this.contentmanagementsystem.typeId);
  }
}