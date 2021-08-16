import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IAddProgramCategory } from 'src/app/core/interfaces/program-categories-interfaces/iadd-program-category';
import { IEditProgramCategory } from 'src/app/core/interfaces/program-categories-interfaces/iedit-program-category';
import { IPrgoramCategrory } from 'src/app/core/interfaces/program-categories-interfaces/iprgoram-categrory';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ProgramCategoriesService } from 'src/app/core/services/program-categories-services/program-categories.service';

@Component({
  selector: 'app-add-program-categories',
  templateUrl: './add-program-categories.component.html',
  styleUrls: ['./add-program-categories.component.scss']
})
export class AddProgramCategoriesComponent implements OnInit {

  @Output() addEditProgramCategories = new EventEmitter<IPrgoramCategrory>();
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Input() modelEdit: IPrgoramCategrory | undefined;

  programCategoryModel = {} as IPrgoramCategrory;
  model: IAddProgramCategory | undefined;
  editProgramCategoryModel: IEditProgramCategory | undefined;
  listProgramCategporyList: IAddProgramCategory[] = [];
  resMessage: BaseMessageModel = {};

  constructor(
    private programCategoriesService: ProgramCategoriesService,
    private alertify: AlertifyService

  ) { }

  ngOnInit(): void {
    // in case edit form 
    if (this.modelEdit) {
      this.populatData();
      // console.log("modelEdit", this.modelEdit)

      // console.log("programCategoryModel", this.programCategoryModel)
    }
  }

  saveProgramCategories() {

    this.model =
    {
      arabCatgName: this.programCategoryModel.arCatName,
      engCatgName: this.programCategoryModel.enCatName

    }
    this.programCategoriesService.addProgramCatiegories(this.model).subscribe(res => {
      if (res.isSuccess) {

        this.alertify.success(res.message || '');
        this.closeForm()
      } else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  closeForm() {
    this.closeOverlay.emit(false)
  }

  populatData() {
    this.programCategoryModel = {
      id: this.modelEdit?.id,
      arCatName: this.modelEdit?.arCatName,
      enCatName: this.modelEdit?.enCatName,
    }
  }

  savingInEdit() {
    this.editProgramCategoryModel =
    {
      id: this.programCategoryModel.id,
      arabCatgName: this.programCategoryModel.arCatName,
      engCatgName: this.programCategoryModel.enCatName

    }
    this.programCategoriesService.updateProgramCatiegories(this.editProgramCategoryModel).subscribe(res => {
      if (res.isSuccess) {

        this.alertify.success(res.message || '');
        this.closeForm()
      } else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }


}
