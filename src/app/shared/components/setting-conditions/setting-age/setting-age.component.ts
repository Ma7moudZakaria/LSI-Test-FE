import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IProgramPredefinedCoditionsSingle } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-coditions-single';
import { IUpdateProgramConditionDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ProgramConditionViewMoodEnum } from 'src/app/core/enums/programs/program-condition-view-mood-enum.enum';


@Component({
  selector: 'app-setting-age',
  templateUrl: './setting-age.component.html',
  styleUrls: ['./setting-age.component.scss']
})
export class SettingAgeComponent implements OnInit {
  @Output() progIdToLoadProgCond = new EventEmitter<string>();
  @Input() programConditionsModel: IProgramConditionsModel = {};
  @Input() ViewprogCondmood: number = ProgramConditionViewMoodEnum.conditionSettingViewMood;
  ageModel: IProgramPredefinedCoditionsSingle = {};// IProgCondPredefinedNumerical = {};
  resultMessage: BaseMessageModel = {};
  updateProgramConditionDetailsModel: IUpdateProgramConditionDetailsModel = {};
  result: string = '';
  programConditionViewMoodEnum=ProgramConditionViewMoodEnum;
  
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService: ProgramConditionsService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    this.ageModel = JSON.parse(this.programConditionsModel.progCondValue || '{}') || {};
    this.ageModel.id = this.programConditionsModel.id;
    this.ageModel.condId = this.programConditionsModel.condId;
    this.ageModel.isRequired = this.programConditionsModel.condRequired;
    this.ageModel.progId = this.programConditionsModel.progId;
    this.ageModel.title = this.programConditionsModel.title;
  }
  saveProgramConditions() {
    this.updateProgramConditionDetailsModel.id = this.ageModel.id;
    this.updateProgramConditionDetailsModel.progCondDetails = JSON.stringify(this.ageModel);
    this.updateProgramConditionDetailsModel.isRequired = this.ageModel.isRequired;
    this.programConditionsService.updateProgramConditionDetails(this.updateProgramConditionDetailsModel).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }

    );
  }

  confirmDialog() {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this condition" : "هل متأكد من حذف هذا الشرط";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete condition' : 'حذف الشرط', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult == true) {
        this.programConditionsService.deleteProgramCondition(this.ageModel.id || '').subscribe(

          res => {
            if (res.isSuccess) {
              this.progIdToLoadProgCond.emit(this.ageModel.progId)
              this.alertify.success(res.message || '');
            }
            else {
              this.alertify.error(res.message || '');
            }
          },
          error => {
            this.alertify.error(error || '');
          }
        )

      }
    });
  }
}
