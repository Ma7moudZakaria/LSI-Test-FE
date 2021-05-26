import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-notifacations',
  templateUrl: './add-notifacations.component.html',
  styleUrls: ['./add-notifacations.component.scss']
})
export class AddNotifacationsComponent implements OnInit {
  @Output() closeNotifyForm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  closeNotify() {
    this.closeNotifyForm.emit(false)

  }
}
