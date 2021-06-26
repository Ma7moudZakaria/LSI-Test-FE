import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-last-program',
  templateUrl: './setting-last-program.component.html',
  styleUrls: ['./setting-last-program.component.scss']
})
export class SettingLastProgramComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}

  constructor() { }

  ngOnInit(): void {
  }

}
