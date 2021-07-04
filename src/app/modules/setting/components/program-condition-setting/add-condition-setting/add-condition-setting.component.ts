
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingAnswerTypeEnum } from 'src/app/core/enums/setting-answerType-enum.enum';
import { IConditionModel } from 'src/app/core/interfaces/setting/icondition-model';
import { ISettingAnswer } from 'src/app/core/interfaces/setting/isetting-answer';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { IAddProgramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iadd-program-predefined-custom-conditions-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-condition-setting',
  templateUrl: './add-condition-setting.component.html',
  styleUrls: ['./add-condition-setting.component.scss']
})
export class AddConditionSettingComponent implements OnInit {




  @Output() closeOverlay = new EventEmitter<boolean>();
  @Output() addCustomCondition = new EventEmitter();
  @Input() modelEdit: IprogramPredefinedCustomConditionsModel | undefined;
  model: IAddProgramPredefinedCustomConditionsModel | undefined;
  conditionModel: IConditionModel = { answerType: SettingAnswerTypeEnum.Choices, answerList: [], studAnsValues:[] };
  answerTypeEnum = SettingAnswerTypeEnum;
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupConditions: string[] = ['PROG_COND_TYPES'];
  resMessage: BaseMessageModel = {};
  currentLang = '';
  MULTISELECT = '';
  huff: Number | undefined;

  constructor(public translate: TranslateService,
    private lookupService: LookupService,
    private alert: AlertifyService,
    public dialog: MatDialog,
    private progCondService: ProgramConditionsService) { }

  ngOnInit(): void {
    this.MULTISELECT = this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MULTI_SELECT') : this.translate.instant('GENERAL.MULTI_SELECT')
    // in case edit form 
    if (this.modelEdit) {
      this.getModel();
    }

  }

  closeForm() {
    this.closeOverlay.emit(false)
  }

  addAnswer() {
    let id = BaseConstantModel.newGuid();
    let answer: ISettingAnswer = { id: id }
    this.conditionModel.answerList?.push(answer);
  }
  
  validateAnswer(answerList: ISettingAnswer[], ansType: SettingAnswerTypeEnum): boolean {
    if (answerList.length < 2 && ansType === SettingAnswerTypeEnum.Choices) {
      this.resMessage = {
        message: this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.TWO_OPTIOPN') : this.translate.instant('GENERAL.TWO_OPTIOPN'),
        type: BaseConstantModel.DANGER_TYPE
      }

      return false;
    }

    if (ansType === SettingAnswerTypeEnum.Choices && answerList.some(r => r.text === '' || !r.text)) {
      this.resMessage = {
        message: this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.TEXT_INPUT') : this.translate.instant('GENERAL.TEXT_INPUT'),
        type: BaseConstantModel.DANGER_TYPE
      }

      return false;
    }

    if (this.getDuplicateAnswer(answerList).length > 0 && ansType === SettingAnswerTypeEnum.Choices) {
      this.resMessage = {
        message: this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.DUPLICATED_ANSWER') : this.translate.instant('GENERAL.DUPLICATED_ANSWER'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return false;
    }
    return true;
  }

  getDuplicateAnswer(arr: ISettingAnswer[]) {
    var sorted_arr = arr.slice().sort((a, b) => a.text! > b.text! && 1 || -1);
    sorted_arr = sorted_arr.filter(x => x.text != "");
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1].text === sorted_arr[i].text) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }

  Choices() {
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MORE_CHOICES') : this.translate.instant('GENERAL.MORE_CHOICES')
  }

  text() {
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.TEXT') : this.translate.instant('GENERAL.TEXT')
  }

  toggel() {
    return this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.Toggel') : this.translate.instant('GENERAL.Toggel')
  }

  saveCondition() {
    if (this.conditionModel && this.conditionModel.answerList && this.conditionModel.answerType
      && this.validateAnswer(this.conditionModel.answerList, this.conditionModel.answerType)) {

      this.updateModelTypeSubmition();
      this.model = {
        title: this.conditionModel.title,
        conditionJson: JSON.stringify(this.conditionModel)
      }
      this.addSettingConditions();
    }

  }

  updateModelTypeSubmition(){
    if (this.conditionModel.answerType === SettingAnswerTypeEnum.Text){
      this.conditionModel.answerList = undefined;
      this.conditionModel.studAnsValues = undefined;
      this.conditionModel.studBoolAns = undefined;

      this.conditionModel.studTxtAns = '';
    }
    else if(this.conditionModel.answerType === SettingAnswerTypeEnum.Toggel){
      this.conditionModel.answerList = undefined;
      this.conditionModel.studAnsValues = undefined;
      this.conditionModel.studTxtAns = undefined;

      this.conditionModel.studBoolAns = true;
    }
    else{
      this.conditionModel.studTxtAns = undefined;
      this.conditionModel.studBoolAns = undefined;
    }
  }

  addSettingConditions() {
    this.progCondService.saveProgramPredefinedCustomConditions(this.model || {}).subscribe(res => {
      if (res.isSuccess) {
        this.addCustomCondition.emit()
        this.closeForm();
        this.alert.success(res.message || '');
      }
      else {
        this.resMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  // case in edit
  getModel() {
    if (this.modelEdit && this.modelEdit.conditionModel) {
      this.conditionModel = this.modelEdit?.conditionModel;
      if (this.answerTypeEnum.Choices != this.conditionModel.answerType) {
        this.conditionModel.answerList = []

      }
    }
  }


  savingEdit() {
    if (this.conditionModel && this.conditionModel.answerList && this.conditionModel.answerType
      && this.validateAnswer(this.conditionModel.answerList, this.conditionModel.answerType)) {
        
        this.updateModelTypeSubmition();
        this.modelEdit =
        {
          id: this.modelEdit?.id,
          title: this.conditionModel.title,
          conditionJson: JSON.stringify(this.conditionModel)
        }

        this.editSettingConditions();
      }
  }

  editSettingConditions() {
    this.progCondService.putProgramPredefinedCustomConditions(this.modelEdit || {}).subscribe(res => {
      if (res.isSuccess) {
        this.addCustomCondition.emit()
        this.closeForm();
        this.alert.success(res.message || '');
      }
      else {
        this.alert.error(res.message || '');
      }
    }, error => {
      this.alert.error(error || '');
    });
  }
  // delete answer
  deleteAnswerDialog(answer: ISettingAnswer) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete answer" : "هل متأكد من حذف الإجابة";
    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Answer' : 'حذف الإجابة', message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        // let question = this.exam.questions.filter(q => q.questionNo == no)[0];

        const index = this.conditionModel?.answerList?.indexOf(answer);
        if (index)
          this.conditionModel.answerList?.splice(index, 1);
      }
    });
  }

  radioChange(event: any) {
    this.huff = this.collectionOfLookup.PROG_COND_TYPES?.filter(i => i.id == event.value)[0].huffazId;
  }

}
