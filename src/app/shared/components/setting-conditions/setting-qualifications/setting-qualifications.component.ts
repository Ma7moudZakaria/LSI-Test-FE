import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IProgramPredefinedCoditionsMulti, IProgramPredefinedvalue } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-coditions-multi';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { IUpdateProgramConditionDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-setting-qualifications',
  templateUrl: './setting-qualifications.component.html',
  styleUrls: ['./setting-qualifications.component.scss']
})
export class SettingQualificationsComponent implements OnInit {
  @Input() programConditionsModel: IProgramConditionsModel = {};
  @Input() isViewToProgCond: boolean = false;
  @Output() progIdToLoadProgCond = new EventEmitter<string>();
  qualificationModel: IProgramPredefinedCoditionsMulti = {};//IProgCondPredefinedMultiList = {};
  resultMessage: BaseMessageModel = {};
  updateProgramConditionDetailsModel: IUpdateProgramConditionDetailsModel = {};
  result: string = '';
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['QUALIFI'];
  langEnum = LanguageEnum;
  selectedQualification = Array<IProgramPredefinedvalue>();
  constructor(
    private lookupService: LookupService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public programConditionsService: ProgramConditionsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.populateData()
  }

  populateData() {
    this.qualificationModel = JSON.parse(this.programConditionsModel.progCondValue || '{}') || {};
    this.qualificationModel.id = this.programConditionsModel.id;
    this.qualificationModel.condId = this.programConditionsModel.condId;
    this.qualificationModel.isRequired = this.programConditionsModel.condRequired;
    this.qualificationModel.progId = this.programConditionsModel.progId;
    this.qualificationModel.title = this.programConditionsModel.title;
    this.selectedQualification = this.qualificationModel.value || [];
  }
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;

    });
  }

  addDegreeItem() {
    this.qualificationModel.value = [];
    const exist = this.selectedQualification.some(el => el.id === this.qualificationModel.condSelcted)
    if (!exist) {
      if (this.collectionOfLookup.QUALIFI) {
        this.selectedQualification.push(
          this.collectionOfLookup.QUALIFI.filter(el => el.id == this.qualificationModel.condSelcted)[0]);

      }
      this.qualificationModel.value = this.selectedQualification;
    }
  }
  removeItemFromSelectedQualification(item: any) {
    let index = this.selectedQualification.indexOf(item);
    this.selectedQualification.splice(index, 1);
  }
  saveProgramConditions() {
    this.updateProgramConditionDetailsModel.id = this.qualificationModel.id;
    this.qualificationModel.condSelcted = 'null';
    this.updateProgramConditionDetailsModel.progCondDetails = JSON.stringify(this.qualificationModel);
    this.updateProgramConditionDetailsModel.isRequired = this.qualificationModel.isRequired;
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
        this.programConditionsService.deleteProgramCondition(this.qualificationModel.id || '').subscribe(
          res => {
            res.message;
            this.progIdToLoadProgCond.emit(this.qualificationModel.progId)
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
}
