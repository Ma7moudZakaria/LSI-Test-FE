import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-subscriptions',
  templateUrl: './program-subscriptions.component.html',
  styleUrls: ['./program-subscriptions.component.scss']
})
export class ProgramSubscriptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  list_programs = [1, 2, 3]
}
