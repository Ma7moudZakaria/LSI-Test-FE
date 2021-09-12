import { Component, Input, OnInit } from '@angular/core';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  @Input() groupDetails: IGroupChat | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
