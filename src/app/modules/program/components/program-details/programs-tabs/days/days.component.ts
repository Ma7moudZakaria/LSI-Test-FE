import { Component, Input, OnInit } from '@angular/core';
import { IProgramDetails, IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {

  @Input() progDays:Array<IProgramDutyDays> | undefined;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.progDays);
    console.log("progDays ===========>", this.progDays);
  }

}
