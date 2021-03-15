import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IScientificMaterialFilter } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-filter';
import { IScientificMaterialGrid } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-grid';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  materials: IScientificMaterialGrid[] = [];
  materialFilter = {} as IScientificMaterialFilter
  @Input() selectedProgramId?: string;
  @Output() materialId = new EventEmitter<string>();
  langEnum = LanguageEnum;
  materialCategoires : BaseLookupModel [] =[];
  LangEnum = LanguageEnum ;
  constructor(private scientifcMaterialService: ScientificMaterialService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.loadMaterialCategories();
    this.loadProgramMaterial();
  }
  ngOnChanges(changes: any) {
    console.log(changes);
    this.materialFilter.programs = changes.selectedProgramId.currentValue;
    this.loadProgramMaterial();
  }
  loadProgramMaterial() {
    this.materialFilter.skip = 0;
    this.materialFilter.take = 10;    
    this.scientifcMaterialService.getScientificMateriaFilter(this.materialFilter).subscribe(
      (res: any) => {
        this.materials = res.data as IScientificMaterialGrid[];

      }, error => {
        console.log(error);
      })
  }
  loadMaterial(materialId?: any) {
    this.materialId?.emit(materialId);
  }

  deleteMaterial(materialId?: any) {
    this.scientifcMaterialService.DeleteScientificMatrial(materialId).subscribe(
      (res: any) => {
        console.log(res.data);
      }, error => {
        console.log(error);
      })
  }
  
  loadMaterialCategories() {
    
    this.scientifcMaterialService.GetScientificMatrialCategoriesLookup().subscribe(
      (res: any) => {
        this.materialCategoires = res.data as any[];        
      }, error => {
        console.log(error);
      }
    );
  }
  changeCategory(categoryId?:string){
    this.materialFilter.categoryId =categoryId;
    this.loadProgramMaterial();
  }

}
