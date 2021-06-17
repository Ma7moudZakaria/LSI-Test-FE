import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-condition-setting',
  templateUrl: './view-condition-setting.component.html',
  styleUrls: ['./view-condition-setting.component.scss']
})
export class ViewConditionSettingComponent implements OnInit {

  constructor() { }
  @Output() openCoiditionFrom = new EventEmitter<boolean>();
  ngOnInit(): void {
  }
  AddConditions() {
    this.openCoiditionFrom.emit(true)
  }

}
