import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';

@Component({
  selector: 'app-view-condition-setting',
  templateUrl: './view-condition-setting.component.html',
  styleUrls: ['./view-condition-setting.component.scss']
})
export class ViewConditionSettingComponent implements OnInit {

  @Output() openCoiditionFrom = new EventEmitter<boolean>();
  programConditionsList: IprogramPredefinedCustomConditionsModel[] = [];
  programPredefinedEnum = programPredefinedConditionsEnum;

  constructor(public programConditionsService: ProgramConditionsService) { }

  ngOnInit(): void {
    this.getProgramConditionsLis();
  }
  AddConditions() {
    this.openCoiditionFrom.emit(true)
  }
  getProgramConditionsLis() {
    this.programConditionsService.getProgramConditionsList().subscribe(res => {
      this.programConditionsList = res.data as IprogramPredefinedCustomConditionsModel[];
    });
  }

}
