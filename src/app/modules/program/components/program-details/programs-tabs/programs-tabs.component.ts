import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-programs-type',
  templateUrl: './programs-type.component.html',
  styleUrls: ['./programs-type.component.scss']
})
export class ProgramsTabsComponent implements OnInit {
  showTap: string = 'BASEINFO';

  constructor() { }

  ngOnInit(): void {
  }

}
