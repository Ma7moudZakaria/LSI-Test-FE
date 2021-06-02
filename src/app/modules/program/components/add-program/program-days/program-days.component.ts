import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IProgramDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-details-model';

@Component({
  selector: 'app-program-days',
  templateUrl: './program-days.component.html',
  styleUrls: ['./program-days.component.scss']
})
export class ProgramDaysComponent implements OnInit {

  @Input() getProgramDetails = new EventEmitter<IProgramDetailsModel>();

  constructor() { }

  ngOnInit(): void {
  }

  openProgramDetails(event: IProgramDetailsModel) {
    this.getProgramDetails.emit(event);
  }

}
