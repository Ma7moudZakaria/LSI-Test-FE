import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-maxmum-subscribe',
  templateUrl: './setting-maxmum-subscribe.component.html',
  styleUrls: ['./setting-maxmum-subscribe.component.scss']
})
export class SettingMaxmumSubscribeComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}

  constructor() { }

  ngOnInit(): void {
  }

}
