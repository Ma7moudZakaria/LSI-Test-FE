import { Component, Input, OnInit } from '@angular/core';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';

@Component({
  selector: 'app-program-conditions-age',
  templateUrl: './program-conditions-age.component.html',
  styleUrls: ['./program-conditions-age.component.scss']
})
export class ProgramConditionsAgeComponent implements OnInit {
  @Input() item: IprogramPredefinedCustomConditionsModel = {}
  constructor() { }

  ngOnInit(): void {
  }

}
