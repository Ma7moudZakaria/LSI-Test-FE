import { Component, OnInit } from '@angular/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-content-management-system-view',
  templateUrl: './content-management-system-view.component.html',
  styleUrls: ['./content-management-system-view.component.scss']
})
export class ContentManagementSystemViewComponent implements OnInit {

  LangEnum = LanguageEnum ;
  selectedcmsTypeId={id:'',nameAr:'',nameEn:''};
  constructor( private contentManagementService: ContentManagementService) { }
  ngOnInit(): void {
    // this.loadPrograms()
  }
 
  setSelectedCmsType(event:any){
    this.selectedcmsTypeId={id:event.id,nameAr:event.nameAr,nameEn:event.nameEn}
  }

}
