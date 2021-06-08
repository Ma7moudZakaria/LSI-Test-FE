import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feelings-view',
  templateUrl: './feelings-view.component.html',
  styleUrls: ['./feelings-view.component.scss']
})
export class FeelingsViewComponent implements OnInit {
  showTap: string = 'students';
  constructor() { }

  ngOnInit(): void {
  }

}
