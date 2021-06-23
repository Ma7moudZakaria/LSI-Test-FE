import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-accept',
  templateUrl: './setting-accept.component.html',
  styleUrls: ['./setting-accept.component.scss']
})
export class SettingAcceptComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  constructor() { }

  ngOnInit(): void {
  }

}
