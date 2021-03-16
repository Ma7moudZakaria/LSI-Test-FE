import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IScientificMaterialFilter } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-filter';
import { IScientificMaterialGrid } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-grid';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
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
  materialCategoires: BaseLookupModel[] = [];
  LangEnum = LanguageEnum;
  selectedCategories: string[] = [];
  resMessage: BaseMessageModel = {};
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
      (res: BaseResponseModel) => {
        this.materials = res.data as IScientificMaterialGrid[];

      }, error => {
        console.log(error);
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
        this.clearMessage();
      })
  }
  loadMaterial(materialId?: string) {
    this.materialId?.emit(materialId);
  }

  deleteMaterial(materialId?: any) {
    this.scientifcMaterialService.DeleteScientificMatrial(materialId).subscribe(
      (res: BaseResponseModel) => {
        this.resMessage = {
          message: res.message,
          type: BaseConstantModel.SUCCESS_TYPE
        }
        this.clearMessage();
        this.loadProgramMaterial();
      }, error => {
        console.log(error);
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
        this.clearMessage();
      })
  }

  loadMaterialCategories() {

    this.scientifcMaterialService.GetScientificMatrialCategoriesLookup().subscribe(
      (res: BaseResponseModel) => {
        this.materialCategoires = res.data as BaseLookupModel[];
      }, error => {
        this.resMessage = {
          message: error.message,
          type: BaseConstantModel.DANGER_TYPE
        }
        this.clearMessage();
      }
    );
  }
  changeCategory(categoryId?: string) {
    if (categoryId) {
      if (this.selectedCategories?.includes(categoryId)) {

        this.selectedCategories.splice(this.selectedCategories.indexOf(categoryId), 1)
      } else {
        this.selectedCategories.push(categoryId);

      }
    }
    this.materialFilter.categoryIds = this.selectedCategories.length > 0 ? this.selectedCategories.join() : undefined;
    this.loadProgramMaterial();
  }

  clearMessage() {
    setTimeout(() => {
      this.resMessage = {};
    }, 2000);
  }

}
