import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-condition-setting',
  templateUrl: './program-condition-setting.component.html',
  styleUrls: ['./program-condition-setting.component.scss']
})
export class ProgramConditionSettingComponent implements OnInit {
  showAddForm = false;
  constructor() { }

  ngOnInit(): void {
  }

  closeForm() {
    this.showAddForm = false
  }
  openCoiditionFrom() {
    this.showAddForm = true

  }
}
