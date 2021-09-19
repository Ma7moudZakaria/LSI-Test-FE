import { Component, OnInit, ViewChild } from '@angular/core';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { UserChatViewDetailsComponent } from './user-chat-view-details/user-chat-view-details.component';

@Component({
  selector: 'app-user-chat-view',
  templateUrl: './user-chat-view.component.html',
  styleUrls: ['./user-chat-view.component.scss']
})
export class UserChatViewComponent implements OnInit {

  @ViewChild(UserChatViewDetailsComponent) userChatViewDetailsComponent: UserChatViewDetailsComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  groupDetailsEvent(event: IGroupChat) {
    if (this.userChatViewDetailsComponent){
      this.userChatViewDetailsComponent.groupData = event;
      this.userChatViewDetailsComponent.getGroupMessages();
    }
  }
}
