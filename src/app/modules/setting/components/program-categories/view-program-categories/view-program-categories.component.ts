import { IProgramCategories } from './../../../../../core/interfaces/program-categories-interfaces/iprgoram-categrory';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';

import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramCategoriesService } from 'src/app/core/services/program-categories-services/program-categories.service';

@Component({
  selector: 'app-view-program-categories',
  templateUrl: './view-program-categories.component.html',
  styleUrls: ['./view-program-categories.component.scss']
})
export class ViewProgramCategoriesComponent implements OnInit {
  @Output() addEditProgramCategories = new EventEmitter<IProgramCategories>()
  allPrgoramCategrorylist: IProgramCategories[] = [];
  resMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService,
    private programCategoriesService: ProgramCategoriesService

  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  AddCategories() {
    this.addEditProgramCategories.emit()
  }


  getAllCategories() {
    this.programCategoriesService.getProgramCatiegories().subscribe(res => {
      if (res.isSuccess) {
        console.log('updated listttttttttt');
        this.allPrgoramCategrorylist = res.data;
        // console.log(' this.allPrograms', this.allPrgoramCategrorylist);
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
  };
  editPrgoramCategrory(event: IProgramCategories) {
    this.addEditProgramCategories.emit(event)
  }
}
