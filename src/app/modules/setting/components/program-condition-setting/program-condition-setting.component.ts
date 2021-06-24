import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewConditionSettingComponent } from './view-condition-setting/view-condition-setting.component';

@Component({
  selector: 'app-program-condition-setting',
  templateUrl: './program-condition-setting.component.html',
  styleUrls: ['./program-condition-setting.component.scss']
})
export class ProgramConditionSettingComponent implements OnInit {
  showAddForm = false;
  constructor() { }

  @ViewChild(ViewConditionSettingComponent) CustomCondition: ViewConditionSettingComponent | undefined;

  ngOnInit(): void {
  }

  closeForm() {
    this.showAddForm = false
  }
  openCoiditionFrom() {
    this.showAddForm = true

  }
  addCustomCondition() {
    this.closeForm();
    this.CustomCondition?.getProgramConditionsLis();
  }
}
function getProgramConditionsLis(getProgramConditionsLis: any) {
  throw new Error('Function not implemented.');
}

