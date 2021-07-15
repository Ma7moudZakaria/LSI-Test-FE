import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramConditionViewMoodEnum } from 'src/app/core/enums/programs/program-condition-view-mood-enum.enum';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IProgramPredefinedCoditionsSingle } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-coditions-single';
import { IUpdateProgramConditionDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-setting-part-qraan',
  templateUrl: './setting-part-qraan.component.html',
  styleUrls: ['./setting-part-qraan.component.scss']
})
export class SettingPartQraanComponent implements OnInit {
  @Output() progIdToLoadProgCond = new EventEmitter<string>();
  @Input() programConditionsModel: IProgramConditionsModel = {};
  @Input() ViewprogCondmood: number = ProgramConditionViewMoodEnum.conditionSettingViewMood;
  partQuranModel: IProgramPredefinedCoditionsSingle = {};
  resultMessage: BaseMessageModel = {};
  updateProgramConditionDetailsModel: IUpdateProgramConditionDetailsModel = {};
  result: string = '';
  resValidation: Number | undefined;
  programConditionViewMoodEnum=ProgramConditionViewMoodEnum;
  
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService: ProgramConditionsService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.populateData()
  }
  populateData() {
    this.partQuranModel = JSON.parse(this.programConditionsModel.progCondValue || '{}') || {};
    this.partQuranModel.id = this.programConditionsModel.id;
    this.partQuranModel.condId = this.programConditionsModel.condId;
    this.partQuranModel.isRequired = this.programConditionsModel.condRequired;
    this.partQuranModel.progId = this.programConditionsModel.progId;
    this.partQuranModel.title = this.programConditionsModel.title;
  }
  saveProgramConditions() {
    this.resultMessage={};
    this.updateProgramConditionDetailsModel.id = this.partQuranModel.id;
    this.updateProgramConditionDetailsModel.progCondDetails = JSON.stringify(this.partQuranModel);
    this.updateProgramConditionDetailsModel.isRequired = this.partQuranModel.isRequired;
    // check validaton on part quran 
    this.resValidation = this.partQuranModel.value ? this.partQuranModel.value : 0;
    if (this.resValidation < 1 || this.resValidation > 30) {
      this.resultMessage =
      {
        message: this.translate.instant('PROGRAM_DAY_TASK_DETIALS.VALIDATION_VALUE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
    else {
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
        this.programConditionsService.deleteProgramCondition(this.partQuranModel.id || '').subscribe(
          res => {
            if (res.isSuccess) {
              this.progIdToLoadProgCond.emit(this.partQuranModel.progId)

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
