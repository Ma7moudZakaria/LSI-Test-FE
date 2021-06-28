import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { SettingAnswerTypeEnum } from 'src/app/core/enums/setting-answerType-enum.enum';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { IUpdateProgramConditionDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { IConditionModel } from 'src/app/core/interfaces/setting/icondition-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-custom-conditions',
  templateUrl: './custom-conditions.component.html',
  styleUrls: ['./custom-conditions.component.scss']
})
export class CustomConditionsComponent implements OnInit {

  @Input() customConditionsModel: IprogramPredefinedCustomConditionsModel = {}
  @Input() isViewToProgCond: boolean = false;
  answerType=SettingAnswerTypeEnum
  resultMessage: BaseMessageModel = {};
  updateProgramConditionDetailsModel:IUpdateProgramConditionDetailsModel={};
  result: string = '';
    @Output() progIdToLoadProgCond = new EventEmitter<string>();
    @Output() editcustomConditionsCard = new EventEmitter<IprogramPredefinedCustomConditionsModel>();
    @Output() deleteCustomConditionsCard = new EventEmitter<string>();
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public programConditionsService:ProgramConditionsService,
    public dialog: MatDialog, 
  ) { }
 

  ngOnInit(): void {
  }
  saveProgramConditions() {
    this.updateProgramConditionDetailsModel.id = this.customConditionsModel.id;
    this.updateProgramConditionDetailsModel.progCondDetails=JSON.stringify(this.customConditionsModel.conditionModel);
   // this.updateProgramConditionDetailsModel.isRequired = this.customConditionsModel.isRequired;
    this.programConditionsService.updateProgramConditionDetails(this.updateProgramConditionDetailsModel).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
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
        this.programConditionsService.deleteProgramCondition(this.customConditionsModel.id || '').subscribe(
          res => {
            res.message;
            this.progIdToLoadProgCond.emit(this.customConditionsModel.id)
          },
          error => {
            this.resultMessage = {
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        )
      }
    });
    }

    editCustomCondition() {
        this.editcustomConditionsCard.emit(this.customConditionsModel)
    }


    deleteCustomCondition() {
        this.deleteCustomConditionsCard.emit(this.customConditionsModel?.id)
    }

}
