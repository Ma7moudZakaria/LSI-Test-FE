import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-scientific-material-view',
  templateUrl: './scientific-material-view.component.html',
  styleUrls: ['./scientific-material-view.component.scss']
})
export class ScientificMaterialViewComponent implements OnInit {
  LangEnum = LanguageEnum ;
  programs: any;
  selectedMaterialId:any;
  selectedProgram?:IprogramsModel;
  refreshMaterialId?:string;
  submitSuccess:any;
  showMaterialForm = false;
  constructor( private scientifcMaterialService: ScientificMaterialService,
    private languageService: LanguageService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.loadPrograms();
    this.setCurrentLang();
  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SCIENTIFIC_MATERIAL.TITLE'));
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
  // addNewMaterial(){
  //   this.selectedMaterialId = null;
  // }
  loadSelectedMateial(event:any){
   this.selectedMaterialId = event;
   this.showMaterialForm =true;
  }

  closeMaterialForm(){
    this.showMaterialForm = false;
  }

  setSelectedProgram(event:any){
    this.selectedProgram = event;
  }

  closeMaterialFormAfterSave(event:any){
    this.submitSuccess = event; 
    this.showMaterialForm = !event;

  }
  setrefreshMaterialId(event:any){
    this.refreshMaterialId = event;
  }
}
