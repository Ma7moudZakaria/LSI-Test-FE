import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-part-qraan',
  templateUrl: './setting-part-qraan.component.html',
  styleUrls: ['./setting-part-qraan.component.scss']
})
export class SettingPartQraanComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}

  constructor() { }

  ngOnInit(): void {
  }

}
