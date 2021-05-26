import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-card-notifacations',
  templateUrl: './card-notifacations.component.html',
  styleUrls: ['./card-notifacations.component.scss']
})
export class CardNotifacationsComponent implements OnInit {

  constructor() { }
  @Output() deleteCardNotify = new EventEmitter<string>();
  @Output() editCardNotify = new EventEmitter<string>();
  // @Input() inputCardId ;

  ngOnInit(): void {
  }

  deleteCard() {
    this.deleteCardNotify.emit();
  }
  editCard() {
    this.editCardNotify.emit();

  }
}
