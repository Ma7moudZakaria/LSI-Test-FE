import { IPrgoramCategrory } from './../../../../../core/interfaces/program-categories-interfaces/iprgoram-categrory';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';

import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramCategoriesService } from 'src/app/core/services/program-categories-services/program-categories.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-view-program-categories',
  templateUrl: './view-program-categories.component.html',
  styleUrls: ['./view-program-categories.component.scss']
})
export class ViewProgramCategoriesComponent implements OnInit {
  @Output() addEditProgramCategories = new EventEmitter<IPrgoramCategrory>()
  allPrgoramCategrorylist: IPrgoramCategrory[] = [];
  resMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService, public dialog: MatDialog,
    private programCategoriesService: ProgramCategoriesService,
    private alertify: AlertifyService,

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
        this.allPrgoramCategrorylist = res.data;
        // console.log(' this.allPrograms', this.allPrgoramCategrorylist);
        console.log('updated listttttttttt', this.allPrgoramCategrorylist);

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

  editPrgoramCategrory(event: IPrgoramCategrory) {
    this.addEditProgramCategories.emit(event)
  }



  deletePrgoramCategrory(id?: string) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this program category" : "هل متأكد من حذف هذا القسم ";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete program category' : 'حذف  القسم', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.programCategoriesService.deleteProgramCatiegories(id || '').subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(res.message || '');
            this.getAllCategories();
          }
          else {
            this.alertify.error(res.message || '');
          }
        }, error => {
          this.alertify.error(error || '');
        }
        )
      }
    });
  }
}
