import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingAnswerTypeEnum } from 'src/app/core/enums/setting-answerType-enum.enum';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { IConditionModel } from 'src/app/core/interfaces/setting/icondition-model';

@Component({
  selector: 'app-custom-conditions',
  templateUrl: './custom-conditions.component.html',
  styleUrls: ['./custom-conditions.component.scss']
})
export class CustomConditionsComponent implements OnInit {

  @Input() customConditionsModel: IprogramPredefinedCustomConditionsModel = {}
  answerType = SettingAnswerTypeEnum;

  @Output() editcustomConditionsCard = new EventEmitter<IprogramPredefinedCustomConditionsModel>();
  @Output() deleteCustomConditionsCard = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  editCustomCondition() {
    this.editcustomConditionsCard.emit(this.customConditionsModel)
  }


  deleteCustomCondition() {
    this.deleteCustomConditionsCard.emit(this.customConditionsModel?.id)
  }

}
