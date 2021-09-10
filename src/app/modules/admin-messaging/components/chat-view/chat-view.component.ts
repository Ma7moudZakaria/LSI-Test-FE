import { Component, OnInit, ViewChild } from '@angular/core';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { GroupViewComponent } from './group-view/group-view.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  @ViewChild(GroupViewComponent) groupViewComponent: GroupViewComponent | undefined;

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
    // this.createGroupChat = event

  }  
}
