import { Component, OnInit, ViewChild } from '@angular/core';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupViewComponent } from './group-view/group-view.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  @ViewChild(GroupViewComponent) groupViewComponent: GroupViewComponent | undefined;
  @ViewChild(GroupDetailsComponent) groupDetailsComponent: GroupDetailsComponent | undefined;
  @ViewChild(ChatDetailsComponent) chatDetailsComponent: ChatDetailsComponent | undefined;

  openCreateGroupOverlay: boolean = false;
  createGroupChat = {} as IGroupChat;

  constructor() { }

  ngOnInit(): void {
  }

  closeCreateGroupOverlay(event: IGroupChat) {
    this.openCreateGroupOverlay = false;
    this.createGroupChat = event
    this.groupViewComponent?.getAllGroups();
  }

  openCreateGroupPopup(event: boolean) {
    this.openCreateGroupOverlay = true;
  }  

  groupDetailsEvent(event: IGroupChat) {
    this.groupDetailsComponent?.getGroupDetails(event);
  }

  chatDetailsEvent(event: IGroupChat) {
    this.chatDetailsComponent?.getGroupMessages(event);
  }
}
