import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-programs-tabs',
  templateUrl: './programs-tabs.component.html',
  styleUrls: ['./programs-tabs.component.scss']
})
export class ProgramsTabsComponent implements OnInit {
  showTap: string = 'BASEINFO';

  constructor() { }

  ngOnInit(): void {
  }

}
