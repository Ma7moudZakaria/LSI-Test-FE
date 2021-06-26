import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-degree-last-program',
  templateUrl: './setting-degree-last-program.component.html',
  styleUrls: ['./setting-degree-last-program.component.scss']
})
export class SettingDegreeLastProgramComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}

  constructor() { }

  ngOnInit(): void {
  }

}
