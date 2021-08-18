import { IConditionModel } from './../../../../core/interfaces/setting/icondition-model';
import { Component, Input, OnInit } from '@angular/core';
import { SettingAnswerTypeEnum } from 'src/app/core/enums/setting-answerType-enum.enum';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { IStudentSubscriptionCustomCondition } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-custom-condition';
import { IProgramSubscriptionDetails } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-custom-condition-overlay',
  templateUrl: './custom-condition-overlay.component.html',
  styleUrls: ['./custom-condition-overlay.component.scss']
})
export class CustomConditionOverlayComponent implements OnInit {
  @Input() customCondition: IProgramSubscriptionDetails | undefined
  resMessage: BaseMessageModel = {};
  programCustomConditionsModel: IprogramPredefinedCustomConditionsModel[] | undefined
  answerTypeEnum = SettingAnswerTypeEnum;

  xx: any
  isSelected: boolean = true
  textInswer: string = '';
  constructor(private studentCustomConditionService: StudentProgramSubscriptionServicesService,) { }

  ngOnInit(): void {
    // console.log('CustomCondition', this.customCondition?.id)
    this.getCustomCondition()
  }

  getCustomCondition() {
    this.studentCustomConditionService.getStudentCustomCondition(this.customCondition?.id || '').subscribe(
      res => {

        if (res.isSuccess) {
          let programConditionsCustomList = res.data as IStudentSubscriptionCustomCondition[];

          this.programCustomConditionsModel = programConditionsCustomList.map(m => ({

            title: m.titleCondition,
            conditionJson: m.jsonCondition,
            conditionModel: JSON.parse(m.jsonCondition || "{}")

          }));
          // for(let i = 0; i<this.programCustomConditionsModel.length; i++){

          // }

          console.log('this.programPredefinedCustomConditionsModel', this.programCustomConditionsModel);
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
      })
  }
  onChange(event: any, item?: IConditionModel) {
    if (item) {
      item.studAnsValues = []
      item.studAnsValues.push(event)
      console.log(item);
      console.log(this.programCustomConditionsModel);
    }
    // this.isSelected = event.value;
  }

}
