import { Component, OnInit } from '@angular/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
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
  submitSuccess:any;
  showMaterialForm = false;
  constructor( private scientifcMaterialService: ScientificMaterialService) { }

  ngOnInit(): void {
    this.loadPrograms()
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

}
