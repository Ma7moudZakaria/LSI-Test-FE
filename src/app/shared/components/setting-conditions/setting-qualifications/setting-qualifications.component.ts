import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';


@Component({
  selector: 'app-setting-qualifications',
  templateUrl: './setting-qualifications.component.html',
  styleUrls: ['./setting-qualifications.component.scss']
})
export class SettingQualificationsComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  constructor() { }

  ngOnInit(): void {
  }

}
