import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-program-notifacations',
  templateUrl: './program-notifacations.component.html',
  styleUrls: ['./program-notifacations.component.scss']
})
export class ProgramNotifacationsComponent implements OnInit {
  listCard = [1, 2, 3, 4]
  constructor() { }

  @Output() openNotifyfrom = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  AddProgram() {
    this.openNotifyfrom.emit(true)
  }
}
