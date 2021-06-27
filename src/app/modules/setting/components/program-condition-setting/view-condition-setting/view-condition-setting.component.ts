import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { IDetailsProgramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/idetails-program-predefined-custom-conditions-model';
import { IConditionModel } from 'src/app/core/interfaces/setting/icondition-model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-view-condition-setting',
  templateUrl: './view-condition-setting.component.html',
  styleUrls: ['./view-condition-setting.component.scss']
})
export class ViewConditionSettingComponent implements OnInit {

  @Output() openCoiditionFrom = new EventEmitter<boolean>();
  predefineConditionsList: IprogramPredefinedCustomConditionsModel[] = [];
  @Input() customConditionsList: IprogramPredefinedCustomConditionsModel[] = [];
  @Output() editCondition = new EventEmitter<IprogramPredefinedCustomConditionsModel>();


  programPredefinedEnum = programPredefinedConditionsEnum;
  getCustomConditionsList: IConditionModel[] = [];

  constructor
    (
      public programConditionsService: ProgramConditionsService,
      public dialog: MatDialog,
      public translate: TranslateService,
      private alertify: AlertifyService,

  ) { }

  ngOnInit(): void {
    this.getProgramConditionsLis();
  }
  AddConditions() {
    this.openCoiditionFrom.emit(true)
  }
  getProgramConditionsLis() {
    this.programConditionsService.getProgramConditionsList().subscribe(res => {
      let allItems = res.data as IprogramPredefinedCustomConditionsModel[];

      this.predefineConditionsList = allItems.filter(i => !i.isCustom);
      this.customConditionsList = allItems.filter(i => i.isCustom);

      this.customConditionsList.forEach(element => {
        element.conditionModel = JSON.parse(element.conditionJson || "{}")
      });


    });
  }



  editCustomConditions(event: IprogramPredefinedCustomConditionsModel) {
    this.editCondition.emit(event);
  }
  // delete custom card

  deleteCustomCard(id: string) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this custom conditions" : "هل متأكد من حذف هذا الشرط ";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete conditions' : 'حذف  الشرط', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.programConditionsService.deleteProgramPredefinedCustomConditions(id || '').subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(res.message || '');
            this.getProgramConditionsLis();
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
