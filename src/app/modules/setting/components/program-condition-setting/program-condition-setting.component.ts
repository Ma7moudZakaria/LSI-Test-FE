import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
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
  modelEdit: IprogramPredefinedCustomConditionsModel = {};

  ngOnInit(): void {
  }

  closeForm() {
    this.showAddForm = false
  }
  // openCoiditionFrom() {
  //   this.showAddForm = true

  // }
  addCustomCondition() {
    this.closeForm();
    this.CustomCondition?.getProgramConditionsLis();
  }

  // editcustomConditionsCard() {
  //   this.openCoiditionFrom();

  // }

  openAddEditOverLay(event: IprogramPredefinedCustomConditionsModel) {
    this.showAddForm = true
    //  pass object deatils to form 
    this.modelEdit = event;
  }














}
function getProgramConditionsLis(getProgramConditionsLis: any) {
  throw new Error('Function not implemented.');
}

