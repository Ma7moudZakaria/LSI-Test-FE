import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custome-card',
  templateUrl: './custome-card.component.html',
  styleUrls: ['./custome-card.component.scss']
})
export class CustomeCardComponent implements OnInit {

  @Input() title:string | undefined;
  @Input() content:string | undefined;
  @Input() imgPath:string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
