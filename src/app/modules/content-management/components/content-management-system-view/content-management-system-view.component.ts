import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-content-management-system-view',
  templateUrl: './content-management-system-view.component.html',
  styleUrls: ['./content-management-system-view.component.scss']
})
export class ContentManagementSystemViewComponent implements OnInit {

  LangEnum = LanguageEnum ;
  selectedcmsTypeId={id:'',nameAr:'',nameEn:''};
  constructor( private contentManagementService: ContentManagementService,
    private languageService: LanguageService,
    public translate: TranslateService) { }
  ngOnInit(): void {
    // this.loadPrograms()
    this.setCurrentLang();
  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('CONTENT_MANEGMENT_SYSTEM.TITLE'));
  }
 
  setSelectedCmsType(event:any){
    this.selectedcmsTypeId={id:event.id,nameAr:event.nameAr,nameEn:event.nameEn}
  }

}
