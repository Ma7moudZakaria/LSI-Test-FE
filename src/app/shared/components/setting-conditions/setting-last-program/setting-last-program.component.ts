import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { max } from 'rxjs/operators';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IProgramFilterByNameRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IProgramPredefinedCoditionsMulti, IProgramPredefinedvalue } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-coditions-multi';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { IUpdateProgramConditionDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { ProgramConditionViewMoodEnum } from 'src/app/core/enums/programs/program-condition-view-mood-enum.enum';

@Component({
  selector: 'app-setting-last-program',
  templateUrl: './setting-last-program.component.html',
  styleUrls: ['./setting-last-program.component.scss']
})
export class SettingLastProgramComponent implements OnInit {
  @Output() progIdToLoadProgCond = new EventEmitter<string>();
  @Input() programConditionsModel: IProgramConditionsModel = {};
  @Input() ViewprogCondmood: number = ProgramConditionViewMoodEnum.conditionSettingViewMood;
  lastProgramModel: IProgramPredefinedCoditionsMulti = {};
  resultMessage: BaseMessageModel = {};
  updateProgramConditionDetailsModel: IUpdateProgramConditionDetailsModel = {};
  result: string = '';
  progData: IprogramsModel[] = [];
  ProgramsList: IProgramPredefinedvalue[] = [];
  programFilterByNameFilterRequest = {} as IProgramFilterByNameRequest;
  langEnum = LanguageEnum;
  selectedLastPrograms = Array<IProgramPredefinedvalue>();
  programConditionViewMoodEnum=ProgramConditionViewMoodEnum;

  constructor(
    private ProgramService: ProgramService,
    public translate: TranslateService,
    public programConditionsService: ProgramConditionsService,
    public dialog: MatDialog,
    private alertify: AlertifyService

  ) { }

  ngOnInit(): void {
    this.getPrograms();
    this.populateData();

  }
  populateData() {
    this.lastProgramModel = JSON.parse(this.programConditionsModel.progCondValue || '{}') || {};
    this.lastProgramModel.id = this.programConditionsModel.id;
    this.lastProgramModel.condId = this.programConditionsModel.condId;
    this.lastProgramModel.isRequired = this.programConditionsModel.condRequired;
    this.lastProgramModel.progId = this.programConditionsModel.progId;
    this.lastProgramModel.title = this.programConditionsModel.title;
    this.selectedLastPrograms = this.lastProgramModel.value || [];
  }
  getPrograms() {
    this.programFilterByNameFilterRequest = {
      // name: '',
      take: 2147483647

    }

    this.ProgramService.getAllPrograms(this.programFilterByNameFilterRequest).subscribe(res => {
      let response = <BaseResponseModel>res;
      this.progData = response.data;
      this.ProgramsList = this.progData.map(item => ({
        id: item.id,
        nameAr: item.progName,
        nameEn: item.progName
      }))
    },
      error => {
        console.log(error);
      }
    )
  }

  addDegreeItem() {
    this.lastProgramModel.value = [];
    const exist = this.selectedLastPrograms.some(el => el.id === this.lastProgramModel.condSelcted)
    if (!exist) {
      this.selectedLastPrograms.push(
        this.ProgramsList.filter(el => el.id == this.lastProgramModel.condSelcted)[0]);
    }
    this.lastProgramModel.value = this.selectedLastPrograms;
  }
  removeItemFromSelectedLastPrograms(item: any) {
    let index = this.selectedLastPrograms.indexOf(item);
    this.selectedLastPrograms.splice(index, 1);
  }
  saveProgramConditions() {
    this.updateProgramConditionDetailsModel.id = this.lastProgramModel.id;
    this.lastProgramModel.condSelcted = "null";
    this.updateProgramConditionDetailsModel.progCondDetails = JSON.stringify(this.lastProgramModel);
    this.updateProgramConditionDetailsModel.isRequired = this.lastProgramModel.isRequired;
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
        this.programConditionsService.deleteProgramCondition(this.lastProgramModel.id || '').subscribe(
          res => {
            if (res.isSuccess) {
              this.progIdToLoadProgCond.emit(this.lastProgramModel.progId)

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
