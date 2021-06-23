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
import { IDetailsProgramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/idetails-program-predefined-custom-conditions-model';
import { IUpdateProgramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iupdate-program-predefined-custom-conditions-model';

@Component({
  selector: 'app-add-condition-setting',
  templateUrl: './add-condition-setting.component.html',
  styleUrls: ['./add-condition-setting.component.scss']
})
export class AddConditionSettingComponent implements OnInit {
  model: IAddProgramPredefinedCustomConditionsModel | undefined;
  editModel: IUpdateProgramPredefinedCustomConditionsModel | undefined;
  detailsModel: IDetailsProgramPredefinedCustomConditionsModel | undefined
  @Input() conditionsDetails = {} as IDetailsProgramPredefinedCustomConditionsModel;

  @Output() closeOverlay = new EventEmitter<boolean>();

  conditionModel: IConditionModel = { answerType: SettingAnswerTypeEnum.Choices, answerList: [] };
  answerTypeEnum = SettingAnswerTypeEnum;
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookupConditions: string[] = ['PROG_COND_TYPES'];

  resMessage: BaseMessageModel = {};

  currentLang = '';
  MULTISELECT = '';

  constructor(public translate: TranslateService,
    private lookupService: LookupService,
    private alert: AlertifyService,
    private progCondService: ProgramConditionsService) { }

  ngOnInit(): void {
    this.MULTISELECT = this.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.MULTI_SELECT') : this.translate.instant('GENERAL.MULTI_SELECT')
    this.getModel();

    // this.conditionModel.answerType = this.collectionOfLookup.PROG_COND_TYPES ? this.collectionOfLookup.PROG_COND_TYPES[0].id : '';
  }

  // getLookupByKey() {
  //   this.lookupService.getLookupByKey(this.listOfLookupConditions).subscribe(res => {
  //     this.collectionOfLookup = res.data as ILookupCollection;
  //     if (res.isSuccess) {
  //     }
  //     else {
  //       this.resMessage =
  //       {
  //         message: res.message,
  //         type: BaseConstantModel.DANGER_TYPE
  //       }
  //     }
  //   });
  // }

  closeForm() {
    this.closeOverlay.emit(false)

  }

  addAnswer() {
    let id = BaseConstantModel.newGuid();
    let answer: ISettingAnswer = { id: id }

    this.conditionModel.answerList?.push(answer)
    console.log(this.conditionModel.answerList);

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
    this.model = {
      title: this.conditionModel.title,
      conditionJson: JSON.stringify(this.conditionModel)
    }
    this.addSettingConditions();
  }

  addSettingConditions() {
    this.progCondService.saveProgramPredefinedCustomConditions(this.model || {}).subscribe(res => {
      if (res.isSuccess) {

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

  populateData() {
    this.getModel();
  }
  getModel() {
    this.conditionModel = JSON.parse("{\"answerList\":[{\"id\":\"a81fa3f0-a173-4bc6-a642-2f5a930d9ea5\",\"text\":\"kjlkj\"},{\"id\":\"19ecde13-6b8b-4330-b431-32ff1b0fae33\",\"text\":\"poipoipo\"},{\"id\":\"e58a2811-d72a-48fc-8014-16ae0559e71c\",\"text\":\";jkl;lk;lk\"}],\"title\":\"gjghjghj\",\"answerType\":\"Choices\"}")
    // this.conditionModel = JSON.parse(this.detailsModel)

  }

  editCondition() {
    this.editModel = {
      title: this.conditionModel.title,
      // conditionJson: JSON.stringify(this.conditionModel)

    }
  }


  editSettingConditions() {
    this.progCondService.putProgramPredefinedCustomConditions(this.editModel || {}).subscribe(res => {
      if (res.isSuccess) {

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







  huff: Number | undefined;
  radioChange(event: any) {
    this.huff = this.collectionOfLookup.PROG_COND_TYPES?.filter(i => i.id == event.value)[0].huffazId;
  }




}
