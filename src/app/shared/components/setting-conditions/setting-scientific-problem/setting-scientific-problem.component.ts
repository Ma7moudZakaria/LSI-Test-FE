import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-setting-scientific-problem',
  templateUrl: './setting-scientific-problem.component.html',
  styleUrls: ['./setting-scientific-problem.component.scss']
})
export class SettingScientificProblemComponent implements OnInit {

  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  constructor() { }

  ngOnInit(): void {
  }

}
