import { Component, Input, OnInit } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-program-conditions',
  templateUrl: './program-conditions.component.html',
  styleUrls: ['./program-conditions.component.scss']
})
export class ProgramConditionsComponent implements OnInit {
  @Input() progId?: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
