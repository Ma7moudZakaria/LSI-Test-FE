import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-view-all-content-management-type',
  templateUrl: './view-all-content-management-type.component.html',
  styleUrls: ['./view-all-content-management-type.component.scss']
})
export class ViewAllContentManagementTypeComponent implements OnInit {
  cmsTypeLst?: BaseLookupModel[];
  @Output() selectedcmsTypeId = new EventEmitter<{}>();;
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};

  constructor(private contentmanagementService:ContentManagementService,public translate : TranslateService) { }

  ngOnInit(): void {
this.loadContentManagementSystemTypes();
  }
  loadContentManagementSystemTypes() {
    this.contentmanagementService.getAllContentManagementSystemTypes().subscribe(
      (res: any) => {
        this.cmsTypeLst = res.data as BaseLookupModel[];
        this.loadContentManagementSystem(this.cmsTypeLst[0].id,this.cmsTypeLst[0].nameAr,this.cmsTypeLst[0].nameEn);
        this.selectedIndex=0;

      },
      error => {
        this.resMessage ={
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  selectedIndex?:Number|0;
  loadContentManagementSystem(id?:string,nameAr?:string,nameEn?:string){
    this.selectedcmsTypeId?.emit({id:id,nameAr:nameAr,nameEn:nameEn});
  } 
}
