import { Component, Input, OnInit } from '@angular/core';
import { IProgCondPredefinedNumerical } from 'src/app/core/interfaces/programs-interfaces/iprog-cond-predefined-numerical';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-age',
  templateUrl: './setting-age.component.html',
  styleUrls: ['./setting-age.component.scss']
})
export class SettingAgeComponent implements OnInit {
  @Input() ageModel: IProgCondPredefinedNumerical = {};
  constructor() { }

  ngOnInit(): void {
  }

}
