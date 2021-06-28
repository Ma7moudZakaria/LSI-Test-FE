import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { IProgramPredefinedCoditionsMulti, IProgramPredefinedvalue } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-coditions-multi';
import { IUpdateProgramConditionDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-condition-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-setting-degree-last-program',
  templateUrl: './setting-degree-last-program.component.html',
  styleUrls: ['./setting-degree-last-program.component.scss']
})
export class SettingDegreeLastProgramComponent implements OnInit {
  @Input() programConditionsModel: IProgramConditionsModel = {};
  @Input() isViewToProgCond: boolean = false;
  @Output() progIdToLoadProgCond = new EventEmitter<string>();
  degreeLastProgramModel: IProgramPredefinedCoditionsMulti={};//IProgCondPredefinedMultiList = {};
  resultMessage: BaseMessageModel = {};
  updateProgramConditionDetailsModel:IUpdateProgramConditionDetailsModel={};
  result: string = '';
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupProfile: string[] = ['DEGREE'];
  selectedDegreeLastPrograms = Array<IProgramPredefinedvalue>();

  
  constructor(
    private lookupService: LookupService,
    public translate: TranslateService,
    public programConditionsService:ProgramConditionsService,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.degreeLastProgramModel=JSON.parse(this.programConditionsModel.progCondValue ||'{}')||{};
    this.degreeLastProgramModel.id = this.programConditionsModel.id;
    this.degreeLastProgramModel.condId = this.programConditionsModel.condId;
    this.degreeLastProgramModel.isRequired=this.programConditionsModel.condRequired;
    this.degreeLastProgramModel.progId=this.programConditionsModel.progId;
    this.degreeLastProgramModel.title=this.programConditionsModel.title;
    this.selectedDegreeLastPrograms=this.degreeLastProgramModel.value||[];
  }
 
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
     
    });
  }

  addDegreeItem(){
    this.degreeLastProgramModel.value=[];
    const exist = this.selectedDegreeLastPrograms.some(el => el.id === this.degreeLastProgramModel.condSelcted)
    if (!exist) {
      if (this.collectionOfLookup.DEGREE) {
        this.selectedDegreeLastPrograms.push(
          this.collectionOfLookup.DEGREE.filter(el => el.id == this.degreeLastProgramModel.condSelcted)[0]);
          
      }
      this.degreeLastProgramModel.value=this.selectedDegreeLastPrograms;
    }
  }

  saveProgramConditions() {
    this.updateProgramConditionDetailsModel.id = this.degreeLastProgramModel.id;
    this.degreeLastProgramModel.condSelcted='null';
    this.updateProgramConditionDetailsModel.progCondDetails=JSON.stringify(this.degreeLastProgramModel);
    this.updateProgramConditionDetailsModel.isRequired = this.degreeLastProgramModel.isRequired;
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
        this.programConditionsService.deleteProgramCondition(this.degreeLastProgramModel.id || '').subscribe(
          res => {
            res.message;
            this.progIdToLoadProgCond.emit(this.degreeLastProgramModel.progId)
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
