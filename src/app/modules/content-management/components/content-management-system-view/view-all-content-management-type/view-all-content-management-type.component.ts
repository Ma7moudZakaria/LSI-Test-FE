import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-view-all-content-management-type',
  templateUrl: './view-all-content-management-type.component.html',
  styleUrls: ['./view-all-content-management-type.component.scss']
})
export class ViewAllContentManagementTypeComponent implements OnInit {
  cmsTypeLst?: BaseLookupModel[];
  @Output() selectedcmsTypeId = new EventEmitter<string>();;
  langEnum = LanguageEnum;
  constructor(private contentmanagementService:ContentManagementService,public translate : TranslateService) { }

  ngOnInit(): void {
this.loadContentManagementSystemTypes();
  }
  loadContentManagementSystemTypes() {
    this.contentmanagementService.getAllContentManagementSystemTypes().subscribe(
      (res: any) => {
        this.cmsTypeLst = res.data as BaseLookupModel[];
        this.loadContentManagementSystem(this.cmsTypeLst[0].id);
        this.selectedIndex=0;

      }, error => {
        console.log(error);
      }
    );
  }
  selectedIndex:any;
  loadContentManagementSystem(id?:any){
    this.selectedcmsTypeId?.emit(id);
  } 
}
