import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IAddEditProgramCategory } from 'src/app/core/interfaces/program-categories-interfaces/iadd-program-category';
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
  @Input() editModel: IPrgoramCategrory | undefined;

  programCategoryModel = {} as IPrgoramCategrory;
  model: IAddEditProgramCategory | undefined;
  listProgramCategporyList: IAddEditProgramCategory[] = [];
  resMessage: BaseMessageModel = {};

  constructor(
    private programCategoriesService: ProgramCategoriesService,
    private alertify: AlertifyService

  ) { }

  ngOnInit(): void {
    // in case edit form 
    if (this.editModel) {
      this.populatData();
      // console.log("editModel", this.editModel)

      // console.log("programCategoryModel", this.programCategoryModel)
    }
  }

  saveProgramCategories() {
    // fill model
    this.model =
    {
      arabCatgName: this.programCategoryModel.arCatName,
      engCatgName: this.programCategoryModel.enCatName

    }
    // 2-send to api in add
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
  // case edit
  // 1-populate data in form 
  populatData() {
    this.programCategoryModel = {
      id: this.editModel?.id,
      arCatName: this.editModel?.arCatName,
      enCatName: this.editModel?.enCatName,
    }
  }
  // 2-send update input in form 

  savingInEdit() {
    // 1-fill model
    this.model =
    {
      id: this.programCategoryModel.id,
      arabCatgName: this.programCategoryModel.arCatName,
      engCatgName: this.programCategoryModel.enCatName

    }
    // 2-send to api in edit
    this.programCategoriesService.updateProgramCatiegories(this.model).subscribe(res => {
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

}
