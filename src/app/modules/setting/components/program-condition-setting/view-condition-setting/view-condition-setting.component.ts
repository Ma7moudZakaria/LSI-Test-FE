import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { IDetailsProgramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/idetails-program-predefined-custom-conditions-model';
import { IConditionModel } from 'src/app/core/interfaces/setting/icondition-model';

@Component({
  selector: 'app-view-condition-setting',
  templateUrl: './view-condition-setting.component.html',
  styleUrls: ['./view-condition-setting.component.scss']
})
export class ViewConditionSettingComponent implements OnInit {

  @Output() openCoiditionFrom = new EventEmitter<boolean>();
  predefineConditionsList: IprogramPredefinedCustomConditionsModel[] = [];
  @Input() customConditionsList: IprogramPredefinedCustomConditionsModel[] = [];
  programPredefinedEnum = programPredefinedConditionsEnum;
  getCustomConditionsList: IConditionModel[] = [];

  constructor(public programConditionsService: ProgramConditionsService) { }

  ngOnInit(): void {
    this.getProgramConditionsLis();
  }
  AddConditions() {
    this.openCoiditionFrom.emit(true)
  }
  getProgramConditionsLis() {
    this.programConditionsService.getProgramConditionsList().subscribe(res => {
      let allItems = res.data as IprogramPredefinedCustomConditionsModel[];

      this.predefineConditionsList = allItems.filter(i => !i.isCustom);
      this.customConditionsList = allItems.filter(i => i.isCustom);

      this.customConditionsList.forEach(element => {
        element.conditionModel = JSON.parse(element.conditionJson || "{}")
      });



      // this.customConditionsList = allItems.filter(i => i.isCustom);
      // this.customConditionsList.forEach(element => {
      //   this.getCustomConditionsList.push(
      //     JSON.parse(element.conditionJson||'{}')
      //   )
      // });
      //this.customConditionsList =JSON.parse()
      // this.item=JSON.parse(this.customConditionsList||'{}')

      // this.customConditionsList[0].conditionJson = JSON.parse(this.customConditionsList[0].conditionJson);


    });
  }

  @Output() editCondition = new EventEmitter<IprogramPredefinedCustomConditionsModel>();


  editCustomConditions(event: IprogramPredefinedCustomConditionsModel) {
    this.editCondition.emit(event);
  }


}
