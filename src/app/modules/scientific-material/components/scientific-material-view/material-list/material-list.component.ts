import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { MaterialCategoiresEnum } from 'src/app/core/enums/material-category-enum.enum';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { IScientificMaterialFilter } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-filter';
import { IScientificMaterialGrid } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-grid';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  materials: IScientificMaterialGrid[] = [];
  materialFilter = {} as IScientificMaterialFilter
  @Input() selectedProgram?: IprogramsModel;
  @Input() refreshMaterialId?: string;

  @Output() materialId = new EventEmitter<string>();
  langEnum = LanguageEnum;
  materialCategoires: BaseLookupModel[] = [];
  selectedCategories: string[] = [];
  resMessage: BaseMessageModel = {};
  selectedProgramName: string = '';
  program = {} as IprogramsModel;
  categoriesEnum = MaterialCategoiresEnum;
  constructor(private scientifcMaterialService: ScientificMaterialService,
    private dialog: MatDialog,
    public translate: TranslateService,
    public roleService:RoleManagementService) { }

  ngOnInit(): void {
   this.loadMaterialCategories();

  //  this.loadProgramMaterial();
  }
  ngOnChanges(changes: any) {

    if (changes.selectedProgram) {
      this.materialFilter.programs = changes.selectedProgram?.currentValue?.id;
      this.materialFilter.isAvailableForAll = this.materialFilter.programs === undefined;
      this.program = changes.selectedProgram?.currentValue;
    }
    else if (changes.refreshMaterialId)
      this.refreshMaterialId = changes.refreshMaterialId.currentValue;
else{this.materialFilter.programs =""}
    this.loadProgramMaterial();
    
  

  }
  loadProgramMaterial() {
    this.materialFilter.skip = 0;
    this.materialFilter.take = 2147483647;
    if( this.materialFilter.programs !=""){
      this.scientifcMaterialService.getScientificMateriaFilter(this.materialFilter).subscribe(
        (res: BaseResponseModel) => {
          this.materials = res.data as IScientificMaterialGrid[];
  
        }, error => {
          // console.log(error);
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
          this.clearMessage();
        })
    }
    else{  this.materials=[]}
   
  }
  loadMaterial(materialId?: string) {
    this.materialId?.emit(materialId);
  }

  deleteMaterial(materialId?: any) {
    this.scientifcMaterialService.DeleteScientificMatrial(materialId).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.SUCCESS_TYPE
          }
        }
        else {
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
        this.clearMessage();
        this.loadProgramMaterial();
      }, error => {
        // console.log(error);
        this.resMessage = {
          message: error,
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
          message: error,
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

  result: string = '';
  async confirmDialog(id?: string) {
    const confirm = this.translate.instant('SCIENTIFIC_MATERIAL.Confirm_Delete');
    const message = this.translate.instant('SCIENTIFIC_MATERIAL.Delete_Message');

    const dialogData = new ConfirmDialogModel(confirm, message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult == true) {
        this.deleteMaterial(id);

      }

    });
  }
}
