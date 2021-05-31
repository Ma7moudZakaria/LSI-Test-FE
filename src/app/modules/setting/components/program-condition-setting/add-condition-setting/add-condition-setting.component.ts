import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-condition-setting',
  templateUrl: './add-condition-setting.component.html',
  styleUrls: ['./add-condition-setting.component.scss']
})
export class AddConditionSettingComponent implements OnInit {
  @Output() closeOverlay = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeForm() {
    this.closeOverlay.emit(false)

  }
}
